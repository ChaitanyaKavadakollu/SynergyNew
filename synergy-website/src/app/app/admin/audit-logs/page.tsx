"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Download, Filter, Terminal } from "lucide-react";

type LogLevel = "INFO" | "WARN" | "SYS" | "HEARTBEAT" | "POLL";

interface LogEntry {
  id: string;
  timestamp: string;
  level: LogLevel;
  message: string;
}

const auditLogs: LogEntry[] = [
  {
    id: "LOG-001",
    timestamp: "14:22:01",
    level: "INFO",
    message: "Admin 'JohnDoe' accessed user settings for 'Alex Vance'.",
  },
  {
    id: "LOG-002",
    timestamp: "14:21:45",
    level: "WARN",
    message: "Potential Brute Force detected on Endpoint: /api/v1/login",
  },
  {
    id: "LOG-003",
    timestamp: "14:19:30",
    level: "SYS",
    message: "Automated daily backup completed successfully. (2.4GB)",
  },
  {
    id: "LOG-004",
    timestamp: "14:15:12",
    level: "INFO",
    message: "New user registration: ID-88992 (Region: NA-EAST)",
  },
  {
    id: "LOG-005",
    timestamp: "14:10:05",
    level: "WARN",
    message: "Database connection latency spike: 340ms detected.",
  },
  {
    id: "LOG-006",
    timestamp: "14:05:00",
    level: "HEARTBEAT",
    message: "Microservice cluster health: 99.9%",
  },
  {
    id: "LOG-007",
    timestamp: "14:22:30",
    level: "POLL",
    message: "Syncing with global CDN nodes...",
  },
  {
    id: "LOG-008",
    timestamp: "13:58:22",
    level: "INFO",
    message: "Faculty 'Prof. Turing' verified activity ACT-1042.",
  },
  {
    id: "LOG-009",
    timestamp: "13:45:11",
    level: "SYS",
    message: "SSL certificate renewal completed for *.synergy.edu.",
  },
  {
    id: "LOG-010",
    timestamp: "13:30:00",
    level: "WARN",
    message: "Rate limit threshold exceeded for API key: sk-****-9x2f.",
  },
];

export default function AuditLogsPage() {
  const levelColor = (level: LogLevel) => {
    switch (level) {
      case "INFO":
        return "text-teal-gold";
      case "WARN":
        return "text-gold";
      case "SYS":
        return "text-green-400";
      case "HEARTBEAT":
        return "text-blue-400";
      case "POLL":
        return "text-slate-500";
    }
  };

  const levelBorder = (level: LogLevel) => {
    switch (level) {
      case "WARN":
        return "border-l-2 border-l-gold";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">
            System Audit Logs
          </h1>
          <p className="text-slate-400">
            Real-time system event stream and security audit trail.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Logs
          </Button>
        </div>
      </div>

      {/* Terminal Header */}
      <Card className="overflow-hidden bg-[#0d0d0d] border-obsidian-700">
        {/* Terminal Title Bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-obsidian-800 border-b border-obsidian-700">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex items-center gap-2 ml-3">
            <Terminal className="w-4 h-4 text-slate-500" />
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Terminal-Log: v1.0.4-Synergy
            </span>
          </div>
          <div className="ml-auto">
            <Badge variant="success">Live</Badge>
          </div>
        </div>

        {/* Log Entries */}
        <div className="p-4 space-y-1 font-mono text-sm max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-obsidian-700 scrollbar-track-transparent">
          {auditLogs.map((log) => (
            <div
              key={log.id}
              className={`flex gap-4 px-3 py-2.5 rounded hover:bg-obsidian-800/50 transition-colors ${levelBorder(
                log.level
              )}`}
            >
              <span className="text-slate-600 whitespace-nowrap shrink-0">
                [{log.timestamp}]
              </span>
              <span
                className={`whitespace-nowrap shrink-0 font-semibold ${levelColor(
                  log.level
                )}`}
              >
                {log.level}:
              </span>
              <span className="text-slate-300">{log.message}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
