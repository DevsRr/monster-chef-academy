import { useState } from "react";
import { LockKeyhole } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/shared/Button";
import InputField from "../components/shared/InputField";
import PageShell from "../components/shared/PageShell";
import Seo from "../components/shared/Seo";
import { signInAdmin } from "../lib/firebase-operations";
import { loginSchema } from "../lib/validation";
import { sanitizeText } from "../lib/sanitize";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("");

    const sanitizedForm = {
      email: sanitizeText(form.email),
      password: form.password,
    };

    const validation = loginSchema.safeParse(sanitizedForm);

    if (!validation.success) {
      setErrors(validation.error.flatten().fieldErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      await signInAdmin(validation.data.email, validation.data.password);
      navigate(location.state?.redirectTo || "/admin/dashboard");
    } catch (error) {
      setStatus(error.message || "Unable to sign in.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <PageShell>
      <Seo
        title="Admin Login"
        description="Secure admin sign in for the Firebase-backed portfolio dashboard."
        keywords={["firebase auth login", "portfolio admin dashboard"]}
      />
      <section className="section flex min-h-[70vh] items-center justify-center py-16">
        <div className="glass-panel w-full max-w-lg rounded-[36px] p-6 sm:p-8">
          <div className="flex items-center gap-4">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent">
              <LockKeyhole size={22} />
            </div>
            <div>
              <h1 className="font-display text-3xl font-semibold">Admin Login</h1>
              <p className="mt-1 text-sm text-[var(--muted)]">Only authenticated UIDs listed under `admins` can access the dashboard.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
            <InputField
              label="Email"
              type="email"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              error={errors.email?.[0]}
            />
            <InputField
              label="Password"
              type="password"
              value={form.password}
              onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
              error={errors.password?.[0]}
            />
            {status ? <p className="text-sm text-rose-400">{status}</p> : null}
            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </div>
      </section>
    </PageShell>
  );
}
