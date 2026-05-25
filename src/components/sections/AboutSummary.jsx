import { motion } from "framer-motion";
import SectionHeading from "../shared/SectionHeading";

export default function AboutSummary({ about }) {
  return (
    <section className="section py-20">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading eyebrow="About Me" title={about.title} description={about.intro} />
        <div className="grid gap-6">
          <div className="glass-panel rounded-[32px] p-6 sm:p-8">
            <p className="text-sm uppercase tracking-[0.16em] text-[var(--muted)]">Core Stack</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {about.skills?.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {about.timeline?.map((item, index) => (
              <motion.div
                key={`${item.title}-${index}`}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                className="glass-panel rounded-[32px] p-6"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-display text-xl font-semibold">{item.title}</h3>
                    <p className="text-sm text-[var(--muted)]">{item.company}</p>
                  </div>
                  <span className="text-sm font-medium text-accent">{item.period}</span>
                </div>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
