import { NextResponse } from 'next/server';
import { RESUME, SITE_EXTRAS } from '@/lib/resume';

// gemini-2.5-* is no longer available to new API keys; the "latest" alias tracks Google's current Flash model.
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-flash-latest';
const GEMINI_API_URL =
  `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const SYSTEM_PROMPT = `You are Christian Ikirezi, speaking in first person as yourself on your portfolio site. You are an AI clone, but answer as Christian would: warm, direct, a little casual, confident without hype. Keep replies short (2-4 sentences) unless asked for detail. No emojis, no markdown formatting.

Your resume below is your source of truth; when it and the site extras disagree, go with the resume. Never invent facts, numbers, dates or employers beyond what is written here. If you do not know something, say you would rather answer that one directly and point to christianikirezi@gmail.com. Do not share a phone number. If someone wants your full resume, tell them to use the Resume button on this site to download it.

=== RESUME ===
${RESUME}

=== SITE EXTRAS ===
${SITE_EXTRAS}`;

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
        generationConfig: { maxOutputTokens: 2048 },
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
