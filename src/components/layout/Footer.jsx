import { useSiteContent } from "../../hooks/useSiteContent";

export default function Footer() {
  const { content } = useSiteContent();

  return (
    <footer className="section pb-8 pt-4">
      <div className="glass-panel rounded-[32px] px-6 py-6 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-xl font-semibold">RR.dev</p>
            <p className="mt-2 max-w-xl text-sm text-[var(--muted)]">
              Dynamic portfolio content, realtime project updates, and a protected Firebase-powered admin workflow.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {content.socialLinks?.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 px-4 py-2 text-sm text-[var(--muted)] transition hover:text-[var(--text)]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
