'use client';
import { assets } from "@/assets/assets";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Image from "next/image";

export default function Home() {
  return (
   <>
   <Navbar />
   <Header/>
   <About />
   <Services />
   <Work />
   <Contact />
   <Footer />
   
   </>
  );
}
