import type { Versao } from "@/lib/types";

type Campo = keyof Omit<Versao, "id">;

const cores = {
  A: {
    borda: "border-cyan-300/30",
    texto: "text-cyan-200",
    fundo: "from-cyan-400/30 via-slate-900 to-cyan-950",
    aura: "bg-cyan-300",
    botao: "bg-cyan-300 text-slate-950 hover:bg-cyan-200",
  },
  B: {
    borda: "border-orange-300/30",
    texto: "text-orange-200",
    fundo: "from-orange-400/30 via-slate-900 to-orange-950",
    aura: "bg-orange-300",
    botao: "bg-orange-300 text-slate-950 hover:bg-orange-200",
  },
};

const campo =
  "w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2 text-white placeholder:text-slate-500 transition focus-visible:border-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300";

export function PostMockup({ versao, onEdit }: { versao: Versao; onEdit: (campo: Campo, texto: string) => void }) {
  const c = cores[versao.id];

  return (
    <article className={`mx-auto w-full min-w-0 max-w-[25rem] overflow-hidden rounded-[1.6rem] border ${c.borda} bg-slate-950 shadow-xl shadow-black/20`}>
      <div className="flex items-center gap-3 px-4 py-3.5">
        <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br ${c.fundo} ring-2 ring-white/10`}>
          <span className={`text-sm font-black ${c.texto}`}>M</span>
        </div>
        <div className="min-w-0 flex-1 text-left leading-tight">
          <p className="truncate text-sm font-bold text-white">sua.marca</p>
          <p className="mt-1 text-xs text-slate-400">Patrocinado · Instagram</p>
        </div>
        <span className={`shrink-0 rounded-full border border-white/10 px-2.5 py-1 text-[0.65rem] font-black uppercase tracking-widest ${c.texto}`}>Versão {versao.id}</span>
      </div>

      <div className={`relative isolate flex aspect-square min-h-0 items-center justify-center overflow-hidden bg-gradient-to-br ${c.fundo} p-5 sm:p-7`}>
        <div aria-hidden="true" className={`absolute -right-12 -top-12 -z-10 h-48 w-48 rounded-full ${c.aura} opacity-20 blur-3xl`} />
        <div aria-hidden="true" className="absolute inset-4 rounded-[1.3rem] border border-white/10" />
        <div aria-hidden="true" className="absolute left-7 top-7 flex items-center gap-1.5 text-[0.6rem] font-bold uppercase tracking-[0.22em] text-white/55">
          <span className={`h-1.5 w-1.5 rounded-full ${c.aura}`} /> Ideia {versao.id}
        </div>
        <label className="relative z-10 w-full min-w-0">
          <span className="sr-only">Título da versão {versao.id}</span>
          <textarea
            rows={4}
            value={versao.titulo}
            onChange={(e) => onEdit("titulo", e.target.value)}
            placeholder="A ideia principal do anúncio"
            className="w-full resize-none overflow-hidden bg-transparent text-center text-2xl font-black leading-tight text-white placeholder:text-white/50 focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-3xl"
          />
        </label>
        <span aria-hidden="true" className="absolute bottom-7 right-7 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white/50">Duelo de Campanhas</span>
      </div>

      <div className="space-y-4 p-4">
        <label className="block">
          <span className="sr-only">CTA da versão {versao.id}</span>
          <input
            value={versao.cta}
            onChange={(e) => onEdit("cta", e.target.value)}
            placeholder="Chamada para ação"
            className={`min-h-10 w-full rounded-full px-4 py-2 text-center text-sm font-extrabold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${c.botao}`}
          />
        </label>

        <label className="block text-xs font-semibold text-slate-400">
          Legenda do post
          <textarea
            rows={3}
            value={versao.texto}
            onChange={(e) => onEdit("texto", e.target.value)}
            placeholder="Escreva a legenda do anúncio"
            className={`${campo} mt-1.5 resize-y text-sm font-normal`}
          />
        </label>

        <label className="block rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-xs font-semibold text-slate-300">
          <span className="flex items-center gap-2">
            <span aria-hidden="true" className="text-base">💬</span>
            Hipótese: por que esta versão pode vencer?
          </span>
          <textarea
            rows={2}
            value={versao.hipotese}
            onChange={(e) => onEdit("hipotese", e.target.value)}
            placeholder="O que esperamos aprender com esta versão?"
            className={`${campo} mt-2 resize-y text-sm font-normal italic`}
          />
        </label>
      </div>
    </article>
  );
}
