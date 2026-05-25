import PageShell from "../components/shared/PageShell";
import Seo from "../components/shared/Seo";
import AboutSummary from "../components/sections/AboutSummary";
import AppLoader from "../components/shared/AppLoader";
import { useSiteContent } from "../hooks/useSiteContent";

export default function AboutPage() {
  const { content, loading } = useSiteContent();

  if (loading) {
    return <AppLoader label="Loading about section..." />;
  }

  return (
    <PageShell>
      <Seo
        title="About"
        description={content.about?.intro || content.seo?.description}
        keywords={content.seo?.keywords || []}
      />
      <AboutSummary about={content.about} />
    </PageShell>
  );
}
