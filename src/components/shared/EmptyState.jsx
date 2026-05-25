export default function EmptyState({ title, description }) {
  return (
    <div className="glass-panel rounded-[32px] p-8 text-center sm:p-10">
      <p className="eyebrow">Waiting For Data</p>
      <h2 className="mt-5 font-display text-2xl font-semibold">{title}</h2>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)] sm:text-base">
        {description}
      </p>
    </div>
  );
}
