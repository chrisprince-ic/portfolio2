'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Play, X } from 'lucide-react';
import Navbar from '@/components/Navbar';

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
  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar mode="blog" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Insights & Writing
          </h1>
          <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Thoughts on AI, engineering, and building delightful products.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {posts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all overflow-hidden"
            >
              {post.videoId && (
                <button
                  type="button"
                  onClick={() => setActiveVideo(post.videoId)}
                  className="relative w-full aspect-video overflow-hidden"
                  aria-label={`Play video for ${post.title}`}
                >
                  <Image
                    src={`https://img.youtube.com/vi/${post.videoId}/hqdefault.jpg`}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/90 text-gray-900 shadow-lg group-hover:scale-105 transition-transform">
                      <Play className="w-6 h-6" />
                    </span>
                  </div>
                </button>
              )}
              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-3">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>{post.readTime}</span>
                  <Link href={`/blog/${post.slug}`} className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
                    Read more
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
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
    </section>
  );
}


