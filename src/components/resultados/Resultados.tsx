"use client";

import { useState } from "react";
import type { Resultado } from "@/lib/types";
import { csvExemplo, resultadosExemplo } from "@/data/exemplo";
import { parseCsv } from "@/lib/metrics";

type Campo = keyof Omit<Resultado, "id">;

const colunas: { campo: Campo; rotulo: string }[] = [
  { campo: "impressoes", rotulo: "Impressões" },
  { campo: "cliques", rotulo: "Cliques" },
  { campo: "contatos", rotulo: "Contatos" },
  { campo: "investimento", rotulo: "Investimento (R$)" },
];

const vazios: [Resultado, Resultado] = [
  { id: "A", impressoes: 0, cliques: 0, contatos: 0, investimento: 0 },
  { id: "B", impressoes: 0, cliques: 0, contatos: 0, investimento: 0 },
];

export function Resultados({ value, onChange }: { value: [Resultado, Resultado] | null; onChange: (r: [Resultado, Resultado]) => void }) {
  const [linhas, setLinhas] = useState<[Resultado, Resultado]>(value ?? vazios);
  const [csv, setCsv] = useState("");
  const [erro, setErro] = useState<string | null>(null);

  function aplicar(r: [Resultado, Resultado]) {
    setLinhas(r);
    setErro(null);
    onChange(r);
  }

  function editar(i: 0 | 1, campo: Campo, texto: string) {
    const n = Number(texto);
    const novo: [Resultado, Resultado] = [{ ...linhas[0] }, { ...linhas[1] }];
    novo[i] = { ...novo[i], [campo]: Number.isFinite(n) && n >= 0 ? n : 0 };
    aplicar(novo);
  }

  function importarCsv() {
    try {
      aplicar(parseCsv(csv));
    } catch (e) {
      setErro(e instanceof Error ? e.message : "CSV inválido.");
    }
  }

  return (
    <section id="etapa-resultados" aria-labelledby="resultados-heading" className="space-y-5 rounded-3xl border border-slate-700 bg-slate-900/80 p-5 sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Etapa 3</p>
          <h2 id="resultados-heading" className="mt-1 text-2xl font-bold text-white">Resultados fictícios</h2>
        </div>
        <button
          type="button"
          onClick={() => {
            setCsv(csvExemplo);
            aplicar(resultadosExemplo);
          }}
          className="rounded-full border border-cyan-300/60 px-4 py-2 text-sm font-semibold text-cyan-200 hover:bg-cyan-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300"
        >
          Carregar exemplo
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px] text-sm">
          <thead>
            <tr className="text-left text-slate-400">
              <th className="py-2 pr-2">Versão</th>
              {colunas.map((c) => <th key={c.campo} className="py-2 pr-2 font-medium">{c.rotulo}</th>)}
            </tr>
          </thead>
          <tbody>
            {linhas.map((l, i) => (
              <tr key={l.id}>
                <th scope="row" className={`py-1 pr-2 text-lg font-black ${l.id === "A" ? "text-cyan-300" : "text-orange-300"}`}>{l.id}</th>
                {colunas.map((c) => (
                  <td key={c.campo} className="py-1 pr-2">
                    <input
                      type="number"
                      min={0}
                      step="any"
                      inputMode="decimal"
                      aria-label={`${c.rotulo} da versão ${l.id}`}
                      value={l[c.campo]}
                      onChange={(e) => editar(i as 0 | 1, c.campo, e.target.value)}
                      className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-2 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-2">
        <label className="block text-sm text-slate-300">
          Ou cole um CSV
          <textarea
            rows={4}
            value={csv}
            onChange={(e) => setCsv(e.target.value)}
            placeholder={csvExemplo}
            className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2 font-mono text-xs text-white placeholder:text-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300"
          />
        </label>
        <button type="button" onClick={importarCsv} className="rounded-full bg-slate-200 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">
          Importar CSV
        </button>
        {erro && <p role="alert" className="text-sm text-red-300">{erro}</p>}
      </div>
    </section>
  );
}
