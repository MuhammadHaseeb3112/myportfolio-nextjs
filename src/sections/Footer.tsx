import ArrowUpIcon from "@/assets/icons/arrow-up-right.svg";

const ContactLink = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/asad_zaheer_/?hl=en",
  },
  {
    name: "Linkedin",
    href: "https://www.linkedin.com/in/asad-zaheer-1a493a253/",
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/+923252299077",
  },
  {
    name: "Upwork",
    href: "https://www.upwork.com/freelancers/~018aad2c765922c5b2",
  },
];

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="relative  overflow-x-clip">
      <div className="absolute h-[400px] w-[1600px] bottom-0 left-1/2 -translate-x-1/2 bg-emerald-300/30 [mask-image:radial-gradient(50%_50%_at_bottom_center,black,transparent)] -z-10"></div>
      <div className="container">
        <div className="border-t border-white/15 py-6 text-sm flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <div className="text-white/40">© {year}. All rights reserved.</div>
          <nav className="flex flex-col items-center md:flex-row gap-8">
            {ContactLink.map((item) => (
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
