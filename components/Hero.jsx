'use client';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import Image from 'next/image';

const Hero = ({ scrollToSection }) => {
  return (
    <section className="relative py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-10 lg:gap-14 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-left space-y-6 lg:space-y-8 order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-slate-50 px-3 py-1 text-[11px] sm:text-xs tracking-[0.18em] uppercase"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
              <span>Available for software roles</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            >
              <span className="text-slate-900">Christian Ikirezi</span>
              <span className="block mt-2 text-lg sm:text-xl font-normal text-slate-500">
                Software Engineer • Web Experiences • Product‑focused
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-2 sm:gap-3"
            >
              {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Firebase', 'Git', 'And More'].map(
                (tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.06 }}
                    className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium shadow-sm hover:shadow-md transition-all duration-300 border ${
                      tech === 'And More'
                        ? 'bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 border-teal-300'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    {tech}
                  </motion.span>
                )
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection('projects')}
                className="group flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 font-semibold rounded-full shadow-[0_14px_30px_rgba(15,23,42,0.2)] hover:shadow-[0_18px_40px_rgba(15,23,42,0.25)] transition-all duration-300 transform text-sm sm:text-base"
              >
                View My Work
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                href="/ChristianIkireziResume.pdf"
                download
                className="group flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-3.5 bg-slate-50 border border-slate-200 text-slate-800 font-semibold rounded-full hover:border-teal-400 hover:text-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-y-[-2px] transition-transform duration-300" />
                Download Resume
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right side - Profile / stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <div className="relative">
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute inset-0 w-64 sm:w-80 h-64 sm:h-80 bg-gradient-to-r from-teal-500/8 to-cyan-400/8 rounded-full blur-2xl"
              />

              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-48 h-48 sm:w-60 sm:h-60 md:w-64 md:h-64 overflow-hidden shadow-[0_18px_30px_rgba(15,23,42,0.2)] border border-slate-200 bg-slate-50"
                >
                  <Image
                    src="/profile-img.png"
                    alt="Christian Ikirezi"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, 288px"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20, rotate: -2 }}
                  animate={{ opacity: 1, y: 0, rotate: -4 }}
                  transition={{ duration: 0.8, delay: 1.5 }}
                  className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 bg-rose-100 p-3 sm:p-4 shadow-[0_12px_24px_rgba(15,23,42,0.2)] border border-rose-200"
                >
                  <div className="text-center">
                      <div className="text-lg sm:text-2xl font-bold text-rose-900">20+ Projects</div>
                      <div className="text-xs sm:text-sm text-rose-700">Shipped & maintained</div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20, rotate: 3 }}
                  animate={{ opacity: 1, y: 0, rotate: 5 }}
                  transition={{ duration: 0.8, delay: 1.7 }}
                  className="absolute -top-4 sm:-top-6 -right-4 sm:-right-6 bg-sky-100 text-slate-950 p-3 sm:p-4 shadow-[0_12px_24px_rgba(15,23,42,0.2)] border border-sky-200"
                >
                  <div className="text-center">
                    <div className="text-lg sm:text-2xl font-bold">5+ yrs</div>
                    <div className="text-xs sm:text-sm opacity-90">Web experience</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
