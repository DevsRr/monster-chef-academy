import { useEffect, useState } from "react";
import Button from "../shared/Button";
import InputField from "../shared/InputField";
import { projectSchema } from "../../lib/validation";
import { sanitizeMultilineText, sanitizeText } from "../../lib/sanitize";
import { saveProject } from "../../lib/firebase-operations";

const initialProjectForm = {
  title: "",
  slug: "",
  summary: "",
  description: "",
  image: "",
  technologies: "",
  liveUrl: "",
  repoUrl: "",
  featured: false,
};

export default function ProjectForm({ activeProject, onSaved }) {
  const [form, setForm] = useState(initialProjectForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (activeProject) {
      setForm({
        title: activeProject.title || "",
        slug: activeProject.slug || "",
        summary: activeProject.summary || "",
        description: activeProject.description || "",
        image: activeProject.image || "",
        technologies: Array.isArray(activeProject.technologies)
          ? activeProject.technologies.join(", ")
          : activeProject.technologies || "",
        liveUrl: activeProject.liveUrl || "",
        repoUrl: activeProject.repoUrl || "",
        featured: Boolean(activeProject.featured),
      });
      setStatus("");
      setErrors({});
      return;
    }

    setForm(initialProjectForm);
  }, [activeProject]);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("");

    const sanitizedForm = {
      title: sanitizeText(form.title),
      slug: sanitizeText(form.slug),
      summary: sanitizeText(form.summary),
      description: sanitizeMultilineText(form.description),
      image: sanitizeText(form.image),
      technologies: sanitizeText(form.technologies),
      liveUrl: sanitizeText(form.liveUrl),
      repoUrl: sanitizeText(form.repoUrl),
      featured: form.featured,
    };

    const validation = projectSchema.safeParse(sanitizedForm);

    if (!validation.success) {
      setErrors(validation.error.flatten().fieldErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      const payload = {
        ...validation.data,
        technologies: validation.data.technologies.split(",").map((item) => item.trim()),
      };

      const savedProjectId = await saveProject(activeProject?.id, payload);
      setStatus(activeProject ? "Project updated." : "Project created.");
      if (!activeProject) {
        setForm(initialProjectForm);
      }
      onSaved?.(savedProjectId);
    } catch (error) {
      setStatus(error.message || "Unable to save the project.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="glass-panel grid gap-4 rounded-[32px] p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="font-display text-2xl font-semibold">
            {activeProject ? "Edit project" : "Create project"}
          </h3>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Add a new project or update an existing one. Changes appear instantly on the public portfolio.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <InputField
          label="Title"
          value={form.title}
          onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
          error={errors.title?.[0]}
        />
        <InputField
          label="Slug / key"
          value={form.slug}
          onChange={(event) => setForm((current) => ({ ...current, slug: event.target.value.toLowerCase() }))}
          error={errors.slug?.[0]}
        />
      </div>

      <InputField
        label="Summary"
        value={form.summary}
        onChange={(event) => setForm((current) => ({ ...current, summary: event.target.value }))}
        error={errors.summary?.[0]}
      />

      <InputField
        label="Description"
        as="textarea"
        value={form.description}
        onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
        error={errors.description?.[0]}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <InputField
          label="Image URL"
          value={form.image}
          onChange={(event) => setForm((current) => ({ ...current, image: event.target.value }))}
          error={errors.image?.[0]}
        />
        <InputField
          label="Technologies"
          value={form.technologies}
          onChange={(event) => setForm((current) => ({ ...current, technologies: event.target.value }))}
          error={errors.technologies?.[0]}
          placeholder="React, Firebase, Tailwind"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <InputField
          label="Live URL"
          value={form.liveUrl}
          onChange={(event) => setForm((current) => ({ ...current, liveUrl: event.target.value }))}
          error={errors.liveUrl?.[0]}
        />
        <InputField
          label="Repository URL"
          value={form.repoUrl}
          onChange={(event) => setForm((current) => ({ ...current, repoUrl: event.target.value }))}
          error={errors.repoUrl?.[0]}
        />
      </div>

      <label className="inline-flex items-center gap-3 text-sm font-medium">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(event) => setForm((current) => ({ ...current, featured: event.target.checked }))}
          className="h-4 w-4 rounded border-white/15 bg-white/10"
        />
        Feature this project on the home page
      </label>

      {status ? <p className="text-sm text-accent">{status}</p> : null}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : activeProject ? "Update Project" : "Create Project"}
        </Button>
        {activeProject ? (
          <Button type="button" variant="ghost" onClick={() => onSaved?.(null)}>
            Clear selection
          </Button>
        ) : null}
      </div>
    </form>
  );
}
