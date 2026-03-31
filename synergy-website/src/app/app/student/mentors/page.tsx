"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { TiltCard } from "@/components/ui/TiltCard";
import { ShieldCheck, MessageSquare, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api";

export default function MentorsPage() {
  const [mentors, setMentors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedMentor, setSelectedMentor] = useState<any | null>(null);
  const [introMessage, setIntroMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    api.get('/mentors')
      .then(res => setMentors(res))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const charLimit = 500;
  const charsLeft = charLimit - introMessage.length;

  const handleRequestSubmit = async () => {
    if (introMessage.length > charLimit || introMessage.length === 0 || !selectedMentor) return;
    setIsSubmitting(true);
    
    try {
      await api.post(`/mentors/${selectedMentor.id}/request`, { intro_message: introMessage });
      alert("Request sent successfully!");
      setSelectedMentor(null);
      setIntroMessage("");
    } catch (e: any) {
      alert(e.message || "Failed to send request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
     return <div className="p-10 text-center text-slate-400">Loading Mentor Discovery...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Mentor Network</h1>
        <p className="text-slate-400">Connect with industry leaders based on your skill trajectory.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mentors.length === 0 && (
           <p className="text-slate-500">No mentors available at the moment.</p>
        )}
        {mentors.map((mentor) => (
          <TiltCard key={mentor.id} className="p-0 overflow-hidden flex flex-col h-full bg-obsidian-900 shadow-xl relative min-h-[400px]">
             <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-obsidian-800 to-obsidian-900 border-b border-obsidian-700 pointer-events-none" />
             
             {mentor.match_score >= 80 && (
               <div className="absolute top-4 right-4 z-20">
                 <Badge variant="success">Great Match ({mentor.match_score}%)</Badge>
               </div>
             )}

             <div className="relative pt-8 px-6 flex flex-col items-center text-center">
               <div className="w-24 h-24 rounded-full border-4 border-obsidian-900 bg-obsidian-800 overflow-hidden mb-4 z-10 shadow-lg shrink-0">
                  {mentor.avatar ? (
                    <img src={mentor.avatar} alt={mentor.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="w-full h-full flex items-center justify-center text-slate-500 text-3xl font-bold bg-obsidian-800">{mentor.name[0]}</span>
                  )}
               </div>
               
               <h3 className="text-xl font-bold text-white mb-1 flex items-center justify-center gap-1.5 line-clamp-1">
                  {mentor.name}
                  <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
               </h3>
               <p className="text-sm font-medium text-gold mb-1 line-clamp-1">{mentor.role}</p>
               <p className="text-xs text-slate-400 mb-6">{mentor.company}</p>
             </div>

             <div className="px-6 flex flex-wrap justify-center gap-2 mb-6 text-center">
                {mentor.domains.slice(0, 3).map((domain: string) => (
                   <span key={domain} className="text-xs px-2 py-1 bg-obsidian-800 text-slate-300 rounded-md border border-obsidian-700">{domain}</span>
                ))}
             </div>

             <div className="px-6 pb-6 mt-auto">
                <Button 
                   fullWidth 
                   variant="outline" 
                   onClick={() => setSelectedMentor(mentor)}
                   className="border-gold/30 text-gold-400 hover:bg-gold/10 transition-colors"
                >
                   Request Mentorship
                </Button>
             </div>
          </TiltCard>
        ))}
      </div>

      {/* Request Mentorship Modal */}
      <AnimatePresence>
        {selectedMentor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-obsidian-900/80 backdrop-blur-sm"
              onClick={() => !isSubmitting && setSelectedMentor(null)}
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-obsidian-900 border border-obsidian-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10"
            >
              <div className="p-6 border-b border-obsidian-800 flex justify-between items-center bg-obsidian-900/50">
                <div>
                  <h2 className="text-xl font-semibold text-white">Connection Request</h2>
                  <p className="text-sm text-slate-400 mt-1">
                    Send a direct note to <span className="text-gold font-medium">{selectedMentor.name}</span>
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-obsidian-800 overflow-hidden shrink-0">
                  <img src={selectedMentor.avatar} alt={selectedMentor.name} className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label htmlFor="intro" className="block text-sm font-medium text-slate-300 mb-2">
                    Why do you want to connect?
                  </label>
                  <textarea
                    id="intro"
                    rows={5}
                    placeholder={`Hi ${selectedMentor.name.split(' ')[0]},\nI'm seeking guidance on...`}
                    value={introMessage}
                    onChange={(e) => setIntroMessage(e.target.value)}
                    className="w-full rounded-xl p-4 bg-obsidian-800 border-obsidian-700 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold resize-none"
                  />
                  
                  <div className="flex justify-between items-center mt-2">
                    <span className={`text-xs ${charsLeft < 0 ? 'text-red-400' : charsLeft < 50 ? 'text-yellow-500' : 'text-slate-500'}`}>
                      {charsLeft} characters remaining
                    </span>
                    
                    {charsLeft < 0 && (
                      <span className="text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> Exceeds limit
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-obsidian-800 flex justify-end gap-3 bg-obsidian-800/20">
                <Button 
                  variant="ghost" 
                  onClick={() => setSelectedMentor(null)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleRequestSubmit}
                  disabled={isSubmitting || introMessage.length === 0 || charsLeft < 0}
                  className="bg-gold text-obsidian-900 hover:bg-gold-400 px-8"
                >
                  {isSubmitting ? "Sending..." : "Send Request"}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
