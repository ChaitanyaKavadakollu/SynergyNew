"use client";

import { useAuthStore } from "@/store/authStore";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Check, X, MessageSquare, AlertCircle, FileText, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { mockSignups } from "@/mock/signups";

export default function FacultyVerificationDashboard() {
  const user = useAuthStore(s => s.user);
  const router = useRouter();
  
  const [queue, setQueue] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/activities/queue', {credentials: 'include'})
      .then(r => r.json())
      .then(res => { if (res.data) setQueue(res.data); })
      .catch((e) => console.error(e));
  }, []);

  const handleAction = async (id: string, action: "verify" | "reject") => {
    try {
      const res = await fetch(`http://localhost:4000/api/v1/activities/${id}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          status: action === 'verify' ? 'verified' : 'rejected'
        })
      });
      if (res.ok) {
        setQueue(prev => prev.filter(a => a.id !== id));
      }
    } catch {
      // Opt UI Update failed
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Verification Queue</h1>
          <p className="text-slate-400">Review student activity submissions and validate credentials.</p>
        </div>
        <Button 
          variant="outline" 
          className="gap-2"
          onClick={() => router.push("/app/faculty/reports")}
        >
          <FileText className="w-4 h-4" />
          View Student Reports
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Student Approvals Queue */}
        <Card className="overflow-hidden flex flex-col h-[600px]">
          <div className="p-6 border-b border-obsidian-700 flex justify-between items-center bg-obsidian-900/50">
             <h2 className="text-lg font-semibold text-white flex items-center gap-2">
               <UserPlus className="w-5 h-5 text-gold" />
               Student Signups
             </h2>
             <Badge>{mockSignups.filter(s => s.type === "student" && s.status === "pending").length} Pending</Badge>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {mockSignups.filter(s => s.type === "student" && s.status === "pending").map(req => (
              <div key={req.id} className="p-4 rounded-xl bg-obsidian-900 border border-obsidian-700 flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-white">{req.name}</h4>
                    <p className="text-xs text-slate-400">{req.email}</p>
                  </div>
                  <span className="text-[10px] text-slate-500">{new Date(req.submittedAt).toLocaleDateString()}</span>
                </div>
                <div className="text-sm text-slate-300">
                  <p><span className="text-slate-500">Dept:</span> {req.department}</p>
                  <p><span className="text-slate-500">Year:</span> {(req as any).year} • {(req as any).universityId}</p>
                </div>
                <div className="flex items-center justify-between mt-2 pt-3 border-t border-obsidian-700/50">
                  <a href="#" className="text-xs text-gold flex items-center hover:underline">
                    <FileText className="w-3 h-3 mr-1" /> View ID Proof
                  </a>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="h-7 text-xs border-green-500/30 text-green-400 hover:bg-green-500/10 px-2">Approve</Button>
                    <Button size="sm" variant="outline" className="h-7 text-xs border-red-500/30 text-red-400 hover:bg-red-500/10 px-2">Reject</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Activity Verification Queue */}
        <Card className="overflow-hidden flex flex-col h-[600px]">
          <div className="p-6 border-b border-obsidian-700 flex justify-between items-center bg-obsidian-900/50">
             <h2 className="text-lg font-semibold text-white flex items-center gap-2">
               <Check className="w-5 h-5 text-teal-gold" />
               Activity Submissions
             </h2>
             <Badge variant="info">{queue.length} Pending</Badge>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
             {queue.length === 0 ? (
                <div className="text-center text-slate-500 py-10">Queue is empty</div>
             ) : (
                queue.map(item => (
                  <div key={item.id} className="p-4 rounded-xl bg-obsidian-800/50 border border-obsidian-700 flex flex-col gap-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-white text-sm">{item.student?.first_name || item.studentName} {item.student?.last_name || ''}</h4>
                        <p className="text-[10px] text-slate-400">{item.student_id || item.studentId}</p>
                      </div>
                      <Badge variant="info" className="text-[10px]">Pending</Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-200">{item.title}</p>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1">{item.description}</p>
                    </div>
                    {item.evidence_urls && item.evidence_urls.length > 0 && (
                      <a href={item.evidence_urls[0]} target="_blank" className="text-xs text-teal-gold flex items-center hover:underline mt-1">
                        <FileText className="w-3 h-3 mr-1" /> View Activity Proof
                      </a>
                    )}
                    <div className="flex items-center justify-end mt-2 pt-3 border-t border-obsidian-700/50 gap-2">
                        <Button size="sm" variant="outline" className="h-7 w-7 p-0" title="Request Revision">
                          <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                        </Button>
                        <Button onClick={() => handleAction(item.id, "reject")} size="sm" variant="danger" className="h-7 text-xs px-2" title="Reject">
                          Reject
                        </Button>
                        <Button onClick={() => handleAction(item.id, "verify")} size="sm" className="h-7 text-xs px-2 bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30">
                          Approve
                        </Button>
                    </div>
                  </div>
                ))
             )}
          </div>
        </Card>
        
      </div>

      
      {/* Alert Banner Example */}
      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex gap-3 text-red-100 text-sm">
         <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
         <div>
            <p className="font-semibold text-red-400 mb-1">Attention Required: Revision Deadlines</p>
            <p className="text-red-300/80">3 student activities in your queue have been pending revision for over 14 days and will automatically expire on Friday.</p>
         </div>
      </div>
    </div>
  );
}
