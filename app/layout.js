
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
  title: "Christian Ikirezi - Frontend Developer",
  description: "Full Stack Developer specializing in React, Next.js, and modern web technologies. Creating beautiful, responsive web experiences.",
  keywords: ["Frontend Developer", "React", "Next.js", "Web Development", "Portfolio"],
  authors: [{ name: "Christian Ikirezi" }],
  openGraph: {
    title: "Christian Ikirezi - Frontend Developer",
    description: "Full Stack Developer specializing in React, Next.js, and modern web technologies.",
    type: "website",
  },
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