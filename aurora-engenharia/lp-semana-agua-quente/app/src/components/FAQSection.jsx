import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal from './Reveal';

const WHATSAPP_HREF =
  'https://wa.me/5500000000000?text=Ol%C3%A1%2C%20tenho%20uma%20d%C3%BAvida%20sobre%20a%20Semana%20da%20%C3%81gua%20Quente';

const FAQS = [
  {
    code: 'Q.01',
    q: 'A imersão será gravada?',
    a: (
      <>
        Não. As 3 aulas acontecem <strong>ao vivo no Google Meet</strong> nos
        dias <strong>05, 06 e 07 de junho às 19h30</strong> e{' '}
        <strong>não ficam gravadas nem disponibilizadas depois</strong>. Se
        você não consegue reservar esses 3 horários, esta não é a edição
        certa pra você.
      </>
    )
  },
  {
    code: 'Q.02',
    q: 'Eu já sei projetar hidráulica. Vale a pena?',
    a: (
      <>
        Responde uma pergunta: você dimensiona uma bomba de circulação de água
        quente considerando perda de carga e comprimento equivalente, sem
        consultar a tabela do fabricante? Se travou, vale.
      </>
    )
  },
  {
    code: 'Q.03',
    q: 'Vou pagar pra aprender apenas sobre água quente?',
    a: (
      <>
        Não. Água quente é o <strong>fio condutor</strong> — o case que amarra
        dimensionamento, traçado, pressão, vazão, perda de carga e especificação
        de equipamentos. O método que você sai aplicando vale para qualquer
        projeto hidráulico de alto padrão.
      </>
    )
  },
  {
    code: 'Q.04',
    q: 'Preciso de algum software ou ferramenta antes da imersão?',
    a: (
      <>
        Não. As 3 aulas são pelo <strong>Google Meet</strong> e basta um
        navegador. Não tem instalação obrigatória, plugin, nem licença de
        software pra acompanhar. Se você quiser modelar junto, pode usar o
        Revit que já tem — mas não é pré-requisito.
      </>
    )
  },
  {
    code: 'Q.05',
    q: 'Como eu sei se isso faz sentido pro meu momento?',
    a: (
      <>
        <strong>Faz sentido se</strong> você cobra projeto e trava no
        orçamento de alto padrão; nunca acompanhou um projeto de água quente{' '}
        <strong>pressurizado, com recirculação ou manifold</strong>, do
        briefing à entrega; ou coordena obra (arquitetura, BIM, técnico) e
        quer parar de aceitar a "gambiarra do encanador".
        <br /><br />
        <strong>Não faz sentido se</strong> você só especifica produtos
        prontos sem assumir o projeto, ou já entrega 5+ projetos de alto
        padrão por ano com método próprio fechado.
      </>
    )
  },
  {
    code: 'Q.06',
    q: 'Posso parcelar? Quais formas de pagamento são aceitas?',
    a: (
      <>
        Sim. Pagamento via <strong>cartão de crédito</strong> (com
        parcelamento padrão da operadora) ou <strong>Pix</strong> à vista.
        Tudo processado em ambiente seguro pela plataforma de pagamento.
      </>
    )
  }
];

function WhatsAppIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7zM12.04 20.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.19-.31a8.21 8.21 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.25 8.24zm4.52-6.16c-.25-.13-1.46-.72-1.69-.8-.23-.08-.39-.13-.56.13-.16.25-.64.8-.78.96-.14.16-.29.18-.54.06-.25-.13-1.04-.38-1.99-1.22-.74-.66-1.23-1.47-1.37-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.13-.56-1.34-.77-1.84-.2-.48-.41-.42-.56-.43-.14 0-.31-.02-.48-.02s-.43.06-.66.31-.86.85-.86 2.07.88 2.4 1.01 2.56c.13.16 1.74 2.66 4.21 3.73.59.25 1.05.4 1.41.51.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.66-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.18-.48-.31z" />
    </svg>
  );
}

export default function FAQSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative paper-bg py-16 md:py-32">
      <div className="container-x max-w-4xl">
        <Reveal>
          <span className="eyebrow">▸ Dúvidas frequentes</span>
          <h2 className="h2 mt-4 text-ink md:mt-5">
            6 perguntas que talvez você esteja{' '}
            <span className="text-aurora">fazendo agora.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 border-y border-ink/15 md:mt-12">
            {FAQS.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className="border-b border-ink/10 last:border-b-0">
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="group flex w-full items-start gap-3 py-5 text-left transition-colors md:items-center md:gap-6 md:py-6"
                  >
                    <span className={`mt-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] transition-colors md:mt-0 md:tracking-[0.25em] ${
                      isOpen ? 'text-aurora' : 'text-cota group-hover:text-aurora'
                    }`}>
                      {faq.code}
                    </span>
                    <span className="flex-1 text-[15px] font-semibold leading-snug text-ink md:text-lg">
                      {faq.q}
                    </span>
                    <span
                      className={`relative flex h-8 w-8 flex-shrink-0 items-center justify-center border transition-all md:h-9 md:w-9 ${
                        isOpen
                          ? 'border-aurora bg-aurora text-white'
                          : 'border-ink/15 text-aurora group-hover:border-aurora'
                      }`}
                      aria-hidden
                    >
                      <span className={`absolute h-px w-3 bg-current transition-transform md:w-3.5 ${isOpen ? 'rotate-180' : ''}`} />
                      <span className={`absolute h-3 w-px bg-current transition-transform md:h-3.5 ${isOpen ? 'rotate-90 opacity-0' : ''}`} />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-[auto_1fr] gap-3 pb-5 md:gap-6 md:pb-6">
                          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cota md:tracking-[0.25em]">
                            R.{String(i + 1).padStart(2, '0')}
                          </span>
                          <div className="text-[15px] leading-relaxed text-gray-500 md:text-base">
                            {faq.a}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* Bloco de contato direto — fechamento da seção */}
        <Reveal delay={0.15}>
          <div className="mt-12 border border-ink/15 bg-white px-5 py-7 shadow-stamp md:mt-16 md:px-10 md:py-10">
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between md:gap-8">
              <div className="md:max-w-md">
                <div className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-aurora md:text-[11px] md:tracking-[0.3em]">
                  ▸ Sua dúvida não está aqui?
                </div>
                <h3 className="mt-2 text-xl font-bold leading-tight text-ink md:mt-3 md:text-2xl">
                  Me chama no WhatsApp e eu respondo direto.
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500 md:text-base">
                  Atendimento humano, sem bot. Antes de comprar, você pode
                  conversar comigo sobre qualquer coisa da imersão.
                </p>
              </div>

              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-3 whitespace-nowrap rounded-full bg-[#25D366] px-7 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white shadow-[0_8px_22px_rgba(37,211,102,.35)] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
              >
                <WhatsAppIcon className="h-5 w-5" />
                <span>Tirar dúvida no WhatsApp</span>
              </a>
            </div>
          </div>
        </Reveal>

        {/* Rodapé técnico — copyright e links */}
        <div className="mt-14 border-t border-ink/10 pt-6 md:mt-20 md:pt-8">
          <div className="flex flex-col items-start gap-3 font-mono text-[9px] uppercase tracking-[0.2em] text-cota sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4 md:text-[10px]">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span>Aurora Engenharia</span>
              <span>·</span>
              <a
                href="https://instagram.com/aurora.engenharia"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-aurora"
              >
                @aurora.engenharia
              </a>
            </div>
            <div className="flex items-center gap-3">
              <a href="#" className="hover:text-aurora">Privacidade</a>
              <span>·</span>
              <a href="#" className="hover:text-aurora">Termos</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
