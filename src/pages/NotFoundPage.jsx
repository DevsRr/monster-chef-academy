import Button from "../components/shared/Button";
import PageShell from "../components/shared/PageShell";
import Seo from "../components/shared/Seo";

export default function NotFoundPage() {
  return (
    <PageShell>
      <Seo
        title="404"
        description="The page you requested does not exist in this portfolio."
        keywords={["404", "not found"]}
      />
      <section className="section flex min-h-[70vh] items-center justify-center py-16">
        <div className="glass-panel max-w-2xl rounded-[36px] p-8 text-center sm:p-12">
          <p className="eyebrow">404</p>
          <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            This page drifted off the map.
          </h1>
          <p className="mt-4 text-base leading-8 text-[var(--muted)]">
            Head back to the homepage or browse the project archive.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button to="/">Go Home</Button>
            <Button to="/projects" variant="secondary">
              View Projects
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
