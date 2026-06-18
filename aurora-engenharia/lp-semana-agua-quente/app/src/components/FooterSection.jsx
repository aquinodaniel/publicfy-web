import { motion } from 'framer-motion';
import Reveal from './Reveal';
import { SeatsBlock } from './SeatsLeft';

export default function FooterSection({ onCTAClick }) {
  return (
    <section className="relative overflow-hidden bg-ink-deep py-16 text-white md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 blueprint-bg" />

      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="select-none font-mono text-[32vw] font-bold leading-none text-white/[0.018] md:text-[20vw]">
          2027
        </div>
      </div>

      <div className="container-x relative">
        <Reveal delay={0.05}>
          <h2 className="text-center text-[28px] font-extrabold leading-tight tracking-tight sm:text-3xl md:text-5xl">
            Próxima edição:{' '}
            <span className="relative inline-block">
              <span className="text-gold-gradient">2027</span>
              <motion.span
                aria-hidden
                className="absolute inset-x-0 bottom-1 h-1.5 bg-alert/30 sm:h-2 md:bottom-2 md:h-3"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              />
            </span>.<br />
            Esse preço não volta nunca.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl px-2 text-center text-[15px] leading-relaxed text-white/70 sm:text-base md:mt-8 md:text-lg">
            Você gastou os últimos minutos lendo isso.
            Ou fecha agora e tenta lembrar disso em 2027,
            ou entra na Aula 01 do dia <strong className="text-white">5 de junho por R$ 27</strong>.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-col items-stretch gap-7 sm:items-center md:mt-12 md:gap-8">
            <div className="relative flex justify-center">
              {/* Carimbos só desktop */}
              <div className="absolute -left-24 -top-2 hidden lg:block">
                <div className="stamp text-gold-gradient text-[10px]">ÚLTIMA CHAMADA</div>
              </div>
              <button onClick={onCTAClick} className="btn-primary-xl w-full max-w-md sm:w-auto">
                Entrar agora · R$ 27
              </button>
              <div className="absolute -right-24 -bottom-2 hidden lg:block">
                <div className="stamp text-aurora-glow text-[10px]" style={{ transform: 'rotate(4deg)' }}>
                  PROJ-001
                </div>
              </div>
            </div>

            <SeatsBlock
              label="▸ Vagas no 2º lote"
              footnote="Quando zerar: R$ 47 no 3º lote (+74%)"
            />
          </div>
        </Reveal>

        <div className="mt-14 border-t border-white/10 pt-6 md:mt-20 md:pt-8">
          <div className="flex flex-col items-start gap-3 font-mono text-[9px] uppercase tracking-[0.2em] text-white/40 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4 md:text-[10px]">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span>Aurora Engenharia</span>
              <span>·</span>
              <a href="https://instagram.com/aurora.engenharia" className="hover:text-white">
                @aurora.engenharia
              </a>
            </div>
            <div className="flex items-center gap-3">
              <a href="#" className="hover:text-white">Privacidade</a>
              <span>·</span>
              <a href="#" className="hover:text-white">Termos</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
