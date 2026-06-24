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
        <div className="border-t border-white/15 py-10">

          <div className="flex flex-col lg:flex-row justify-between gap-12">

            {/* Left Side */}
            <div className="max-w-md">

              <h3
                className="text-[2.2rem] sm:text-[1.8rem] font-[Cinzel] font-black tracking-[0.06em] leading-none" style={{
                  textShadow: `
      0 0 10px rgba(0,229,204,0.9),
      0 0 25px rgba(0,229,204,0.75),
      0 0 55px rgba(0,229,204,0.55),
      0 0 100px rgba(0,229,204,0.3),
      0 0 180px rgba(0,229,204,0.15)
    `,
                  WebkitTextStroke: "0.8px rgba(180,255,245,0.35)",
                  background: "linear-gradient(160deg, #ffffff 0%, #b0fff4 35%, #00e5cc 65%, #00a890 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Muhammad Haseeb
              </h3>

              <p className="mt-3 text-white/60 leading-relaxed">
                Passionate Full Stack Developer with expertise in Django, Django REST Framework, and modern web technologies. I build scalable, secure, and user-focused applications with clean architecture, responsive interfaces, REST APIs, real-time functionality, and optimized performance using PostgreSQL, Docker, Redis, and cloud deployment workflows.
              </p>

              <div className="mt-6 space-y-3">

                <a
                  href="mailto:your@email.com"
                  className="flex items-center gap-3 text-white/70 hover:text-emerald-400 transition"
                >
                  <span className="text-lg">📧</span>
                  <span>mhasseb3112@email.com</span>
                </a>

                <a
                  href="tel:+923001234567"
                  className="flex items-center gap-3 text-white/70 hover:text-emerald-400 transition"
                >
                  <span className="text-lg">📞</span>
                  <span>+92 313 0067082</span>
                </a>

                <div className="flex items-center gap-3 text-white/70">
                  <span className="text-lg">📍</span>
                  <span>Bahawalpur, Punjab, Pakistan</span>
                </div>

              </div>

            </div>

            {/* Right Side */}
            <div>

              <h4 className="text-lg font-semibold text-white mb-5">
                Connect With Me
              </h4>

              <nav className="flex flex-col gap-4">
                {links.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white/60 hover:text-emerald-400 transition duration-300"
                  >
                    <span>{item.name}</span>
                    <ArrowUpIcon className="size-4" />
                  </a>
                ))}
              </nav>

            </div>

          </div>

          <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-white/40">
            © {year} Muhammad Haseeb. All rights reserved.
          </div>

        </div>
      </div>
    </footer>
  );
};
