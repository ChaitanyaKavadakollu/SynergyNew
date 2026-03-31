"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Trophy, TrendingUp, Search } from "lucide-react";

const talentPool: any[] = [];

export default function LeaderboardPage() {
  const sortedTalent = [...talentPool].sort((a, b) => b.skillScore - a.skillScore);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
         <h1 className="text-3xl font-bold text-white mb-2">Student Leaderboard</h1>
         <p className="text-slate-400">Top performers ranked by verified skill readiness score.</p>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
             <thead className="text-xs uppercase bg-obsidian-900/50 text-slate-500">
                <tr>
                   <th className="px-6 py-4 font-medium w-16 text-center">Rank</th>
                   <th className="px-6 py-4 font-medium">Student</th>
                   <th className="px-6 py-4 font-medium text-center">Score</th>
                   <th className="px-6 py-4 font-medium text-center">Projects</th>
                   <th className="px-6 py-4 font-medium">Trend</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-obsidian-700">
                {sortedTalent.map((student, index) => (
                  <tr key={student.id} className="hover:bg-obsidian-800/50 transition-colors">
                     <td className="px-6 py-4 text-center font-bold text-lg">
                       <span className={index === 0 ? "text-gold" : index === 1 ? "text-slate-300" : index === 2 ? "text-amber-700" : "text-slate-600"}>
                         #{index + 1}
                       </span>
                     </td>
                     <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-full overflow-hidden bg-obsidian-700">
                              {student.avatarUrl ? (
                                <img src={student.avatarUrl} alt={student.name} className="w-full h-full object-cover" />
                              ) : (
                                <span className="w-full h-full flex items-center justify-center font-medium text-slate-400">{student.name[0]}</span>
                              )}
                           </div>
                           <div>
                              <div className="font-medium text-white">{student.name}</div>
                              <div className="text-xs text-slate-500">{student.department}</div>
                           </div>
                        </div>
                     </td>
                     <td className="px-6 py-4 text-center">
                        <Badge variant="gold" className="px-3 py-1 text-sm">{student.skillScore}</Badge>
                     </td>
                     <td className="px-6 py-4 text-center font-medium text-slate-300">
                        {student.verifiedProjects}
                     </td>
                     <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-teal-gold text-xs font-medium">
                           <TrendingUp className="w-3.5 h-3.5" /> Rising
                        </div>
                     </td>
                  </tr>
                ))}
             </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
