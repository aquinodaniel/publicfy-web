'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { config, exitPopup } from '@/content/site';

// ============================================================
// LeadPopup — modal de saída (exit-intent). Réplica do popup da Imersão
// (lp.auroraengenharia.com/imersao), adaptado aos tokens da Precificação:
// fundo ink-deep, moldura/realce dourado (alert), botão .btn-cta.
// Reforça a oferta + captura nome/WhatsApp/e-mail e envia pro webhook
// (config.leadWebhookUrl). Depois mostra confirmação com o CTA da página.
// ============================================================

// --- validação / máscara (portadas do bundle da Imersão) ---
const onlyDigits = (s: string) => (s || '').replace(/\D/g, '');

function maskPhone(s: string) {
  const d = onlyDigits(s).slice(0, 11);
  if (d.length < 3) return d;
  if (d.length < 8) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

const isName = (s: string) => (s || '').trim().length >= 3;
const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test((s || '').trim());
const isPhone = (s: string) => {
  const d = onlyDigits(s);
  return d.length === 10 || d.length === 11;
};

type Errors = { nome?: string; email?: string; telefone?: string };

// Envio fire-and-forget pro webhook. Nunca derruba o fluxo: se não houver URL
// configurada, loga em dev e segue. Timeout curto pra não travar a UI.
async function sendLead(payload: { nome: string; email: string; telefone: string }) {
  const url = config.leadWebhookUrl;
  if (!url) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.info('[LeadPopup] sem leadWebhookUrl configurado — lead não enviado:', payload);
    }
    return false;
  }
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        telefone: onlyDigits(payload.telefone),
        source: 'lp.semana-precificacao',
        trigger: 'exit-intent',
        timestamp: new Date().toISOString(),
        landingUrl: typeof window !== 'undefined' ? window.location.href : null,
        referrer: typeof document !== 'undefined' ? document.referrer || null : null,
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : null
      }),
      signal: AbortSignal.timeout(5000)
    });
    return res.ok;
  } catch {
    return false;
  }
}

function Field({
  label,
  error,
  inputProps
}: {
  label: string;
  error?: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement> & {
    ref?: React.Ref<HTMLInputElement>;
  };
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white/55">
        {label}
      </span>
      <input
        {...inputProps}
        className={`w-full bg-white/[0.04] px-4 py-3 text-[15px] text-white outline-none transition-colors placeholder:text-white/25 focus:bg-white/[0.07] ${
          error ? 'border border-[#F94E03] focus:border-[#F94E03]' : 'border border-white/12 focus:border-alert/55'
        }`}
        style={{ borderRadius: 10 }}
      />
      {error && <span className="mt-1 block text-[11px] text-[#FF6B2C]">{error}</span>}
    </label>
  );
}

export default function LeadPopup({
  open,
  onClose,
  onConvert
}: {
  open: boolean;
  onClose: () => void;
  /** Chamado quando o lead clica no CTA da tela de sucesso (reusa o CTA da página). */
  onConvert: () => void;
}) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const firstInput = useRef<HTMLInputElement>(null);

  // Foca o primeiro campo ao abrir; reseta o estado ao fechar.
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => firstInput.current?.focus(), 100);
      return () => clearTimeout(t);
    }
    setLoading(false);
    setDone(false);
    setErrors({});
  }, [open]);

  // ESC fecha.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    if (!isName(nome)) next.nome = exitPopup.erros.nome;
    if (!isEmail(email)) next.email = exitPopup.erros.email;
    if (!isPhone(telefone)) next.telefone = exitPopup.erros.telefone;
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setLoading(true);
    // Espera no máximo 1,5s pelo webhook pra não travar a UX (fire-and-forget).
    await Promise.race([
      sendLead({ nome, email, telefone }),
      new Promise((r) => setTimeout(r, 1500))
    ]);
    setLoading(false);
    setDone(true);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center px-3 py-4 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          {/* backdrop */}
          <button
            type="button"
            aria-label="Fechar"
            onClick={onClose}
            className="absolute inset-0 h-full w-full cursor-default bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="exit-popup-title"
            className="relative w-full max-w-[480px] overflow-hidden border border-alert/25 bg-ink-deep shadow-[0_30px_70px_-20px_rgba(0,0,0,0.6)]"
            style={{ borderRadius: 16 }}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            {/* fio dourado no topo */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent 0%, #DBBE7C 50%, transparent 100%)' }}
            />

            {/* fechar */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar"
              className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>

            <div className="px-5 py-7 sm:px-7 sm:py-8">
              {done ? (
                /* ----- sucesso ----- */
                <div className="text-center">
                  <h3 className="text-2xl font-extrabold leading-tight text-white sm:text-[26px]">
                    {exitPopup.sucesso.titulo}
                  </h3>
                  <p className="mx-auto mt-2 max-w-[36ch] text-[13px] leading-relaxed text-white/65 sm:text-sm">
                    {exitPopup.sucesso.desc}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onConvert();
                    }}
                    className="btn-cta mt-6 w-full px-5 py-3.5 font-mono text-[12px] font-extrabold uppercase tracking-[0.22em]"
                  >
                    {exitPopup.sucesso.cta}
                  </button>
                </div>
              ) : (
                /* ----- formulário ----- */
                <>
                  <div className="mb-1 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-alert">
                    ▸ {exitPopup.eyebrow}
                  </div>
                  <h3
                    id="exit-popup-title"
                    className="text-2xl font-extrabold leading-tight text-white sm:text-[26px]"
                  >
                    {exitPopup.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-white/65 sm:text-sm">
                    {exitPopup.subtitle}
                  </p>

                  <form onSubmit={handleSubmit} className="mt-5 space-y-3" noValidate>
                    <Field
                      label={exitPopup.campos.nome.label}
                      error={errors.nome}
                      inputProps={{
                        ref: firstInput,
                        type: 'text',
                        autoComplete: 'name',
                        value: nome,
                        onChange: (e) => setNome(e.target.value),
                        placeholder: exitPopup.campos.nome.placeholder
                      }}
                    />
                    <Field
                      label={exitPopup.campos.email.label}
                      error={errors.email}
                      inputProps={{
                        type: 'email',
                        autoComplete: 'email',
                        inputMode: 'email',
                        value: email,
                        onChange: (e) => setEmail(e.target.value),
                        placeholder: exitPopup.campos.email.placeholder
                      }}
                    />
                    <Field
                      label={exitPopup.campos.telefone.label}
                      error={errors.telefone}
                      inputProps={{
                        type: 'tel',
                        autoComplete: 'tel',
                        inputMode: 'tel',
                        value: telefone,
                        onChange: (e) => setTelefone(maskPhone(e.target.value)),
                        placeholder: exitPopup.campos.telefone.placeholder,
                        maxLength: 16
                      }}
                    />

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-cta mt-2 w-full px-5 py-3.5 font-mono text-[12px] font-extrabold uppercase tracking-[0.22em] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <span className="relative">{loading ? exitPopup.enviando : exitPopup.enviar}</span>
                      {!loading && (
                        <span aria-hidden className="relative ml-2">
                          →
                        </span>
                      )}
                    </button>

                    <p className="pt-1 text-center text-[10px] leading-relaxed text-white/35">
                      {exitPopup.disclaimer}
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
