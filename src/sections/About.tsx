"use client";
import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";
import asadImg from "@/assets/images/Asad1.png";
import Image from "next/image";
import AdobeIllustrator from "@/assets/icons/Adobe-illustrator.svg";
import AdobePhoto from "@/assets/icons/adobe-photoshop-icon.svg";
import AdobePremire from "@/assets/icons/adobe-premiere.svg";
import Semrish from "@/assets/icons/Semrush.svg";
import keyWordResearch from "@/assets/icons/keyword-research.svg";
import MailChimp from "@/assets/icons/mailchimp.svg";
import Apollo from "@/assets/icons/Apollo.io New.svg";
import SeamlessAi from "@/assets/icons/Seamless.AI.svg";
import mapImage from "@/assets/images/map.png";
import styleEmoji from "@/assets/images/memoji-avatar-1.png"; // style emoji
import { CardHeader } from "@/components/CardHeader";
import { ToolBoxItems } from "@/components/ToolBoxItems";
import { motion } from "framer-motion";
import { useRef } from "react";

const toolBoxItems = [
  {
    title: "Adobe illustrator ",
    iconType: AdobeIllustrator,
  },
  {
    title: "Adobe Photoshop",
    iconType: AdobePhoto,
  },
  {
    title: "Adobe Premire",
    iconType: AdobePremire,
  },
  {
    title: "Semrush",
    iconType: Semrish,
  },
  {
    title: "Keyword Research",
    iconType: keyWordResearch,
  },
  {
    title: "Mailchimp",
    iconType: MailChimp,
  },
  {
    title: "Apollo Io",
    iconType: Apollo,
  },
  {
    title: "Seamless Ai",
    iconType: SeamlessAi,
  },
];

const hobbies = [
  {
    title: "Painting",
    emoji: "🎨",
    left: "5%",
    top: "5%",
  },
  {
    title: "Photography",
    emoji: "📸",
    left: "50%",
    top: "5%",
  },
  {
    title: "Gaming",
    emoji: "🎮",
    left: "10%",
    top: "35%",
  },
  {
    title: "Reading",
    emoji: "📚",
    left: "35%",
    top: "40%",
  },
  {
    title: "Running",
    emoji: "🏃‍♂️",
    left: "70%",
    top: "45%",
  },
  {
    title: "GYM",
    emoji: "🏋️‍♀️",
    left: "5%",
    top: "65%",
  },
  {
    title: "Music",
    emoji: "🎧",
    left: "45%",
    top: "70%",
  },
];
export const AboutSection = () => {
  const constraintRef = useRef(null);
  return (
    <div className="py-20 lg:py-28" id="about">
      <div className="container ">
        <SectionHeader
          eyebrow="About Me"
          title="A Glimse Into My World"
          description="Learn more about who I am , what I do , and what inspires me"
        />
        <div className="mt-20 flex flex-col gap-8 ">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3">
            <Card className="h-[320px] md:col-span-2 lg:col-span-1">
            <div className="mt-6 lg:mt-2 md:mt-4  z-10  w-32 mx-auto">
                <Image
                  src={asadImg}
                  alt="book"
                  className="w-full scale-105"
                ></Image>
              </div>
              <CardHeader
                title="Asad Zaheer"
                description="Social Media Expert | SEO | (Strategy, Ads, Funnels, Lead Generation )"
                IntroSize="text-sm text-center "
                introTitle="md:text-2xl"
              />
              
            </Card>
            <Card className="h-[320px] md:col-span-3 lg:col-span-2">
              <CardHeader
                className=""
                title="My ToolBox"
                description=" Explore the technologies and tools I use to craft exceptional
                digital experiences."
              />
              <ToolBoxItems
                items={toolBoxItems}
                className=""
                itemWrapperName="animate-move-left [animation-duration:30s]"
              />
              <ToolBoxItems
                items={toolBoxItems}
                className="mt-6"
                itemWrapperName=" animate-move-right [animation-duration:15s]"
              />
            </Card>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3">
            <Card className="h-[320px] p-0 flex flex-col md:col-span-3 lg:col-span-2">
              <CardHeader
                title="Beyond My Work"
                description="Explore my interests and hobbies beyond the digital realm."
              />
              <div className="relative flex-1" ref={constraintRef}>
                {hobbies.map((item) => (
                  <motion.div
                    key={item.title}
                    className="inline-flex items-center gap-2 px-6 bg-gradient-to-r from-emerald-300 to bg-sky-400 rounded-full py-1.5 absolute"
                    style={{ left: item.left, top: item.top }}
                    drag
                    dragConstraints={constraintRef}
                  >
                    <span>{item.emoji}</span>
                    <span className="font-medium text-gray-950">
                      {item.title}
                    </span>
                  </motion.div>
                ))}
              </div>
            </Card>
            <Card className="h-[320px] p-0 relative md:col-span-2 lg:col-span-1">
              <Image
              
                src={mapImage}
                alt="map"
                className="w-full h-full object-cover object-left-top"
              ></Image>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-20 rounded-full after:content-[''] after:absolute after:outline after:outline-2 after:outline-offset-2 after:rounded-full after:outline-gray-950/30">
                <div className="absolute inset-0 rounded-full  bg-gradient-to-r from-emerald-300 to bg-sky-400 -z-20 animate-ping [animation-duration:2s]"></div>
                <div className="absolute inset-0 rounded-full  bg-gradient-to-r from-emerald-300 to bg-sky-400 -z-10"></div>
                <Image src={styleEmoji} alt="emoji" className="size-20"></Image>
                <div className="text-base font-medium  mt-2"><a href="https://google.com/maps/place/Zaltech+Apps/@31.5315254,74.3519936,18.91z/data=!3m1!5s0x391f6de93d5067c5:0xc6a331208cebb688!4m14!1m7!3m6!1s0x3918ff3404c102f7:0x8e52f9e294dfc26d!2sZaltech+Apps!8m2!3d31.5312691!4d74.352699!16s%2Fg%2F11s3ckc18q!3m5!1s0x3918ff3404c102f7:0x8e52f9e294dfc26d!8m2!3d31.5312691!4d74.352699!16s%2Fg%2F11s3ckc18q?entry=ttu&g_ep=EgoyMDI0MDkxNi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer noopener">Visit Now</a></div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
