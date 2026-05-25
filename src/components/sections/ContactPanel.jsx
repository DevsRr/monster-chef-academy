import { useState } from "react";
import { motion } from "framer-motion";
import Button from "../shared/Button";
import InputField from "../shared/InputField";
import SectionHeading from "../shared/SectionHeading";
import { contactSchema } from "../../lib/validation";
import { sanitizeMultilineText, sanitizeText } from "../../lib/sanitize";
import { saveMessage } from "../../lib/firebase-operations";

const initialFormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactPanel() {
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ type: "", message: "" });

    const sanitizedForm = {
      name: sanitizeText(form.name),
      email: sanitizeText(form.email),
      subject: sanitizeText(form.subject),
      message: sanitizeMultilineText(form.message),
    };

    const validation = contactSchema.safeParse(sanitizedForm);

    if (!validation.success) {
      setErrors(validation.error.flatten().fieldErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      await saveMessage(validation.data);
      setForm(initialFormState);
      setStatus({ type: "success", message: "Message sent successfully. It is now visible in the admin dashboard." });
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Something went wrong while sending the message." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="section py-20">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <SectionHeading
          eyebrow="Contact"
          title="Start a project, ask a question, or just say hello."
          description="Messages are validated, sanitized, and stored in Firebase Realtime Database with realtime visibility for admins."
        />
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          onSubmit={handleSubmit}
          className="glass-panel grid gap-5 rounded-[32px] p-6 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <InputField
              label="Name"
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              error={errors.name?.[0]}
              placeholder="Alex Johnson"
            />
            <InputField
              label="Email"
              type="email"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              error={errors.email?.[0]}
              placeholder="alex@example.com"
            />
          </div>
          <InputField
            label="Subject"
            value={form.subject}
            onChange={(event) => setForm((current) => ({ ...current, subject: event.target.value }))}
            error={errors.subject?.[0]}
            placeholder="Need a React + Firebase build"
          />
          <InputField
            label="Message"
            as="textarea"
            value={form.message}
            onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
            error={errors.message?.[0]}
            placeholder="Tell me about the product, timeline, and the kind of help you need."
          />

          {status.message ? (
            <p className={status.type === "success" ? "text-sm text-emerald-400" : "text-sm text-rose-400"}>
              {status.message}
            </p>
          ) : null}

          <Button type="submit" disabled={submitting} className="w-full sm:w-fit">
            {submitting ? "Sending..." : "Send Message"}
          </Button>
        </motion.form>
      </div>
    </section>
  );
}
