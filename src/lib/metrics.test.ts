import { describe, expect, it } from "vitest";
import { comparar, limitacoes, parseCsv } from "./metrics";
import type { Resultado } from "./types";

// Oráculo independente: REQUISITOS.md §5 (não derivado de metrics.ts).
const a: Resultado = { id: "A", impressoes: 10000, cliques: 300, contatos: 15, investimento: 600 };
const b: Resultado = { id: "B", impressoes: 10000, cliques: 200, contatos: 24, investimento: 600 };
const cabecalho = "versao,impressoes,cliques,contatos,investimento";
const csv = `${cabecalho}\nA,10000,300,15,600\nB,10000,200,24,600`;

describe("comparar — REQUISITOS §4–5", () => {
  it("retorna exatamente os três indicadores na ordem prevista", () => {
    expect(comparar(a, b).map((c) => c.indicador)).toEqual(["ctr", "conversao", "custoContato"]);
  });

  it.each([
    { indicador: "ctr", valorA: 0.03, valorB: 0.02, vencedor: "A", z: "4.53", selo: "Vitória confiável", formula: "cliques / impressoes" },
    { indicador: "conversao", valorA: 0.05, valorB: 0.12, vencedor: "B", z: "2.86", selo: "Vitória confiável", formula: "contatos / cliques" },
    { indicador: "custoContato", valorA: 40, valorB: 25, vencedor: "B", z: "1.44", selo: "Empate técnico", formula: "investimento / contatos" },
  ])("$indicador: valores, vencedor, z absoluto a duas casas, selo e fórmula", (esperado) => {
    const comp = comparar(a, b).find((c) => c.indicador === esperado.indicador)!;
    expect(comp.valorA).toBeCloseTo(esperado.valorA, 10);
    expect(comp.valorB).toBeCloseTo(esperado.valorB, 10);
    expect(comp.vencedor).toBe(esperado.vencedor);
    expect(comp.z).not.toBeNull();
    expect(comp.z!).toBeGreaterThanOrEqual(0);
    expect(comp.z!.toFixed(2)).toBe(esperado.z);
    expect(comp.z).not.toBe(Number(esperado.z));
    expect(comp.selo).toBe(esperado.selo);
    expect(comp.formula).toBe(esperado.formula);
  });

  it.each(["A", "B", "ambas"])("zero contatos em %s: números finitos, custo indisponível e Não testável", (lado) => {
    const entradaA = { ...a, contatos: lado === "B" ? a.contatos : 0 };
    const entradaB = { ...b, contatos: lado === "A" ? b.contatos : 0 };
    const comps = comparar(entradaA, entradaB);
    for (const comp of comps) {
      for (const valor of [comp.valorA, comp.valorB, comp.z]) {
        expect(valor === null || Number.isFinite(valor)).toBe(true);
      }
    }
    const custo = comps.find((c) => c.indicador === "custoContato")!;
    expect(custo.valorA).toBe(lado === "B" ? 40 : null);
    expect(custo.valorB).toBe(lado === "A" ? 25 : null);
    expect(custo.vencedor).toBeNull();
    expect.soft(custo.selo).toBe("Não testável");
    expect.soft(custo.z).toBeNull();
    expect.soft(limitacoes(entradaA, entradaB, comps)).toContain("Sem dados para calcular Custo por contato: divisão por zero.");
  });

  it("investimentos diferentes: mantém valores, mas não testa custo e avisa a limitação", () => {
    const diferente = { ...b, investimento: 700 };
    const comps = comparar(a, diferente);
    const custo = comps.find((c) => c.indicador === "custoContato")!;
    expect(custo.valorA).toBe(40);
    expect(custo.valorB).toBeCloseTo(700 / 24, 10);
    expect(custo.vencedor).toBe("B");
    expect(custo.z).toBeNull();
    expect(custo.selo).toBe("Não testável");
    expect(limitacoes(a, diferente, comps)).toContain("Investimentos diferentes: a comparação de custo por contato não é justa.");
  });
});

describe("limitacoes — REQUISITOS §5", () => {
  it("retorna as quatro frases exatas na ordem esperada", () => {
    expect(limitacoes(a, b, comparar(a, b))).toEqual([
      "Dados fictícios: servem para demonstrar o método, não para decidir uma campanha real.",
      "Empate técnico em Custo por contato: a diferença pode ser acaso.",
      "Poucos contatos (15): menos de 30 por versão deixa o custo por contato instável.",
      "Um único canal e um único período: o resultado pode não se repetir.",
    ]);
  });
});

describe("parseCsv — RF03", () => {
  it("lê o CSV do §5", () => {
    expect(parseCsv(csv)).toEqual([a, b]);
  });

  it.each([
    ["texto inválido", "abc"],
    ["cabeçalho incorreto", csv.replace("versao", "campanha")],
    ["versão duplicada", csv.replace("B,", "A,")],
    ["número negativo", csv.replace("300", "-300")],
    ["número inválido", csv.replace("300", "abc")],
    ["número infinito", csv.replace("300", "Infinity")],
    ["coluna ausente", csv.replace("A,10000,300,15,600", "A,10000,300,15")],
    ["aspas não fechadas", csv.replace("A,", '"A,')],
  ])("rejeita %s com erro legível", (_caso, entrada) => {
    expect(() => parseCsv(entrada)).toThrow(/CSV inválido:/);
  });
});
