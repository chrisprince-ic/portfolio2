
/* Your custom styles */
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

// Initialize fonts with proper syntax
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

export const metadata = {
  title: "Christian Ikirezi - Frontend Developer Portfolio",
  description: "Professional Frontend Developer specializing in React, Next.js, TypeScript, and modern web technologies. Creating beautiful, responsive, and performant web experiences.",
  keywords: ["Frontend Developer", "React", "Next.js", "TypeScript", "Web Development", "Portfolio", "UI/UX", "Toronto"],
  authors: [{ name: "Christian Ikirezi" }],
  creator: "Christian Ikirezi",
  publisher: "Christian Ikirezi",
  robots: "index, follow",
  openGraph: {
    title: "Christian Ikirezi - Frontend Developer Portfolio",
    description: "Professional Frontend Developer specializing in React, Next.js, TypeScript, and modern web technologies.",
    type: "website",
    locale: "en_US",
    siteName: "Christian Ikirezi Portfolio",
    images: [
      {
        url: "/profile-img.png",
        width: 1200,
        height: 630,
        alt: "Christian Ikirezi - Frontend Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Christian Ikirezi - Frontend Developer Portfolio",
    description: "Professional Frontend Developer specializing in React, Next.js, TypeScript, and modern web technologies.",
    images: ["/profile-img.png"],
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#3b82f6",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased leading-8 overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}