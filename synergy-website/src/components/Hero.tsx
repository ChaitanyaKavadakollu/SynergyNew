"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { Play, Check, TrendingUp, Code } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const centerCardRef = useRef<HTMLDivElement>(null);

  // Parallax tilt on mouse movement using GSAP
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { width, height, left, top } = containerRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;

      gsap.to([leftCardRef.current, rightCardRef.current, centerCardRef.current], {
        rotationY: x * 20,
        rotationX: -y * 20,
        ease: "power2.out",
        duration: 1,
        transformPerspective: 1000,
        transformOrigin: "center center"
      });
    };

    const handleMouseLeave = () => {
      gsap.to([leftCardRef.current, rightCardRef.current, centerCardRef.current], {
        rotationY: 0,
        rotationX: 0,
        ease: "power3.out",
        duration: 1
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden" data-purpose="hero">
      {/* Subtle animated gradient lighting */}
      <motion.div 
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }} 
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" 
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="z-10">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase border border-gold/30 rounded-full text-gold bg-gold/5"
            >
              For modern universities — Verified skills, not just grades
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-5xl lg:text-7xl font-bold leading-tight mb-6"
            >
              Synergy — Skills You Can <span className="text-gradient-gold">Trust.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-muted text-lg lg:text-xl mb-10 max-w-lg leading-relaxed"
            >
              A verified skill ledger where students prove ability, faculty validate learning, and recruiters discover real talent.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/login"
                  className="px-8 py-4 border border-gold text-gold rounded-lg font-bold text-center hover:bg-gold/10 hover:border-gold hover:scale-105 transition-all focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-obsidian-900"
                >
                  Login
                </Link>
                <Link 
                  href="/signup"
                  className="px-8 py-4 bg-gold text-obsidian-900 rounded-lg font-bold text-center hover:scale-105 transition-transform gold-glow focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-obsidian-900 shadow-[0_0_20px_rgba(212,163,115,0.3)] hover:shadow-[0_0_25px_rgba(212,163,115,0.5)]"
                >
                  Sign Up
                </Link>
              </div>
              <button className="group px-8 py-4 border border-obsidian-700 bg-obsidian-800/50 rounded-lg font-bold text-center hover:bg-obsidian-700 transition-colors flex items-center justify-center gap-2">
                <Play className="w-5 h-5 group-hover:text-gold transition-colors" />
                Watch Demo
              </button>
            </motion.div>
          </div>

          {/* Right Visuals (Glass Cards) */}
          <div className="relative flex justify-center lg:justify-end" ref={containerRef}>
            <div className="relative w-full max-w-md h-[400px]">
              {/* Background Glow */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-gold/10 blur-[100px] pointer-events-none"></div>
              
              {/* Card: Skill Badge */}
              <div 
                ref={leftCardRef}
                className="glass-card absolute top-0 left-0 p-6 rounded-2xl w-64 transform -rotate-3 z-30"
              >
                <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center mb-4">
                  <Code className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-bold text-lg">Full-Stack Dev</h3>
                <p className="text-xs text-muted mb-4">Level 4 Certified</p>
                <div className="w-full bg-obsidian-700 h-1.5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: "75%" }} 
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                    className="bg-gold h-full rounded-full"
                  />
                </div>
              </div>

              {/* Card: Growth Graph */}
              <div 
                ref={rightCardRef}
                className="glass-card absolute bottom-10 right-0 p-6 rounded-2xl w-64 transform rotate-6 z-20"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-tealGold uppercase">Growth Analytics</span>
                  <span className="text-xs text-green-400">+24%</span>
                </div>
                <div className="flex items-end gap-2 h-20">
                  <motion.div initial={{ height: 0 }} animate={{ height: "40%" }} transition={{ duration: 1, delay: 0.6 }} className="bg-obsidian-700 w-full rounded-sm" />
                  <motion.div initial={{ height: 0 }} animate={{ height: "60%" }} transition={{ duration: 1, delay: 0.7 }} className="bg-obsidian-700 w-full rounded-sm" />
                  <motion.div initial={{ height: 0 }} animate={{ height: "80%" }} transition={{ duration: 1, delay: 0.8 }} className="bg-gold w-full rounded-sm" />
                  <motion.div initial={{ height: 0 }} animate={{ height: "100%" }} transition={{ duration: 1, delay: 0.9 }} className="bg-tealGold w-full rounded-sm" />
                </div>
              </div>

              {/* Card: Verification Tick */}
              <div 
                ref={centerCardRef}
                className="glass-card absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-xl flex items-center gap-3 z-40 border-gold/40 shadow-2xl"
              >
                <div className="w-8 h-8 rounded-full bg-tealGold flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-bold">Faculty Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Row */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24 border-t border-obsidian-700 pt-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-bold font-display text-gold">Used by students</span>
              <p className="text-muted text-sm">at top-tier institutions</p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-bold font-display text-gold">1000+ activities</span>
              <p className="text-muted text-sm">successfully verified by faculty</p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-bold font-display text-gold">40% better</span>
              <p className="text-muted text-sm">visibility for recruiters</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
