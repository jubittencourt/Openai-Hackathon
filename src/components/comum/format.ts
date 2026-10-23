import type { IndicadorId } from "@/lib/types";

const ptBR = "pt-BR";

export function formatPercentual(valor: number | null): string {
  return valor === null || !Number.isFinite(valor)
    ? "—"
    : new Intl.NumberFormat(ptBR, { style: "percent", minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(valor);
}

export function formatMoeda(valor: number | null): string {
  return valor === null || !Number.isFinite(valor)
    ? "—"
    : new Intl.NumberFormat(ptBR, { style: "currency", currency: "BRL", minimumFractionDigits: 2 }).format(valor);
}

export function formatZ(valor: number | null): string {
  return valor === null || !Number.isFinite(valor)
    ? "—"
    : new Intl.NumberFormat(ptBR, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(valor);
}

export function formatIndicador(valor: number | null, indicador: IndicadorId): string {
  return indicador === "ctr" || indicador === "conversao" ? formatPercentual(valor) : formatMoeda(valor);
}
