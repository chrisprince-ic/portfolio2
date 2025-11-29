'use client';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

const Sidebar = ({ activeSection, scrollToSection }) => {
  const navItems = [
    { id: 'home', label: 'Overview' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <aside className="lg:sticky lg:top-10 space-y-6">
      {/* Mobile heading */}
      <div className="lg:hidden mb-2">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400 mb-1">
          Software Engineer
        </p>
        <h1 className="text-2xl font-semibold text-slate-50">Christian Ikirezi</h1>
      </div>

      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="hidden lg:flex flex-col justify-between h-full rounded-3xl border border-slate-800 bg-slate-900/80 px-6 py-7 shadow-xl"
      >
        <div className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400 mb-1.5">
              Software Engineer
            </p>
            <h1 className="text-3xl font-semibold text-slate-50 leading-tight">
              Christian
              <br />
              Ikirezi
            </h1>
            <p className="mt-3 text-sm text-slate-300">
              I build reliable, user‑friendly web experiences with React, Next.js, and modern tooling.
            </p>
          </div>

          <nav className="space-y-1 pt-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full flex items-center justify-between rounded-xl px-3 py-2 text-sm transition-all ${
                  activeSection === item.id
                    ? 'bg-slate-800 text-teal-300'
                    : 'text-slate-300 hover:text-teal-200 hover:bg-slate-900'
                }`}
              >
                <span>{item.label}</span>
                <span className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
                  {activeSection === item.id ? 'Now' : ''}
                </span>
              </button>
            ))}
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500">Based in Toronto · Open to roles</span>
          <div className="flex items-center gap-3 text-slate-400">
            <a
              href="mailto:christianikirezi@gmail.com"
              className="hover:text-teal-300 transition-colors"
              aria-label="Email Christian"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/chrisprince-ic"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-300 transition-colors"
              aria-label="Christian's GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/christian-ikirezi-8b395021a/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-300 transition-colors"
              aria-label="Christian's LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Mobile simple nav strip */}
      <div className="lg:hidden flex gap-3 overflow-x-auto pb-3 -mx-1 px-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
              activeSection === item.id
                ? 'bg-teal-500 text-slate-950 border-teal-400'
                : 'bg-slate-900 text-slate-200 border-slate-700'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;


