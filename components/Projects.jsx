'use client';
import { motion } from 'framer-motion';
import { ExternalLink, Code, Play } from 'lucide-react';
import Image from 'next/image';

const Projects = () => {
  const projects = [
    {
      title: "IceComm",
      description: "Online marketplace with fast delivery.",
      inspirationTitle: "Inspired by frictionless shopping",
      inspirationDesc: "Explored checkout flows and trust signals from top e‑commerce brands to craft a clean and fast experience.",
      image: "/ecomm.png",
      link: "https://icecommwebsite.vercel.app/",
      github: "#",
      video: "https://youtu.be/5mkiX7Tzl04",
      technologies: ["Next.js", "React", "Tailwind CSS"]
    },
    {
      title: "YouTube Clone",
      description: "YouTube clone: streaming, auth, comments.",
      inspirationTitle: "Learning at scale",
      inspirationDesc: "Built to understand video delivery patterns and engagement loops found in creator platforms.",
      image: "/youtube.png",
      link: "https://youtube-clone-five-flame.vercel.app/",
      github: "https://github.com/chrisprince-ic/youtube-clone",
      video: "https://youtu.be/CZcQhpb76fI",
      technologies: ["React", "Next.js", "Firebase", "Tailwind CSS"]
    },
    {
      title: "Netflix Clone",
      description: "Streaming UI with profiles and TMDB.",
      inspirationTitle: "Cinematic UX",
      inspirationDesc: "Focused on rich browsing, hover previews, and recommendation layout patterns.",
      image: "/netflix.png",
      link: "https://netflix-three-sigma.vercel.app/",
      github: "https://github.com/chrisprince-ic/Netflix",
      video: "https://youtu.be/5AaBUpkAEU0",
      technologies: ["React", "Next.js", "Tailwind CSS", "TMDB API"]
    },
    {
      title: "StudyConnect Platform",
      description: "Students connect, collaborate, share resources.",
      inspirationTitle: "Peer learning",
      inspirationDesc: "Designed from discussions with students needing lightweight spaces to share notes and form study groups.",
      image: "/studyconnect.png",
      link: "https://study-connect-ochre.vercel.app/",
      github: "https://github.com/chrisprince-ic/StudyConnect",
      video: "https://youtu.be/nnMDjtnlM_I",
      technologies: ["Next.js", "Tailwind CSS", "Firebase"]
    },
    {
      title: "Next.js Blog",
      description: "Modern blog with responsive design.",
      inspirationTitle: "Writing, simplified",
      inspirationDesc: "Kept typography first with minimal UI to focus on ideas over interface.",
      image: "/blog.png",
      link: "https://next-blog-starter-psi.vercel.app/",
      github: "https://github.com/chrisprince-ic/next-blog-starter",
      technologies: ["Next.js", "CSS"]
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
            Featured Projects
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Here are some of my recent projects that showcase my skills and passion for web development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-200 dark:border-gray-700"
            >
              <div className="aspect-video relative overflow-hidden rounded-t-2xl border border-gray-300 dark:border-gray-700">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                    {project.title.split(' ').map(word => word[0]).join('').slice(0,3)}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">{project.title}</h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                <div className="bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-lg p-3 sm:p-4 mb-4">
                  <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">Inspiration</div>
                  <div className="text-sm sm:text-base text-gray-800 dark:text-gray-200 font-medium">{project.inspirationTitle}</div>
                  <p className="mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400">{project.inspirationDesc}</p>
                </div>
                <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="px-2 sm:px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs sm:text-sm rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-3 sm:px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                  {project.video && (
                    <a
                      href={project.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-red-600 text-white py-2 px-3 sm:px-4 rounded-lg hover:bg-red-700 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                      <Play className="w-4 h-4" />
                      Video
                    </a>
                  )}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-3 sm:px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <Code className="w-4 h-4" />
                    Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 