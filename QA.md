# QA — Duelo de Campanhas

> Dono: **Andrey**. Rodada de 23/10/2026, 14:14–14:20 (America/Sao_Paulo).
> Gravidade: **BLOQUEIA** = mínimo aceitável/demo ou aprovação impedidos; **NÃO BLOQUEIA** = verificação aprovada ou observação.

## Rodadas

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

## Roteiro §7 — produção, passos 1–12

Todos ficaram **pendentes por ENV-02**. Leitura de código e testes unitários não substituem aceite de tela. Não foi confirmado em produção o aviso Fonte: exemplo nas versões nem no veredito.

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

- [x] T03: suíte criada e executada (18 testes; 16 passaram, 2 falharam)
- [ ] npm test verde — BUG-01
- [ ] npm run build sem erro — ENV-01
- [ ] Fluxo sem OPENAI_API_KEY confirmado no navegador — ENV-02
- [ ] Roteiro de aceite em produção/aba anônima — ENV-02
- [ ] Roteiro a 375 px — ENV-02
- [ ] Histórico Git sem segredos — passo 15 não executado nesta rodada

## Encaminhamento

T02/M1 não aprovados. Builder deve corrigir BUG-01; repetir testes e obter build verde. Reexecutar passos 1–12 em navegador funcional e viewport de 375 px. T04–T10/T13/T14 continuam pronto até aceite de tela; revisão estática registrada acima. T01 e T03 aprovados no escopo documentado. Fallback após edição usa texto estático de exemplo conforme contrato; não é análise dos novos dados.

Nenhum código de builder foi alterado. Sem push/deploy.
