"use client";

import { useMemo, useState } from "react";
import type { Briefing, IndicadorId, Resultado, Versao, Veredito as VereditoType } from "@/lib/types";
import { comparar, limitacoes } from "@/lib/metrics";
import { Hero } from "@/components/briefing/Hero";
import { BriefingForm } from "@/components/briefing/BriefingForm";
import { Versoes } from "@/components/versoes/Versoes";
import { Resultados } from "@/components/resultados/Resultados";
import { Placar } from "@/components/placar/Placar";
import { Limitacoes } from "@/components/veredito/Limitacoes";
import { Veredito } from "@/components/veredito/Veredito";
import { Exportar } from "@/components/veredito/Exportar";
import { ComoFunciona } from "@/components/comum/ComoFunciona";

function rolarPara(id: string) {
  setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
}

function versoesCompletas(v: [Versao, Versao] | null): v is [Versao, Versao] {
  return !!v && v.every((x) => x.titulo.trim() && x.texto.trim() && x.cta.trim());
}

export default function Home() {
  const [briefing, setBriefing] = useState<Briefing | null>(null);
  const [versoes, setVersoes] = useState<[Versao, Versao] | null>(null);
  const [resultados, setResultados] = useState<[Resultado, Resultado] | null>(null);
  const [objetivo, setObjetivo] = useState<IndicadorId>("ctr");
  const [veredito, setVeredito] = useState<VereditoType | null>(null);

  const comparacoes = useMemo(() => (resultados ? comparar(...resultados) : null), [resultados]);
  const lims = useMemo(() => (resultados && comparacoes ? limitacoes(...resultados, comparacoes) : []), [resultados, comparacoes]);
  const prontas = versoesCompletas(versoes);

  return (
    <main className="min-h-screen bg-[#0b1020] text-slate-100">
      <Hero onStart={() => rolarPara("etapa-briefing")} />
      <div className="mx-auto max-w-5xl space-y-8 px-4 pb-16 sm:px-6">
        <BriefingForm
          value={briefing}
          onChange={(b) => {
            const primeiro = !briefing;
            setBriefing(b);
            if (primeiro) rolarPara("etapa-versoes");
          }}
        />

        {briefing && <Versoes briefing={briefing} value={versoes} onChange={setVersoes} />}

        {briefing && versoes && !prontas && (
          <p className="text-center text-sm text-slate-400">Preencha título, texto e CTA das duas versões para seguir.</p>
        )}

        {briefing && prontas && (
          <Resultados
            value={resultados}
            onChange={(r) => {
              const primeiro = !resultados;
              setResultados(r);
              if (primeiro) rolarPara("placar-heading");
            }}
          />
        )}

        {briefing && prontas && resultados && comparacoes && (
          <>
            <Placar comparacoes={comparacoes} objetivo={objetivo} onObjetivo={setObjetivo} />
            <Limitacoes itens={lims} />
            <Veredito briefing={briefing} versoes={versoes} comparacoes={comparacoes} objetivo={objetivo} limitacoes={lims} onVeredito={setVeredito} />
            <Exportar briefing={briefing} versoes={versoes} resultados={resultados} comparacoes={comparacoes} objetivo={objetivo} limitacoes={lims} veredito={veredito} />
          </>
        )}
      </div>
      <ComoFunciona />
    </main>
  );
}
