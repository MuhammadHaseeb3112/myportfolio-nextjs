// src/sections/Hero.tsx
"use client";

import logoImage from "@/assets/images/logo.png";
import Image from "next/image";
import ArrowDown from "@/assets/icons/arrow-down.svg";
import grainImage from "@/assets/images/grain.jpg";
import Stars from "@/assets/icons/star.svg";
import { HeroOrbit } from "@/components/HeroOrbit";
import Sparkle from "@/assets/icons/sparkle.svg";
import { useProfile } from "@/hooks/useProfile";
import { useEffect, useState, useRef } from "react";

// ── Typing animation hook ─────────────────────────────────────
const SKILLS = [
  "Full Stack Developer",
  "Django Expert",
  "React Developer",
  "Problem Solver",
];

const useTypingAnimation = (words: string[], speed = 80, pause = 1800) => {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPausing, setIsPausing] = useState(false);

  useEffect(() => {
    if (isPausing) {
      const t = setTimeout(() => {
        setIsPausing(false);
        setIsDeleting(true);
      }, pause);
      return () => clearTimeout(t);
    }

    const current = words[wordIndex];

    if (!isDeleting) {
      if (charIndex < current.length) {
        const t = setTimeout(() => {
          setDisplayed(current.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        }, speed);
        return () => clearTimeout(t);
      } else {
        setIsPausing(true);
      }
    } else {
      if (charIndex > 0) {
        const t = setTimeout(() => {
          setDisplayed(current.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        }, speed / 2);
        return () => clearTimeout(t);
      } else {
        setIsDeleting(false);
        setWordIndex((w) => (w + 1) % words.length);
      }
    }
  }, [charIndex, isDeleting, isPausing, wordIndex, words, speed, pause]);

  return displayed;
};

// ── Fade-in on mount hook ─────────────────────────────────────
const useFadeIn = (delay = 0) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return visible;
};

// ── Counter animation hook ────────────────────────────────────
const useCounter = (target: number, duration = 1500, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
};

export const HeroSection = () => {
  const { profile } = useProfile();
  const typedSkill = useTypingAnimation(SKILLS);

  // Staggered fade-ins
  const showPhoto = useFadeIn(100);
  const showBadge = useFadeIn(300);
  const showTitle = useFadeIn(500);
  const showDesc = useFadeIn(700);
  const showButtons = useFadeIn(900);
  const showStats = useFadeIn(1100);

  // Stats counter
  const [statsStarted, setStatsStarted] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  // 2. Re-run the observer effect after profile loads
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;  // profile not loaded yet, skip

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [profile]); // ← add 'profile' as dependency!

  // Portfolio Statistics
  const TOTAL_PROJECTS = 15;
  const HAPPY_CLIENTS = 10;
  const YEARS_EXPERIENCE = 1;

  // 1. Fix the hardcoded 'true'
  const projectsCount = useCounter(TOTAL_PROJECTS, 1500, statsStarted);
  const clientsCount = useCounter(HAPPY_CLIENTS, 1500, statsStarted);
  const experienceCount = useCounter(YEARS_EXPERIENCE, 1200, statsStarted);

  const heroTitle = profile?.hero_title;
  const heroDesc = profile?.hero_description;
  const available = profile?.available_for_work;
  const photoUrl = profile?.profile_image_url;
  const resume = profile?.resume;


  if (!profile) {
    return (
      <section className="py-40 flex justify-center items-center">
        <div className="h-10 w-10 rounded-full border-4 border-emerald-400 border-t-transparent animate-spin" />
      </section>
    );
  }

  return (
    <div className="py-20 md:py-34 lg:py-60 relative z-0 overflow-x-clip">

      {/* ── Background rings & orbits ── */}
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_70%,transparent)]">
        <div
          className="absolute inset-0 -z-30 opacity-5"
          style={{ backgroundImage: `url(${grainImage.src})` }}
        />

        {/* Rings */}
        <div className="size-[620px]  hero-ring" />
        <div className="size-[820px]  hero-ring" />
        <div className="size-[1020px] hero-ring" />
        <div className="size-[1220px] hero-ring" />

        {/* Orbiting elements — varied speeds for depth */}
        <HeroOrbit size={440} rotation={79} shouldOrbit={true} orbitDuration="30s" shouldSpin={true} spinDuration="3s">
          <Sparkle className="size-5 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit size={430} rotation={-14} shouldOrbit={true} orbitDuration="32s" shouldSpin={true} spinDuration="3s">
          <Sparkle className="size-8 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit size={530} rotation={-42} shouldOrbit={true} orbitDuration="34s">
          <div className="size-2 rounded-full bg-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit size={530} rotation={178} shouldOrbit={true} orbitDuration="36s" shouldSpin={true} spinDuration="3s">
          <Sparkle className="size-10 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit size={550} rotation={20} shouldOrbit={true} orbitDuration="38s" shouldSpin={true} spinDuration="6s">
          <Stars className="size-12 text-emerald-300" />
        </HeroOrbit>
        <HeroOrbit size={590} rotation={98} shouldOrbit={true} orbitDuration="40s" shouldSpin={true} spinDuration="6s">
          <Stars className="size-8 text-emerald-300" />
        </HeroOrbit>
        <HeroOrbit size={650} rotation={-5} shouldOrbit={true} orbitDuration="42s">
          <div className="size-2 rounded-full bg-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit size={660} rotation={-72} shouldOrbit={true} orbitDuration="44s">
          <div className="size-2 rounded-full bg-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit size={710} rotation={144} shouldOrbit={true} orbitDuration="46s" shouldSpin={true} spinDuration="3s">
          <Sparkle className="size-14 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit size={740} rotation={85} shouldOrbit={true} orbitDuration="48s">
          <div className="size-3 rounded-full bg-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit size={800} rotation={-72} shouldOrbit={true} orbitDuration="50s" shouldSpin={true} spinDuration="6s">
          <Stars className="size-28 text-emerald-300" />
        </HeroOrbit>

        {/* Extra small sparkles for depth */}
        <HeroOrbit size={480} rotation={55} shouldOrbit={true} orbitDuration="25s">
          <div className="size-1.5 rounded-full bg-sky-400/30" />
        </HeroOrbit>
        <HeroOrbit size={580} rotation={-110} shouldOrbit={true} orbitDuration="28s">
          <div className="size-1.5 rounded-full bg-sky-400/30" />
        </HeroOrbit>
        <HeroOrbit size={700} rotation={200} shouldOrbit={true} orbitDuration="55s" shouldSpin={true} spinDuration="8s">
          <Sparkle className="size-6 text-sky-400/20" />
        </HeroOrbit>
      </div>

      {/* ── Main content ── */}
      <div className="container relative">
        <div className="flex flex-col items-center">

          {/* Profile photo */}
          <div
            className="transition-all duration-700 ease-out"
            style={{
              opacity: showPhoto ? 1 : 0,
              transform: showPhoto ? "translateY(0) scale(1)" : "translateY(-20px) scale(0.9)",
            }}
          >
            {photoUrl ? (
              <div className="relative">
                {/* Glowing ring behind photo */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 blur-md opacity-40 scale-110" />
                <Image
                  src={photoUrl}
                  width={150}
                  height={150}
                  className="size-[150px] rounded-full object-cover relative z-10 border-2 border-emerald-300/30"
                  alt="Profile"
                />
              </div>
            ) : (
              <div className="relative">
                <div className="absolute inset-0 rounded-md bg-gradient-to-r from-emerald-300 to-sky-400 blur-md opacity-30 scale-110" />
                <Image
                  src={logoImage}
                  className="size-[150px] rounded-md relative z-10"
                  alt="Profile"
                />
              </div>
            )}
          </div>

          {/* Available badge */}
          <div
            className="mt-2 transition-all duration-700 ease-out"
            style={{
              opacity: showBadge ? 1 : 0,
              transform: showBadge ? "translateY(0)" : "translateY(10px)",
            }}
          >
            <div className="bg-gray-950 border border-gray-800 px-4 py-1.5 inline-flex items-center gap-4 rounded-lg">
              <div className="bg-green-500 size-2.5 border rounded-full relative">
                {available && (
                  <div className="bg-green-500 absolute inset-0 animate-ping-large rounded-full" />
                )}
              </div>
              <div className="text-sm font-medium">
                {available
                  ? "Available for new projects"
                  : "Currently unavailable"}
              </div>
            </div>
          </div>
        </div>

        {/* Title */}
        <div
          className="max-w-3xl mx-auto transition-all duration-700 ease-out"
          style={{
            opacity: showTitle ? 1 : 0,
            transform: showTitle ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <h1 className="font-serif text-2xl md:text-4xl text-center mt-8 tracking-wide">
            {heroTitle}
          </h1>
        </div>

        {/* Typing animation */}
        <div
          className="flex justify-center mt-4 transition-all duration-700 ease-out"
          style={{
            opacity: showTitle ? 1 : 0,
            transform: showTitle ? "translateY(0)" : "translateY(10px)",
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-300/20 bg-emerald-300/5">
            <span className="text-emerald-300 text-sm font-medium">
              {typedSkill}
            </span>
            {/* Blinking cursor */}
            <span className="w-0.5 h-4 bg-emerald-300 animate-[blink_1s_step-end_infinite]" />
          </div>
        </div>

        {/* Description */}
        <div
          className="max-w-lg mx-auto transition-all duration-700 ease-out"
          style={{
            opacity: showDesc ? 1 : 0,
            transform: showDesc ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <p className="text-center mt-4 text-white/60 text-sm md:text-lg">
            {heroDesc}
          </p>
        </div>




        {/* CV Download Button */}
        {resume && (
          <div
            className="flex justify-center mt-4 transition-all duration-700 ease-out"
            style={{
              opacity: showDesc ? 1 : 0,
              transform: showDesc ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <a
              href={resume}
              download="Haseeb_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-5 py-2 rounded-lg border border-emerald-300/30 bg-emerald-300/5 hover:bg-emerald-300/10 hover:border-emerald-300/60 transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 text-emerald-300 group-hover:translate-y-0.5 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
              </svg>
              <span className="text-sm font-medium text-emerald-300">
                Download CV
              </span>
            </a>
          </div>
        )}

        {/* CTA Buttons */}
        <div
          className="flex flex-col md:flex-row justify-center items-center gap-4 mt-8 transition-all duration-700 ease-out"
          style={{
            opacity: showButtons ? 1 : 0,
            transform: showButtons ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div className="group flex items-center gap-2 border border-white/15 px-6 py-2 rounded-lg hover:border-emerald-300/40 hover:bg-emerald-300/5 transition-all duration-300">
            <a href="/#projects" className="font-medium cursor-pointer z-0 group-hover:text-emerald-300 transition-colors duration-300">
              Explore My Work
            </a>
            <ArrowDown className="size-4 group-hover:text-emerald-300 group-hover:translate-y-0.5 transition-all duration-300" />
          </div>
          <div className="group flex items-center gap-2 border border-white bg-white text-gray-900 px-6 py-2 rounded-lg hover:bg-emerald-300 hover:border-emerald-300 transition-all duration-300">
            <span>👋</span>
            <a href="/#contact" className="font-semibold z-10">
              Let's Connect
            </a>
          </div>
        </div>

        {/* Stats row */}
        <div
          ref={statsRef}
          className="flex justify-center gap-12 mt-12 transition-all duration-600 ease-out"
          style={{
            opacity: showStats ? 1 : 0,
            transform: showStats ? "translateY(0)" : "translateY(20px)",
          }}
        >
          {[
            { value: projectsCount, suffix: "+", label: "Projects Completed" },
            { value: clientsCount, suffix: "+", label: "Happy Clients" },
            { value: experienceCount, suffix: "+", label: "Years Experience" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-300 to-sky-400 bg-clip-text text-transparent">
                {stat.value}
                {stat.suffix}
              </span>
              <span className="text-white/40 text-xs md:text-sm">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Blink keyframe injected inline */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </div >
  );
};

export default HeroSection;
