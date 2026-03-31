"use client";

import { useAuthStore } from "@/store/authStore";
import { ROLES, getDashboardRoute } from "@/lib/roleRouter";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { AchievementToast } from "../ui/AchievementToast";
import { motion, AnimatePresence } from "framer-motion";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Basic Auth Guard
    if (!isAuthenticated && !pathname.includes("/login") && !pathname.includes("/signup")) {
      router.push("/login");
    }
  }, [isAuthenticated, pathname, router]);

  if (!isAuthenticated) return null; // Avoid flashing protected content

  return (
    <div className="min-h-screen bg-obsidian-900 flex text-slate-100 font-inter selection:bg-gold/30">
      <Sidebar role={user?.role || ROLES.STUDENT} />
      
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 ml-0 md:ml-64">
        <Topbar user={user!} />
        
        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex-1 p-6 lg:p-10 overflow-x-hidden overflow-y-auto"
          >
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </motion.main>
        </AnimatePresence>
      </div>
      <AchievementToast />
    </div>
  );
}
