# CSVs de exemplo — Duelo de Campanhas

Dados **fictícios** para testar o duelo. Baixe um arquivo e use **Etapa 3 → Enviar arquivo .csv** (ou copie e cole o conteúdo).

Formato: `versao,impressoes,cliques,contatos,investimento` (uma linha para A e outra para B; investimento em R$, ponto como separador decimal).

| Arquivo | Cenário | O que ele mostra |
|---|---|---|
| `cenario-1-cafe-mooca.csv` | Exemplo 1 — Café Mooca | A vence em atenção, B em conversão; custo por contato em empate técnico. |
| `cenario-2-petvida.csv` | Exemplo 2 — PetVida | Amostra grande, mesmo investimento: B vence com confiança nos 3 indicadores. |
| `cenario-3-fala-fluente.csv` | Exemplo 3 — Fala Fluente | Investimentos diferentes e poucos contatos: nada é conclusivo. |
| `vitoria-clara-amostra-grande.csv` | Vitória clara | 50 mil impressões por versão: A vence tudo com folga. |
| `atencao-vs-conversao.csv` | Atenção × conversão | A dobra o CTR, B converte 2,5× mais; custo por contato ainda empatado. |
| `empate-total.csv` | Empate total | Diferenças pequenas em amostra pequena: empate técnico em tudo. |
| `investimentos-diferentes.csv` | Investimentos diferentes | B gastou 50% a mais: custo por contato vira 'Não testável'. |
| `zero-contatos.csv` | Zero contatos | A não gerou nenhum contato: o placar mostra '—' em vez de erro. |
| `centavos-e-volume-alto.csv` | Centavos e volume alto | Investimento com centavos e 120 mil impressões. |
| `formato-invalido.csv` | Teste de validação | Separador e colunas errados: o site deve mostrar um erro legível. |
