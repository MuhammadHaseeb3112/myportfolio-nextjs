import type { Metadata } from "next";
import { Inter, Calistoga } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const calistoga = Calistoga({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://muhammadhaseeb-portfolio-six.vercel.app"),
  title: "Muhammad Haseeb · Full Stack Developer",
  description:
    "Portfolio of Muhammad Haseeb: full stack developer building Django, DRF and React apps. Live projects, skills and contact.",
  openGraph: {
    siteName: "Portfolio",
    title: "Muhammad Haseeb · Full Stack Developer",
    description:
      "Django, DRF, FastAPI and React projects, including three live products in production.",
    url: "/",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,

}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={twMerge(
          inter.variable,
          calistoga.variable,
          " bg-gray-900 text-white antialiased font-sans"
        )}
      >
        {children}
      </body>
    </html>
  );
}
