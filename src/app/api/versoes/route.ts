import OpenAI from "openai";
import { versoesParaBriefing } from "@/data/exemplo";
import type { Briefing, Versao, VersoesResposta } from "@/lib/types";

const versaoSchema = {
  type: "object",
  additionalProperties: false,
  required: ["titulo", "texto", "cta", "hipotese"],
  properties: {
    titulo: { type: "string" },
    texto: { type: "string" },
    cta: { type: "string" },
    hipotese: { type: "string" },
  },
} as const;

const schema = {
  type: "object",
  additionalProperties: false,
  required: ["A", "B"],
  properties: { A: versaoSchema, B: versaoSchema },
} as const;

type Gerado = Record<"A" | "B", Omit<Versao, "id">>;

const fallback = (briefing?: Briefing): VersoesResposta => ({ versoes: versoesParaBriefing(briefing), fonte: "exemplo" });

function valida(v: unknown): v is Omit<Versao, "id"> {
  const o = v as Record<string, unknown> | null;
  return !!o && ["titulo", "texto", "cta", "hipotese"].every((k) => typeof o[k] === "string" && (o[k] as string).trim() !== "");
}

export async function POST(request: Request) {
  let briefing: Briefing | undefined;
  try {
    ({ briefing } = (await request.json()) as { briefing?: Briefing });
    if (!briefing?.produto || !process.env.OPENAI_API_KEY) return Response.json(fallback(briefing));

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15_000);
    try {
      const resposta = await client.responses.create(
        {
          model: process.env.OPENAI_MODEL || "gpt-6.1-sol",
          input: [
            {
              role: "system",
              content:
                "Você cria duas versões de anúncio para o feed do Instagram, em português do Brasil. As versões A e B devem seguir estratégias diferentes (ex.: A chama atenção, B foca em conversão). Cada uma tem titulo (até 60 caracteres), texto (até 220 caracteres), cta (até 25 caracteres) e hipotese (uma frase: por que esta versão pode vencer). Não invente preços ou números que não estejam no briefing.",
            },
            { role: "user", content: JSON.stringify(briefing) },
          ],
          text: { format: { type: "json_schema", name: "versoes", strict: true, schema } },
        },
        { signal: controller.signal },
      );
      const gerado = JSON.parse(resposta.output_text) as Gerado;
      if (!valida(gerado.A) || !valida(gerado.B)) return Response.json(fallback(briefing));
      const versoes: [Versao, Versao] = [
        { id: "A", ...gerado.A },
        { id: "B", ...gerado.B },
      ];
      return Response.json({ versoes, fonte: "ia" } satisfies VersoesResposta);
    } finally {
      clearTimeout(timeout);
    }
  } catch {
    return Response.json(fallback(briefing));
  }
}
