import { cn } from "../../lib/utils";

export default function InputField({
  label,
  error,
  as = "input",
  className,
  ...props
}) {
  const Component = as;

  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-[var(--text)]">{label}</span>
      <Component
        className={cn(
          "w-full rounded-3xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20",
          as === "textarea" ? "min-h-[150px] resize-y" : "",
          className,
        )}
        {...props}
      />
      {error ? <span className="text-sm text-rose-400">{error}</span> : null}
    </label>
  );
}
