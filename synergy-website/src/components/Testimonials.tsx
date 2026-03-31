"use client";

import { motion, Variants } from "framer-motion";

export default function Testimonials() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="py-24 bg-obsidian-800/50" data-purpose="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl lg:text-4xl font-display font-bold text-center mb-16 italic max-w-4xl mx-auto"
        >
          "Synergy changes the conversation from 'What did you study?' to 'What can you do?'"
        </motion.h2>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {/* Testimonial 1 */}
          <motion.div variants={itemVariants} className="glass-card p-8 rounded-2xl hover:border-gold/30 transition-colors">
            <p className="text-muted italic mb-6">"Finally, a way to see which students actually mastered the lab work vs. those who just passed the exam."</p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-obsidian-700 rounded-full border border-gold/30"></div>
              <div>
                <p className="text-sm font-bold">Dr. Elena Rossi</p>
                <p className="text-xs text-muted">Professor of Computer Science</p>
              </div>
            </div>
          </motion.div>

          {/* Testimonial 2 */}
          <motion.div variants={itemVariants} className="glass-card p-8 rounded-2xl border-tealGold/20 hover:border-tealGold/40 transition-colors transform md:-translate-y-4">
            <p className="text-muted italic mb-6">"We've reduced our technical screening time by 60% by trusting the Synergy verified skill badges."</p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-obsidian-700 rounded-full border border-tealGold/30"></div>
              <div>
                <p className="text-sm font-bold">Marcus Chen</p>
                <p className="text-xs text-muted">Engineering Lead, NexaCorp</p>
              </div>
            </div>
          </motion.div>

          {/* Testimonial 3 */}
          <motion.div variants={itemVariants} className="glass-card p-8 rounded-2xl hover:border-gold/30 transition-colors">
            <p className="text-muted italic mb-6">"I got my internship because my Synergy ledger showed 2 years of consistent React and Node.js progress."</p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-obsidian-700 rounded-full border border-gold/30"></div>
              <div>
                <p className="text-sm font-bold">Sarah Jenkins</p>
                <p className="text-xs text-muted">Junior Developer &amp; Student</p>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
