import { useMemo } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../shared/ProjectCard";
import SectionHeading from "../shared/SectionHeading";

export default function FeaturedProjects({ projects }) {
  const featuredProjects = useMemo(() => {
    const flagged = projects.filter((project) => project.featured);
    return (flagged.length ? flagged : projects).slice(0, 3);
  }, [projects]);

  return (
    <section className="section py-20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work from the realtime project feed"
          description="Project cards and detail pages subscribe directly to Firebase, so edits show up without a redeploy."
        />
        <Link to="/projects" className="text-sm font-semibold text-accent">
          View all projects
        </Link>
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
