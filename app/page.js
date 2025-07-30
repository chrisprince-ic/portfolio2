'use client';
import { useEffect, useState, useRef, useCallback } from 'react';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import { throttle } from '@/lib/utils';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sections = {
    home: useRef(null),
    about: useRef(null),
    projects: useRef(null),
    skills: useRef(null),
    contact: useRef(null)
  };

  const handleScroll = useCallback(
    throttle(() => {
      const scrollPosition = window.scrollY + 100;
      
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
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Navigation */}
      <Navbar 
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* Hero Section */}
      <div ref={sections.home}>
        <Hero scrollToSection={scrollToSection} />
      </div>

      {/* About Section */}
      <div ref={sections.about}>
        <About />
      </div>

      {/* Projects Section */}
      <div ref={sections.projects}>
        <Projects />
      </div>

      {/* Skills Section */}
      <div ref={sections.skills}>
        <Skills />
      </div>

      {/* Contact Section */}
      <div ref={sections.contact}>
        <Contact />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
