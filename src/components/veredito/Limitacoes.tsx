export function Limitacoes({ itens }: { itens: string[] }) {
  return (
    <section aria-labelledby="limitacoes-heading" className="rounded-2xl border border-amber-300/30 bg-amber-950/30 p-5 sm:p-6">
      <h2 id="limitacoes-heading" className="text-lg font-bold text-amber-100">Limitações dos dados</h2>
      {itens.length ? (
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-amber-50/85">
          {itens.map((item) => <li key={item}>{item}</li>)}
        </ul>
      ) : <p className="mt-3 text-sm text-amber-50/85">Nenhuma limitação adicional identificada.</p>}
    </section>
  );
}
