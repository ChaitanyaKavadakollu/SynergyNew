"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { AlertTriangle, CheckCircle2, XCircle, ChevronRight, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Severity = "critical" | "medium" | "info";

interface ModerationItem {
  id: string;
  severity: Severity;
  title: string;
  description: string;
  timeAgo: string;
  actions: { label: string; variant: "approve" | "reject" | "neutral" }[];
}

const moderationQueue: ModerationItem[] = [
  {
    id: "MOD-001",
    severity: "critical",
    title: 'Post #8842-X',
    description: '"Flagged for potential hate speech detected via automated NLP filter."',
    timeAgo: "2 mins ago",
    actions: [
      { label: "Dismiss", variant: "approve" },
      { label: "Remove Content", variant: "reject" },
    ],
  },
  {
    id: "MOD-002",
    severity: "medium",
    title: "User Profile: 'Z0neR'",
    description: '"Inappropriate avatar image detected by computer vision scan."',
    timeAgo: "14 mins ago",
    actions: [
      { label: "Approve", variant: "approve" },
      { label: "Request Change", variant: "reject" },
    ],
  },
  {
    id: "MOD-003",
    severity: "info",
    title: "System Trigger: Massive Login",
    description: "Detected 50+ failed login attempts from IP 192.168.1.1 (Stockholm, SE).",
    timeAgo: "1 hour ago",
    actions: [{ label: "Shadowban IP", variant: "neutral" }],
  },
  {
    id: "MOD-004",
    severity: "medium",
    title: "Activity ACT-712",
    description: '"Certificate image contains PII (Aadhaar number visible). Auto-flagged by scanner."',
    timeAgo: "3 hours ago",
    actions: [
      { label: "Redact & Approve", variant: "approve" },
      { label: "Reject", variant: "reject" },
    ],
  },
];

export default function ModerationQueuePage() {
  const [items, setItems] = useState(moderationQueue);

  const handleDismiss = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const severityConfig = {
    critical: {
      badge: "error" as const,
      label: "CRITICAL",
      border: "border-red-500/30",
      bg: "bg-red-500/5",
    },
    medium: {
      badge: "gold" as const,
      label: "MEDIUM",
      border: "border-gold/30",
      bg: "bg-gold/5",
    },
    info: {
      badge: "info" as const,
      label: "INFO",
      border: "border-blue-500/30",
      bg: "bg-blue-500/5",
    },
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">
            Moderation Queue
          </h1>
          <p className="text-slate-400">
            Review flagged content, user reports, and system-triggered alerts.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20">
            <AlertTriangle className="w-4 h-4 text-gold" />
            <span className="text-sm font-medium text-gold">
              {items.length} Pending
            </span>
          </div>
        </div>
      </div>

      {/* Queue */}
      <div className="space-y-4">
        <AnimatePresence>
          {items.map((item) => {
            const config = severityConfig[item.severity];
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  className={`p-6 ${config.border} ${config.bg} transition-all`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Badge variant={config.badge}>{config.label}</Badge>
                      <h3 className="font-semibold text-white text-lg">
                        {item.title}
                      </h3>
                    </div>
                    <span className="text-xs text-slate-500 whitespace-nowrap">
                      {item.timeAgo}
                    </span>
                  </div>

                  <p className="text-sm text-slate-400 italic mb-5 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-3">
                      {item.actions.map((action) => (
                        <button
                          key={action.label}
                          onClick={() => handleDismiss(item.id)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                            action.variant === "approve"
                              ? "border-green-500/30 text-green-400 hover:bg-green-500/10"
                              : action.variant === "reject"
                              ? "border-red-500/30 text-red-400 hover:bg-red-500/10"
                              : "border-obsidian-600 text-slate-300 hover:bg-obsidian-700"
                          }`}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                    <button className="text-sm text-slate-500 hover:text-white flex items-center gap-1 transition-colors">
                      Details <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {items.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Queue is Clear!
            </h3>
            <p className="text-slate-400">
              All flagged items have been reviewed.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
