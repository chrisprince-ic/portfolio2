'use client';
import { useEffect, useState, useRef, useCallback } from 'react';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import BottomNav from '@/components/BottomNav';
import CursorGlow from '@/components/CursorGlow';
import AiAssistant from '@/components/AiAssistant';
import { throttle } from '@/lib/utils';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');

  const sections = {
    home: useRef(null),
    about: useRef(null),
    projects: useRef(null),
    skills: useRef(null),
    contact: useRef(null)
  };

  const handleScroll = useCallback(
    throttle(() => {
      const scrollPosition = window.scrollY + 120;

      Object.entries(sections).forEach(([sectionName, ref]) => {
        if (ref.current) {
          const { offsetTop, offsetHeight } = ref.current;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionName);
          }
        }
      });
    }, 100),
    []
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToSection = (sectionName) => {
    if (sections[sectionName]?.current) {
      sections[sectionName].current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="min-h-screen text-slate-900 relative bg-transparent">
      <CursorGlow />
      <main className="pt-6 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12 sm:space-y-16">
          {/* Hero Section */}
          <div ref={sections.home} className="scroll-mt-32">
            <Hero scrollToSection={scrollToSection} />
          </div>

          {/* About Section */}
          <div ref={sections.about} className="scroll-mt-32">
            <About />
          </div>

          {/* Projects Section */}
          <div ref={sections.projects} className="scroll-mt-32">
            <Projects />
          </div>

          {/* Skills Section */}
          <div ref={sections.skills} className="scroll-mt-32">
            <Skills />
          </div>

          {/* Contact Section */}
          <div ref={sections.contact} className="scroll-mt-32">
            <Contact />
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </main>
      <AiAssistant />
      <BottomNav activeSection={activeSection} scrollToSection={scrollToSection} />
    </div>
  );
}
