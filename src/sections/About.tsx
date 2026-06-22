// src/sections/About.tsx
"use client";

import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";
import Image from "next/image";
import mapImage from "@/assets/images/map.png";
import mapimg from "@/assets/images/memoji-avatar-3.png";
import { CardHeader } from "@/components/CardHeader";
import { ToolBoxItems } from "@/components/ToolBoxItems";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useProfile } from "@/hooks/useProfile";
import React from "react";

// ── SVG Icon Imports ──────────────────────────────────────────
import VSCodeIcon from "@/assets/icons/Visual Studio Code (VS Code).svg";
import GitIcon from "@/assets/icons/Git.svg";
import GitHubIcon from "@/assets/icons/GitHub.svg";
import PythonIcon from "@/assets/icons/Python.svg";
import DjangoIcon from "@/assets/icons/Django.svg";
import DrfIcon from "@/assets/icons/Django REST Framework.svg";
import PostgreSQLIcon from "@/assets/icons/PostgreSQL.svg";
import MySQLIcon from "@/assets/icons/MySQL.svg";
import DockerIcon from "@/assets/icons/Docker.svg";
import ApiIcon from "@/assets/icons/API.svg";
import SwaggerIcon from "@/assets/icons/Swagger.svg";
import PostmanIcon from "@/assets/icons/Postman.svg";
import HtmlIcon from "@/assets/icons/HTML5.svg";
import CssIcon from "@/assets/icons/CSS3.svg";
import JsIcon from "@/assets/icons/JavaScript.svg";
import BootstrapIcon from "@/assets/icons/icons8-bootstrap.svg";

// ── Skill → Icon map ─────────────────────────────────────────
const skillIconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  "VS Code": VSCodeIcon,
  "Visual Studio Code": VSCodeIcon,
  "Git": GitIcon,
  "GitHub": GitHubIcon,
  "Python": PythonIcon,
  "Django": DjangoIcon,
  "Django REST Framework": DrfIcon,
  "DRF": DrfIcon,
  "PostgreSQL": PostgreSQLIcon,
  "MySQL": MySQLIcon,
  "Docker": DockerIcon,
  "REST API": ApiIcon,
  "API": ApiIcon,
  "Swagger": SwaggerIcon,
  "Swagger / OpenAPI": SwaggerIcon,
  "Postman": PostmanIcon,
  "HTML5": HtmlIcon,
  "HTML": HtmlIcon,
  "CSS3": CssIcon,
  "CSS": CssIcon,
  "JavaScript": JsIcon,
  "JS": JsIcon,
  "Bootstrap": BootstrapIcon,
};



// ── Scroll-reveal hook ───────────────────────────────────────
const useReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
};

export const AboutSection = () => {
  const constraintRef = useRef(null);
  const { profile, loading } = useProfile();

  const { ref: row1Ref, visible: row1Visible } = useReveal();
  const { ref: row2Ref, visible: row2Visible } = useReveal();

  // ── Toolbox items ─────────────────────────────────────────
  const toolBoxItems =
    profile?.skills
      ?.map((skill) => ({
        title: skill.name,
        iconType: skillIconMap[skill.name],
      }))
      .filter((item) => item.iconType) ?? [];

  // ── Hobbies ───────────────────────────────────────────────
  const hobbies =
    profile?.hobbies?.map((hobby) => ({
      title: hobby.title,
      emoji: hobby.emoji,
      left: hobby.left_position,
      top: hobby.top_position,
    })) ?? [];


  const mapUrl = profile?.map_url;
  const fullName = profile?.full_name;
  const desig = profile?.designation;
  const photoUrl = profile?.profile_image_url;

  return (
    <div className="py-16 lg:py-24" id="about">
      <div className="container">
        <SectionHeader
          eyebrow="About Me"
          title="A Glimpse Into My World"
          description="Learn more about who I am, what I do, and what inspires me."
        />

        <div className="mt-12 lg:mt-20 flex flex-col gap-6 lg:gap-8">

          {/* ── Row 1: Profile + Toolbox ─────────────────── */}
          <div
            ref={row1Ref}
            className="grid grid-cols-1 gap-6 md:grid-cols-5 lg:grid-cols-3 transition-all duration-700 ease-out"
            style={{
              opacity: row1Visible ? 1 : 0,
              transform: row1Visible ? "translateY(0)" : "translateY(30px)",
            }}
          >
            {/* Profile Card */}
            <Card className="md:col-span-2 lg:col-span-1 flex flex-col items-center justify-center py-8 px-4 min-h-[280px]">
              {/* Avatar */}
              <div className="relative mb-4">
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 blur-md opacity-30 scale-110" />
                <div className="relative size-24 sm:size-28 rounded-full overflow-hidden border-2 border-emerald-300/30">
                  {photoUrl ? (
                    <Image
                      src={photoUrl}
                      alt={fullName ?? "Profile Image"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-emerald-300 to-sky-400 flex items-center justify-center">
                      <span className="text-gray-900 text-4xl font-bold">
                        {fullName?.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Name & title */}
              <h3 className="font-semibold text-base sm:text-lg text-white text-center leading-tight">
                {fullName}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-white/50 text-center leading-snug px-2">
                {desig}
              </p>

              {/* Skill badges */}
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                {(profile?.skills ?? []).slice(0, 3).map((skill) => (
                  <span
                    key={skill.id}
                    className="text-[10px] sm:text-xs px-2.5 py-1 rounded-full border border-emerald-300/20 bg-emerald-300/5 text-emerald-300"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </Card>

            {/* Toolbox Card */}
            <Card className="md:col-span-3 lg:col-span-2 min-h-[280px] overflow-hidden pb-4">
              <CardHeader
                title="My ToolBox"
                description="Technologies and tools I use to craft exceptional digital experiences."
              />
              {loading ? (
                <div className="flex justify-center items-center h-24">
                  <div className="flex gap-2">
                    {[...new Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="size-2 rounded-full bg-emerald-300/50 animate-bounce"
                        style={{ animationDelay: `${i * 150}ms` }}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  <ToolBoxItems
                    items={toolBoxItems}
                    itemWrapperName="animate-move-left [animation-duration:30s]"
                  />
                  <ToolBoxItems
                    items={toolBoxItems}
                    itemWrapperName="animate-move-right [animation-duration:20s]"
                  />
                </div>
              )}
            </Card>
          </div>

          {/* ── Row 2: Hobbies + Map ─────────────────────── */}
          <div
            ref={row2Ref}
            className="grid grid-cols-1 gap-6 md:grid-cols-5 lg:grid-cols-3 transition-all duration-700 ease-out delay-150"
            style={{
              opacity: row2Visible ? 1 : 0,
              transform: row2Visible ? "translateY(0)" : "translateY(30px)",
            }}
          >
            {/* Hobbies Card */}
            <Card className="p-0 flex flex-col md:col-span-3 lg:col-span-2 min-h-[280px] sm:min-h-[300px]">
              <div className="p-6 pb-2">
                <CardHeader
                  title="Beyond My Work"
                  description="Explore my interests and hobbies beyond the digital realm."
                />
              </div>
              <div className="relative flex-1 min-h-[180px]" ref={constraintRef}>
                {hobbies.map((item, idx) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.07, type: "spring", stiffness: 200 }}
                    className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1 sm:py-1.5 bg-gradient-to-r from-emerald-300 to-sky-400 rounded-full absolute cursor-grab active:cursor-grabbing shadow-sm"
                    style={{ left: item.left, top: item.top }}
                    drag
                    dragConstraints={constraintRef}
                    whileDrag={{ scale: 1.05, zIndex: 50 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-sm sm:text-base">{item.emoji}</span>
                    <span className="font-medium text-gray-950 text-xs sm:text-sm whitespace-nowrap">
                      {item.title}
                    </span>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Map Card */}
            <Card className="p-0 relative md:col-span-2 lg:col-span-1 min-h-[280px] overflow-hidden">
              <Image
                src={mapImage}
                alt="map"
                fill
                className="object-cover object-left-top"
              />
              {/* Dark overlay for contrast */}
              <div className="absolute inset-0 bg-black/20" />

              {/* Location pin */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative size-16 sm:size-20">
                  {/* Ping rings */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 opacity-30 animate-ping [animation-duration:2s]" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 opacity-20 animate-ping [animation-duration:2s] [animation-delay:0.5s]" />
                  {/* Circle */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 flex items-center justify-center">
                    <Image
                      src={mapimg}
                      alt="location"
                      width={48}
                      height={48}
                      className="size-10 sm:size-12 object-contain"
                    />
                  </div>
                </div>

                {/* Visit Now label */}
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-2 block text-center text-xs sm:text-sm font-semibold text-white bg-gray-950/70 backdrop-blur-sm rounded-full px-3 py-1 border border-white/10 hover:bg-emerald-300 hover:text-gray-950 transition-all duration-300 whitespace-nowrap"
                >
                  📍 Visit Now
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
