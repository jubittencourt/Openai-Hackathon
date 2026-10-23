"use client";

import { useEffect, useState } from "react";
import { vereditosExemplo } from "@/data/exemplo";
import type { Briefing, Comparacao, IndicadorId, Versao, Veredito as VereditoType, VereditoResposta } from "@/lib/types";

type Props = {
  briefing: Briefing;
  versoes: [Versao, Versao];
  comparacoes: Comparacao[];
  objetivo: IndicadorId;
  limitacoes: string[];
  onVeredito?: (v: VereditoType) => void;
};

export function Veredito({ briefing, versoes, comparacoes, objetivo, limitacoes, onVeredito }: Props) {
  const [resposta, setResposta] = useState<VereditoResposta | null>(null);
  const [analisando, setAnalisando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const pedido = JSON.stringify({ briefing, versoes, comparacoes, objetivo, limitacoes });

  useEffect(() => {
    const controller = new AbortController();
    let ativo = true;
    setAnalisando(true);
    setErro(null);
    fetch("/api/veredito", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: pedido,
      signal: controller.signal,
    }).then(async (response) => {
      if (!response.ok) throw new Error("Não foi possível consultar o juiz.");
      return await response.json() as VereditoResposta;
    }).then((resultado) => {
      if (!ativo) return;
      setResposta(resultado);
      onVeredito?.(resultado.veredito);
    }).catch(() => {
      if (!ativo) return;
      const fallback: VereditoResposta = { veredito: vereditosExemplo[objetivo], fonte: "exemplo" };
      setResposta(fallback);
      onVeredito?.(fallback.veredito);
      setErro("Usando o veredito de exemplo.");
    }).finally(() => { if (ativo) setAnalisando(false); });
    return () => { ativo = false; controller.abort(); };
  }, [pedido, objetivo, onVeredito]);

  const veredito = resposta?.veredito;
  return (
    <section aria-labelledby="veredito-heading" className="rounded-3xl border border-indigo-400/30 bg-indigo-950/35 p-5 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-300">Juiz do duelo</p><h2 id="veredito-heading" className="mt-1 text-2xl font-bold text-white">Veredito</h2></div>
        {resposta?.fonte === "exemplo" && <span className="rounded-full border border-slate-500 px-3 py-1 text-xs text-slate-300">Fonte: exemplo</span>}
      </div>
      {analisando && <p role="status" className="mt-5 animate-pulse text-indigo-100">O juiz está analisando…</p>}
      {erro && <p className="mt-3 text-xs text-slate-400">{erro}</p>}
      {veredito && !analisando && <div className="mt-5 space-y-4 text-sm leading-relaxed text-slate-200">
        <p className="text-base text-white">{veredito.resumo}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <p className="rounded-xl border border-cyan-400/20 bg-cyan-950/30 p-4"><strong className="text-cyan-200">Hipótese A</strong><br />{veredito.hipoteseA}</p>
          <p className="rounded-xl border border-orange-400/20 bg-orange-950/30 p-4"><strong className="text-orange-200">Hipótese B</strong><br />{veredito.hipoteseB}</p>
        </div>
        <p className="rounded-xl bg-slate-900/70 p-4"><strong className="text-white">Próximo teste:</strong> {veredito.proximoTeste}</p>
      </div>}
    </section>
  );
}
