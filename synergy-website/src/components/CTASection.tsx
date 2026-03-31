"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

export default function CTASection() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(email) {
      setIsSuccess(true);
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.section 
            key="waitlist"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="py-24" 
            data-purpose="early-access-form" 
            id="waitlist"
          >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-obsidian-900 relative">
              <div className="glass-card p-12 rounded-3xl relative overflow-hidden shadow-2xl">
                {/* Background Glow Sweep */}
                <motion.div 
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold via-tealGold to-gold bg-[length:200%_auto]"
                  animate={{ backgroundPosition: ["0% center", "200% center"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />

                {/* Radial Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gold/5 blur-[100px] pointer-events-none rounded-full" />
                
                <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6 relative z-10">
                  Ready to prove what you can actually do?
                </h2>
                
                <div className="flex justify-center -space-x-3 mb-8 relative z-10">
                  <div className="w-10 h-10 rounded-full border-2 border-obsidian-800 bg-obsidian-700 bg-[url('https://i.pravatar.cc/100?img=1')] bg-cover"></div>
                  <div className="w-10 h-10 rounded-full border-2 border-obsidian-800 bg-obsidian-700 bg-[url('https://i.pravatar.cc/100?img=2')] bg-cover"></div>
                  <div className="w-10 h-10 rounded-full border-2 border-obsidian-800 bg-obsidian-700 bg-[url('https://i.pravatar.cc/100?img=3')] bg-cover"></div>
                  <div className="w-10 h-10 rounded-full border-2 border-obsidian-800 bg-gold flex items-center justify-center text-[10px] text-obsidian-900 font-bold z-10">
                    +500
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-lg mx-auto relative z-10">
                  <a 
                    href="/login" 
                    className="flex-1 text-center border-2 border-gold text-gold font-bold px-8 py-4 rounded-lg hover:bg-gold/10 hover:scale-105 transition-all focus:ring-2 focus:ring-offset-2 focus:ring-offset-obsidian-900 focus:ring-gold"
                  >
                    Login
                  </a>
                  <a 
                    href="/signup" 
                    className="flex-1 text-center bg-gold text-obsidian-900 font-bold px-8 py-4 rounded-lg hover:scale-105 transition-transform focus:ring-2 focus:ring-offset-2 focus:ring-offset-obsidian-900 focus:ring-gold gold-glow relative overflow-hidden group shadow-[0_0_20px_rgba(212,163,115,0.3)] hover:shadow-[0_0_25px_rgba(212,163,115,0.5)]"
                  >
                    <span className="relative z-10">Sign Up</span>
                    <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </a>
                </div>
                
                <p className="text-xs text-muted mt-6 relative z-10">Create an account or login to access your verified skills portal.</p>
              </div>
            </div>
          </motion.section>
        ) : (
          <motion.section 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="py-24 px-4" 
            id="success"
          >
            <div className="max-w-md mx-auto glass-card p-12 rounded-3xl text-center border-tealGold relative overflow-hidden">
              <div className="absolute inset-0 bg-tealGold/5" />
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ duration: 0.6, type: "spring", delay: 0.2 }}
                className="w-20 h-20 bg-tealGold/20 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10"
              >
                <Check className="w-10 h-10 text-tealGold" strokeWidth={3} />
              </motion.div>
              <h2 className="text-2xl font-display font-bold mb-2 relative z-10">Welcome Aboard!</h2>
              <p className="text-muted relative z-10">Thanks for joining our early access waitlist. We'll be in touch soon with next steps.</p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
