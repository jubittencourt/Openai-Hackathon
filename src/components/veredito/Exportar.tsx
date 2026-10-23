"use client";

import { useState } from "react";
import { NOMES_INDICADOR, NOMES_OBJETIVO, type Briefing, type Comparacao, type IndicadorId, type Resultado, type Versao, type Veredito } from "@/lib/types";
import { formatIndicador, formatZ } from "@/components/comum/format";

type Props = {
  briefing: Briefing;
  versoes: [Versao, Versao];
  resultados: [Resultado, Resultado];
  comparacoes: Comparacao[];
  objetivo: IndicadorId;
  limitacoes: string[];
  veredito: Veredito | null;
};

function tabela(valor: string): string {
  return valor.replaceAll("|", "\\|").replaceAll("\n", " ");
}

function montarRelatorio({ briefing, versoes, resultados, comparacoes, objetivo, limitacoes, veredito }: Props): string {
  const linhasVersoes = versoes.map((versao) =>
    `| ${versao.id} | ${tabela(versao.titulo)} | ${tabela(versao.texto)} | ${tabela(versao.cta)} | ${tabela(versao.hipotese)} |`,
  ).join("\n");
  const linhasResultados = resultados.map((resultado) =>
    `| ${resultado.id} | ${resultado.impressoes} | ${resultado.cliques} | ${resultado.contatos} | ${formatIndicador(resultado.investimento, "custoContato")} |`,
  ).join("\n");
  const linhasComparacao = comparacoes.map((comp) =>
    `| ${NOMES_INDICADOR[comp.indicador]} | ${formatIndicador(comp.valorA, comp.indicador)} | ${formatIndicador(comp.valorB, comp.indicador)} | ${comp.vencedor ? `Versão ${comp.vencedor}` : "—"} | ${comp.z === null ? "—" : formatZ(comp.z)} | ${comp.selo} | ${comp.formula} |`,
  ).join("\n");

  return [
    "# Duelo de Campanhas",
    "",
    `**Objetivo escolhido:** ${NOMES_OBJETIVO[objetivo]}`,
    "",
    "## Briefing",
    `- **Produto:** ${briefing.produto}`,
    `- **Público:** ${briefing.publico}`,
    `- **Objetivo de negócio:** ${briefing.objetivo}`,
    `- **Verba:** ${formatIndicador(briefing.verba, "custoContato")}`,
    `- **Canal:** ${briefing.canal}`,
    "",
    "## Versões",
    "| Versão | Título | Texto | CTA | Hipótese |",
    "|---|---|---|---|---|",
    linhasVersoes,
    "",
    "## Resultados",
    "| Versão | Impressões | Cliques | Contatos | Investimento |",
    "|---|---:|---:|---:|---:|",
    linhasResultados,
    "",
    "## Placar",
    "| Indicador | A | B | Vencedor | z (absoluto) | Selo | Fórmula |",
    "|---|---:|---:|---|---:|---|---|",
    linhasComparacao,
    "",
    "## Veredito do juiz",
    ...(veredito ? [veredito.resumo, "", `- **Hipótese A:** ${veredito.hipoteseA}`, `- **Hipótese B:** ${veredito.hipoteseB}`, `- **Próximo teste:** ${veredito.proximoTeste}`] : ["Ainda não há veredito disponível."]),
    "",
    "## Limitações dos dados",
    ...(limitacoes.length ? limitacoes.map((item) => `- ${item}`) : ["- Nenhuma limitação adicional identificada."]),
    "",
  ].join("\n");
}

export function Exportar(props: Props) {
  const [exportado, setExportado] = useState(false);

  function baixarRelatorio() {
    const arquivo = new Blob([montarRelatorio(props)], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(arquivo);
    const link = document.createElement("a");
    link.href = url;
    link.download = "duelo-de-campanhas.md";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setExportado(true);
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button type="button" onClick={baixarRelatorio}
        className="rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">
        Exportar relatório (.md)
      </button>
      {exportado && <span role="status" className="text-sm text-slate-300">Relatório baixado.</span>}
    </div>
  );
}
