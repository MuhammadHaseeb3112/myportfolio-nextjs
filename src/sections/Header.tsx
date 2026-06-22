"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const menuItems = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Projects",
    path: "/#projects",
  },
  {
    name: "Testimonials",
    path: "/#testimonials",
  },
  {
    name: "About",
    path: "/#about",
  },
  {
    name: "Contact",
    path: "/#contact",
  },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-3 left-0 w-full z-50 px-4">
      <div className="mx-auto max-w-7xl">

        {/* Desktop Navbar */}
        <nav className="hidden md:flex justify-center">
          <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/10 backdrop-blur-xl p-1">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                className="rounded-full px-5 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-white hover:text-black"
              >
                {item.name}
              </a>
            ))}
          </div>
        </nav>

        {/* Mobile Navbar */}
        <div className="md:hidden">

          {/* Top Bar */}
          <div className="flex justify-between items-center rounded-full border border-white/10 bg-white/10 backdrop-blur-xl px-4 py-3">

            <h1 className="text-white font-semibold">
              Portfolio
            </h1>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white"
            >
              {isOpen ? (
                <X size={28} />
              ) : (
                <Menu size={28} />
              )}
            </button>

          </div>

          {/* Dropdown */}
          <div
            className={`overflow-hidden transition-all duration-500 ${isOpen
              ? "max-h-96 mt-3"
              : "max-h-0"
              }`}
          >
            <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-3">

              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-xl px-4 py-3 text-white transition hover:bg-white hover:text-black"
                >
                  {item.name}
                </a>
              ))}

            </div>
          </div>

        </div>

      </div>
    </header>
  );
};