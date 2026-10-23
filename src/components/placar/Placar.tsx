import { NOMES_INDICADOR, type Comparacao, type IndicadorId } from "@/lib/types";
import { formatIndicador, formatZ } from "@/components/comum/format";
import { SeletorObjetivo } from "@/components/placar/SeletorObjetivo";
import { Selo } from "@/components/placar/Selo";

export function Placar({ comparacoes, objetivo, onObjetivo }: { comparacoes: Comparacao[]; objetivo: IndicadorId; onObjetivo: (o: IndicadorId) => void }) {
  return (
    <section aria-labelledby="placar-heading" className="space-y-6 rounded-3xl border border-slate-700 bg-slate-900/80 p-5 sm:p-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Etapa 4</p>
        <h2 id="placar-heading" className="mt-1 text-2xl font-bold text-white">O placar</h2>
      </div>
      <SeletorObjetivo objetivo={objetivo} onObjetivo={onObjetivo} />
      <div className="space-y-3">
        {comparacoes.map((comp) => {
          const selecionado = comp.indicador === objetivo;
          const vencedoraA = selecionado && comp.vencedor === "A";
          const vencedoraB = selecionado && comp.vencedor === "B";
          return (
            <article key={comp.indicador} className={`rounded-2xl border p-4 sm:p-5 ${selecionado ? "border-cyan-300/60 bg-slate-800 shadow-lg shadow-cyan-950/30" : "border-slate-700 bg-slate-950/50"}`}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-semibold text-white">{NOMES_INDICADOR[comp.indicador]}{selecionado && <span className="ml-2 text-xs font-medium text-cyan-200">Objetivo escolhido</span>}</h3>
                <Selo selo={comp.selo} />
              </div>
              <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center">
                <div className={`duelo-score duelo-score--a rounded-xl p-3 ${vencedoraA ? "duelo-score--winner-a" : ""}`}>
                  <p className="text-xs font-bold text-duelo-a">VERSÃO A</p>
                  <p className="duelo-score__number mt-1 text-xl text-white">{formatIndicador(comp.valorA, comp.indicador)}</p>
                  {vencedoraA && <span className="duelo-score__winner-label"><span aria-hidden="true">👑 </span>Vencedora do objetivo</span>}
                </div>
                <span aria-hidden="true" className="text-xs font-black text-slate-500">VS</span>
                <div className={`duelo-score duelo-score--b rounded-xl p-3 ${vencedoraB ? "duelo-score--winner-b" : ""}`}>
                  <p className="text-xs font-bold text-duelo-b">VERSÃO B</p>
                  <p className="duelo-score__number mt-1 text-xl text-white">{formatIndicador(comp.valorB, comp.indicador)}</p>
                  {vencedoraB && <span className="duelo-score__winner-label"><span aria-hidden="true">👑 </span>Vencedora do objetivo</span>}
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                <span>Fórmula: <code>{comp.formula}</code></span><span>z = {formatZ(comp.z)}</span>
              </div>
              <p className="mt-3 text-sm font-semibold text-slate-200">{comp.vencedor ? `Vencedor${selecionado ? " do objetivo" : ""}: versão ${comp.vencedor}` : "Sem vencedor: valores iguais ou indisponíveis"}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
