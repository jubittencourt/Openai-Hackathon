# QA — Duelo de Campanhas

> Dono: **Andrey**. Rodadas de 23/10/2026; atualização às 14:29 (America/Sao_Paulo).
> Gravidade: **BLOQUEIA** = mínimo aceitável/demo ou aprovação impedidos; **NÃO BLOQUEIA** = verificação aprovada ou observação.

## Rodada inicial — 14:14–14:20 (histórico)

| Hora | Tarefa | RF | Resultado | Gravidade | Passos para reproduzir / evidência |
|---|---|---|---|---|---|
| 14:14 | T03 | RF03/04/06/07 | aprovado: suíte criada e executada | NÃO BLOQUEIA | `npm.cmd test`: 18 testes, 16 passaram e 2 falharam pelo BUG-01. Oráculo independente do §5: valores, vencedores, z absoluto a duas casas, selos, fórmulas, quatro limitações em ordem, zero contatos A/B/ambas, investimentos diferentes e CSV inválido. Testes vermelhos preservados para o builder corrigir. |
| 14:14 | T02 | RF04/06/07 | bug: BUG-01 | BLOQUEIA | Exemplo do §5, investimentos 600/600; zerar contatos só de A. Custo A=null e vencedor=null, mas selo=Vitória confiável, z=4.901921521354847 e ausência da limitação de divisão por zero. Zerar só B produz z=3.874436532430603 e mesmo defeito. Esperado pelo §4: Não testável, z=null e 'Sem dados para calcular Custo por contato: divisão por zero.'. Reproduzir: `npm.cmd test`. |
| 14:14 | T02 | RF04/06/07 | aprovado: exemplo | NÃO BLOQUEIA | CTR 0,03/0,02, A, z=4,53, confiável; conversão 0,05/0,12, B, z=2,86, confiável; custo 40/25, B, z=1,44, empate. Quatro frases exatas do §5 na ordem correta. Este cenário não aprova T02 devido ao BUG-01. |
| 14:14 | T02 | RF04/06/07 | aprovado: investimentos diferentes e finitude | NÃO BLOQUEIA | B.investimento=700: custo Não testável, z=null, limitação correta. Zero contatos em ambas: custo Não testável. Nenhum cenário de zero contatos produziu NaN/Infinity. |
| 14:14 | T02/T07 | RF03 | aprovado: parser nos casos testados | NÃO BLOQUEIA | CSV do §5 retorna A/B corretos. abc, cabeçalho errado, versão duplicada, negativo, texto numérico inválido, Infinity, coluna ausente e aspas abertas lançam erro em português iniciado por 'CSV inválido:'. Interface pendente. |
| 14:15–14:17 | T00 / build | RNF01 | impedido: ENV-01 | BLOQUEIA | `npm test` e `npm run build` inicialmente bloqueados por ExecutionPolicy de npm.ps1; executados os equivalentes npm.cmd. Dois builds compilaram e passaram tipos, mas saíram com código 1: ENOENT em .next/build-manifest.json; primeiro também em .next/server/pages-manifest.json; segundo com EPERM no cache webpack. Alterações concorrentes observadas na pasta; concorrência é hipótese, não causa comprovada. Build não aprovado. |
| 14:18 | T01 | contratos | aprovado por leitura | NÃO BLOQUEIA | types.ts corresponde aos contratos; exemplo.ts contém briefing, duas versões, resultados/CSV do §5 e vereditos por objetivo, com ressalva de empate no custo. |
| 14:18 | T04–T07 | RF01/02/03/08/09 | revisão de código aprovada; tela pendente | NÃO BLOQUEIA | Formulário valida e preenche exemplo/canal readOnly; versões editáveis; resultados usam parseCsv e role=alert; rota de versões retorna fonte=exemplo sem chave/erro e usa AbortController de 15 s. Página usa comparar/limitacoes. Fluxo/loading em produção não confirmados. |
| 14:18 | T08 | RF04/05/06 | revisão de código aprovada; tela pendente | NÃO BLOQUEIA | Placar usa formatIndicador/formatZ, fórmulas, selos e vencedor textual; seletor chama onObjetivo. Formato pt-BR: percentuais com uma casa, moeda/z com duas, null/não finitos como travessão. Incluída leitura da atualização concorrente com destaque/coroa da vencedora. BUG-01 nasce em metrics.ts. |
| 14:18 | T09 | RF07 | revisão de código aprovada; tela pendente | NÃO BLOQUEIA | Card renderiza os itens recebidos em ordem, sem IA; page.tsx posiciona-o imediatamente depois do placar. Regra de zero contatos permanece com BUG-01 em metrics.ts. |
| 14:18 | T10 | RF08/11/16 | revisão de código aprovada; tela pendente | NÃO BLOQUEIA | Rota recebe comparações calculadas, proíbe recalcular/inventar e pede ressalva de empate; schema estrito, aborto de 15 s, fallback por objetivo. Componente reage ao pedido/objetivo, mostra carregamento e Fonte: exemplo. Timeout e interação não exercitados. |
| 14:18 | T13 | RF13 | revisão de código aprovada; download pendente | NÃO BLOQUEIA | Markdown inclui briefing, versões, resultados, objetivo, valores/z/selos/fórmulas, veredito e limitações. Blob text/markdown, download duelo-de-campanhas.md, URL revogada. Veredito recebido do estado da página. Download real não executado. |
| 14:18 | T14 | RF14/16 | revisão de código aprovada; tela pendente | NÃO BLOQUEIA | Rodapé inclui fórmulas, z=1,96, regra de investimentos iguais, explicação de IA/contas e fonte. Avisos Fonte: exemplo existem em Versoes e Veredito. |
| 14:18 | T15 / M1 | RF10, RF01–17 | impedido: ENV-02 | BLOQUEIA | Alvo https://duelo-de-campanhas.vercel.app. Ferramenta web não acessou URL (não prova indisponibilidade pública). Playwright ausente; instalação temporária falhou EACCES em registry.npmjs.org. Edge headless terminou com 'GPU process is not usable. Goodbye.' (log original: GPU process isn't usable. Goodbye.). node_repl não iniciou sandbox. Não foi possível interagir com produção nem testar 375 px. |

## Reteste e aceite M1 — 14:29

**T02 e M1 (RF01–RF10): aprovados.** Base: reteste executado por Andrey, revisão de código registrada acima, build e aceite de tela executados pelo Claudio-maestro e relatados nesta sessão. O teste de tela abaixo não foi executado por Andrey. Produção informada pelo Claudio: https://duelo-de-campanhas.vercel.app, nova publicação após a correção `dec1e9a`.

| Hora | Tarefa | RF | Resultado | Gravidade | Passos para reproduzir / evidência e executor |
|---|---|---|---|---|---|
| 14:29 | T02/T03 | RF03/04/06/07 | aprovado; BUG-01 encerrado | NÃO BLOQUEIA | Andrey executou `npm.cmd test` em HEAD dec1e9a: 1 arquivo aprovado, 18/18 testes passaram, saída 0, duração 447 ms, início 14:29:01. Inclui zero contatos em A/B/ambas, selo Não testável, z=null e limitação. Diff da correção conferido: valores indisponíveis tornam indicador não calculável e zFinal=null. |
| 14:29 | T00 / build | RNF01 | aprovado por evidência do Claudio; ENV-01 encerrado | NÃO BLOQUEIA | Claudio informou build limpo aprovado após remover .next e executar npm run build. Identificou builds concorrentes na mesma .next como causa do ENV-01. Build passa a ser exclusivo do Claudio. Andrey não executou build nesta rodada. |
| 14:29 | T04/T05/T06 | RF01/02/08/09/16 | aprovado no fluxo M1 | NÃO BLOQUEIA | Claudio, portal Maestri em produção a 375 px: Usar exemplo OK; Gerar com IA preenche duas versões com Fonte: exemplo, sem OPENAI_API_KEY. Revisão anterior confirma campos de briefing, canal fixo e edição manual. Não foi relatado novo teste de apagar/recriar uma versão nem de loading. |
| 14:29 | T07 | RF03 | aprovado no fluxo M1 | NÃO BLOQUEIA | Claudio: Carregar exemplo preenche resultados e abre placar; CSV abc produz erro legível 'CSV inválido: ...'. Parser válido/inválido também confirmado pelos testes de Andrey. Importação do CSV válido pela UI não foi explicitamente relatada nesta rodada. |
| 14:29 | T08 | RF04/05/06 | aprovado no fluxo M1 | NÃO BLOQUEIA | Claudio: placar com z 4,53/2,86/1,44 e selos; selecionar Eficiência mostra custo por contato, coroa 'Vencedora do objetivo: versão B' e Empate técnico. Valores/vencedores/fórmulas confirmados pela suíte e revisão anterior. |
| 14:29 | T09/T02 | RF04/06/07 | aprovado no fluxo M1 | NÃO BLOQUEIA | Claudio: quatro limitações do exemplo; contatos A=0 sem NaN/Infinity, um selo Não testável e limitação de divisão por zero; investimento B=700 gera limitação de investimentos diferentes. Suíte confirma também Não testável para investimentos diferentes. |
| 14:29 | T10 | RF08/11/16 | aprovado no cenário relatado | NÃO BLOQUEIA | Claudio: veredito de custo contém 'ainda não dá para concluir' e Fonte: exemplo. Fallback sem chave confirmado em produção; timeout de IA não exercitado nesta rodada. |
| 14:29 | T00/T12 / M1 | RF10, RNF02 | aprovado no fluxo móvel relatado | NÃO BLOQUEIA | Claudio acessou produção pelo portal a 375 px e relatou ausência de scroll horizontal em 360/375 px. ENV-02 contornado para o aceite por execução do Claudio; não houve reteste do navegador de Andrey. Aba anônima não foi explicitamente relatada. |
| 14:29 | T13 | RF13 | presença aprovada; download pendente | NÃO BLOQUEIA | Claudio confirmou botão Exportar presente. Isso não confirma download nem conteúdo do arquivo; T13 e aceite completo T15 permanecem pendentes nesses pontos. RF13 é desejável e não bloqueia M1. |
| 14:29 | Passo 15 | RNF05 | aprovado no escopo da busca | NÃO BLOQUEIA | Andrey executou equivalente PowerShell de git log -p com busca case-insensitive por sk-, ampliada a --all. Cinco ocorrências: quatro menções ao comando de checagem em QA.md/DESAFIO-17.md/REQUISITOS.md e uma URL de queue-microtask em package-lock.json. Todas inspecionadas; nenhuma é chave. Busca complementar pelo prefixo seguido de ao menos 16 caracteres alfanuméricos/underscore/hífen sem ocorrências. O resultado literal não é vazio; são falsos positivos, não evidência de segredo. |
| 14:29 | M1 | RF01–RF10 | aprovado | NÃO BLOQUEIA | Aceite combinado: geração de duas versões a partir do briefing, resultados fictícios, comparação por objetivo, selos e limitações em produção pelo Claudio; contratos/escopo conferidos por leitura; métricas/parser por 18 testes de Andrey. BUG-01 corrigido, build aprovado pelo Claudio. Nenhum bloqueio M identificado neste escopo. Aprovação de M1 não equivale à conclusão integral dos 15 passos de T15. |

## Roteiro §7 — situação da rodada inicial (histórico)

Na rodada inicial, todos ficaram **pendentes por ENV-02**. A rodada das 14:29 acima atualiza os cenários efetivamente relatados pelo Claudio; preserva-se abaixo o histórico, sem atribuir execução de tela a Andrey.

| Passo | Tarefa / verificação | Resultado em produção | Evidência complementar local |
|---|---|---|---|
| 1 | T00/T11: aba anônima, hero, Começar duelo | Pendente | Hero e scrollIntoView presentes no código. |
| 2 | T04: briefing de exemplo/canal fixo | Pendente | Formulário e dados conferidos por leitura. |
| 3 | T05/T06: gerar/loading, A/B, editar título A | Pendente | Campos e loading presentes; fallback previsto sem chave. |
| 4 | T05: apagar versão e cadastrar à mão | Pendente | Campos editáveis; resultados liberados com título/texto/CTA preenchidos. |
| 5 | T07: exemplo, CSV abc e CSV válido | Pendente | Parser aprovado nos testes; erro tratado na UI. |
| 6 | T08: valores, fórmulas, z e selos | Pendente | Tabela §5 aprovada por teste; formatador lido. |
| 7 | T08: CTR→A, custo→B/empate | Pendente | Vencedores/selos aprovados por teste; seletor lido. |
| 8 | T09: quatro limitações em ordem | Pendente | Array exato aprovado por teste. |
| 9 | T10: veredito por objetivo/ressalva no custo | Pendente | Exemplo contém 'ainda não dá para concluir'. |
| 10 | T02/T08/T09: B=700 e A.contatos=0 | Pendente | Investimentos diferentes passou; teste adicional com investimentos iguais revelou BUG-01. |
| 11 | T13: baixar Markdown completo | Pendente | Gerador e campos conferidos por leitura. |
| 12 | T14: rodapé/fórmulas/z | Pendente | Conteúdo conferido por leitura. |

## Checagens fixas

- [x] T03: suíte criada e executada; reteste 18/18 verde por Andrey
- [x] npm test verde — BUG-01 encerrado após dec1e9a
- [x] npm run build sem erro — execução e resultado informados pelo Claudio; ENV-01 encerrado
- [x] Fluxo sem OPENAI_API_KEY confirmado em produção pelo Claudio, com Fonte: exemplo nas duas respostas
- [x] Fluxo M1 a 375 px pelo Claudio; sem scroll horizontal relatado em 360/375 px
- [x] Passo 15: busca no histórico executada por Andrey; cinco falsos positivos, nenhuma chave identificada
- [ ] Roteiro integral T15, incluindo aba anônima, edição/cadastro manual, importação de CSV válido pela UI, download real e rodapé; esses itens não foram explicitamente confirmados no relato desta rodada

## Encaminhamento

T02 e M1 aprovados, com Status atualizado no PLANO.md. BUG-01 encerrado pelo reteste; ENV-01 encerrado pelo build do Claudio; ENV-02 contornado para M1 pelo aceite de tela executado pelo Claudio. A aprovação usa as fontes de evidência explicitadas nesta rodada. O aceite completo T15 e o download real de T13 continuam pendentes; não foram inferidos a partir da presença do botão. Demais Status preservados. Somente Claudio executa builds a partir desta rodada. Fallback após edição usa texto estático de exemplo conforme contrato; não é análise dos novos dados.

Nenhum código de builder foi alterado. Sem push/deploy.
