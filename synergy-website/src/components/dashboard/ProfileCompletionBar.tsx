"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { api } from "@/lib/api";

export function ProfileCompletionBar() {
  const [data, setData] = useState<{ percentage: number; items: any[] } | null>(null);

  useEffect(() => {
    api.get('/student/profile-completion')
       .then(res => setData(res))
       .catch(() => {});
  }, []);

  if (!data || data.percentage === 100) return null;

  return (
    <div className="bg-obsidian-900 border border-obsidian-700 rounded-xl p-4 mb-8">
      <div className="flex justify-between items-center mb-2">
         <h4 className="text-sm font-medium text-white flex gap-2 items-center">
            Profile Completion <span className="text-gold font-bold">{data.percentage}%</span>
         </h4>
         <p className="text-xs text-slate-400 hidden sm:block">Complete these steps to maximize mentor visibility</p>
      </div>
      
      <div className="relative w-full h-2 bg-obsidian-800 rounded-full overflow-hidden flex">
         <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-gold to-teal-gold transition-all duration-1000 ease-out"
            style={{ width: `${data.percentage}%` }}
         />
      </div>
      
      <div className="flex justify-between mt-3 text-xs">
         {data.items.slice(0, 5).map((req, i) => (
            <div key={i} className={`flex items-center gap-1 ${req.done ? 'text-teal-gold' : 'text-slate-500'}`}>
               <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${req.done ? 'bg-teal-gold/20 border-teal-gold' : 'border-slate-700 bg-obsidian-800'}`}>
                  {req.done && <Check className="w-2.5 h-2.5" />}
               </div>
               <span className="hidden md:inline">{req.label}</span>
            </div>
         ))}
      </div>
    </div>
  );
}
