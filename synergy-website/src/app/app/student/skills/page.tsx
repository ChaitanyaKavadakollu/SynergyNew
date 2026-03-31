"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Award, Code, Palette, Briefcase, ChevronRight } from "lucide-react";
import { api } from "@/lib/api";
import Link from "next/link";

export default function SkillsPage() {
  const [ledger, setLedger] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/skills/ledger')
      .then(res => setLedger(res))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
     return <div className="p-10 text-center text-slate-400">Loading skill ledger...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">My Skill Ledger</h1>
        <p className="text-slate-400">Your verified repository of capabilities.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ledger.length === 0 && (
           <Card className="col-span-full p-10 text-center flex flex-col items-center">
              <Award className="w-12 h-12 text-slate-600 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Your Ledger is Empty</h3>
              <p className="text-slate-400 mb-6 max-w-sm">Skills will appear here automatically once your first activity is verified by faculty.</p>
           </Card>
        )}

        {ledger.map((item: any, i: number) => (
          <Card key={item.skill_id} className="p-6 flex items-start gap-4" hoverEffect>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${i % 2 === 0 ? 'bg-gold/10 text-gold' : 'bg-teal-gold/10 text-teal-gold'}`}>
               {i % 2 === 0 ? <Code className="w-6 h-6"/> : <Palette className="w-6 h-6"/>}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                <Badge variant="success">Verified</Badge>
              </div>
              <p className="text-sm text-slate-400 mb-3">Backed by {item.entries_count} verified projects.</p>
              
              <div className="w-full h-1.5 bg-obsidian-700 rounded-full overflow-hidden">
                <div className={`h-full ${i % 2 === 0 ? 'bg-gold' : 'bg-teal-gold'}`} style={{ width: `${Math.min(Number(item.proficiency_level) * 100, 100)}%` }} />
              </div>
            </div>
          </Card>
        ))}

        <Link href="/app/student/activity" passHref>
          <Card className="p-6 flex flex-col items-center justify-center text-center border-dashed border-obsidian-600 bg-obsidian-900/50 hover:border-gold/30 transition-colors group cursor-pointer min-h-[160px] h-full">
            <div className="w-12 h-12 bg-obsidian-800 rounded-full flex items-center justify-center text-slate-400 group-hover:text-gold mb-3 transition-colors">
                <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-medium text-slate-300 group-hover:text-white transition-colors">Add New Skill</h3>
            <p className="text-sm text-slate-500 mt-1">Submit activity for verification</p>
          </Card>
        </Link>
      </div>
    </div>
  );
}
