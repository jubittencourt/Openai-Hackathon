export function Hero({ onStart }: { onStart: () => void }) {
  return (
    <header className="px-5 pt-16 pb-10 text-center sm:pt-24">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">Instagram feed · A × B</p>
      <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-6xl">
        Duelo de <span className="text-cyan-300">Campa</span><span className="text-orange-300">nhas</span>
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-base text-slate-300 sm:text-lg">
        Duas versões entram no ringue, você escolhe o objetivo e o juiz mostra quem venceu — com as contas abertas.
      </p>
      <button
        type="button"
        onClick={onStart}
        className="mt-8 rounded-full bg-white px-7 py-3 font-bold text-slate-950 transition hover:bg-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
      >
        Começar duelo
      </button>
    </header>
  );
}
