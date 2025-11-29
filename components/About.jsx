'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const About = () => {
  const noteConfigs = [
    { bg: 'bg-amber-100', border: 'border-amber-200', rotate: '-rotate-2' },
    { bg: 'bg-sky-100', border: 'border-sky-200', rotate: 'rotate-1' },
  ];

  return (
    <section className="py-10 sm:py-12">
      <div className="max-w-6xl mx-auto px-2 sm:px-4 lg:px-0">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-3 sm:mb-4">
            About Me
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
            I&apos;m a passionate Software Developer skilled in React, Next.js, Vite, Tailwind, and more. 
            I build fast and beautiful web apps with a focus on clean, human‑centered interfaces.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <div className="mx-auto lg:mx-0 mb-6 sm:mb-8">
              <div className="w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 rounded-3xl overflow-hidden relative bg-slate-50 border border-slate-200/60">
                <Image
                  src="/profile-img.png"
                  alt="Christian Ikirezi"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, 320px"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6 order-1 lg:order-2"
          >
            <div className="grid grid-cols-1 gap-4 sm:gap-5">
              {[
                {
                  title: "Education",
                  description: "York University - Honors Bachelor degree in Computer Science with specialization in Software Development",
                  icon: "🎓"
                },
                {
                  title: "Experience",
                  description: "Built 20+ projects across various domains",
                  icon: "🚀"
                }
              ].map((item, index) => {
                const config = noteConfigs[index % noteConfigs.length];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -4, rotate: 0 }}
                    className={`inline-block px-4 py-3 sm:px-5 sm:py-4 shadow-[0_14px_26px_rgba(15,23,42,0.18)] border ${config.bg} ${config.border} ${config.rotate}`}
                  >
                    <div className="flex items-start gap-4 sm:gap-5">
                      <div className="text-2xl sm:text-3xl flex-shrink-0">{item.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-1.5 font-handwritten">{item.title}</h3>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;