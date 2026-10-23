# ⚔️ Duelo de Campanhas

> Duas versões de uma campanha entram no ringue, você escolhe o objetivo e o juiz mostra quem venceu — com as contas abertas e o quanto dá para confiar no resultado.

Projeto do **Desafio 17 — Planejador de campanhas com comparação de resultados** do **DevDay Community Hackathon SP** (23/10/2026).

- 🌐 **Aplicação:** https://duelo-de-campanhas.vercel.app
- 💻 **Repositório:** https://github.com/jubittencourt/Openai-Hackathon
- 🎬 **Vídeo (até 3 min):** _link do vídeo_

---

## Sumário

1. [O problema](#o-problema)
2. [O que o produto faz](#o-que-o-produto-faz)
3. [Como usar (passo a passo)](#como-usar-passo-a-passo)
4. [Regras de negócio](#regras-de-negócio)
5. [Exemplos e CSVs para testar](#exemplos-e-csvs-para-testar)
6. [Como foi construído: agentes Codex orquestrados pelo Maestri](#como-foi-construído-agentes-codex-orquestrados-pelo-maestri)
7. [Arquitetura e tecnologias](#arquitetura-e-tecnologias)
8. [Como rodar localmente](#como-rodar-localmente)
9. [Testes e qualidade](#testes-e-qualidade)
10. [Escopo e limitações](#escopo-e-limitações)
11. [Próximos passos](#próximos-passos)
12. [Documentos do projeto](#documentos-do-projeto)
13. [Equipe](#equipe)

---

## O problema

Pequenos negócios testam duas versões de anúncio e escolhem a "vencedora" no olho. Muitas vezes a versão escolhida só chamou mais atenção, não trouxe mais clientes — ou a diferença era pequena demais para significar alguma coisa.

## O que o produto faz

Entrega mínima do desafio, ponta a ponta:

| Exigência do desafio | Como aparece no site |
|---|---|
| Receber um briefing | Etapa 1: produto, público, objetivo, verba e canal (fixo: Instagram feed) |
| Criar ou cadastrar duas versões | Etapa 2: "Gerar com IA" (OpenAI) ou cadastro manual; tudo editável, em mockup de post do Instagram |
| Calcular indicadores a partir de resultados fictícios | Etapa 3: tabela, colar CSV ou enviar arquivo `.csv`; Etapa 4: CTR, conversão e custo por contato |
| Comparar segundo um objetivo escolhido | Seletor "Atenção (CTR)", "Engajamento (conversão)", "Eficiência (custo por contato)" — trocar o objetivo troca o vencedor |
| Explicitar as limitações dos dados | Card "Limitações dos dados", sempre visível, gerado por regra (não pela IA) |
| Um canal, duas versões, três indicadores, sem publicar | Respeitado: nada é publicado em nenhuma plataforma |

Além disso:

- 🏆 **Selo de confiança** em cada indicador: "Vitória confiável", "Empate técnico" ou "Não testável" (teste z, 95%).
- 🧑‍⚖️ **Veredito do juiz** escrito pela IA com os números já calculados: quem venceu, se a hipótese de cada versão se confirmou e o que testar a seguir.
- 🛟 **Nunca trava:** se a IA falhar ou demorar mais de 15 s, o site usa conteúdo de reserva (marcado como "Fonte: exemplo"); o veredito de reserva é montado por regra a partir do placar e nunca contradiz os números.
- 📄 **Exportar relatório** do duelo em Markdown (`.md`).
- 📚 **"Como funciona"** no rodapé: fórmulas, regra do teste z e "a IA escreve, as contas são feitas em código".
- 📱 Responsivo (1280 px e 375 px), tema escuro, foco visível e vencedor indicado também por texto.

## Como usar (passo a passo)

1. Abra https://duelo-de-campanhas.vercel.app e clique em **Começar duelo**.
2. **Etapa 1 · Briefing:** escolha **Exemplo 1**, **Exemplo 2** ou **Exemplo 3** — ou preencha o seu.
3. **Etapa 2 · Versões:** clique em **Gerar com IA** (ou escreva as duas versões). Edite o que quiser.
4. **Etapa 3 · Resultados:** clique em **Exemplo 1/2/3**, cole um CSV ou use **Enviar arquivo .csv** (há 10 arquivos prontos para baixar na própria página).
5. **Etapa 4 · Placar:** troque o objetivo e veja o vencedor mudar. Leia o selo de cada indicador.
6. Leia as **limitações** e o **veredito do juiz**, e clique em **Exportar relatório (.md)**.

> 💡 Momento-chave da demo (Exemplo 1): pelo CTR, **A** vence (3,0% × 2,0%). Trocando para custo por contato, **B** vira o jogo (R$ 25,00 × R$ 40,00) — mas o selo é **Empate técnico** (z ≈ 1,44): com tão poucos contatos, o juiz avisa que ainda não dá para cravar.

## Regras de negócio

### Indicadores

| Indicador | Fórmula | Melhor quando |
|---|---|---|
| CTR | `cliques / impressões` | maior |
| Taxa de conversão | `contatos / cliques` | maior |
| Custo por contato | `investimento / contatos` | menor |

Divisão por zero mostra "—" e vira limitação — nunca `NaN` ou `Infinity`.

### Confiança da vitória (teste z de duas proporções, 95%)

```
p1 = x1/n1,  p2 = x2/n2,  p = (x1+x2)/(n1+n2)
z  = (p1 − p2) / √( p·(1−p)·(1/n1 + 1/n2) )
|z| ≥ 1,96 → "Vitória confiável"      |z| < 1,96 → "Empate técnico"
```

| Indicador | x | n |
|---|---|---|
| CTR | cliques | impressões |
| Conversão | contatos | cliques |
| Custo por contato | contatos | impressões — só vale com investimentos iguais; caso contrário, "Não testável" |

### Limitações (geradas por regra)

- Dados fictícios: servem para demonstrar o método, não para decidir uma campanha real. *(sempre)*
- Empate técnico em {indicador}: a diferença pode ser acaso.
- Poucos contatos ({n}): menos de 30 por versão deixa o custo por contato instável.
- Investimentos diferentes: a comparação de custo por contato não é justa.
- Sem dados para calcular {indicador}: divisão por zero.
- Um único canal e um único período: o resultado pode não se repetir. *(sempre)*

## Exemplos e CSVs para testar

### Três cenários prontos (botões Exemplo 1, 2 e 3)

| # | Cenário | O que ele mostra |
|---|---|---|
| 1 | **Café Mooca** — assinatura de café especial | A vence em atenção, B em conversão; custo por contato em empate técnico |
| 2 | **PetVida** — banho e tosa com leva e traz | Amostra grande e mesmo investimento: B vence com confiança nos 3 indicadores |
| 3 | **Fala Fluente** — curso de inglês online | Investimentos diferentes e poucos contatos: nada é conclusivo |

### Pasta de CSVs fictícios: [`public/exemplos/`](public/exemplos/)

Também disponíveis para download na Etapa 3 do site (ex.: https://duelo-de-campanhas.vercel.app/exemplos/cenario-2-petvida.csv).

| Arquivo | O que ele mostra |
|---|---|
| `cenario-1-cafe-mooca.csv` | Exemplo 1 |
| `cenario-2-petvida.csv` | Exemplo 2 |
| `cenario-3-fala-fluente.csv` | Exemplo 3 |
| `vitoria-clara-amostra-grande.csv` | 50 mil impressões por versão: A vence tudo com folga |
| `atencao-vs-conversao.csv` | A dobra o CTR, B converte 2,5× mais; custo ainda empatado |
| `empate-total.csv` | Diferenças pequenas em amostra pequena: empate em tudo |
| `investimentos-diferentes.csv` | B gastou 50% a mais: custo por contato "Não testável" |
| `zero-contatos.csv` | A sem contatos: o placar mostra "—" em vez de erro |
| `centavos-e-volume-alto.csv` | Investimento com centavos e 120 mil impressões |
| `formato-invalido.csv` | Para testar a mensagem de erro do CSV |

Formato:

```csv
versao,impressoes,cliques,contatos,investimento
A,10000,300,15,600
B,10000,200,24,600
```

## Como foi construído: agentes Codex orquestrados pelo Maestri

O projeto foi desenvolvido por uma **equipe de agentes de IA** trabalhando em paralelo no **Maestri**, um orquestrador visual de agentes: cada agente é um terminal no canvas, ligado aos outros por conexões, e eles trocam tarefas e notas pelo CLI `maestri`.

**4 terminais com o Codex (OpenAI) fizeram o trabalho de construção, teste e verificação:**

| Agente | Modelo (Codex) | Papel | Principais entregas |
|---|---|---|---|
| **Brenno** | GPT-6 **Luna** · high | Builder (lógica e placar) | `metrics.ts` (indicadores, teste z, limitações, parser CSV), placar e seletor de objetivo, selos, limitações, rota `/api/veredito` e veredito, exportação `.md`, "Como funciona", tema visual e destaque do vencedor |
| **Julia** | GPT-6 **Luna** · high | Builder (interface) | Hero, mockups de post do Instagram, "VS" e balões de hipótese |
| **Andrey** | GPT-6 **Astra** · high | QA | Suíte de testes `metrics.test.ts` (18 casos), revisão de código contra os requisitos, achado e reteste do BUG-01, aprovação do mínimo aceitável (`QA.md`) |
| **Felipe** | GPT-6.1 **Sol** | Verificador e ponte | Cruzamento QA × plano (`STATUS.md`), README inicial e roteiro do vídeo |

**O Claude (Anthropic) atuou como orquestrador ("Claudio-maestro")**: escreveu o plano e os requisitos, distribuiu as tarefas pelo Maestri, acompanhou cada agente, integrou e publicou. Quando os terminais do Codex ficaram fora do ar por um problema de login e de sandbox do Windows, o orquestrador também implementou partes para não perder o prazo: setup do projeto, contratos (`types.ts`) e dados de exemplo, etapas 1–3 e a rota `/api/versoes`, os três cenários, os CSVs de exemplo e o veredito de reserva. O histórico de commits identifica cada autor pelo prefixo (`brenno:`, `julia:`, `andrey:`, `felipe:`, `claudio:`).

**Dentro do produto, toda a IA é da OpenAI**: as versões de anúncio e o veredito do juiz são gerados pela **API da OpenAI** (Responses API, saída em JSON com schema estrito).

### Ciclo de trabalho

```
Claudio-maestro (orquestrador) ── PLANO.md: tarefas com dono, prazo e critério de aceite
        │
        ├──> Julia  (Codex · Luna)  ─┐
        └──> Brenno (Codex · Luna)  ─┴──> entregam (commit + "pronto" no PLANO.md)
                                           │
                                  Andrey (Codex · Astra) ── testa ──> QA.md
                                           │
                                  Felipe (Codex · Sol) ── QA × plano ──> STATUS.md
                                           │
        Claudio-maestro ── decide: corrigir, cortar ou seguir ── publica na Vercel
```

Regras da equipe: cada agente só altera os próprios arquivos; as contas ficam só em `metrics.ts` (a interface e a IA nunca recalculam); uma tarefa só está feita quando o QA aprova; a chave da OpenAI nunca vai para o frontend nem para o git. Detalhes em [AGENTS.md](AGENTS.md) e [PLANO.md](PLANO.md).

## Arquitetura e tecnologias

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 15 (App Router) + React 19 + TypeScript |
| Estilo | Tailwind CSS v4 |
| IA | API da OpenAI — SDK `openai`, Responses API com JSON schema estrito; modelo via `OPENAI_MODEL` (padrão `gpt-6.1-sol`) |
| Testes | Vitest |
| Deploy | Vercel |

```
src/
  app/
    page.tsx                 página única; estado das etapas
    api/versoes/route.ts     POST: briefing → 2 versões (IA, com reserva)
    api/veredito/route.ts    POST: números calculados → veredito (IA, com reserva)
  components/
    briefing/  versoes/  resultados/   etapas 1–3
    placar/    veredito/  comum/       etapa 4, veredito, limitações, exportar, "Como funciona"
  lib/
    types.ts                 contratos entre os agentes
    metrics.ts               contas puras: comparar, limitacoes, parseCsv
    metrics.test.ts          testes
    vereditoFallback.ts      veredito de reserva escrito por regra
  data/
    exemplo.ts               3 cenários de exemplo
    csvs.ts                  lista dos CSVs baixáveis
public/exemplos/             CSVs fictícios para download
```

### Rotas

| Rota | Entrada | Saída |
|---|---|---|
| `POST /api/versoes` | `{ briefing }` | `{ versoes: [A, B], fonte: "ia" \| "exemplo" }` |
| `POST /api/veredito` | `{ briefing, versoes, comparacoes, objetivo, limitacoes }` | `{ veredito, fonte: "ia" \| "exemplo" }` |

O prompt do veredito recebe os números **já calculados** e a instrução fixa: *"Não invente números. Se o selo for Empate técnico, diga que ainda não dá para concluir."*

## Como rodar localmente

Pré-requisitos: Node.js 20+ e npm.

```bash
git clone https://github.com/jubittencourt/Openai-Hackathon.git
cd Openai-Hackathon
npm install
```

Crie um arquivo `.env.local` na raiz (veja `.env.example`):

```env
OPENAI_API_KEY=sua-chave
OPENAI_MODEL=gpt-6.1-sol
```

> A chave é usada **somente no servidor** e o `.env.local` não é versionado. Sem `OPENAI_API_KEY`, o site funciona do mesmo jeito usando o conteúdo de reserva.

```bash
npm run dev     # http://localhost:3000
npm test        # testes de métricas (Vitest)
npm run build   # build de produção
```

## Testes e qualidade

- **18 testes** em `src/lib/metrics.test.ts`: tabela esperada do exemplo (valores, vencedores, z com 2 casas, selos), as limitações em ordem, zero contatos em A, em B e em ambas, investimentos diferentes e diversos CSVs inválidos.
- **Resultado esperado do Exemplo 1** (usado como teste):

| | A | B | Vencedor | z | Selo |
|---|---|---|---|---|---|
| CTR | 3,0% | 2,0% | A | 4,53 | Vitória confiável |
| Conversão | 5,0% | 12,0% | B | 2,86 | Vitória confiável |
| Custo por contato | R$ 40,00 | R$ 25,00 | B | 1,44 | Empate técnico |

- **Aceite de tela em produção**, inclusive a 375 px: fluxo completo, troca de objetivo, zero contatos, investimentos diferentes, CSV inválido e exportação. Registro em [QA.md](QA.md).
- Verificado que **nenhuma chave** aparece no histórico do git.

## Escopo e limitações

- Fora do escopo, de propósito: publicar anúncios, integração com Meta ou CRM, login, banco de dados, mais de um canal, mais de 2 versões e mais de 3 indicadores.
- Os resultados são **fictícios**; o objetivo é demonstrar o método de comparação, não decidir uma campanha real.
- O teste z para custo por contato é uma **aproximação** (contatos por impressão) e só vale com investimentos iguais.
- A geração por IA leva de 8 a 12 s; acima de 15 s o site usa o conteúdo de reserva.

## Próximos passos

- **"Quanto falta para ter certeza?"** — no empate técnico, calcular quantas impressões, quanto investimento e quantos dias faltam para a diferença ficar confiável.
- Importar o CSV exportado do Meta Ads Manager.
- Incluir o valor de cada venda para mostrar o retorno sobre o investimento, além do custo por contato.
- Comparar vários períodos para ver se o vencedor se mantém.

## Documentos do projeto

| Documento | Conteúdo |
|---|---|
| [DESAFIO-17.md](DESAFIO-17.md) | Desafio, produto, regras de negócio e contratos |
| [REQUISITOS.md](REQUISITOS.md) | Requisitos (mínimo, desejável, opcional) e roteiro de aceite |
| [PLANO.md](PLANO.md) | Arquitetura, tarefas, prazos, ordem de corte e log de decisões |
| [AGENTS.md](AGENTS.md) | Papéis e regras dos agentes |
| [QA.md](QA.md) | Rodadas de QA e aprovações |
| [STATUS.md](STATUS.md) | Status cruzando QA × plano |
| [docs/roteiro-video.md](docs/roteiro-video.md) | Roteiro do vídeo de até 3 min |

## Equipe

Agentes orquestrados no **Maestri**:

- **Julia**, **Brenno**, **Andrey** e **Felipe** — 4 terminais com **Codex** (GPT-6.1 Sol, GPT-6 Luna high e GPT-6 Astra high)
- **Claudio-maestro** — Claude, orquestrador

Feito para o **Desafio 17 do DevDay Community Hackathon SP** — 23/10/2026.
