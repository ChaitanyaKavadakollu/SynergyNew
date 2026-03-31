"use client";

import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api";

export function NotificationBell() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Poll for notifications
    const fetchNotifs = () => {
      api.get('/notifications')
         .then(res => setNotifications(res))
         .catch(() => {});
    };
    fetchNotifs();
    const interval = setInterval(fetchNotifs, 30000);
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const handleMarkAsRead = async (id: string) => {
     try {
        await api.patch(`/notifications/${id}/read`);
        setNotifications(prev => prev.filter(n => n.id !== id));
     } catch (e) {}
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-10 h-10 rounded-full bg-obsidian-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors border border-obsidian-700"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-obsidian-900 rounded-full" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-80 bg-obsidian-900 border border-obsidian-700 rounded-xl shadow-2xl overflow-hidden z-50"
          >
            <div className="p-4 border-b border-obsidian-800 flex justify-between items-center">
              <h3 className="font-semibold text-white">Notifications</h3>
              {unreadCount > 0 && <span className="text-xs text-gold">{unreadCount} unread</span>}
            </div>
            
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-sm">
                  You're all caught up!
                </div>
              ) : (
                notifications.map(notif => (
                  <div key={notif.id} className={`p-4 border-b border-obsidian-800 last:border-0 hover:bg-obsidian-800/50 transition-colors flex gap-3 ${!notif.is_read ? 'bg-obsidian-800/20' : ''}`}>
                    <div className="flex-1">
                      <p className="text-sm text-slate-300 font-medium">{notif.title}</p>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{notif.message}</p>
                      <p className="text-[10px] text-slate-600 mt-2">{new Date(notif.created_at).toLocaleString()}</p>
                    </div>
                    {!notif.is_read && (
                      <button 
                        onClick={() => handleMarkAsRead(notif.id)}
                        className="text-xs text-teal-gold hover:underline shrink-0 h-fit"
                      >
                        Mark read
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
