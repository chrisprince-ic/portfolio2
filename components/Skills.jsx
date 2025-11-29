'use client';
import { motion } from 'framer-motion';

const Skills = () => {
  const allSkills = [
    "React.js",
    "Next.js", 
    "Tailwind CSS",
    "CSS",
    "Java",
    "C++",
    "C#",
    "Firebase",
    "Vercel",
    "Netlify",
    "Figma"
  ];

  return (
    <section className="py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-0">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Skills & Technologies
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto">
            Here are the technologies and tools I use to bring ideas to life.
          </p>
        </motion.div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 text-center">
              Skills
            </h3>
            
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-5xl mx-auto">
              {allSkills.map((skill, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.04 }}
                  className="px-4 py-2 bg-slate-50 text-teal-700 text-sm font-medium rounded-full border border-slate-200 hover:border-teal-400 hover:bg-white transition-all duration-300"
                >
                  {skill}
                </motion.span>
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
          <h3 className="text-2xl font-semibold text-slate-900 mb-8">
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
                className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-full border border-slate-200 hover:bg-white hover:border-teal-400 transition-all duration-300"
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