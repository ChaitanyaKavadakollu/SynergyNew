"use client";

import { useAuthStore } from "@/store/authStore";
import { getDashboardRoute, ROLES, Role } from "@/lib/roleRouter";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Users, BookOpen, BarChart3, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DemoPage() {
  const login = useAuthStore(s => s.login);
  const router = useRouter();

  const handleDemoLogin = (role: Role, name: string) => {
    login({
      id: "demo-" + Math.random().toString(36).substr(2, 9),
      email: `${role.toLowerCase()}@synergy.edu`,
      role,
      name
    });
    router.push(getDashboardRoute(role));
  };

  const personas = [
    {
      role: ROLES.STUDENT,
      name: "Rahul Sharma",
      icon: BookOpen,
      desc: "Student actively submitting activities, seeking mentorship, and chatting with AI.",
      color: "text-gold",
      bg: "bg-gold/10",
      border: "border-gold/30"
    },
    {
      role: ROLES.FACULTY,
      name: "Prof. Alan Turing",
      icon: ShieldCheck,
      desc: "Faculty member verifying incoming student extracurriculars.",
      color: "text-teal-gold",
      bg: "bg-teal-gold/10",
      border: "border-teal-gold/30"
    },
    {
      role: ROLES.MANAGEMENT,
      name: "Dean's Office",
      icon: BarChart3,
      desc: "University executive reviewing D3 skill graphs and macro trends.",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/30"
    },
    {
      role: ROLES.ADMIN,
      name: "System Administrator",
      icon: Users,
      desc: "Platform admin resolving technical flags and system scale.",
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/30"
    }
  ];

  return (
    <div className="min-h-screen bg-obsidian-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbits */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-obsidian-800 rounded-full opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-obsidian-800 rounded-full opacity-50" />
      
      <div className="text-center mb-12 relative z-10 max-w-2xl mx-auto">
         <Link href="/" className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-gold to-teal-gold shadow-[0_0_30px_rgba(212,163,115,0.4)] mb-6">
            <span className="text-obsidian-900 font-bold text-3xl">S</span>
         </Link>
         <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Select User Persona</h1>
         <p className="text-slate-400 text-lg">
           Experience Synergy through different lenses. Clicking below will instantly authenticate you as that user role.
         </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl relative z-10">
         {personas.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.role}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                 <Card 
                   className={`p-6 bg-obsidian-800/80 backdrop-blur border-obsidian-700 hover:${p.border} cursor-pointer transition-all hover:-translate-y-1 group`}
                   onClick={() => handleDemoLogin(p.role, p.name)}
                 >
                    <div className="flex items-start gap-4">
                       <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${p.bg} ${p.color} transition-colors`}>
                          <Icon className="w-7 h-7" />
                       </div>
                       <div>
                          <h2 className="text-xl font-bold text-white mb-1 group-hover:text-white transition-colors capitalize">{p.role} Portal</h2>
                          <p className="text-sm font-medium text-slate-300 mb-2">Logged in as {p.name}</p>
                          <p className="text-sm text-slate-500 leading-relaxed">{p.desc}</p>
                       </div>
                    </div>
                 </Card>
              </motion.div>
            );
         })}
      </div>
    </div>
  );
}
