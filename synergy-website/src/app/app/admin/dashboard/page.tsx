"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Users, Server, AlertTriangle, ShieldCheck, CheckCircle2, XCircle, FileText } from "lucide-react";
import { mockSignups } from "@/mock/signups";

export default function AdminDashboard() {
  const pendingManagement = mockSignups.filter(s => s.type === "management" && s.status === "pending");

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
         <h1 className="text-3xl font-bold text-white mb-2">Systems Overview</h1>
         <p className="text-slate-400">Platform health and global moderation controls.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4 text-slate-400">
            <span className="text-sm font-medium">Total Users</span>
            <Users className="w-5 h-5 text-blue-400" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-2">1,204</h3>
          <Badge variant="success" className="text-xs">+12 Today</Badge>
        </Card>
        
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4 text-slate-400">
            <span className="text-sm font-medium">System Health</span>
            <Server className="w-5 h-5 text-green-400" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-2">100%</h3>
          <span className="text-xs text-slate-500 font-medium">All APIs Operational</span>
        </Card>

        <Card className="p-6 border-gold/30">
          <div className="flex justify-between items-center mb-4 text-slate-400">
            <span className="text-sm font-medium">Pending Moderation</span>
            <AlertTriangle className="w-5 h-5 text-gold" />
          </div>
          <h3 className="text-3xl font-bold text-gold mb-2">14</h3>
          <span className="text-xs text-slate-500 font-medium">Flagged Activities</span>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-4 text-slate-400">
            <span className="text-sm font-medium">Verified Credentials</span>
            <ShieldCheck className="w-5 h-5 text-teal-gold" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-2">8,932</h3>
          <span className="text-xs text-slate-500 font-medium">Across all ledgers</span>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold text-white mb-6">Recent System Logs</h2>
        <div className="space-y-4 font-mono text-sm overflow-x-auto">
          <div className="flex gap-4 p-3 rounded bg-obsidian-900/50 text-slate-300">
            <span className="text-slate-500">10:42 AM</span>
            <span className="text-teal-gold whitespace-nowrap">[AUTH]</span>
            <span className="truncate">User STU-892 successfully authenticated. Session ID: xyz...</span>
          </div>
          <div className="flex gap-4 p-3 rounded bg-obsidian-900/50 text-slate-300">
            <span className="text-slate-500">10:40 AM</span>
            <span className="text-blue-400 whitespace-nowrap">[API_V1]</span>
            <span className="truncate">Skill graph cached matrix generated in 42ms.</span>
          </div>
          <div className="flex gap-4 p-3 rounded bg-obsidian-900/50 text-slate-300 border-l border-gold">
            <span className="text-slate-500">10:35 AM</span>
            <span className="text-gold whitespace-nowrap">[MODERATION]</span>
            <span className="truncate">Activity ACT-500 flagged by heuristic scanner. Reason: PII detected.</span>
          </div>
          <div className="flex gap-4 p-3 rounded bg-obsidian-900/50 text-slate-300">
            <span className="text-slate-500">10:15 AM</span>
            <span className="text-green-400 whitespace-nowrap">[DB_SYNC]</span>
            <span className="truncate">Daily snapshot completed. 154MB written.</span>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-gold" />
            Management Approvals Queue
          </h2>
          <Badge>{pendingManagement.length} Pending</Badge>
        </div>
        
        <div className="space-y-4">
          {pendingManagement.length > 0 ? (
            pendingManagement.map(req => (
              <div key={req.id} className="p-4 rounded-xl bg-obsidian-900 border border-obsidian-700 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex-1">
                   <h4 className="font-medium text-white">{req.name}</h4>
                   <p className="text-sm text-slate-400 mb-1">{(req as any).roleTitle} • {req.department}</p>
                   <p className="text-xs text-slate-500 flex items-center gap-1">
                      <FileText className="w-3 h-3" /> Official Auth Letter: <a href="#" className="text-gold hover:underline">{req.proofUrl}</a>
                   </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button size="sm" variant="outline" className="border-green-500/30 text-green-400 hover:bg-green-500/10 px-3">
                    <CheckCircle2 className="w-4 h-4 mr-1" /> Approve Access
                  </Button>
                  <Button size="sm" variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/10 px-3">
                    <XCircle className="w-4 h-4 mr-1" /> Deny
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-slate-500 text-sm italic">No pending management requests.</p>
          )}
        </div>
      </Card>
    </div>
  );
}
