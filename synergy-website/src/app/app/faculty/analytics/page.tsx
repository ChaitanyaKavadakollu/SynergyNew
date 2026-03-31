"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Download, TrendingUp, AlertTriangle } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Learning Velocity data (Modules completed per student per week)
const learningVelocity = [
  { week: "Wk 1", current: 42, global: 35 },
  { week: "Wk 2", current: 38, global: 36 },
  { week: "Wk 3", current: 55, global: 37 },
  { week: "Wk 4", current: 48, global: 38 },
  { week: "Wk 5", current: 62, global: 39 },
  { week: "Wk 6", current: 58, global: 40 },
];

// Skill distribution for donut
const skillDistribution = [
  { name: "Technical Skills", value: 45, color: "#D4A373" },
  { name: "Soft Skills", value: 25, color: "#7FB0A6" },
  { name: "Project Based", value: 18, color: "#555555" },
  { name: "Certification", value: 12, color: "#B8860B" },
];

// Skill gaps
const skillGaps = [
  {
    skill: "System Architecture",
    severity: "critical" as const,
    competency: 32,
    benchmark: 75,
    color: "#ef4444",
  },
  {
    skill: "Microservices Design",
    severity: "moderate" as const,
    competency: 48,
    benchmark: 70,
    color: "#D4A373",
  },
  {
    skill: "CI/CD Automation",
    severity: "moderate" as const,
    competency: 52,
    benchmark: 80,
    color: "#3b82f6",
  },
  {
    skill: "GraphQL API Design",
    severity: "low" as const,
    competency: 65,
    benchmark: 70,
    color: "#7FB0A6",
  },
];

// Trending skills
const trendingSkills = [
  {
    category: "Fullstack TypeScript",
    students: 42,
    velocity: 8.4,
    trend: "+12%",
    positive: true,
  },
  {
    category: "AWS Serverless",
    students: 38,
    velocity: 7.9,
    trend: "+5%",
    positive: true,
  },
  {
    category: "App Security (OWASP)",
    students: 31,
    velocity: 6.2,
    trend: "~0%",
    positive: false,
  },
  {
    category: "Event Driven Arch",
    students: 25,
    velocity: 9.1,
    trend: "+18%",
    positive: true,
  },
];

export default function FacultyAnalyticsPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">
            Analytics Overview
          </h1>
          <p className="text-slate-400">
            Monitoring performance metrics across all active cohorts.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="text-sm">
            Focus Role: Engineering Lead
          </Button>
          <Button variant="outline" className="text-sm">
            Cohort: Q1 Alpha Group
          </Button>
          <Button className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Top Row: Readiness Score + Learning Velocity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Aggregate Readiness Score */}
        <Card className="p-6 flex flex-col">
          <h3 className="text-xs font-semibold text-gold uppercase tracking-wider mb-6">
            Aggregate Readiness Score
          </h3>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative w-48 h-48 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { value: 75 },
                      { value: 25 },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    <Cell fill="#D4A373" />
                    <Cell fill="#2a2a2a" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-white">75</span>
                <span className="text-xs text-slate-500">%</span>
              </div>
            </div>
            <p className="text-xs text-green-400 mb-4">+4.2% from last week</p>
            <div className="flex gap-6">
              <div className="text-center px-4 py-2 rounded-lg bg-obsidian-800 border border-obsidian-700">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                  Target Score
                </p>
                <p className="text-lg font-bold text-white">85%</p>
              </div>
              <div className="text-center px-4 py-2 rounded-lg bg-obsidian-800 border border-obsidian-700">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                  Participants
                </p>
                <p className="text-lg font-bold text-white">124</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Learning Velocity */}
        <Card className="p-6 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-gold uppercase tracking-wider">
              Learning Velocity
            </h3>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-gold" /> Current
                Cohort
              </span>
              <span className="flex items-center gap-1.5 text-slate-500">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />{" "}
                Global Avg
              </span>
            </div>
          </div>
          <p className="text-sm text-slate-500 mb-6">
            Modules completed per student per week
          </p>
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={learningVelocity} barGap={4}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#2a2a2a"
                  vertical={false}
                />
                <XAxis
                  dataKey="week"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e1e1e",
                    border: "1px solid #333",
                  }}
                />
                <Bar
                  dataKey="current"
                  fill="#D4A373"
                  radius={[4, 4, 0, 0]}
                  barSize={20}
                />
                <Bar
                  dataKey="global"
                  fill="#444444"
                  radius={[4, 4, 0, 0]}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Bottom Row: Skill Gaps + Trending Skills */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Skill Gaps Identified */}
        <Card className="p-6">
          <h3 className="text-xs font-semibold text-gold uppercase tracking-wider mb-6">
            Skill Gaps Identified
          </h3>
          <div className="space-y-4">
            {skillGaps.map((gap) => (
              <div
                key={gap.skill}
                className="p-4 rounded-xl bg-obsidian-800/50 border border-obsidian-700"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-white">{gap.skill}</span>
                  <Badge
                    variant={
                      gap.severity === "critical"
                        ? "error"
                        : gap.severity === "moderate"
                        ? "gold"
                        : "teal"
                    }
                  >
                    {gap.severity.toUpperCase()}
                  </Badge>
                </div>
                <div className="h-1.5 w-full bg-obsidian-900 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${gap.competency}%`,
                      backgroundColor: gap.color,
                    }}
                  />
                </div>
                <p className="text-xs text-slate-500">
                  {gap.competency}% Competency vs {gap.benchmark}% Benchmark
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Trending Skills in Cohort */}
        <Card className="p-6">
          <h3 className="text-xs font-semibold text-gold uppercase tracking-wider mb-6">
            Trending Skills in Cohort
          </h3>
          <table className="w-full">
            <thead>
              <tr className="text-xs text-slate-500 uppercase tracking-wider">
                <th className="text-left pb-4 font-medium">Skill Category</th>
                <th className="text-center pb-4 font-medium">Velocity</th>
                <th className="text-right pb-4 font-medium">Trend (7D)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-obsidian-700">
              {trendingSkills.map((skill) => (
                <tr
                  key={skill.category}
                  className="hover:bg-obsidian-800/30 transition-colors"
                >
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-obsidian-800 border border-obsidian-700 flex items-center justify-center text-gold">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium text-white text-sm">
                          {skill.category}
                        </p>
                        <p className="text-xs text-slate-500">
                          {skill.students} students active
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <span className="text-lg font-bold text-white">
                      {skill.velocity}
                    </span>
                  </td>
                  <td className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span
                        className={`text-sm font-medium ${
                          skill.positive ? "text-green-400" : "text-slate-500"
                        }`}
                      >
                        {skill.trend}
                      </span>
                      {/* Mini bar visualization */}
                      <div className="flex items-end gap-0.5 h-5">
                        {[3, 5, 4, 6, 7].map((h, i) => (
                          <div
                            key={i}
                            className={`w-1 rounded-t-sm ${
                              skill.positive
                                ? "bg-gold"
                                : "bg-slate-600"
                            }`}
                            style={{ height: `${h * 3}px` }}
                          />
                        ))}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      {/* Skill Distribution Donut */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="p-6 flex flex-col items-center">
          <h3 className="text-xs font-semibold text-gold uppercase tracking-wider mb-6 self-start">
            Skill Distribution
          </h3>
          <div className="w-48 h-48 relative mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={skillDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {skillDistribution.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-white">82%</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                Placement Ready
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
            {skillDistribution.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-slate-400">{item.name}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 lg:col-span-2">
          <h3 className="text-xs font-semibold text-gold uppercase tracking-wider mb-6">
            Export Batch Data
          </h3>
          <p className="text-sm text-slate-400 mb-6">
            Download compiled reports for executive review.
          </p>
          <div className="space-y-3">
            {[
              "Student Performance Report",
              "Cohort Comparison Analysis",
              "Skill Gap Deep Dive",
            ].map((report) => (
              <div
                key={report}
                className="flex items-center justify-between p-4 rounded-xl bg-obsidian-800/50 border border-obsidian-700 hover:border-gold/30 transition-colors cursor-pointer group"
              >
                <span className="text-sm text-white group-hover:text-gold transition-colors">
                  {report}
                </span>
                <Download className="w-4 h-4 text-slate-500 group-hover:text-gold transition-colors" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
