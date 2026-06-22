// src/sections/Projects.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

import CheckCircleIcon from "@/assets/icons/check-circle.svg";
import ArrowUpRight from "@/assets/icons/arrow-up-right.svg";

import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import api from "@/lib/api";

// ── Types ────────────────────────────────────────────────────
interface Feature {
  id: number;
  title: string;
}

interface Project {
  id: number;
  company: string;
  year: number;
  title: string;
  slug: string;
  description: string;
  image: string;
  image_url: string;
  github_url: string;
  live_url: string;
  featured: boolean;
  display_order: number;
  is_active: boolean;
  features: Feature[];
}

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

// ── Skeleton ─────────────────────────────────────────────────
const ProjectSkeleton = () => (
  <div className="rounded-3xl border border-white/10 bg-white/5 p-5 animate-pulse">
    <div className="aspect-video rounded-2xl bg-white/10 mb-5" />
    <div className="space-y-3">
      <div className="h-3 w-28 bg-white/10 rounded" />
      <div className="h-6 w-2/3 bg-white/10 rounded" />
      <div className="h-3 w-full bg-white/10 rounded" />
      <div className="h-3 w-4/5 bg-white/10 rounded" />
      <div className="flex gap-3 mt-4">
        <div className="h-11 w-28 bg-white/10 rounded-xl" />
        <div className="h-11 w-24 bg-white/10 rounded-xl" />
      </div>
    </div>
  </div>
);

// ── Single Project Card ───────────────────────────────────────
const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => (
  <Card className="relative overflow-hidden group transition-all duration-500 hover:border-emerald-400/30 shadow-2xl">

    {/* Top accent line on non-first cards */}
    {index > 0 && (
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400/0 via-emerald-400/50 to-sky-400/0" />
    )}

    {/* Hover glow */}
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-sky-500/5 opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none" />

    {/* Card number badge */}
    <div className="absolute top-4 right-4 size-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center z-10">
      <span className="text-[10px] text-white/40 font-semibold">
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>

    {/* Inner layout */}
    <div className="relative p-5 sm:p-8 lg:px-16 lg:pt-14 lg:pb-0 flex flex-col lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">

      {/* IMAGE — top on mobile / right on desktop */}
      <div className="order-1 lg:order-2 w-full mb-5 lg:mb-0">
        <div
          className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-white/5"
          style={{ aspectRatio: "16/9" }}
        >
          <Image
            src={getImageUrl(project)}
            alt={project.title}
            fill
            priority={index === 0}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 45vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
        </div>
      </div>

      {/* TEXT — below image on mobile / left on desktop */}
      <div className="order-2 lg:order-1 pb-6 lg:pb-14">

        {/* Company & Year */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-300 to-sky-400 bg-clip-text text-transparent uppercase tracking-widest text-xs font-bold">
          <span>{project.company}</span>
          <span>&bull;</span>
          <span>{project.year}</span>
        </div>

        {/* Title */}
        <h3 className="mt-2 font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight">
          {project.title}
        </h3>

        {/* Description — always full, no clamp */}
        <p className="mt-3 text-white/60 text-sm md:text-base leading-relaxed">
          {project.description}
        </p>

        <hr className="border-white/10 mt-5" />

        {/* Features */}
        {project.features && project.features.length > 0 && (
          <ul className="mt-4 flex flex-col gap-2.5">
            {project.features.map((feature) => (
              <li
                key={feature.id}
                className="flex items-start gap-2.5 text-white/70 text-sm"
              >
                <CheckCircleIcon className="size-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{feature.title}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 mt-6 mb-1">
          {project.live_url && (
            <a href={project.live_url} target="_blank" rel="noopener noreferrer">
              <button className="h-11 px-6 rounded-xl bg-white text-gray-900 font-semibold text-sm inline-flex items-center gap-2 hover:bg-emerald-300 transition-all duration-300 active:scale-95">
                Live Demo
                <ArrowUpRight className="size-3.5" />
              </button>
            </a>
          )}
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noopener noreferrer">
              <button className="h-11 px-6 rounded-xl border border-white/20 text-sm inline-flex items-center gap-2 hover:bg-white/10 hover:border-white/40 transition-all duration-300 active:scale-95">
                GitHub
                <ArrowUpRight className="size-3.5" />
              </button>
            </a>
          )}
        </div>

      </div>
    </div>
  </Card>
);

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
      {/* Track */}
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="flex-none w-[92vw] snap-center first:ml-[4vw] last:mr-[4vw]"
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
          <span>Swipe to see more projects</span>
          <span>→</span>
        </p>
      )}
    </div>
  );
};

// ── Desktop: vertical sticky stack ───────────────────────────
//
//  HOW IT WORKS:
//  • Each card has `position: sticky` with a top value that increases
//    by STICKY_OFFSET per card — so cards stack without hiding each other
//  • Cards are spaced CARD_GAP apart initially so each card is
//    FULLY visible before the next one starts overlapping it
//  • As user scrolls, the next card slides UP and covers the previous
//  • STICKY_OFFSET must equal CARD_GAP for perfect flush stacking
//
const STICKY_OFFSET = 48; // px — how much each card peeks above the next
const CARD_GAP = 48; // px — initial gap between cards (must match STICKY_OFFSET)

const DesktopProjectsStack = ({ projects }: { projects: Project[] }) => (
  <div className="relative">
    {projects.map((project, index) => (
      <div
        key={project.id}
        className="sticky"
        style={{
          // navbar (72px) + (index × offset) so cards stack neatly
          top: `${72 + index * STICKY_OFFSET}px`,
          zIndex: index + 1,
          // First card has no top margin
          // Subsequent cards are spaced CARD_GAP below the previous
          marginTop: index === 0 ? "0px" : `${CARD_GAP}px`,
        }}
      >
        <ProjectCard project={project} index={index} />
      </div>
    ))}

    {/*
      Bottom spacer — without this the last card gets hidden
      behind earlier sticky cards when you reach the end of scroll
    */}
    <div style={{ height: `${projects.length * STICKY_OFFSET + 300}px` }} />
  </div>
);

// ── Main Component ────────────────────────────────────────────
export const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/projects/")
      .then(({ data }) => {
        const list = normalizeProjects(data)
          .filter((p) => p?.id)
          .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
        setProjects(list);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load projects.");
      })
      .finally(() => setLoading(false));
  }, []);

  // ── Loading ───────────────────────────────────────────────
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
            {[...new Array(2)].map((_, i) => <ProjectSkeleton key={i} />)}
          </div>
        </div>
      </section>
    );
  }

  // ── Error ─────────────────────────────────────────────────
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

  // ── Empty ─────────────────────────────────────────────────
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

  // ── Render ────────────────────────────────────────────────
  return (
    <section id="projects" className="pb-16 lg:py-24">
      <div className="container">
        <SectionHeader
          eyebrow="Real World Projects"
          title="Featured Projects"
          description="A collection of scalable, production-ready applications built using modern technologies."
        />

        <div className="mt-10 lg:mt-16">
          {/* MOBILE — horizontal swipe left to right */}
          <div className="lg:hidden -mx-4">
            <MobileProjectsTrack projects={projects} />
          </div>

          {/* DESKTOP — vertical sticky overlap */}
          <div className="hidden lg:block">
            <DesktopProjectsStack projects={projects} />
          </div>
        </div>
      </div>
    </section>
  );
};
