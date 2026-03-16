import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { Message, Lead } from '../types';
import { chatWithAI } from '../services/geminiService';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Chat({ messages, setMessages, onReset }: { messages: Message[], setMessages: React.Dispatch<React.SetStateAction<Message[]>>, onReset: () => void }) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await chatWithAI(newMessages);
      if (responseText) {
        // Check for lead data
        const leadMatch = responseText.match(/\[\[LEAD_DATA:(.*?)\]\]/);
        if (leadMatch) {
          try {
            const leadData: Lead = JSON.parse(leadMatch[1]);
            // Save lead to backend
            await fetch('/api/leads', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(leadData),
            });
          } catch (e) {
            console.error("Failed to parse lead data", e);
          }
        }

        // Clean text from the JSON block for display
        const displayMessage = responseText.replace(/\[\[LEAD_DATA:.*?\]\]/, '').trim();
        setMessages([...newMessages, { role: 'model', text: displayMessage }]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages([...newMessages, { role: 'model', text: "I'm sorry, I'm having a bit of trouble connecting right now. Please try again in a moment." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-zinc-900 overflow-hidden relative">
      {/* Reload Button */}
      <button
        onClick={onReset}
        className="absolute top-4 right-4 z-20 p-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-500 hover:text-zinc-300 hover:border-zinc-600 shadow-sm transition-colors flex items-center justify-center group"
        title="Restart Conversation"
      >
        <motion.div
          whileHover={{ rotate: -360 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <RotateCcw size={16} />
        </motion.div>
      </button>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex gap-4 max-w-[85%]",
                msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                msg.role === 'user' ? "bg-red-600 text-white" : "bg-zinc-800 text-zinc-400"
              )}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={cn(
                "px-4 py-3 rounded-2xl text-sm",
                msg.role === 'user' 
                  ? "bg-red-600 text-white rounded-tr-none" 
                  : "bg-zinc-800 text-zinc-200 border border-zinc-700 rounded-tl-none"
              )}>
                <div className="markdown-body">
                  <Markdown>{msg.text}</Markdown>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-4 max-w-[85%] mr-auto"
          >
            <div className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center shrink-0">
              <Bot size={16} />
            </div>
            <div className="px-4 py-3 rounded-2xl bg-zinc-800 text-zinc-500 border border-zinc-700 rounded-tl-none flex items-center gap-2">
              <Loader2 size={16} className="animate-spin" />
              <span className="text-xs italic">Thinking...</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-zinc-900 border-t border-zinc-800">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about Northern Virginia real estate..."
            className="w-full pl-4 pr-12 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2 bg-red-600 text-white rounded-lg hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="mt-2 text-[10px] text-center text-zinc-400 uppercase tracking-widest">
          Tushar Gala Real Estate • Herndon, VA
        </p>
      </div>
    </div>
  );
}
