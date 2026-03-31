"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ROLES, Role, getDashboardRoute } from "@/lib/roleRouter";
import { 
  LayoutDashboard, 
  FileText, 
  Award, 
  Users, 
  Settings, 
  ShieldCheck, 
  BarChart3, 
  Activity,
  UserCheck,
  Search,
  MessageSquare
} from "lucide-react";
import { motion } from "framer-motion";

export default function Sidebar({ role }: { role: Role }) {
  const pathname = usePathname();

  const getLinks = () => {
    switch (role) {
      case ROLES.STUDENT:
        return [
          { href: "/app/student/dashboard", label: "Career Cockpit", icon: LayoutDashboard },
          { href: "/app/student/activity", label: "Submit Activity", icon: Activity },
          { href: "/app/student/skills", label: "My Skills", icon: Award },
          { href: "/app/student/mentors", label: "Mentors", icon: Users },
          { href: "/app/student/assistant", label: "AI Assistant", icon: MessageSquare },
        ];
      case ROLES.FACULTY:
        return [
          { href: "/app/faculty/dashboard", label: "Verification Queue", icon: ShieldCheck },
          { href: "/app/faculty/reports", label: "Student Reports", icon: FileText },
          { href: "/app/faculty/analytics", label: "Management Analytics", icon: BarChart3 },
        ];
      case ROLES.MANAGEMENT:
        return [
          { href: "/app/management/dashboard", label: "Performance Overview", icon: BarChart3 },
          { href: "/app/management/skill-graph", label: "Skill Graph", icon: Activity },
          { href: "/app/management/analytics", label: "Global Analytics", icon: BarChart3 },
          { href: "/app/management/leaderboard", label: "Leaderboard", icon: Award },
        ];
      case ROLES.ADMIN:
        return [
          { href: "/app/admin/dashboard", label: "Systems Overview", icon: LayoutDashboard },
          { href: "/app/admin/users", label: "User Management", icon: Users },
          { href: "/app/admin/moderation", label: "Moderation Queue", icon: ShieldCheck },
          { href: "/app/admin/audit-logs", label: "Audit Logs", icon: FileText },
        ];
      default:
        return [];
    }
  };

  const navLinks = getLinks();

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-[#121212] border-r border-obsidian-800 z-30 hidden md:flex flex-col">
      <div className="h-20 flex items-center px-8 border-b border-obsidian-800">
        <Link href={getDashboardRoute(role)} className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold to-teal-gold flex items-center justify-center">
            <span className="text-obsidian-900 font-bold text-lg">S</span>
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Synergy
          </span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-8 px-4 flex flex-col gap-2">
        <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          {role} portal
        </p>

        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors group",
                isActive ? "text-white" : "text-slate-400 hover:text-white hover:bg-obsidian-800"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gold/10 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gold rounded-r-full"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon className={cn("w-5 h-5 relative z-10", isActive ? "text-gold" : "text-slate-500 group-hover:text-slate-300")} />
              <span className="relative z-10">{link.label}</span>
            </Link>
          );
        })}
        
        {/* Special Recruiter Link visible only for Management to Demo */}
        {role === ROLES.MANAGEMENT && (
          <Link
            href="/app/recruiter/discover"
            className={cn(
              "relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors group mt-4 border border-teal-gold/30 bg-teal-gold/5",
              pathname === "/app/recruiter/discover" ? "text-white" : "text-teal-gold hover:text-white hover:bg-teal-gold/10 hover:border-teal-gold/50"
            )}
          >
            <Search className="w-5 h-5" />
            <span>Recruiter Engine</span>
          </Link>
        )}
      </nav>

      <div className="p-4 border-t border-obsidian-800">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-obsidian-800 transition-colors">
          <Settings className="w-5 h-5 text-slate-500" />
          Settings
        </button>
      </div>
    </div>
  );
}
