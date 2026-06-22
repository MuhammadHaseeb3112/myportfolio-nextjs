// ============================================================
// src/sections/Testimonials.tsx  — replace your existing Testimonials.tsx
// ============================================================
"use client";

import Image from "next/image";
import { Fragment } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import { useTestimonials } from "@/hooks/useTestimonials";

export const TestimonialsSection = () => {
  const { testimonials, loading, error } = useTestimonials();

  if (loading) {
    return (
      <div className="py-16 lg:py-24" id="testimonials">
        <div className="container">
          <SectionHeader
            eyebrow="Happy Clients"
            title="What Clients Say About Me"
            description="Don't take my word for it. See what our clients have to say about me."
          />
          <div className="flex justify-center py-20">
            <p className="text-white/70 text-lg animate-pulse">Loading testimonials…</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || testimonials.length === 0) {
    return (
      <div className="py-16 lg:py-24" id="testimonials">
        <div className="container">
          <SectionHeader
            eyebrow="Happy Clients"
            title="What Clients Say About Me"
            description="Don't take my word for it. See what our clients have to say about me."
          />
          <div className="flex justify-center py-20">
            <p className="text-white/50">{error ?? "No testimonials yet."}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 lg:py-24" id="testimonials">
      <div className="container">
        <SectionHeader
          eyebrow="Happy Clients"
          title="What Clients Say About Me"
          description="Don't take my word for it. See what our clients have to say about me."
        />

        <div className="mt-12 lg:mt-20 flex overflow-x-clip [mask-image:linear-gradient(to_right,transparent,black_20%,black_90%,transparent)] py-4 -my-4">
          <div className="flex flex-none gap-8 pr-8 animate-move-left [animation-duration:30s] hover:[animation-play-state:paused]">
            {[...new Array(2)].map((_, i) => (
              <Fragment key={i}>
                {testimonials.map((t) => (
                  <Card
                    key={`${i}-${t.id}`}
                    className="max-w-xs md:max-w-md px-7 py-6 md:p-8 hover:-rotate-3 transition duration-300"
                  >
                    <div className="flex gap-4 items-center">
                      <div className="size-14 bg-gray-700 inline-flex rounded-full justify-center items-center ml-3 flex-shrink-0 overflow-hidden">
                        {t.avatar_url ? (
                          <Image
                            src={t.avatar_url}
                            alt={t.client_name}
                            width={56}
                            height={56}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-white text-xl font-bold">
                            {t.client_name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div>
                        <div className="font-semibold">{t.client_name}</div>
                        <div className="text-sm text-white/40">{t.position}</div>
                      </div>
                    </div>
                    <p className="mt-4 text-sm md:text-base md:mt-6">{t.review}</p>
                  </Card>
                ))}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
