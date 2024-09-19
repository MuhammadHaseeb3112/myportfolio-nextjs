import socialMediaPost from "@/assets/images/Social-media-post.jpg";
import socialMediaAd from "@/assets/images/Social-media-Ad.jpg";
import socialMediaCompaign from "@/assets/images/Social-media-Compaign.jpg";
import seoBacklinking from "@/assets/images/Seo-Backlinking.jpg";
import offPage from "@/assets/images/Off-Page-Seo.jpg";
import organicTraffic from "@/assets/images/Organic-Traffic.jpg";
import dataEntry from "@/assets/images/Data-Entry.jpg";
import Image from "next/image";
import CheckCircleIcon from "@/assets/icons/check-circle.svg";
import ArrowUpRight from "@/assets/icons/arrow-up-right.svg";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";

const portfolioProjects = [
  {
    company: "Zaltec.ai",
    year: "2022",
    title: "Social Media Post Designs",
    results: [
      { title: "Boosted customer engagement by 45%" },
      { title: "Increased conversion rate by 30%" },
      { title: "Optimized SEO rankings by 25%" },
    ],
    link: "https://www.upwork.com/freelancers/~018aad2c765922c5b2?p=1833061955700232192",
    image: socialMediaPost,
  },
  {
    company: "Logic x",
    year: "2023",
    title: "Social Media Ad Campaign",
    results: [
      { title: "Achieved 60% higher ad click-through rate" },
      { title: "Lowered cost per acquisition by 35%" },
      { title: "Increased ad impressions by 50%" },
    ],
    link: "https://www.upwork.com/freelancers/~018aad2c765922c5b2?p=1833060689776951296",
    image: socialMediaAd,
  },
  {
    company: "Istylemood",
    year: "2022",
    title: "Social Media Campaign",
    results: [
      { title: "Gained 10k new followers in 30 days" },
      { title: "Enhanced brand awareness by 20%" },
      { title: "Boosted brand mentions by 40%" },
    ],
    link: "https://www.upwork.com/freelancers/~018aad2c765922c5b2?p=1833059697481154560",
    image: socialMediaCompaign,
  },
  {
    company: "Axact",
    year: "2022",
    title: "Data Entry/Lead Generation",
    results: [
      { title: "Collected 5,000 leads in one week" },
      { title: "Improved lead accuracy to 98%" },
      { title: "Boosted lead conversion by 25%" },
    ],
    link: "https://www.upwork.com/freelancers/~018aad2c765922c5b2?p=1833058542449524736",
    image: dataEntry,
  },
  {
    company: "Mexsol",
    year: "2021",
    title: "Achieving Results with Organic Traffic",
    results: [
      { title: "Increased organic traffic by 40%" },
      { title: "Boosted search visibility by 35%" },
      { title: "Grew organic leads by 30%" },
    ],
    link: "https://www.upwork.com/freelancers/~018aad2c765922c5b2?p=1833056594528333824",
    image: organicTraffic,
  },
  {
    company: "Learn Desk",
    year: "2023",
    title: "SEO Back linking | ON-Page SEO",
    results: [
      { title: "Enhanced page speed by 40%" },
      { title: "Enhanced domain authority by 25%" },
      { title: "Boosted referral traffic by 40%" },
    ],
    link: "https://www.upwork.com/freelancers/~018aad2c765922c5b2?p=1833055557107064832",
    image: seoBacklinking,
  },
  {
    company: "UrApptech",
    year: "2023",
    title: "SEO Back linking | Off-Page SEO",
    results: [
      { title: "Enhanced page speed by 50%" },
      { title: "Improved meta tag optimization by 40%" },
      { title: "Increased keyword relevance by 30%" },
    ],
    link: "https://www.upwork.com/freelancers/~018aad2c765922c5b2?p=1833054686562492416",
    image: offPage,
  },
];

export const ProjectsSection = () => {
  return (
    <section className="pb-16 lg:py-24" id="projects">
      <div className="container">
        <SectionHeader
          eyebrow="Real-World Results"
          title="Featured Project"
          description="See how i transformed concepts into engaging digital experiences."
        />

        <div className="flex flex-col md:mt-20 mt-10 gap-20">
          {portfolioProjects.map((project, projectIndex) => (
            <Card
              key={project.title}
              className="px-8 pt-8 md:pt-12 md:px-10 lg:pt-16 lg:px-20 pb-0 sticky "
              style={{ top: `calc(64px + ${projectIndex * 40}px)` }}
            >
              <div className="lg:grid lg:grid-cols-2 lg:gap-16">
                <div className="order-2 lg:order-1 lg:pb-16">
                  <div className="bg-gradient-to-r from-emerald-300 to-sky-400 inline-flex gap-2 font-bold uppercase tracking-widest text-sm text-transparent bg-clip-text ">
                    <span>{project.company}</span>
                    <span>&bull;</span>
                    <span>{project.year}</span>
                  </div>
                  <h3 className="font-serif text-2xl mt-2 md:text-4xl md:mt-5">
                    {project.title}
                  </h3>
                  <hr className="border-t-2 border-white/5 mt-4 md:mt-5" />
                  <ul className="flex flex-col gap-4 mt-4 md:mt-5">
                    {project.results.map((result) => (
                      <li
                        key={result.title}
                        className="flex gap-2 text-white/50 text-sm md:text-base"
                      >
                        <CheckCircleIcon className="size-5 md:size-6 " />
                        <span className="">{result.title}</span>
                      </li>
                    ))}
                  </ul>

                  <a href={project.link} target="_blank" rel="noreferrer">
                    <button className="bg-white text-gray-950 h-12 w-full rounded-xl font-semibold inline-flex items-center justify-center gap-2 mt-8 px-6 md:w-auto">
                      <span>Visit Now</span>
                      <ArrowUpRight className="size-4" />
                    </button>
                  </a>
                </div>
                <div className="order-1 lg:order-2 relative ">
                  <Image
                    src={project.image}
                    alt={project.title}
                    className="mt-8 -mb-4 md:-mb-0 lg:mt-0 lg:absolute lg:h-full lg:w-auto lg:max-w-none rounded-2xl bg-"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
