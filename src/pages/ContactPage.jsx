import ContactPanel from "../components/sections/ContactPanel";
import PageShell from "../components/shared/PageShell";
import Seo from "../components/shared/Seo";

export default function ContactPage() {
  return (
    <PageShell>
      <Seo
        title="Contact"
        description="Send a validated message directly into the Firebase-backed portfolio dashboard."
        keywords={["contact developer", "firebase contact form", "hire react developer"]}
      />
      <ContactPanel />
    </PageShell>
  );
}
