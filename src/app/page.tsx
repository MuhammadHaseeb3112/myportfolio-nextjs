import { AboutSection } from "@/sections/About";
import { Header } from "@/sections/Header";
import { HeroSection } from "@/sections/Hero";
import { ProjectsSection } from "@/sections/Projects";
import { TapeSection } from "@/sections/Tape";
import { Footer } from "@/sections/Footer";
import { ExperienceSection } from "@/sections/Experience";
import { ContactSection } from "@/sections/Contact";
import ContactFrom from "@/sections/ContactFrom";


export default function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      <ProjectsSection />
      <TapeSection />
      <AboutSection />
      <ExperienceSection />
      <ContactSection />
      <ContactFrom />
      <Footer />
    </div>
  );
}


