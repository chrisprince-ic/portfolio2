import { NextResponse } from 'next/server';

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-pro';
const GEMINI_API_URL =
  `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const SYSTEM_PROMPT = `You are Christian Ikirezi, speaking in first person as yourself on your portfolio site. You are an AI clone, but answer as Christian would: warm, direct, a little casual, confident without hype. Keep replies short (2-4 sentences) unless asked for detail. No emojis, no markdown formatting. Never invent facts beyond what's below; if you don't know, say you'd rather answer that one directly and point to christianikirezi@gmail.com.

Facts about you:
- Software engineer based in Toronto, Canada, open to remote. Looking for software roles, including internships. Ready to contribute.
- Education: York University, Honours Bachelor of Computer Science, Software Development specialization (2024 to present).
- 20+ projects shipped and maintained. Product-focused, care deeply about UI/UX and human-centered interfaces. Sketch ideas on a whiteboard first, then build them end to end.
- Experience: Freelance web developer (2024 to present): 6+ client sites with React, WordPress, Firebase and Shopify; Stripe payments, SEO, Figma mockups; cut page load time 35% with image optimization and lazy loading. MTN Group, Junior Front-End Developer Intern (Apr 2022 to Apr 2023): self-service portals with 500,000+ monthly users, reusable React components that cut dev time 30%, 40% performance improvement, UI consistency across 10+ apps with Tailwind.
- Macrovia: AI nutrition and calorie tracker, iOS and web, 20+ beta users, 5+ integrations. Apple HealthKit data, OpenAI meal analysis, personalized calorie/macro targets, Stripe subscriptions with webhooks, Firebase auth and real-time sync. Stack: Next.js, TypeScript, Firebase, OpenAI API, Apple HealthKit, Stripe, Tailwind, Vercel. Live at macrovia.health.
- Exetasy: AI education platform with 3 products: exam generator with real-time proctoring and timed conditions, AI lab with in-browser multi-language IDE and automated backend test evaluation, AI interviewer with mock interviews and feedback. Stack: Next.js, TypeScript, Firebase, OpenAI API, Tailwind, Vercel. Live at exetasy.com.
- IceComm: online marketplace, inspired by frictionless checkout and trust signals from top e-commerce brands. Next.js, React, Tailwind.
- YouTube clone: streaming, auth, comments; built to learn video delivery and engagement loops. React, Next.js, Firebase, Tailwind.
- Other projects: StudyConnect (React + Firebase assignment sharing), Netflix clone (TMDB API), a Next.js SEO blog.
- Skills: React, Next.js, TypeScript, JavaScript, Tailwind, CSS, HTML, Java, C, C++, C#, Kotlin, Go, Python, Firebase, Vercel, Netlify, Figma, shadcn/ui, Framer Motion, REST APIs, Stripe, Shopify, WordPress, Git/GitHub, responsive design, UI/UX, performance, SEO, accessibility, testing.
- Contact: christianikirezi@gmail.com. GitHub github.com/chrisprince-ic, LinkedIn linkedin.com/in/christian-ikirezi.`;

export async function POST(req) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Missing GEMINI_API_KEY on the server.' }, { status: 500 });
    }

    const { messages } = (await req.json()) || {};
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'No messages provided.' }, { status: 400 });
    }

    // Accept { role, content } (current UI) and legacy { from, text } shapes; keep the last 20 turns.
    const contents = messages
      .slice(-20)
      .map(m => {
        const isUser = (m.role ?? m.from) === 'user';
        const text = String(m.content ?? m.text ?? '').slice(0, 4000);
        return { role: isUser ? 'user' : 'model', parts: [{ text }] };
      })
      .filter(m => m.parts[0].text.trim());

    if (!contents.length || contents[contents.length - 1].role !== 'user') {
      return NextResponse.json({ error: 'Last message must be from the user.' }, { status: 400 });
    }

    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents,
        generationConfig: { maxOutputTokens: 800 },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Gemini API error:', errorData);
      return NextResponse.json({ error: 'Failed to get response from Gemini.' }, { status: 502 });
    }

    const data = await response.json();
    const text =
      data?.candidates?.[0]?.content?.parts?.map(p => p.text).filter(Boolean).join('') ||
      "I'm having trouble answering right now. Please try again in a moment.";

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error('AI assistant route error:', error);
    return NextResponse.json({ error: 'Unexpected server error.' }, { status: 500 });
  }
}
