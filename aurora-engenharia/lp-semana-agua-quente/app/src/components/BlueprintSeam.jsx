// Divisor entre seções claras — transição discreta com elementos de prancheta.
export default function BlueprintSeam({ label }) {
  return (
    <div className="relative w-full bg-paper">
      <div className="container-x py-7 md:py-12">
        <div className="flex items-center gap-3 md:gap-4">
          <span className="h-1.5 w-1.5 rounded-full bg-aurora/40" />

          <div className="relative flex-1">
            <div className="h-px bg-aurora/15" />
            <div className="absolute left-0 right-0 -top-1 hidden justify-between md:flex">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <span key={i} className="h-2 w-px bg-aurora/15" />
              ))}
            </div>
            {label && (
              <div className="absolute left-1/2 -top-2 -translate-x-1/2 bg-paper px-2 md:px-3">
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-aurora/70 md:text-[10px] md:tracking-[0.3em]">
                  ▾ {label}
                </span>
              </div>
            )}
          </div>

          <span className="h-1.5 w-1.5 rounded-full bg-aurora/40" />
        </div>
      </div>
    </div>
  );
}
