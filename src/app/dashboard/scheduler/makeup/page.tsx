"use client";

import React, { useState } from "react";
import { 
  CalendarClock, Search, Filter, MoreHorizontal, 
  CheckCircle2, XCircle, Clock, User, Calendar,
  ArrowRight, Check, X
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function SchedulerMakeupManager() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"pending" | "scheduled" | "history">("pending");

  const makeupRequests = [
    { id: 1, student: "Yousuf Ali", date: "May 10, 2024", time: "05:00 PM", reason: "Family Event", status: "pending", submitted: "2 hours ago" },
    { id: 2, student: "Aisha Khan", date: "May 12, 2024", time: "10:30 AM", reason: "Medical Appointment", status: "pending", submitted: "5 hours ago" },
    { id: 3, student: "Zainab Ahmad", date: "May 08, 2024", time: "02:00 PM", reason: "Exam Prep", status: "scheduled", teacher: "Ustadha Fatima" },
    { id: 4, student: "Omar Farooq", date: "May 05, 2024", time: "07:00 PM", reason: "Travel", status: "completed", teacher: "Hafiz Rahman" },
  ];

  const pendingRequests = makeupRequests.filter(r => r.status === "pending");
  const scheduledRequests = makeupRequests.filter(r => r.status === "scheduled");
  const historyRequests = makeupRequests.filter(r => r.status === "completed" || r.status === "cancelled");

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      <Sidebar role="scheduler" className="hidden md:flex w-64 shrink-0" />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar title="Makeup Class Manager" onMenuClick={() => setSidebarOpen(true)} userName="Scheduler Admin" userRole="Operations" />

        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-muted/30">
          
          {/* Header Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
             <div className="bg-card border border-border p-5 rounded-2xl shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                   <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                      <Clock size={20} />
                   </div>
                   <span className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider">Pending Requests</span>
                </div>
                <div className="text-3xl font-black text-foreground">{pendingRequests.length}</div>
             </div>
             <div className="bg-card border border-border p-5 rounded-2xl shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                   <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <Calendar size={20} />
                   </div>
                   <span className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider">Scheduled Today</span>
                </div>
                <div className="text-3xl font-black text-foreground">5</div>
             </div>
             <div className="bg-card border border-border p-5 rounded-2xl shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                   <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                      <CheckCircle2 size={20} />
                   </div>
                   <span className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider">Completion Rate</span>
                </div>
                <div className="text-3xl font-black text-foreground">92%</div>
             </div>
          </div>

          {/* Main Manager UI */}
          <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col">
             <div className="p-4 border-b border-border bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex bg-muted p-1 rounded-xl w-fit">
                   {(["pending", "scheduled", "history"] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                          "px-6 py-2 rounded-lg text-[13px] font-bold capitalize transition-all",
                          activeTab === tab ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {tab}
                      </button>
                   ))}
                </div>
                <div className="flex items-center gap-2">
                   <div className="relative">
                      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input 
                        type="text" 
                        placeholder="Search student..." 
                        className="h-10 pl-10 pr-4 bg-muted/50 border border-border rounded-xl text-sm focus:border-primary outline-none transition-all w-[240px]"
                      />
                   </div>
                   <button className="h-10 w-10 flex items-center justify-center rounded-xl border border-border hover:bg-muted transition-all text-muted-foreground">
                      <Filter size={18} />
                   </button>
                </div>
             </div>

             <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                   <thead>
                      <tr className="bg-muted/30 border-b border-border">
                         <th className="p-4 text-[11px] font-black uppercase tracking-widest text-muted-foreground">Student Name</th>
                         <th className="p-4 text-[11px] font-black uppercase tracking-widest text-muted-foreground">Requested For</th>
                         <th className="p-4 text-[11px] font-black uppercase tracking-widest text-muted-foreground">Reason</th>
                         {activeTab === "pending" ? (
                            <th className="p-4 text-[11px] font-black uppercase tracking-widest text-muted-foreground">Submitted</th>
                         ) : (
                            <th className="p-4 text-[11px] font-black uppercase tracking-widest text-muted-foreground">Assigned Teacher</th>
                         )}
                         <th className="p-4 text-[11px] font-black uppercase tracking-widest text-muted-foreground text-right">Actions</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-border">
                      {(activeTab === "pending" ? pendingRequests : activeTab === "scheduled" ? scheduledRequests : historyRequests).map((req) => (
                        <tr key={req.id} className="hover:bg-muted/20 transition-colors group">
                           <td className="p-4">
                              <div className="flex items-center gap-3">
                                 <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                                    {req.student.charAt(0)}
                                 </div>
                                 <div className="text-[14px] font-bold text-foreground">{req.student}</div>
                              </div>
                           </td>
                           <td className="p-4">
                              <div className="space-y-1">
                                 <div className="text-[13px] font-bold text-foreground">{req.date}</div>
                                 <div className="text-[11px] font-medium text-muted-foreground">{req.time}</div>
                              </div>
                           </td>
                           <td className="p-4">
                              <span className="text-[12px] font-medium text-muted-foreground italic truncate max-w-[150px] inline-block">
                                 "{req.reason}"
                              </span>
                           </td>
                           <td className="p-4">
                              {activeTab === "pending" ? (
                                 <span className="text-[12px] font-bold text-amber-600">{req.submitted}</span>
                              ) : (
                                 <div className="flex items-center gap-2">
                                    <div className="h-6 w-6 rounded-full bg-slate-200 border border-white" />
                                    <span className="text-[13px] font-bold text-foreground">{req.teacher}</span>
                                 </div>
                              )}
                           </td>
                           <td className="p-4 text-right">
                              {activeTab === "pending" ? (
                                 <div className="flex items-center justify-end gap-2">
                                    <button className="h-8 px-4 rounded-lg bg-primary text-white text-[11px] font-black uppercase tracking-wider hover:bg-primary/90 transition-all flex items-center gap-1.5 shadow-sm">
                                       <Check size={14} /> Assign
                                    </button>
                                    <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-border text-rose-500 hover:bg-rose-50 hover:border-rose-200 transition-all">
                                       <X size={16} />
                                    </button>
                                 </div>
                              ) : (
                                 <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground transition-colors">
                                    <MoreHorizontal size={18} />
                                 </button>
                              )}
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>

             {/* Footer Info */}
             <div className="p-4 bg-muted/10 border-t border-border flex items-center justify-between">
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
                   Showing {activeTab === "pending" ? pendingRequests.length : activeTab === "scheduled" ? scheduledRequests.length : historyRequests.length} results
                </p>
                <div className="flex items-center gap-1">
                   <button className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-muted transition-all"><ArrowRight size={14} className="rotate-180" /></button>
                   <button className="h-8 w-8 flex items-center justify-center rounded-lg bg-primary text-white text-xs font-bold">1</button>
                   <button className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-muted transition-all"><ArrowRight size={14} /></button>
                </div>
             </div>
          </div>
        </main>
      </div>
    </div>
  );
}
