"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Search, Filter, Download, ChevronRight } from "lucide-react";

// Mock student report data
const studentReports = [
  {
    id: "STU-001",
    name: "Rahul Sharma",
    department: "Computer Science",
    verifiedActivities: 12,
    pendingVerifications: 1,
    readinessScore: 86,
    lastActive: "2 hours ago",
    status: "Excellent",
  },
  {
    id: "STU-002",
    name: "Aditi Desai",
    department: "Information Technology",
    verifiedActivities: 8,
    pendingVerifications: 0,
    readinessScore: 78,
    lastActive: "1 day ago",
    status: "Good",
  },
  {
    id: "STU-003",
    name: "Vikram Singh",
    department: "Design",
    verifiedActivities: 15,
    pendingVerifications: 3,
    readinessScore: 92,
    lastActive: "Just now",
    status: "Outstanding",
  },
  {
    id: "STU-004",
    name: "Neha Patel",
    department: "Business Administration",
    verifiedActivities: 4,
    pendingVerifications: 0,
    readinessScore: 65,
    lastActive: "3 days ago",
    status: "Needs Attention",
  },
];

export default function StudentReportsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = studentReports.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    student.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">
            Student Reports
          </h1>
          <p className="text-slate-400">
            Monitor student progress, verification statuses, and holistic readiness scores.
          </p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Cohort Data
        </Button>
      </div>

      {/* Filters & Search */}
      <Card className="p-4 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by student name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-obsidian-900 border border-obsidian-700 rounded-lg pl-10 pr-4 py-2 focus:ring-1 focus:ring-gold focus:border-gold outline-none text-sm transition-all text-white placeholder:text-slate-500"
          />
        </div>
        <Button variant="secondary" className="flex items-center gap-2 whitespace-nowrap">
          <Filter className="w-4 h-4" />
          Filter by Department
        </Button>
      </Card>

      {/* Reports Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-obsidian-700 bg-obsidian-800/50">
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Student</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Department</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Activities</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Score</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-obsidian-700">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-obsidian-800/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar fallback={student.name.charAt(0)} size="sm" />
                      <div>
                        <div className="font-medium text-white">{student.name}</div>
                        <div className="text-xs text-slate-500">{student.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-300">{student.department}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm text-white">{student.verifiedActivities} Verified</span>
                      {student.pendingVerifications > 0 && (
                        <span className="text-xs text-gold">{student.pendingVerifications} Pending</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-1.5 bg-obsidian-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-teal-gold rounded-full" 
                          style={{ width: `${student.readinessScore}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-white">{student.readinessScore}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge 
                      variant={
                        student.status === "Excellent" || student.status === "Outstanding" ? "success" : 
                        student.status === "Good" ? "teal" : "gold"
                      }
                    >
                      {student.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm" className="hidden group-hover:inline-flex">
                      View Profile <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredStudents.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              No students found matching your search.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
