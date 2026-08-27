import type { Metadata } from "next";
import { Poppins, Outfit, Playfair_Display, Urbanist } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"]
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"]
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400","500","600","700","800","900"],
  style: ["normal", "italic"]
});

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
  style: ["normal", "italic"]
});

export const metadata: Metadata = {
  title: "Aung Myo Oo —  Full-Stack Developer",
  description: "Full-Stack Developer crafting premium digital experience. Expert in React, Next.js, Node.js, and modern web technologies.",
  icons: {
    icon: "/favicon.svg",
  }
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${outfit.variable} ${playfair.variable} ${urbanist.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
