"use client";

import { motion, Variants } from "framer-motion";
import { Star } from "lucide-react";

export default function Timeline() {
  const lineVariants: Variants = {
    hidden: { height: 0 },
    show: { height: "100%", transition: { duration: 2, ease: "easeInOut" } }
  };

  const nodeVariants: Variants = {
    hidden: { opacity: 0, scale: 0 },
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200, damping: 12 } }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section className="py-24 overflow-hidden" data-purpose="transformation-visual" id="journey">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-display font-bold mb-4"
          >
            Your Skill Transformation
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted"
          >
            From raw potential to verified elite talent.
          </motion.p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <motion.div 
            variants={lineVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="absolute left-8 md:left-1/2 top-0 w-1 timeline-line opacity-20 -translate-x-1/2 transform origin-top"
          />

          {/* Step 1 */}
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="relative flex flex-col md:flex-row items-center mb-20"
          >
            <div className="md:w-1/2 flex justify-end md:pr-16 mb-8 md:mb-0 w-full">
              <motion.div variants={cardVariants} className="text-right hidden md:block">
                <h3 className="text-2xl font-bold text-gold">Quick Win</h3>
                <p className="text-muted max-w-xs ml-auto">Verify your first skill and see your initial competency map come to life.</p>
              </motion.div>
            </div>
            <motion.div variants={nodeVariants} className="absolute left-8 md:left-1/2 w-4 h-4 bg-gold rounded-full -translate-x-1/2 z-10 border-4 border-obsidian-900" />
            
            <div className="md:w-1/2 md:pl-16 pl-16 w-full">
              <motion.div variants={cardVariants} className="md:hidden mb-6">
                <h3 className="text-xl font-bold text-gold mb-2">Quick Win</h3>
                <p className="text-muted">Verify your first skill and see your initial competency map come to life.</p>
              </motion.div>
              <motion.div variants={cardVariants} className="bg-obsidian-800 p-6 rounded-xl border border-obsidian-700 hover:border-gold/30 transition-colors">
                <span className="text-xs font-bold text-gold uppercase tracking-widest">Stage 01</span>
                <p className="text-sm mt-2 font-medium">Immediate Feedback Loop</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="relative flex flex-col md:flex-row items-center mb-20"
          >
            <div className="md:w-1/2 md:pr-16 pl-16 md:pl-0 order-2 md:order-1 w-full">
              <motion.div variants={cardVariants} className="bg-obsidian-800 p-6 rounded-xl border border-obsidian-700 hover:border-tealGold/30 transition-colors md:text-right">
                <span className="text-xs font-bold text-tealGold uppercase tracking-widest">Stage 02</span>
                <p className="text-sm mt-2 font-medium">Skill Stacking & Mastery</p>
              </motion.div>
            </div>
            <motion.div variants={nodeVariants} className="absolute left-8 md:left-1/2 w-4 h-4 bg-tealGold rounded-full -translate-x-1/2 z-10 border-4 border-obsidian-900 shadow-lg shadow-tealGold/20" />
            
            <div className="md:w-1/2 flex justify-start md:pl-16 mb-8 md:mb-0 order-1 md:order-2 w-full">
              <motion.div variants={cardVariants} className="text-left pl-16 md:pl-0">
                <h3 className="text-2xl font-bold text-tealGold">Compounding Growth</h3>
                <p className="text-muted max-w-xs">Layer verified badges to build a comprehensive, interdisciplinary profile.</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Step 3 */}
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="relative flex flex-col md:flex-row items-center mb-20"
          >
            <div className="md:w-1/2 flex justify-end md:pr-16 mb-8 md:mb-0 w-full">
              <motion.div variants={cardVariants} className="text-right hidden md:block">
                <h3 className="text-2xl font-bold text-gold">Competitive Advantage</h3>
                <p className="text-muted max-w-xs ml-auto">Stand out from thousands of applicants with a verified seal of quality.</p>
              </motion.div>
            </div>
            <motion.div variants={nodeVariants} className="absolute left-8 md:left-1/2 w-4 h-4 bg-gold rounded-full -translate-x-1/2 z-10 border-4 border-obsidian-900" />
            
            <div className="md:w-1/2 md:pl-16 pl-16 w-full">
              <motion.div variants={cardVariants} className="md:hidden mb-6">
                <h3 className="text-xl font-bold text-gold mb-2">Competitive Advantage</h3>
                <p className="text-muted">Stand out from thousands of applicants with a verified seal of quality.</p>
              </motion.div>
              <motion.div variants={cardVariants} className="bg-obsidian-800 p-6 rounded-xl border border-obsidian-700 hover:border-gold/30 transition-colors">
                <span className="text-xs font-bold text-gold uppercase tracking-widest">Stage 03</span>
                <p className="text-sm mt-2 font-medium">Verified Hiring Preference</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Step 4 */}
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="relative flex flex-col md:flex-row items-center"
          >
            <div className="md:w-1/2 md:pr-16 pl-16 md:pl-0 order-2 md:order-1 w-full">
              <motion.div variants={cardVariants} className="bg-gold p-6 rounded-xl border border-gold text-obsidian-900 md:text-right hover:scale-105 transition-transform duration-300">
                <span className="text-xs font-extrabold uppercase tracking-widest">Stage 04</span>
                <p className="text-sm mt-2 font-bold">Elite Market Positioning</p>
              </motion.div>
            </div>
            <motion.div variants={nodeVariants} className="absolute left-8 md:left-1/2 w-8 h-8 bg-gold rounded-full -translate-x-1/2 z-10 border-4 border-obsidian-900 flex items-center justify-center shadow-lg shadow-gold/40">
              <Star className="w-4 h-4 text-obsidian-900 fill-obsidian-900" />
            </motion.div>
            
            <div className="md:w-1/2 flex justify-start md:pl-16 mb-8 md:mb-0 order-1 md:order-2 w-full">
              <motion.div variants={cardVariants} className="text-left pl-16 md:pl-0">
                <h3 className="text-2xl font-bold text-gold">10x Talent Visibility</h3>
                <p className="text-muted max-w-xs">Enter the workforce not as a graduate, but as a proven subject matter expert.</p>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
