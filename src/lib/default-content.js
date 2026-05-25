export const defaultSiteContent = {
  hero: {
    greeting: "Portfolio ready for your story",
    headline: "Connect Firebase and publish a living developer portfolio.",
    description:
      "The interface is live and fully wired. Seed your own profile data in Firebase to turn this shell into a polished production portfolio.",
    roles: ["Frontend Engineer", "React Specialist", "Firebase Builder"],
    primaryCta: { label: "Browse Projects", href: "/projects" },
    secondaryCta: { label: "Contact Me", href: "/contact" },
    stats: [
      { label: "Projects tracked", value: "Realtime" },
      { label: "Admin workflow", value: "Protected" },
      { label: "Theme system", value: "Adaptive" },
    ],
  },
  about: {
    title: "About this portfolio",
    intro:
      "Your bio, strengths, and professional timeline come from Firebase Realtime Database so you can update the portfolio without touching code.",
    skills: ["React", "Firebase", "Tailwind CSS", "Framer Motion", "Vite", "UX Strategy"],
    timeline: [
      {
        title: "Seed your profile",
        company: "Firebase",
        period: "Step 1",
        description: "Import the sample JSON from the included setup guide to populate home, about, and projects content.",
      },
      {
        title: "Promote an admin",
        company: "Authentication",
        period: "Step 2",
        description: "Sign in once, add your UID to the admins node, and unlock the protected dashboard.",
      },
      {
        title: "Publish updates live",
        company: "Realtime Database",
        period: "Step 3",
        description: "Create and edit project entries in the dashboard and watch the portfolio update instantly.",
      },
    ],
  },
  seo: {
    title: "Developer Portfolio",
    description:
      "A production-ready React and Firebase developer portfolio with realtime content, admin dashboard, and polished motion design.",
    keywords: ["developer portfolio", "react portfolio", "firebase portfolio", "web developer"],
    image: "",
  },
  socialLinks: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "X", href: "https://x.com/" },
  ],
};
