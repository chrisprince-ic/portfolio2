'use client';
import { Home, User, FolderGit2, Sparkles, Mail, BookOpen } from 'lucide-react';

const items = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'skills', label: 'Skills', icon: Sparkles },
  { id: 'contact', label: 'Contact', icon: Mail },
  { id: 'blog', label: 'Blog', icon: BookOpen, href: '/blog' },
];

const BottomNav = ({ activeSection, scrollToSection }) => {
  return (
    <div className="fixed inset-x-0 bottom-5 z-40 flex justify-center pointer-events-none">
      <nav className="pointer-events-auto flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/95 shadow-[0_18px_38px_rgba(15,23,42,0.2)] backdrop-blur-md px-4 py-2 sm:px-6 sm:py-3">
        {items.map(({ id, label, icon: Icon, href }) => {
          const active = !href && activeSection === id;
          const baseClasses =
            'flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-medium transition-colors';
          const activeClasses = active
            ? ' bg-slate-900 text-white'
            : ' text-slate-600 hover:text-slate-900 hover:bg-slate-100';

          const content = (
            <>
              <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline">{label}</span>
            </>
          );

          if (href) {
            return (
              <a
                key={id}
                href={href}
                className={
                  baseClasses + ' text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }
              >
                {content}
              </a>
            );
          }

          return (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={baseClasses + activeClasses}
            >
              {content}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default BottomNav;


