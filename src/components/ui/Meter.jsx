export default function Meter({ label, value, tone = "from-accent to-gold" }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs font-bold text-[var(--muted)]">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-900/10 dark:bg-white/10">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${tone} transition-all duration-500`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
