"use client";

import { useAuthStore } from "@/store/authStore";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Bookmark, MapPin, Search, SlidersHorizontal, Star, MessageSquare, Briefcase, ChevronRight, CheckCircle2, Code } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const talentPool: any[] = [];

export default function RecruiterDiscoveryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [selectedCandidate, setSelectedCandidate] = useState<typeof talentPool[0] | null>(null);

  const filteredTalent = talentPool.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.skills.map((s: string) => s.toLowerCase()).includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "All Roles" || t.targetRole === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col xl:flex-row gap-6">
      
      {/* Left Column: Search & List */}
      <div className="flex-1 flex flex-col gap-6 xl:max-w-md h-full">
        <div>
           <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
             <Search className="w-6 h-6 text-teal-gold" />
             Talent Discovery Engine
           </h1>
           <p className="text-sm text-slate-400">Identify top vetted candidates mathematically matched to your open roles.</p>
        </div>

        <Card className="p-4 bg-obsidian-800 border-obsidian-700 shrink-0">
          <div className="flex gap-3 mb-4">
             <div className="relative flex-1">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
               <input 
                 type="text" 
                 placeholder="Search by skill (e.g., React, ML) or name..."
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="w-full h-10 bg-obsidian-900 border border-obsidian-700 rounded-lg pl-10 pr-4 text-sm text-white focus:outline-none focus:border-teal-gold focus:ring-1 focus:ring-teal-gold"
               />
             </div>
             <Button variant="outline" className="w-10 px-0 h-10">
               <SlidersHorizontal className="w-4 h-4" />
             </Button>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            <Badge variant="teal" className="cursor-pointer shrink-0">Match: Systems Engineer</Badge>
            <Badge variant="default" className="cursor-pointer shrink-0">Department: CS</Badge>
            <Badge variant="default" className="cursor-pointer shrink-0">Grad: 2025</Badge>
          </div>
        </Card>

        {/* Candidate List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-obsidian-700 scrollbar-track-transparent">
          {filteredTalent.length === 0 ? (
             <div className="text-center p-8 text-slate-500">No candidates match your criteria.</div>
          ) : (
             filteredTalent.map(candidate => (
               <Card 
                 key={candidate.id} 
                 onClick={() => setSelectedCandidate(candidate)}
                 className={`p-4 cursor-pointer transition-all border ${selectedCandidate?.id === candidate.id ? 'border-teal-gold bg-teal-gold/5 shadow-[0_0_15px_rgba(0,180,216,0.15)]' : 'border-obsidian-700 bg-obsidian-800 hover:border-obsidian-600'}`}
               >
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-obsidian-700 shrink-0 border border-obsidian-600">
                      {candidate.avatarUrl ? (
                        <img src={candidate.avatarUrl} alt={candidate.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="w-full h-full flex items-center justify-center font-medium text-slate-400">{candidate.name[0]}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                       <h3 className="font-semibold text-white truncate">{candidate.name}</h3>
                       <p className="text-xs text-slate-400 capitalize truncate">{candidate.department}</p>
                       <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs font-medium text-teal-gold bg-teal-gold/10 px-2 py-0.5 rounded-full">{candidate.compatibility}% Match</span>
                       </div>
                    </div>
                 </div>
               </Card>
             ))
          )}
        </div>
      </div>

      {/* Right Column: Detail View */}
      <Card className="flex-[2] overflow-hidden bg-obsidian-900 border-obsidian-700 hidden xl:flex flex-col relative">
         <AnimatePresence mode="wait">
            {selectedCandidate ? (
              <motion.div 
                key={selectedCandidate.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col overflow-y-auto"
              >
                 <div className="h-40 bg-gradient-to-r from-obsidian-800 to-teal-gold/10 relative">
                    <div className="absolute -bottom-12 left-8 w-24 h-24 rounded-2xl overflow-hidden border-4 border-obsidian-900 bg-obsidian-700 shadow-xl">
                      {selectedCandidate.avatarUrl ? (
                         <img src={selectedCandidate.avatarUrl} alt={selectedCandidate.name} className="w-full h-full object-cover" />
                      ) : (
                         <span className="w-full h-full flex items-center justify-center text-3xl font-bold text-slate-400">{selectedCandidate.name[0]}</span>
                      )}
                    </div>
                    <div className="absolute top-6 right-6">
                       <Button size="sm" className="bg-white text-obsidian-900 hover:bg-slate-200">
                          <MessageSquare className="w-4 h-4 mr-2" /> Message Candidate
                       </Button>
                    </div>
                 </div>

                 <div className="pt-16 px-8 pb-8">
                    <div className="flex justify-between items-start mb-8">
                       <div>
                          <h2 className="text-3xl font-bold text-white mb-1">{selectedCandidate.name}</h2>
                          <p className="text-slate-400 text-lg">{selectedCandidate.department}</p>
                       </div>
                       <Card className="flex items-center gap-4 px-6 py-3 bg-obsidian-800 border-obsidian-700">
                          <div>
                            <p className="text-xs text-slate-400 uppercase tracking-widest font-medium mb-1">Rank Score</p>
                            <p className="text-2xl font-bold text-white">{selectedCandidate.skillScore}</p>
                          </div>
                          <div className="w-px h-10 bg-obsidian-700"></div>
                          <div>
                            <p className="text-xs text-slate-400 uppercase tracking-widest font-medium mb-1">Suitability</p>
                            <p className="text-2xl font-bold text-teal-gold">{selectedCandidate.compatibility}%</p>
                          </div>
                       </Card>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                       <div className="space-y-6">
                          <div>
                             <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4 border-b border-obsidian-800 pb-2 flex items-center gap-2">
                               <CheckCircle2 className="w-4 h-4 text-teal-gold" /> Verified Skills
                             </h3>
                             <div className="flex flex-wrap gap-2">
                                {selectedCandidate.skills.map((skill: string) => (
                                  <Badge key={skill} variant="default" className="px-3 py-1.5 bg-obsidian-800 border-obsidian-700">
                                    {skill}
                                  </Badge>
                                ))}
                             </div>
                          </div>

                          <div>
                             <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4 border-b border-obsidian-800 pb-2">
                               Growth & Analytics
                             </h3>
                             <div className="bg-obsidian-800/50 border border-obsidian-700 rounded-xl p-4">
                                <p className="text-sm text-slate-400 mb-2">Trend Analysis showing a <span className="text-gold font-medium">high learning velocity</span> over the last 6 months.</p>
                                <div className="h-2 w-full bg-obsidian-900 rounded-full overflow-hidden">
                                   <div className="h-full bg-gradient-to-r from-teal-gold to-gold w-[85%]"></div>
                                </div>
                             </div>
                          </div>
                       </div>

                       <div>
                          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4 border-b border-obsidian-800 pb-2 flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-gold" /> Evidence Portfolio
                          </h3>
                          <div className="space-y-4">
                             {[1, 2, 3].map((item) => (
                                <div key={item} className="flex gap-4 p-4 rounded-xl border border-obsidian-800 bg-obsidian-800/30 hover:bg-obsidian-800 transition-colors cursor-pointer group">
                                   <div className="w-10 h-10 rounded-lg bg-obsidian-900 flex items-center justify-center shrink-0 border border-obsidian-700 text-slate-400 group-hover:text-gold transition-colors">
                                      {item === 1 ? <Code className="w-5 h-5"/> : <Briefcase className="w-5 h-5" />}
                                   </div>
                                   <div>
                                      <h4 className="text-sm font-medium text-white mb-1 group-hover:text-gold transition-colors">Project Portfolio Item {item}</h4>
                                      <p className="text-xs text-slate-400">Verified by Faculty • Score: 98/100</p>
                                   </div>
                                </div>
                             ))}
                          </div>
                       </div>
                    </div>
                 </div>
              </motion.div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 text-center bg-obsidian-900">
                 <div className="w-20 h-20 rounded-full bg-obsidian-800 flex items-center justify-center mb-6 border border-obsidian-700">
                   <Search className="w-8 h-8 text-slate-500" />
                 </div>
                 <h2 className="text-xl font-semibold text-white mb-2">Select a Candidate</h2>
                 <p className="max-w-md">Click on a candidate profile from the discovery list to view their verified credentials, skill matrices, and proof-of-work portfolio.</p>
              </div>
            )}
         </AnimatePresence>
      </Card>

    </div>
  );
}
