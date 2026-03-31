"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, X } from "lucide-react";
import { api } from "@/lib/api";

export function AchievementToast() {
  const [toast, setToast] = useState<any | null>(null);

  useEffect(() => {
    // Poll for unseen achievements
    const checkAchievements = async () => {
       try {
         const list = await api.get('/achievements/mine/unseen');
         if (list && list.length > 0) {
            setToast(list[0]);
            // Mark as seen immediately so we don't spam
            await api.patch(`/achievements/mine/${list[0].id}/seen`);
         }
       } catch (e) {}
    };

    const interval = setInterval(checkAchievements, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 w-80 bg-obsidian-900 border-l-4 border-l-gold border-y border-r border-y-obsidian-700 border-r-obsidian-700 shadow-2xl rounded-r-xl p-4 flex gap-4"
        >
          <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
             <Trophy className="w-5 h-5 text-gold" />
          </div>
          <div className="flex-1 pt-1">
             <p className="text-xs uppercase tracking-widest text-gold font-bold mb-1">Achievement Unlocked</p>
             <h4 className="font-semibold text-white text-sm">{toast.achievement.name}</h4>
             <p className="text-xs text-slate-400 mt-1">{toast.achievement.description}</p>
          </div>
          <button onClick={() => setToast(null)} className="text-slate-500 hover:text-white shrink-0 self-start">
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
