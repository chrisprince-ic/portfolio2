'use client';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

const content = {
  'will-ai-replace-software-engineers': {
    title: 'Will AI Replace Software Engineers?',
    body: `Short answer: no — but roles will shift. AI is accelerating code generation and review, yet product sense, architecture, and ownership remain distinctly human. The best engineers will increasingly orchestrate systems, validate outcomes, and translate ambiguous goals into shipped value.`
  },
  'my-take-ai-and-engineering': {
    title: 'My Take: AI and the Future of Engineering',
    body: `AI is a force multiplier. I lean on it for scaffolding, tests, refactors, and idea exploration. But I always keep a human-in-the-loop cycle: define intent clearly, prompt narrowly, verify outputs, and iterate. Quality comes from judgment.`
  },
  'how-to-use-ai-to-your-advantage': {
    title: 'How to Use AI to Your Advantage as a Developer',
    body: `A practical loop: (1) Outline a plan, (2) Prompt for scaffolds, (3) Add constraints, (4) Run and verify, (5) Tighten tests, (6) Refactor with AI assistance. Keep security, performance budgets, and readability as non-negotiables.`
  },
  // Project inspirations
  'inspiration-icecomm': {
    title: 'Inspiration Behind IceComm',
    body: `IceComm draws from best-in-class e‑commerce patterns: clear hierarchy, trust badges, transparent shipping, and fast checkout. I prioritized speed (Next.js + image optimization), predictable spacing, and strong visual cues to reduce cognitive load.`
  },
  'inspiration-youtube-clone': {
    title: 'Inspiration Behind the YouTube Clone',
    body: `I studied attention loops in creator platforms: autoplay decisions, comment threading, and recommendations. The goal was to replicate intuitive navigation while keeping performance budgets tight and accessibility in mind.`
  },
  'inspiration-netflix-clone': {
    title: 'Inspiration Behind the Netflix Clone',
    body: `Cinematic feel through generous spacing, hover-driven previews, and bold typography. I focused on content discovery: carousels, categories, and subtle motion that adds depth without distracting from the media.`
  },
  'inspiration-studyconnect': {
    title: 'Inspiration Behind StudyConnect',
    body: `Talking to students surfaced a need for low-friction collaboration: share notes quickly, form groups, and keep things lightweight. I leaned on Firebase for realtime simplicity and built flows that reduce steps to contribution.`
  },
  'inspiration-nextjs-blog': {
    title: 'Inspiration Behind the Next.js Blog',
    body: `I designed the blog around readability: comfortable line length, strong contrast, and minimal UI. Pages load fast and avoid distractions, keeping the focus on ideas and flow.`
  }
};

export default function BlogPost({ params }) {
  const post = content[params.slug];
  if (!post) return notFound();

  return (
    <section className="min-h-screen py-16 sm:py-20 relative">
      <div className="max-w-3xl mx-auto px-3 sm:px-4 lg:px-0 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-12"
        >
          <Link
            href="/blog"
            className="inline-flex items-center text-xs sm:text-sm text-slate-600 hover:underline underline-offset-4"
          >
            ← Back to blog
          </Link>
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-slate-900 font-handwritten">
            {post.title}
          </h1>
        </motion.div>
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="space-y-6 text-slate-800 text-sm sm:text-base leading-relaxed"
        >
          <p>{post.body}</p>
          <div className="mt-4 border-l-2 border-slate-900/40 pl-4 py-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 mb-1">
              Key takeaways
            </h3>
            <ul className="list-disc list-outside pl-4 space-y-1 text-slate-700 text-sm">
              <li>Invest in fundamentals: architecture, performance, accessibility.</li>
              <li>Close the loop with tests, telemetry, and thoughtful code reviews.</li>
            </ul>
          </div>
        </motion.article>
      </div>

      {/* Simple bottom nav just for Home on blog detail page */}
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


