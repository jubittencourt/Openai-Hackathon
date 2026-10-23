# Duelo de Campanhas — Desafio 17 (DevDay Community Hackathon SP)

> Documento-guia da equipe. Todo agente (Claudio-maestro, Julia, Brenno, Andrey, Felipe) lê este arquivo **antes** de começar e segue a divisão de papéis da seção 4. Os agentes estão ligados pelo **Maestri** (seção 11).

---

## 1. O desafio (texto oficial)

**17. Planejador de campanhas com comparação de resultados**

- **Desafio:** criar um produto que organize duas alternativas de campanha e ajude a comparar seu desempenho.
- **Entrega mínima:** receber um briefing, criar ou cadastrar duas versões e calcular indicadores a partir de resultados fictícios fornecidos.
- **Demonstração:** comparar as campanhas segundo um objetivo escolhido, como custo por contato, explicitando as limitações dos dados.
- **Limite de escopo:** um canal, duas versões e três indicadores, sem publicação de anúncios.

### Mínimo aceitável (vale para o projeto inteiro)

Nada é considerado pronto, e nenhum extra começa, antes de isto funcionar no link público:

> **Desafio:** Criar um produto que organize duas alternativas de campanha e ajude a comparar seu desempenho.
> **Entrega mínima:** Receber um briefing, criar ou cadastrar duas versões e calcular indicadores a partir de resultados fictícios fornecidos.
> **Demonstração:** Comparar as campanhas segundo um objetivo escolhido, como custo por contato, explicitando as limitações dos dados.
> **Limite de escopo:** Um canal, duas versões e três indicadores, sem publicação de anúncios.

Esses são os requisitos **M** de `REQUISITOS.md`. Tudo marcado **D** ou **O** só entra depois deles aprovados pelo QA.

### Regras do evento

- Equipe de no máximo 4 pessoas, 1 desafio.
- **Entrega até 16h00** pelo formulário do guia (https://openaihackathon.com.br, senha `chatgpt`).
- Obrigatório: **vídeo de até 3 min**, **repositório**, **URL pública acessível**.
- Julgamento a partir das 16h, top 3 às 17h30.

### Critérios (25% cada)

| Critério | Como vamos ganhar |
|---|---|
| Funcional | Fluxo único que nunca quebra. Contas em código, IA só escreve texto. Dados de exemplo em 1 clique. Fallback se a API falhar. |
| Criatividade | Visual de "duelo" (versus/placar), juiz com veredito, hipótese de cada versão, selo "vitória confiável" ou "empate técnico". |
| Apresentação | UI caprichada, mockup de post por versão, vídeo roteirizado (seção 8). |
| Cumpre o objetivo | Cada item da entrega mínima aparece na tela (checklist da seção 9). |

---

## 2. O produto

**Uma frase:** duas versões de uma campanha entram no ringue, você escolhe o objetivo e o juiz mostra quem venceu, com as contas abertas e o quanto dá para confiar no resultado.

### Fluxo (caminho feliz único)

1. **Briefing:** produto, público, objetivo de negócio, verba e canal. O canal é fixo: **Instagram (feed)**. Botão "Usar briefing de exemplo".
2. **Versões A e B:** botão "Gerar com IA" cria as duas versões a partir do briefing. Cada versão tem `titulo`, `texto`, `cta` e `hipotese` ("por que esta versão pode vencer"). Tudo editável, e dá para cadastrar à mão. Cada versão aparece num **mockup de post do Instagram**.
3. **Resultados fictícios:** botão "Carregar resultados de exemplo" ou colar um CSV. Campos por versão: `impressoes`, `cliques`, `contatos`, `investimento` (R$).
4. **Placar:** os 3 indicadores lado a lado, com a fórmula visível em cada um.
5. **Seletor de objetivo:** "Atenção (CTR)", "Engajamento (conversão)" ou "Eficiência (custo por contato)". **Trocar o objetivo troca o vencedor.**
6. **Veredito do juiz:** texto da IA explicando o vencedor no objetivo escolhido, se a hipótese de cada versão se confirmou e o que testar a seguir.
7. **Limitações dos dados:** card sempre visível (seção 3.3).
8. **Exportar:** botão que baixa o relatório do duelo em `.md`.

Ficam **fora** do escopo: publicar anúncios, integrar com Meta ou CRM, login, banco de dados, mais de um canal, mais de 2 versões, mais de 3 indicadores.

---

## 3. Regras de negócio (implementar exatamente assim)

### 3.1 Indicadores

| Indicador | Fórmula | Melhor quando |
|---|---|---|
| CTR | `cliques / impressoes` | maior |
| Taxa de conversão | `contatos / cliques` | maior |
| Custo por contato | `investimento / contatos` | menor |

Divisão por zero mostra "—" e entra como limitação. Nunca mostrar `NaN` ou `Infinity`.

### 3.2 Confiança da vitória (teste z de duas proporções, 95%)

```
p1 = x1/n1, p2 = x2/n2, p = (x1+x2)/(n1+n2)
z  = (p1 - p2) / sqrt(p * (1-p) * (1/n1 + 1/n2))
|z| >= 1.96  -> "Vitória confiável"
|z| <  1.96  -> "Empate técnico"
```

| Indicador | x | n |
|---|---|---|
| CTR | cliques | impressões |
| Conversão | contatos | cliques |
| Custo por contato | contatos | impressões (aproximação, vale só se o investimento das duas versões for igual; se não for, mostrar "não testável" e registrar como limitação) |

### 3.3 Limitações (geradas por regra, não pela IA)

Mostrar cada uma que se aplicar:

- "Dados fictícios: servem para demonstrar o método, não para decidir uma campanha real." (sempre)
- "Empate técnico em {indicador}: a diferença pode ser acaso." (quando |z| < 1.96)
- "Poucos contatos ({n}): menos de 30 por versão deixa o custo por contato instável." (quando contatos < 30 em alguma versão)
- "Investimentos diferentes: a comparação de custo por contato não é justa." (quando os investimentos diferem)
- "Um único canal e um único período: o resultado pode não se repetir." (sempre)

### 3.4 Dados de exemplo (pensados para a demo)

```csv
versao,impressoes,cliques,contatos,investimento
A,10000,300,15,600
B,10000,200,24,600
```

Resultado esperado (use como teste):

| | A | B | Vencedor | z | Selo |
|---|---|---|---|---|---|
| CTR | 3,0% | 2,0% | **A** | ≈ 4,53 | Vitória confiável |
| Conversão | 5,0% | 12,0% | **B** | ≈ 2,86 | Vitória confiável |
| Custo por contato | R$ 40,00 | R$ 25,00 | **B** | ≈ 1,44 | **Empate técnico** |

É esse o momento forte da demo: A chama mais atenção, mas B traz contatos mais baratos. Mesmo assim, no custo por contato a amostra é pequena e o juiz diz que **ainda não dá para cravar**. Isso cumpre literalmente "explicitando as limitações dos dados".

Briefing de exemplo:

> **Produto:** Café Mooca — assinatura mensal de café especial (R$ 59/mês). **Público:** jovens adultos de 22–35 anos em São Paulo que trabalham em casa. **Objetivo:** gerar contatos no WhatsApp para fechar assinaturas. **Verba:** R$ 1.200 (R$ 600 por versão). **Canal:** Instagram feed.

---

## 4. Quem faz o quê

| Agente | Modelo · esforço | Papel | Arquivos que pode alterar |
|---|---|---|---|
| **Claudio-maestro** | Claude Opus · médio | **Líder e orquestrador.** Toma as decisões, define a arquitetura, escreve o `PLANO.md` com as tarefas de cada um, cria o repo e faz o deploy, integra o trabalho e decide o que cortar. A palavra final é dele. | `PLANO.md`, `AGENTS.md`, `src/lib/types.ts`, `src/data/**`, config de projeto e deploy |
| **Julia** | Luna · alto | **Builder principal (site, parte 1).** Etapas 1–3: hero, briefing, versões com mockup de post, resultados/CSV. Rota `/api/versoes`. | `src/components/briefing/**`, `src/components/versoes/**`, `src/components/resultados/**`, `src/app/api/versoes/**`, `src/app/page.tsx` (só a montagem das etapas) |
| **Brenno** | Luna · alto | **Builder principal (site, parte 2).** Lógica de contas `metrics.ts`, etapa 4 em diante: placar, seletor de objetivo, selos, limitações, veredito, exportação, "Como funciona". Rota `/api/veredito`. Dono do visual global. | `src/lib/metrics.ts`, `src/components/placar/**`, `src/components/veredito/**`, `src/components/comum/**`, `src/app/api/veredito/**`, `src/app/globals.css`, `tailwind.config.ts` |
| **Andrey** | Astra · alto | **QA.** Verifica tudo o que Julia e Brenno entregam: testes de `metrics.ts` contra a seção 3.4, `npm run build`, roteiro de aceite do `REQUISITOS.md` §7 no link de produção. Registra os achados no `QA.md`. **Não implementa features.** | `src/lib/metrics.test.ts`, `QA.md` |
| **Felipe** | Sol · médio | **Verificador e ponte.** Cruza o `QA.md` com o `PLANO.md`, prioriza os achados (bloqueia a demo / não bloqueia) e leva para o Claudio-maestro decidir. Cuida do checklist de entrega, do README e do roteiro do vídeo. | `STATUS.md`, `README.md`, `docs/roteiro-video.md` |

### Ciclo de trabalho

```
Claudio-maestro ── PLANO.md (tarefas com ID, dono, critério de aceite)
      │
      ├──> Julia  ─┐
      └──> Brenno ─┴──> entregam a tarefa (commit + "pronto: T03" no PLANO.md)
                              │
                         Andrey (QA) ── testa ──> QA.md (aprovado / bug com passos)
                              │
                         Felipe ── cruza QA.md × PLANO.md ──> STATUS.md + resumo ao Claudio
                              │
      Claudio-maestro ── decide: corrigir, cortar ou seguir ── atualiza PLANO.md
```

- Uma tarefa só é "feita" quando o Andrey aprova no `QA.md`.
- Bug que bloqueia a demo passa à frente de qualquer tarefa nova.
- Julia e Brenno não decidem escopo: dúvida vai para o Claudio-maestro (pelo Felipe, se ele estiver ocupado).

### O que o `PLANO.md` do Claudio-maestro precisa ter

1. Decisões de arquitetura (pastas, estado da página, como as etapas se comunicam), coerentes com as seções 5 e 6.
2. Lista de tarefas numeradas (T01, T02…) com dono, dependências, arquivos, critério de aceite (ligado a um RF do `REQUISITOS.md`) e prazo.
3. Ordem que permite Julia e Brenno trabalharem em paralelo desde o início. Os tipos de `src/lib/types.ts` e os dados de `src/data/exemplo.ts` saem primeiro, para ninguém esperar ninguém.
4. Primeiro marco: o **mínimo aceitável** (seção 1) ponta a ponta até as 13h00. Extras só depois.
5. O que cortar, e em que ordem, se o horário apertar.

### Regras de convivência

- Cada agente só altera os próprios arquivos. Se precisar mudar arquivo de outro, pede ao Claudio-maestro.
- A UI consome os tipos de `src/lib/types.ts` e as funções de `src/lib/metrics.ts`. **Não reimplementa as contas na interface.**
- Commits pequenos e frequentes, com prefixo do agente: `claudio: plano`, `julia: briefing`, `brenno: placar`, `andrey: testes metrics`, `felipe: readme`.
- A chave da OpenAI **nunca** vai para o frontend nem para o git.

---

## 5. Contratos (a fonte da verdade entre todos os agentes)

### 5.1 Tipos — `src/lib/types.ts`

```ts
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
  z: number | null;
  selo: "Vitória confiável" | "Empate técnico" | "Não testável";
  formula: string;
};

export type Veredito = {
  resumo: string;            // 2-3 frases
  hipoteseA: string;         // confirmou / não confirmou, e por quê
  hipoteseB: string;
  proximoTeste: string;      // uma sugestão concreta
};
```

### 5.2 Funções — `src/lib/metrics.ts` (puras, sem IA)

```ts
comparar(a: Resultado, b: Resultado): Comparacao[]   // os 3 indicadores
limitacoes(a: Resultado, b: Resultado, comps: Comparacao[]): string[]
parseCsv(texto: string): [Resultado, Resultado]       // lança erro legível se inválido
```

### 5.3 Rotas — `src/app/api/**`

| Rota | Entrada | Saída |
|---|---|---|
| `POST /api/versoes` | `{ briefing: Briefing }` | `{ versoes: [Versao, Versao], fonte: "ia" \| "exemplo" }` |
| `POST /api/veredito` | `{ briefing, versoes, comparacoes, objetivo: IndicadorId, limitacoes }` | `{ veredito: Veredito, fonte: "ia" \| "exemplo" }` |

- Usar a **Responses API** (`client.responses.create`) com saída em **JSON estruturado** (schema estrito batendo com os tipos acima). Modelo via `OPENAI_MODEL` (padrão `gpt-6.1-sol`).
- **Fallback obrigatório:** se a chamada falhar ou demorar mais de 15 s, devolver o conteúdo de `src/data/exemplo.ts` com `fonte: "exemplo"`. A demo nunca pode travar.
- O prompt do veredito recebe os números **já calculados** e as limitações. A IA **não recalcula nada**, só explica. Instrução fixa: "Não invente números. Se o selo for Empate técnico, diga que ainda não dá para concluir."

---

## 6. O site (feito por Julia e Brenno)

### Estrutura da página (uma página só, em etapas)

1. **Hero:** nome "Duelo de Campanhas", frase de uma linha e botão "Começar duelo".
2. **Etapa 1 · Briefing:** formulário com botão "Usar exemplo".
3. **Etapa 2 · As versões:** dois cards lado a lado em mockup de post do Instagram, com "VS" no meio. Botão "Gerar com IA", campos editáveis e a hipótese de cada versão num balão.
4. **Etapa 3 · Resultados:** tabela editável de 2 linhas, botão "Carregar exemplo" e área para colar CSV.
5. **Etapa 4 · Placar:** seletor de objetivo em pílulas no topo. Abaixo, 3 linhas de indicador com barra A × B, valor, fórmula e selo. O vencedor do objetivo escolhido ganha destaque (coroa/brilho).
6. **Veredito do juiz:** card com resumo, hipóteses e próximo teste.
7. **Limitações dos dados:** card em tom de alerta, sempre visível depois do placar.
8. **Exportar relatório (.md)**.
9. **Seção "Como funciona"** no rodapé: as 3 fórmulas, a regra do teste z em linguagem simples e "a IA escreve, as contas são feitas em código". Também ajuda o júri a entender o produto sem a gente explicar.

### Diretrizes visuais

- Clima de "luta/placar", mas profissional: fundo escuro, A em uma cor, B em outra (ex.: ciano × laranja), tipografia forte nos números.
- Funciona bem a 1280 px (telão) e a 375 px (celular do jurado).
- Estados de carregamento visíveis ("o juiz está analisando…"), nenhum botão sem resposta.
- Mostrar discretamente quando a resposta veio do exemplo (`fonte: "exemplo"`).
- Acessibilidade: contraste AA, foco visível e o vencedor indicado também por texto, não só por cor.

---

## 7. Como rodar

### Setup (Claudio-maestro, primeiros 15 min)

```bash
cp -r ~/hackathon/templates/nextjs-agent ~/hackathon/duelo-de-campanhas
cd ~/hackathon/duelo-de-campanhas
cp .env.example .env.local        # preencher OPENAI_API_KEY e OPENAI_MODEL
npm install
npm run dev                        # http://localhost:3000
git init && git add -A && git commit -m "cc: base do template"
```

Criar o repositório no GitHub e dar push na hora. Conferir que `.env.local` está no `.gitignore`.

### Deploy (Claudio-maestro, até as 11h45; Felipe confere o link)

```bash
vercel login                      # uma vez, no navegador
vercel                            # primeiro deploy
vercel env add OPENAI_API_KEY     # e OPENAI_MODEL
vercel --prod                     # link fixo para entregar
```

Plano B, se a Vercel falhar: `cloudflared tunnel --url http://localhost:3000` (o link só fica no ar enquanto o notebook estiver ligado). Mais detalhes em `~/hackathon/DEPLOY.md`.

### Antes de cada deploy

```bash
npm run build   # tem que passar sem erro
```

---

## 8. Roteiro do vídeo (até 3 min)

| Tempo | Tela | Fala |
|---|---|---|
| 0:00–0:20 | Hero | "Pequenos negócios testam duas versões de anúncio e escolhem a vencedora no olho. Às vezes a 'vencedora' só chamou atenção, e não trouxe cliente." |
| 0:20–0:40 | Briefing de exemplo | "No Duelo de Campanhas você descreve a campanha…" |
| 0:40–1:05 | Gerar versões | "…a IA cria duas versões com hipóteses diferentes, tudo editável." |
| 1:05–1:20 | Carregar resultados | "Entram os resultados de cada versão." |
| 1:20–1:50 | Placar, objetivo CTR → custo por contato | "Pelo CTR, A vence. Mas nosso objetivo é contato barato, e aí B vira o jogo." |
| 1:50–2:20 | Selo "Empate técnico" + limitações | "Só que com 24 contatos o juiz avisa: ainda não dá para cravar. A gente mostra o limite dos dados em vez de esconder." |
| 2:20–2:40 | Veredito + próximo teste + exportar | "O juiz sugere o próximo teste e você leva o relatório." |
| 2:40–3:00 | "Como funciona" | "As contas são feitas em código, a IA explica. Tudo sem publicar nada. Link e repositório na descrição." |

Gravar com o OBS/Kooha a 125% de zoom, usando só botões de exemplo (nada digitado ao vivo).

---

## 9. Cronograma e checklist

| Hora | Marco |
|---|---|
| até 11h45 | `PLANO.md` do Claudio-maestro pronto + repo no GitHub + deploy "hello" na Vercel + `types.ts` e `exemplo.ts` publicados |
| até 12h15 | `metrics.ts` (Brenno) aprovado pelo Andrey com a tabela da 3.4 |
| até 13h00 | **Mínimo aceitável ponta a ponta** (mesmo feio), com fallback, aprovado pelo QA |
| 13h00–13h30 | Almoço em turnos (nunca sair todo mundo) |
| até 14h30 | Visual final de Julia e Brenno integrado. **Congelar funcionalidades.** |
| 14h30–15h00 | Andrey roda o roteiro de aceite no link de produção (aba anônima + celular); Felipe prioriza, Claudio decide as correções |
| 15h00–15h30 | Gravar o vídeo |
| 15h30–15h45 | README final, link, vídeo publicado |
| **até 16h00** | **Submeter o formulário** |

### Checklist "cumpre o objetivo" (conferir na tela antes de gravar)

- [ ] Recebe um briefing
- [ ] Cria (IA) **ou** cadastra (manual) duas versões
- [ ] Calcula 3 indicadores a partir de resultados fictícios
- [ ] Compara segundo um objetivo escolhido (custo por contato incluso)
- [ ] Explicita as limitações dos dados
- [ ] 1 canal, 2 versões, 3 indicadores, nada publicado

### Checklist de entrega

- [ ] URL pública abrindo em aba anônima e no celular
- [ ] Repositório público com README (o que é, link, como rodar, quem fez)
- [ ] Vídeo de até 3 min com link acessível
- [ ] Nenhuma chave no repositório (`git log -p | grep -i sk-` não acha nada)
- [ ] Formulário enviado antes das 16h00

---

## 10. Prompts prontos

### Claudio-maestro (Claude Opus · médio) — líder

> Você é o Claudio-maestro, líder e orquestrador do projeto. Leia `~/hackathon/DESAFIO-17.md` e `~/hackathon/REQUISITOS.md` inteiros. Primeiro faça o setup da seção 7 e publique `src/lib/types.ts` (seção 5.1) e `src/data/exemplo.ts` (seção 3.4), para os builders não ficarem esperando. Depois escreva o `PLANO.md` seguindo a seção 4 ("O que o PLANO.md precisa ter"): arquitetura, tarefas T01… com dono (Julia ou Brenno), dependências, arquivos, critério de aceite ligado a um RF e prazo. O primeiro marco é o **mínimo aceitável** da seção 1 até as 13h00. Atualize o `AGENTS.md` do projeto apontando para esses documentos. Daí em diante, receba os resumos do Felipe, decida (corrigir, cortar, seguir) e mantenha o `PLANO.md` atualizado. Você não constrói telas: delega.

### Julia (Luna · alto) — builder, site parte 1

> Você é a Julia, builder principal. Leia `~/hackathon/DESAFIO-17.md` (seções 1, 2, 4, 5 e 6) e o `PLANO.md`. Faça apenas as tarefas marcadas com seu nome, apenas nos seus arquivos (seção 4): etapas 1–3 do site (hero, briefing, versões com mockup de post, resultados/CSV) e a rota `/api/versoes` com fallback. Use os tipos de `src/lib/types.ts`. Ao terminar uma tarefa, faça commit com prefixo `julia:` e marque "pronto: Txx" no `PLANO.md`. Dúvida de escopo vai para o Claudio-maestro; não decida sozinha.

### Brenno (Luna · alto) — builder, site parte 2

> Você é o Brenno, builder principal. Leia `~/hackathon/DESAFIO-17.md` (seções 1 a 6) e o `PLANO.md`. Faça apenas as tarefas marcadas com seu nome, apenas nos seus arquivos (seção 4). Comece por `src/lib/metrics.ts` exatamente como na seção 3, porque o resto depende dele. Depois: placar, seletor de objetivo, selos, limitações, veredito, exportação, "Como funciona", rota `/api/veredito` com fallback e o visual global. Ao terminar uma tarefa, faça commit com prefixo `brenno:` e marque "pronto: Txx" no `PLANO.md`. Dúvida de escopo vai para o Claudio-maestro.

### Andrey (Astra · alto) — QA

> Você é o Andrey, QA. Leia `~/hackathon/DESAFIO-17.md` (seções 1, 3 e 4), `~/hackathon/REQUISITOS.md` e o `PLANO.md`. Para cada tarefa marcada "pronto", verifique o critério de aceite. Escreva `src/lib/metrics.test.ts` com a tabela da seção 3.4 (valores, vencedores, z com 2 casas, selos) e os casos de zero contatos e investimentos diferentes. Rode `npm run build`. Registre no `QA.md`: tarefa, aprovado ou bug, passos para reproduzir, gravidade (bloqueia a demo / não bloqueia). A partir das 14h30, rode o roteiro de aceite do `REQUISITOS.md` §7 no link de produção. Não implemente features nem corrija o código dos builders.

### Felipe (Sol · médio) — verificador e ponte

> Você é o Felipe, verificador. Leia `~/hackathon/DESAFIO-17.md`, `~/hackathon/REQUISITOS.md`, o `PLANO.md` e o `QA.md`. A cada rodada de QA, cruze os achados com o plano e escreva o `STATUS.md`: o que está aprovado, o que bloqueia o mínimo aceitável, o que está atrasado em relação ao cronograma da seção 9 e sua recomendação. Leve o resumo ao Claudio-maestro, que decide. Também cuide do `README.md`, do `docs/roteiro-video.md` (seção 8) e do checklist de entrega da seção 9, incluindo conferir o link público. Não altere código.

---

## 11. Como os agentes estão ligados: Maestri

A equipe usa o **Maestri**, um workspace visual em que cada agente (Claudio-maestro, Julia, Brenno, Andrey e Felipe) é um **terminal no canvas**. Os agentes ficam **ligados entre si por conexões no canvas**, e só conversam com quem está conectado a eles.

As conexões seguem o ciclo da seção 4:

```
Claudio-maestro ── Julia
Claudio-maestro ── Brenno
Julia / Brenno  ── Andrey (QA)
Andrey          ── Felipe
Felipe          ── Claudio-maestro
```

**Como eles se comunicam:** pelo CLI `maestri`, rodado dentro do próprio terminal do agente.

- `maestri list`: mostra os agentes e as notas conectados.
- `maestri ask "Nome" "pedido"`: envia uma tarefa ou pergunta e recebe a resposta.
- `maestri check "Nome"`: mostra o andamento de um agente sem interromper.
- `maestri note read/edit "Nome da nota"`: lê e edita as notas do canvas.

**Notas:** o canvas já tem a nota **"Hackathon — 19 desafios de tecnologia"**, com os desafios oficiais (o nosso é o 17). O plano, o QA e o status podem ser espelhados em notas para toda a equipe acompanhar. Os arquivos `.md` do repositório continuam sendo a fonte da verdade.

