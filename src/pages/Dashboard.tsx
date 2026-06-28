import { Activity, Flame, Trophy, Clock, Calendar, CheckCircle2 } from "lucide-react";
import { MOCK_USER, INSTRUCTORS } from "../mockData";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

export function Dashboard() {
  const subscribedInstructor = INSTRUCTORS[0]; // mock active subscription

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text-main">Dashboard</h1>
          <p className="mt-1 text-text-muted">Welcome back, {MOCK_USER.name}!</p>
        </div>
        <img src={MOCK_USER.avatar} alt="Profile" className="h-12 w-12 rounded-full shadow-sm border border-border-strong" />
      </div>

      {/* Stats row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
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
             <p className="text-sm text-text-muted font-medium">Current Goal</p>
             <div className="flex items-center gap-2 mt-1">
                <div className="w-full bg-border-strong rounded-full h-2 flex-1">
                  <div className="bg-purple-500 dark:bg-purple-400 h-2 rounded-full" style={{ width: `${MOCK_USER.progress}%` }}></div>
                </div>
                <span className="text-xs font-bold text-text-main">{MOCK_USER.progress}%</span>
             </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Current Subscriptions */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="font-display text-xl font-bold text-text-main">Active Subscriptions</h2>
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
          
          <h2 className="font-display text-xl font-bold text-text-main mt-8">Recent VOD History</h2>
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center gap-4 bg-bg-surface p-4 rounded-xl border border-border-subtle shadow-sm transition-colors duration-300">
                <div className="h-16 w-24 bg-border-subtle rounded-lg overflow-hidden shrink-0 relative">
                   <img src={`https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=200&auto=format&fit=crop&${i}`} className="w-full h-full object-cover" alt="" />
                   <div className="absolute inset-x-0 bottom-0 h-1 bg-border-strong">
                     <div className="h-1 bg-indigo-500 dark:bg-indigo-400 w-full"></div>
                   </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-text-main truncate">Vinyasa Flow Masters Part {i}</h4>
                  <p className="text-sm text-text-muted">Sarah Chen • 45 min</p>
                </div>
                <Button variant="ghost" size="sm" className="hidden sm:flex text-indigo-500 dark:text-indigo-400">Watch Again</Button>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Schedule */}
        <div className="space-y-6">
          <h2 className="font-display text-xl font-bold text-text-main">Upcoming Schedule</h2>
          <div className="bg-bg-surface rounded-2xl border border-border-subtle shadow-sm p-4 h-fit transition-colors duration-300">
            <div className="space-y-0 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border-strong before:to-transparent hidden">
              {/* Complex Timeline omitted for brevity, using simple list instead */}
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex flex-col items-center justify-start shrink-0 pt-1 w-12">
                   <span className="text-xs font-bold text-text-muted">10:00</span>
                   <span className="text-[10px] text-text-faint">AM</span>
                </div>
                <div className="flex-1 bg-indigo-500/5 p-3 rounded-lg border border-indigo-500/10 relative">
                  <div className="absolute w-2 h-2 rounded-full bg-indigo-500 dark:bg-indigo-400 -left-[1.35rem] top-4 ring-4 ring-bg-surface border border-border-strong hidden md:block"></div>
                  <h4 className="font-bold text-indigo-600 dark:text-indigo-400 text-sm">Morning Sun Salutations</h4>
                  <p className="text-xs text-indigo-500 dark:text-indigo-400 font-medium">Sarah Chen</p>
                  <div className="mt-2 text-xs flex items-center gap-1 text-indigo-500 dark:text-indigo-400">
                    <Calendar className="h-3 w-3" /> Live in 15 mins
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 opacity-60">
                <div className="flex flex-col items-center justify-start shrink-0 pt-1 w-12">
                   <span className="text-xs font-bold text-text-muted">12:30</span>
                   <span className="text-[10px] text-text-faint">PM</span>
                </div>
                <div className="flex-1 bg-bg-panel p-3 rounded-lg border border-border-subtle">
                  <h4 className="font-bold text-text-main text-sm">1-on-1 Strategy Call</h4>
                  <p className="text-xs text-text-muted font-medium">Marcus Johnson</p>
                </div>
              </div>
            </div>
            
            <Button variant="outline" className="w-full mt-6 text-sm">View Full Calendar</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
