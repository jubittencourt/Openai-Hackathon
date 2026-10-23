"use client";

import { useState } from "react";
import { cenarios } from "@/data/exemplo";
import type { Briefing } from "@/lib/types";

const vazio: Briefing = { produto: "", publico: "", objetivo: "", verba: 0, canal: "Instagram feed" };

const campo =
  "mt-1 w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2 text-white placeholder:text-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300";

export function BriefingForm({ value, onChange }: { value: Briefing | null; onChange: (b: Briefing) => void }) {
  const [rascunho, setRascunho] = useState<Briefing>(value ?? vazio);
  const [erro, setErro] = useState<string | null>(null);

  const set = <K extends keyof Briefing>(k: K, v: Briefing[K]) => setRascunho((b) => ({ ...b, [k]: v }));

  function confirmar(b: Briefing) {
    if (!b.produto.trim() || !b.publico.trim() || !b.objetivo.trim()) {
      setErro("Preencha produto, público e objetivo.");
      return;
    }
    if (!(b.verba > 0)) {
      setErro("Informe uma verba maior que zero.");
      return;
    }
    setErro(null);
    onChange(b);
  }

  function usarExemplo(b: Briefing) {
    setRascunho(b);
    confirmar(b);
  }

  return (
    <section id="etapa-briefing" aria-labelledby="briefing-heading" className="space-y-5 rounded-3xl border border-slate-700 bg-slate-900/80 p-5 sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Etapa 1</p>
          <h2 id="briefing-heading" className="mt-1 text-2xl font-bold text-white">Briefing</h2>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-3" role="group" aria-label="Briefings de exemplo">
        {cenarios.map((c) => {
          const ativo = value?.produto === c.briefing.produto;
          return (
            <button
              key={c.numero}
              type="button"
              onClick={() => usarExemplo(c.briefing)}
              aria-pressed={ativo}
              className={`rounded-2xl border p-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300 ${ativo ? "border-cyan-300 bg-cyan-950/60" : "border-slate-700 bg-slate-950/50 hover:border-cyan-300/60"}`}
            >
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-cyan-300">Exemplo {c.numero}</span>
              <span className="mt-1 block font-bold text-white">{c.nome}</span>
              <span className="mt-1 block text-xs leading-snug text-slate-400">{c.resumo}</span>
            </button>
          );
        })}
      </div>
      <form
        className="grid gap-4 sm:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          confirmar(rascunho);
        }}
      >
        <label className="text-sm text-slate-300 sm:col-span-2">
          Produto
          <input className={campo} value={rascunho.produto} onChange={(e) => set("produto", e.target.value)} placeholder="O que você vende" />
        </label>
        <label className="text-sm text-slate-300 sm:col-span-2">
          Público
          <input className={campo} value={rascunho.publico} onChange={(e) => set("publico", e.target.value)} placeholder="Para quem é a campanha" />
        </label>
        <label className="text-sm text-slate-300 sm:col-span-2">
          Objetivo de negócio
          <input className={campo} value={rascunho.objetivo} onChange={(e) => set("objetivo", e.target.value)} placeholder="Ex.: gerar contatos no WhatsApp" />
        </label>
        <label className="text-sm text-slate-300">
          Verba total (R$)
          <input className={campo} type="number" min={0} step="any" inputMode="decimal" value={rascunho.verba || ""} onChange={(e) => set("verba", Number(e.target.value))} />
        </label>
        <label className="text-sm text-slate-300">
          Canal
          <input className={`${campo} cursor-not-allowed opacity-70`} value="Instagram feed" readOnly aria-readonly="true" />
        </label>
        {erro && <p role="alert" className="text-sm text-red-300 sm:col-span-2">{erro}</p>}
        <div className="sm:col-span-2">
          <button type="submit" className="rounded-full bg-cyan-300 px-5 py-2 font-bold text-slate-950 hover:bg-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">
            {value ? "Atualizar briefing" : "Confirmar briefing"}
          </button>
          {value && <span className="ml-3 text-sm text-emerald-300">Briefing confirmado ✓</span>}
        </div>
      </form>
    </section>
  );
}
