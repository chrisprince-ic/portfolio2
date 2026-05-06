'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Linkedin, Github, Twitter, Mail, X } from 'lucide-react';

const SocialMedia = () => {
  const [isOpen, setIsOpen] = useState(false);

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://linkedin.com/in/christian-ikirezi',
      color: 'hover:bg-blue-600 hover:text-white',
    },
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/chrisprince-ic',
      color: 'hover:bg-slate-900 hover:text-white',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: 'https://twitter.com/yourhandle',
      color: 'hover:bg-sky-500 hover:text-white',
    },
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:your.email@example.com',
      color: 'hover:bg-teal-600 hover:text-white',
    },
  ];

  return (
    <div className="fixed bottom-5 left-4 sm:left-1/2 sm:-translate-x-[380px] lg:-translate-x-[420px] z-50 pointer-events-none">
      <div className="relative pointer-events-auto">
        {/* Main toggle button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 rounded-full bg-white border border-slate-200/90 shadow-[0_18px_38px_rgba(15,23,42,0.2)] backdrop-blur-md flex items-center justify-center text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors"
          aria-label="Toggle social media links"
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Share2 className="w-5 h-5" />
            )}
          </motion.div>
        </motion.button>

        {/* Expanded social links */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-14 left-0 flex flex-col gap-2"
            >
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                    whileHover={{ scale: 1.1, x: 4 }}
                    className={`w-12 h-12 rounded-full bg-white border border-slate-200/90 shadow-[0_12px_24px_rgba(15,23,42,0.15)] backdrop-blur-md flex items-center justify-center text-slate-600 transition-all duration-300 ${social.color}`}
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SocialMedia;

