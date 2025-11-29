'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Play, X, Home } from 'lucide-react';

const posts = [
  {
    slug: 'will-ai-replace-software-engineers',
    title: 'Will AI Replace Software Engineers?',
    excerpt: 'Exploring the realities behind AI automation and the enduring role of human creativity in engineering.',
    tags: ['AI', 'Career', 'Future of Work'],
    readTime: '4 min read'
  },
  {
    slug: 'my-take-ai-and-engineering',
    title: 'My Take: AI and the Future of Engineering',
    excerpt: 'A personal perspective on balancing AI assistance with craftsmanship and ownership.',
    tags: ['Opinion', 'AI Tools'],
    readTime: '3 min read'
  },
  {
    slug: 'how-to-use-ai-to-your-advantage',
    title: 'How to Use AI to Your Advantage as a Developer',
    excerpt: 'Practical workflows to ship faster: prompts, review loops, and safety checks.',
    tags: ['Guides', 'Productivity', 'AI'],
    readTime: '6 min read'
  },
  // Project inspiration posts
  {
    slug: 'inspiration-icecomm',
    title: 'Inspiration Behind IceComm',
    excerpt: 'Designing frictionless e‑commerce: trust signals, speed, and clarity.',
    tags: ['Inspiration', 'UX', 'E‑commerce'],
    readTime: '3 min read',
    videoId: '5mkiX7Tzl04'
  },
  {
    slug: 'inspiration-youtube-clone',
    title: 'Inspiration Behind the YouTube Clone',
    excerpt: 'Studying video UX, engagement loops, and creator‑centric patterns.',
    tags: ['Inspiration', 'Video', 'Product'],
    readTime: '4 min read',
    videoId: 'CZcQhpb76fI'
  },
  {
    slug: 'inspiration-netflix-clone',
    title: 'Inspiration Behind the Netflix Clone',
    excerpt: 'Cinematic browsing: previews, recommendations, and micro‑interactions.',
    tags: ['Inspiration', 'Streaming', 'UI'],
    readTime: '4 min read',
    videoId: '5AaBUpkAEU0'
  },
  {
    slug: 'inspiration-studyconnect',
    title: 'Inspiration Behind StudyConnect',
    excerpt: 'Peer learning, lightweight collaboration, and student‑first flows.',
    tags: ['Inspiration', 'Education', 'UX'],
    readTime: '3 min read',
    videoId: 'nnMDjtnlM_I'
  },
  {
    slug: 'inspiration-nextjs-blog',
    title: 'Inspiration Behind the Next.js Blog',
    excerpt: 'Typography‑first writing with minimal UI and fast loads.',
    tags: ['Inspiration', 'Blog', 'Design'],
    readTime: '2 min read'
  }
];

export default function BlogPage() {
  const [activeVideo, setActiveVideo] = useState(null);

  const noteColors = [
    'bg-amber-100',
    'bg-sky-100',
    'bg-emerald-100',
    'bg-rose-100',
    'bg-violet-100',
  ];
  const noteRotations = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2', 'rotate-0'];

  return (
    <section className="py-16 sm:py-20 min-h-screen relative">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-0 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
            Insights &amp; notes
          </h1>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
            Short thoughts on AI, engineering, and building products — captured like notes on the same paper.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-8">
          {posts.map((post, i) => {
            const color = noteColors[i % noteColors.length];
            const rotate = noteRotations[i % noteRotations.length];
            return (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                whileHover={{ y: -6, rotate: 0 }}
                className={`relative transition-transform duration-300 shadow-[0_16px_32px_rgba(15,23,42,0.16)] border border-slate-200/80 px-4 py-4 sm:px-5 sm:py-5 overflow-hidden group ${color} ${rotate}`}
              >
                {post.videoId && (
                  <button
                    type="button"
                    onClick={() => setActiveVideo(post.videoId)}
                    className="relative w-full aspect-video overflow-hidden border border-slate-200/70 mb-3 sm:mb-4"
                    aria-label={`Play video for ${post.title}`}
                  >
                    <Image
                      src={`https://img.youtube.com/vi/${post.videoId}/hqdefault.jpg`}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/95 text-slate-900 shadow-md group-hover:scale-105 transition-transform">
                        <Play className="w-5 h-5" />
                      </span>
                    </div>
                  </button>
                )}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-[11px] px-2 py-0.5 rounded-full bg-white/80 text-slate-700 border border-slate-200 font-handwritten"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-1 font-handwritten">
                  {post.title}
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-slate-700">
                  {post.excerpt}
                </p>
                <div className="mt-3 flex items-center justify-between text-[11px] sm:text-xs text-slate-600">
                  <span>{post.readTime}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-medium text-slate-900 underline underline-offset-4 decoration-slate-400 hover:decoration-teal-500"
                  >
                    Read note
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70" onClick={() => setActiveVideo(null)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative w-[92vw] md:w-[80vw] lg:w-[60vw] aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setActiveVideo(null)}
              className="absolute top-3 right-3 z-10 inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/90 text-gray-900 hover:bg-white"
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            />
          </motion.div>
        </div>
      )}

      {/* Simple bottom nav just for Home on blog list page */}
      <div className="fixed inset-x-0 bottom-5 z-40 flex justify-center pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/95 shadow-[0_18px_38px_rgba(15,23,42,0.2)] backdrop-blur-md px-4 py-2 sm:px-6 sm:py-3">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <Home className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Home</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
