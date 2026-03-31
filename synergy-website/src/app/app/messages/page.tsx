"use client";

import { useState } from "react";
import { mockMentorRequests, MentorRequest } from "@/mock/chatMessages";
import { useAuthStore } from "@/store/authStore";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Send, CheckCircle2, Clock, User, MessageSquare } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function MessagesPage() {
  const user = useAuthStore((s) => s.user);
  
  // In a real app, this would filter based on role (student sees requests sent BY them, mentor sees requests sent TO them)
  const allRequests = mockMentorRequests; 
  const [activeChat, setActiveChat] = useState<MentorRequest | null>(allRequests[0] || null);
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (!inputText.trim() || !activeChat) return;
    
    // Optimistic UI update logic would go here
    console.log("Sending:", inputText);
    setInputText("");
  };

  const isPendingStudent = activeChat?.status === "pending" && user?.role === "student";
  const charLimit = 500;
  const charsLeft = charLimit - inputText.length;

  return (
    <div className="flex h-full w-full bg-obsidian-900 overflow-hidden ml-[-1rem] mr-[-1rem] rounded-xl border border-obsidian-700">
      
      {/* Sidebar - Chat List */}
      <div className="w-80 border-r border-obsidian-700 bg-obsidian-800/50 flex flex-col h-full shrink-0">
        <div className="p-4 border-b border-obsidian-700 font-semibold text-white flex items-center justify-between">
          <span className="flex items-center gap-2"><MessageSquare className="w-4 h-4 text-gold" /> Messages</span>
          <span className="bg-obsidian-700 text-xs px-2 py-0.5 rounded-full text-slate-300">{allRequests.length}</span>
        </div>
        
        <div className="flex-grow overflow-y-auto">
          {allRequests.map((req) => (
            <div 
              key={req.id}
              onClick={() => setActiveChat(req)}
              className={`p-4 border-b border-obsidian-700/50 cursor-pointer transition-colors flex gap-3 ${activeChat?.id === req.id ? 'bg-obsidian-700/50 border-gold/30' : 'hover:bg-obsidian-800'}`}
            >
               <div className="w-10 h-10 rounded-full bg-obsidian-600 flex items-center justify-center shrink-0">
                 <User className="w-5 h-5 text-slate-400" />
               </div>
               <div className="min-w-0 flex-grow">
                 <div className="flex justify-between items-baseline mb-1">
                   <h4 className="font-medium text-white text-sm truncate">{req.mentorName}</h4>
                   <span className="text-[10px] text-slate-500 whitespace-nowrap ml-2">
                     {formatDistanceToNow(new Date(req.requestedAt), { addSuffix: true })}
                   </span>
                 </div>
                 <p className="text-xs text-slate-400 truncate">
                   {req.messages.length > 0 ? req.messages[req.messages.length - 1].content : req.introMessage}
                 </p>
                 <div className="mt-2">
                   {req.status === 'accepted' ? (
                     <span className="inline-flex items-center text-[10px] text-teal-400 font-medium bg-teal-400/10 px-1.5 py-0.5 rounded">
                       <CheckCircle2 className="w-3 h-3 mr-1" /> Active
                     </span>
                   ) : (
                     <span className="inline-flex items-center text-[10px] text-yellow-500 font-medium bg-yellow-500/10 px-1.5 py-0.5 rounded">
                       <Clock className="w-3 h-3 mr-1" /> Pending
                     </span>
                   )}
                 </div>
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      {activeChat ? (
        <div className="flex-1 flex flex-col h-full bg-obsidian-900 relative">
          
          {/* Chat Header */}
          <div className="h-16 border-b border-obsidian-700 bg-obsidian-800/80 px-6 flex items-center justify-between shrink-0">
             <div className="flex items-center gap-3">
               <h3 className="font-semibold text-white">{activeChat.mentorName}</h3>
               {activeChat.status === "pending" && (
                 <span className="text-xs text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded-md font-medium">Mentorship Pending</span>
               )}
             </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {activeChat.status === "pending" && (
              <div className="flex justify-start">
                <div className="max-w-[75%] bg-obsidian-800 border border-obsidian-700 text-slate-200 rounded-2xl rounded-tl-sm p-4 text-sm shadow-sm">
                  <p className="font-medium text-gold mb-1 text-xs">{activeChat.studentName} (Intro Request)</p>
                  {activeChat.introMessage}
                </div>
              </div>
            )}
            
            {activeChat.messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isMine ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] rounded-2xl p-4 text-sm shadow-sm ${
                  msg.isMine 
                  ? 'bg-gold text-obsidian-900 rounded-tr-sm' 
                  : 'bg-obsidian-800 border border-obsidian-700 text-slate-200 rounded-tl-sm'
                }`}>
                  {!msg.isMine && <p className="font-medium text-gold mb-1 text-xs">{msg.senderName}</p>}
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-obsidian-700 bg-obsidian-800/50 shrink-0">
             {isPendingStudent ? (
               <div className="bg-obsidian-900 border border-obsidian-700 rounded-xl p-4 text-center text-sm text-slate-400">
                  You have already sent your 1 allowed introduction message. Waiting for the mentor to accept.
               </div>
             ) : (
               <div className="flex flex-col gap-2 relative max-w-4xl mx-auto">
                 <div className="relative">
                    <textarea
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder={activeChat.status === 'pending' ? "Draft your initial intro (max 500 chars)..." : "Type a message..."}
                      className="w-full bg-obsidian-900 border border-obsidian-700 rounded-xl py-3 pl-4 pr-14 text-white placeholder:text-slate-500 focus:outline-none focus:border-gold resize-none text-sm min-h-[50px] max-h-32"
                      rows={1}
                      onKeyDown={(e) => {
                         if (e.key === 'Enter' && !e.shiftKey) {
                           e.preventDefault();
                           handleSend();
                         }
                      }}
                    />
                    <button 
                      onClick={handleSend}
                      disabled={!inputText.trim() || (activeChat.status === "pending" && charsLeft < 0)}
                      className="absolute right-2 top-2 p-2 bg-gold text-obsidian-900 rounded-lg hover:bg-gold-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                 </div>
                 
                 {activeChat.status === "pending" && (
                   <div className="flex justify-end pr-2">
                     <span className={`text-[10px] font-medium ${charsLeft < 0 ? 'text-red-400' : 'text-slate-500'}`}>
                       {charsLeft} chars remaining
                     </span>
                   </div>
                 )}
               </div>
             )}
          </div>

        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-obsidian-900/50">
          <div className="text-center text-slate-500">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>Select a conversation to start messaging</p>
          </div>
        </div>
      )}
    </div>
  );
}
