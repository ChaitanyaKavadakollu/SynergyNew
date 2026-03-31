"use client";

import { useAuthStore } from "@/store/authStore";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { api } from "@/lib/api";
import { SkillRadarChart } from "@/components/charts/SkillRadarChart";
import { ProfileCompletionBar } from "@/components/dashboard/ProfileCompletionBar";
import { Activity, Target, TrendingUp, Compass, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { RadialProgress } from "@/components/ui/RadialProgress";

export default function StudentDashboard() {
  const user = useAuthStore((s) => s.user);
  
  const [dashboard, setDashboard] = useState<any>(null);
  const [recentActivity, setRecentActivity] = useState<any>(null);

  useEffect(() => {
    // Top-down dashboard aggregator
    api.get('/student/dashboard')
      .then(res => setDashboard(res))
      .catch(() => {});

    // Recent activities (we just grab the first one)
    api.get('/activities')
      .then(res => {
         if (res && res.length > 0) setRecentActivity(res[0]);
      })
      .catch(() => {});
  }, []);

  if (!dashboard) {
    return <div className="p-10 text-center text-slate-400">Loading your career cockpit...</div>;
  }

  const {
      readiness_score,
      target_role,
      verified_activities,
      growth_trajectory,
      radar_data,
      recommended_mentor,
      ai_insight
  } = dashboard;

  return (
    <div className="space-y-6 lg:space-y-10">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Career Cockpit</h1>
          <p className="text-slate-400">Welcome back, {user?.name}. Here's your career progress snapshot.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/app/student/activity" className="inline-flex items-center justify-center h-10 px-4 rounded-lg bg-gold text-obsidian-900 font-medium hover:bg-gold-400 transition-colors">
            Log Activity
          </Link>
          <Link href="/app/student/assistant" className="inline-flex items-center justify-center h-10 px-4 rounded-lg bg-teal-gold/10 text-teal-gold border border-teal-gold/20 font-medium hover:bg-teal-gold/20 transition-colors gap-2">
            Ask AI Assistant
          </Link>
        </div>
      </div>

      <ProfileCompletionBar />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 flex flex-col justify-between items-center text-center" hoverEffect>
          <RadialProgress value={readiness_score} label={`${readiness_score}`} sublabel={`Top ${dashboard.top_percentile}%`} color="gold" size={130} />
          <p className="text-slate-400 text-sm font-medium mt-4">Skill Readiness Score</p>
        </Card>

        <Card className="p-6 flex flex-col justify-between" hoverEffect>
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-teal-gold/10 flex items-center justify-center text-teal-gold">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-slate-400 text-sm font-medium mb-1">Verified Activities</p>
            <h3 className="text-3xl font-bold text-white">{verified_activities}</h3>
          </div>
        </Card>

        <Card className="p-6 flex flex-col justify-between" hoverEffect>
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            {growth_trajectory === 'Rising' && <Badge variant="info">Rising Trend</Badge>}
          </div>
          <div>
            <p className="text-slate-400 text-sm font-medium mb-1">Growth Trajectory</p>
            <h3 className="text-xl font-bold text-white">{growth_trajectory}</h3>
          </div>
        </Card>

        <Card className="p-6 flex flex-col justify-between" hoverEffect>
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
              <Compass className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-slate-400 text-sm font-medium mb-1">Target Role Match</p>
            <h3 className="text-xl font-bold text-white max-w-full truncate">{target_role}</h3>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
        
        {/* Left Column - Large visual or chart */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 min-h-[400px]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">Skill Analysis Radar</h2>
              <Badge>Real-time</Badge>
            </div>
            <div className="h-64 flex items-center justify-center bg-obsidian-900/50 rounded-xl border border-obsidian-700/50">
               {radar_data.length > 0 ? (
                 <SkillRadarChart data={radar_data} height={280} />
               ) : (
                 <div className="text-center p-6 text-slate-500">
                   <p>Complete an activity to reveal your radar.</p>
                 </div>
               )}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">Recent Verified Activity</h2>
              <Link href="/app/student/activity" className="text-sm text-gold hover:underline flex items-center">
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            {recentActivity ? (
              <div className="flex gap-4 items-start p-4 rounded-xl bg-obsidian-900/50 border border-obsidian-700">
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center text-gold shrink-0">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-lg">{recentActivity.title}</h4>
                  <p className="text-sm text-slate-400 mb-2 capitalize">{recentActivity.activity_type?.name || recentActivity.type} • {new Date(recentActivity.start_date || recentActivity.date).toLocaleDateString()}</p>
                  <p className="text-sm text-slate-300">{recentActivity.description}</p>
                </div>
              </div>
            ) : (
              <p className="text-slate-500 text-sm">No recent activities logged.</p>
            )}
          </Card>
        </div>

        {/* Right Column - Top skills and mentor matches */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Top Assessed Skills</h2>
            <div className="flex flex-wrap gap-2">
              {dashboard.top_skills.length > 0 ? dashboard.top_skills.map((skill: any) => (
                <span key={skill.name} className="px-3 py-1.5 rounded-lg bg-obsidian-900 border border-obsidian-700 text-sm text-slate-300 font-medium">
                  {skill.name}
                </span>
              )) : (
                <p className="text-sm text-slate-500">No skills assessed yet.</p>
              )}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold text-white mb-1">Recommended Mentor</h2>
            <p className="text-xs text-slate-400 mb-6">Based on your career trajectory</p>
            
            <div className="flex flex-col gap-4">
              {recommended_mentor ? (
                <>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-obsidian-700 shrink-0">
                       <img src={recommended_mentor.avatar} alt={recommended_mentor.name} className="w-full h-full object-cover"/>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{recommended_mentor.name}</h4>
                      <p className="text-xs text-gold">{recommended_mentor.title}</p>
                      <p className="text-xs text-slate-400">{recommended_mentor.company}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" fullWidth>Request Mentorship</Button>
                </>
              ) : (
                <p className="text-slate-500 text-sm">No mentor match found.</p>
              )}
            </div>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-teal-gold/10 to-transparent border-teal-gold/20">
             <h2 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                <SparklesIcon /> AI Insight
             </h2>
             <p className="text-sm text-slate-300 mb-4 leading-relaxed">
               {ai_insight}
             </p>
             <Link href="/app/student/assistant" className="text-teal-gold text-sm font-medium hover:underline flex items-center gap-1">
               Chat with Career Assistant <ChevronRight className="w-4 h-4"/>
             </Link>
          </Card>
        </div>

      </div>
    </div>
  );
}

function SparklesIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-gold">
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  );
}
