import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Button from "./Button";
import { formatList } from "../../lib/utils";

export default function ProjectCard({ project }) {
  const technologies = formatList(project.technologies);

  return (
    <motion.article
      layout
      whileHover={{ y: -8 }}
      className="glass-panel overflow-hidden rounded-[32px]"
    >
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="space-y-5 p-6">
        <div>
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-display text-2xl font-semibold">{project.title}</h3>
            {project.featured ? (
              <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                Featured
              </span>
            ) : null}
          </div>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{project.summary}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-[var(--muted)]"
            >
              {technology}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button to={`/projects/${project.id}`} variant="secondary">
            Explore
          </Button>
          <Button href={project.liveUrl} variant="ghost" className="gap-2">
            Live <ArrowUpRight size={16} />
          </Button>
          <Button href={project.repoUrl} variant="ghost" className="gap-2">
            Code <Github size={16} />
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
