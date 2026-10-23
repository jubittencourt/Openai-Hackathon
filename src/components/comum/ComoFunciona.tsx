const indicadores = [
  { nome: "CTR", formula: "cliques ÷ impressões", criterio: "Quanto maior, melhor." },
  { nome: "Taxa de conversão", formula: "contatos ÷ cliques", criterio: "Quanto maior, melhor." },
  { nome: "Custo por contato", formula: "investimento ÷ contatos", criterio: "Quanto menor, melhor." },
];

export function ComoFunciona() {
  return (
    <footer aria-labelledby="como-funciona-heading" className="space-y-5 border-t border-slate-800 py-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Transparência</p>
        <h2 id="como-funciona-heading" className="mt-1 text-xl font-bold text-white">Como funciona</h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {indicadores.map(({ nome, formula, criterio }) => (
          <article key={nome} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <h3 className="font-semibold text-slate-100">{nome}</h3>
            <p className="mt-2 font-mono text-sm text-cyan-200">{formula}</p>
            <p className="mt-1 text-xs text-slate-400">{criterio}</p>
          </article>
        ))}
      </div>
      <p className="max-w-3xl text-sm leading-relaxed text-slate-300">
        O selo de confiança usa o teste z de duas proporções: com |z| ≥ 1,96, a diferença é considerada confiável a 95%; abaixo disso, é empate técnico. Para custo por contato, a aproximação compara contatos por impressão e só vale quando os investimentos são iguais.
      </p>
      <p className="text-sm font-medium text-slate-200">A IA escreve as explicações; as contas são feitas em código.</p>
      <p className="text-xs text-slate-500">Se aparecer “Fonte: exemplo”, o conteúdo foi carregado para demonstrar o fluxo e não representa uma análise gerada para seus dados.</p>
    </footer>
  );
}
