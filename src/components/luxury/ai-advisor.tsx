'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User, Sparkles } from 'lucide-react';
import { useAppStore } from '@/lib/store';

interface Message {
  id: string;
  role: 'user' | 'advisor';
  text: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'm0',
    role: 'advisor',
    text: 'Welcome to AURUM AI Advisor. I can help you find the perfect investment based on your goals, budget, and risk appetite. What are you looking for?',
  },
];

const SUGGESTIONS = [
  'Best ROI under $500K',
  'Low-risk family villa',
  'New Capital opportunities',
  'Rental income properties',
];

export function AIAdvisor() {
  const { isAdvisorOpen, setAdvisorOpen } = useAppStore();
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Lock body scroll when open
  useEffect(() => {
    if (isAdvisorOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isAdvisorOpen]);

  function handleSend(text?: string) {
    const userText = text || input.trim();
    if (!userText) return;

    const userMsg: Message = { id: `m-${Date.now()}`, role: 'user', text: userText };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulated AI response
    setTimeout(() => {
      const responses = [
        'Based on your criteria, I recommend The Capital Gate in the New Administrative Capital. It offers 15.1% expected ROI with a low $480K entry point and 95/100 investment score. Would you like more details?',
        'For optimal rental yield, consider GPX Tower Residence in New Cairo — 11.2% rental yield with strong demand index of 88. The area is rapidly developing with excellent infrastructure.',
        'North Coast properties like The Riviera Residence offer exceptional appreciation potential at 15% with premium lifestyle amenities. The area shows 15% average ROI across 340+ projects.',
        'I analyzed 2,000+ properties matching your profile. The top 3 are all in New Cairo and New Capital — these areas show the highest growth trajectories for 2025-2027.',
      ];
      const reply: Message = {
        id: `m-${Date.now()}-r`,
        role: 'advisor',
        text: responses[Math.floor(Math.random() * responses.length)],
      };
      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  }

  return (
    <AnimatePresence>
      {isAdvisorOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={() => setAdvisorOpen(false)}
          />

          {/* Panel */}
          <motion.aside
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-[#0F172A] shadow-2xl"
          >
            {/* ── Header ── */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="breathe flex h-10 w-10 items-center justify-center rounded-full bg-gold/15">
                  <Bot className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-jakarta)] text-base font-semibold text-white">
                    AI Investment Advisor
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="pulse-gold h-2 w-2 rounded-full bg-gold" />
                    <span className="text-xs text-white/50 font-[family-name:var(--font-inter)]">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setAdvisorOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-white/30 hover:text-white"
                aria-label="Close advisor"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* ── Messages ── */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto scrollbar-luxury px-6 py-6"
            >
              <div className="flex flex-col gap-5">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    {/* Avatar */}
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                        msg.role === 'advisor'
                          ? 'bg-gold/15'
                          : 'bg-white/10'
                      }`}
                    >
                      {msg.role === 'advisor' ? (
                        <Bot className="h-4 w-4 text-gold" />
                      ) : (
                        <User className="h-4 w-4 text-white/70" />
                      )}
                    </div>

                    {/* Bubble */}
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed font-[family-name:var(--font-inter)] ${
                        msg.role === 'advisor'
                          ? 'glass-dark text-white/90 rounded-tl-md'
                          : 'bg-gold/20 text-white rounded-tr-md'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/15">
                      <Bot className="h-4 w-4 text-gold" />
                    </div>
                    <div className="glass-dark rounded-2xl rounded-tl-md px-4 py-3">
                      <div className="flex gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-gold/60 animate-bounce [animation-delay:0ms]" />
                        <span className="h-2 w-2 rounded-full bg-gold/60 animate-bounce [animation-delay:150ms]" />
                        <span className="h-2 w-2 rounded-full bg-gold/60 animate-bounce [animation-delay:300ms]" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* ── Suggestion chips ── */}
            {messages.length <= 2 && (
              <div className="flex flex-wrap gap-2 px-6 pb-3">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSend(s)}
                    className="rounded-full border border-gold/25 bg-gold/5 px-3.5 py-1.5 text-xs font-[family-name:var(--font-inter)] text-gold transition-colors hover:bg-gold/15"
                  >
                    <Sparkles className="mr-1.5 inline h-3 w-3" />
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* ── Input ── */}
            <div className="border-t border-white/10 px-6 py-4">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about properties, ROI, locations..."
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 font-[family-name:var(--font-inter)] focus:border-gold/40 focus:outline-none transition-colors"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className="btn-luxury flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold text-navy transition-all hover:bg-gold-light disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
