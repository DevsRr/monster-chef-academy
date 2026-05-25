import { ArrowUpRight, Github } from "lucide-react";
import { useParams } from "react-router-dom";
import AppLoader from "../components/shared/AppLoader";
import Button from "../components/shared/Button";
import EmptyState from "../components/shared/EmptyState";
import PageShell from "../components/shared/PageShell";
import Seo from "../components/shared/Seo";
import { useProject } from "../hooks/useProject";
import { formatDate, formatList } from "../lib/utils";

export default function ProjectDetailsPage() {
  const { projectId } = useParams();
  const { project, loading } = useProject(projectId);

  if (loading) {
    return <AppLoader label="Loading project details..." />;
  }

  if (!project) {
    return (
      <PageShell>
        <section className="section py-16">
          <EmptyState
            title="Project not found"
            description="This project key does not exist in Firebase yet, or it may have been removed."
          />
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <Seo
        title={project.title}
        description={project.summary}
        keywords={formatList(project.technologies)}
        image={project.image}
      />
      <section className="section py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr]">
          <div className="space-y-6">
            <span className="eyebrow">Project Detail</span>
            <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">{project.title}</h1>
            <p className="max-w-3xl text-base leading-8 text-[var(--muted)] sm:text-lg">{project.description}</p>
            <div className="flex flex-wrap gap-3">
              {formatList(project.technologies).map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium"
                >
                  {technology}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href={project.liveUrl} className="gap-2">
                Live Project <ArrowUpRight size={16} />
              </Button>
              <Button href={project.repoUrl} variant="secondary" className="gap-2">
                Repository <Github size={16} />
              </Button>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="glass-panel overflow-hidden rounded-[32px]">
              <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
            </div>
            <div className="glass-panel rounded-[32px] p-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-[var(--muted)]">Created</p>
                  <p className="mt-2 font-medium">{formatDate(project.createdAt)}</p>
                </div>
                <div>
                  <p className="text-sm text-[var(--muted)]">Last updated</p>
                  <p className="mt-2 font-medium">{formatDate(project.updatedAt)}</p>
                </div>
              </div>
              <p className="mt-6 rounded-3xl bg-white/10 px-4 py-3 text-sm leading-7 text-[var(--muted)]">
                This page subscribes to Firebase in realtime. Any admin edits will appear here immediately.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}
