import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Figure } from "@/components/ui/Figure";
import { CountUp } from "@/components/motion/CountUp";
import { authority } from "@/content/site";

const INK = "#0a1f26";
const STEEL = "#306579";

export function Authority() {
  return (
    <Section id="autoridade" surface="paper">
      <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        {/* foto com moldura tipo "ficha" */}
        <Reveal className="relative">
          <div
            className="relative overflow-hidden rounded-2xl"
            style={{ border: `1px solid ${INK}1a`, boxShadow: "0 30px 60px -30px #0a1f2659" }}
          >
            <div className="aspect-[4/5]">
              <Figure src={authority.image} alt={`${authority.name} em obra`} />
            </div>
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top,#0a1f26b3,transparent 45%)" }}
            />
            <span
              className="absolute left-4 top-4 rounded-full px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider"
              style={{ background: "#f4efe6f2", color: INK }}
            >
              {authority.ficha[0]}
            </span>
            <div className="absolute bottom-4 left-4 flex flex-col">
              <span className="font-display text-xl font-bold text-white">{authority.name}</span>
              <span className="font-mono text-[11px] uppercase tracking-wider" style={{ color: "#e4c989" }}>
                {authority.credential}
              </span>
            </div>
          </div>
          {/* mini ficha codes */}
          <div className="mt-3 flex gap-2">
            {authority.ficha.slice(1).map((f) => (
              <span
                key={f}
                className="rounded-md px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider"
                style={{ border: `1px solid ${INK}1a`, color: `${INK}b3` }}
              >
                {f}
              </span>
            ))}
          </div>
        </Reveal>

        {/* dossiê — texto escuro sobre creme */}
        <Reveal delay={0.1} className="flex flex-col gap-6">
          <span
            className="kicker inline-flex items-center gap-2 text-[11px] font-medium"
            style={{ color: STEEL }}
          >
            <span className="h-px w-6" style={{ background: `${STEEL}80` }} />
            {authority.eyebrow}
          </span>

          <div>
            <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl" style={{ color: INK }}>
              {authority.name}
            </h2>
            <p className="mt-2 font-mono text-sm uppercase tracking-wider" style={{ color: STEEL }}>
              {authority.role} · {authority.specialty}
            </p>
          </div>

          <div className="h-px w-full" style={{ background: `${STEEL}26` }} />

          <div className="flex flex-col gap-4 text-[15px] leading-relaxed" style={{ color: `${INK}b3` }}>
            {authority.bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* stats reais da imersão */}
          <div
            className="mt-2 grid grid-cols-3 overflow-hidden rounded-xl"
            style={{ border: `1px solid ${INK}1a` }}
          >
            {authority.stats.map((s, i) => (
              <div
                key={s.label}
                className="flex flex-col gap-1 p-5"
                style={{ borderLeft: i > 0 ? `1px solid ${INK}14` : undefined }}
              >
                <span className="font-mono text-[11px] uppercase tracking-wider" style={{ color: "#8a6d35" }}>
                  {s.code}
                </span>
                <span className="font-display text-2xl font-extrabold tabular md:text-3xl" style={{ color: INK }}>
                  <CountUp value={s.value} />
                </span>
                <span className="text-xs leading-tight" style={{ color: `${INK}b3` }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
