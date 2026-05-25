import { useState } from "react";
import { Trash2, Pencil, LogOut, MailCheck } from "lucide-react";
import PageShell from "../components/shared/PageShell";
import Seo from "../components/shared/Seo";
import ProjectForm from "../components/admin/ProjectForm";
import Button from "../components/shared/Button";
import AppLoader from "../components/shared/AppLoader";
import EmptyState from "../components/shared/EmptyState";
import { useProjects } from "../hooks/useProjects";
import { useMessages } from "../hooks/useMessages";
import { deleteProject, signOutAdmin, updateMessageStatus } from "../lib/firebase-operations";
import { formatDate, formatList } from "../lib/utils";

export default function AdminDashboardPage() {
  const { projects, loading: projectsLoading } = useProjects();
  const { messages, loading: messagesLoading } = useMessages();
  const [selectedProject, setSelectedProject] = useState(null);

  if (projectsLoading || messagesLoading) {
    return <AppLoader label="Loading dashboard..." />;
  }

  async function handleDelete(projectId) {
    const confirmed = window.confirm("Delete this project from Firebase?");
    if (!confirmed) {
      return;
    }

    await deleteProject(projectId);

    if (selectedProject?.id === projectId) {
      setSelectedProject(null);
    }
  }

  return (
    <PageShell>
      <Seo
        title="Admin Dashboard"
        description="Protected admin dashboard for managing realtime portfolio content and incoming messages."
        keywords={["firebase admin dashboard", "portfolio cms", "project crud"]}
      />
      <section className="section py-16">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Dashboard</p>
            <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight">Manage portfolio content in realtime</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--muted)] sm:text-base">
              Create, edit, and remove projects. Review incoming messages and mark them as handled without leaving the app.
            </p>
          </div>
          <Button variant="secondary" className="gap-2" onClick={signOutAdmin}>
            Logout <LogOut size={16} />
          </Button>
        </div>

        <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <ProjectForm
            activeProject={selectedProject}
            onSaved={(savedProjectId) => {
              if (savedProjectId === null) {
                setSelectedProject(null);
                return;
              }

              if (!savedProjectId) {
                return;
              }

              setSelectedProject((current) =>
                current ? { ...current, id: savedProjectId } : null,
              );
            }}
          />

          <div className="space-y-6">
            <div className="glass-panel rounded-[32px] p-6">
              <h2 className="font-display text-2xl font-semibold">Projects</h2>
              {projects.length ? (
                <div className="mt-5 space-y-4">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="rounded-[28px] border border-white/15 bg-white/5 p-4"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-display text-xl font-semibold">{project.title}</h3>
                            {project.featured ? (
                              <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                                Featured
                              </span>
                            ) : null}
                          </div>
                          <p className="mt-2 text-sm text-[var(--muted)]">{project.summary}</p>
                          <p className="mt-3 text-xs text-[var(--muted)]">{formatList(project.technologies).join(" • ")}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedProject(project)}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15"
                            aria-label={`Edit ${project.title}`}
                            title="Edit project"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(project.id)}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-rose-400/30 text-rose-400"
                            aria-label={`Delete ${project.title}`}
                            title="Delete project"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-5">
                  <EmptyState
                    title="No projects yet"
                    description="Create your first project in the form on the left and it will appear on the public site immediately."
                  />
                </div>
              )}
            </div>

            <div className="glass-panel rounded-[32px] p-6">
              <h2 className="font-display text-2xl font-semibold">Messages</h2>
              {messages.length ? (
                <div className="mt-5 space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className="rounded-[28px] border border-white/15 bg-white/5 p-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="font-semibold">{message.subject}</p>
                          <p className="mt-1 text-sm text-[var(--muted)]">
                            {message.name} • {message.email}
                          </p>
                          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{message.message}</p>
                          <p className="mt-3 text-xs text-[var(--muted)]">{formatDate(message.createdAt)}</p>
                        </div>
                        <Button
                          variant="secondary"
                          className="gap-2"
                          onClick={() => updateMessageStatus(message.id, message.status === "handled" ? "new" : "handled")}
                        >
                          <MailCheck size={16} />
                          {message.status === "handled" ? "Mark new" : "Mark handled"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-5">
                  <EmptyState
                    title="No messages yet"
                    description="Messages submitted through the contact form will appear here in realtime."
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
