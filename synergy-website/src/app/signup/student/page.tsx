"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, UploadCloud } from "lucide-react";

export default function StudentSignup() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => router.push("/login"), 3000);
  };

  return (
    <div className="min-h-screen bg-obsidian-900 flex flex-col justify-center items-center p-6 relative overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-teal-gold/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md z-10">
        <Link href="/signup" className="inline-flex items-center text-sm text-slate-400 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Roles
        </Link>

        {isSubmitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <Card className="p-10 text-center border-gold/30 bg-gold/5">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6 text-gold">
                <CheckCircle2 className="w-8 h-8" />
              </motion.div>
              <h2 className="text-2xl font-semibold text-white mb-2">Application Received</h2>
              <p className="text-slate-400 mb-6">Your account is pending Faculty Approval. You will be notified via email.</p>
              <p className="text-xs text-slate-500">Redirecting to login...</p>
            </Card>
          </motion.div>
        ) : (
          <Card className="p-8 backdrop-blur-xl bg-obsidian-800/80 border-obsidian-700 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold to-teal-gold" />
            <div className="text-center mb-6">
              <h1 className="text-2xl font-semibold text-white mb-1">Student Signup</h1>
              <p className="text-slate-400 text-sm">Join the career readiness platform.</p>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
              <Input label="Full Name" required />
              <Input label="University Email" type="email" required />
              <div className="grid grid-cols-2 gap-4">
                <Input label="University ID" required />
                <Input label="Year of Study" placeholder="e.g. 3rd Year" required />
              </div>
              <Input label="Department" required />
              <Input label="Password" type="password" required />
              
              <div className="pt-2">
                <label className="block text-sm font-medium text-slate-300 mb-2">Proof of Identity (ID Card / Admission Letter)</label>
                <div className="border-2 border-dashed border-obsidian-600 rounded-xl p-4 text-center hover:bg-obsidian-700/50 transition-colors cursor-pointer group">
                  <UploadCloud className="w-6 h-6 text-slate-400 mx-auto mb-2 relative group-hover:-translate-y-1 transition-transform" />
                  <span className="text-sm text-slate-400">Click to upload file (PDF, PNG, JPG)</span>
                </div>
              </div>

              <Button type="submit" fullWidth className="mt-6">Submit for Approval</Button>
            </form>
          </Card>
        )}
      </motion.div>
    </div>
  );
}
