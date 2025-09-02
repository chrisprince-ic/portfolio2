'use client';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

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
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar mode="blog" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <Link href="/blog" className="text-blue-600 dark:text-blue-400 hover:underline">← Back to blog</Link>
        <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">{post.title}</h1>
        <article className="prose dark:prose-invert prose-blue max-w-none mt-6">
          <p>{post.body}</p>
          <h3>Key takeaways</h3>
          <ul>
            <li>Invest in fundamentals: architecture, performance, accessibility.</li>
            <li>Close the loop with tests, telemetry, and code reviews.</li>
          </ul>
        </article>
      </div>
    </section>
  );
}


