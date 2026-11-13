"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";

import CheckCircleIcon from "@/assets/icons/check-circle.svg";
import ArrowUpRight from "@/assets/icons/arrow-up-right.svg";

import { SectionHeader } from "@/components/SectionHeader";
import api from "@/lib/api";
import type { Project, GalleryImage } from "@/types/portfolio";

// ── Helpers ───────────────────────────────────────────────────
const normalizeProjects = (data: unknown): Project[] => {
  if (Array.isArray(data)) return data as Project[];
  const d = data as Record<string, unknown>;
  if (Array.isArray(d?.results)) return d.results as Project[];
  if (Array.isArray(d?.projects)) return d.projects as Project[];
  if (Array.isArray(d?.data)) return d.data as Project[];
  return [];
};

const getImageUrl = (p: Project): string =>
  p.image_url || p.image || "/fallback-image.jpg";
const getGalleryImages = (project: Project): string[] => {
  const main = getImageUrl(project);

  const rawGallery: GalleryImage[] = (project as any).gallery ?? [];

  if (!Array.isArray(rawGallery) || rawGallery.length === 0) {
    return [main];
  }

  const sorted = [...rawGallery].sort(
    (a, b) => (a.display_order ?? 0) - (b.display_order ?? 0)
  );

  const seen = new Set<string>();
  seen.add(main);

  const extras = sorted
    .map((g) => g.image_url || g.image)
    .filter((u): u is string => Boolean(u))
    .filter((url) => {
      if (seen.has(url)) return false;
      seen.add(url);
      return true;
    });

  return [main, ...extras];
};

// ── Lightbox ──────────────────────────────────────────────────
const Lightbox = ({
  images,
  initialIndex,
  title,
  onClose,
}: {
  images: string[];
  initialIndex: number;
  title: string;
  onClose: () => void;
}) => {
  const [cur, setCur] = useState(initialIndex);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });

  const prev = () => { setCur((c) => (c - 1 + images.length) % images.length); setZoomed(false); };
  const next = () => { setCur((c) => (c + 1) % images.length); setZoomed(false); };

  const handleImgClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setOrigin({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
    setZoomed((z) => !z);
  };

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (!zoomed && e.key === "ArrowLeft") prev();
      if (!zoomed && e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", fn); document.body.style.overflow = ""; };
  }, [cur, zoomed]);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col bg-black/96 backdrop-blur-md">
      <div className="relative z-50 flex items-center justify-between px-5 py-3 border-b border-white/8 flex-shrink-0 bg-black/95">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-white/60 text-sm font-medium truncate">{title}</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/6 text-white/30 border border-white/10 flex-shrink-0">
            {zoomed ? "click to zoom out" : "click to zoom in"}
          </span>
        </div>
        <div className="flex items-center gap-4 flex-shrink-0">
          {images.length > 1 && (
            <span className="text-white/35 text-xs tabular-nums">{cur + 1} / {images.length}</span>
          )}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-5 z-[99999] size-10 rounded-full bg-black/70 border border-white/20 flex items-center justify-center hover:bg-black transition"
          >
            <svg className="size-4 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      <div className="relative z-10 flex-1 overflow-auto p-6">
        <div
          className="relative mx-auto overflow-visible rounded-xl border border-white/10 z-0"
          style={{
            width: zoomed ? "max-content" : "fit-content",
            maxWidth: zoomed ? "none" : "min(92vw, 1100px)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[cur]}
            alt={`${title} ${cur + 1}`}
            onClick={handleImgClick}
            draggable={false}
            className="block select-none transition-all duration-300 ease-out"
            style={{
              maxWidth: zoomed ? "none" : "100%",
              maxHeight: zoomed ? "none" : "78vh",
              width: zoomed ? "auto" : "100%",
              height: "auto",
              transform: zoomed ? "scale(2.2)" : "scale(1)",
              transformOrigin: `${origin.x}% ${origin.y}%`,
              cursor: zoomed ? "zoom-out" : "zoom-in",
            }}
          />

          {images.length > 1 && !zoomed && (
            <>
              <button
                type="button"
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 size-10 rounded-full bg-black/60 border border-white/15 flex items-center justify-center hover:bg-black/80 transition-all"
              >
                <svg
                  className="size-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                type="button"
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 size-10 rounded-full bg-black/60 border border-white/15 flex items-center justify-center hover:bg-black/80 transition-all"
              >
                <svg
                  className="size-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
      {images.length > 1 && (
        <div className="flex justify-center gap-2 pb-5 flex-shrink-0">
          {images.map((_, i) => (
            <button key={i} type="button"
              onClick={() => { setCur(i); setZoomed(false); }}
              className={`transition-all duration-300 rounded-full ${i === cur ? "w-6 h-2 bg-emerald-400" : "w-2 h-2 bg-white/25 hover:bg-white/50"}`} />
          ))}
        </div>
      )}
    </div>
  );
};

// ── Shared Image Carousel (aspect-ratio box, no fixed height) ─
const ImageCarousel = ({
  images,
  title,
  priority,
}: {
  images: string[];
  title: string;
  priority?: boolean;
}) => {
  const [cur, setCur] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (images.length <= 1) return;
    timerRef.current = setInterval(() => setCur((c) => (c + 1) % images.length), 4000);
  }, [images.length]);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  const go = (i: number) => { setCur(i); startTimer(); };

  return (
    <>
      {/*
        Key fix: aspect-ratio container. The image is always 16:10,
        so width determines height — never the other way around.
        No shadow. Clean border only.
      */}
      <div
        className="relative w-full overflow-hidden rounded-xl border border-white/10 cursor-zoom-in group/img"
        style={{ aspectRatio: "16 / 10" }}
        onClick={() => setLightboxOpen(true)}
      >
        {images.map((src, i) => (
          <div key={i} className="absolute inset-0 transition-opacity duration-500"
            style={{ opacity: i === cur ? 1 : 0, zIndex: i === cur ? 1 : 0 }}>
            <Image
              src={src}
              alt={`${title} ${i + 1}`}
              fill
              priority={priority && i === 0}
              sizes="(max-width: 1024px) 96vw, 54vw"
              className="object-cover"
            />
          </div>
        ))}

        {/* Expand badge */}
        <div className="absolute top-2 left-2 z-20 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/55 border border-white/10 backdrop-blur-sm opacity-0 group-hover/img:opacity-100 transition-opacity pointer-events-none">
          <svg className="size-3 text-white/65" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
          <span className="text-[9px] text-white/55">expand &amp; zoom</span>
        </div>

        {images.length > 1 && (
          <>
            <div className="absolute top-2 right-2 z-20 px-2 py-0.5 rounded-full bg-black/55 border border-white/10 backdrop-blur-sm">
              <span className="text-[10px] text-white/65 tabular-nums font-medium">{cur + 1}/{images.length}</span>
            </div>
            <button onClick={(e) => { e.stopPropagation(); go((cur - 1 + images.length) % images.length); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 size-7 rounded-full bg-black/55 border border-white/10 flex items-center justify-center opacity-0 group-hover/img:opacity-100 hover:bg-black/75 transition-all backdrop-blur-sm">
              <svg className="size-3 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button onClick={(e) => { e.stopPropagation(); go((cur + 1) % images.length); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 size-7 rounded-full bg-black/55 border border-white/10 flex items-center justify-center opacity-0 group-hover/img:opacity-100 hover:bg-black/75 transition-all backdrop-blur-sm">
              <svg className="size-3 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
              {images.map((_, i) => (
                <button key={i} onClick={(e) => { e.stopPropagation(); go(i); }}
                  className={`transition-all duration-300 rounded-full ${i === cur
                    ? "w-4 h-1.5 bg-emerald-400"
                    : "w-1.5 h-1.5 bg-white/40 hover:bg-white/65"}`} />
              ))}
            </div>
          </>
        )}
      </div>
      {lightboxOpen && (
        <Lightbox images={images} initialIndex={cur} title={title} onClose={() => setLightboxOpen(false)} />
      )}
    </>
  );
};

// ─────────────────────────────────────────────────────────────
// MOBILE PROJECT CARD
// Stack layout: image (aspect-ratio) → content below
// Card is max-w-full, padding gives breathing room
// ─────────────────────────────────────────────────────────────
const MobileProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const images = getGalleryImages(project);

  return (
    <div
      className="rounded-2xl border border-white/10 overflow-hidden w-full flex flex-col"
      style={{
        /* No shadow — border only */
        background: "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
      }}
    >
      {/* Emerald accent stripe */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-400/45 to-transparent flex-shrink-0" />

      {/* Image — full card width, aspect-ratio locks height proportionally */}
      <div className="w-full px-3 pt-3">
        <ImageCarousel images={images} title={project.title} priority={index === 0} />
      </div>

      {/* Content below image */}
      <div className="px-4 pb-5 pt-3 flex flex-col gap-3">

        {images.length > 1 && (
          <p className="text-[10px] text-white/30 flex items-center gap-1.5">
            <svg className="size-3 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
            </svg>
            {images.length} screenshots · tap to expand &amp; zoom
          </p>
        )}

        {/* Meta badge */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-bold text-white/20 tracking-[0.2em]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-emerald-400/22 bg-emerald-400/5">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            <span className="text-[10px] font-semibold text-emerald-300 tracking-widest uppercase">{project.company}</span>
            <span className="text-white/20 text-[10px]">·</span>
            <span className="text-[10px] text-white/45">{project.year}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-serif text-xl leading-snug text-white">{project.title}</h3>

        {/* Description — full text, no truncation */}
        <p className="text-white/55 text-sm leading-relaxed">{project.description}</p>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

        {/* Features — all visible */}
        {project.features && project.features.length > 0 && (
          <ul className="flex flex-col gap-2">
            {project.features.map((f) => (
              <li key={f.id} className="flex items-start gap-2 text-white/60 text-sm">
                <CheckCircleIcon className="size-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="leading-snug">{f.title}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Buttons */}
        <div className="flex flex-wrap gap-2.5 pt-1">
          {project.live_url && project.live_url !== project.github_url && (
            <a href={project.live_url} target="_blank" rel="noopener noreferrer">
              <button className="h-9 px-4 rounded-lg bg-emerald-400 text-gray-950 font-semibold text-sm inline-flex items-center gap-1.5 hover:bg-emerald-300 transition-all active:scale-95">
                Live Demo <ArrowUpRight className="size-3.5" />
              </button>
            </a>
          )}
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noopener noreferrer">
              <button className="h-9 px-4 rounded-lg border border-white/12 text-sm text-white/70 inline-flex items-center gap-1.5 hover:bg-white/6 hover:border-white/25 hover:text-white transition-all active:scale-95">
                <svg className="size-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// MOBILE SWIPE TRACK
// Cards are 92vw wide — nearly full screen, with a small peek
// on the right so user knows there's more to swipe
// ─────────────────────────────────────────────────────────────
const MobileTrack = ({ projects }: { projects: Project[] }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    // Each card is 92vw. Scroll position / card width = active index
    const cardW = el.offsetWidth * 0.92;
    setActive(Math.round(el.scrollLeft / cardW));
  };

  const scrollTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const cardW = el.offsetWidth * 0.92;
    el.scrollTo({ left: i * cardW, behavior: "smooth" });
  };

  return (
    <div className="w-full">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
          /* Small right peek so user sees next card */
          paddingRight: "4vw",
        }}
      >
        {projects.map((p, i) => (
          <div
            key={p.id}
            className="flex-none snap-start"
            style={{
              width: "88vw",
              paddingLeft: i === 0 ? "0.8vw" : "0.5vw",
              paddingRight: "5vw",
            }}
          >
            <MobileProjectCard project={p} index={i} />
          </div>
        ))}
        {/* Trailing space so last card can snap correctly */}
        <div style={{ width: "4vw", flexShrink: 0 }} />
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-5">
        {projects.map((_, i) => (
          <button key={i} onClick={() => scrollTo(i)}
            className={`transition-all duration-300 rounded-full ${i === active
              ? "w-6 h-2 bg-emerald-400"
              : "w-2 h-2 bg-white/20 hover:bg-white/40"}`} />
        ))}
      </div>
      {projects.length > 1 && (
        <p className="text-center text-white/20 text-xs mt-2">← swipe to browse →</p>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// DESKTOP PROJECT CARD
// Two-column: LEFT = image at fixed 16:10 aspect ratio
//             RIGHT = content, scrollable if very long
// Image column width is fixed at 52%. Content column fills rest.
// The card height = max(image height, content height) — both columns
// are display:flex so they always match.
// Zero box-shadow. Clean border only.
// ─────────────────────────────────────────────────────────────
const DesktopProjectCard = ({
  project,
  index,
  isActive,
}: {
  project: Project;
  index: number;
  isActive: boolean;
}) => {
  const images = getGalleryImages(project);
  const isEven = index % 2 === 0;

  return (
    <div
      className="relative rounded-2xl border overflow-hidden w-full"
      style={{
        /* No shadow at all — just border */
        background: "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)",
        borderColor: isActive ? "rgba(52,211,153,0.35)" : "rgba(255,255,255,0.08)",
        transform: isActive ? "scale(1)" : "scale(0.99)",
        opacity: isActive ? 1 : 0.6,
        transition: "transform 0.45s ease, opacity 0.45s ease, border-color 0.45s ease",
      }}
    >
      {/* Top accent line */}
      {isActive && (
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-400/55 to-transparent z-10 pointer-events-none" />
      )}

      {/*
        Flex row. Image column is a fixed percentage width.
        The image inside uses aspect-ratio so IT drives its own height.
        The content column flex-grows and centers vertically.
        The card's height = tallest of the two columns (flex default).
      */}
      <div className={`flex items-stretch ${isEven ? "flex-row" : "flex-row-reverse"}`}>

        {/* ── IMAGE COLUMN ── */}
        {/*
          w-[54%]: slightly wider than before for a cinematic feel.
          The inner wrapper uses aspect-ratio to maintain 16:10.
          The column itself uses flex + items-center so if content
          column is taller, the image is vertically centered with
          padding rather than stretching and distorting.
        */}
        <div className="w-[54%] flex-shrink-0 flex items-center justify-center relative bg-black/10"
          style={{ minHeight: "320px" }}>
          <div className="w-full p-5">
            <ImageCarousel images={images} title={project.title} priority={index === 0} />
            {images.length > 1 && (
              <p className="mt-2 text-[10px] text-white/25 flex items-center gap-1.5">
                <svg className="size-3 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
                </svg>
                {images.length} screenshots · click to expand &amp; zoom
              </p>
            )}
          </div>
          {/* Soft edge fade toward content */}
          <div
            className={`absolute inset-y-0 ${isEven ? "right-0" : "left-0"} w-12 pointer-events-none z-10`}
            style={{
              background: isEven
                ? "linear-gradient(to right, transparent, rgba(13,18,30,0.85))"
                : "linear-gradient(to left, transparent, rgba(13,18,30,0.85))",
            }}
          />
        </div>

        {/* ── CONTENT COLUMN ── */}
        <div className="flex-1 flex flex-col justify-center px-8 xl:px-10 py-9">

          {/* Index + badge */}
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <span className="text-[10px] font-bold text-white/20 tracking-[0.25em]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-emerald-400/20 bg-emerald-400/6">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] font-semibold text-emerald-300 tracking-widest uppercase">{project.company}</span>
              <span className="text-white/20 text-[9px]">·</span>
              <span className="text-[10px] text-white/40">{project.year}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-serif text-2xl xl:text-[1.75rem] leading-tight mb-4 text-white">
            {project.title}
          </h3>

          {/* Description — FULL text, zero truncation */}
          <p className="text-white/55 text-sm leading-relaxed mb-5">
            {project.description}
          </p>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent mb-5" />

          {/* Features — ALL shown */}
          {project.features && project.features.length > 0 && (
            <ul className="flex flex-col gap-2 mb-6">
              {project.features.map((f) => (
                <li key={f.id} className="flex items-start gap-2 text-white/60 text-sm">
                  <CheckCircleIcon className="size-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="leading-snug">{f.title}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Buttons */}
          <div className="flex flex-wrap gap-3">
            {project.live_url && project.live_url !== project.github_url && (
              <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                <button className="h-9 px-5 rounded-lg bg-emerald-400 text-gray-950 font-semibold text-sm inline-flex items-center gap-1.5 hover:bg-emerald-300 transition-all active:scale-95">
                  Live Demo <ArrowUpRight className="size-3.5" />
                </button>
              </a>
            )}
            {project.github_url && (
              <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                <button className="h-9 px-5 rounded-lg border border-white/12 text-sm text-white/65 inline-flex items-center gap-1.5 hover:bg-white/6 hover:border-white/25 hover:text-white transition-all active:scale-95">
                  <svg className="size-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
                </button>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// DESKTOP ANIMATED CAROUSEL
// ─────────────────────────────────────────────────────────────
const DesktopCarousel = ({ projects }: { projects: Project[] }) => {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [animating, setAnimating] = useState(false);
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === "INPUT") return;
      if (e.key === "ArrowRight" && active < projects.length - 1) go(active + 1);
      if (e.key === "ArrowLeft" && active > 0) go(active - 1);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [active, animating]);

  const go = useCallback((next: number) => {
    if (animating || next === active) return;
    setDir(next > active ? 1 : -1);
    setAnimating(true);
    setTimeout(() => {
      setDisplayed(next);
      setActive(next);
      setAnimating(false);
    }, 250);
  }, [active, animating]);

  return (
    <div className="relative">
      {/* Top control bar */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <span className="text-white/30 text-xs">{projects.length} projects</span>
          <div className="w-28 h-0.5 rounded-full bg-white/8 overflow-hidden">
            <div className="h-full bg-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${((active + 1) / projects.length) * 100}%` }} />
          </div>
          <span className="text-white/30 text-xs tabular-nums">{active + 1} / {projects.length}</span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => go(active - 1)} disabled={active === 0}
            className="size-9 rounded-full border border-white/12 flex items-center justify-center text-white/50 hover:text-white hover:border-emerald-400/40 hover:bg-emerald-400/5 transition-all disabled:opacity-20 disabled:cursor-not-allowed">
            <svg className="size-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button onClick={() => go(active + 1)} disabled={active === projects.length - 1}
            className="size-9 rounded-full border border-white/12 flex items-center justify-center text-white/50 hover:text-white hover:border-emerald-400/40 hover:bg-emerald-400/5 transition-all disabled:opacity-20 disabled:cursor-not-allowed">
            <svg className="size-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Card — height is auto, driven by content */}
      <div className="relative overflow-hidden rounded-2xl">
        <div
          style={{
            transitionProperty: "transform, opacity",
            transitionDuration: "250ms",
            transitionTimingFunction: "ease-in-out",
            transform: animating ? `translateX(${dir * -36}px)` : "translateX(0)",
            opacity: animating ? 0 : 1,
          }}
        >
          <DesktopProjectCard
            project={projects[displayed]}
            index={displayed}
            isActive={true}
          />
        </div>
      </div>

      {/* Dot nav */}
      <div className="flex justify-center gap-2 mt-5">
        {projects.map((_, i) => (
          <button key={i} onClick={() => go(i)}
            className={`transition-all duration-300 rounded-full ${i === active
              ? "w-6 h-2 bg-emerald-400"
              : "w-2 h-2 bg-white/18 hover:bg-white/35"}`} />
        ))}
      </div>

      {/* Keyboard hint */}
      <p className="text-center text-white/18 text-[11px] mt-3 flex items-center justify-center gap-2">
        <kbd className="px-1.5 py-0.5 rounded bg-white/6 border border-white/10 text-[10px]">←</kbd>
        use arrow keys or click to navigate
        <kbd className="px-1.5 py-0.5 rounded bg-white/6 border border-white/10 text-[10px]">→</kbd>
      </p>
    </div>
  );
};

// ── Skeleton ──────────────────────────────────────────────────
const Skeleton = () => (
  <div className="animate-pulse">
    <div className="hidden lg:flex rounded-2xl bg-white/4 border border-white/6 overflow-hidden">
      <div className="w-[54%] bg-white/4 p-5">
        <div className="rounded-xl bg-white/8 w-full" style={{ aspectRatio: "16/10" }} />
      </div>
      <div className="flex-1 p-9 space-y-4">
        <div className="h-3 w-24 bg-white/8 rounded" />
        <div className="h-7 w-3/4 bg-white/8 rounded" />
        <div className="h-3 w-full bg-white/8 rounded" />
        <div className="h-3 w-5/6 bg-white/8 rounded" />
        <div className="h-3 w-4/5 bg-white/8 rounded" />
        <div className="flex gap-3 pt-2">
          <div className="h-9 w-28 bg-white/8 rounded-lg" />
          <div className="h-9 w-24 bg-white/8 rounded-lg" />
        </div>
      </div>
    </div>
    <div className="lg:hidden rounded-2xl border border-white/6 bg-white/3 p-3 space-y-3">
      <div className="rounded-xl bg-white/8 w-full" style={{ aspectRatio: "16/10" }} />
      <div className="h-3 w-24 bg-white/8 rounded" />
      <div className="h-6 w-2/3 bg-white/8 rounded" />
      <div className="h-3 w-full bg-white/8 rounded" />
      <div className="flex gap-2">
        <div className="h-9 w-24 bg-white/8 rounded-lg" />
        <div className="h-9 w-20 bg-white/8 rounded-lg" />
      </div>
    </div>
  </div>
);

// ── Main Section ──────────────────────────────────────────────
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
      .catch((err) => { console.error(err); setError("Failed to load projects."); })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <section id="projects" className="pb-16 lg:py-24">
      <div className="container px-2 lg:px-8">
        <SectionHeader eyebrow="Real World Projects" title="Featured Projects"
          description="A collection of scalable, production-ready applications built using modern technologies." />
        <div className="mt-10 lg:mt-16"><Skeleton /></div>
      </div>
    </section>
  );

  if (error) return (
    <section id="projects" className="pb-16 lg:py-24">
      <div className="container px-2 lg:px-8">
        <SectionHeader eyebrow="Real World Projects" title="Featured Projects" description="Projects couldn't be loaded." />
        <div className="mt-12 flex flex-col items-center gap-3">
          <p className="text-red-400 text-sm">{error}</p>
          <button onClick={() => window.location.reload()} className="text-xs text-white/40 hover:text-white underline">Try again</button>
        </div>
      </div>
    </section>
  );

  if (projects.length === 0) return (
    <section id="projects" className="pb-16 lg:py-24">
      <div className="container px-2 lg:px-8">
        <SectionHeader eyebrow="Real World Projects" title="Featured Projects" description="Projects will appear here soon." />
        <p className="mt-12 text-center text-white/40 text-sm">No projects found.</p>
      </div>
    </section>
  );

  return (
    <section id="projects" className="pb-16 lg:py-24">
      <div className="container px-2 lg:px-8">
        <SectionHeader
          eyebrow="Real World Projects"
          title="Featured Projects"
          description="A collection of scalable, production-ready applications built using modern technologies."
        />
        <div className="mt-10 lg:mt-16">
          {/* Mobile: swipe track */}
          <div className="lg:hidden">
            <MobileTrack projects={projects} />
          </div>
          {/* Desktop: animated carousel */}
          <div className="hidden lg:block">
            <DesktopCarousel projects={projects} />
          </div>
        </div>
      </div>
    </section>
  );
};