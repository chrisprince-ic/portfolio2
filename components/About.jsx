'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const About = () => {
  return (
    <section className="py-16 sm:py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
            About Me
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            I&apos;m a passionate Softwaredeveloper skilled in React, Next.js, Vite, Tailwind, and More. 
            I build fast and beautiful web apps with a focus on clean UI/UX.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <div className="mx-auto lg:mx-0 mb-8">
              <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full border-4 border-white dark:border-gray-700 shadow-2xl overflow-hidden relative">
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
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Detail-oriented and innovative Web Developer with a strong background in creating responsive, scalable web applications.
              Known for delivering user-friendly interfaces, integrating reliable backend systems, and optimizing performance to enhance
              the user experience. A collaborative problem-solver who adapts quickly, learns fast, and brings fresh ideas to tackle real-
              world challenges with code.
            </p>
            
            <div className="grid grid-cols-1 gap-6 sm:gap-8 max-w-4xl mx-auto">
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
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 p-8 sm:p-10 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex items-center gap-6">
                    <div className="text-4xl sm:text-5xl flex-shrink-0">{item.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                      <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 font-medium leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;