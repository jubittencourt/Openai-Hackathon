// Arquivos em public/exemplos (baixáveis pelos avaliadores).
export const arquivosCsv: { arquivo: string; titulo: string; descricao: string }[] = [
  { arquivo: "cenario-1-cafe-mooca.csv", titulo: "Exemplo 1 — Café Mooca", descricao: "A vence em atenção, B em conversão; custo por contato em empate técnico." },
  { arquivo: "cenario-2-petvida.csv", titulo: "Exemplo 2 — PetVida", descricao: "Amostra grande, mesmo investimento: B vence com confiança nos 3 indicadores." },
  { arquivo: "cenario-3-fala-fluente.csv", titulo: "Exemplo 3 — Fala Fluente", descricao: "Investimentos diferentes e poucos contatos: nada é conclusivo." },
  { arquivo: "vitoria-clara-amostra-grande.csv", titulo: "Vitória clara", descricao: "50 mil impressões por versão: A vence tudo com folga." },
  { arquivo: "atencao-vs-conversao.csv", titulo: "Atenção × conversão", descricao: "A dobra o CTR, B converte 2,5× mais; custo por contato ainda empatado." },
  { arquivo: "empate-total.csv", titulo: "Empate total", descricao: "Diferenças pequenas em amostra pequena: empate técnico em tudo." },
  { arquivo: "investimentos-diferentes.csv", titulo: "Investimentos diferentes", descricao: "B gastou 50% a mais: custo por contato vira “Não testável”." },
  { arquivo: "zero-contatos.csv", titulo: "Zero contatos", descricao: "A não gerou nenhum contato: o placar mostra “—” em vez de erro." },
  { arquivo: "centavos-e-volume-alto.csv", titulo: "Centavos e volume alto", descricao: "Investimento com centavos e 120 mil impressões." },
  { arquivo: "formato-invalido.csv", titulo: "Formato inválido", descricao: "Para testar a mensagem de erro do CSV." },
];
