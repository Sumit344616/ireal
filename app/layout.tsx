import type { Metadata, Viewport } from "next";
import { Cinzel, Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { LoadingScreen } from "@/components/sections/LoadingScreen";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-editorial",
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ireal-fashion.com"),
  title: "IREAL — Built Different | Cinematic Fashion Campaign",
  description:
    "An original luxury men's fashion house defined by raw confidence, architectural precision, and quiet authority. Reality refined.",
  keywords: [
    "IREAL",
    "Luxury Menswear",
    "High Fashion",
    "Architectural Tailoring",
    "Cinematic Fashion Campaign",
    "Modern Monochrome",
  ],
  authors: [{ name: "IREAL Creative Direction" }],
  creator: "IREAL",
  openGraph: {
    title: "IREAL — Built Different | Cinematic Fashion Campaign",
    description:
      "An original luxury men's fashion house defined by raw confidence, architectural precision, and quiet authority.",
    siteName: "IREAL",
    images: [
      {
        url: "/images/hero_model_main.jpg",
        width: 1200,
        height: 630,
        alt: "IREAL Cinematic Campaign",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IREAL — Built Different",
    description:
      "An original luxury men's fashion house defined by raw confidence, architectural precision, and quiet authority.",
    images: ["/images/hero_model_main.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${playfair.variable} ${jakarta.variable}`}
      suppressHydrationWarning
    >
      <body
        suppressHydrationWarning
        className="antialiased bg-[#080808] text-[#F4F1EA] overflow-x-hidden selection:bg-[#F4F1EA] selection:text-[#080808]"
      >
        {/* Cinematic Film Grain Overlay */}
        <div className="film-grain" aria-hidden="true" />

        {/* 1.8s Luxury Preloader with Curtain Opening Reveal */}
        <LoadingScreen />

        {/* Minimalist Editorial Scroll Progress */}
        <ScrollProgress />

        {/* Custom Desktop Magnetic Cursor */}
        <CustomCursor />

        {/* Smooth Scroll Container with GSAP Integration */}
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
