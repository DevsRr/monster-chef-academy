import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

const baseClassName =
  "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";

const variants = {
  primary: "bg-[var(--text)] text-[var(--bg)] hover:-translate-y-0.5",
  secondary: "glass-panel text-[var(--text)] hover:-translate-y-0.5",
  ghost: "text-[var(--text)] hover:bg-white/10",
};

export default function Button({
  children,
  className,
  variant = "primary",
  to,
  href,
  type = "button",
  ...props
}) {
  const classes = cn(baseClassName, variants[variant], className);

  if (to) {
    return (
      <Link className={classes} to={to} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a className={classes} href={href} target="_blank" rel="noreferrer" {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} type={type} {...props}>
      {children}
    </button>
  );
}
