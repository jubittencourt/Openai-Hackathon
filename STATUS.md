# STATUS — Duelo de Campanhas

> Dono: **Felipe**. Cruzamento de `QA.md` × `PLANO.md`. Atualizar a cada rodada de QA; decisão de escopo e cronograma cabe ao Claudio-maestro.

## Última atualização: 23/10/2026, 14h12 (Brasília)

Retrato dos arquivos nesta leitura. O cronograma replanejado do PLANO.md substitui o cronograma original do DESAFIO. “Pronto” no plano indica entrega declarada; aprovação depende de registro do Andrey no QA.md.

### Aprovado

**Nenhuma aprovação registrada.** A tabela de rodadas do QA.md contém somente a linha vazia, e todas as checagens fixas seguem desmarcadas. Não há bug registrado nessa rodada; a ausência de QA impede declarar o mínimo aprovado.

| Tarefas | Estado no PLANO.md | Situação no QA.md |
|---|---|---|
| T00–T02 | Prontas; setup, contratos e métricas | Sem aprovação registrada |
| T04–T07 | Prontas; Claudio assumiu as etapas 1–3 e a rota de versões | Sem aprovação registrada |
| T08–T10 | Prontas; placar, limitações e veredito | Sem aprovação registrada |
| T13–T14 | Prontas; exportação e Como funciona | Sem aprovação registrada; antecipação autorizada no log das 13h05 |
| T03 | A fazer; testes das métricas | Execução e resultados não registrados |
| M1 | A fazer | RF01–RF10 ainda sem aceite registrado |
| T11–T12 | A fazer na leitura das 14h12; Hero/mockup e visual global | Sem aprovação registrada |
| T15 | A fazer; aceite final em produção | Sem execução registrada |

### Bloqueia M1

- **T03 pendente:** faltam resultados formais das métricas contra REQUISITOS §5, incluindo zero contatos, investimentos diferentes e CSV inválido.
- **Aceite de RF01–RF10 pendente:** as entregas T00–T09 estão declaradas prontas, exceto T03, mas o fluxo integrado no link público ainda não tem aprovação no QA.md.
- **Checagens sem evidência no QA:** build, fallback sem chave e fluxo em produção anônima e a 375 px. Não foi feita nesta T16 uma nova validação funcional nem do link público.

### Atrasado em relação ao PLANO.md

| Item | Prazo | Situação às 14h12 | Atraso registrado |
|---|---|---|---|
| T03 | 13h20 | A fazer no plano, sem resultado no QA | 52 min |
| M1 | 14h10 | A fazer, sem aprovação do QA | 2 min |

Não há horário de conclusão suficiente nos documentos para medir eventuais atrasos das tarefas já marcadas prontas. T11–T14 têm prazo 14h40; congelamento às 14h45; T15/T16 às 15h10; vídeo às 15h40; entrega interna às 15h55, antes do limite de 16h00.

### Recomendação ao Claudio-maestro

1. Priorizar Andrey em T03 e na validação integrada de RF01–RF10 para liberar M1. Registrar aprovação ou bug com passos e gravidade no QA.md.
2. Corrigir qualquer bug que impeça o briefing, as duas versões, os resultados, o placar por objetivo, as limitações ou o fallback antes de novos extras. Manter T11/T12 condicionadas ao M1; T13/T14 já foram antecipadas com autorização do Claudio.
3. Se M1 continuar pendente após 14h25, aplicar a regra do plano para atraso superior a 15 min e a ordem de corte, preservando RF01–RF10.
4. Preservar o congelamento das 14h45 e o aceite final T15 até 15h10. Após aprovação, gravar pelo roteiro de até 3 min; conferir os links e enviar a entrega até 15h55.

## Checklist “cumpre o objetivo” (DESAFIO §9)

Itens aguardando evidência de aceite no QA.md:

- [ ] Recebe um briefing
- [ ] Cria (IA) ou cadastra (manual) duas versões
- [ ] Calcula 3 indicadores a partir de resultados fictícios
- [ ] Compara segundo um objetivo escolhido (custo por contato incluso)
- [ ] Explicita as limitações dos dados
- [ ] 1 canal, 2 versões, 3 indicadores, sem publicação de anúncios

## Checklist de entrega

- [ ] URL pública validada em aba anônima e no celular: https://duelo-de-campanhas.vercel.app
- [ ] Repositório público e README acessíveis no remoto: https://github.com/jubittencourt/Openai-Hackathon
- [x] README local com descrição, links, instalação, variáveis de ambiente, execução, testes e equipe
- [x] Roteiro local de até 3 min preparado; fala corrigida para “Poucos contatos (15)”
- [ ] Vídeo gravado com duração de até 3 min e link acessível
- [ ] Ausência de chave no repositório verificada no QA
- [ ] Formulário enviado até 15h55 (limite do evento: 16h00)
