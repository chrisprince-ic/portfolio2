'use client';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Globe } from 'lucide-react';

const Contact = () => {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-0">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
            Let&apos;s Work Together
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
            I&apos;m always open to discussing new opportunities and exciting projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8 sm:space-y-10 order-2 lg:order-1"
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-3">Let&apos;s talk</h3>
              <p className="text-sm sm:text-base text-slate-600 max-w-md">
                A quick message is often all it takes to get a project started. Tell me what you&apos;re building and we&apos;ll figure it out together.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 14, rotate: -2 }}
                whileInView={{ opacity: 1, y: 0, rotate: -3 }}
                viewport={{ once: true }}
                className="inline-block bg-amber-100 px-4 py-3 sm:px-5 sm:py-4 shadow-[0_14px_26px_rgba(15,23,42,0.18)] border border-amber-200"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="mt-0.5">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-amber-800" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-slate-900">Email</h4>
                    <p className="text-xs sm:text-sm text-slate-700">christianikirezi@gmail.com</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14, rotate: 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 3 }}
                viewport={{ once: true }}
                className="inline-block bg-sky-100 px-4 py-3 sm:px-5 sm:py-4 shadow-[0_14px_26px_rgba(15,23,42,0.18)] border border-sky-200"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="mt-0.5">
                    <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-sky-800" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-slate-900">Location</h4>
                    <p className="text-xs sm:text-sm text-slate-700">Toronto, Canada (open to remote)</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="flex space-x-3 sm:space-x-4 pt-2">
              <a
                href="https://github.com/chrisprince-ic"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <Github className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </a>
              <a
                href="https://www.linkedin.com/in/christian-ikirezi-8b395021a/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-4 sm:mb-6">
              Send a quick note
            </h3>
            <form className="space-y-5 sm:space-y-6 max-w-md">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-600 mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full border-b border-slate-300 bg-transparent pb-1.5 text-sm sm:text-base text-slate-900 focus:outline-none focus:border-teal-500 transition-colors"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-600 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full border-b border-slate-300 bg-transparent pb-1.5 text-sm sm:text-base text-slate-900 focus:outline-none focus:border-teal-500 transition-colors"
                  placeholder="you@example.com"
                />
              </div>
              
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-600 mb-1.5">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full border border-dashed border-slate-300 rounded-xl p-3 sm:p-4 text-sm sm:text-base text-slate-900 bg-white/60 focus:outline-none focus:border-teal-500 focus:bg-white transition-colors resize-none"
                  placeholder="Share a few lines about what you’d like to build…"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-slate-900 text-white rounded-full text-sm sm:text-base font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <span>Send message</span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;