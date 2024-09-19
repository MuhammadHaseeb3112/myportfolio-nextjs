"use client";
import memojiImage from "@/assets/images/memoji-computer.png";
import Image from "next/image";
import ArrowDown from "@/assets/icons/arrow-down.svg";
import grainImage from "@/assets/images/grain.jpg";
import Stars from "@/assets/icons/star.svg";
import { HeroOrbit } from "@/components/HeroOrbit";
import Sparkle from "@/assets/icons/sparkle.svg";
export const HeroSection = () => {
  return (
    <div className="py-32 md:py-44 lg:py-60 relative z-0 overflow-x-clip">
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_70%,transparent)]">
        <div
          className="absolute inset-0 -z-30 opacity-5"
          style={{
            backgroundImage: `url(${grainImage.src})`,
          }}
        ></div>
        <div className=" size-[620px] hero-ring"></div>
        <div className=" size-[820px] hero-ring"></div>
        <div className=" size-[1020px] hero-ring"></div>
        <div className=" size-[1220px] hero-ring"></div>
        <HeroOrbit
          size={440}
          rotation={79}
          shouldOrbit={true}
          orbitDuration="30s"
          shouldSpin={true}
          spinDuration="3s"
        >
          <Sparkle className="size-5 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit
          size={430}
          rotation={-14}
          shouldOrbit={true}
          orbitDuration="32s"
          shouldSpin={true}
          spinDuration="3s"
        >
          <Sparkle className="size-8 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit
          size={530}
          rotation={-42}
          shouldOrbit={true}
          orbitDuration="34s"
        >
          <div className="size-2 rounded-full bg-emerald-300/20"> </div>
        </HeroOrbit>
        <HeroOrbit
          size={530}
          rotation={178}
          shouldOrbit={true}
          orbitDuration="36s"
          shouldSpin={true}
          spinDuration="3s"
        >
          <Sparkle className="size-10 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit
          size={550}
          rotation={20}
          shouldOrbit={true}
          orbitDuration="38s"
          shouldSpin={true}
          spinDuration="6s"
        >
          <Stars className="size-12 text-emerald-300" />
        </HeroOrbit>
        <HeroOrbit
          size={590}
          rotation={98}
          shouldOrbit={true}
          orbitDuration="40s"
          shouldSpin={true}
          spinDuration="6s"
        >
          <Stars className="size-8 text-emerald-300" />
        </HeroOrbit>
        <HeroOrbit
          size={650}
          rotation={-5}
          shouldOrbit={true}
          orbitDuration="42s"
        >
          <div className="size-2 rounded-full bg-emerald-300/20"> </div>
        </HeroOrbit>
        <HeroOrbit
          size={660}
          rotation={-72}
          shouldOrbit={true}
          orbitDuration="44s"
        >
          <div className="size-2 rounded-full bg-emerald-300/20"> </div>
        </HeroOrbit>
        <HeroOrbit
          size={710}
          rotation={144}
          shouldOrbit={true}
          orbitDuration="46s"
          shouldSpin={true}
          spinDuration="3s"
        >
          <Sparkle className="size-14 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit
          size={740}
          rotation={85}
          shouldOrbit={true}
          orbitDuration="48s"
        >
          <div className="size-3 rounded-full bg-emerald-300/20"> </div>
        </HeroOrbit>
        <HeroOrbit
          size={800}
          rotation={-72}
          shouldOrbit={true}
          orbitDuration="50s"
          shouldSpin={true}
          spinDuration="6s"
        >
          <Stars className="size-28 text-emerald-300" />
        </HeroOrbit>
      </div>
      <div className="absolute inset-0 image-grain"></div>
      <div className="container">
        <div className="flex flex-col items-center">
          <Image
            src={memojiImage}
            className="size-[150px] rounded-md "
            alt="Person peaking behning from laptop"
          />
          <div className="bg-gray-950 border border-gray-800 px-4 py-1.5 inline-flex items-center gap-4 rounded-lg">
            <div className="bg-green-500 size-2.5 border rounded-full relative">
              <div className="bg-green-500 absolute inset-0 animate-ping-large rounded-full"></div>
            </div>
            <div className="text-sm font-medium">
              Available for new projects
            </div>
          </div>
        </div>
        <div className="max-w-lg mx-auto">
          <h1 className="font-serif text-3xl md:text-5xl text-center mt-8 tracking-wide">
            Driving Engaging Digital Growth
          </h1>
          <p className="text-center mt-4 text-white/60 text-sm md:text-lg">
            Specializing in strategy, ads, and SEO to drive high-performance
            digital growth. Let's discuss your project.
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-8">
        <div className="flex items-center gap-2 border border-white/15 px-6 py-2 rounded-lg">
          <a  href="/#projects" className="font-medium cursor-pointer z-0">Explore My Work</a>
          <ArrowDown className="size-4" />
        </div>
        <div className="flex items-center gap-2 border border-white bg-white text-gray-900 px-6 py-2 rounded-lg">
          <span>👋</span>
          <a href="/#contact" className="font-semibold z-10">Let's Connect</a>
        </div>
      </div>
    </div>
  );
};
