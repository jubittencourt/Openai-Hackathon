import type { Comparacao } from "@/lib/types";

export function Selo({ selo }: { selo: Comparacao["selo"] }) {
  const classes: Record<Comparacao["selo"], string> = {
    "Vitória confiável": "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
    "Empate técnico": "border-amber-300/30 bg-amber-300/10 text-amber-100",
    "Não testável": "border-slate-500/50 bg-slate-700/40 text-slate-300",
  };
  return <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${classes[selo]}`}>{selo}</span>;
}
