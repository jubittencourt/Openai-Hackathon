// Veredito de reserva escrito por regra a partir dos números já calculados.
// Usado quando a IA falha ou demora: nunca contradiz o placar.
import { formatIndicador, formatZ } from "@/components/comum/format";
import { NOMES_INDICADOR, NOMES_OBJETIVO, type Comparacao, type IndicadorId, type Versao, type Veredito } from "./types";

export function vereditoFallback(versoes: [Versao, Versao], comparacoes: Comparacao[], objetivo: IndicadorId): Veredito {
  const comp = comparacoes.find((c) => c.indicador === objetivo);
  const nome = NOMES_OBJETIVO[objetivo];
  if (!comp) {
    return {
      resumo: "Ainda não há resultados suficientes para comparar as versões.",
      hipoteseA: "Inconclusiva: sem resultados.",
      hipoteseB: "Inconclusiva: sem resultados.",
      proximoTeste: "Cadastre os resultados das duas versões para ver o placar.",
    };
  }

  const v = comp.vencedor;
  const valor = (id: "A" | "B") => formatIndicador(id === "A" ? comp.valorA : comp.valorB, objetivo);
  const outro = (id: "A" | "B") => (id === "A" ? "B" : "A");
  let resumo: string;

  if (comp.selo === "Vitória confiável" && v) {
    resumo = `No objetivo ${nome}, a versão ${v} vence: ${valor(v)} contra ${valor(outro(v))} da ${outro(v)}, uma diferença confiável (z ≈ ${formatZ(comp.z)}).`;
  } else if (comp.selo === "Empate técnico") {
    resumo = v
      ? `No objetivo ${nome}, a versão ${v} aparece na frente (${valor(v)} contra ${valor(outro(v))}), mas é um empate técnico (z ≈ ${formatZ(comp.z)}): ainda não dá para concluir.`
      : `No objetivo ${nome}, as versões empataram: ainda não dá para concluir.`;
  } else if (comp.valorA === null || comp.valorB === null) {
    resumo = `No objetivo ${nome}, não é possível comparar: faltam dados para calcular o indicador em uma das versões.`;
  } else {
    resumo = `No objetivo ${nome}, a versão ${v ?? "—"} tem o melhor número (${v ? `${valor(v)} contra ${valor(outro(v))}` : "valores iguais"}), mas os investimentos são diferentes, então a comparação não é justa e ainda não dá para concluir.`;
  }

  const divergentes = comparacoes.filter((c) => c.indicador !== objetivo && c.selo === "Vitória confiável" && c.vencedor && c.vencedor !== v);
  if (v && divergentes.length) {
    resumo += ` Atenção: em ${divergentes.map((c) => NOMES_INDICADOR[c.indicador]).join(" e ")}, quem vence com confiança é a versão ${divergentes[0].vencedor}.`;
  }

  const hipotese = (id: "A" | "B") => {
    const texto = versoes.find((x) => x.id === id)?.hipotese || "sem hipótese registrada";
    if (comp.selo === "Vitória confiável" && v === id) return `Confirmada neste objetivo: os números favorecem a versão ${id} com confiança (“${texto}”).`;
    if (comp.selo === "Vitória confiável" && v && v !== id) return `Não confirmada neste objetivo: a versão ${outro(id)} foi melhor com confiança (“${texto}”).`;
    return `Inconclusiva: os dados ainda não permitem confirmar nem descartar (“${texto}”).`;
  };

  const proximoTeste =
    comp.selo === "Vitória confiável" && v
      ? `Manter a versão ${v} como base e testar contra ela uma nova variação de um único elemento (título ou CTA), com o mesmo investimento.`
      : "Repetir o duelo com o mesmo investimento nas duas versões e mais volume, até cada versão passar de 30 contatos.";

  return { resumo, hipoteseA: hipotese("A"), hipoteseB: hipotese("B"), proximoTeste };
}
