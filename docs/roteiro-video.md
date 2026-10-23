# Roteiro do vídeo — Duelo de Campanhas

Base: DESAFIO-17.md, §8. Duração máxima: **3 minutos**. Usar apenas os botões de exemplo, sem digitar ao vivo.

| Tempo | Tela / ação | Fala |
|---|---|---|
| 0:00–0:20 | Hero | “Pequenos negócios testam duas versões de anúncio e escolhem a vencedora no olho. Às vezes a ‘vencedora’ só chamou atenção, e não trouxe cliente.” |
| 0:20–0:40 | Preencher o briefing com o botão de exemplo | “No Duelo de Campanhas você descreve a campanha…” |
| 0:40–1:05 | Gerar as duas versões | “…a IA cria duas versões com hipóteses diferentes, tudo editável.” |
| 1:05–1:20 | Carregar os resultados de exemplo | “Entram os resultados de cada versão.” |
| 1:20–1:50 | Placar; trocar Atenção (CTR) por Eficiência (custo por contato) | “Pelo CTR, A vence. Mas nosso objetivo é contato barato, e aí B vira o jogo.” |
| 1:50–2:20 | Destacar o selo Empate técnico e o card Limitações dos dados | “Só que o alerta mostra ‘Poucos contatos (15)’. A amostra é pequena e ainda não dá para cravar. A gente mostra o limite dos dados em vez de esconder.” |
| 2:20–2:40 | Veredito, próximo teste e Exportar | “O juiz sugere o próximo teste e você leva o relatório.” |
| 2:40–3:00 | Rodapé Como funciona | “As contas são feitas em código, a IA explica. Tudo sem publicar nada. Link e repositório na descrição.” |

## Preparação da gravação

- Gravar com OBS/Kooha a 125% de zoom, seguindo o fluxo de exemplo aprovado pelo QA.
- Conferir o placar: CTR A 3,0% × B 2,0%; conversão A 5,0% × B 12,0%; custo por contato A R$ 40,00 × B R$ 25,00.
- Mostrar **Empate técnico** no custo por contato, mesmo com B tendo o menor custo observado.
- O alerta usa o menor número de contatos entre as versões: A tem 15. A fala acompanha exatamente “Poucos contatos (15)”, conforme REQUISITOS §5.
- Se a geração usar fallback, manter o aviso de exemplo visível.
- Antes de gravar, confirmar com Claudio a disponibilidade das telas de Hero, Exportar e Como funciona; resolver pendências do QA que quebrem a sequência.

## Links para a descrição

- Aplicação: https://duelo-de-campanhas.vercel.app
- Repositório: https://github.com/jubittencourt/Openai-Hackathon
