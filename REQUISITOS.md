# REQUISITOS — Duelo de Campanhas (Desafio 17)

> Fonte: `DESAFIO-17.md`. Dono: Claudio-maestro. Prioridades: **M** = mínimo aceitável (obrigatório, nada de D/O antes de todos os M aprovados no QA), **D** = desejável (ganha pontos), **O** = opcional (só se sobrar tempo).
> Todo critério de aceite do `PLANO.md` aponta para um RF daqui. O QA (`QA.md`) testa contra estes critérios.

---

## 1. Escopo

- **Dentro:** 1 canal (Instagram feed), 2 versões (A e B), 3 indicadores (CTR, conversão, custo por contato), resultados fictícios, comparação por objetivo, limitações explícitas.
- **Fora:** publicar anúncios, integração com Meta/CRM, login, banco de dados, mais de um canal, mais de 2 versões, mais de 3 indicadores.

---

## 2. Requisitos funcionais

### M — Mínimo aceitável

| ID | Requisito | Critério de aceite (verificável na tela) |
|---|---|---|
| **RF01** | Receber briefing | Formulário com produto, público, objetivo, verba e canal (fixo "Instagram feed", não editável). Botão "Usar exemplo" preenche o briefing do Café Mooca (DESAFIO §3.4). |
| **RF02** | Criar ou cadastrar 2 versões | Botão "Gerar com IA" preenche A e B (`titulo`, `texto`, `cta`, `hipotese`). Todos os campos editáveis à mão; dá para cadastrar sem IA. |
| **RF03** | Receber resultados fictícios | Tabela de 2 linhas (A, B) com `impressoes`, `cliques`, `contatos`, `investimento`. Botão "Carregar exemplo" e área para colar CSV. CSV inválido mostra erro legível em português, sem quebrar a página. |
| **RF04** | Calcular 3 indicadores | CTR, conversão e custo por contato calculados por `src/lib/metrics.ts`, com a fórmula visível. Divisão por zero mostra "—" (nunca `NaN`/`Infinity`). Dados de exemplo batem com a tabela do DESAFIO §3.4. |
| **RF05** | Comparar por objetivo escolhido | Seletor com "Atenção (CTR)", "Engajamento (conversão)", "Eficiência (custo por contato)". Trocar o objetivo troca o vencedor em destaque (com exemplo: CTR → A, custo por contato → B). Vencedor indicado também por texto. |
| **RF06** | Selo de confiança | Cada indicador mostra "Vitória confiável", "Empate técnico" ou "Não testável" pela regra do teste z (DESAFIO §3.2). Exemplo: CTR e conversão confiáveis, custo por contato empate técnico. |
| **RF07** | Explicitar limitações | Card "Limitações dos dados" sempre visível após o placar, com as frases da regra (DESAFIO §3.3), geradas em código. |
| **RF08** | Nunca travar | Rotas de IA com fallback: erro ou >15 s devolvem o conteúdo de `src/data/exemplo.ts` com `fonte: "exemplo"`. Sem `OPENAI_API_KEY` o fluxo inteiro funciona. |
| **RF09** | Limite de escopo | Só 1 canal, 2 versões, 3 indicadores; nenhum botão/fluxo de publicação. |
| **RF10** | Link público | URL pública (Vercel ou plano B) abre em aba anônima e no celular, fluxo completo funciona. |

### D — Desejável

| ID | Requisito | Critério de aceite |
|---|---|---|
| **RF11** | Veredito do juiz (IA) | Card com `resumo`, `hipoteseA`, `hipoteseB`, `proximoTeste` para o objetivo escolhido. Recebe números já calculados; com Empate técnico diz que ainda não dá para concluir. Estado "o juiz está analisando…". |
| **RF12** | Mockup de post Instagram | Cada versão exibida num card estilo post do Instagram, A × B com "VS" no meio, hipótese em balão. |
| **RF13** | Exportar relatório | Botão baixa `.md` com briefing, versões, resultados, placar (valores, z, selos), objetivo, veredito e limitações. |
| **RF14** | Como funciona | Rodapé com as 3 fórmulas, o teste z em linguagem simples e "a IA escreve, as contas são feitas em código". |
| **RF15** | Visual de duelo | Fundo escuro, A ciano × B laranja, números fortes, coroa/brilho no vencedor do objetivo. |
| **RF16** | Indicação de fonte | Mostra discretamente quando versões/veredito vieram do exemplo (`fonte: "exemplo"`). |
| **RF17** | Hero | Nome "Duelo de Campanhas", frase de uma linha, botão "Começar duelo" que rola até a Etapa 1. |

### O — Opcional

| ID | Requisito |
|---|---|
| **RF18** | Upload de arquivo `.csv` (além de colar). |
| **RF19** | Animações de entrada no placar (respeitando `prefers-reduced-motion`). |
| **RF20** | Botão "Rodar demo completa" que preenche todas as etapas em sequência. |

---

## 3. Requisitos não funcionais

| ID | Requisito |
|---|---|
| **RNF01** | `npm run build` passa sem erro antes de todo deploy. |
| **RNF02** | Responsivo: bom a 1280 px e a 375 px, sem scroll horizontal. |
| **RNF03** | Acessibilidade: contraste AA, foco visível, vencedor indicado por texto e não só por cor. |
| **RNF04** | Nenhum botão sem resposta: todo clique mostra carregamento, resultado ou erro. |
| **RNF05** | Chave da OpenAI só no servidor (`.env.local` / Vercel env). Nunca no frontend nem no git. |
| **RNF06** | Contas só em `metrics.ts` (puras, testadas). A UI não reimplementa fórmulas; a IA não calcula nada. |

---

## 4. Regras de negócio (resumo — detalhe no DESAFIO §3)

- CTR = `cliques / impressoes` (maior melhor); Conversão = `contatos / cliques` (maior melhor); Custo por contato = `investimento / contatos` (menor melhor).
- Teste z de duas proporções, 95 %: `|z| >= 1.96` → "Vitória confiável"; senão "Empate técnico".
- Custo por contato usa x = contatos, n = impressões, **só se os investimentos forem iguais**; senão "Não testável" + limitação.
- `Comparacao.z` guarda o **valor absoluto** de z (arredondar só na UI, 2 casas). `null` quando não calculável.
- `vencedor` = versão com melhor valor; `null` se algum valor for `null` ou se forem iguais.
- Denominador zero (n = 0 ou valor `null`) → selo "Não testável", valor "—" e limitação "Sem dados para calcular {indicador}: divisão por zero."

---

## 5. Dados de exemplo e resultado esperado

```csv
versao,impressoes,cliques,contatos,investimento
A,10000,300,15,600
B,10000,200,24,600
```

| | A | B | Vencedor | z | Selo |
|---|---|---|---|---|---|
| CTR | 3,0% | 2,0% | A | 4,53 | Vitória confiável |
| Conversão | 5,0% | 12,0% | B | 2,86 | Vitória confiável |
| Custo por contato | R$ 40,00 | R$ 25,00 | B | 1,44 | Empate técnico |

Limitações esperadas com o exemplo (nesta ordem):
1. "Dados fictícios: servem para demonstrar o método, não para decidir uma campanha real."
2. "Empate técnico em Custo por contato: a diferença pode ser acaso."
3. "Poucos contatos (15): menos de 30 por versão deixa o custo por contato instável." — `{n}` = menor número de contatos entre as versões.
4. "Um único canal e um único período: o resultado pode não se repetir."

---

## 6. Contratos

Tipos, funções e rotas: DESAFIO §5 (fonte da verdade). Contratos de componentes: `PLANO.md` §1.3.

---

## 7. Roteiro de aceite (Andrey, no link de produção, aba anônima + celular 375 px)

1. Abrir a URL pública em aba anônima. Hero aparece; "Começar duelo" leva à Etapa 1. *(RF10, RF17)*
2. "Usar exemplo" preenche o briefing; canal fixo em "Instagram feed". *(RF01, RF09)*
3. "Gerar com IA": aparece carregamento e depois as 2 versões com título, texto, CTA e hipótese. Editar o título de A e conferir que muda. *(RF02, RF12, RF04 do RNF)*
4. Apagar uma versão e cadastrar à mão: o fluxo segue. *(RF02)*
5. "Carregar exemplo" nos resultados; colar CSV inválido (ex.: `abc`) → erro legível; colar o CSV do §5 → tabela preenchida. *(RF03)*
6. Placar mostra os valores, fórmulas, z e selos do §5 exatamente. *(RF04, RF06)*
7. Objetivo "Atenção (CTR)" → vencedor A em destaque com texto; trocar para "Eficiência (custo por contato)" → vencedor B, selo Empate técnico. *(RF05)*
8. Card de limitações mostra as 4 frases do §5. *(RF07)*
9. Veredito do juiz aparece para o objetivo escolhido e, no custo por contato, diz que ainda não dá para concluir. *(RF11)*
10. Mudar investimento de B para 700 → custo por contato "Não testável" e limitação de investimentos diferentes. Zerar contatos de A → "—", sem `NaN`/`Infinity`. *(RF04, RF06, RF07)*
11. "Exportar" baixa um `.md` com todo o duelo. *(RF13)*
12. Rodapé "Como funciona" com fórmulas e regra do z. *(RF14)*
13. Teste de fallback: com a chave inválida/ausente (preview ou local), versões e veredito vêm do exemplo com aviso discreto. *(RF08, RF16)*
14. Repetir 1–9 no celular (ou DevTools 375 px): sem scroll horizontal, tudo clicável. *(RNF02)*
15. `git log -p | grep -i sk-` não acha nada. *(RNF05)*
