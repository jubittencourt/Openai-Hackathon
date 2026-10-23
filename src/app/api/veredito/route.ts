import OpenAI from "openai";
import { vereditoFallback } from "@/lib/vereditoFallback";
import type { IndicadorId, Versao, Veredito, VereditoPedido, VereditoResposta } from "@/lib/types";

const schema = {
  type: "object",
  additionalProperties: false,
  required: ["resumo", "hipoteseA", "hipoteseB", "proximoTeste"],
  properties: {
    resumo: { type: "string" },
    hipoteseA: { type: "string" },
    hipoteseB: { type: "string" },
    proximoTeste: { type: "string" },
  },
} as const;

function objetivoValido(value: unknown): value is IndicadorId {
  return value === "ctr" || value === "conversao" || value === "custoContato";
}

const vazias: [Versao, Versao] = [
  { id: "A", titulo: "", texto: "", cta: "", hipotese: "" },
  { id: "B", titulo: "", texto: "", cta: "", hipotese: "" },
];

function fallback(objetivo: IndicadorId, pedido: Partial<VereditoPedido> = {}): VereditoResposta {
  const { versoes, comparacoes } = pedido;
  const ok = Array.isArray(versoes) && versoes.length === 2 && Array.isArray(comparacoes);
  return { veredito: vereditoFallback(ok ? (versoes as [Versao, Versao]) : vazias, ok ? comparacoes! : [], objetivo), fonte: "exemplo" };
}

export async function POST(request: Request) {
  let objetivo: IndicadorId = "ctr";
  let body: Partial<VereditoPedido> = {};
  try {
    body = await request.json() as Partial<VereditoPedido>;
    if (objetivoValido(body.objetivo)) objetivo = body.objetivo;
    const { briefing, versoes, comparacoes, limitacoes } = body;
    if (!briefing || !Array.isArray(versoes) || versoes.length !== 2 || !Array.isArray(comparacoes) || !Array.isArray(limitacoes)) {
      return Response.json(fallback(objetivo, body));
    }
    if (!process.env.OPENAI_API_KEY) return Response.json(fallback(objetivo, body));

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15_000);
    try {
      const resposta = await client.responses.create({
        model: process.env.OPENAI_MODEL || "gpt-6.1-sol",
        input: [
          {
            role: "system",
            content: "Você é o juiz de um duelo de campanhas. Explique os números e hipóteses com clareza. Não invente números. Receba os valores já calculados; nunca recalcule. Se o selo for Empate técnico, diga que ainda não dá para concluir.",
          },
          {
            role: "user",
            content: JSON.stringify({ briefing, versoes, comparacoes, objetivo, limitacoes }),
          },
        ],
        text: { format: { type: "json_schema", name: "veredito", strict: true, schema } },
      }, { signal: controller.signal });
      const veredito = JSON.parse(resposta.output_text) as Veredito;
      if (![veredito.resumo, veredito.hipoteseA, veredito.hipoteseB, veredito.proximoTeste].every((v) => typeof v === "string")) {
        return Response.json(fallback(objetivo, body));
      }
      return Response.json({ veredito, fonte: "ia" } satisfies VereditoResposta);
    } finally {
      clearTimeout(timeout);
    }
  } catch {
    return Response.json(fallback(objetivo, body));
  }
}
