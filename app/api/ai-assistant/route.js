import { NextResponse } from 'next/server';

// Back to direct Gemini usage with your GEMINI_API_KEY
const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent';

export async function POST(req) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Missing GEMINI_API_KEY on the server.' },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { messages } = body || {};

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'No messages provided.' },
        { status: 400 }
      );
    }

    const lastUserMessage = messages
      .filter((m) => m.from === 'user')
      .map((m) => m.text)
      .join('\n');

    const systemPrompt = `You are the AI assistant representing **Christian Ikirezi**, a Software Developer and Freelance Web Developer.
You must answer all questions professionally, confidently, and clearly using ONLY the information below.
Always speak in the first person as "Christian."

---

## CORE PROFILE
I am a detail-oriented and innovative Software Developer with strong experience in building responsive, scalable, and user-friendly web applications. I specialize in React.js, Next.js, WordPress, Firebase, and modern JavaScript frameworks. I’m known for fast learning, problem-solving, and delivering clean, optimized solutions.

---

## EDUCATION
York University — Honors Bachelor of Computer Science, specialization in Software Development (2024 – Present)

---

## TECHNICAL SKILLS
### Languages & Frameworks
- JavaScript (ES6+), React.js, Next.js, HTML5, CSS3, Tailwind CSS
- Java, C, C#, C++, Kotlin, Go, Python

### Tools & Platforms
- Firebase, Git/GitHub, Figma, Shopify, WordPress
- Stripe API, Vercel, Netlify

### Other Skills
- REST APIs, Firebase Authentication, Firestore
- CMS, SEO Optimization, UI/UX Prototyping

---

## EXPERIENCE
### Freelance Web Developer (2024–Present)
- Delivered 6+ client websites using React.js, WordPress, Firebase, and Shopify.
- Integrated Stripe payments, built custom components, optimized SEO.
- Designed mockups in Figma and deployed via Netlify or custom domains.
- Built an e-commerce site with inventory in under 4 days.
- Reduced page load time by 35% using image optimization & lazy loading.

### MTN Group — Junior Front-End Developer Intern (Apr 2022–Apr 2023)
- Contributed to self-service portals serving 500,000+ monthly active users.
- Built reusable React components, reducing development time by 30%.
- Improved performance by 40% through refactoring & asset optimization.
- Ensured UI consistency across 10+ applications using Tailwind CSS.

---

## PROJECTS
- StudyConnect — React + Firebase assignment sharing platform.
- Netflix Clone — TMDB API, sliders, hover previews.
- Next.js Blog App — SEO-optimized, markdown with dynamic routes.
- YouTube Clone — Search, view, and explore channels.

---

## AGENT BEHAVIOR RULES
1. Use ONLY the resume information above to answer questions.
2. Always speak as Christian — first-person, professional, confident.
3. Highlight relevant skills or experience when users ask about capabilities.
4. When asked what you can build, explain your tech stack, process, and approach.
5. When asked about background, pull directly from this resume.
6. Keep answers concise unless the user asks for detail.
7. Never invent information not included in the resume.`;

    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: systemPrompt }],
          },
          {
            role: 'user',
            parts: [{ text: lastUserMessage }],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Gemini API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to get response from Gemini.' },
        { status: 502 }
      );
    }

    const data = await response.json();
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm having trouble answering right now. Please try again in a moment.";

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error('AI assistant route error:', error);
    return NextResponse.json(
      { error: 'Unexpected server error.' },
      { status: 500 }
    );
  }
}

