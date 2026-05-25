import PageShell from "../components/shared/PageShell";
import Seo from "../components/shared/Seo";
import AppLoader from "../components/shared/AppLoader";
import EmptyState from "../components/shared/EmptyState";
import ProjectCard from "../components/shared/ProjectCard";
import SectionHeading from "../components/shared/SectionHeading";
import { useProjects } from "../hooks/useProjects";

export default function ProjectsPage() {
  const { projects, loading } = useProjects();

  if (loading) {
    return <AppLoader label="Loading projects..." />;
  }

  return (
    <PageShell>
      <Seo
        title="Projects"
        description="Explore a realtime portfolio of React and Firebase work, updated directly from the admin dashboard."
        keywords={["react portfolio", "firebase projects", "frontend case studies"]}
      />
      <section className="section py-16">
        <SectionHeading
          eyebrow="Portfolio"
          title="Project archive"
          description="Every card below is rendered from Firebase Realtime Database and updates live."
        />

        {projects.length ? (
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="mt-10">
            <EmptyState
              title="No projects have been published yet."
              description="Add your first project in the admin dashboard or import the sample JSON to populate the portfolio."
            />
          </div>
        )}
      </section>
    </PageShell>
  );
}
