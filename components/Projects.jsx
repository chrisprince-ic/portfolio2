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

  const noteColors = [
    'bg-amber-100',
    'bg-sky-100',
    'bg-emerald-100',
    'bg-rose-100',
    'bg-violet-100',
  ];

  const noteRotations = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2', 'rotate-0'];

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
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 sm:mb-5">
            Featured Projects
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto">
            Here are some of my recent projects that showcase my skills and passion for web development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 sm:gap-8">
          {projects.map((project, index) => (
            (() => {
              const color = noteColors[index % noteColors.length];
              const rotate = noteRotations[index % noteRotations.length];
              return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.12 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, rotate: 0 }}
              className={`relative transition-transform duration-300 overflow-hidden group shadow-[0_18px_40px_rgba(15,23,42,0.18)] border border-slate-200/80 ${color} ${rotate} px-4 py-4 sm:px-5 sm:py-5`}
            >
              <div className="aspect-video relative overflow-hidden border border-slate-200/60 mb-3 sm:mb-4">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-teal-500 text-slate-950 flex items-center justify-center text-xs font-bold">
                    {project.title.split(' ').map(word => word[0]).join('').slice(0,3)}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900 font-handwritten">{project.title}</h3>
                </div>
                <p className="text-sm sm:text-base text-slate-600 mb-2">{project.description}</p>

                {/* Link row moved higher so it's always visible without scrolling */}
                <div className="mb-3 flex flex-wrap gap-3 text-[11px] sm:text-xs text-slate-800">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 text-slate-50 px-3 py-1 shadow-sm hover:bg-slate-800 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live preview</span>
                  </a>
                  {project.video && (
                    <a
                      href={project.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 text-slate-50 px-3 py-1 shadow-sm hover:bg-rose-500 transition-colors"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Video walkthrough</span>
                    </a>
                  )}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/90 text-slate-900 px-3 py-1 shadow-sm border border-slate-300 hover:bg-slate-50 transition-colors"
                  >
                    <Code className="w-3.5 h-3.5" />
                    <span>GitHub code</span>
                  </a>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 sm:p-4 mb-4">
                  <div className="text-[0.7rem] uppercase tracking-[0.18em] text-slate-500 mb-1">Inspiration</div>
                  <div className="text-sm sm:text-base text-slate-900 font-medium">{project.inspirationTitle}</div>
                  <p className="mt-1 text-xs sm:text-sm text-slate-500">{project.inspirationDesc}</p>
                </div>
                <div className="flex flex-wrap gap-2 mb-1 sm:mb-2">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="px-2 sm:px-3 py-1 bg-slate-50 text-teal-700 text-xs sm:text-sm rounded-full border border-slate-200">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-auto" />
              </div>
            </motion.div>
              );
            })()
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 