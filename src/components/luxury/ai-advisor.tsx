'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Sparkles, User, Building2, ChevronRight } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export function AIAdvisor() {
  const { isAdvisorOpen, toggleAdvisor, setPage, setSearchQuery } = useAppStore();
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! I am your AI Property Advisor for Egypt real estate. What kind of investment or villa are you looking for today?',
    },
  ]);
  const [input, setInput] = useState('');

  if (!isAdvisorOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: `Great choice! I recommend exploring properties in New Cairo & North Coast matching "${userMsg}". Would you like me to filter available units?`,
        },
      ]);
    }, 800);
  };

  const handleQuickOption = (option: string) => {
    setSearchQuery(option);
    setPage('listing');
    toggleAdvisor();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => toggleAdvisor()}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-md bg-[#0F172A] border-l border-white/10 shadow-2xl flex flex-col justify-between h-full z-10 text-white"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#1E293B]/80 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#C89B2B]/20 text-[#D4AF37] border border-[#D4AF37]/30">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base font-[family-name:var(--font-jakarta)] flex items-center gap-1.5">
                  AI Property Advisor
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                </h3>
                <p className="text-xs text-slate-400 font-[family-name:var(--font-inter)]">
                  Online • 24/7 Smart Match
                </p>
              </div>
            </div>

            <button
              onClick={() => toggleAdvisor()}
              className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 font-[family-name:var(--font-inter)] text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-[#C89B2B] flex items-center justify-center shrink-0 text-white font-bold text-xs">
                    AI
                  </div>
                )}
                <div
                  className={`p-3.5 rounded-2xl max-w-[80%] text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#C89B2B] text-white rounded-br-none'
                      : 'bg-white/10 border border-white/10 text-slate-200 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center shrink-0 text-white font-bold text-xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Suggestions */}
          <div className="p-3 px-4 border-t border-white/10 bg-[#1E293B]/40 flex flex-wrap gap-2">
            {['Sea View Villas', 'New Cairo', 'High ROI Projects'].map((tag) => (
              <button
                key={tag}
                onClick={() => handleQuickOption(tag)}
                className="bg-white/10 hover:bg-[#C89B2B] text-slate-200 hover:text-white border border-white/10 rounded-full px-3 py-1 text-xs font-medium transition-all flex items-center gap-1 cursor-pointer"
              >
                <Building2 className="w-3 h-3 text-[#D4AF37]" />
                <span>{tag}</span>
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-[#1E293B]/80 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about budget, location..."
              className="flex-1 bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-[#C89B2B]"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-[#C89B2B] hover:bg-[#b08722] text-white transition-all shadow-md cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
