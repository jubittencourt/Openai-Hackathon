import { NOMES_OBJETIVO, type IndicadorId } from "@/lib/types";

const objetivos: IndicadorId[] = ["ctr", "conversao", "custoContato"];

export function SeletorObjetivo({ objetivo, onObjetivo }: { objetivo: IndicadorId; onObjetivo: (o: IndicadorId) => void }) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-medium text-slate-300">Qual é o objetivo deste duelo?</legend>
      <div className="flex flex-wrap gap-2">
        {objetivos.map((id) => (
          <button key={id} type="button" aria-pressed={objetivo === id} onClick={() => onObjetivo(id)}
            className={`rounded-full border px-4 py-2 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 ${objetivo === id ? "border-cyan-300 bg-cyan-300/15 text-cyan-100" : "border-slate-600 text-slate-300 hover:border-slate-400"}`}>
            {NOMES_OBJETIVO[id]}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
