// Fundo de prancheta técnica reutilizável.
// variant: 'paper' = papel claro com grid; 'blueprint' = azul-petróleo escuro com grid.
export default function BlueprintBg({ variant = 'paper', children, className = '' }) {
  const bg = variant === 'blueprint'
    ? 'bg-ink-deep blueprint-bg'
    : 'paper-bg';
  return (
    <div className={`relative ${bg} ${className}`}>
      {children}
    </div>
  );
}

// Cantos técnicos pra qualquer container que queira virar "ficha"
export function TechCorners() {
  return (
    <>
      <span aria-hidden className="blueprint-corner bp-tl" />
      <span aria-hidden className="blueprint-corner bp-tr" />
      <span aria-hidden className="blueprint-corner bp-bl" />
      <span aria-hidden className="blueprint-corner bp-br" />
    </>
  );
}
