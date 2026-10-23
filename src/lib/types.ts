// Contratos entre agentes (DESAFIO-17 §5.1). Congelado: mudanças só pelo Claudio-maestro.

export type Briefing = {
  produto: string;
  publico: string;
  objetivo: string;
  verba: number;
  canal: "Instagram feed";
};

export type Versao = {
  id: "A" | "B";
  titulo: string;
  texto: string;
  cta: string;
  hipotese: string;
};

export type Resultado = {
  id: "A" | "B";
  impressoes: number;
  cliques: number;
  contatos: number;
  investimento: number;
};

export type IndicadorId = "ctr" | "conversao" | "custoContato";

export type Comparacao = {
  indicador: IndicadorId;
  valorA: number | null;
  valorB: number | null;
  vencedor: "A" | "B" | null;
  z: number | null; // valor absoluto de z; arredondar só na UI
  selo: "Vitória confiável" | "Empate técnico" | "Não testável";
  formula: string;
};

export type Veredito = {
  resumo: string; // 2-3 frases
  hipoteseA: string; // confirmou / não confirmou, e por quê
  hipoteseB: string;
  proximoTeste: string; // uma sugestão concreta
};

export type Fonte = "ia" | "exemplo";

export type VersoesResposta = { versoes: [Versao, Versao]; fonte: Fonte };

export type VereditoPedido = {
  briefing: Briefing;
  versoes: [Versao, Versao];
  comparacoes: Comparacao[];
  objetivo: IndicadorId;
  limitacoes: string[];
};

export type VereditoResposta = { veredito: Veredito; fonte: Fonte };

export const NOMES_INDICADOR: Record<IndicadorId, string> = {
  ctr: "CTR",
  conversao: "Conversão",
  custoContato: "Custo por contato",
};

export const NOMES_OBJETIVO: Record<IndicadorId, string> = {
  ctr: "Atenção (CTR)",
  conversao: "Engajamento (conversão)",
  custoContato: "Eficiência (custo por contato)",
};
