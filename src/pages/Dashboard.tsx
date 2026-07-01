import { Activity, Flame, Trophy, Clock, Calendar, CheckCircle2, Play, Users } from "lucide-react";
import { MOCK_USER, INSTRUCTORS, MOCK_CLASSES } from "../mockData";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { HorizontalScrollContainer } from "../components/ui/HorizontalScroll";

export function Dashboard() {
  const subscribedInstructor = INSTRUCTORS[0]; // mock active subscription
  
  const liveClasses = MOCK_CLASSES.filter(c => c.type === 'live');
  const vodClasses = MOCK_CLASSES.filter(c => c.type === 'vod');
  
  const groupedByWeek = vodClasses.reduce((acc, cls) => {
    const week = cls.week || 'Other';
    if (!acc[week]) acc[week] = [];
    acc[week].push(cls);
    return acc;
  }, {} as Record<string, typeof vodClasses>);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text-main">My Progress</h1>
          <p className="mt-1 text-text-muted">Welcome back, {MOCK_USER.name}! Keep up the great work.</p>
        </div>
        <img src={MOCK_USER.avatar} alt="Profile" className="h-12 w-12 rounded-full shadow-sm border border-border-strong" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-10">
        <div className="bg-bg-surface rounded-2xl p-5 border border-border-subtle shadow-sm flex items-center gap-4 transition-colors duration-300">
          <div className="p-3 bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 rounded-xl">
             <Activity className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-text-muted font-medium">Classes Attended</p>
            <p className="text-2xl font-bold text-text-main">24</p>
          </div>
        </div>
        <div className="bg-bg-surface rounded-2xl p-5 border border-border-subtle shadow-sm flex items-center gap-4 transition-colors duration-300">
          <div className="p-3 bg-amber-500/10 text-amber-500 dark:text-amber-400 rounded-xl">
             <Flame className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-text-muted font-medium">Current Streak</p>
            <p className="text-2xl font-bold text-text-main">{MOCK_USER.streak} Days</p>
          </div>
        </div>
        <div className="bg-bg-surface rounded-2xl p-5 border border-border-subtle shadow-sm flex items-center gap-4 transition-colors duration-300">
           <div className="p-3 bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 rounded-xl">
             <Clock className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-text-muted font-medium">Total Minutes</p>
            <p className="text-2xl font-bold text-text-main">960</p>
          </div>
        </div>
        <div className="bg-bg-surface rounded-2xl p-5 border border-border-subtle shadow-sm flex items-center gap-4 transition-colors duration-300">
           <div className="p-3 bg-purple-500/10 text-purple-500 dark:text-purple-400 rounded-xl">
             <Trophy className="h-6 w-6" />
          </div>
          <div>
             <p className="text-sm text-text-muted font-medium">Weekly Goal</p>
             <div className="flex items-center gap-2 mt-1">
                <div className="w-full bg-border-strong rounded-full h-2 flex-1 min-w-[60px]">
                  <div className="bg-purple-500 dark:bg-purple-400 h-2 rounded-full" style={{ width: `${MOCK_USER.progress}%` }}></div>
                </div>
                <span className="text-xs font-bold text-text-main">{MOCK_USER.progress}%</span>
             </div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="font-display text-xl font-bold text-text-main mb-6">Active Subscription</h2>
        <div className="bg-bg-surface rounded-2xl border border-border-subtle shadow-sm overflow-hidden flex flex-col sm:flex-row transition-colors duration-300">
          <div className="w-full sm:w-48 h-48 bg-border-subtle shrink-0">
             <img src={subscribedInstructor.profileImage} className="w-full h-full object-cover" alt={subscribedInstructor.name} />
          </div>
          <div className="p-6 flex-1 flex flex-col justify-center">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-lg text-text-main">{subscribedInstructor.name}</h3>
                <p className="text-sm text-indigo-500 dark:text-indigo-400 font-medium">{subscribedInstructor.category} Premium</p>
              </div>
              <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs px-2 py-1 rounded font-semibold items-center flex gap-1">
                <CheckCircle2 className="h-3 w-3" /> Active
              </span>
            </div>
            <p className="text-sm text-text-muted line-clamp-2 mb-4">You have full access to {subscribedInstructor.name}'s live classes and VOD library.</p>
            <div className="mt-auto flex gap-3">
              <Link to={`/instructor/${subscribedInstructor.id}`}>
                <Button variant="outline" size="sm">Go to Profile</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-12">
         {liveClasses.length > 0 && (
           <div>
             <h3 className="text-xl font-black text-text-main mb-6 uppercase tracking-tight flex items-center gap-2">
               <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" /> Live Now
             </h3>
             <HorizontalScrollContainer>
               {liveClasses.map(cls => (
                 <Link key={cls.id} to={`/class/${cls.id}`} className="flex-none w-72 md:w-80 group bg-bg-surface border border-border-subtle rounded-3xl overflow-hidden hover:border-border-strong shadow-lg hover:shadow-xl transition-all block snap-start">
                   <div className="aspect-video relative overflow-hidden bg-bg-panel">
                     <img src={cls.thumbnail} alt={cls.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                     <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                     <div className="absolute top-3 left-3 flex gap-2">
                       <Badge className="bg-red-500 text-white border-transparent text-[10px] uppercase tracking-widest shadow-lg flex items-center gap-1">
                         <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> Live
                       </Badge>
                     </div>
                     <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-white tracking-widest shadow-sm">
                       {cls.duration} min
                     </div>
                     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center shadow-lg">
                           <Play className="text-white h-5 w-5 ml-1" />
                        </div>
                     </div>
                   </div>
                   <div className="p-5">
                     <h3 className="font-bold text-text-main line-clamp-2 mb-2">{cls.title}</h3>
                     <div className="flex items-center text-xs font-bold text-text-muted">
                       <span className="uppercase tracking-widest">{cls.type}</span>
                       {cls.viewers && (
                         <>
                           <span className="mx-2 text-text-faint">•</span>
                           <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {cls.viewers}</span>
                         </>
                       )}
                     </div>
                   </div>
                 </Link>
               ))}
             </HorizontalScrollContainer>
           </div>
         )}

         {Object.entries(groupedByWeek).sort((a,b) => a[0].localeCompare(b[0])).map(([week, classes]) => (
           <div key={week}>
             <h3 className="text-xl font-black text-text-main mb-6 uppercase tracking-tight">{week} Scheduled VODs</h3>
             <HorizontalScrollContainer>
               {classes.map(cls => (
                 <Link key={cls.id} to={`/class/${cls.id}`} className="flex-none w-72 md:w-80 group bg-bg-surface border border-border-subtle rounded-3xl overflow-hidden hover:border-border-strong shadow-lg hover:shadow-xl transition-all block snap-start">
                   <div className="aspect-video relative overflow-hidden bg-bg-panel">
                     <img src={cls.thumbnail} alt={cls.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                     <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                     <div className="absolute top-3 left-3 flex gap-2">
                       <Badge className="bg-black/60 backdrop-blur text-white border-transparent text-[10px] uppercase tracking-widest">VOD</Badge>
                     </div>
                     <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-white tracking-widest shadow-sm">
                       {cls.duration} min
                     </div>
                     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center shadow-lg">
                           <Play className="text-white h-5 w-5 ml-1" />
                        </div>
                     </div>
                   </div>
                   <div className="p-5">
                     <h3 className="font-bold text-text-main line-clamp-2 mb-2">{cls.title}</h3>
                     <div className="flex items-center text-xs font-bold text-text-muted">
                       <span className="uppercase tracking-widest">{cls.type}</span>
                       {cls.viewers && (
                         <>
                           <span className="mx-2 text-text-faint">•</span>
                           <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {cls.viewers}</span>
                         </>
                       )}
                     </div>
                   </div>
                 </Link>
               ))}
             </HorizontalScrollContainer>
           </div>
         ))}
      </div>
    </div>
  );
}
