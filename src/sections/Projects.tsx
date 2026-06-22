// src/sections/Projects.tsx
"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";

import CheckCircleIcon from "@/assets/icons/check-circle.svg";
import ArrowUpRight from "@/assets/icons/arrow-up-right.svg";

import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import api from "@/lib/api";
import type {
  Project,
  GalleryImage,
  ProjectFeature,
} from "@/types/portfolio";

// ── Types ────────────────────────────────────────────────────
// interface Feature {
//   id: number;
//   title: string;
// }


// ── Helpers ──────────────────────────────────────────────────
const normalizeProjects = (data: unknown): Project[] => {
  if (Array.isArray(data)) return data as Project[];
  const d = data as Record<string, unknown>;
  if (Array.isArray(d?.results)) return d.results as Project[];
  if (Array.isArray(d?.projects)) return d.projects as Project[];
  if (Array.isArray(d?.data)) return d.data as Project[];
  return [];
};

const getImageUrl = (project: Project): string => {
  if (project.image_url) return project.image_url;
  if (project.image) return project.image;
  return "/fallback-image.jpg";
};

const getGalleryImages = (project: Project): string[] => {
  const main = getImageUrl(project);

  // Cast to any to safely read gallery regardless of type narrowing
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rawGallery: GalleryImage[] = (project as any).gallery ?? [];

  if (process.env.NODE_ENV === "development") {
    console.log(`[getGalleryImages] "${project.title}" raw gallery (${rawGallery?.length ?? 0}):`, rawGallery);
  }

  if (!Array.isArray(rawGallery) || rawGallery.length === 0) return [main];

  const sorted = [...rawGallery].sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
  const galleryUrls = sorted
    .map((g) => g.image_url || g.image)
    .filter((u): u is string => Boolean(u));

  const seen = new Set<string>([main]);
  const extras = galleryUrls.filter((url) => {
    if (seen.has(url)) return false;
    seen.add(url);
    return true;
  });

  const result = [main, ...extras];
  if (process.env.NODE_ENV === "development") {
    console.log(`[getGalleryImages] "${project.title}" => ${result.length} total images`, result);
  }
  return result;
};

// ── Image Carousel ───────────────────────────────────────────
const ImageCarousel = ({
  images,
  title,
  priority,
}: {
  images: string[];
  title: string;
  priority?: boolean;
}) => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback(
    (next: number, dir: "left" | "right") => {
      if (isAnimating || images.length <= 1) return;
      setDirection(dir);
      setIsAnimating(true);
      setTimeout(() => {
        setCurrent(next);
        setIsAnimating(false);
      }, 350);
    },
    [isAnimating, images.length]
  );

  const prev = useCallback(() => {
    go((current - 1 + images.length) % images.length, "left");
  }, [current, go, images.length]);

  const next = useCallback(() => {
    go((current + 1) % images.length, "right");
  }, [current, go, images.length]);

  // Debug: log images array in development
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log(`[Carousel] "${title}" — ${images.length} image(s):`, images);
    }
  }, [images, title]);

  // Auto-advance
  useEffect(() => {
    if (images.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % images.length);
    }, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [images.length]);

  const resetInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % images.length);
    }, 4000);
  };

  const handlePrev = () => { prev(); resetInterval(); };
  const handleNext = () => { next(); resetInterval(); };

  return (
    <div className="relative w-full group/carousel overflow-hidden rounded-2xl border border-white/10 bg-black/20"
      style={{ aspectRatio: "16/10" }}>

      {/* Images */}
      {images.map((src, i) => (
        <div
          key={src + i}
          className="absolute inset-0 transition-all duration-500 ease-in-out"
          style={{
            opacity: i === current ? 1 : 0,
            transform: i === current
              ? "scale(1) translateX(0)"
              : `scale(1.03) translateX(${i < current ? "-3%" : "3%"})`,
            zIndex: i === current ? 1 : 0,
          }}
        >
          <Image
            src={src}
            alt={`${title} screenshot ${i + 1}`}
            fill
            priority={priority && i === 0}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 50vw"
            className="object-cover"
          />
        </div>
      ))}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 z-10 pointer-events-none" />

      {/* Nav buttons — only if multiple images */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 size-9 rounded-full bg-black/50 border border-white/15 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 hover:bg-black/70 hover:border-white/30 transition-all duration-200 backdrop-blur-sm"
            aria-label="Previous image"
          >
            <svg className="size-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 size-9 rounded-full bg-black/50 border border-white/15 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 hover:bg-black/70 hover:border-white/30 transition-all duration-200 backdrop-blur-sm"
            aria-label="Next image"
          >
            <svg className="size-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrent(i); resetInterval(); }}
                className={`transition-all duration-300 rounded-full ${i === current
                  ? "w-5 h-1.5 bg-emerald-400"
                  : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"
                  }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>

          {/* Image counter */}
          <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full bg-black/50 border border-white/10 backdrop-blur-sm">
            <span className="text-[10px] text-white/70 font-medium tabular-nums">
              {current + 1} / {images.length}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

// ── Skeleton ─────────────────────────────────────────────────
const ProjectSkeleton = () => (
  <div className="rounded-3xl border border-white/10 bg-white/5 p-6 animate-pulse">
    <div className="rounded-2xl bg-white/10 mb-6" style={{ aspectRatio: "16/10" }} />
    <div className="space-y-3">
      <div className="h-3 w-28 bg-white/10 rounded" />
      <div className="h-7 w-2/3 bg-white/10 rounded" />
      <div className="h-3 w-full bg-white/10 rounded" />
      <div className="h-3 w-4/5 bg-white/10 rounded" />
      <div className="flex gap-3 mt-5">
        <div className="h-11 w-28 bg-white/10 rounded-xl" />
        <div className="h-11 w-24 bg-white/10 rounded-xl" />
      </div>
    </div>
  </div>
);


// ── Project Card ─────────────────────────────────────────────
const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const images = getGalleryImages(project);
  const isEven = index % 2 === 0;


  return (
    <Card className="relative overflow-hidden group transition-all duration-500 hover:border-emerald-400/25 shadow-2xl">

      {/* Gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

      {/* Ambient hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Card content */}
      <div className="relative p-5 sm:p-7 lg:p-0 flex flex-col lg:grid lg:grid-cols-2 lg:min-h-[480px]">

        {/* ── IMAGE SIDE ── */}
        <div className={`lg:self-stretch ${isEven ? "lg:order-2" : "lg:order-1"} mb-5 lg:mb-0 lg:p-6 flex items-center`}>
          <div className="w-full">
            <ImageCarousel images={images} title={project.title} priority={index === 0} />

            {/* Gallery count badge */}
            {images.length > 1 && (
              <p className="mt-2 text-[10px] text-white/30 flex items-center gap-1.5">
                <svg className="size-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M9 21V9" />
                </svg>
                {images.length} screenshots
              </p>
            )}
          </div>
        </div>

        {/* ── TEXT SIDE ── */}
        <div className={`${isEven ? "lg:order-1" : "lg:order-2"} flex flex-col justify-center lg:p-8 xl:p-12 pb-6 lg:pb-0`}>

          {/* Index badge */}
          <div className="mb-4 inline-flex items-center gap-2">
            <span className="text-[10px] font-bold text-white/20 tracking-[0.2em] uppercase">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="h-px flex-1 max-w-[24px] bg-white/10" />
          </div>

          {/* Company & Year pill */}
          <div className="inline-flex w-fit items-center gap-2 px-3 py-1 rounded-full border border-emerald-400/20 bg-emerald-400/5 mb-3">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            <span className="text-[11px] font-semibold text-emerald-300 tracking-widest uppercase">
              {project.company}
            </span>
            <span className="text-white/20 text-[10px]">•</span>
            <span className="text-[11px] text-white/40 font-medium">{project.year}</span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-2xl sm:text-3xl lg:text-3xl xl:text-4xl leading-tight mb-3">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-white/55 text-sm md:text-base leading-relaxed mb-5">
            {project.description}
          </p>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent mb-5" />

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <ul className="flex flex-col gap-2 mb-6">
              {project.features.map((feature) => (
                <li key={feature.id} className="flex items-start gap-2.5 text-white/65 text-sm">
                  <CheckCircleIcon className="size-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{feature.title}</span>
                </li>
              ))}
            </ul>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3">
            {project.live_url && (
              <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                <button className="h-10 px-5 rounded-xl bg-emerald-400 text-gray-950 font-semibold text-sm inline-flex items-center gap-2 hover:bg-emerald-300 transition-all duration-200 active:scale-[0.97] shadow-lg shadow-emerald-400/20">
                  Live Demo
                  <ArrowUpRight className="size-3.5" />
                </button>
              </a>
            )}
            {project.github_url && (
              <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                <button className="h-10 px-5 rounded-xl border border-white/15 text-sm text-white/80 inline-flex items-center gap-2 hover:bg-white/8 hover:border-white/30 hover:text-white transition-all duration-200 active:scale-[0.97]">
                  <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
                </button>
              </a>
            )}
          </div>

        </div>
      </div>
    </Card>
  );
};

// ── Mobile: horizontal swipe track ───────────────────────────
const MobileProjectsTrack = ({ projects }: { projects: Project[] }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    setActiveIndex(Math.round(el.scrollLeft / el.offsetWidth));
  };

  const scrollTo = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.offsetWidth, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory pb-4"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="flex-none w-[92vw] snap-center first:ml-[4vw] last:mr-[4vw] pr-3 last:pr-0"
          >
            <ProjectCard project={project} index={index} />
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-5">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`transition-all duration-300 rounded-full ${i === activeIndex
              ? "w-6 h-2 bg-emerald-400"
              : "w-2 h-2 bg-white/20 hover:bg-white/40"
              }`}
          />
        ))}
      </div>

      {projects.length > 1 && (
        <p className="text-center text-white/25 text-xs mt-3 flex items-center justify-center gap-1.5">
          <span>←</span>
          <span>Swipe to browse projects</span>
          <span>→</span>
        </p>
      )}
    </div>
  );
};

// ── Desktop: vertical sticky stack ───────────────────────────
const STICKY_OFFSET = 52;
const CARD_GAP = 52;

const DesktopProjectsStack = ({ projects }: { projects: Project[] }) => (
  <div className="relative">
    {projects.map((project, index) => (
      <div
        key={project.id}
        className="sticky"
        style={{
          top: `${72 + index * STICKY_OFFSET}px`,
          zIndex: index + 1,
          marginTop: index === 0 ? "0px" : `${CARD_GAP}px`,
        }}
      >
        <ProjectCard project={project} index={index} />
      </div>
    ))}
    <div style={{ height: `${projects.length * STICKY_OFFSET + 320}px` }} />
  </div>
);

// ── Main Section ──────────────────────────────────────────────
export const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/projects/")
      .then(({ data }) => {
        if (process.env.NODE_ENV === "development") {
          console.log("[Projects API raw]", JSON.stringify(data).slice(0, 800));
          console.log("RAW DATA", data);

          console.log("FIRST PROJECT", data[0]);

          console.log("FIRST PROJECT GALLERY", data[0]?.gallery);
        }
        const list = normalizeProjects(data)
          .filter((p) => p?.id)
          .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
        if (process.env.NODE_ENV === "development") {
          list.forEach((p, i) => {
            console.log("PROJECT", i, p);
            console.log("GALLERY", p.gallery);
          });
        }
        setProjects(list);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load projects.");
      })
      .finally(() => setLoading(false));
  }, []);

  // ── Loading ──────────────────────────────────────────────
  if (loading) {
    return (
      <section id="projects" className="pb-16 lg:py-24">
        <div className="container">
          <SectionHeader
            eyebrow="Real World Projects"
            title="Featured Projects"
            description="A collection of scalable, production-ready applications built using modern technologies."
          />
          <div className="mt-10 lg:hidden">
            <ProjectSkeleton />
          </div>
          <div className="hidden lg:flex flex-col gap-6 mt-12">
            {[...new Array(2)].map((_, i) => (
              <ProjectSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ── Error ────────────────────────────────────────────────
  if (error) {
    return (
      <section id="projects" className="pb-16 lg:py-24">
        <div className="container">
          <SectionHeader
            eyebrow="Real World Projects"
            title="Featured Projects"
            description="Projects couldn't be loaded."
          />
          <div className="mt-12 flex justify-center">
            <div className="flex flex-col items-center gap-3">
              <p className="text-red-400 text-sm">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="text-xs text-white/40 hover:text-white underline"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── Empty ────────────────────────────────────────────────
  if (projects.length === 0) {
    return (
      <section id="projects" className="pb-16 lg:py-24">
        <div className="container">
          <SectionHeader
            eyebrow="Real World Projects"
            title="Featured Projects"
            description="Projects will appear here soon."
          />
          <p className="mt-12 text-center text-white/40 text-sm">
            No projects found. Add some from the Django admin.
          </p>
        </div>
      </section>
    );
  }

  // ── Render ───────────────────────────────────────────────
  return (
    <section id="projects" className="pb-16 lg:py-24">
      <div className="container">
        <SectionHeader
          eyebrow="Real World Projects"
          title="Featured Projects"
          description="A collection of scalable, production-ready applications built using modern technologies."
        />

        <div className="mt-10 lg:mt-16">
          {/* Mobile — horizontal swipe */}
          <div className="lg:hidden -mx-4">
            <MobileProjectsTrack projects={projects} />
          </div>

          {/* Desktop — vertical sticky overlap */}
          <div className="hidden lg:block">
            <DesktopProjectsStack projects={projects} />
          </div>
        </div>
      </div>
    </section>
  );
};
