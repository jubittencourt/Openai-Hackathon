# AGENTS — Duelo de Campanhas

Instruções para todo agente que trabalha neste repositório.

## Leia antes de começar (nesta ordem)

1. `DESAFIO-17.md` — desafio, produto, regras de negócio, contratos (fonte da verdade).
2. `REQUISITOS.md` — RFs com prioridade M/D/O e roteiro de aceite (§7).
3. `PLANO.md` — arquitetura, contratos de componentes, tarefas, prazos, ordem de corte.
4. `QA.md` / `STATUS.md` — estado atual.

## Papéis

| Agente | Papel | Pode alterar |
|---|---|---|
| Claudio-maestro | Líder: decide, planeja, setup, deploy, integra | `PLANO.md`, `AGENTS.md`, `REQUISITOS.md`, `src/lib/types.ts`, `src/data/**`, config/deploy |
| Julia | Builder: hero, etapas 1–3, `/api/versoes`, montagem da página | `src/components/{briefing,versoes,resultados}/**`, `src/app/api/versoes/**`, `src/app/page.tsx` |
| Brenno | Builder: `metrics.ts`, placar, veredito, limitações, exportar, visual global, `/api/veredito` | `src/lib/metrics.ts`, `src/components/{placar,veredito,comum}/**`, `src/app/api/veredito/**`, `src/app/globals.css` (Tailwind v4, tema via `@theme`) |
| Andrey | QA: testa, não implementa | `src/lib/metrics.test.ts`, `QA.md` |
| Felipe | Verificador/ponte: cruza QA × plano, status, README, vídeo | `STATUS.md`, `README.md`, `docs/**` |

## Regras

- Só altere os seus arquivos. Precisa mexer em outro? Peça ao Claudio-maestro.
- Escopo não é decidido por builder: dúvida vai ao Claudio-maestro (pelo Felipe, se ele estiver ocupado).
- Contas só em `src/lib/metrics.ts`. A UI chama `comparar`/`limitacoes`/`parseCsv`; a IA só escreve texto e nunca recalcula.
- `src/lib/types.ts` é congelado: mudanças só pelo Claudio.
- Nenhum D/O começa antes de todos os M aprovados no `QA.md`. Bug que bloqueia a demo passa à frente de tudo.
- Commits pequenos com prefixo: `claudio:`, `julia:`, `brenno:`, `andrey:`, `felipe:`.
- Ao terminar uma tarefa: commit + mudar a coluna Status no `PLANO.md` para `pronto` + avisar quem está conectado a você no canvas.
- Tarefa só é "feita" quando o Andrey marca `aprovado` no `QA.md`.
- `OPENAI_API_KEY` só em `.env.local` e no env da Vercel. Nunca no frontend, nunca no git.
- `npm run build` precisa passar antes de qualquer commit que vá para deploy.

## Comunicação (Maestri)

- `maestri list` para ver quem está conectado a você; `maestri ask "Nome" "..."` para pedir; `maestri check "Nome"` para ver o andamento sem interromper.
- Ao delegar algo longo, peça para a pessoa responder com `maestri ask "<seu nome>" "<resultado>"`.
- Ciclo: builders → Andrey (QA) → Felipe (status) → Claudio-maestro (decisão).
- A nota **"Checklist — Duelo de Campanhas"** no canvas espelha o `PLANO.md`; o Claudio-maestro a atualiza. Os arquivos `.md` são a fonte da verdade.

## Comandos

```bash
npm run dev     # http://localhost:3000
npm test        # vitest (metrics.test.ts)
npm run build   # obrigatório antes de deploy
```
