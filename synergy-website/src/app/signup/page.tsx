"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function SignupPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    // Auto redirect to login after a few seconds
    setTimeout(() => {
      router.push("/login");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-obsidian-900 flex flex-col justify-center items-center p-6 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-teal-gold/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md z-10"
      >
        <Link href="/" className="flex items-center gap-3 mb-10 justify-center">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-teal-gold flex items-center justify-center shadow-[0_0_20px_rgba(212,163,115,0.3)]">
            <span className="text-obsidian-900 font-bold text-xl">S</span>
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Synergy
          </span>
        </Link>

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="p-10 text-center border-gold/30 bg-gold/5">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6 text-gold"
              >
                <CheckCircle2 className="w-8 h-8" />
              </motion.div>
              <h2 className="text-2xl font-semibold text-white mb-2">Application Received</h2>
              <p className="text-slate-400 mb-6 relative">
                You're officially on the waitlist. We'll send you an email when a spot opens up.
              </p>
              <p className="text-xs text-slate-500">Redirecting to login...</p>
            </Card>
          </motion.div>
        ) : (
          <Card className="p-8 backdrop-blur-xl bg-obsidian-800/80 border-obsidian-700 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-gold via-gold to-teal-gold" />
            
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-white mb-2">Create Account</h1>
              <p className="text-slate-400 text-sm">Select your role to begin the onboarding process.</p>
            </div>

            <div className="space-y-4">
              <Link href="/signup/student" className="block">
                <Button variant="outline" fullWidth className="h-auto py-4 flex flex-col items-center justify-center gap-2 group hover:border-gold/50 hover:bg-gold/5 transition-all">
                  <span className="font-semibold text-lg">Student</span>
                  <span className="text-xs text-slate-400 font-normal">Track skills & request mentorship</span>
                </Button>
              </Link>
              <Link href="/signup/faculty" className="block">
                <Button variant="outline" fullWidth className="h-auto py-4 flex flex-col items-center justify-center gap-2 group hover:border-teal-gold/50 hover:bg-teal-gold/5 transition-all">
                  <span className="font-semibold text-lg text-slate-200">Faculty Advisor</span>
                  <span className="text-xs text-slate-400 font-normal">Verify students & mentor matches</span>
                </Button>
              </Link>
              <Link href="/signup/management" className="block">
                <Button variant="outline" fullWidth className="h-auto py-4 flex flex-col items-center justify-center gap-2 group hover:border-obsidian-400/50 hover:bg-obsidian-700/50 transition-all">
                  <span className="font-semibold text-lg text-slate-300">Management</span>
                  <span className="text-xs text-slate-400 font-normal">Approve faculty & view analytics</span>
                </Button>
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-obsidian-700/50 text-center">
              <p className="text-sm text-slate-400">
                Already have an account?{" "}
                <Link href="/login" className="text-gold hover:text-gold-400 transition-colors font-medium hover:underline">
                  Log in
                </Link>
              </p>
            </div>
          </Card>
        )}
      </motion.div>
    </div>
  );
}
