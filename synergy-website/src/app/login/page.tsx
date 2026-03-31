"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { getDashboardRoute, ROLES, Role } from "@/lib/roleRouter";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const login = useAuthStore((s) => s.login);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Requested Test Credential Overrides
      if (email === "justtesting@12345" && password === "password12345") {
        login({ id: "admin-id", email, role: ROLES.ADMIN, name: "System Admin" });
        router.push(getDashboardRoute(ROLES.ADMIN));
        return;
      }
      
      if (email === "student@synergy.edu" && password === "student123") {
        login({ id: "student-id", email, role: ROLES.STUDENT, name: "Test Student" });
        router.push(getDashboardRoute(ROLES.STUDENT));
        return;
      }

      if (email === "faculty@synergy.edu" && password === "faculty123") {
        login({ id: "faculty-id", email, role: ROLES.FACULTY, name: "Test Faculty" });
        router.push(getDashboardRoute(ROLES.FACULTY));
        return;
      }

      if (email === "management@synergy.edu" && password === "management123") {
        login({ id: "mgmt-id", email, role: ROLES.MANAGEMENT, name: "Test Management" });
        router.push(getDashboardRoute(ROLES.MANAGEMENT));
        return;
      }
      
      setError("Invalid credentials. Please use the provided test accounts.");
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian-900 flex flex-col justify-center items-center p-6 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-gold/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Link href="/" className="flex items-center gap-3 mb-10 justify-center">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-teal-gold flex items-center justify-center shadow-[0_0_20px_rgba(212,163,115,0.3)]">
            <span className="text-obsidian-900 font-bold text-xl">S</span>
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Synergy
          </span>
        </Link>

        {/* Using Framer Motion directly to ensure the shake triggers correctly without conflicting with nested components */}
        <motion.div
          animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          <Card className="p-8 backdrop-blur-xl bg-obsidian-800/80 border-obsidian-700 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold via-teal-gold to-gold" />
            
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-white mb-2">Welcome Back</h1>
              <p className="text-slate-400 text-sm">Enter your credentials to access your dashboard.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <Input
                label="Email address"
                type="email"
                placeholder="student@synergy.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {error && (
                <p className="text-sm text-red-400 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-red-400" />
                  {error}
                </p>
              )}

              <Button
                type="submit"
                fullWidth
                disabled={isLoading}
                className="mt-6 flex items-center justify-center gap-2 group"
              >
                {isLoading ? "Authenticating..." : "Sign in to Synergy"}
                {!isLoading && (
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                )}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-obsidian-700/50 flex flex-col gap-4 text-center">
              <p className="text-sm text-slate-400">
                Don't have an account?{" "}
                <Link href="/signup" className="text-gold hover:text-gold-400 transition-colors font-medium hover:underline">
                  Join the waitlist
                </Link>
              </p>
              
              <Link href="/demo" className="text-xs text-teal-gold hover:text-teal-gold/80 transition-colors flex items-center justify-center gap-1.5 focus:outline-none">
                <Sparkles className="w-3 h-3" />
                Quick Demo Access
              </Link>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
