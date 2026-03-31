"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { CheckCircle2, UploadCloud, Link as LinkIcon, Sparkles } from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/api";

export default function SubmitActivity() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [typeId, setTypeId] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [collaborators, setCollaborators] = useState("");

  const [activityTypes, setActivityTypes] = useState<any[]>([]);

  useEffect(() => {
    api.get('/reference/activity-types')
      .then(res => {
         setActivityTypes(res);
         if (res.length > 0) setTypeId(res[0].id);
      })
      .catch(console.error);
  }, []);

  const handleEnhance = async () => {
     if (!title || !description) return alert("Please fill out Title and Description first.");
     setIsEnhancing(true);
     try {
       const res = await api.post('/ai/enhance-description', { title, description });
       if (res.enhanced) setDescription(res.enhanced);
     } catch (e: any) {
       alert(e.message || "Enhancement failed");
     } finally {
       setIsEnhancing(false);
     }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // 1. Create Draft Activity
      const activityData = {
          title,
          type: typeId,
          description,
          start_date: date ? new Date(date).toISOString() : undefined,
          end_date: date ? new Date(date).toISOString() : undefined
      };
      const activity = await api.post('/activities', activityData);

      // 2. Submit Activity
      await api.post(`/activities/${activity.id}/submit`);

      // Mock proof + collab upload logic (Backend expects file uploads or separate patches)
      
      setIsSubmitted(true);
    } catch (e: any) {
      alert(e.message || "Submission failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto mt-10"
      >
        <Card className="p-10 text-center border-gold/30 bg-gold/5">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6 text-gold"
          >
            <CheckCircle2 className="w-10 h-10" />
          </motion.div>
          <h2 className="text-3xl font-semibold text-white mb-3">Activity Submitted!</h2>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            Your activity has been sent to the faculty verification queue. You will be notified once it's reviewed and added to your Skill Ledger.
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => setIsSubmitted(false)} variant="outline">Submit Another</Button>
            <Link href="/app/student/dashboard" passHref>
              <Button>Back to Dashboard</Button>
            </Link>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Log New Activity</h1>
        <p className="text-slate-400">Verifiable proof of work turns your efforts into credentialed skills.</p>
      </div>

      <Card className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Input
                label="Activity Title"
                placeholder="e.g. Built a React Native E-commerce App"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Activity Type</label>
              <select 
                value={typeId} 
                onChange={e => setTypeId(e.target.value)}
                className="w-full h-11 rounded-lg bg-obsidian-900 border border-obsidian-700 px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 cursor-pointer appearance-none">
                {activityTypes.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>

            <div>
               <Input
                label="Completion Date"
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                required
              />
            </div>
            
            <div className="md:col-span-2 relative">
              <label className="block text-sm font-medium text-slate-300 mb-1.5 flex justify-between">
                 <span>Description & Impact</span>
                 <button type="button" onClick={handleEnhance} disabled={isEnhancing} className="text-xs text-teal-gold flex items-center gap-1 hover:underline">
                    <Sparkles className="w-3 h-3"/> {isEnhancing ? "Enhancing..." : "Enhance with AI"}
                 </button>
              </label>
              <textarea 
                className="w-full h-32 rounded-lg bg-obsidian-900 border border-obsidian-700 p-4 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 resize-none"
                placeholder="Describe what you built, the technologies used, and the impact..."
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="md:col-span-2 p-6 rounded-xl border border-dashed border-obsidian-600 bg-obsidian-900/50 flex flex-col items-center justify-center text-center group hover:border-gold/50 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-obsidian-800 rounded-full flex items-center justify-center text-slate-400 group-hover:text-gold mb-3 transition-colors">
                <UploadCloud className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium text-slate-300 mb-1">Upload Certificates or Docs</p>
              <p className="text-xs text-slate-500">PDF, JPG, PNG up to 10MB</p>
            </div>

            <div className="md:col-span-2 relative">
              <Input
                label="Proof Link (GitHub, Live Site, Credential)"
                placeholder="https://github.com/..."
                type="url"
                value={link}
                onChange={e => setLink(e.target.value)}
              />
              <div className="absolute right-4 top-9 text-slate-500 pointer-events-none hidden">
                <LinkIcon className="w-4 h-4"/>
              </div>
            </div>

            <div className="md:col-span-2">
               <Input
                label="Collaborators (Emails, comma separated)"
                placeholder="teammate@university.edu"
                value={collaborators}
                onChange={e => setCollaborators(e.target.value)}
              />
            </div>
          </div>

          <div className="pt-6 border-t border-obsidian-700 flex justify-end gap-4">
            <Button type="button" variant="ghost">Cancel</Button>
            <Button type="submit" disabled={isLoading} className="min-w-[150px]">
              {isLoading ? "Submitting..." : "Submit for Verification"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
