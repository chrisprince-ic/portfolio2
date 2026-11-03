export const EMAIL = 'christianikirezi@gmail.com';
export const LINKS = {
  resume: '/ChristianIkireziResume.pdf',
  github: 'https://github.com/chrisprince-ic',
  linkedin: 'https://linkedin.com/in/christian-ikirezi',
};

export const SECTIONS = [
  ['intro', '01', 'Intro'],
  ['work', '02', 'Work'],
  ['toolbox', '03', 'Toolbox'],
  ['contact', '04', 'Contact'],
];

export const PROJECTS = [
  {
    id: 'macrovia', name: 'Macrovia', tagline: 'AI nutrition and calorie tracker for iOS and web',
    short: 'Next.js · HealthKit · OpenAI · Stripe', url: 'https://macrovia.health', github: 'https://github.com/chrisprince-ic/caltrackai',
    image: '/macrovia.png',
    metrics: [{ v: '20+', l: 'Beta users' }, { v: '5+', l: 'Integrations' }, { v: 'iOS + Web', l: 'Platform' }],
    desc: "A full-stack nutrition platform I built and launched for iOS and web. It pulls health and biometric data from Apple HealthKit, uses OpenAI to analyze meals, and generates personalized calorie and macro targets based on the user's actual goal: weight loss, maintenance, or muscle gain.",
    features: ['Personalized calorie and macro targets', 'Apple HealthKit data integration', 'Stripe subscriptions with webhook automation', 'Firebase auth and real-time sync', 'OpenAI-powered meal analysis', 'Responsive across mobile and desktop'],
    stack: ['Next.js', 'TypeScript', 'Firebase', 'OpenAI API', 'Apple HealthKit', 'Stripe', 'Tailwind CSS', 'Vercel'],
  },
  {
    id: 'exetasy', name: 'Exetasy', tagline: 'AI exam generation, lab testing and interview prep',
    short: 'Next.js · OpenAI · In-browser IDE', url: 'https://exetasy.com', github: 'https://github.com/chrisprince-ic/examify',
    image: '/exetasy.png',
    metrics: [{ v: '3', l: 'Products' }, { v: 'Multi-language', l: 'IDE' }, { v: 'OpenAI', l: 'AI core' }],
    desc: 'An AI education platform with three tools for students: an exam generator with real-time proctoring and timed conditions, a lab environment with an in-browser IDE and automated backend test evaluation, and an AI interviewer that runs mock interviews and gives specific feedback.',
    features: ['AI exam generation with real-time proctoring', 'Timed conditions that simulate real exams', 'In-browser IDE with multi-language support', 'Automated backend test case evaluation', 'AI interviewer with feedback and skill tips', 'Performance tracking and recommendations'],
    stack: ['Next.js', 'TypeScript', 'Firebase', 'OpenAI API', 'Tailwind CSS', 'Vercel'],
  },
  {
    id: 'icecomm', name: 'IceComm', tagline: 'Online marketplace built around frictionless checkout',
    short: 'Next.js · React · Tailwind CSS', url: 'https://icecommwebsite.vercel.app', github: null,
    image: '/ecomm.png',
    metrics: [{ v: 'E-commerce', l: 'Category' }, { v: 'Next.js', l: 'Framework' }],
    desc: 'A marketplace with fast delivery. I studied checkout flows and trust signals from top e-commerce brands, then designed a cleaner, faster path from browsing to paying.',
    features: ['Product search and categories', 'Cart and checkout flow', 'Trust signals at decision points', 'Responsive storefront'],
    stack: ['Next.js', 'React', 'Tailwind CSS'],
  },
  {
    id: 'ytclone', name: 'YouTube Clone', tagline: 'Streaming, auth and comments, rebuilt from scratch',
    short: 'React · Next.js · Firebase', url: 'https://youtube-clone-five-flame.vercel.app', github: 'https://github.com/chrisprince-ic/youtube-clone',
    image: '/youtube.png',
    metrics: [{ v: 'Video', l: 'Streaming' }, { v: 'Firebase', l: 'Auth + data' }],
    desc: 'Built to understand video delivery patterns and the engagement loops creator platforms depend on: feeds, watch pages, auth, and threaded comments.',
    features: ['Video feed and watch page', 'Firebase authentication', 'Comments and engagement', 'Responsive grid layouts'],
    stack: ['React', 'Next.js', 'Firebase', 'Tailwind CSS'],
  },
];

export const CLUSTERS = [
  { title: 'Interfaces', note: 'Where I spend most days', bg: '#F2D98B', rot: -1.5, items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'shadcn/ui'] },
  { title: 'Backend + Platform', note: 'Enough to ship it myself', bg: '#EDE6D8', rot: 1.2, items: ['Firebase', 'REST APIs', 'OpenAI API', 'Stripe', 'Vercel', 'Netlify'] },
  { title: 'Languages', note: 'From coursework and side projects', bg: '#C9CED6', rot: -0.8, items: ['JavaScript', 'TypeScript', 'Java', 'C++', 'C#', 'HTML / CSS'] },
  { title: 'Craft', note: 'The part I care about most', bg: '#E8B9A0', rot: 1.6, items: ['Figma', 'UI/UX design', 'Accessibility', 'Performance', 'SEO', 'Testing + Git'] },
];

export const GREETING = "Hey, I'm Christian. Well, the AI version, trained on my resume and projects. Ask me anything, or tap the mic and just talk.";

export const SUGGESTIONS = [
  'What did you build Macrovia with?',
  'What kind of role are you looking for?',
  'How do you approach UI design?',
  'Why hire you as an intern?',
];
