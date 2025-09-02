'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
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
    readTime: '3 min read'
  },
  {
    slug: 'inspiration-youtube-clone',
    title: 'Inspiration Behind the YouTube Clone',
    excerpt: 'Studying video UX, engagement loops, and creator‑centric patterns.',
    tags: ['Inspiration', 'Video', 'Product'],
    readTime: '4 min read'
  },
  {
    slug: 'inspiration-netflix-clone',
    title: 'Inspiration Behind the Netflix Clone',
    excerpt: 'Cinematic browsing: previews, recommendations, and micro‑interactions.',
    tags: ['Inspiration', 'Streaming', 'UI'],
    readTime: '4 min read'
  },
  {
    slug: 'inspiration-studyconnect',
    title: 'Inspiration Behind StudyConnect',
    excerpt: 'Peer learning, lightweight collaboration, and student‑first flows.',
    tags: ['Inspiration', 'Education', 'UX'],
    readTime: '3 min read'
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
    </section>
  );
}


