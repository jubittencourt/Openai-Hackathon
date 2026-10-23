# PLANO — Duelo de Campanhas

> Dono: **Claudio-maestro** (palavra final). Leia antes: `DESAFIO-17.md`, `REQUISITOS.md`, `AGENTS.md`.
> Builders marcam `pronto: Txx` na coluna **Status**; só o Andrey muda para `aprovado` (via `QA.md`).
> Status possíveis: `a fazer` · `fazendo` · `pronto` · `aprovado` · `bug` · `cortado`.
> **Cronograma replanejado em 23/10/2026 12h20** — o marco das 11h45 do DESAFIO já passou; prazos abaixo substituem a seção 9 do DESAFIO.

---

## 1. Arquitetura

### 1.1 Stack e pastas

- Next.js 15 (App Router) + TypeScript + Tailwind **v4** (sem `tailwind.config.ts`: tema em `globals.css` com `@theme`), uma página só (`src/app/page.tsx`, client component).
- SDK `openai` no servidor (Responses API, `client.responses.create`, JSON schema estrito). Modelo via `OPENAI_MODEL`.
- Testes: `vitest` (`npm test`).
- Sem banco, sem login. Estado só em memória no cliente.

```
src/
  app/
    page.tsx                 Julia (montagem das etapas e estado)
    globals.css              Brenno
    api/versoes/route.ts     Julia
    api/veredito/route.ts    Brenno
  components/
    briefing/                Julia   Hero.tsx, BriefingForm.tsx
    versoes/                 Julia   Versoes.tsx, PostMockup.tsx
    resultados/              Julia   Resultados.tsx
    placar/                  Brenno  Placar.tsx, SeletorObjetivo.tsx, Selo.tsx
    veredito/                Brenno  Veredito.tsx, Limitacoes.tsx, Exportar.tsx
    comum/                   Brenno  ComoFunciona.tsx, Botao.tsx, Card.tsx, format.ts
  lib/
    types.ts                 Claudio (DESAFIO §5.1, congelado)
    metrics.ts               Brenno
    metrics.test.ts          Andrey
  data/
    exemplo.ts               Claudio
```

### 1.2 Estado da página (em `page.tsx`)

```ts
const [briefing, setBriefing]     = useState<Briefing | null>(null);
const [versoes, setVersoes]       = useState<[Versao, Versao] | null>(null);
const [resultados, setResultados] = useState<[Resultado, Resultado] | null>(null);
const [objetivo, setObjetivo]     = useState<IndicadorId>("ctr");

const comparacoes = useMemo(() => resultados ? comparar(...resultados) : null, [resultados]);
const lims        = useMemo(() => resultados && comparacoes ? limitacoes(...resultados, comparacoes) : [], [resultados, comparacoes]);
```

As etapas aparecem em sequência: Etapa 2 depois que há briefing, Etapa 3 depois que há versões, Placar/Limitações/Veredito/Exportar depois que há resultados válidos. O veredito é buscado pelo próprio componente `Veredito` sempre que `objetivo` ou `resultados` mudam.

### 1.3 Contratos dos componentes (props — não mudar sem falar com o Claudio)

```ts
// Julia
Hero({ onStart: () => void })
BriefingForm({ value: Briefing | null, onChange: (b: Briefing) => void })
Versoes({ briefing: Briefing, value: [Versao, Versao] | null, onChange: (v: [Versao, Versao]) => void })
Resultados({ value: [Resultado, Resultado] | null, onChange: (r: [Resultado, Resultado]) => void })

// Brenno
Placar({ comparacoes: Comparacao[], objetivo: IndicadorId, onObjetivo: (o: IndicadorId) => void })
Limitacoes({ itens: string[] })
Veredito({ briefing: Briefing, versoes: [Versao, Versao], comparacoes: Comparacao[], objetivo: IndicadorId, limitacoes: string[] })
Exportar({ briefing, versoes, resultados, comparacoes, objetivo, limitacoes, veredito: Veredito | null })
ComoFunciona()
```

Para o `Exportar` ter o veredito, `Veredito` aceita `onVeredito?: (v: Veredito) => void` e a página guarda o último veredito.

### 1.4 Decisões fixas

- `Comparacao.z` = **|z|** (absoluto); arredonda só na UI. Regras completas em `REQUISITOS.md` §4.
- Nomes dos indicadores na UI: "CTR", "Conversão", "Custo por contato". Objetivos: "Atenção (CTR)", "Engajamento (conversão)", "Eficiência (custo por contato)".
- Formatação pt-BR (`Intl.NumberFormat`): percentuais com 1 casa, reais com 2, z com 2. Helper único em `src/components/comum/format.ts` (Brenno); Julia importa.
- Fallback das rotas: `AbortController` com 15 s; qualquer erro → `exemplo.ts` com `fonte: "exemplo"`. Sem chave → fallback direto.
- Cores: A = ciano (`#22d3ee`), B = laranja (`#fb923c`), fundo `#0b1020`.

---

## 2. Tarefas

| ID | Tarefa | Dono | Depende | Arquivos | Aceite (RF) | Prazo | Status |
|---|---|---|---|---|---|---|---|
| T00 | Setup: Next.js+TS+Tailwind+vitest, `.env.example`, `.gitignore` com `.env*.local`, repo GitHub, deploy "hello" | Claudio | — | config | RNF01, RNF05, RF10 | 12h45 | pronto: T00 (https://duelo-de-campanhas.vercel.app) |
| T01 | `types.ts` (§5.1) e `exemplo.ts` (briefing, versões, resultados, CSV, veredito por objetivo) | Claudio | T00 | `src/lib/types.ts`, `src/data/exemplo.ts` | contratos | 12h45 | pronto: T01 |
| T02 | `metrics.ts`: `comparar`, `limitacoes`, `parseCsv` | Brenno | T01 | `src/lib/metrics.ts` | RF04, RF06, RF07 | 13h10 | bug |
| T03 | `metrics.test.ts` com a tabela §5 do REQUISITOS + zero contatos + investimentos diferentes + CSV inválido | Andrey | T01 (escreve já), roda após T02 | `src/lib/metrics.test.ts` | RF04, RF06, RF07 | 13h20 | aprovado |
| T04 | `page.tsx` com estado (§1.2) e Etapa 1 `BriefingForm` + "Usar exemplo" | Julia | T01 | `page.tsx`, `components/briefing/**` | RF01, RF09 | 13h10 | pronto: feito pelo Claudio (Julia fora do ar) |
| T05 | Etapa 2 `Versoes`: 2 cards editáveis, cadastro manual | Julia | T04 | `components/versoes/**` | RF02 | 13h30 | pronto: feito pelo Claudio (Julia fora do ar) |
| T06 | `POST /api/versoes` com Responses API + fallback 15 s; botão "Gerar com IA" com carregamento | Julia | T01 | `app/api/versoes/**`, `components/versoes/**` | RF02, RF08 | 13h45 | pronto: feito pelo Claudio (Julia fora do ar) |
| T07 | Etapa 3 `Resultados`: tabela 2 linhas, "Carregar exemplo", colar CSV via `parseCsv` com erro legível | Julia | T02 | `components/resultados/**` | RF03 | 13h45 | pronto: feito pelo Claudio (Julia fora do ar) |
| T08 | `Placar` + `SeletorObjetivo` + `Selo` (valores, fórmula, z, vencedor com texto) + `format.ts` | Brenno | T02 | `components/placar/**`, `components/comum/format.ts` | RF04, RF05, RF06 | 13h40 | pronto |
| T09 | `Limitacoes` (card de alerta) | Brenno | T02 | `components/veredito/Limitacoes.tsx` | RF07 | 13h45 | pronto |
| T10 | `POST /api/veredito` + `Veredito` com fallback e "o juiz está analisando…" | Brenno | T01 | `app/api/veredito/**`, `components/veredito/**` | RF11, RF08 | 14h05 | pronto |
| **M1** | **Mínimo aceitável ponta a ponta no link público, aprovado pelo QA** | todos | T00–T09 | — | RF01–RF10 | **14h10** | a fazer |
| T11 | Hero + mockup de post Instagram + "VS" + balão da hipótese | Julia | M1 | `components/briefing/Hero.tsx`, `components/versoes/**` | RF12, RF17 | 14h40 | pronto: T11 |
| T12 | Visual global: tema escuro, cores A/B, coroa no vencedor, responsivo 375 px, foco visível | Brenno | M1 | `globals.css` (tema via `@theme`), `components/comum/**` | RF15, RNF02, RNF03 | 14h40 | pronto |
| T13 | `Exportar` (.md) | Brenno | M1 | `components/veredito/Exportar.tsx` | RF13 | 14h40 | pronto |
| T14 | `ComoFunciona` no rodapé + aviso de `fonte: "exemplo"` | Brenno | M1 | `components/comum/ComoFunciona.tsx` | RF14, RF16 | 14h40 | pronto |
| **F** | **Congelar funcionalidades** | Claudio | — | — | — | **14h45** | a fazer |
| T15 | Roteiro de aceite REQUISITOS §7 em produção (anônima + 375 px) | Andrey | F | `QA.md` | RF01–RF17 | 15h10 | a fazer |
| T16 | `STATUS.md` a cada rodada de QA; README (o que é, link, como rodar, quem fez); `docs/roteiro-video.md` | Felipe | contínuo | `STATUS.md`, `README.md`, `docs/**` | entrega | 15h10 | pronto: T16 |
| T17 | Correções finais decididas pelo Claudio | Julia/Brenno | T15 | os próprios | bugs bloqueantes | 15h20 | a fazer |
| T18 | Gravar vídeo (≤ 3 min, só botões de exemplo) | humano + Felipe | T17 | — | entrega | 15h40 | a fazer |
| T19 | Checklist de entrega + formulário enviado | Felipe + Claudio | T18 | — | entrega | **15h55** | a fazer |

### Paralelismo

- 12h45: T01 publicado → Julia (T04, T06) e Brenno (T02, depois T10) começam **ao mesmo tempo**; Andrey escreve T03 contra os contratos.
- Julia só depende de Brenno em T07 (`parseCsv`). Se T02 atrasar, Julia faz a tabela e o "Carregar exemplo" primeiro e pluga o CSV depois.
- Brenno pode montar o Placar com `resultadosExemplo` antes de a Etapa 3 existir.

---

## 3. Ordem de corte (se o horário apertar)

Cortar nesta ordem, sem perguntar de novo, quando o marco anterior atrasar mais de 15 min:

1. RF18–RF20 (opcionais) — nunca começam antes das 14h45.
2. RF19 animações.
3. RF14 "Como funciona" vira 3 linhas de texto simples.
4. RF13 exportar `.md`.
5. RF12 mockup Instagram → card simples.
6. RF11 veredito por IA → só o texto do `exemplo.ts` (sem rota).
7. **Nunca cortar:** RF01–RF10.

---

## 4. Log de decisões

| Hora | Decisão |
|---|---|
| 12h20 | Template `~/hackathon/templates/nextjs-agent` não existe nesta máquina → T00 usa `create-next-app`. |
| 12h20 | Cronograma replanejado (M1 13h00 → 14h10, congelamento 14h30 → 14h45). |
| 12h20 | `Comparacao.z` em valor absoluto; "Poucos contatos ({n})" usa o menor número de contatos. |
| 12h40 | Next.js 15.5 + Tailwind v4 + vitest 5 + openai 7. Sem `tailwind.config.ts` (tema em `globals.css`). |
| 12h55 | Repo: https://github.com/jubittencourt/Openai-Hackathon (branch `main`). Produção: https://duelo-de-campanhas.vercel.app |
| 13h05 | Claudio conferiu `metrics.ts` (T02) contra REQUISITOS §5: valores, z, selos e limitações corretos. Aguarda o teste formal do Andrey (T03). |
| 13h05 | Sessões Codex de Julia, Andrey e Felipe caíram (token expirado). Brenno liberado para T13/T14 antes do M1 para não ficar parado; T12 continua depois do M1. |
| 13h05 | `maestri` não roda dentro dos agentes Codex: retorno por `maestri check` do Claudio. |
| 13h40 | Agentes Codex (Julia, Andrey, Felipe) sem conseguir executar comandos (Windows erro 1909/1326 no sandbox). Claudio assumiu T04–T07 para garantir o M1; Julia fica com T11 quando voltar. |
