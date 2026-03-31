"use client";

import { motion, Variants } from "framer-motion";
import { AlertCircle, UserX, LineChart } from "lucide-react";

export default function ProblemSection() {
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
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="py-24 bg-obsidian-800" data-purpose="problem-section" id="problem">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-5xl font-display font-bold mb-4"
          >
            The Talent Gap is Widening
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted max-w-2xl mx-auto"
          >
            Traditional education records are failing both students and the workforce.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {/* Card 1 */}
          <motion.div variants={itemVariants} className="bg-obsidian-700 p-8 rounded-2xl border border-obsidian-700 hover:border-gold/30 transition-all group transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <AlertCircle className="w-6 h-6 text-red-400" />
            </div>
            <h3 className="text-xl font-bold mb-4">Grades Don't Show Real Skill</h3>
            <p className="text-muted text-sm leading-relaxed">
              A 4.0 GPA tells recruiters you can study, but it doesn't prove you can build, collaborate, or solve complex industry problems.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div variants={itemVariants} className="bg-obsidian-700 p-8 rounded-2xl border border-obsidian-700 hover:border-gold/30 transition-all group transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <UserX className="w-6 h-6 text-red-400" />
            </div>
            <h3 className="text-xl font-bold mb-4">Recruiters Cannot Trust Portfolios</h3>
            <p className="text-muted text-sm leading-relaxed">
              With AI-generated portfolios on the rise, recruiters are struggling to distinguish authentic expertise from polished facades.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div variants={itemVariants} className="bg-obsidian-700 p-8 rounded-2xl border border-obsidian-700 hover:border-gold/30 transition-all group transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <LineChart className="w-6 h-6 text-red-400" />
            </div>
            <h3 className="text-xl font-bold mb-4">Faculty Cannot Track Skill Growth</h3>
            <p className="text-muted text-sm leading-relaxed">
              Educators lack the tools to see how students develop soft and hard skills across different departments and extra-curriculars.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
