'use client';
import { motion } from 'framer-motion';

const Skills = () => {
  const allSkills = [
    { name: "React.js", icon: "⚛️", color: "bg-blue-500" },
    { name: "Next.js", icon: "▲", color: "bg-black" },
    { name: "Tailwind CSS", icon: "🎨", color: "bg-cyan-500" },
    { name: "CSS", icon: "🎨", color: "bg-blue-600" },
    { name: "Java", icon: "☕", color: "bg-orange-500" },
    { name: "C++", icon: "🔵", color: "bg-blue-700" },
    { name: "C#", icon: "💜", color: "bg-purple-600" },
    { name: "Firebase", icon: "🔥", color: "bg-orange-500" },
    { name: "Vercel", icon: "▲", color: "bg-black" },
    { name: "Netlify", icon: "🌐", color: "bg-green-500" },
    { name: "Figma", icon: "🎨", color: "bg-purple-500" }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Skills & Technologies
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Here are the technologies and tools I use to bring ideas to life.
          </p>
        </motion.div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white text-center">
              Skills
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8 max-w-5xl mx-auto">
              {allSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="aspect-square bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group border border-gray-200 dark:border-gray-600 flex flex-col justify-center items-center"
                >
                  <div className="text-4xl sm:text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {skill.icon}
                  </div>
                  <h4 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                    {skill.name}
                  </h4>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Additional Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
            Additional Skills
          </h3>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {[
              'Shadcn/ui', 'Framer Motion', 'APIs', 'JavaScript', 'TypeScript',
              'HTML', 'Git', 'GitHub', 'Responsive Design', 'UI/UX Design',
              'Performance Optimization', 'SEO', 'Accessibility', 'Testing'
            ].map((skill, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.9 + (index * 0.02) }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-full border border-blue-200 dark:border-blue-700 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all duration-300"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills; 