import { Inter, Outfit, Caveat, Figtree } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hand",
});

export const metadata = {
  title: "Christian Ikirezi - Software Engineer",
  description: "Christian Ikirezi builds web products end to end: React, Next.js, TypeScript, Firebase and AI. Sketched on a whiteboard first, then shipped.",
  keywords: ["Software Engineer", "Frontend Developer", "React", "Next.js", "TypeScript", "Web Development", "Portfolio", "UI/UX", "Toronto"],
  authors: [{ name: "Christian Ikirezi" }],
  creator: "Christian Ikirezi",
  publisher: "Christian Ikirezi",
  robots: "index, follow",
  openGraph: {
    title: "Christian Ikirezi - Software Engineer",
    description: "I build web products end to end, and sweat the interface details most people skip.",
    type: "website",
    locale: "en_US",
    siteName: "Christian Ikirezi Portfolio",
    images: [{ url: "/profile-img.png", width: 1200, height: 630, alt: "Christian Ikirezi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Christian Ikirezi - Software Engineer",
    description: "I build web products end to end, and sweat the interface details most people skip.",
    images: ["/profile-img.png"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#121110",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${outfit.variable} ${caveat.variable} ${figtree.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,400,1,0&display=block"
        />
      </head>
      <body className="font-sans antialiased leading-8 overflow-x-hidden">{children}</body>
    </html>
  );
}
