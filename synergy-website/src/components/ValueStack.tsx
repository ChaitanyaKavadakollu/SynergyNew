"use client";

import { motion, Variants } from "framer-motion";

export default function ValueStack() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-24" data-purpose="value-stack" id="value">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold mb-8">The Infrastructure of Trust</h2>
            <p className="text-muted text-lg mb-8 leading-relaxed">
              Synergy creates a verifiable loop between learning, validating, and hiring. Our platform ensures that every skill claimed is a skill earned.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full border border-gold flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-gold rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-bold">Institutional Rigor</h4>
                  <p className="text-sm text-muted">Directly integrated with university LMS and department workflows.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full border border-gold flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-gold rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-bold">Tamper-Proof Ledger</h4>
                  <p className="text-sm text-muted">Skill records are immutable and cryptographically signed.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Card 1 */}
            <motion.div variants={itemVariants} className="bg-obsidian-800 p-6 rounded-2xl border-l-4 border-gold group hover:translate-x-2 transition-transform shadow-lg shadow-black/20">
              <h3 className="text-xl font-bold mb-2 group-hover:text-gold transition-colors">Skill Ledger</h3>
              <p className="text-muted text-sm">A living history of every project, code commit, and lab result verified in real-time.</p>
            </motion.div>

            {/* Card 2 */}
            <motion.div variants={itemVariants} className="bg-obsidian-800 p-6 rounded-2xl border-l-4 border-tealGold group hover:translate-x-2 transition-transform shadow-lg shadow-black/20">
              <h3 className="text-xl font-bold mb-2 group-hover:text-tealGold transition-colors">Faculty Verification</h3>
              <p className="text-muted text-sm">Professor-led validation that adds institutional weight to student achievements.</p>
            </motion.div>

            {/* Card 3 */}
            <motion.div variants={itemVariants} className="bg-obsidian-800 p-6 rounded-2xl border-l-4 border-gold group hover:translate-x-2 transition-transform shadow-lg shadow-black/20">
              <h3 className="text-xl font-bold mb-2 group-hover:text-gold transition-colors">Growth Analytics</h3>
              <p className="text-muted text-sm">Visual mapping of competency progression over a student's entire academic career.</p>
            </motion.div>

            {/* Card 4 */}
            <motion.div variants={itemVariants} className="bg-obsidian-800 p-6 rounded-2xl border-l-4 border-tealGold group hover:translate-x-2 transition-transform shadow-lg shadow-black/20">
              <h3 className="text-xl font-bold mb-2 group-hover:text-tealGold transition-colors">Recruiter Discovery</h3>
              <p className="text-muted text-sm">Targeted search for specific, verified skill sets rather than generic degrees.</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
