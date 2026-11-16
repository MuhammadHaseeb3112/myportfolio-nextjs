// src/sections/Experience.tsx
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";

type TimelineItem = {
  kind: "work" | "education";
  title: string;
  org: string;
  period: string;
  place: string;
  points: string[];
  tags?: string[];
};

const ITEMS: TimelineItem[] = [
  {
    kind: "work",
    title: "Full Stack Developer (Freelance)",
    org: "Self-employed",
    period: "Nov 2025 – Jun 2026",
    place: "Lahore · Remote",
    points: [
      "Built and shipped Django / DRF backends with React frontends for clients and my own products.",
      "Designed and now operate four live products on Oracle Cloud: MHTalk (real-time messenger), a multi-tenant SaaS billing platform on Stripe, MarketHub (multi-vendor marketplace) and Advanced Blog System (real-time multi-author blog).",
      "Set up GitHub Actions pipelines where every push is tested, deployed, health-checked and rolled back automatically on failure.",
    ],
    tags: ["Django", "DRF", "React", "PostgreSQL", "Redis", "Docker", "Stripe"],
  },
  {
    kind: "education",
    title: "B.Sc. Computer Science",
    org: "The Islamia University of Bahawalpur",
    period: "2022 – 2026",
    place: "Bahawalpur, Pakistan",
    points: ["CGPA 3.73 / 4.0"],
  },
];

const KindIcon = ({ kind }: { kind: TimelineItem["kind"] }) =>
  kind === "work" ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-5">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-5">
      <path d="M22 10 12 5 2 10l10 5 10-5z" />
      <path d="M6 12v5c3 2 9 2 12 0v-5" />
    </svg>
  );

export const ExperienceSection = () => (
  <div className="py-16 lg:py-24" id="experience">
    <div className="container">
      <SectionHeader
        eyebrow="Experience & Education"
        title="Where I've Worked and Studied"
        description="The road behind the projects above."
      />

      <div className="mt-12 lg:mt-20 max-w-3xl mx-auto relative">
        {/* vertical line */}
        <div className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-emerald-300/60 via-sky-400/40 to-transparent" />

        <div className="flex flex-col gap-8">
          {ITEMS.map((item) => (
            <div key={item.title} className="relative pl-16">
              <div className="absolute left-0 top-6 size-10 rounded-full bg-gray-900 border border-emerald-300/40 text-emerald-300 flex items-center justify-center">
                <KindIcon kind={item.kind} />
              </div>

              <Card className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl">{item.title}</h3>
                    <p className="text-emerald-300 text-sm md:text-base mt-1">{item.org}</p>
                  </div>
                  <div className="md:text-right text-sm text-white/50 shrink-0">
                    <p className="font-semibold text-white/70">{item.period}</p>
                    <p>{item.place}</p>
                  </div>
                </div>

                <ul className="mt-4 flex flex-col gap-2">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-2 text-sm md:text-base text-white/70">
                      <span className="text-emerald-300 mt-1">▸</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {item.tags && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full border border-emerald-300/20 bg-emerald-300/5 text-emerald-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
