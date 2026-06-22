// ============================================================
// src/sections/Footer.tsx  — replace your existing Footer.tsx
// ============================================================
"use client";

import ArrowUpIcon from "@/assets/icons/arrow-up-right.svg";
import { useProfile } from "@/hooks/useProfile";

const fallbackLinks = [
  { name: "Instagram", href: "https://www.instagram.com/mishikhan4698?igsh=Y3hweTc5aWJjd3pz_/?hl=en" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/mashaim-shakeel-55113027b" },
  { name: "WhatsApp", href: "https://wa.me/+923099221363" },
  { name: "Upwork", href: "https://www.upwork.com" },
];

export const Footer = () => {
  const year = new Date().getFullYear();
  const { profile } = useProfile();

  const links =
    profile?.social_links && profile.social_links.length > 0
      ? profile.social_links.map((sl) => ({ name: sl.platform, href: sl.url }))
      : fallbackLinks;

  return (
    <footer className="relative overflow-x-clip">
      <div className="absolute h-[400px] w-[1600px] bottom-0 left-1/2 -translate-x-1/2 bg-emerald-300/30 [mask-image:radial-gradient(50%_50%_at_bottom_center,black,transparent)] -z-10" />
      <div className="container">
        <div className="border-t border-white/15 py-6 text-sm flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <div className="text-white/40">© {year}. All rights reserved.</div>
          <nav className="flex flex-col items-center md:flex-row gap-8">
            {links.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-white/60 hover:text-white transition duration-300"
              >
                <span>{item.name}</span>
                <ArrowUpIcon className="size-5" />
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};
