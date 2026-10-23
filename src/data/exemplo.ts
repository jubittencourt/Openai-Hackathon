// Dados de exemplo da demo (DESAFIO-17 §3.4) e fallback das rotas de IA.
import type { Briefing, IndicadorId, Resultado, Versao, Veredito } from "@/lib/types";

export const briefingExemplo: Briefing = {
  produto: "Café Mooca — assinatura mensal de café especial (R$ 59/mês)",
  publico: "Jovens adultos de 22–35 anos em São Paulo que trabalham em casa",
  objetivo: "Gerar contatos no WhatsApp para fechar assinaturas",
  verba: 1200,
  canal: "Instagram feed",
};

export const versoesExemplo: [Versao, Versao] = [
  {
    id: "A",
    titulo: "Seu home office merece café de verdade",
    texto:
      "Grãos especiais torrados na Mooca, entregues todo mês na sua porta. Chega de café de pacote entre uma call e outra.",
    cta: "Quero experimentar",
    hipotese:
      "Uma promessa forte e visual chama mais atenção no feed e gera mais cliques.",
  },
  {
    id: "B",
    titulo: "Primeiro mês com frete grátis: fale com a gente",
    texto:
      "Assinatura de café especial por R$ 59/mês. Chame no WhatsApp, tire suas dúvidas e escolha o seu perfil de torra.",
    cta: "Chamar no WhatsApp",
    hipotese:
      "Uma oferta clara com conversa direta atrai menos curiosos, mas quem clica vira contato com mais frequência.",
  },
];

export const resultadosExemplo: [Resultado, Resultado] = [
  { id: "A", impressoes: 10000, cliques: 300, contatos: 15, investimento: 600 },
  { id: "B", impressoes: 10000, cliques: 200, contatos: 24, investimento: 600 },
];

export const csvExemplo = `versao,impressoes,cliques,contatos,investimento
A,10000,300,15,600
B,10000,200,24,600`;

export const vereditosExemplo: Record<IndicadorId, Veredito> = {
  ctr: {
    resumo:
      "Pela atenção, a versão A vence: CTR de 3,0% contra 2,0% da B, uma diferença confiável (z ≈ 4,53). A promessa visual de A fez mais gente parar e clicar.",
    hipoteseA:
      "Confirmada: a promessa forte gerou mais cliques, como a hipótese previa.",
    hipoteseB:
      "Parcialmente confirmada: B atraiu menos cliques, mas isso era esperado pela hipótese, que aposta em qualidade e não em volume.",
    proximoTeste:
      "Testar o título de A com o CTA de WhatsApp de B, para ver se dá para manter a atenção e melhorar a conversão.",
  },
  conversao: {
    resumo:
      "No engajamento, a versão B vence: 12,0% dos cliques viraram contato, contra 5,0% da A, uma diferença confiável (z ≈ 2,86). Quem clicou em B estava mais perto de assinar.",
    hipoteseA:
      "Não confirmada para este objetivo: A trouxe cliques, mas poucos viraram contato.",
    hipoteseB:
      "Confirmada: a oferta clara com conversa direta converteu mais que o dobro.",
    proximoTeste:
      "Manter a oferta de B e testar duas chamadas de WhatsApp diferentes para aumentar o volume de contatos.",
  },
  custoContato: {
    resumo:
      "No custo por contato, B aparece na frente: R$ 25,00 contra R$ 40,00 da A. Mas a diferença ainda é um empate técnico (z ≈ 1,44): com tão poucos contatos, ainda não dá para concluir.",
    hipoteseA:
      "Não confirmada para este objetivo: mais cliques não resultaram em contatos mais baratos.",
    hipoteseB:
      "Sinal favorável, mas ainda não confirmado: a vantagem pode ser acaso com esta amostra.",
    proximoTeste:
      "Repetir o duelo com mais verba ou mais dias até cada versão passar de 30 contatos, mantendo o mesmo investimento nas duas.",
  },
};
