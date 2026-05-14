'use client';
import { motion } from 'framer-motion';
import { ExternalLink, Github, CheckCircle2, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import macroviaImg from '@/assets/macrovia.png';
import exetasyImg from '@/assets/exetasy.png';

const PRODUCTS = [
  {
    slug: 'macrovia',
    name: 'Macrovia',
    tagline: 'AI nutrition and calorie tracker',
    liveUrl: 'https://macrovia.health',
    githubUrl: 'https://github.com/chrisprince-ic/caltrackai',
    description:
      "A full-stack nutrition platform I built and launched for iOS and web. It pulls health and biometric data from Apple HealthKit, uses OpenAI to analyze meals, and generates personalized calorie and macro targets based on the user's actual goal — weight loss, maintenance, or muscle gain. Shipped to 20+ beta users.",
    highlights: [
      'Personalized calorie and macro targets',
      'Apple HealthKit data integration',
      'Stripe subscriptions with webhook automation',
      'Firebase auth and real-time data sync',
      'OpenAI-powered meal analysis',
      'Responsive across mobile and desktop',
    ],
    stats: [
      { label: 'Beta users', value: '20+' },
      { label: 'Integrations', value: '5+' },
      { label: 'Platform', value: 'iOS & Web' },
    ],
    tech: ['Next.js', 'TypeScript', 'Firebase', 'OpenAI API', 'Apple HealthKit', 'Stripe', 'Tailwind CSS', 'Vercel'],
    accentBar: 'from-cyan-400 to-teal-400',
    dotColor: 'bg-teal-400',
    image: macroviaImg,
  },
  {
    slug: 'exetasy',
    name: 'Exetasy',
    tagline: 'AI exam generation, lab testing and interview prep',
    liveUrl: 'https://exetasy.com',
    githubUrl: 'https://github.com/chrisprince-ic/examify',
    description:
      'An online AI education platform with three tools built for students. An AI exam generator with real-time proctoring and timed conditions so it feels like a real test. An AI lab environment for CS students with a timed in-browser IDE, multi-language support, and automated backend test case evaluation. And an AI interviewer that runs mock interviews and gives specific feedback.',
    highlights: [
      'AI exam generation with real-time proctoring',
      'Timed conditions that simulate real exams',
      'In-browser IDE with multi-language support',
      'Automated backend test case evaluation',
      'AI interviewer with feedback and skill tips',
      'Performance tracking and skill recommendations',
    ],
    stats: [
      { label: 'Products', value: '3' },
      { label: 'IDE', value: 'Multi-lang' },
      { label: 'AI core', value: 'OpenAI' },
    ],
    tech: ['Next.js', 'TypeScript', 'Firebase', 'OpenAI API', 'Tailwind CSS', 'Vercel'],
    accentBar: 'from-violet-400 to-indigo-400',
    dotColor: 'bg-violet-400',
    image: exetasyImg,
  },
];

function BrowserMockup({ url, image, name }) {
  return (
    <div className="w-full rounded-xl overflow-hidden border border-slate-200 shadow-[0_8px_24px_rgba(15,23,42,0.10)]">
      {/* Chrome bar */}
      <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 border-b border-slate-200">
        <span className="w-2 h-2 rounded-full bg-red-400/70" />
        <span className="w-2 h-2 rounded-full bg-amber-400/70" />
        <span className="w-2 h-2 rounded-full bg-green-400/70" />
        <div className="ml-2 flex-1 bg-white rounded px-2.5 py-0.5 text-[10px] text-slate-400 font-mono border border-slate-200 truncate flex items-center gap-1">
          <span className="text-slate-300">https://</span>{url}
        </div>
        <ArrowUpRight className="w-3 h-3 text-slate-400 shrink-0" />
      </div>
      {/* Screenshot */}
      <div className="relative aspect-[16/10] w-full bg-slate-50">
        <Image
          src={image}
          alt={`${name} live preview`}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  return (
    <section className="py-10 sm:py-12">
      <div className="max-w-6xl mx-auto px-2 sm:px-4 lg:px-0">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 sm:mb-5">
            Shipped Products
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto">
            Full-stack products I built, launched, and put in front of real users.
          </p>
        </motion.div>

        {/* Product cards */}
        <div className="flex flex-col gap-7 sm:gap-8">
          {PRODUCTS.map((product, index) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.12 }}
              viewport={{ once: true }}
              className="bg-white border border-slate-200/80 shadow-[0_18px_40px_rgba(15,23,42,0.10)] overflow-hidden"
            >
              {/* Accent bar */}
              <div className={`h-[3px] w-full bg-gradient-to-r ${product.accentBar}`} />

              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left: content */}
                <div className="p-6 sm:p-8 flex flex-col gap-5 border-b lg:border-b-0 lg:border-r border-slate-100">

                  {/* Live badge + name */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${product.dotColor} animate-pulse`} />
                      <span className="text-[11px] font-medium text-slate-500 tracking-wide uppercase">Live</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1 font-handwritten">
                      {product.name}
                    </h3>
                    <p className="text-sm text-slate-500">{product.tagline}</p>
                  </div>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-3">
                    {product.stats.map((stat) => (
                      <div key={stat.label} className="flex flex-col px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                        <span className="text-xl font-bold text-slate-900">{stat.value}</span>
                        <span className="text-[11px] text-slate-500 mt-0.5">{stat.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed">{product.description}</p>

                  {/* Highlights */}
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                    {product.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0 text-teal-500" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {product.tech.map((t) => (
                      <span key={t} className="px-2.5 py-1 bg-slate-50 text-teal-700 text-xs font-medium rounded-full border border-slate-200">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-wrap gap-3 mt-auto pt-1">
                    <a
                      href={product.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 text-slate-50 px-4 py-2 text-xs shadow-sm hover:bg-slate-800 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Live preview
                    </a>
                    <a
                      href={product.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-white text-slate-900 px-4 py-2 text-xs shadow-sm border border-slate-300 hover:bg-slate-50 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      GitHub
                    </a>
                  </div>
                </div>

                {/* Right: browser mockup */}
                <div className="p-5 sm:p-7 flex items-center bg-slate-50/50">
                  <BrowserMockup
                    url={product.liveUrl.replace('https://', '')}
                    image={product.image}
                    name={product.name}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
