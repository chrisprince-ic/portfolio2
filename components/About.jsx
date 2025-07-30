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
            I&apos;m a passionate frontend developer skilled in React, Next.js, Vite, Tailwind, and Figma. 
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
            <Image
              src="/profile-img.png"
              alt="Christian Ikirezi"
              width={300}
              height={300}
              className="mx-auto lg:mx-0 rounded-full border-4 border-white dark:border-gray-700 shadow-2xl mb-8 w-64 h-64 sm:w-80 sm:h-80 object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6 order-1 lg:order-2"
          >
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              I&apos;m a detail-oriented and innovative React JS Front-End Developer with over 5 years of experience 
              creating responsive, scalable, and high-performance web applications. Currently, I&apos;m focused on 
              building accessible and user-friendly web experiences.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  title: "Languages",
                  description: "HTML, CSS, JavaScript, React.js, Next.js",
                  icon: "💻"
                },
                {
                  title: "Education",
                  description: "B.Tech in Computer Science",
                  icon: "🎓"
                },
                {
                  title: "Projects",
                  description: "Built more than 5 projects",
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
                  className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-600"
                >
                  <div className="text-2xl sm:text-3xl mb-3">{item.icon}</div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
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