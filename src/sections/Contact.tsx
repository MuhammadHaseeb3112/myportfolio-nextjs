import ArrowDown from "@/assets/icons/arrow-down.svg";
import grainImage from "@/assets/images/grain.jpg";

export const ContactSection = () => {
  return (
    <div className="py-16 pt-12 lg:py-24" id="contact">
      <div className="container">
        <div className="bg-gradient-to-r from-emerald-300 to bg-sky-400 text-gray-900 py-8 px-10 rounded-3xl text-center relative overflow-hidden z-0 md:text-left">
          <div
            className="absolute inset-0 opacity-10 -z-10"
            style={{ backgroundImage: `url(${grainImage.src})` }}
          ></div>
          <div className="flex flex-col gap-8 items-center md:flex-row md:gap-16">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl">
                Let's Build Something Great Together
              </h2>
              <p className="text-sm mt-2 md:text-base">
                Have a role or a project in mind? Let's talk about how I can
                help you achieve your goals.
              </p>
            </div>
            <div>
              <a
                href="/#contact"
                className="text-white bg-gray-900 inline-flex items-center px-6 h-12 rounded-xl gap-2 w-max border border-gray-950 "
              >
                <span className="font-medium">Get in touch</span>
                <ArrowDown className="ml-2 size-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
