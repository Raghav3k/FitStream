import { useState } from "react";
import { DollarSign, Users, Video, Upload, Settings, Play, Plus, Edit2, Trash2 } from "lucide-react";
import { MOCK_CLASSES, INSTRUCTORS } from "../mockData";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";

export function InstructorStudio() {
  const instructor = INSTRUCTORS[0]; // Assuming current user is this instructor
  const myClasses = MOCK_CLASSES.filter(c => c.instructorId === instructor.id);
  const liveClasses = myClasses.filter(c => c.type === 'live');
  const vodClasses = myClasses.filter(c => c.type === 'vod');
  
  const [activeTab, setActiveTab] = useState<'overview' | 'content'>('overview');

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text-main">Instructor Studio</h1>
          <p className="mt-1 text-text-muted">Manage your content and track your performance.</p>
        </div>
        <div className="flex gap-3">
          <Button className="flex items-center gap-2 bg-text-main text-bg-surface hover:bg-text-main/90">
             <Video className="w-4 h-4" /> Schedule Live
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
             <Upload className="w-4 h-4" /> Upload VOD
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-6 border-b border-border-subtle mb-8">
         <button 
           onClick={() => setActiveTab('overview')}
           className={`pb-4 text-sm font-bold border-b-2 transition-colors uppercase tracking-widest ${activeTab === 'overview' ? 'border-primary text-text-main' : 'border-transparent text-text-muted hover:text-text-main'}`}
         >
           Overview
         </button>
         <button 
           onClick={() => setActiveTab('content')}
           className={`pb-4 text-sm font-bold border-b-2 transition-colors uppercase tracking-widest ${activeTab === 'content' ? 'border-primary text-text-main' : 'border-transparent text-text-muted hover:text-text-main'}`}
         >
           My Content
         </button>
      </div>

      {activeTab === 'overview' ? (
        <div className="space-y-8">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="bg-bg-surface rounded-2xl p-5 border border-border-subtle shadow-sm flex flex-col transition-colors duration-300">
               <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
                    <DollarSign className="h-5 w-5" />
                  </div>
                  <p className="text-sm text-text-muted font-bold">Monthly Revenue</p>
               </div>
               <p className="text-3xl font-bold text-text-main">$4,250</p>
               <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-semibold">+12% from last month</p>
            </div>
            
            <div className="bg-bg-surface rounded-2xl p-5 border border-border-subtle shadow-sm flex flex-col transition-colors duration-300">
               <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl">
                    <Users className="h-5 w-5" />
                  </div>
                  <p className="text-sm text-text-muted font-bold">Active Subscribers</p>
               </div>
               <p className="text-3xl font-bold text-text-main">342</p>
               <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-semibold">+8 new this week</p>
            </div>
            
            <div className="bg-bg-surface rounded-2xl p-5 border border-border-subtle shadow-sm flex flex-col transition-colors duration-300">
               <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-xl">
                    <Play className="h-5 w-5" />
                  </div>
                  <p className="text-sm text-text-muted font-bold">Total VOD Views</p>
               </div>
               <p className="text-3xl font-bold text-text-main">12.5k</p>
               <p className="text-xs text-text-muted mt-2 font-semibold">Across {vodClasses.length} videos</p>
            </div>
          </div>

          <div className="bg-bg-surface rounded-2xl border border-border-subtle p-6 shadow-sm">
             <h3 className="font-bold text-lg text-text-main mb-6">Recent Activity</h3>
             <div className="space-y-4">
                {[
                  { text: "Sarah subscribed to your Premium Plan", time: "2 hours ago", icon: Users, color: "text-indigo-500", bg: "bg-indigo-500/10" },
                  { text: "Your live stream 'Morning Flow' had 120 viewers", time: "Yesterday", icon: Video, color: "text-red-500", bg: "bg-red-500/10" },
                  { text: "Payout of $2,100 processed successfully", time: "3 days ago", icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-500/10" }
                ].map((act, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-bg-panel transition-colors">
                     <div className={`p-2 rounded-lg ${act.bg} ${act.color}`}>
                        <act.icon className="h-4 w-4" />
                     </div>
                     <div className="flex-1">
                        <p className="text-sm font-medium text-text-main">{act.text}</p>
                        <p className="text-xs text-text-muted">{act.time}</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      ) : (
        <div className="space-y-10">
           {/* Live Classes */}
           <div>
             <h2 className="text-xl font-bold text-text-main mb-6 flex items-center gap-2">
               Scheduled Lives
             </h2>
             {liveClasses.length === 0 ? (
                <div className="py-12 text-center border border-dashed border-border-strong rounded-2xl bg-bg-panel/50">
                  <p className="text-text-muted text-sm font-medium">No upcoming live classes scheduled.</p>
                  <Button variant="outline" className="mt-4" size="sm">Schedule Now</Button>
                </div>
             ) : (
               <div className="grid gap-4">
                 {liveClasses.map(cls => (
                   <div key={cls.id} className="flex flex-col sm:flex-row gap-4 bg-bg-surface p-4 rounded-2xl border border-border-subtle shadow-sm items-center">
                      <div className="w-full sm:w-48 aspect-video rounded-xl overflow-hidden relative shrink-0">
                         <img src={cls.thumbnail} alt={cls.title} className="w-full h-full object-cover" />
                         <Badge className="absolute top-2 left-2 bg-red-500 text-white border-transparent text-[10px] uppercase tracking-widest shadow-lg flex items-center gap-1">
                           Live
                         </Badge>
                      </div>
                      <div className="flex-1 min-w-0 py-2">
                         <h3 className="font-bold text-text-main text-lg truncate mb-1">{cls.title}</h3>
                         <p className="text-sm text-text-muted">{cls.scheduledTime?.toLocaleString()} • {cls.duration} min</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                         <Button variant="outline" size="sm" className="w-10 h-10 p-0"><Edit2 className="w-4 h-4" /></Button>
                         <Button variant="outline" size="sm" className="w-10 h-10 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 border-red-500/20"><Trash2 className="w-4 h-4" /></Button>
                      </div>
                   </div>
                 ))}
               </div>
             )}
           </div>
           
           {/* VODs */}
           <div>
             <h2 className="text-xl font-bold text-text-main mb-6">Video Library</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {vodClasses.map(cls => (
                   <div key={cls.id} className="group bg-bg-surface border border-border-subtle rounded-3xl overflow-hidden shadow-sm transition-all flex flex-col">
                     <div className="aspect-video relative overflow-hidden bg-bg-panel">
                       <img src={cls.thumbnail} alt={cls.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                       <div className="absolute top-3 left-3 flex gap-2">
                         <Badge className="bg-black/60 backdrop-blur text-white border-transparent text-[10px] uppercase tracking-widest">VOD</Badge>
                       </div>
                       <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-white tracking-widest shadow-sm">
                         {cls.duration} min
                       </div>
                     </div>
                     <div className="p-5 flex-1 flex flex-col">
                       <h3 className="font-bold text-text-main line-clamp-2 mb-2">{cls.title}</h3>
                       <div className="flex items-center text-xs font-bold text-text-muted mb-4">
                          <span>{cls.week || 'Uncategorized'}</span>
                       </div>
                       <div className="mt-auto flex gap-2 pt-4 border-t border-border-subtle">
                         <Button variant="outline" size="sm" className="flex-1 text-xs"><Edit2 className="w-3.5 h-3.5 mr-1.5" /> Edit</Button>
                         <Button variant="outline" size="sm" className="w-9 px-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 border-red-500/20"><Trash2 className="w-3.5 h-3.5" /></Button>
                       </div>
                     </div>
                   </div>
                ))}
             </div>
           </div>
        </div>
      )}
    </div>
  );
}
