import { Suspense, useMemo, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Edges } from '@react-three/drei';

// =====================================================================
// PALETA — cores funcionais
// =====================================================================
const COL = {
  ink: '#001115',
  paper: '#FAFAF7',
  paperWarm: '#F4F1E8',
  aurora: '#00657B',
  auroraDeep: '#004F60',
  auroraGlow: '#13B8D9',
  cota: '#7A8B91',
  alert: '#DBBE7C',
  fria: '#13B8D9',
  quente: '#DBBE7C',
  retorno: '#0A8AA8',
  gas: '#C58A2A',
  metal: '#B8C4C9',
  inox: '#D4DAE0',
  wood: '#8B6F4E',
  woodDark: '#5A4530',
  woodLight: '#B89968',
  glass: '#86C5D6',
  stone: '#C8C5BD',
  stoneLight: '#DDD9CF',
  pool: '#1FA9C9',
  deckWood: '#A78458',
  copper: '#B87333',
  wallInner: '#E5E0D5',
  wallOuter: '#EFEBDF',
  rugWarm: '#C9A57A'
};

// =====================================================================
// HELPERS
// =====================================================================
function makePipeGeom(points, radius = 0.014) {
  const curve = new THREE.CatmullRomCurve3(
    points.map((p) => new THREE.Vector3(...p)),
    false,
    'catmullrom',
    0.18
  );
  return new THREE.TubeGeometry(curve, points.length * 14, radius, 8, false);
}

// =====================================================================
// DIMENSÕES MESTRAS — casa de alto padrão em L
// =====================================================================
// Footprint: corpo principal + ala da sala (projeção em L)
// Eixos: +X = direita, +Z = frente (rua), Y = altura
const MAIN_W = 3.6;        // largura corpo principal
const MAIN_D = 3.2;        // profundidade corpo principal
const WING_W = 1.6;        // largura ala da sala (projetada à esquerda)
const WING_D = 2.0;        // profundidade ala da sala
const FLOOR_H = 1.05;      // pé direito
const FLOOR_GAP = 0.06;    // espessura laje
const ROOF_H = 0.18;
// Centros úteis
const MAIN_X = 0.6;        // centro do corpo principal em X (deslocado p/ direita)
const WING_X = -1.6;       // centro da ala em X
const WING_Z = 0.6;        // centro da ala em Z (projeta pra frente)
// Limites globais
const HOUSE_X_MIN = WING_X - WING_W / 2;       // -2.4
const HOUSE_X_MAX = MAIN_X + MAIN_W / 2;       //  2.4
const HOUSE_Z_MIN = -MAIN_D / 2;               // -1.6
const HOUSE_Z_MAX = MAIN_D / 2;                //  1.6
const WING_Z_MAX = WING_Z + WING_D / 2;        //  1.6 (alinhado com fachada frontal)
// Telhado e shafts
const ROOF_TOP_Y = FLOOR_H * 2 + FLOOR_GAP + 0.07;
const Y_UPPER = FLOOR_H + FLOOR_GAP;
const SHAFT_X = 0.6;       // shaft técnico vertical (centro do corpo principal)
const SHAFT_Z = -1.45;     // shaft na parede traseira (parede técnica)

// =====================================================================
// ESTRUTURA DA CASA — volumetria escalonada em L, 2 pavimentos
// =====================================================================
function HouseStructure() {
  return (
    <group>
      {/* === CAIXA EXTERNA TRANSPARENTE — corpo principal === */}
      <mesh position={[MAIN_X, FLOOR_H + FLOOR_GAP / 2, 0]}>
        <boxGeometry args={[MAIN_W, FLOOR_H * 2 + FLOOR_GAP, MAIN_D]} />
        <meshStandardMaterial
          color={COL.wallOuter}
          transparent
          opacity={0.05}
          side={THREE.DoubleSide}
        />
        <Edges threshold={15} color={COL.ink} />
      </mesh>
      {/* === CAIXA EXTERNA — ala da sala (somente térreo, recuo no 2º andar) === */}
      <mesh position={[WING_X, FLOOR_H / 2, WING_Z]}>
        <boxGeometry args={[WING_W, FLOOR_H, WING_D]} />
        <meshStandardMaterial
          color={COL.wallOuter}
          transparent
          opacity={0.06}
          side={THREE.DoubleSide}
        />
        <Edges threshold={15} color={COL.ink} />
      </mesh>

      {/* === LAJES === */}
      {/* Laje térreo — corpo principal */}
      <mesh position={[MAIN_X, 0.02, 0]}>
        <boxGeometry args={[MAIN_W + 0.04, 0.04, MAIN_D + 0.04]} />
        <meshStandardMaterial color={COL.paperWarm} />
        <Edges color={COL.cota} />
      </mesh>
      {/* Laje térreo — ala */}
      <mesh position={[WING_X, 0.02, WING_Z]}>
        <boxGeometry args={[WING_W + 0.04, 0.04, WING_D + 0.04]} />
        <meshStandardMaterial color={COL.paperWarm} />
        <Edges color={COL.cota} />
      </mesh>
      {/* Laje entre pavimentos — corpo principal */}
      <mesh position={[MAIN_X, FLOOR_H + 0.01, 0]}>
        <boxGeometry args={[MAIN_W + 0.02, 0.05, MAIN_D + 0.02]} />
        <meshStandardMaterial color={COL.stone} />
        <Edges color={COL.cota} />
      </mesh>
      {/* Cobertura da ala (vira sacada/terraço pro 2º andar) */}
      <mesh position={[WING_X, FLOOR_H + 0.01, WING_Z]}>
        <boxGeometry args={[WING_W + 0.02, 0.05, WING_D + 0.02]} />
        <meshStandardMaterial color={COL.stoneLight} />
        <Edges color={COL.cota} />
      </mesh>
      {/* Laje superior (base do telhado técnico) */}
      <mesh position={[MAIN_X, FLOOR_H * 2 + FLOOR_GAP + 0.025, 0]}>
        <boxGeometry args={[MAIN_W + 0.04, 0.06, MAIN_D + 0.04]} />
        <meshStandardMaterial color={COL.cota} />
        <Edges color={COL.ink} />
      </mesh>

      {/* === PISOS COLORIDOS POR AMBIENTE — TÉRREO === */}
      {/* Sala de estar (ala completa) */}
      <FloorTile y={0.045} pos={[WING_X, WING_Z]} size={[WING_W - 0.05, WING_D - 0.05]} color="#EDE8DC" />
      {/* Hall de entrada (centro-frente) */}
      <FloorTile y={0.045} pos={[-0.1, 1.05]} size={[1.2, 1.0]} color="#D8D3C3" />
      {/* Sala de jantar (centro do corpo principal) */}
      <FloorTile y={0.045} pos={[0.55, 0.05]} size={[1.5, 1.4]} color="#E5E0D0" />
      {/* Cozinha (back-right) */}
      <FloorTile y={0.045} pos={[1.65, -0.5]} size={[1.4, 2.0]} color="#E0DDD0" />
      {/* Hall + escada (centro-traseira) */}
      <FloorTile y={0.045} pos={[0.0, -0.95]} size={[1.0, 1.2]} color="#D3CEBE" />
      {/* Lavabo (back-left do corpo principal) */}
      <FloorTile y={0.045} pos={[-0.95, -1.1]} size={[0.8, 0.9]} color="#E0E4E7" />

      {/* === PISOS — 2º ANDAR === */}
      {/* Suíte master (lado direito grande) */}
      <FloorTile y={Y_UPPER + 0.045} pos={[1.4, 0.5]} size={[1.55, 2.0]} color="#EDE8DC" />
      {/* Banheiro suíte */}
      <FloorTile y={Y_UPPER + 0.045} pos={[1.95, -0.85]} size={[0.85, 1.4]} color="#E0E4E8" />
      {/* Closet master */}
      <FloorTile y={Y_UPPER + 0.045} pos={[1.05, -0.95]} size={[0.8, 1.0]} color="#E5DCC6" />
      {/* Quarto 2 (back-left) */}
      <FloorTile y={Y_UPPER + 0.045} pos={[-0.45, -0.85]} size={[1.4, 1.4]} color="#E5E0D0" />
      {/* Quarto 3 (front-left) */}
      <FloorTile y={Y_UPPER + 0.045} pos={[-0.45, 0.7]} size={[1.4, 1.4]} color="#E8E2D2" />
      {/* Banheiro social */}
      <FloorTile y={Y_UPPER + 0.045} pos={[0.45, 0.95]} size={[0.7, 1.0]} color="#DCE4E7" />
      {/* Hall escada superior */}
      <FloorTile y={Y_UPPER + 0.045} pos={[0.45, -0.4]} size={[0.7, 1.0]} color="#D3CEBE" />

      {/* === PAREDES INTERNAS — TÉRREO === */}
      {/* Parede entre hall e sala jantar (separa entrada do jantar) */}
      <Wall pos={[0.5, 0.5, 0.6]} size={[0.025, 1.0, 1.0]} />
      {/* Parede sala-jantar / cozinha (volume baixo, abertura ampla) */}
      <Wall pos={[0.95, 0.5, -0.3]} size={[0.025, 1.0, 1.4]} />
      {/* Parede traseira do hall escada (separa de cozinha) */}
      <Wall pos={[0.6, 0.5, -1.45]} size={[1.5, 1.0, 0.025]} />
      {/* Parede lavabo (lateral, separa do hall escada) */}
      <Wall pos={[-0.55, 0.5, -1.0]} size={[0.025, 1.0, 1.0]} />
      {/* Parede lavabo (frontal) */}
      <Wall pos={[-0.95, 0.5, -0.65]} size={[0.8, 1.0, 0.025]} />
      {/* Parede entre ala da sala e corpo principal (com abertura central) */}
      <Wall pos={[-0.8, 0.5, 1.25]} size={[0.025, 1.0, 0.8]} />
      <Wall pos={[-0.8, 0.5, 0.0]} size={[0.025, 1.0, 0.8]} />

      {/* === PAREDES INTERNAS — 2º ANDAR === */}
      {/* Parede divisória central (separa lado esquerdo dos quartos do master) */}
      <Wall pos={[0.65, Y_UPPER + 0.5, 0]} size={[0.025, 1.0, 3.0]} />
      {/* Parede entre quarto 2 e quarto 3 */}
      <Wall pos={[-0.45, Y_UPPER + 0.5, 0.0]} size={[1.4, 1.0, 0.025]} />
      {/* Parede do banheiro social */}
      <Wall pos={[0.1, Y_UPPER + 0.5, 0.95]} size={[0.025, 1.0, 1.0]} />
      <Wall pos={[0.45, Y_UPPER + 0.5, 0.45]} size={[0.7, 1.0, 0.025]} />
      {/* Closet master (separação) */}
      <Wall pos={[1.5, Y_UPPER + 0.5, -0.5]} size={[0.025, 1.0, 0.9]} />
      {/* Banheiro suíte (parede frontal) */}
      <Wall pos={[1.95, Y_UPPER + 0.5, -0.15]} size={[0.85, 1.0, 0.025]} />

      {/* === FACHADA FRONTAL — VIDROS CHÃO-TETO === */}
      {/* Sala de estar - fachada frontal envidraçada */}
      <GlassPanel pos={[WING_X, 0.55, WING_Z_MAX - 0.02]} size={[WING_W - 0.1, 1.0, 0.04]} />
      {/* Sala de estar - lateral envidraçada */}
      <GlassPanel pos={[WING_X - WING_W / 2 + 0.02, 0.55, WING_Z]} size={[0.04, 1.0, WING_D - 0.1]} />
      {/* Sala de jantar - vidro frontal */}
      <GlassPanel pos={[0.55, 0.55, MAIN_D / 2 - 0.02]} size={[1.4, 1.0, 0.04]} />
      {/* Cozinha - vidro lateral direito */}
      <GlassPanel pos={[MAIN_X + MAIN_W / 2 - 0.02, 0.55, -0.5]} size={[0.04, 1.0, 1.4]} />
      {/* Porta de vidro pro quintal (fundos da cozinha) */}
      <GlassPanel pos={[1.65, 0.5, -MAIN_D / 2 + 0.02]} size={[1.0, 0.95, 0.04]} />

      {/* === SACADA MASTER (recuo do 2º andar projetando) === */}
      {/* Piso da sacada (estende além da fachada frontal) */}
      <mesh position={[1.4, Y_UPPER + 0.04, MAIN_D / 2 + 0.4]}>
        <boxGeometry args={[1.4, 0.05, 0.8]} />
        <meshStandardMaterial color={COL.stoneLight} />
        <Edges color={COL.cota} />
      </mesh>
      {/* Guarda-corpo de vidro da sacada — frontal */}
      <mesh position={[1.4, Y_UPPER + 0.36, MAIN_D / 2 + 0.78]}>
        <boxGeometry args={[1.4, 0.65, 0.03]} />
        <meshStandardMaterial color={COL.glass} transparent opacity={0.32} metalness={0.4} roughness={0.1} />
        <Edges color={COL.aurora} threshold={1} />
      </mesh>
      {/* Guarda-corpo lateral direito */}
      <mesh position={[2.08, Y_UPPER + 0.36, MAIN_D / 2 + 0.4]}>
        <boxGeometry args={[0.03, 0.65, 0.8]} />
        <meshStandardMaterial color={COL.glass} transparent opacity={0.32} metalness={0.4} />
        <Edges color={COL.aurora} threshold={1} />
      </mesh>
      {/* Guarda-corpo lateral esquerdo */}
      <mesh position={[0.72, Y_UPPER + 0.36, MAIN_D / 2 + 0.4]}>
        <boxGeometry args={[0.03, 0.65, 0.8]} />
        <meshStandardMaterial color={COL.glass} transparent opacity={0.32} metalness={0.4} />
        <Edges color={COL.aurora} threshold={1} />
      </mesh>
      {/* Vidro chão-teto suíte (acessa sacada) */}
      <GlassPanel pos={[1.4, Y_UPPER + 0.55, MAIN_D / 2 - 0.02]} size={[1.4, 1.0, 0.04]} />

      {/* === TERRAÇO SOBRE A ALA (vira espaço externo do quarto 3) === */}
      {/* Guarda-corpo do terraço (na borda da ala) */}
      <mesh position={[WING_X, Y_UPPER + 0.36, WING_Z_MAX]}>
        <boxGeometry args={[WING_W, 0.65, 0.03]} />
        <meshStandardMaterial color={COL.glass} transparent opacity={0.32} metalness={0.4} />
        <Edges color={COL.aurora} threshold={1} />
      </mesh>
      <mesh position={[WING_X - WING_W / 2, Y_UPPER + 0.36, WING_Z]}>
        <boxGeometry args={[0.03, 0.65, WING_D]} />
        <meshStandardMaterial color={COL.glass} transparent opacity={0.32} metalness={0.4} />
        <Edges color={COL.aurora} threshold={1} />
      </mesh>

      {/* === PORTA PRINCIPAL DE ENTRADA (madeira escura) === */}
      <mesh position={[-0.1, 0.42, MAIN_D / 2 + 0.01]}>
        <boxGeometry args={[0.5, 0.85, 0.04]} />
        <meshStandardMaterial color={COL.woodDark} roughness={0.6} />
        <Edges color={COL.ink} threshold={15} />
      </mesh>
      {/* Maçaneta */}
      <mesh position={[0.08, 0.42, MAIN_D / 2 + 0.04]}>
        <boxGeometry args={[0.04, 0.02, 0.02]} />
        <meshStandardMaterial color={COL.metal} metalness={0.85} />
      </mesh>

      {/* === BOX DA ESCADA — volume vidrado === */}
      {/* Guarda-corpo de vidro mezanino do andar superior (sobre vão de escada) */}
      <mesh position={[0.5, Y_UPPER + 0.4, -0.4]}>
        <boxGeometry args={[0.03, 0.6, 0.95]} />
        <meshStandardMaterial color={COL.glass} transparent opacity={0.3} metalness={0.4} />
        <Edges color={COL.aurora} threshold={1} />
      </mesh>
      <mesh position={[0.0, Y_UPPER + 0.4, -0.05]}>
        <boxGeometry args={[1.0, 0.6, 0.03]} />
        <meshStandardMaterial color={COL.glass} transparent opacity={0.3} metalness={0.4} />
        <Edges color={COL.aurora} threshold={1} />
      </mesh>
    </group>
  );
}

function FloorTile({ y, pos, size, color }) {
  return (
    <mesh position={[pos[0], y, pos[1]]}>
      <boxGeometry args={[size[0], 0.005, size[1]]} />
      <meshStandardMaterial color={color} roughness={0.7} />
    </mesh>
  );
}

function Wall({ pos, size }) {
  return (
    <mesh position={pos}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={COL.wallInner} transparent opacity={0.32} side={THREE.DoubleSide} />
      <Edges color={COL.cota} threshold={15} />
    </mesh>
  );
}

function GlassPanel({ pos, size }) {
  return (
    <mesh position={pos}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={COL.glass} transparent opacity={0.28} metalness={0.4} roughness={0.1} />
      <Edges color={COL.aurora} threshold={1} />
    </mesh>
  );
}

// =====================================================================
// ESCADA — degraus em L com guarda-corpo de vidro
// Posição: hall central traseiro (x ∈ [-0.4, 0.4], z ∈ [-1.4, -0.4])
// =====================================================================
function FloatingStairs() {
  const steps = 10;
  const totalH = FLOOR_H + FLOOR_GAP;
  const stepH = totalH / steps;
  const stepD = 0.10;
  return (
    <group position={[0.05, 0, -0.45]}>
      {Array.from({ length: steps }).map((_, i) => (
        <mesh
          key={i}
          position={[0, i * stepH + stepH / 2, -i * stepD]}
        >
          <boxGeometry args={[0.7, stepH * 0.55, stepD * 0.92]} />
          <meshStandardMaterial color={COL.woodDark} roughness={0.5} />
          <Edges color={COL.ink} threshold={15} />
        </mesh>
      ))}
      {/* Guarda-corpo de vidro lateral direito */}
      <mesh position={[0.36, totalH / 2, -((steps - 1) * stepD) / 2]}>
        <boxGeometry args={[0.025, totalH * 0.7, steps * stepD]} />
        <meshStandardMaterial color={COL.glass} transparent opacity={0.32} metalness={0.4} />
        <Edges color={COL.aurora} threshold={1} />
      </mesh>
      {/* Guarda-corpo de vidro lateral esquerdo */}
      <mesh position={[-0.36, totalH / 2, -((steps - 1) * stepD) / 2]}>
        <boxGeometry args={[0.025, totalH * 0.7, steps * stepD]} />
        <meshStandardMaterial color={COL.glass} transparent opacity={0.32} metalness={0.4} />
        <Edges color={COL.aurora} threshold={1} />
      </mesh>
      {/* Pilares de aço discretos (estrutura) */}
      <mesh position={[0, totalH / 2, -((steps - 1) * stepD)]}>
        <boxGeometry args={[0.04, totalH, 0.04]} />
        <meshStandardMaterial color={COL.metal} metalness={0.7} roughness={0.4} />
      </mesh>
    </group>
  );
}

// =====================================================================
// HALL DE ENTRADA — aparador discreto + tapete
// =====================================================================
function EntranceHall() {
  return (
    <group>
      {/* Aparador (consolo lateral) na parede do hall */}
      <group position={[-0.55, 0.32, 1.05]}>
        <mesh>
          <boxGeometry args={[0.18, 0.05, 0.7]} />
          <meshStandardMaterial color={COL.woodDark} roughness={0.5} />
          <Edges color={COL.ink} threshold={1} />
        </mesh>
        {/* Pernas */}
        {[-0.3, 0.3].map((z, i) => (
          <mesh key={i} position={[0, -0.16, z]}>
            <boxGeometry args={[0.025, 0.32, 0.025]} />
            <meshStandardMaterial color={COL.metal} metalness={0.7} />
          </mesh>
        ))}
        {/* Vaso decorativo */}
        <mesh position={[0, 0.12, 0.15]}>
          <cylinderGeometry args={[0.04, 0.05, 0.18, 12]} />
          <meshStandardMaterial color={COL.stone} />
        </mesh>
      </group>
      {/* Espelho na parede */}
      <mesh position={[-0.62, 0.78, 1.05]}>
        <boxGeometry args={[0.005, 0.55, 0.4]} />
        <meshStandardMaterial color="#D8E8EE" metalness={0.9} roughness={0.05} />
        <Edges color={COL.metal} threshold={1} />
      </mesh>
      {/* Tapete de entrada */}
      <mesh position={[-0.1, 0.052, 1.25]}>
        <boxGeometry args={[0.7, 0.005, 0.45]} />
        <meshStandardMaterial color={COL.rugWarm} roughness={0.85} />
      </mesh>
    </group>
  );
}

// =====================================================================
// SALA DE ESTAR — sofá em L + mesa centro + painel TV + 2 poltronas + tapete
// (na ala projetada, voltada pro painel TV na parede divisória)
// =====================================================================
function LivingRoom() {
  return (
    <group>
      {/* Tapete grande sob a sala */}
      <mesh position={[WING_X, 0.052, WING_Z]}>
        <boxGeometry args={[WING_W - 0.3, 0.005, WING_D - 0.4]} />
        <meshStandardMaterial color={COL.rugWarm} roughness={0.85} />
      </mesh>

      {/* Sofá em L com chaise — voltado pra parede TV (face +X) */}
      <group position={[WING_X - 0.5, 0.18, WING_Z]}>
        {/* Corpo principal (orientado em Z) */}
        <mesh>
          <boxGeometry args={[0.5, 0.22, 1.4]} />
          <meshStandardMaterial color={COL.aurora} roughness={0.7} />
          <Edges color={COL.ink} threshold={15} />
        </mesh>
        {/* Encosto */}
        <mesh position={[-0.21, 0.22, 0]}>
          <boxGeometry args={[0.08, 0.22, 1.4]} />
          <meshStandardMaterial color={COL.aurora} />
        </mesh>
        {/* Chaise (extensão frontal +Z) */}
        <mesh position={[0.4, 0, 0.55]}>
          <boxGeometry args={[0.32, 0.22, 0.3]} />
          <meshStandardMaterial color={COL.aurora} />
          <Edges color={COL.ink} threshold={15} />
        </mesh>
        {/* Almofadas douradas alinhadas no encosto */}
        {[-0.4, 0, 0.4].map((z, i) => (
          <mesh key={i} position={[-0.13, 0.18, z]}>
            <boxGeometry args={[0.18, 0.06, 0.22]} />
            <meshStandardMaterial color={COL.alert} roughness={0.6} />
          </mesh>
        ))}
      </group>

      {/* Mesa de centro — entre sofá e TV */}
      <group position={[WING_X + 0.05, 0.13, WING_Z]}>
        <mesh>
          <boxGeometry args={[0.55, 0.04, 0.7]} />
          <meshStandardMaterial color={COL.woodDark} />
          <Edges color={COL.ink} threshold={1} />
        </mesh>
        {[
          [-0.22, -0.3], [0.22, -0.3], [-0.22, 0.3], [0.22, 0.3]
        ].map((p, i) => (
          <mesh key={i} position={[p[0], -0.06, p[1]]}>
            <boxGeometry args={[0.025, 0.12, 0.025]} />
            <meshStandardMaterial color={COL.metal} metalness={0.7} />
          </mesh>
        ))}
        {/* Objeto decorativo (livro empilhado) */}
        <mesh position={[0, 0.04, 0]}>
          <boxGeometry args={[0.18, 0.03, 0.13]} />
          <meshStandardMaterial color={COL.alert} />
        </mesh>
      </group>

      {/* Painel TV na parede divisória (lado +X da ala, encostado na parede entre ala/jantar) */}
      <group position={[WING_X + WING_W / 2 - 0.05, 0.55, WING_Z]}>
        {/* Painel madeira ripado */}
        <mesh>
          <boxGeometry args={[0.04, 0.95, 1.6]} />
          <meshStandardMaterial color={COL.woodDark} roughness={0.6} />
          <Edges color={COL.ink} threshold={1} />
        </mesh>
        {/* Linhas verticais decorativas (ripado) */}
        {[-0.6, -0.3, 0, 0.3, 0.6].map((z, i) => (
          <mesh key={i} position={[-0.025, 0, z]}>
            <boxGeometry args={[0.005, 0.93, 0.005]} />
            <meshStandardMaterial color={COL.woodLight} />
          </mesh>
        ))}
        {/* TV preta */}
        <mesh position={[-0.025, 0.05, 0]}>
          <boxGeometry args={[0.02, 0.45, 0.85]} />
          <meshStandardMaterial color="#0A0A0A" metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Tela emissive */}
        <mesh position={[-0.04, 0.05, 0]}>
          <boxGeometry args={[0.005, 0.42, 0.8]} />
          <meshStandardMaterial color={COL.auroraGlow} emissive={COL.auroraGlow} emissiveIntensity={0.18} />
        </mesh>
        {/* Rack inferior */}
        <mesh position={[-0.025, -0.42, 0]}>
          <boxGeometry args={[0.04, 0.08, 1.2]} />
          <meshStandardMaterial color={COL.woodLight} />
        </mesh>
      </group>

      {/* 2 poltronas voltadas pra TV (lado +Z da sala, virando pro painel) */}
      {[-0.45, 0.55].map((zoff, i) => (
        <group key={i} position={[WING_X + 0.45, 0.16, WING_Z + zoff]}>
          {/* Assento */}
          <mesh>
            <boxGeometry args={[0.4, 0.18, 0.4]} />
            <meshStandardMaterial color={COL.stone} roughness={0.7} />
            <Edges color={COL.ink} threshold={15} />
          </mesh>
          {/* Encosto */}
          <mesh position={[0.16, 0.18, 0]}>
            <boxGeometry args={[0.08, 0.32, 0.4]} />
            <meshStandardMaterial color={COL.stone} />
          </mesh>
          {/* Almofada */}
          <mesh position={[0, 0.13, 0]}>
            <boxGeometry args={[0.32, 0.04, 0.32]} />
            <meshStandardMaterial color={COL.alert} />
          </mesh>
        </group>
      ))}

      {/* Hub de automação discreto (mantém referência tecnológica) */}
      <group position={[WING_X + WING_W / 2 - 0.06, 0.95, WING_Z + 0.85]}>
        <mesh>
          <boxGeometry args={[0.04, 0.13, 0.1]} />
          <meshStandardMaterial color="#1A2028" metalness={0.6} roughness={0.4} />
          <Edges color={COL.metal} threshold={1} />
        </mesh>
        <mesh position={[-0.025, 0, 0]}>
          <boxGeometry args={[0.005, 0.08, 0.07]} />
          <meshStandardMaterial color={COL.auroraGlow} emissive={COL.auroraGlow} emissiveIntensity={0.4} />
        </mesh>
      </group>
    </group>
  );
}

// =====================================================================
// SALA DE JANTAR — mesa 8 lugares + lustre + buffet
// =====================================================================
function DiningRoom() {
  return (
    <group>
      {/* Tapete sob a mesa */}
      <mesh position={[0.55, 0.052, 0.05]}>
        <boxGeometry args={[1.3, 0.005, 1.2]} />
        <meshStandardMaterial color={COL.stoneLight} roughness={0.85} />
      </mesh>

      {/* Mesa de jantar 8 lugares (retangular) */}
      <group position={[0.55, 0.36, 0.05]}>
        {/* Tampo */}
        <mesh>
          <boxGeometry args={[1.0, 0.04, 0.45]} />
          <meshStandardMaterial color={COL.woodDark} roughness={0.4} metalness={0.1} />
          <Edges color={COL.ink} threshold={1} />
        </mesh>
        {/* Pés (estrutura em X) */}
        {[-0.4, 0.4].map((x, i) => (
          <group key={i} position={[x, -0.18, 0]}>
            <mesh>
              <boxGeometry args={[0.04, 0.36, 0.4]} />
              <meshStandardMaterial color={COL.metal} metalness={0.75} roughness={0.3} />
            </mesh>
          </group>
        ))}
        {/* Conector horizontal */}
        <mesh position={[0, -0.32, 0]}>
          <boxGeometry args={[0.85, 0.02, 0.04]} />
          <meshStandardMaterial color={COL.metal} metalness={0.7} />
        </mesh>
        {/* Centro de mesa decorativo */}
        <mesh position={[0, 0.04, 0]}>
          <boxGeometry args={[0.5, 0.025, 0.12]} />
          <meshStandardMaterial color={COL.alert} />
        </mesh>
      </group>

      {/* 8 cadeiras alinhadas (4 de cada lado) */}
      {[-0.36, -0.12, 0.12, 0.36].map((xoff, i) => (
        <group key={`s1-${i}`}>
          {/* Lado +Z */}
          <DiningChair position={[0.55 + xoff, 0.16, 0.4]} rotY={Math.PI} />
          {/* Lado -Z */}
          <DiningChair position={[0.55 + xoff, 0.16, -0.3]} rotY={0} />
        </group>
      ))}

      {/* Lustre/pendente acima da mesa */}
      <group position={[0.55, 0.95, 0.05]}>
        {/* Cabo */}
        <mesh position={[0, 0.12, 0]}>
          <cylinderGeometry args={[0.005, 0.005, 0.25, 8]} />
          <meshStandardMaterial color={COL.cota} />
        </mesh>
        {/* Cúpula linear (3 pendentes) */}
        {[-0.3, 0, 0.3].map((x, i) => (
          <group key={i} position={[x, 0, 0]}>
            <mesh>
              <cylinderGeometry args={[0.06, 0.08, 0.15, 16]} />
              <meshStandardMaterial color={COL.alert} metalness={0.5} roughness={0.3} />
            </mesh>
            {/* Lâmpada quente */}
            <mesh position={[0, -0.08, 0]}>
              <sphereGeometry args={[0.04, 12, 12]} />
              <meshStandardMaterial color={COL.alert} emissive={COL.alert} emissiveIntensity={0.55} />
            </mesh>
          </group>
        ))}
        {/* Trilho horizontal */}
        <mesh position={[0, 0.07, 0]}>
          <boxGeometry args={[0.7, 0.02, 0.04]} />
          <meshStandardMaterial color={COL.metal} metalness={0.7} />
        </mesh>
      </group>

      {/* Buffet/aparador encostado na parede traseira da sala de jantar */}
      <group position={[0.55, 0.3, 0.65]}>
        <mesh>
          <boxGeometry args={[0.9, 0.5, 0.25]} />
          <meshStandardMaterial color={COL.woodLight} roughness={0.5} />
          <Edges color={COL.ink} threshold={1} />
        </mesh>
        {/* Linhas de portas (2) */}
        {[-0.22, 0.22].map((x, i) => (
          <mesh key={i} position={[x, 0, 0.13]}>
            <boxGeometry args={[0.005, 0.45, 0.005]} />
            <meshStandardMaterial color={COL.metal} metalness={0.7} />
          </mesh>
        ))}
        {/* Tampo em pedra */}
        <mesh position={[0, 0.27, 0]}>
          <boxGeometry args={[0.94, 0.04, 0.28]} />
          <meshStandardMaterial color={COL.stone} roughness={0.3} metalness={0.15} />
        </mesh>
        {/* Quadro grande na parede acima do buffet */}
        <mesh position={[0, 0.7, 0.13]}>
          <boxGeometry args={[0.7, 0.4, 0.02]} />
          <meshStandardMaterial color={COL.aurora} roughness={0.4} />
          <Edges color={COL.alert} threshold={1} />
        </mesh>
      </group>
    </group>
  );
}

function DiningChair({ position, rotY = 0 }) {
  return (
    <group position={position} rotation={[0, rotY, 0]}>
      {/* Assento */}
      <mesh>
        <boxGeometry args={[0.18, 0.03, 0.18]} />
        <meshStandardMaterial color={COL.stone} />
      </mesh>
      {/* Encosto */}
      <mesh position={[0, 0.18, -0.08]}>
        <boxGeometry args={[0.18, 0.32, 0.025]} />
        <meshStandardMaterial color={COL.stone} />
      </mesh>
      {/* Pernas (4) */}
      {[
        [-0.07, -0.07], [0.07, -0.07], [-0.07, 0.07], [0.07, 0.07]
      ].map((p, i) => (
        <mesh key={i} position={[p[0], -0.08, p[1]]}>
          <boxGeometry args={[0.015, 0.16, 0.015]} />
          <meshStandardMaterial color={COL.metal} metalness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

// =====================================================================
// COZINHA — ilha gourmet + bancada com cooktop + armários + geladeira + adega
// =====================================================================
function Kitchen() {
  return (
    <group>
      {/* Bancada de fundo (encostada em -Z) com armários superiores */}
      <group position={[1.65, 0.32, -1.4]}>
        {/* Bancada inferior (gabinetes) */}
        <mesh position={[0, 0, 0.15]}>
          <boxGeometry args={[1.3, 0.6, 0.32]} />
          <meshStandardMaterial color={COL.woodDark} roughness={0.5} />
          <Edges color={COL.ink} threshold={15} />
        </mesh>
        {/* Tampo */}
        <mesh position={[0, 0.32, 0.15]}>
          <boxGeometry args={[1.34, 0.04, 0.34]} />
          <meshStandardMaterial color={COL.stone} roughness={0.3} metalness={0.15} />
        </mesh>
        {/* Pia na bancada (cuba retangular) */}
        <mesh position={[-0.4, 0.34, 0.15]}>
          <boxGeometry args={[0.28, 0.005, 0.2]} />
          <meshStandardMaterial color={COL.inox} metalness={0.85} roughness={0.2} />
        </mesh>
        {/* Torneira da pia */}
        <mesh position={[-0.4, 0.42, 0.05]}>
          <cylinderGeometry args={[0.012, 0.012, 0.15, 8]} />
          <meshStandardMaterial color={COL.metal} metalness={0.85} />
        </mesh>
        <mesh position={[-0.4, 0.5, 0.05]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[0.04, 0.015, 0.015]} />
          <meshStandardMaterial color={COL.metal} metalness={0.85} />
        </mesh>
        {/* Armários superiores */}
        <mesh position={[0, 0.85, 0.18]}>
          <boxGeometry args={[1.34, 0.4, 0.28]} />
          <meshStandardMaterial color={COL.woodLight} roughness={0.5} />
          <Edges color={COL.ink} threshold={1} />
        </mesh>
        {/* Linhas dos armários */}
        {[-0.45, 0, 0.45].map((x, i) => (
          <mesh key={i} position={[x, 0.85, 0.32]}>
            <boxGeometry args={[0.005, 0.36, 0.005]} />
            <meshStandardMaterial color={COL.metal} metalness={0.7} />
          </mesh>
        ))}
        {/* Backsplash (parede entre bancada e armários) */}
        <mesh position={[0, 0.55, 0.24]}>
          <boxGeometry args={[1.34, 0.16, 0.02]} />
          <meshStandardMaterial color={COL.stoneLight} roughness={0.4} />
        </mesh>
      </group>

      {/* Geladeira embutida (alta, no canto direito da cozinha) */}
      <group position={[2.25, 0.55, -1.35]}>
        <mesh>
          <boxGeometry args={[0.28, 1.05, 0.4]} />
          <meshStandardMaterial color={COL.inox} metalness={0.8} roughness={0.25} />
          <Edges color={COL.ink} threshold={15} />
        </mesh>
        {/* Linha divisória das portas */}
        <mesh position={[0, 0.15, 0.205]}>
          <boxGeometry args={[0.26, 0.005, 0.005]} />
          <meshStandardMaterial color={COL.metal} metalness={0.7} />
        </mesh>
        {/* Puxadores verticais */}
        <mesh position={[0, 0.4, 0.215]}>
          <boxGeometry args={[0.005, 0.32, 0.015]} />
          <meshStandardMaterial color={COL.metal} metalness={0.9} />
        </mesh>
        <mesh position={[0, -0.18, 0.215]}>
          <boxGeometry args={[0.005, 0.28, 0.015]} />
          <meshStandardMaterial color={COL.metal} metalness={0.9} />
        </mesh>
        {/* Display */}
        <mesh position={[0, 0.42, 0.21]}>
          <boxGeometry args={[0.06, 0.04, 0.001]} />
          <meshStandardMaterial color={COL.auroraGlow} emissive={COL.auroraGlow} emissiveIntensity={0.4} />
        </mesh>
      </group>

      {/* Adega climatizada ao lado da bancada (lateral esq da cozinha, encostada na parede) */}
      <group position={[1.0, 0.4, -1.4]}>
        <mesh>
          <boxGeometry args={[0.22, 0.78, 0.35]} />
          <meshStandardMaterial color="#0F1A22" metalness={0.5} roughness={0.4} />
          <Edges color={COL.aurora} threshold={1} />
        </mesh>
        {/* Vidro frontal */}
        <mesh position={[0, 0.05, 0.18]}>
          <boxGeometry args={[0.18, 0.6, 0.005]} />
          <meshStandardMaterial color={COL.glass} transparent opacity={0.5} metalness={0.4} />
        </mesh>
        {/* Prateleiras com garrafas (sugestão) */}
        {[0.18, 0, -0.18].map((y, i) => (
          <mesh key={i} position={[0, y, 0.15]}>
            <boxGeometry args={[0.16, 0.005, 0.03]} />
            <meshStandardMaterial color={COL.metal} />
          </mesh>
        ))}
      </group>

      {/* === ILHA GOURMET CENTRAL === */}
      <group position={[1.4, 0.32, -0.55]}>
        {/* Corpo da ilha */}
        <mesh>
          <boxGeometry args={[1.0, 0.6, 0.7]} />
          <meshStandardMaterial color={COL.woodLight} roughness={0.5} />
          <Edges color={COL.ink} threshold={15} />
        </mesh>
        {/* Tampo de pedra premium */}
        <mesh position={[0, 0.32, 0]}>
          <boxGeometry args={[1.04, 0.04, 0.74]} />
          <meshStandardMaterial color={COL.stone} roughness={0.3} metalness={0.15} />
        </mesh>
        {/* Cooktop indução */}
        <mesh position={[0.15, 0.345, -0.12]}>
          <boxGeometry args={[0.55, 0.005, 0.4]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.2} metalness={0.4} />
        </mesh>
        {/* 4 zonas de queimador */}
        {[
          [-0.13, 0.07], [0.13, 0.07],
          [-0.13, -0.07], [0.13, -0.07]
        ].map((p, i) => (
          <mesh key={i} position={[0.15 + p[0], 0.35, -0.12 + p[1]]}>
            <ringGeometry args={[0.04, 0.06, 16]} />
            <meshStandardMaterial color={COL.aurora} side={THREE.DoubleSide} />
          </mesh>
        ))}
        {/* Bancada para refeição rápida (avanço do tampo) */}
        <mesh position={[0, 0.31, 0.5]}>
          <boxGeometry args={[1.04, 0.04, 0.3]} />
          <meshStandardMaterial color={COL.stone} roughness={0.3} metalness={0.15} />
        </mesh>
        {/* Pia secundária na ilha */}
        <mesh position={[-0.32, 0.35, 0.12]}>
          <boxGeometry args={[0.22, 0.005, 0.18]} />
          <meshStandardMaterial color={COL.inox} metalness={0.85} roughness={0.2} />
        </mesh>
        {/* Torneira gourmet curva */}
        <mesh position={[-0.32, 0.43, 0.22]}>
          <cylinderGeometry args={[0.012, 0.012, 0.16, 8]} />
          <meshStandardMaterial color={COL.metal} metalness={0.85} />
        </mesh>
        <mesh position={[-0.32, 0.51, 0.22]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.012, 0.012, 0.12, 8]} />
          <meshStandardMaterial color={COL.metal} metalness={0.85} />
        </mesh>
      </group>

      {/* Coifa pendurada acima da ilha */}
      <group position={[1.55, 1.0, -0.67]}>
        <mesh>
          <boxGeometry args={[0.6, 0.1, 0.4]} />
          <meshStandardMaterial color={COL.inox} metalness={0.8} roughness={0.3} />
          <Edges color={COL.ink} threshold={1} />
        </mesh>
        {/* Conexão com teto */}
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[0.06, 0.05, 0.06]} />
          <meshStandardMaterial color={COL.metal} />
        </mesh>
      </group>

      {/* 3 banquetas no balcão da ilha */}
      {[-0.3, 0, 0.3].map((x, i) => (
        <group key={i} position={[1.4 + x, 0.18, -0.05]}>
          <mesh>
            <cylinderGeometry args={[0.08, 0.08, 0.04, 16]} />
            <meshStandardMaterial color={COL.aurora} roughness={0.5} />
          </mesh>
          {/* Pé */}
          <mesh position={[0, -0.1, 0]}>
            <cylinderGeometry args={[0.015, 0.025, 0.18, 8]} />
            <meshStandardMaterial color={COL.metal} metalness={0.7} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// =====================================================================
// LAVABO — vaso + cuba + espelho (back-left térreo)
// =====================================================================
function PowderRoom() {
  return (
    <group position={[-0.95, 0, -1.1]}>
      {/* Cuba sobre bancada */}
      <group position={[-0.25, 0.55, 0]}>
        <mesh>
          <boxGeometry args={[0.18, 0.04, 0.45]} />
          <meshStandardMaterial color={COL.stone} roughness={0.3} metalness={0.15} />
          <Edges color={COL.cota} threshold={1} />
        </mesh>
        {/* Cuba */}
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.08, 0.07, 0.06, 16]} />
          <meshStandardMaterial color={COL.paper} metalness={0.2} roughness={0.5} />
        </mesh>
        {/* Torneira */}
        <mesh position={[-0.05, 0.12, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.12, 8]} />
          <meshStandardMaterial color={COL.metal} metalness={0.85} />
        </mesh>
        {/* Espelho redondo */}
        <mesh position={[-0.1, 0.4, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.16, 0.16, 0.005, 24]} />
          <meshStandardMaterial color="#D8E8EE" metalness={0.9} roughness={0.05} />
        </mesh>
      </group>
      {/* Vaso sanitário */}
      <group position={[0.2, 0.18, 0]}>
        <mesh>
          <boxGeometry args={[0.2, 0.32, 0.32]} />
          <meshStandardMaterial color={COL.paper} roughness={0.45} metalness={0.15} />
          <Edges color={COL.cota} threshold={15} />
        </mesh>
        {/* Caixa acoplada */}
        <mesh position={[-0.04, 0.22, -0.08]}>
          <boxGeometry args={[0.12, 0.18, 0.18]} />
          <meshStandardMaterial color={COL.paper} roughness={0.4} />
        </mesh>
      </group>
    </group>
  );
}

// =====================================================================
// 2º ANDAR — SUÍTE MASTER + 2 QUARTOS + BANHEIRO SOCIAL
// =====================================================================
function UpperFloor() {
  const baseY = Y_UPPER + 0.05;
  return (
    <group>
      {/* === SUÍTE MASTER (lado direito) === */}
      {/* Cama king na suíte master, encostada na parede divisória */}
      <group position={[1.4, baseY + 0.16, 0.55]}>
        {/* Base */}
        <mesh>
          <boxGeometry args={[1.2, 0.18, 0.85]} />
          <meshStandardMaterial color="#EFEAE0" roughness={0.7} />
          <Edges color={COL.cota} threshold={15} />
        </mesh>
        {/* Colchão */}
        <mesh position={[0, 0.13, 0]}>
          <boxGeometry args={[1.15, 0.1, 0.8]} />
          <meshStandardMaterial color="#E8DCC4" roughness={0.8} />
        </mesh>
        {/* Travesseiros (2 grandes + 2 menores) */}
        <mesh position={[-0.3, 0.22, 0.32]}>
          <boxGeometry args={[0.45, 0.07, 0.18]} />
          <meshStandardMaterial color={COL.paper} />
        </mesh>
        <mesh position={[0.3, 0.22, 0.32]}>
          <boxGeometry args={[0.45, 0.07, 0.18]} />
          <meshStandardMaterial color={COL.paper} />
        </mesh>
        {/* Edredom */}
        <mesh position={[0, 0.18, -0.18]}>
          <boxGeometry args={[1.15, 0.06, 0.4]} />
          <meshStandardMaterial color={COL.aurora} roughness={0.7} />
        </mesh>
        {/* Cabeceira estofada (lado +Z = parede) */}
        <mesh position={[0, 0.45, 0.43]}>
          <boxGeometry args={[1.25, 0.55, 0.05]} />
          <meshStandardMaterial color={COL.aurora} roughness={0.6} />
          <Edges color={COL.ink} threshold={15} />
        </mesh>
        {/* Linhas decorativas capitonê */}
        {[0.18, 0, -0.18].map((y, i) => (
          <mesh key={i} position={[0, 0.45 + y, 0.4]}>
            <boxGeometry args={[1.15, 0.005, 0.001]} />
            <meshStandardMaterial color={COL.auroraDeep} />
          </mesh>
        ))}
      </group>

      {/* 2 criados-mudos (dos lados da cama) */}
      {[-0.7, 0.7].map((xoff, i) => (
        <group key={i} position={[1.4 + xoff, baseY + 0.18, 0.85]}>
          <mesh>
            <boxGeometry args={[0.22, 0.32, 0.3]} />
            <meshStandardMaterial color={COL.woodLight} />
            <Edges color={COL.ink} threshold={1} />
          </mesh>
          {/* Abajur */}
          <mesh position={[0, 0.22, 0]}>
            <cylinderGeometry args={[0.06, 0.08, 0.12, 12]} />
            <meshStandardMaterial color={COL.paper} emissive={COL.alert} emissiveIntensity={0.3} />
          </mesh>
        </group>
      ))}

      {/* === CLOSET MASTER (entre cama e banheiro) === */}
      <group position={[1.05, baseY + 0.4, -0.95]}>
        {/* Armário 1 */}
        <mesh>
          <boxGeometry args={[0.4, 0.78, 0.85]} />
          <meshStandardMaterial color={COL.woodDark} roughness={0.5} />
          <Edges color={COL.ink} threshold={1} />
        </mesh>
        {/* Linhas das portas */}
        {[0.3, 0, -0.3].map((z, i) => (
          <mesh key={i} position={[0.205, 0, z]}>
            <boxGeometry args={[0.001, 0.7, 0.005]} />
            <meshStandardMaterial color={COL.metal} metalness={0.7} />
          </mesh>
        ))}
        {/* Espelho de corpo inteiro */}
        <mesh position={[-0.205, 0, 0]}>
          <boxGeometry args={[0.001, 0.72, 0.78]} />
          <meshStandardMaterial color="#D8E8EE" metalness={0.9} roughness={0.05} />
        </mesh>
      </group>

      {/* === BANHEIRO SUÍTE === */}
      {/* Bancada com 2 cubas */}
      <group position={[1.95, baseY + 0.5, -0.55]}>
        <mesh>
          <boxGeometry args={[0.35, 0.06, 0.85]} />
          <meshStandardMaterial color={COL.stone} roughness={0.3} metalness={0.15} />
          <Edges color={COL.cota} threshold={1} />
        </mesh>
        {/* Gabinete embaixo */}
        <mesh position={[0, -0.18, 0]}>
          <boxGeometry args={[0.32, 0.32, 0.78]} />
          <meshStandardMaterial color={COL.woodDark} roughness={0.5} />
        </mesh>
        {/* Cuba 1 */}
        <mesh position={[0, 0.04, -0.22]}>
          <cylinderGeometry args={[0.07, 0.06, 0.04, 16]} />
          <meshStandardMaterial color={COL.paper} metalness={0.2} roughness={0.5} />
        </mesh>
        {/* Cuba 2 */}
        <mesh position={[0, 0.04, 0.22]}>
          <cylinderGeometry args={[0.07, 0.06, 0.04, 16]} />
          <meshStandardMaterial color={COL.paper} metalness={0.2} roughness={0.5} />
        </mesh>
        {/* Torneira 1 */}
        <mesh position={[-0.08, 0.12, -0.22]}>
          <cylinderGeometry args={[0.012, 0.012, 0.12, 8]} />
          <meshStandardMaterial color={COL.metal} metalness={0.85} />
        </mesh>
        {/* Torneira 2 */}
        <mesh position={[-0.08, 0.12, 0.22]}>
          <cylinderGeometry args={[0.012, 0.012, 0.12, 8]} />
          <meshStandardMaterial color={COL.metal} metalness={0.85} />
        </mesh>
        {/* Espelho duplo na parede */}
        <mesh position={[0.18, 0.45, 0]}>
          <boxGeometry args={[0.005, 0.5, 0.78]} />
          <meshStandardMaterial color="#D8E8EE" metalness={0.9} roughness={0.05} />
        </mesh>
      </group>

      {/* Vaso da suíte */}
      <group position={[1.95, baseY + 0.18, -1.3]}>
        <mesh>
          <boxGeometry args={[0.22, 0.32, 0.32]} />
          <meshStandardMaterial color={COL.paper} metalness={0.15} roughness={0.45} />
          <Edges color={COL.cota} threshold={15} />
        </mesh>
        <mesh position={[-0.04, 0.22, -0.08]}>
          <boxGeometry args={[0.12, 0.18, 0.18]} />
          <meshStandardMaterial color={COL.paper} roughness={0.4} />
        </mesh>
      </group>

      {/* Box do chuveiro (área separada com vidro) */}
      <group position={[1.95, baseY + 0.5, 0.2]}>
        {/* Vidro do box (lateral) */}
        <mesh position={[-0.18, 0.05, 0.2]}>
          <boxGeometry args={[0.005, 0.85, 0.4]} />
          <meshStandardMaterial color={COL.glass} transparent opacity={0.32} metalness={0.4} />
          <Edges color={COL.aurora} threshold={1} />
        </mesh>
        {/* Vidro frontal */}
        <mesh position={[0, 0.05, 0.4]}>
          <boxGeometry args={[0.35, 0.85, 0.005]} />
          <meshStandardMaterial color={COL.glass} transparent opacity={0.32} metalness={0.4} />
          <Edges color={COL.aurora} threshold={1} />
        </mesh>
        {/* Chuveiro (cabeça) */}
        <mesh position={[0, 0.42, 0.18]}>
          <cylinderGeometry args={[0.1, 0.11, 0.025, 20]} />
          <meshStandardMaterial color={COL.metal} metalness={0.85} roughness={0.2} />
        </mesh>
        {/* Haste */}
        <mesh position={[0, 0.32, 0.18]}>
          <cylinderGeometry args={[0.012, 0.012, 0.2, 8]} />
          <meshStandardMaterial color={COL.metal} />
        </mesh>
      </group>

      {/* === QUARTO 2 (back-left) === */}
      <group position={[-0.45, baseY + 0.14, -0.85]}>
        {/* Cama de casal */}
        <mesh>
          <boxGeometry args={[0.7, 0.16, 1.0]} />
          <meshStandardMaterial color="#EFEAE0" />
          <Edges color={COL.cota} threshold={15} />
        </mesh>
        {/* Colchão */}
        <mesh position={[0, 0.12, 0]}>
          <boxGeometry args={[0.66, 0.08, 0.96]} />
          <meshStandardMaterial color="#E8DCC4" />
        </mesh>
        {/* Edredom */}
        <mesh position={[0, 0.18, -0.2]}>
          <boxGeometry args={[0.66, 0.05, 0.5]} />
          <meshStandardMaterial color={COL.alert} roughness={0.7} />
        </mesh>
        {/* Travesseiros */}
        <mesh position={[0, 0.2, 0.4]}>
          <boxGeometry args={[0.55, 0.05, 0.18]} />
          <meshStandardMaterial color={COL.paper} />
        </mesh>
        {/* Cabeceira (lado +Z = parede do fundo) */}
        <mesh position={[0, 0.4, 0.51]}>
          <boxGeometry args={[0.78, 0.45, 0.04]} />
          <meshStandardMaterial color={COL.woodDark} />
        </mesh>
      </group>
      {/* Criado-mudo Q2 */}
      <group position={[-1.0, baseY + 0.16, -0.4]}>
        <mesh>
          <boxGeometry args={[0.18, 0.3, 0.22]} />
          <meshStandardMaterial color={COL.woodLight} />
          <Edges color={COL.ink} threshold={1} />
        </mesh>
      </group>
      {/* Guarda-roupa Q2 (parede de fundo) */}
      <group position={[-1.05, baseY + 0.4, -1.3]}>
        <mesh>
          <boxGeometry args={[0.85, 0.78, 0.25]} />
          <meshStandardMaterial color={COL.woodDark} roughness={0.5} />
          <Edges color={COL.ink} threshold={1} />
        </mesh>
        {/* Linhas das portas (3 vertical) */}
        {[-0.3, 0, 0.3].map((x, i) => (
          <mesh key={i} position={[x, 0, 0.13]}>
            <boxGeometry args={[0.005, 0.7, 0.005]} />
            <meshStandardMaterial color={COL.metal} metalness={0.7} />
          </mesh>
        ))}
      </group>

      {/* === QUARTO 3 (front-left) === */}
      <group position={[-0.45, baseY + 0.14, 0.7]}>
        {/* Cama de solteiro */}
        <mesh>
          <boxGeometry args={[0.6, 0.16, 1.0]} />
          <meshStandardMaterial color="#EFEAE0" />
          <Edges color={COL.cota} threshold={15} />
        </mesh>
        {/* Colchão */}
        <mesh position={[0, 0.12, 0]}>
          <boxGeometry args={[0.56, 0.08, 0.96]} />
          <meshStandardMaterial color="#E8DCC4" />
        </mesh>
        {/* Edredom */}
        <mesh position={[0, 0.18, -0.18]}>
          <boxGeometry args={[0.56, 0.05, 0.5]} />
          <meshStandardMaterial color={COL.aurora} roughness={0.7} />
        </mesh>
        {/* Travesseiro */}
        <mesh position={[0, 0.2, 0.4]}>
          <boxGeometry args={[0.5, 0.05, 0.16]} />
          <meshStandardMaterial color={COL.paper} />
        </mesh>
        {/* Cabeceira */}
        <mesh position={[0, 0.4, 0.51]}>
          <boxGeometry args={[0.7, 0.4, 0.04]} />
          <meshStandardMaterial color={COL.woodLight} />
        </mesh>
      </group>
      {/* Criado-mudo Q3 */}
      <group position={[-1.0, baseY + 0.16, 1.05]}>
        <mesh>
          <boxGeometry args={[0.18, 0.3, 0.22]} />
          <meshStandardMaterial color={COL.woodLight} />
        </mesh>
      </group>
      {/* Mesa estudo Q3 */}
      <group position={[-1.05, baseY + 0.34, 0.3]}>
        <mesh>
          <boxGeometry args={[0.4, 0.04, 0.28]} />
          <meshStandardMaterial color={COL.woodDark} />
        </mesh>
        {[-0.16, 0.16].map((x, i) => (
          <mesh key={i} position={[x, -0.18, 0]}>
            <boxGeometry args={[0.025, 0.34, 0.04]} />
            <meshStandardMaterial color={COL.metal} metalness={0.7} />
          </mesh>
        ))}
      </group>

      {/* === BANHEIRO SOCIAL (entre Q2 e Q3) === */}
      <group position={[0.45, baseY, 0.95]}>
        {/* Vaso */}
        <group position={[-0.18, 0.18, 0.3]}>
          <mesh>
            <boxGeometry args={[0.18, 0.3, 0.28]} />
            <meshStandardMaterial color={COL.paper} metalness={0.15} roughness={0.45} />
            <Edges color={COL.cota} threshold={15} />
          </mesh>
          <mesh position={[0, 0.21, -0.07]}>
            <boxGeometry args={[0.1, 0.18, 0.16]} />
            <meshStandardMaterial color={COL.paper} />
          </mesh>
        </group>
        {/* Cuba sobre bancada */}
        <group position={[0.18, 0.55, 0]}>
          <mesh>
            <boxGeometry args={[0.18, 0.04, 0.45]} />
            <meshStandardMaterial color={COL.stone} />
          </mesh>
          <mesh position={[0, 0.04, 0]}>
            <cylinderGeometry args={[0.07, 0.06, 0.05, 16]} />
            <meshStandardMaterial color={COL.paper} />
          </mesh>
          {/* Torneira */}
          <mesh position={[-0.05, 0.13, 0]}>
            <cylinderGeometry args={[0.012, 0.012, 0.12, 8]} />
            <meshStandardMaterial color={COL.metal} metalness={0.85} />
          </mesh>
          {/* Espelho */}
          <mesh position={[-0.1, 0.32, 0]}>
            <boxGeometry args={[0.005, 0.4, 0.4]} />
            <meshStandardMaterial color="#D8E8EE" metalness={0.9} roughness={0.05} />
          </mesh>
        </group>
        {/* Box chuveiro com vidro */}
        <group position={[0.18, 0.45, -0.35]}>
          <mesh position={[-0.1, 0, 0]}>
            <boxGeometry args={[0.005, 0.78, 0.4]} />
            <meshStandardMaterial color={COL.glass} transparent opacity={0.3} metalness={0.4} />
            <Edges color={COL.aurora} threshold={1} />
          </mesh>
          {/* Cabeça do chuveiro */}
          <mesh position={[0, 0.4, 0]}>
            <cylinderGeometry args={[0.08, 0.09, 0.02, 16]} />
            <meshStandardMaterial color={COL.metal} metalness={0.85} />
          </mesh>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.012, 0.012, 0.18, 8]} />
            <meshStandardMaterial color={COL.metal} />
          </mesh>
        </group>
      </group>

      {/* === MESA E CADEIRAS NA SACADA MASTER === */}
      <group position={[1.4, Y_UPPER + 0.27, MAIN_D / 2 + 0.4]}>
        {/* Mesinha de café */}
        <mesh>
          <cylinderGeometry args={[0.18, 0.18, 0.04, 24]} />
          <meshStandardMaterial color={COL.stoneLight} roughness={0.5} />
        </mesh>
        <mesh position={[0, -0.12, 0]}>
          <cylinderGeometry args={[0.025, 0.04, 0.22, 12]} />
          <meshStandardMaterial color={COL.metal} metalness={0.7} />
        </mesh>
        {/* 2 cadeiras */}
        {[-0.4, 0.4].map((x, i) => (
          <group key={i} position={[x, -0.1, 0]}>
            <mesh>
              <cylinderGeometry args={[0.13, 0.13, 0.04, 16]} />
              <meshStandardMaterial color={COL.aurora} />
            </mesh>
            <mesh position={[0, -0.1, 0]}>
              <cylinderGeometry args={[0.018, 0.025, 0.18, 8]} />
              <meshStandardMaterial color={COL.metal} metalness={0.7} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

// =====================================================================
// TELHADO TÉCNICO — reservatórios + solar + boiler + equipamentos
// =====================================================================
function TechnicalRoof() {
  const roofY = ROOF_TOP_Y;
  return (
    <group>
      {/* Parapeito (4 lados do corpo principal) */}
      <mesh position={[MAIN_X, roofY + 0.06, MAIN_D / 2]}>
        <boxGeometry args={[MAIN_W + 0.04, 0.12, 0.05]} />
        <meshStandardMaterial color={COL.cota} />
      </mesh>
      <mesh position={[MAIN_X, roofY + 0.06, -MAIN_D / 2]}>
        <boxGeometry args={[MAIN_W + 0.04, 0.12, 0.05]} />
        <meshStandardMaterial color={COL.cota} />
      </mesh>
      <mesh position={[MAIN_X + MAIN_W / 2, roofY + 0.06, 0]}>
        <boxGeometry args={[0.05, 0.12, MAIN_D + 0.04]} />
        <meshStandardMaterial color={COL.cota} />
      </mesh>
      <mesh position={[MAIN_X - MAIN_W / 2, roofY + 0.06, 0]}>
        <boxGeometry args={[0.05, 0.12, MAIN_D + 0.04]} />
        <meshStandardMaterial color={COL.cota} />
      </mesh>

      {/* RESERVATÓRIOS MODULARES — 4 cilindros (back, sobre o shaft) */}
      {[0, 1, 2, 3].map((i) => (
        <group key={i} position={[MAIN_X - 0.48 + i * 0.32, roofY + 0.32, -1.15]}>
          <mesh>
            <cylinderGeometry args={[0.13, 0.13, 0.55, 24]} />
            <meshStandardMaterial color={COL.auroraGlow} transparent opacity={0.45} metalness={0.4} roughness={0.3} />
            <Edges color={COL.aurora} threshold={1} />
          </mesh>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.14, 0.14, 0.04, 24]} />
            <meshStandardMaterial color={COL.aurora} metalness={0.6} />
          </mesh>
          {i < 3 && (
            <mesh position={[0.16, -0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.018, 0.018, 0.16, 8]} />
              <meshStandardMaterial color={COL.metal} />
            </mesh>
          )}
        </group>
      ))}

      {/* Suporte estrutural dos reservatórios */}
      <mesh position={[MAIN_X, roofY + 0.04, -1.15]}>
        <boxGeometry args={[1.4, 0.04, 0.32]} />
        <meshStandardMaterial color={COL.cota} />
      </mesh>

      {/* PAINÉIS SOLARES — 6 painéis em 2 fileiras (no centro do telhado) */}
      <group position={[MAIN_X - 0.3, roofY + 0.05, 0.6]} rotation={[-0.25, 0, 0]}>
        {[0, 1, 2].map((i) => (
          <group key={`r1-${i}`} position={[i * 0.42 - 0.42, 0, 0]}>
            <mesh>
              <boxGeometry args={[0.4, 0.025, 0.55]} />
              <meshStandardMaterial color="#0A1A26" metalness={0.7} roughness={0.3} />
            </mesh>
            {[0.2, 0.07, -0.07, -0.2].map((z, j) => (
              <mesh key={j} position={[0, 0.014, z]}>
                <boxGeometry args={[0.38, 0.001, 0.005]} />
                <meshStandardMaterial color={COL.auroraGlow} />
              </mesh>
            ))}
            <Edges color={COL.auroraGlow} threshold={1} />
          </group>
        ))}
      </group>
      <group position={[MAIN_X - 0.3, roofY + 0.05, 0.0]} rotation={[-0.25, 0, 0]}>
        {[0, 1, 2].map((i) => (
          <group key={`r2-${i}`} position={[i * 0.42 - 0.42, 0, 0]}>
            <mesh>
              <boxGeometry args={[0.4, 0.025, 0.55]} />
              <meshStandardMaterial color="#0A1A26" metalness={0.7} roughness={0.3} />
            </mesh>
            {[0.2, 0.07, -0.07, -0.2].map((z, j) => (
              <mesh key={j} position={[0, 0.014, z]}>
                <boxGeometry args={[0.38, 0.001, 0.005]} />
                <meshStandardMaterial color={COL.auroraGlow} />
              </mesh>
            ))}
            <Edges color={COL.auroraGlow} threshold={1} />
          </group>
        ))}
      </group>

      {/* BOILER térmico horizontal */}
      <group position={[MAIN_X + MAIN_W / 2 - 0.4, roofY + 0.18, 0.4]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.14, 0.14, 0.5, 24]} />
          <meshStandardMaterial color={COL.metal} metalness={0.7} roughness={0.3} />
          <Edges color={COL.aurora} />
        </mesh>
        <mesh position={[-0.27, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.15, 0.15, 0.04, 24]} />
          <meshStandardMaterial color={COL.aurora} metalness={0.6} />
        </mesh>
        <mesh position={[0.27, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.15, 0.15, 0.04, 24]} />
          <meshStandardMaterial color={COL.aurora} metalness={0.6} />
        </mesh>
        {/* Etiqueta */}
        <mesh position={[0, 0.15, 0]}>
          <boxGeometry args={[0.35, 0.001, 0.06]} />
          <meshStandardMaterial color={COL.alert} />
        </mesh>
      </group>

      {/* AQUECEDOR A GÁS auxiliar — REMOVIDO (equipamento órfão após remoção da rede de gás) */}
    </group>
  );
}

// =====================================================================
// ÁREA EXTERNA — quintal: deck + piscina + churrasqueira (atrás da cozinha)
// =====================================================================
function ExternalArea() {
  return (
    <group>
      {/* Deck de madeira (atrás da cozinha, lado -Z) */}
      <mesh position={[1.65, 0.025, -2.3]}>
        <boxGeometry args={[1.5, 0.05, 1.0]} />
        <meshStandardMaterial color={COL.deckWood} roughness={0.7} />
      </mesh>
      {/* Ripas do deck */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <mesh key={i} position={[1.0 + i * 0.18, 0.052, -2.3]}>
          <boxGeometry args={[0.02, 0.001, 0.95]} />
          <meshStandardMaterial color={COL.woodDark} />
        </mesh>
      ))}

      {/* PISCINA (lado direito do quintal) */}
      <group position={[2.7, 0, -1.0]}>
        <mesh>
          <boxGeometry args={[0.85, 0.12, 1.6]} />
          <meshStandardMaterial color={COL.aurora} />
          <Edges color={COL.ink} threshold={1} />
        </mesh>
        <mesh position={[0, 0.07, 0]}>
          <boxGeometry args={[0.8, 0.04, 1.55]} />
          <meshStandardMaterial color={COL.pool} transparent opacity={0.7} metalness={0.3} roughness={0.2} />
        </mesh>
        {/* Borda infinita */}
        <mesh position={[0.42, 0.04, 0]}>
          <boxGeometry args={[0.04, 0.16, 1.6]} />
          <meshStandardMaterial color={COL.stone} />
        </mesh>
      </group>

      {/* CHURRASQUEIRA / Área gourmet (no canto traseiro) */}
      <group position={[0.4, 0, -2.3]}>
        {/* Cobertura */}
        <mesh position={[0, 1.0, 0]}>
          <boxGeometry args={[0.9, 0.06, 0.7]} />
          <meshStandardMaterial color={COL.woodDark} />
        </mesh>
        {/* Pilares */}
        {[
          [-0.4, -0.3], [0.4, -0.3], [-0.4, 0.3], [0.4, 0.3]
        ].map((p, i) => (
          <mesh key={i} position={[p[0], 0.5, p[1]]}>
            <boxGeometry args={[0.06, 1.0, 0.06]} />
            <meshStandardMaterial color={COL.metal} metalness={0.6} />
          </mesh>
        ))}
        {/* Bancada churrasqueira */}
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[0.8, 0.5, 0.35]} />
          <meshStandardMaterial color={COL.stone} />
          <Edges color={COL.ink} threshold={1} />
        </mesh>
        {/* Churrasqueira */}
        <mesh position={[0, 0.7, 0]}>
          <boxGeometry args={[0.4, 0.15, 0.3]} />
          <meshStandardMaterial color="#1A1A1A" metalness={0.6} roughness={0.4} />
        </mesh>
        {/* Coifa */}
        <mesh position={[0, 0.92, 0]}>
          <boxGeometry args={[0.42, 0.1, 0.32]} />
          <meshStandardMaterial color={COL.inox} metalness={0.8} />
        </mesh>
      </group>

      {/* JARDIM/Grama no quintal (área verde simples) */}
      <mesh position={[1.65, 0.005, -2.95]}>
        <boxGeometry args={[3.5, 0.005, 0.6]} />
        <meshStandardMaterial color="#7A9B6A" roughness={0.95} />
      </mesh>

      {/* UNIDADES VRF outdoor — REMOVIDAS (lateral esquerda externa, conforme cleanup da fachada esquerda) */}

      {/* INVERSOR SOLAR (na parede lateral) */}
      <group position={[HOUSE_X_MIN - 0.05, 1.2, 0.0]}>
        <mesh>
          <boxGeometry args={[0.04, 0.32, 0.22]} />
          <meshStandardMaterial color="#1A2028" metalness={0.7} roughness={0.4} />
          <Edges color={COL.metal} threshold={1} />
        </mesh>
        <mesh position={[-0.025, 0.05, 0]}>
          <boxGeometry args={[0.005, 0.06, 0.14]} />
          <meshStandardMaterial color={COL.auroraGlow} emissive={COL.auroraGlow} emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[-0.025, -0.08, 0]}>
          <boxGeometry args={[0.005, 0.04, 0.14]} />
          <meshStandardMaterial color={COL.alert} />
        </mesh>
      </group>
    </group>
  );
}

// =====================================================================
// EQUIPAMENTOS HIDRÁULICOS — adaptados pro novo shaft (parede traseira do hall escada)
// Shaft: SHAFT_X = 0.6, SHAFT_Z = -1.45
// =====================================================================
function HydraulicEquipment() {
  return (
    <group>
      {/* === HIDRÔMETRO + REGISTRO GERAL — entrada de água (frente da casa, lateral esq) === */}
      <group position={[HOUSE_X_MIN - 0.05, 0.18, WING_Z_MAX - 0.2]}>
        <mesh>
          <boxGeometry args={[0.14, 0.16, 0.14]} />
          <meshStandardMaterial color={COL.aurora} metalness={0.5} roughness={0.4} />
          <Edges color={COL.ink} threshold={1} />
        </mesh>
        {/* Mostrador */}
        <mesh position={[-0.08, 0.04, 0]} rotation={[0, Math.PI / 2, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 0.005, 16]} />
          <meshStandardMaterial color={COL.paper} />
        </mesh>
        {/* Registro */}
        <mesh position={[0, -0.13, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.06, 12]} />
          <meshStandardMaterial color={COL.metal} metalness={0.7} />
        </mesh>
        <mesh position={[0, -0.18, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.025, 0.005, 8, 16]} />
          <meshStandardMaterial color={COL.cota} />
        </mesh>
      </group>

      {/* === FILTRO DE ÁGUA — entrada no shaft técnico === */}
      <group position={[SHAFT_X - 0.5, 0.42, SHAFT_Z]}>
        <mesh>
          <cylinderGeometry args={[0.05, 0.05, 0.22, 16]} />
          <meshStandardMaterial color={COL.metal} metalness={0.4} roughness={0.5} />
          <Edges color={COL.ink} threshold={15} />
        </mesh>
        <mesh position={[0, 0.13, 0]}>
          <boxGeometry args={[0.13, 0.05, 0.13]} />
          <meshStandardMaterial color={COL.aurora} metalness={0.5} />
        </mesh>
        <mesh position={[0, 0.04, 0.052]}>
          <boxGeometry args={[0.08, 0.025, 0.001]} />
          <meshStandardMaterial color={COL.alert} />
        </mesh>
      </group>

      {/* === MANIFOLD ÁGUA FRIA — distribuição central no shaft === */}
      <group position={[SHAFT_X, 0.55, SHAFT_Z]}>
        <mesh>
          <boxGeometry args={[0.55, 0.1, 0.08]} />
          <meshStandardMaterial color={COL.fria} metalness={0.5} roughness={0.4} />
          <Edges color={COL.aurora} threshold={1} />
        </mesh>
        {[-0.2, -0.1, 0, 0.1, 0.2].map((x, i) => (
          <group key={i} position={[x, -0.07, 0]}>
            <mesh>
              <cylinderGeometry args={[0.012, 0.012, 0.05, 12]} />
              <meshStandardMaterial color={COL.fria} />
            </mesh>
            <mesh position={[0, -0.035, 0]}>
              <boxGeometry args={[0.03, 0.02, 0.03]} />
              <meshStandardMaterial color={COL.metal} metalness={0.6} />
            </mesh>
          </group>
        ))}
        <mesh position={[0, 0.06, 0.041]}>
          <boxGeometry args={[0.4, 0.018, 0.001]} />
          <meshStandardMaterial color={COL.aurora} />
        </mesh>
      </group>

      {/* === MANIFOLD ÁGUA QUENTE === */}
      <group position={[SHAFT_X + 0.7, 0.55, SHAFT_Z]}>
        <mesh>
          <boxGeometry args={[0.55, 0.1, 0.08]} />
          <meshStandardMaterial color={COL.alert} metalness={0.5} roughness={0.4} />
          <Edges color={COL.aurora} threshold={1} />
        </mesh>
        {[-0.2, -0.1, 0, 0.1, 0.2].map((x, i) => (
          <group key={i} position={[x, -0.07, 0]}>
            <mesh>
              <cylinderGeometry args={[0.012, 0.012, 0.05, 12]} />
              <meshStandardMaterial color={COL.quente} />
            </mesh>
            <mesh position={[0, -0.035, 0]}>
              <boxGeometry args={[0.03, 0.02, 0.03]} />
              <meshStandardMaterial color={COL.metal} metalness={0.6} />
            </mesh>
          </group>
        ))}
        <mesh position={[0, 0.06, 0.041]}>
          <boxGeometry args={[0.4, 0.018, 0.001]} />
          <meshStandardMaterial color={COL.alert} />
        </mesh>
      </group>

      {/* === MISTURADORA TERMOSTÁTICA === */}
      <group position={[SHAFT_X + 0.35, 0.7, SHAFT_Z]}>
        <mesh>
          <boxGeometry args={[0.13, 0.18, 0.1]} />
          <meshStandardMaterial color={COL.metal} metalness={0.7} roughness={0.3} />
          <Edges color={COL.ink} threshold={1} />
        </mesh>
        <mesh position={[0, 0.04, 0.052]}>
          <boxGeometry args={[0.08, 0.04, 0.001]} />
          <meshStandardMaterial color={COL.auroraGlow} emissive={COL.auroraGlow} emissiveIntensity={0.45} />
        </mesh>
        <mesh position={[0, 0.13, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.04, 12]} />
          <meshStandardMaterial color={COL.aurora} metalness={0.6} />
        </mesh>
      </group>

      {/* === PRESSURIZADOR INLINE === */}
      <group position={[SHAFT_X + 1.05, 0.45, SHAFT_Z]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.07, 0.07, 0.18, 20]} />
          <meshStandardMaterial color={COL.metal} metalness={0.7} roughness={0.3} />
          <Edges color={COL.aurora} threshold={1} />
        </mesh>
        <mesh position={[0, 0.08, 0]}>
          <boxGeometry args={[0.14, 0.08, 0.12]} />
          <meshStandardMaterial color={COL.aurora} metalness={0.5} />
        </mesh>
        <mesh position={[0, 0.13, 0.061]}>
          <sphereGeometry args={[0.008, 12, 12]} />
          <meshStandardMaterial color={COL.auroraGlow} emissive={COL.auroraGlow} emissiveIntensity={0.7} />
        </mesh>
      </group>

      {/* === BOMBA DE CALOR auxiliar (lateral direita externa) === */}
      <group position={[HOUSE_X_MAX + 0.25, 0.3, -1.2]}>
        <mesh>
          <boxGeometry args={[0.34, 0.5, 0.32]} />
          <meshStandardMaterial color="#E5E5E5" metalness={0.25} roughness={0.55} />
          <Edges color={COL.ink} />
        </mesh>
        <mesh position={[0, 0, 0.165]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.13, 0.012, 8, 24]} />
          <meshStandardMaterial color={COL.cota} />
        </mesh>
        <mesh position={[0, 0, 0.165]} rotation={[Math.PI / 2, 0, 0]}>
          <boxGeometry args={[0.22, 0.005, 0.025]} />
          <meshStandardMaterial color={COL.aurora} />
        </mesh>
        <mesh position={[0, 0, 0.165]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
          <boxGeometry args={[0.22, 0.005, 0.025]} />
          <meshStandardMaterial color={COL.aurora} />
        </mesh>
        <mesh position={[0, 0.2, 0.161]}>
          <boxGeometry args={[0.22, 0.04, 0.001]} />
          <meshStandardMaterial color={COL.aurora} />
        </mesh>
        <mesh position={[0.13, -0.18, 0.161]}>
          <sphereGeometry args={[0.012, 12, 12]} />
          <meshStandardMaterial color={COL.alert} emissive={COL.alert} emissiveIntensity={0.7} />
        </mesh>
      </group>

      {/* === VASO DE EXPANSÃO no telhado === */}
      <group position={[MAIN_X + MAIN_W / 2 - 0.7, ROOF_TOP_Y + 0.18, 0.4]}>
        <mesh>
          <cylinderGeometry args={[0.07, 0.07, 0.2, 20]} />
          <meshStandardMaterial color={COL.alert} metalness={0.4} roughness={0.4} />
          <Edges color={COL.aurora} threshold={1} />
        </mesh>
        <mesh position={[0, -0.13, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color={COL.alert} metalness={0.4} roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.22, 0]}>
          <cylinderGeometry args={[0.018, 0.018, 0.06, 8]} />
          <meshStandardMaterial color={COL.metal} />
        </mesh>
      </group>

      {/* === ELIMINADORA DE AR === */}
      <group position={[MAIN_X + MAIN_W / 2 - 0.15, ROOF_TOP_Y + 0.32, 0.4]}>
        <mesh>
          <cylinderGeometry args={[0.025, 0.025, 0.08, 12]} />
          <meshStandardMaterial color={COL.metal} metalness={0.6} />
        </mesh>
        <mesh position={[0, 0.06, 0]}>
          <coneGeometry args={[0.045, 0.06, 12]} />
          <meshStandardMaterial color={COL.aurora} />
        </mesh>
      </group>

      {/* === VÁLVULA TP (segurança) — no boiler === */}
      <group position={[MAIN_X + MAIN_W / 2 - 0.6, ROOF_TOP_Y + 0.3, 0.4]}>
        <mesh>
          <boxGeometry args={[0.06, 0.06, 0.06]} />
          <meshStandardMaterial color={COL.alert} metalness={0.5} />
          <Edges color={COL.ink} threshold={1} />
        </mesh>
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.005, 0.005, 0.04, 8]} />
          <meshStandardMaterial color={COL.cota} />
        </mesh>
      </group>

      {/* === CISTERNA enterrada (lateral esquerda externa) === */}
      <group position={[HOUSE_X_MIN - 0.3, -0.18, WING_Z_MAX - 0.3]}>
        <mesh>
          <boxGeometry args={[0.4, 0.32, 0.55]} />
          <meshStandardMaterial color={COL.aurora} transparent opacity={0.55} metalness={0.3} roughness={0.5} />
          <Edges color={COL.auroraDeep} threshold={1} />
        </mesh>
        <mesh position={[0, 0.16, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.025, 16]} />
          <meshStandardMaterial color={COL.cota} />
        </mesh>
        <mesh position={[0, 0, 0.277]}>
          <boxGeometry args={[0.18, 0.04, 0.001]} />
          <meshStandardMaterial color={COL.alert} />
        </mesh>
      </group>

      {/* === BOMBA DE RECALQUE — entre cisterna e prumada === */}
      <group position={[HOUSE_X_MIN - 0.05, -0.2, WING_Z_MAX - 0.3]}>
        <mesh>
          <cylinderGeometry args={[0.07, 0.07, 0.18, 16]} />
          <meshStandardMaterial color={COL.metal} metalness={0.7} roughness={0.3} />
          <Edges color={COL.ink} threshold={1} />
        </mesh>
        <mesh position={[0, 0.12, 0]}>
          <boxGeometry args={[0.11, 0.06, 0.11]} />
          <meshStandardMaterial color={COL.aurora} />
        </mesh>
        <mesh position={[0, -0.13, 0]}>
          <boxGeometry args={[0.16, 0.04, 0.16]} />
          <meshStandardMaterial color={COL.cota} />
        </mesh>
      </group>
    </group>
  );
}

// =====================================================================
// REDE DE TUBULAÇÕES — adaptada pra nova planta L-shape
// Shaft principal: SHAFT_X = 0.6, SHAFT_Z = -1.45
// =====================================================================
function PipeNetwork() {
  // === ÁGUA FRIA (azul) ===
  const coldPaths = useMemo(() => [
    // [REMOVIDO] Hidrômetro → cisterna (tubo externo na fachada esquerda)
    // [REMOVIDO] Cisterna → bomba recalque (tubo externo na fachada esquerda)
    // [REMOVIDO] Bomba recalque → reservatórios (prumada externa lateral esquerda)
    // Reservatórios → prumada do shaft (descida)
    [[MAIN_X + 0.4, ROOF_TOP_Y + 0.04, -1.15], [SHAFT_X, ROOF_TOP_Y - 0.05, SHAFT_Z], [SHAFT_X - 0.5, 0.55, SHAFT_Z]],
    // Filtro → manifold fria
    [[SHAFT_X - 0.5, 0.42, SHAFT_Z], [SHAFT_X - 0.27, 0.55, SHAFT_Z]],
    // Manifold fria → cozinha (térreo) — descida no shaft, ramal lateral
    [[SHAFT_X - 0.2, 0.48, SHAFT_Z], [SHAFT_X - 0.2, 0.48, -0.55], [1.4, 0.6, -0.55]],
    // Manifold fria → lavabo
    [[SHAFT_X - 0.1, 0.48, SHAFT_Z], [-0.55, 0.48, SHAFT_Z], [-0.55, 0.48, -1.1], [-0.85, 0.55, -1.1]],
    // Manifold fria → vertical sobe pra master (prumada)
    [[SHAFT_X, 0.48, SHAFT_Z], [SHAFT_X, Y_UPPER + 0.05, SHAFT_Z], [1.95, Y_UPPER + 0.05, SHAFT_Z], [1.95, Y_UPPER + 0.05, -0.55]],
    // Manifold fria → vaso suíte
    [[SHAFT_X + 0.1, 0.48, SHAFT_Z], [SHAFT_X + 0.1, Y_UPPER + 0.05, SHAFT_Z], [1.95, Y_UPPER + 0.05, -1.3]],
    // Manifold fria → banheiro social
    [[SHAFT_X + 0.2, 0.48, SHAFT_Z], [0.27, Y_UPPER + 0.05, SHAFT_Z], [0.27, Y_UPPER + 0.05, 0.95], [0.45, Y_UPPER + 0.55, 0.95]]
  ], []);

  // === ÁGUA QUENTE (dourado) ===
  const hotPaths = useMemo(() => [
    // Bomba de calor → boiler (sobe externa)
    [[HOUSE_X_MAX + 0.25, 0.55, -1.2], [HOUSE_X_MAX + 0.25, ROOF_TOP_Y + 0.18, -1.2], [MAIN_X + MAIN_W / 2 - 0.4, ROOF_TOP_Y + 0.18, 0.15]],
    // Boiler → telhado → topo do shaft → desce até misturadora (rota técnica, sem cruzar a suíte)
    [[MAIN_X + MAIN_W / 2 - 0.4, ROOF_TOP_Y + 0.18, 0.4], [MAIN_X + MAIN_W / 2 - 0.4, ROOF_TOP_Y + 0.05, -1.15], [SHAFT_X + 0.35, ROOF_TOP_Y - 0.05, SHAFT_Z], [SHAFT_X + 0.35, 0.78, SHAFT_Z]],
    // Misturadora → manifold quente
    [[SHAFT_X + 0.35, 0.62, SHAFT_Z], [SHAFT_X + 0.7, 0.6, SHAFT_Z]],
    // Manifold quente → pressurizador
    [[SHAFT_X + 0.85, 0.5, SHAFT_Z], [SHAFT_X + 1.05, 0.45, SHAFT_Z]],
    // Pressurizador → bancada banheiro suíte
    [[SHAFT_X + 1.05, 0.45, SHAFT_Z], [SHAFT_X + 1.05, Y_UPPER + 0.1, SHAFT_Z], [1.95, Y_UPPER + 0.1, SHAFT_Z], [1.95, Y_UPPER + 0.55, -0.55]],
    // Pressurizador → chuveiro suíte master
    [[SHAFT_X + 1.05, 0.45, SHAFT_Z], [SHAFT_X + 1.05, Y_UPPER + 0.85, SHAFT_Z], [1.95, Y_UPPER + 0.85, SHAFT_Z], [1.95, Y_UPPER + 0.85, 0.2]],
    // Pressurizador → chuveiro banheiro social
    [[SHAFT_X + 1.05, 0.45, SHAFT_Z], [SHAFT_X + 1.05, Y_UPPER + 0.85, SHAFT_Z], [0.63, Y_UPPER + 0.85, SHAFT_Z], [0.63, Y_UPPER + 0.85, 0.6]],
    // Pressurizador → cozinha (térreo)
    [[SHAFT_X + 1.05, 0.45, SHAFT_Z], [SHAFT_X + 1.05, 0.55, -0.55], [1.4, 0.6, -0.55]],
    // Pressurizador → lavabo (rota pela parede traseira, espelhando supply de fria)
    [[SHAFT_X + 1.05, 0.45, SHAFT_Z], [-0.55, 0.45, SHAFT_Z], [-0.55, 0.55, -1.1], [-0.85, 0.55, -1.1]]
  ], []);

  // === RECIRCULAÇÃO (aurora médio) — único loop coerente que retorna ao boiler ===
  const recircPaths = useMemo(() => [
    // Retorno chuveiro suíte → boiler (loop fechado real)
    [[1.95, Y_UPPER + 0.7, 0.2], [1.95, Y_UPPER + 0.7, SHAFT_Z], [SHAFT_X + 0.8, Y_UPPER + 0.7, SHAFT_Z], [SHAFT_X + 0.8, ROOF_TOP_Y + 0.05, SHAFT_Z], [MAIN_X + MAIN_W / 2 - 0.4, ROOF_TOP_Y + 0.18, 0.15]]
  ], []);

  // === ESGOTO (cinza escuro) ===
  const drainPaths = useMemo(() => [
    // Banheiro suíte → desce coluna
    [[1.95, Y_UPPER - 0.05, -0.55], [1.95, Y_UPPER - 0.05, SHAFT_Z], [1.95, 0.05, SHAFT_Z], [1.95, 0.05, MAIN_D / 2]],
    // Vaso suíte → coluna
    [[1.95, Y_UPPER - 0.05, -1.3], [1.95, Y_UPPER - 0.05, SHAFT_Z]],
    // Banheiro social → coluna
    [[0.45, Y_UPPER - 0.05, 0.95], [0.45, Y_UPPER - 0.05, SHAFT_Z], [1.95, 0.05, SHAFT_Z]],
    // Cozinha → coluna
    [[1.4, 0.45, -0.55], [1.95, 0.05, -0.55], [1.95, 0.05, SHAFT_Z]],
    // Lavabo → coluna
    [[-0.85, 0.45, -1.1], [-0.85, 0.05, -1.1], [1.95, 0.05, -1.1], [1.95, 0.05, SHAFT_Z]]
  ], []);

  // === VENT STACK ===
  const ventPaths = useMemo(() => [
    [[1.95, 0.05, SHAFT_Z], [1.95, ROOF_TOP_Y + 0.4, SHAFT_Z]]
  ], []);

  // === GÁS — removido: redundante com bomba de calor + boiler solar; trajetória voadora cruzava a suíte ===
  const gasPaths = useMemo(() => [], []);

  // === COBRE VRF — removidos (terminavam em parede sem fancoil indoor modelado) ===
  const refrigerantPaths = useMemo(() => [], []);

  return (
    <group>
      {coldPaths.map((path, i) => (
        <mesh key={`c-${i}`} geometry={makePipeGeom(path, 0.018)}>
          <meshStandardMaterial color={COL.fria} metalness={0.45} roughness={0.4} />
        </mesh>
      ))}
      {hotPaths.map((path, i) => (
        <mesh key={`h-${i}`} geometry={makePipeGeom(path, 0.02)}>
          <meshStandardMaterial color={COL.quente} metalness={0.45} roughness={0.4} />
        </mesh>
      ))}
      {recircPaths.map((path, i) => (
        <mesh key={`r-${i}`} geometry={makePipeGeom(path, 0.014)}>
          <meshStandardMaterial color={COL.retorno} metalness={0.45} roughness={0.4} />
        </mesh>
      ))}
      {drainPaths.map((path, i) => (
        <mesh key={`d-${i}`} geometry={makePipeGeom(path, 0.024)}>
          <meshStandardMaterial color="#3a3a3a" metalness={0.2} roughness={0.7} />
        </mesh>
      ))}
      {ventPaths.map((path, i) => (
        <mesh key={`v-${i}`} geometry={makePipeGeom(path, 0.016)}>
          <meshStandardMaterial color="#7A8B91" metalness={0.3} roughness={0.6} />
        </mesh>
      ))}
      {gasPaths.map((path, i) => (
        <mesh key={`g-${i}`} geometry={makePipeGeom(path, 0.013)}>
          <meshStandardMaterial color={COL.gas} metalness={0.55} roughness={0.4} />
        </mesh>
      ))}
      {refrigerantPaths.map((path, i) => (
        <mesh key={`rf-${i}`} geometry={makePipeGeom(path, 0.013)}>
          <meshStandardMaterial color={COL.copper} metalness={0.7} roughness={0.3} />
        </mesh>
      ))}

      {/* Válvulas em pontos críticos */}
      <Valve position={[SHAFT_X, 0.55, SHAFT_Z]} color={COL.aurora} />
      <Valve position={[SHAFT_X + 0.7, 0.6, SHAFT_Z]} color={COL.alert} />
      <Valve position={[MAIN_X + 0.4, ROOF_TOP_Y + 0.04, -1.15]} color={COL.aurora} />
      <Valve position={[HOUSE_X_MAX + 0.25, 0.55, -1.2]} color={COL.aurora} />
      <Valve position={[MAIN_X + MAIN_W / 2 - 0.4, ROOF_TOP_Y + 0.18, 0.15]} color={COL.alert} />
    </group>
  );
}

function Valve({ position, color = COL.aurora }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.03, 12, 12]} />
      <meshStandardMaterial color={color} metalness={0.65} roughness={0.3} />
    </mesh>
  );
}

// =====================================================================
// CONTROLE DE CÂMERA
// =====================================================================
function CameraDistanceController({ controlsRef, targetDistance }) {
  useFrame(() => {
    if (!controlsRef.current || targetDistance === null) return;
    const camera = controlsRef.current.object;
    const target = controlsRef.current.target;
    const offset = camera.position.clone().sub(target);
    const currentDist = offset.length();
    const diff = targetDistance - currentDist;
    if (Math.abs(diff) < 0.01) return;
    const newDist = currentDist + diff * 0.1;
    offset.setLength(newDist);
    camera.position.copy(target.clone().add(offset));
  });
  return null;
}

// =====================================================================
// EXPORT — cena completa
// =====================================================================
export default function HouseHydraulicScene() {
  const controlsRef = useRef();
  const [targetDistance, setTargetDistance] = useState(null);

  const MIN_DIST = 8.0;
  const MAX_DIST = 22.0;
  const DEFAULT_DIST = 17.0;

  const getCurrentDistance = () => {
    if (!controlsRef.current) return DEFAULT_DIST;
    return controlsRef.current.object.position.distanceTo(controlsRef.current.target);
  };

  const zoomIn = useCallback(() => {
    const cur = targetDistance ?? getCurrentDistance();
    setTargetDistance(Math.max(MIN_DIST, cur - 1.4));
  }, [targetDistance]);

  const zoomOut = useCallback(() => {
    const cur = targetDistance ?? getCurrentDistance();
    setTargetDistance(Math.min(MAX_DIST, cur + 1.4));
  }, [targetDistance]);

  const resetView = useCallback(() => setTargetDistance(DEFAULT_DIST), []);

  return (
    <div className="relative h-full w-full">
      <Canvas
        shadows={false}
        camera={{ position: [11.2, 6.6, 11.6], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.72} />
        <directionalLight position={[7, 11, 6]} intensity={0.78} />
        <directionalLight position={[-5, 5, -7]} intensity={0.3} color={COL.auroraGlow} />
        <directionalLight position={[0, -2, 5]} intensity={0.12} color={COL.alert} />
        <hemisphereLight args={[COL.paper, COL.cota, 0.25]} />

        <Suspense fallback={null}>
          <HouseStructure />
          <FloatingStairs />
          <EntranceHall />
          <LivingRoom />
          <DiningRoom />
          <Kitchen />
          <PowderRoom />
          <UpperFloor />
          <TechnicalRoof />
          <ExternalArea />
          <HydraulicEquipment />
          <PipeNetwork />
        </Suspense>

        <OrbitControls
          ref={controlsRef}
          autoRotate
          autoRotateSpeed={0.55}
          enablePan={false}
          enableZoom={true}
          enableDamping
          dampingFactor={0.08}
          minPolarAngle={Math.PI / 5}
          maxPolarAngle={Math.PI / 2.05}
          rotateSpeed={0.65}
          zoomSpeed={0.55}
          minDistance={MIN_DIST}
          maxDistance={MAX_DIST}
          target={[0.3, 1.0, 0]}
        />

        <CameraDistanceController controlsRef={controlsRef} targetDistance={targetDistance} />
      </Canvas>

      {/* HUD — minimalista */}
      <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-aurora md:left-4 md:top-4 md:text-[10px] md:tracking-[0.3em]">
        <span aria-hidden className="h-px w-5 bg-aurora/50" />
        <span>MAQUETE 3D</span>
      </div>
      <div className="pointer-events-none absolute right-3 top-3 font-mono text-[8px] uppercase tracking-[0.2em] text-cota/70 md:right-4 md:top-4 md:text-[9px] md:tracking-[0.25em]">
        imagem ilustrativa
      </div>

      {/* Hint rotação */}
      <div className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-cota md:bottom-4 md:left-4 md:text-[10px]">
        <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none">
          <path d="M2 6 A 4 4 0 0 1 10 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M9 4 L10 6 L8 6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>arraste · rotação 3D</span>
      </div>


      {/* Controles de zoom modernos */}
      <div className="absolute right-3 top-1/2 flex -translate-y-1/2 flex-col gap-1.5 md:right-4">
        <button
          type="button"
          onClick={zoomIn}
          className="group flex h-9 w-9 items-center justify-center border border-aurora/40 bg-paper/85 backdrop-blur-md transition-all hover:bg-aurora hover:text-white hover:shadow-md"
          aria-label="Aproximar"
        >
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-aurora group-hover:text-white" fill="none">
            <path d="M3 8 H13 M8 3 V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={resetView}
          className="group flex h-9 w-9 items-center justify-center border border-aurora/40 bg-paper/85 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-aurora backdrop-blur-md transition-all hover:bg-aurora hover:text-white"
          aria-label="Redefinir vista"
        >
          1:1
        </button>
        <button
          type="button"
          onClick={zoomOut}
          className="group flex h-9 w-9 items-center justify-center border border-aurora/40 bg-paper/85 backdrop-blur-md transition-all hover:bg-aurora hover:text-white"
          aria-label="Afastar"
        >
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-aurora group-hover:text-white" fill="none">
            <path d="M3 8 H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
