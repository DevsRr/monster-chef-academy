const tones = {
  accent: "bg-accent/15 text-teal-700 dark:text-teal-200",
  coral: "bg-coral/15 text-rose-700 dark:text-rose-200",
  gold: "bg-gold/20 text-amber-700 dark:text-amber-100",
  muted: "bg-white/20 text-[var(--muted)]",
};

export default function StatusPill({ label, tone = "muted" }) {
  return (
    <span className={`rounded-full px-3 py-2 text-xs font-bold ${tones[tone]}`}>
      {label}
    </span>
  );
}
