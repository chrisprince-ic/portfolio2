'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';

const AiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'ai',
      text: "Hey there! I'm Christian's AI assistant. Ask me anything about his experience, projects, or skills.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 900);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), from: 'user', text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setError(null);
    setIsLoading(true);

    fetch('/api/ai-assistant', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages: [...messages, userMessage] }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || 'Failed to get a reply.');
        }
        return res.json();
      })
      .then((data) => {
        const aiText =
          data?.reply ||
          "I'm having trouble answering right now. Please try again in a moment.";
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, from: 'ai', text: aiText },
        ]);
      })
      .catch((err) => {
        console.error(err);
        setError('Something went wrong. Please try again.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="fixed bottom-24 right-4 sm:bottom-24 sm:right-8 z-40">
      {/* Floating toggle button (shown when closed) */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 rounded-full bg-slate-900 text-slate-50 px-4 py-2 shadow-[0_14px_30px_rgba(15,23,42,0.4)] hover:bg-slate-800 transition-colors text-xs sm:text-sm"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="hidden sm:inline">Chat with Christian&apos;s AI</span>
          <span className="sm:hidden">Chat</span>
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="w-80 sm:w-96 rounded-2xl bg-white/95 border border-slate-200 shadow-[0_22px_45px_rgba(15,23,42,0.35)] backdrop-blur-md overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-gradient-to-r from-slate-900 to-slate-800 text-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-50 text-slate-900 flex items-center justify-center text-xs font-semibold">
                  AI
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.18em] opacity-80">
                    Christian&apos;s assistant
                  </div>
                  <div className="text-xs sm:text-sm font-medium">
                    Ask about experience, projects & skills
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-700/70 hover:bg-slate-600 text-slate-50 text-xs transition-colors"
                aria-label="Close AI assistant"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Messages area */}
            <div className="px-4 pt-3 pb-2 max-h-64 overflow-y-auto space-y-2 text-xs sm:text-sm text-slate-800">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-1.5 rounded-2xl text-[11px] sm:text-xs leading-relaxed ${
                      msg.from === 'user'
                        ? 'bg-slate-900 text-slate-50 rounded-br-sm'
                        : 'bg-slate-100 text-slate-900 border border-slate-200 rounded-bl-sm'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-slate-100 border border-slate-200 text-[11px] sm:text-xs text-slate-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-500 animate-pulse" />
                    <span>Christian&apos;s AI is typing…</span>
                  </div>
                </div>
              )}
              {error && (
                <div className="text-[10px] text-rose-500 mt-1">
                  {error}
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="px-3 pt-1 pb-3 border-t border-slate-200 bg-white/90 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about his experience or a specific project..."
                className="flex-1 bg-transparent px-2 py-1.5 text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 text-slate-50 p-1.5 hover:bg-slate-800 transition-colors disabled:opacity-40"
                disabled={!input.trim() || isLoading}
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AiAssistant;


