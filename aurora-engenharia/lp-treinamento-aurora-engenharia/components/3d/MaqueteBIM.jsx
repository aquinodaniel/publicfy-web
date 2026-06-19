"use client";

import { Suspense, useMemo, useState, useRef, useEffect, useCallback } from "react";
import * as THREE from "three";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

const ARCH_URL = "/models/arquitetonico-opt.glb";
const HYD_URL = "/models/hidraulico-opt.glb";

// Carrega GLB (Draco) e mescla todas as meshes numa só geometria (perf: 1 draw call)
function useMergedGeometry(url) {
  const { scene } = useGLTF(url, true);
  return useMemo(() => {
    scene.updateMatrixWorld(true);
    const geos = [];
    scene.traverse((o) => {
      if (o.isMesh && o.geometry) {
        const g = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone();
        g.applyMatrix4(o.matrixWorld);
        for (const n of Object.keys(g.attributes)) {
          if (n !== "position" && n !== "normal") g.deleteAttribute(n);
        }
        if (!g.attributes.normal) g.computeVertexNormals();
        geos.push(g);
      }
    });
    const merged = mergeGeometries(geos, false);
    geos.forEach((g) => g.dispose());
    return merged;
  }, [scene]);
}

// Extrai as arestas "duras" de cada peça (antes do merge, p/ o threshold funcionar) e mescla.
// Dá a definição/contorno das formas — estilo BIM/blueprint.
function useMergedEdges(url, thresholdAngle = 30) {
  const { scene } = useGLTF(url, true);
  return useMemo(() => {
    scene.updateMatrixWorld(true);
    const geos = [];
    scene.traverse((o) => {
      if (o.isMesh && o.geometry) {
        const eg = new THREE.EdgesGeometry(o.geometry, thresholdAngle);
        eg.applyMatrix4(o.matrixWorld);
        geos.push(eg);
      }
    });
    const merged = mergeGeometries(geos, false);
    geos.forEach((g) => g.dispose());
    return merged;
  }, [scene]);
}

const VIEW_DIRS = {
  iso: [1, 0.72, 1],
  frente: [0, 0.28, 1.5],
  lado: [1.5, 0.28, 0.001],
  topo: [0.001, 2.2, 0.001],
};

// Gerencia a câmera: enquadramento inicial, presets de vista, zoom e tour 360
function CameraRig({ apiRef, controlsRef, groupRef }) {
  const { camera } = useThree();
  const center = useRef(new THREE.Vector3());
  const radius = useRef(8);
  const ready = useRef(false);
  const anim = useRef({ active: false, pos: new THREE.Vector3(), look: new THREE.Vector3() });

  const goToView = useCallback(
    (v, animate = true) => {
      const dir = new THREE.Vector3(...(VIEW_DIRS[v] || VIEW_DIRS.iso)).normalize();
      const dist = radius.current * 3.15;
      const pos = center.current.clone().add(dir.multiplyScalar(dist));
      anim.current.pos.copy(pos);
      anim.current.look.copy(center.current);
      anim.current.active = animate;
      if (!animate) {
        camera.position.copy(pos);
        if (controlsRef.current) {
          controlsRef.current.target.copy(center.current);
          controlsRef.current.update();
        }
      }
    },
    [camera, controlsRef]
  );

  const zoomBy = useCallback(
    (factor) => {
      if (!controlsRef.current) return;
      const t = controlsRef.current.target;
      const dir = camera.position.clone().sub(t);
      const d = THREE.MathUtils.clamp(dir.length() * factor, radius.current * 1.1, radius.current * 4.2);
      anim.current.pos.copy(t.clone().add(dir.setLength(d)));
      anim.current.look.copy(t);
      anim.current.active = true;
    },
    [camera, controlsRef]
  );

  const toggleTour = useCallback(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = !controlsRef.current.autoRotate;
      return controlsRef.current.autoRotate;
    }
    return false;
  }, [controlsRef]);

  useEffect(() => {
    apiRef.current = { goToView, zoomBy, toggleTour };
  }, [apiRef, goToView, zoomBy, toggleTour]);

  useFrame(() => {
    // enquadra assim que a geometria estiver pronta
    if (!ready.current && groupRef.current && groupRef.current.children.length) {
      const box = new THREE.Box3().setFromObject(groupRef.current);
      if (!box.isEmpty()) {
        box.getCenter(center.current);
        radius.current = box.getSize(new THREE.Vector3()).length() / 2;
        if (controlsRef.current) controlsRef.current.target.copy(center.current);
        goToView("iso", false);
        ready.current = true;
      }
    }
    // animação suave da câmera (vistas / zoom)
    if (anim.current.active && controlsRef.current) {
      camera.position.lerp(anim.current.pos, 0.12);
      controlsRef.current.target.lerp(anim.current.look, 0.12);
      controlsRef.current.update();
      if (camera.position.distanceTo(anim.current.pos) < radius.current * 0.01) anim.current.active = false;
    }
  });

  return null;
}

function Models({ mode, groupRef }) {
  const archGeo = useMergedGeometry(ARCH_URL);
  const hidGeo = useMergedGeometry(HYD_URL);
  const archEdges = useMergedEdges(ARCH_URL, 30);

  const archMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#cfd6da",
        roughness: 0.7,
        metalness: 0,
        transparent: true,
        opacity: 0.16,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    []
  );
  // metalness baixo + emissão forte: tubos dourados "acesos" mesmo sem environment map
  const hidMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#e8c074",
        roughness: 0.45,
        metalness: 0.2,
        emissive: "#c79235",
        emissiveIntensity: 0.55,
      }),
    []
  );
  // material das arestas (contorno) — dá a definição das formas
  const edgeMat = useMemo(
    () => new THREE.LineBasicMaterial({ color: "#a7bcc4", transparent: true, opacity: 0.45 }),
    []
  );

  useEffect(() => {
    if (mode === "arquitetonico") {
      archMat.opacity = 0.92;
      archMat.transparent = true;
      archMat.depthWrite = true;
      edgeMat.opacity = 0.6;
    } else if (mode === "hidraulico") {
      archMat.opacity = 0.025;
      archMat.transparent = true;
      archMat.depthWrite = false;
      edgeMat.opacity = 0.12;
    } else {
      archMat.opacity = 0.16;
      archMat.transparent = true;
      archMat.depthWrite = false;
      edgeMat.opacity = 0;
    }
    archMat.needsUpdate = true;
  }, [mode, archMat, edgeMat]);

  // IFC/Revit é Z-up -> rotaciona para o Y-up do Three
  return (
    <group ref={groupRef} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh geometry={hidGeo} material={hidMat} visible={mode !== "arquitetonico"} renderOrder={1} />
      <mesh geometry={archGeo} material={archMat} renderOrder={2} />
      <lineSegments geometry={archEdges} material={edgeMat} renderOrder={3} />
    </group>
  );
}

const MODES = [
  { key: "arquitetonico", icon: "🏠", label: "Arquitetônico" },
  { key: "hibrido", icon: "🔀", label: "Híbrida" },
  { key: "hidraulico", icon: "🚰", label: "Hidráulico" },
];
const VIEWS = [
  { key: "iso", label: "Iso" },
  { key: "frente", label: "Frente" },
  { key: "lado", label: "Lado" },
  { key: "topo", label: "Topo" },
];

export default function MaqueteBIM() {
  const [mode, setMode] = useState("hibrido");
  const [touring, setTouring] = useState(true);
  const apiRef = useRef({});
  const controlsRef = useRef();
  const groupRef = useRef();

  const sideBtn =
    "pointer-events-auto flex h-8 w-16 items-center justify-center border bg-card/80 font-mono text-[10px] uppercase tracking-wider backdrop-blur transition-colors";

  return (
    <div className="relative h-full w-full">
      <Canvas
        camera={{ position: [16, 11, 16], fov: 36 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.72} />
        <directionalLight position={[8, 12, 6]} intensity={1.05} />
        <directionalLight position={[-6, 5, -8]} intensity={0.4} color="#67e8f9" />
        <directionalLight position={[0, -3, 6]} intensity={0.18} color="#c9a961" />
        <Suspense fallback={null}>
          <Models mode={mode} groupRef={groupRef} />
        </Suspense>
        <OrbitControls
          ref={controlsRef}
          autoRotate={true}
          autoRotateSpeed={0.55}
          enablePan={false}
          enableZoom
          enableDamping
          dampingFactor={0.08}
          minPolarAngle={0.12}
          maxPolarAngle={Math.PI / 2.05}
          rotateSpeed={0.6}
        />
        <CameraRig apiRef={apiRef} controlsRef={controlsRef} groupRef={groupRef} />
      </Canvas>

      {/* HUD topo */}
      <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-primary md:left-4 md:top-4 md:text-[10px]">
        <span aria-hidden className="h-px w-5 bg-primary/50" />
        <span>Modelo BIM · Revit</span>
      </div>

      {/* Controles de vista + zoom + tour (direita) */}
      <div className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 flex-col gap-1.5 md:right-4">
        {VIEWS.map((v) => (
          <button
            key={v.key}
            type="button"
            onClick={() => apiRef.current.goToView?.(v.key)}
            className={sideBtn + " border-border text-foreground/80 hover:border-primary/60 hover:text-primary"}
          >
            {v.label}
          </button>
        ))}
        <div className="my-1 h-px w-full bg-border/60" />
        <button
          type="button"
          onClick={() => apiRef.current.zoomBy?.(0.82)}
          className={sideBtn + " border-border text-base text-foreground/80 hover:border-primary/60 hover:text-primary"}
        >
          +
        </button>
        <button
          type="button"
          onClick={() => apiRef.current.zoomBy?.(1.22)}
          className={sideBtn + " border-border text-base text-foreground/80 hover:border-primary/60 hover:text-primary"}
        >
          –
        </button>
        <button
          type="button"
          onClick={() => setTouring(apiRef.current.toggleTour?.() ?? false)}
          className={
            sideBtn +
            (touring
              ? " border-primary bg-primary text-primary-foreground"
              : " border-border text-foreground/80 hover:border-primary/60 hover:text-primary")
          }
        >
          360°
        </button>
      </div>

      {/* Hub de modos (embaixo, centralizado) */}
      <div className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 md:bottom-4">
        {MODES.map((m) => (
          <button
            key={m.key}
            type="button"
            onClick={() => setMode(m.key)}
            className={
              "pointer-events-auto flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider backdrop-blur transition-colors " +
              (mode === m.key
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card/80 text-foreground/75 hover:border-primary/60 hover:text-primary")
            }
          >
            <span aria-hidden className="text-sm">
              {m.icon}
            </span>
            <span className="hidden sm:inline">{m.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

useGLTF.preload(ARCH_URL, true);
useGLTF.preload(HYD_URL, true);
