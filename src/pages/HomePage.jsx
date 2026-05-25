import PageShell from "../components/shared/PageShell";
import Seo from "../components/shared/Seo";
import EmptyState from "../components/shared/EmptyState";
import AppLoader from "../components/shared/AppLoader";
import HeroSection from "../components/sections/HeroSection";
import AboutSummary from "../components/sections/AboutSummary";
import FeaturedProjects from "../components/sections/FeaturedProjects";
import ContactPanel from "../components/sections/ContactPanel";
import { useSiteContent } from "../hooks/useSiteContent";
import { useProjects } from "../hooks/useProjects";
import { useVisitorCounter } from "../hooks/useVisitorCounter";

export default function HomePage() {
  const { content, loading: contentLoading } = useSiteContent();
  const { projects, loading: projectsLoading } = useProjects();
  const visitorCount = useVisitorCounter();

  if (contentLoading && projectsLoading) {
    return <AppLoader label="Loading homepage..." />;
  }

  return (
    <PageShell>
      <Seo
        title={content.seo?.title}
        description={content.seo?.description}
        keywords={content.seo?.keywords || []}
        image={content.seo?.image}
      />
      <HeroSection hero={content.hero} visitorCount={visitorCount} />
      <AboutSummary about={content.about} />
      {projects.length ? (
        <FeaturedProjects projects={projects} />
      ) : (
        <section className="section py-20">
          <EmptyState
            title="Projects will appear here once your Firebase data is seeded."
            description="Import the sample database JSON included in the setup guide, or sign in to the admin dashboard and add projects manually."
          />
        </section>
      )}
      <ContactPanel />
    </PageShell>
  );
}
