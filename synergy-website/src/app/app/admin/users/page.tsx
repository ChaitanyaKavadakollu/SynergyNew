"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { Search, Download, UserPlus, MoreHorizontal, Shield, Edit, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const users = [
  {
    id: "USR-001",
    name: "Alex Vance",
    email: "alex.v@domain.com",
    role: "Contributor",
    status: "Active" as const,
    joined: "Oct 12, 2023",
  },
  {
    id: "USR-002",
    name: "Sarah Miller",
    email: "s.miller@domain.com",
    role: "Editor",
    status: "Offline" as const,
    joined: "Jan 05, 2024",
  },
  {
    id: "USR-003",
    name: "Unknown Entity",
    email: "bot-455@proxy.net",
    role: "User",
    status: "Banned" as const,
    joined: "Feb 14, 2024",
  },
  {
    id: "USR-004",
    name: "Priya Kapoor",
    email: "priya.k@synergy.edu",
    role: "Contributor",
    status: "Active" as const,
    joined: "Mar 22, 2024",
  },
  {
    id: "USR-005",
    name: "James Chen",
    email: "j.chen@synergy.edu",
    role: "Admin",
    status: "Active" as const,
    joined: "Aug 01, 2023",
  },
];

export default function UserManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "text-green-400";
      case "Offline":
        return "text-slate-500";
      case "Banned":
        return "text-red-500";
      default:
        return "text-slate-400";
    }
  };

  const roleBadge = (role: string) => {
    switch (role) {
      case "Admin":
        return "gold";
      case "Editor":
        return "teal";
      case "Contributor":
        return "info";
      default:
        return "default";
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">
            User Management
          </h1>
          <p className="text-slate-400">
            Manage all platform accounts, roles, and access levels.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
          <Button className="flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            Add User
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-obsidian-900 border border-obsidian-700 rounded-lg pl-10 pr-4 py-2.5 focus:ring-1 focus:ring-gold focus:border-gold outline-none text-sm transition-all text-white placeholder:text-slate-500"
          />
        </div>
      </Card>

      {/* User Directory Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-obsidian-700 bg-obsidian-800/50">
                <th className="px-6 py-4 text-xs font-semibold text-gold uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gold uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gold uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gold uppercase tracking-wider">
                  Account Created
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gold uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-obsidian-700">
              {filtered.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-obsidian-800/30 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar
                        fallback={user.name.split(" ").map((n) => n[0]).join("")}
                        size="sm"
                      />
                      <div>
                        <div className="font-medium text-white">
                          {user.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={roleBadge(user.role) as any}>
                      {user.role.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          user.status === "Active"
                            ? "bg-green-400"
                            : user.status === "Banned"
                            ? "bg-red-500"
                            : "bg-slate-500"
                        }`}
                      />
                      <span
                        className={`text-sm font-medium ${statusColor(
                          user.status
                        )}`}
                      >
                        {user.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-300">
                    {user.joined}
                  </td>
                  <td className="px-6 py-4 text-right relative">
                    <button
                      onClick={() =>
                        setOpenMenu(openMenu === user.id ? null : user.id)
                      }
                      className="p-2 rounded-lg hover:bg-obsidian-700 text-slate-400 hover:text-white transition-colors"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                    <AnimatePresence>
                      {openMenu === user.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -5 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -5 }}
                          className="absolute right-6 top-14 bg-obsidian-800 border border-obsidian-700 rounded-xl shadow-2xl z-50 w-44 py-2 overflow-hidden"
                        >
                          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-obsidian-700 hover:text-white transition-colors">
                            <Edit className="w-4 h-4" /> Edit User
                          </button>
                          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-obsidian-700 hover:text-white transition-colors">
                            <Shield className="w-4 h-4" /> Change Role
                          </button>
                          {user.status === "Banned" ? (
                            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gold hover:bg-gold/10 transition-colors">
                              <Shield className="w-4 h-4" /> Reinstate
                            </button>
                          ) : (
                            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                              <Trash2 className="w-4 h-4" /> Ban User
                            </button>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              No users found matching your search.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
