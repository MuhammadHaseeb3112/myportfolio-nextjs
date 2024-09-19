import memojiAvatar1 from "@/assets/images/memoji-avatar-1.png";
import memojiAvatar2 from "@/assets/images/memoji-avatar-2.png";
import memojiAvatar3 from "@/assets/images/memoji-avatar-3.png";
import memojiAvatar4 from "@/assets/images/memoji-avatar-4.png";
import memojiAvatar5 from "@/assets/images/memoji-avatar-5.png";
import { SectionHeader } from "@/components/SectionHeader";
import Image from "next/image";
import { Card } from "@/components/Card";
import { Fragment } from "react";

const testimonials = [
  {
    name: "Ali Shah",
    position: "Owner @ Shah Garments",
    text: "Asad’s social media strategies turned our struggling online presence into a lead-generating powerhouse. Our sales skyrocketed within just a few months of working with him!",
    avatar: memojiAvatar1,
  },
  {
    name: "Zainab Jamil",
    position: "Co-Founder @ Karachi Eats",
    text: "We saw an immediate improvement in our website traffic and customer engagement after Asad optimized our SEO and ad campaigns. His work speaks for itself, and the results are outstanding!",
    avatar: memojiAvatar2,
  },
  {
    name: "Raza Khalid",
    position: "CEO @ TechMart Solutions",
    text: "Asad transformed our digital marketing funnel. From Facebook ads to Google campaigns, his strategies have consistently brought in qualified leads and boosted our conversions significantly.",
    avatar: memojiAvatar3,
  },
  {
    name: "Amina Khan",
    position: "Marketing Manager @ Pure Foods",
    text: "We’re thrilled with the results Asad delivered through his social media expertise. He helped us create a strong online presence and improve customer engagement with targeted ad campaigns.",
    avatar: memojiAvatar4,
  },
  {
    name: "Hamza Tariq",
    position: "Founder @ SmartTech Services",
    text: "Asad's knowledge of SEO and lead generation is top-notch. Our website ranks higher, and we've seen a consistent increase in organic traffic since working with him.",
    avatar: memojiAvatar5,
  },
  {
    name: "Sana Malik",
    position: "Marketing Head @ Foodies Hub",
    text: "Asad’s mastery of ad funnels and lead generation helped us attract the right audience. Our business has seen a steady growth in customers since we started working together.",
    avatar: memojiAvatar1,
  },
  {
    name: "Usman Sheikh",
    position: "CEO @ Digital World",
    text: "Asad’s work on our SEO was exceptional. We now rank higher on search engines, and our customer inquiries have increased substantially. Highly recommended!",
    avatar: memojiAvatar2,
  },
  {
    name: "Hina Ahmed",
    position: "Head of Marketing @ EcoClean Solutions",
    text: "Asad’s digital marketing expertise helped us build a strong online presence, and the ROI from his campaigns has exceeded our expectations. We couldn't be happier.",
    avatar: memojiAvatar3,
  },
  {
    name: "Farhan Ali",
    position: "Founder @ FitZone Pakistan",
    text: "Asad’s social media strategies and ad management have significantly boosted our gym’s membership sign-ups. His work is thorough and results-oriented!",
    avatar: memojiAvatar4,
  },
  {
    name: "Mahnoor Qureshi",
    position: "Operations Manager @ StyleVault",
    text: "Working with Asad has been a game changer for our business. His lead generation strategies and SEO work have increased our online sales tremendously.",
    avatar: memojiAvatar5,
  },
];

export const TestimonialsSection = () => {
  return (
    <div className="py-16 lg:py-24" id="testimonials">
      <div className="container">
        <SectionHeader
          eyebrow="Happy Clients"
          title="What Clients Say About Me"
          description="Don't take my word for it. See what our clients have to say about me."
        />
        <div className="mt-12 lg:mt-20 flex overflow-x-clip [mask-image:linear-gradient(to_right,transparent,black_20%,black_90%,transparent,transparent)] py-4  -my-4">
          <div className="flex flex-none gap-8 pr-8 animate-move-left [animation-duration:70s] hover:[animation-play-state:paused]">
            {[...new Array(2)].map((_, index) => (
              <Fragment key={index}>
                {testimonials.map((test) => (
                  <Card
                    key={test.name}
                    className="max-w-xs md:max-w-md pt-8 pb-6  md:p-8 hover:-rotate-3 transition duration-300"
                  >
                    <div className="flex gap-4 items-center">
                      <div className="size-14 bg-gray-700 inline-flex rounded-full justify-center items-center ml-3 flex-shrink-0">
                        <Image
                          src={test.avatar}
                          alt={test.name}
                          className="max-h-full "
                        />
                      </div>
                      <div>
                        <div className="font-semibold">{test.name}</div>
                        <div className="text-sm text-white/40">
                          {test.position}
                        </div>
                      </div>
                    </div>
                    <p className="mt-4 text-sm md:text-base md:mt-6">
                      {test.text}
                    </p>
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
