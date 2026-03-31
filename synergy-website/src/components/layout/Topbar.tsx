"use client";

import { useAuthStore } from "@/store/authStore";
import { UserSession } from "@/lib/roleRouter";
import { Bell, Search, Settings, LogOut } from "lucide-react";
import { Avatar } from "../ui/Avatar";
import { NotificationBell } from "./NotificationBell";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Topbar({ user }: { user: UserSession }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="h-20 bg-obsidian-900 border-b border-obsidian-800 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-20">
      <div className="flex-1 md:flex-none">
        {/* Mobile menu trigger will go here if needed */}
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-gold transition-colors" />
          <input
            type="text"
            placeholder="Search..."
            className="w-64 h-10 bg-obsidian-800 border border-obsidian-700 rounded-full pl-10 pr-4 text-sm focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all placeholder:text-slate-500 text-slate-200"
          />
        </div>

        <NotificationBell />

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 focus:outline-none"
          >
            <div className="text-right hidden md:block">
              <p className="text-sm font-medium text-white">{user.name}</p>
              <p className="text-xs text-slate-400 capitalize">{user.role}</p>
            </div>
            <Avatar size="sm" alt={user.name} />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-3 w-56 bg-obsidian-800 border border-obsidian-700 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.4)] overflow-hidden py-1"
              >
                <div className="px-4 py-3 border-b border-obsidian-700 md:hidden">
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="text-xs text-slate-400 capitalize">{user.role}</p>
                </div>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-obsidian-700 transition-colors">
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
