"use client";

import { useState } from "react";
import type { Briefing, Fonte, Versao, VersoesResposta } from "@/lib/types";
import { versoesParaBriefing } from "@/data/exemplo";
import { PostMockup } from "@/components/versoes/PostMockup";

const vazias: [Versao, Versao] = [
  { id: "A", titulo: "", texto: "", cta: "", hipotese: "" },
  { id: "B", titulo: "", texto: "", cta: "", hipotese: "" },
];

export function Versoes({ briefing, value, onChange }: { briefing: Briefing; value: [Versao, Versao] | null; onChange: (v: [Versao, Versao]) => void }) {
  const [gerando, setGerando] = useState(false);
  const [fonte, setFonte] = useState<Fonte | null>(null);
  const versoes = value ?? vazias;

  async function gerar() {
    setGerando(true);
    try {
      const r = await fetch("/api/versoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ briefing }),
        signal: AbortSignal.timeout(20_000),
      });
      if (!r.ok) throw new Error();
      const dados = (await r.json()) as VersoesResposta;
      onChange(dados.versoes);
      setFonte(dados.fonte);
    } catch {
      onChange(versoesParaBriefing(briefing));
      setFonte("exemplo");
    } finally {
      setGerando(false);
    }
  }

  function editar(i: 0 | 1, campo: keyof Omit<Versao, "id">, texto: string) {
    const nova: [Versao, Versao] = [{ ...versoes[0] }, { ...versoes[1] }];
    nova[i] = { ...nova[i], [campo]: texto };
    onChange(nova);
  }

  return (
    <section id="etapa-versoes" aria-labelledby="versoes-heading" className="min-w-0 space-y-5 rounded-3xl border border-slate-700 bg-slate-900/80 p-4 sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Etapa 2</p>
          <h2 id="versoes-heading" className="mt-1 text-2xl font-bold text-white">As versões</h2>
          <p className="mt-1 text-sm text-slate-400">Gere com IA ou escreva à mão. Tudo é editável.</p>
        </div>
        <div className="flex items-center gap-3">
          {fonte === "exemplo" && <span className="rounded-full border border-slate-500 px-3 py-1 text-xs text-slate-300">Fonte: exemplo</span>}
          <button type="button" onClick={gerar} disabled={gerando} className="rounded-full bg-cyan-300 px-5 py-2 font-bold text-slate-950 hover:bg-cyan-200 disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">
            {gerando ? "Gerando versões…" : "Gerar com IA"}
          </button>
        </div>
      </div>
      <div className="grid min-w-0 items-start gap-4 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        <PostMockup versao={versoes[0]} onEdit={(c, t) => editar(0, c, t)} />
        <div aria-hidden="true" className="flex items-center justify-center gap-3 py-1 lg:flex-col lg:py-4">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan-300/50 lg:h-10 lg:w-px lg:flex-none lg:bg-gradient-to-b" />
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/15 bg-slate-950 text-sm font-black italic tracking-widest text-white shadow-lg shadow-black/30 ring-4 ring-slate-950/70">VS</span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-orange-300/50 lg:h-10 lg:w-px lg:flex-none lg:bg-gradient-to-b" />
        </div>
        <PostMockup versao={versoes[1]} onEdit={(c, t) => editar(1, c, t)} />
      </div>
    </section>
  );
}
