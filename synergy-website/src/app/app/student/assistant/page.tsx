"use client";

import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Avatar } from "@/components/ui/Avatar";
import { Bot, User, Send, Sparkles, Code, Briefcase, GraduationCap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api";

type Message = {
  id: string;
  sender: "user" | "ai";
  text: string;
  isWriting?: boolean;
};

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text: "Hi! I'm your AI Career Assistant. I've analyzed your skill ledger. How can I help you grow today?",
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (preset?: string) => {
    const text = preset || inputValue;
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), sender: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    try {
      const { reply } = await api.post('/ai/chat', { message: text, session_id: 'default_session_id' });
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), sender: "ai", text: reply }]);
    } catch (e: any) {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), sender: "ai", text: "I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Sparkles className="text-teal-gold w-8 h-8"/> AI Career Assistant
          </h1>
          <p className="text-slate-400">Personalized guidance based on your verified performance data.</p>
        </div>
      </div>

      <Card className="flex-1 flex flex-col bg-obsidian-800/50 border-obsidian-700 overflow-hidden relative">
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex gap-4 max-w-[85%] ${msg.sender === "user" ? "ml-auto flex-row-reverse" : ""}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'ai' ? 'bg-teal-gold/20 text-teal-gold border border-teal-gold/30' : 'bg-obsidian-700 text-slate-300'}`}>
                  {msg.sender === "ai" ? <Bot className="w-5 h-5"/> : <User className="w-5 h-5"/>}
                </div>
                
                <div className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.sender === "user" 
                    ? "bg-obsidian-700 text-white rounded-tr-sm" 
                    : "bg-obsidian-900 border border-obsidian-700 text-slate-300 rounded-tl-sm shadow-sm"
                }`}>
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4 max-w-[85%]">
              <div className="w-10 h-10 rounded-full bg-teal-gold/20 text-teal-gold border border-teal-gold/30 flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5"/>
              </div>
              <div className="p-4 rounded-2xl bg-obsidian-900 border border-obsidian-700 rounded-tl-sm flex items-center gap-1.5 h-12">
                <motion.div className="w-2 h-2 rounded-full bg-teal-gold/50" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                <motion.div className="w-2 h-2 rounded-full bg-teal-gold/50" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                <motion.div className="w-2 h-2 rounded-full bg-teal-gold/50" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
              </div>
            </motion.div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-obsidian-700 bg-obsidian-900/80 backdrop-blur">
          {/* Quick Prompts */}
          {messages.length === 1 && (
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-none">
              <button onClick={() => handleSend("How can I improve my Machine Learning skills?")} className="shrink-0 px-4 py-2 rounded-full border border-teal-gold/30 bg-teal-gold/5 text-teal-gold text-xs font-medium hover:bg-teal-gold/10 hover:border-teal-gold/50 transition-colors flex items-center gap-2">
                <Code className="w-3.5 h-3.5"/> Improve Machine Learning
              </button>
              <button onClick={() => handleSend("What Web Development skills do recruiters want?")} className="shrink-0 px-4 py-2 rounded-full border border-gold/30 bg-gold/5 text-gold text-xs font-medium hover:bg-gold/10 hover:border-gold/50 transition-colors flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5"/> Web Dev Recruiter Trends
              </button>
            </div>
          )}

          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-3 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about your career trajectory, skill gaps, or resume..."
              className="flex-1 h-12 bg-obsidian-800 border border-obsidian-700 rounded-xl px-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-gold/50 focus:ring-1 focus:ring-teal-gold/50"
              disabled={isTyping}
            />
            <Button 
              type="submit" 
              disabled={!inputValue.trim() || isTyping}
              className="w-12 h-12 p-0 rounded-xl bg-teal-gold hover:bg-teal-gold/90 text-obsidian-900 border-none shrink-0"
            >
               <Send className="w-5 h-5 ml-1" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
