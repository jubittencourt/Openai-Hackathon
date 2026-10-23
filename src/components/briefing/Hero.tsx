export function Hero({ onStart }: { onStart: () => void }) {
  return (
    <header className="relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/70 px-5 py-12 text-center shadow-2xl shadow-cyan-950/20 sm:px-10 sm:py-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-24 -top-28 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-orange-400/10 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-200/30 to-transparent" />
      </div>

      <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-white/10 bg-slate-950/60 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-slate-300 sm:text-xs sm:tracking-[0.24em]">
        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]" />
        Instagram feed <span className="text-slate-600">·</span> teste A/B
      </div>

      <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black leading-[0.98] tracking-tight text-white sm:text-6xl md:text-7xl">
        Duas ideias.
        <br className="sm:hidden" /> Um <span className="bg-gradient-to-r from-cyan-300 via-white to-orange-300 bg-clip-text text-transparent">duelo.</span>
      </h1>
      <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
        Compare duas versões da sua campanha, escolha o que importa e veja o juiz abrir as contas — inclusive quando os dados ainda não permitem cravar um vencedor.
      </p>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onStart}
          className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3 font-extrabold text-slate-950 shadow-lg shadow-cyan-950/30 transition hover:-translate-y-0.5 hover:bg-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 sm:w-auto"
        >
          Começar duelo
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">↓</span>
        </button>
        <span className="text-xs text-slate-500">Sem publicar anúncios · contas transparentes</span>
      </div>

      <div aria-hidden="true" className="mx-auto mt-10 flex max-w-xs items-center justify-center gap-3 sm:mt-12">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan-300/50" />
        <span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-slate-950 text-[0.65rem] font-black tracking-wider text-slate-400">A/B</span>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-orange-300/50" />
      </div>
    </header>
  );
}
