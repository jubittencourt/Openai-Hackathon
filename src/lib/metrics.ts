import { NOMES_INDICADOR, type Comparacao, type IndicadorId, type Resultado } from "@/lib/types";

const LIMIAR_Z = 1.96;

function proporcaoZ(xA: number, nA: number, xB: number, nB: number): number | null {
  if (nA <= 0 || nB <= 0) return null;
  const p = (xA + xB) / (nA + nB);
  const variancia = p * (1 - p) * (1 / nA + 1 / nB);
  if (variancia <= 0) return null;
  const z = (xA / nA - xB / nB) / Math.sqrt(variancia);
  return Number.isFinite(z) ? Math.abs(z) : null;
}

function criarComparacao(
  indicador: IndicadorId,
  valorA: number | null,
  valorB: number | null,
  z: number | null,
  maiorMelhor: boolean,
  testavel = true,
): Comparacao {
  const vencedor = valorA === null || valorB === null || valorA === valorB
    ? null
    : (maiorMelhor ? valorA > valorB : valorA < valorB) ? "A" : "B";
  const selo: Comparacao["selo"] = !testavel || z === null
    ? "Não testável"
    : z >= LIMIAR_Z ? "Vitória confiável" : "Empate técnico";

  return {
    indicador,
    valorA,
    valorB,
    vencedor,
    z,
    selo,
    formula: indicador === "ctr"
      ? "cliques / impressoes"
      : indicador === "conversao"
        ? "contatos / cliques"
        : "investimento / contatos",
  };
}

/** Calcula os três indicadores e a confiança pelo teste z de duas proporções. */
export function comparar(a: Resultado, b: Resultado): Comparacao[] {
  const ctrA = a.impressoes > 0 ? a.cliques / a.impressoes : null;
  const ctrB = b.impressoes > 0 ? b.cliques / b.impressoes : null;
  const conversaoA = a.cliques > 0 ? a.contatos / a.cliques : null;
  const conversaoB = b.cliques > 0 ? b.contatos / b.cliques : null;
  const custoA = a.contatos > 0 ? a.investimento / a.contatos : null;
  const custoB = b.contatos > 0 ? b.investimento / b.contatos : null;
  const investimentosIguais = a.investimento === b.investimento;

  return [
    criarComparacao("ctr", ctrA, ctrB,
      proporcaoZ(a.cliques, a.impressoes, b.cliques, b.impressoes), true),
    criarComparacao("conversao", conversaoA, conversaoB,
      proporcaoZ(a.contatos, a.cliques, b.contatos, b.cliques), true),
    criarComparacao("custoContato", custoA, custoB,
      investimentosIguais ? proporcaoZ(a.contatos, a.impressoes, b.contatos, b.impressoes) : null,
      false, investimentosIguais),
  ];
}

/** Produz as limitações aplicáveis na ordem definida pelo desafio. */
export function limitacoes(a: Resultado, b: Resultado, comps: Comparacao[]): string[] {
  const itens = ["Dados fictícios: servem para demonstrar o método, não para decidir uma campanha real."];

  for (const comp of comps) {
    if (comp.selo === "Empate técnico") {
      itens.push(`Empate técnico em ${NOMES_INDICADOR[comp.indicador]}: a diferença pode ser acaso.`);
    }
    if (comp.selo === "Não testável" && (comp.valorA === null || comp.valorB === null || comp.z === null)) {
      itens.push(`Sem dados para calcular ${NOMES_INDICADOR[comp.indicador]}: divisão por zero.`);
    }
  }

  const menorNumeroContatos = Math.min(a.contatos, b.contatos);
  if (menorNumeroContatos < 30) {
    itens.push(`Poucos contatos (${menorNumeroContatos}): menos de 30 por versão deixa o custo por contato instável.`);
  }
  if (a.investimento !== b.investimento) {
    itens.push("Investimentos diferentes: a comparação de custo por contato não é justa.");
  }
  itens.push("Um único canal e um único período: o resultado pode não se repetir.");
  return itens;
}

const CABECALHO = ["versao", "impressoes", "cliques", "contatos", "investimento"] as const;

function lerLinhaCsv(linha: string): string[] {
  const campos: string[] = [];
  let campo = "";
  let entreAspas = false;
  for (let i = 0; i < linha.length; i += 1) {
    const char = linha[i];
    if (char === '"') {
      if (entreAspas && linha[i + 1] === '"') {
        campo += '"';
        i += 1;
      } else {
        entreAspas = !entreAspas;
      }
    } else if (char === "," && !entreAspas) {
      campos.push(campo.trim());
      campo = "";
    } else {
      campo += char;
    }
  }
  if (entreAspas) throw new Error("CSV inválido: aspas não fechadas.");
  campos.push(campo.trim());
  return campos;
}

/** Lê o CSV de duas linhas A/B; erros são lançados com mensagem para a interface. */
export function parseCsv(texto: string): [Resultado, Resultado] {
  const linhas = texto.trim().replace(/^\uFEFF/, "").split(/\r?\n/).map((linha) => linha.trim()).filter(Boolean);
  if (linhas.length !== 3) {
    throw new Error("CSV inválido: informe o cabeçalho e exatamente duas linhas, uma para A e outra para B.");
  }

  const cabecalho = lerLinhaCsv(linhas[0]).map((valor) => valor.toLowerCase());
  if (cabecalho.length !== CABECALHO.length || CABECALHO.some((coluna, i) => cabecalho[i] !== coluna)) {
    throw new Error("CSV inválido: use as colunas versao,impressoes,cliques,contatos,investimento nessa ordem.");
  }

  const resultados = linhas.slice(1).map((linha, indice) => {
    const campos = lerLinhaCsv(linha);
    if (campos.length !== CABECALHO.length) {
      throw new Error(`CSV inválido: a linha ${indice + 2} deve ter cinco colunas.`);
    }
    const id = campos[0].toUpperCase();
    if (id !== "A" && id !== "B") throw new Error(`CSV inválido: versão desconhecida na linha ${indice + 2}.`);
    const numeros = campos.slice(1).map((valor) => Number(valor));
    if (numeros.some((valor) => !Number.isFinite(valor) || valor < 0)) {
      throw new Error(`CSV inválido: use números não negativos na linha ${indice + 2}.`);
    }
    return {
      id,
      impressoes: numeros[0],
      cliques: numeros[1],
      contatos: numeros[2],
      investimento: numeros[3],
    } satisfies Resultado;
  });

  if (resultados[0].id === resultados[1].id) {
    throw new Error("CSV inválido: inclua uma linha A e uma linha B.");
  }
  const porId = new Map(resultados.map((resultado) => [resultado.id, resultado]));
  return [porId.get("A")!, porId.get("B")!];
}
