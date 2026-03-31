"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { BarChart3, TrendingUp, Users, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

// Mock data for analytics
const departmentPerformance = [
  { name: "Computer Science", score: 88, active: 450 },
  { name: "Information Tech", score: 82, active: 380 },
  { name: "Design", score: 91, active: 210 },
  { name: "Business", score: 76, active: 300 },
];

const yearlyGrowth = [
  { month: "Jan", users: 1200 },
  { month: "Feb", users: 1500 },
  { month: "Mar", users: 2100 },
  { month: "Apr", users: 2800 },
  { month: "May", users: 3600 },
  { month: "Jun", users: 4500 },
];

export default function GlobalAnalyticsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">
            Global Analytics
          </h1>
          <p className="text-slate-400">
            Comprehensive platform metrics, adoption rates, and departmental performance.
          </p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export PDF Report
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-gold" />
            </div>
            <span className="text-sm font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
              +18% MoM
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">4,500</h3>
          <p className="text-sm text-slate-400">Total Active Users</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-teal-gold/10 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-teal-gold" />
            </div>
            <span className="text-sm font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
              +5% MoM
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">82/100</h3>
          <p className="text-sm text-slate-400">Average Readiness Score</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-obsidian-700 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
              +32% MoM
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">12,450</h3>
          <p className="text-sm text-slate-400">Total Verified Activities</p>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* User Growth */}
        <Card className="p-6 flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">User Acquisition Growth</h3>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={yearlyGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
                <XAxis 
                  dataKey="month" 
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
                  tickFormatter={(value) => `${value}`} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#1e1e1e", border: "1px solid #333" }}
                  itemStyle={{ color: "#d4a373" }}
                />
                <Line 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#d4a373" 
                  strokeWidth={3} 
                  dot={{ fill: "#d4a373", strokeWidth: 2, r: 4 }} 
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Department Performance */}
        <Card className="p-6 flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Department Readiness Scores</h3>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentPerformance} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" horizontal={true} vertical={false} />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  width={120}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#1e1e1e", border: "1px solid #333" }}
                  cursor={{ fill: "#2a2a2a" }}
                />
                <Bar 
                  dataKey="score" 
                  fill="#7fb0a6" 
                  radius={[0, 4, 4, 0]} 
                  barSize={24}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
