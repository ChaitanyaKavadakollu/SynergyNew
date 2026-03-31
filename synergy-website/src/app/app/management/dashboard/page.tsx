"use client";

import { useAuthStore } from "@/store/authStore";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { analytics } from "@/mock/analytics";
const mockSignups: any[] = [];
const mentors: any[] = [];
import { BadgeAwards } from "@/components/ui/BadgeAwards";
import { TrendingUp, Users, Activity, Target, BarChart3, CheckCircle2, XCircle, FileText, Medal } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ManagementDashboard() {
  const user = useAuthStore(s => s.user);
  const router = useRouter();

  const pendingFaculty = mockSignups.filter(s => s.type === "faculty" && s.status === "pending");
  const topMentors = [...mentors].sort((a, b) => b.feedbackScore - a.feedbackScore).slice(0, 3);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Performance Overview</h1>
          <p className="text-slate-400">University-wide skill accumulation and placement readiness metrics.</p>
        </div>
        <Button 
          variant="outline" 
          className="gap-2"
          onClick={() => router.push("/app/management/analytics")}
        >
          <BarChart3 className="w-4 h-4" />
          View Global Analytics
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 flex flex-col justify-between" hoverEffect>
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-obsidian-700 flex items-center justify-center text-slate-300">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div>
             <p className="text-slate-400 text-sm font-medium mb-1">Total Students Enrolled</p>
             <h3 className="text-3xl font-bold text-white">{analytics.students}</h3>
          </div>
        </Card>

        <Card className="p-6 flex flex-col justify-between" hoverEffect>
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-teal-gold/10 flex items-center justify-center text-teal-gold">
              <Activity className="w-5 h-5" />
            </div>
            <Badge variant="success">+12% MoM</Badge>
          </div>
          <div>
            <p className="text-slate-400 text-sm font-medium mb-1">Verified Activities</p>
            <h3 className="text-3xl font-bold text-white">{analytics.verifiedActivities}</h3>
          </div>
        </Card>

        <Card className="p-6 flex flex-col justify-between" hoverEffect>
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold">
              <Target className="w-5 h-5" />
            </div>
             <Badge variant="success">On Track</Badge>
          </div>
          <div>
            <p className="text-slate-400 text-sm font-medium mb-1">Avg Readiness Score</p>
            <h3 className="text-3xl font-bold text-white">{analytics.placementReadinessScore}<span className="text-lg text-slate-500">/100</span></h3>
          </div>
        </Card>

        <Card className="p-6 flex flex-col justify-between" hoverEffect>
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-slate-400 text-sm font-medium mb-1">Active Departments</p>
            <h3 className="text-3xl font-bold text-white">{analytics.departments}</h3>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <Card className="p-6 lg:col-span-2 min-h-[400px]">
            <h2 className="text-lg font-semibold text-white mb-6">University Growth Trajectory</h2>
            <div className="h-72 w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analytics.growthTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#232323" vertical={false} />
                    <XAxis dataKey="month" stroke="#94A3B8" tick={{ fill: '#94A3B8', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis stroke="#94A3B8" tick={{ fill: '#94A3B8', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1C1C1C', borderColor: '#232323', borderRadius: '8px' }}
                      itemStyle={{ color: '#D4A373' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      name="Readiness Score"
                      stroke="#D4A373" 
                      strokeWidth={3}
                      dot={{ fill: '#121212', stroke: '#D4A373', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: '#D4A373' }}
                    />
                  </LineChart>
               </ResponsiveContainer>
            </div>
         </Card>

         <Card className="p-6 flex flex-col">
            <h2 className="text-lg font-semibold text-white mb-6">Department Heatmap</h2>
            <div className="flex-1 space-y-4">
               {analytics.departmentSkillHeatmap.map(dept => (
                 <div key={dept.department} className="space-y-2">
                    <div className="flex justify-between text-sm">
                       <span className="text-slate-300 font-medium">{dept.department}</span>
                       <span className="text-gold font-medium">Top: React</span>
                    </div>
                    {/* Simulated Heatmap Bar */}
                    <div className="h-2 w-full rounded-full bg-obsidian-900 overflow-hidden flex">
                       <div className="h-full bg-gold" style={{ width: `${dept.React}%` }} title={`React: ${dept.React}%`} />
                       <div className="h-full bg-teal-gold" style={{ width: `${dept.Python}%` }} title={`Python: ${dept.Python}%`}/>
                       <div className="h-full bg-blue-500/50" style={{ width: `${dept.ML}%` }} title={`ML: ${dept.ML}%`}/>
                    </div>
                 </div>
               ))}
               
               <div className="mt-auto pt-6 border-t border-obsidian-700">
                  <h3 className="text-sm font-medium text-slate-400 mb-3">Skill Demand Forecast</h3>
                  <div className="flex flex-wrap gap-2">
                     <Badge variant="gold">System Design +40%</Badge>
                     <Badge variant="teal">PyTorch +25%</Badge>
                  </div>
               </div>
            </div>
         </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Faculty Approvals Queue */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-teal-gold" />
            Faculty Approvals Queue
            <span className="ml-auto bg-teal-gold/20 text-teal-gold text-xs py-1 px-2 rounded-full">{pendingFaculty.length} Pending</span>
          </h2>
          
          <div className="space-y-4">
            {pendingFaculty.length > 0 ? (
              pendingFaculty.map(req => (
                <div key={req.id} className="p-4 rounded-xl bg-obsidian-900 border border-obsidian-700 flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="flex-1">
                     <h4 className="font-medium text-white">{req.name}</h4>
                     <p className="text-sm text-slate-400 mb-1">{req.department} • {(req as any).employeeId}</p>
                     <p className="text-xs text-slate-500 flex items-center gap-1">
                        <FileText className="w-3 h-3" /> Proof: <a href="#" className="text-gold hover:underline">{req.proofUrl}</a>
                     </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button size="sm" variant="outline" className="border-green-500/30 text-green-400 hover:bg-green-500/10 px-3">
                      <CheckCircle2 className="w-4 h-4 mr-1" /> Approve
                    </Button>
                    <Button size="sm" variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/10 px-3">
                      <XCircle className="w-4 h-4 mr-1" /> Reject
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-500 text-sm italic">No pending faculty requests.</p>
            )}
          </div>
        </Card>

        {/* Mentor Excellence Leaderboard */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Medal className="w-5 h-5 text-gold" />
            Mentor Excellence Leaderboard
          </h2>
          
          <div className="space-y-4 overflow-hidden rounded-xl border border-obsidian-700">
             <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-obsidian-800 text-slate-400">
                   <tr>
                      <th className="px-4 py-3 font-medium">Mentor</th>
                      <th className="px-4 py-3 font-medium text-center">Mentees</th>
                      <th className="px-4 py-3 font-medium text-center">Feedback</th>
                      <th className="px-4 py-3 font-medium text-right">Award</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-obsidian-700 bg-obsidian-900">
                   {topMentors.map((mentor, idx) => (
                      <tr key={mentor.id} className="hover:bg-obsidian-800/50 transition-colors">
                         <td className="px-4 py-3">
                            <p className="font-medium text-white">{mentor.name}</p>
                            <p className="text-xs text-slate-500">{mentor.specialization}</p>
                         </td>
                         <td className="px-4 py-3 text-center text-slate-300 font-medium">{mentor.menteesCount}</td>
                         <td className="px-4 py-3 text-center text-gold font-medium">{mentor.feedbackScore}%</td>
                         <td className="px-4 py-3 text-right">
                           {idx === 0 && <BadgeAwards type="gold" />}
                           {idx === 1 && <BadgeAwards type="silver" />}
                           {idx === 2 && <BadgeAwards type="rising" />}
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
        </Card>
      </div>

    </div>
  );
}
