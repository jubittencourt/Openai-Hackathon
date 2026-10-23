import type { Versao } from "@/lib/types";

type Campo = keyof Omit<Versao, "id">;

const cores = {
  A: { borda: "border-cyan-300/50", texto: "text-cyan-300", fundo: "from-cyan-500/40 to-cyan-900/60", botao: "bg-cyan-300" },
  B: { borda: "border-orange-300/50", texto: "text-orange-300", fundo: "from-orange-500/40 to-orange-900/60", botao: "bg-orange-300" },
};

const campo =
  "w-full rounded-lg border border-slate-700 bg-slate-950/70 px-2 py-1 text-white placeholder:text-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300";

export function PostMockup({ versao, onEdit }: { versao: Versao; onEdit: (campo: Campo, texto: string) => void }) {
  const c = cores[versao.id];
  return (
    <article className={`mx-auto w-full max-w-sm overflow-hidden rounded-2xl border ${c.borda} bg-slate-950`}>
      <div className="flex items-center gap-2 px-3 py-2">
        <span className={`grid h-8 w-8 place-items-center rounded-full bg-slate-800 text-sm font-black ${c.texto}`}>{versao.id}</span>
        <div className="text-xs leading-tight">
          <p className="font-semibold text-white">sua.marca</p>
          <p className="text-slate-400">Patrocinado · Versão {versao.id}</p>
        </div>
      </div>
      <div className={`flex aspect-square items-center justify-center bg-gradient-to-br ${c.fundo} p-5`}>
        <label className="w-full">
          <span className="sr-only">Título da versão {versao.id}</span>
          <textarea
            rows={3}
            value={versao.titulo}
            onChange={(e) => onEdit("titulo", e.target.value)}
            placeholder="Título do anúncio"
            className="w-full resize-none bg-transparent text-center text-2xl font-black text-white placeholder:text-white/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          />
        </label>
      </div>
      <div className="space-y-2 p-3 text-sm">
        <label className="block">
          <span className="sr-only">CTA da versão {versao.id}</span>
          <input value={versao.cta} onChange={(e) => onEdit("cta", e.target.value)} placeholder="Chamada para ação (CTA)" className={`w-full rounded-md ${c.botao} px-3 py-1.5 text-center font-bold text-slate-950 placeholder:text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white`} />
        </label>
        <label className="block text-xs text-slate-400">
          Legenda
          <textarea rows={3} value={versao.texto} onChange={(e) => onEdit("texto", e.target.value)} placeholder="Texto do post" className={`${campo} mt-1 text-sm`} />
        </label>
        <label className="block text-xs text-slate-400">
          💬 Hipótese: por que esta versão pode vencer
          <textarea rows={2} value={versao.hipotese} onChange={(e) => onEdit("hipotese", e.target.value)} placeholder="Hipótese" className={`${campo} mt-1 text-sm italic`} />
        </label>
      </div>
    </article>
  );
}
