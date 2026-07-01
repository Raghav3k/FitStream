import React, { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Play, PlayCircle, Calendar, Star, Users, MessageSquare, CheckCircle2 } from "lucide-react";
import { INSTRUCTORS, MOCK_CLASSES } from "../mockData";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { HorizontalScrollContainer } from "../components/ui/HorizontalScroll";

// Mock Checkout Modal defined inline for simplicity
function CheckoutModal({ isOpen, onClose, amount, planName }: { isOpen: boolean, onClose: () => void, amount: number, planName: string }) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 shadow-lg backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-bg-panel border border-border-strong p-6 shadow-2xl">
        <h2 className="text-2xl font-bold text-text-main mb-2">Checkout</h2>
        <p className="text-text-muted text-sm mb-6">You're subscribing to <span className="font-bold text-text-main">{planName}</span> for <span className="text-primary">${amount}/month</span>.</p>
        
        <div className="space-y-4 mb-6">
          <div className="rounded-xl border border-border-strong bg-text-main/5 p-3">
            <div className="text-xs uppercase tracking-widest text-text-faint font-bold">Card Number</div>
            <div className="text-text-main font-mono mt-1 font-bold">•••• •••• •••• 4242</div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1 rounded-xl border border-border-strong bg-text-main/5 p-3">
              <div className="text-xs uppercase tracking-widest text-text-faint font-bold">Expiry</div>
              <div className="text-text-main font-mono mt-1 font-bold">12/28</div>
            </div>
            <div className="flex-1 rounded-xl border border-border-strong bg-text-main/5 p-3">
              <div className="text-xs uppercase tracking-widest text-text-faint font-bold">CVC</div>
              <div className="text-text-main font-mono mt-1 font-bold">•••</div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
          <Button className="flex-1" onClick={() => {
            alert("Payment Successful! Mock flow complete.");
            onClose();
          }}>Pay ${amount}</Button>
        </div>
      </div>
    </div>
  );
}

export function InstructorProfile() {
  const { id } = useParams();
  const instructor = INSTRUCTORS.find(i => i.id === id);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [activeTab, setActiveTab] = useState<'profile' | 'live'>('profile');

  if (!instructor) return <div className="p-8 text-center text-text-main">Instructor not found.</div>;

  const handleSubscribe = (plan: string) => {
    setSelectedPlan(plan);
    setShowCheckout(true);
  };

  return (
    <div className="flex-1 bg-bg-base overflow-y-auto p-4 sm:p-8 transition-colors duration-300 animate-fade-in-up">
      <div className="mx-auto max-w-7xl">
        {/* Top Section: Redesigned Profile Card + Pricing Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          
          {/* Main Instructor Card */}
          <div className={`lg:col-span-2 relative rounded-3xl overflow-hidden bg-neutral-950 border border-border-subtle flex flex-col justify-end min-h-[350px] shadow-2xl`}>
            {/* Right Side Image */}
            <div className="absolute inset-y-0 right-0 w-3/4 z-0">
               <img 
                 src={instructor.coverImage || instructor.profileImage} 
                 alt={instructor.name}
                 className="w-full h-full object-cover" 
               />
               <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/70 mix-blend-multiply"></div>
            </div>
            
            {/* Matte Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${instructor.brandColor || 'from-neutral-900 via-neutral-900'} to-transparent z-10 w-full from-40% via-60% pointer-events-none`}></div>
            
            {/* Content Area */}
            <div className="relative z-20 p-8 w-full md:w-3/4 flex flex-col h-full pointer-events-auto">
               <div className="flex gap-4 items-center mb-auto">
                  <img src={instructor.profileImage} className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-white/10 object-cover shadow-xl" alt="" />
                  <div>
                     <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">{instructor.name}</h1>
                     <div className="flex items-center gap-3 mt-1">
                        <Badge className="bg-black/40 text-white border-transparent backdrop-blur-md shadow-lg text-[10px]">
                           {instructor.category}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-white bg-black/40 px-2 py-1 rounded backdrop-blur-md font-bold">
                           <Star className="h-3.5 w-3.5 fill-current text-yellow-400" />
                           {instructor.rating}
                        </div>
                     </div>
                  </div>
               </div>
               
               <div className="mt-8">
                  <p className="text-white/80 text-sm leading-relaxed mb-4 max-w-md font-medium">
                     {instructor.bio}
                  </p>
                  <div className="flex flex-wrap gap-2">
                     {instructor.tags.map(tag => (
                        <span key={tag} className="text-[10px] uppercase font-bold tracking-widest text-white/60 bg-black/40 px-2 py-1 rounded">
                           {tag}
                        </span>
                     ))}
                  </div>
               </div>
            </div>
          </div>

          {/* Pricing & Subscription Sidebar */}
          <div className="space-y-4 flex flex-col">
            <div className="bg-bg-panel border border-border-subtle rounded-3xl p-6 shadow-xl flex flex-col h-full relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10"><Star className="w-24 h-24" /></div>
               <h3 className="text-xl font-black text-text-main mb-2">Premium Access</h3>
               <p className="text-sm text-text-muted mb-6 relative z-10">Join my ongoing courses, get personalized feedback, and unlock all exclusive content.</p>
               
               <div className="mt-auto relative z-10">
                  <div className="flex items-baseline gap-1 mb-4">
                     <span className="text-3xl font-black text-text-main">${instructor.subscriptionPrice}</span>
                     <span className="text-sm text-text-faint font-bold">/ month</span>
                  </div>
                  <Button className="w-full font-bold text-sm h-12 rounded-xl" onClick={() => handleSubscribe('Premium Subscription')}>
                     Subscribe Now
                  </Button>
               </div>
            </div>
            
            <div className="bg-bg-surface border border-border-subtle rounded-3xl p-6 shadow-lg flex flex-col justify-between">
               <div>
                  <h3 className="text-base font-bold text-text-main mb-1">1-on-1 Coaching</h3>
                  <p className="text-xs text-text-muted mb-4">Book a private session to focus on your specific goals.</p>
               </div>
               <Button variant="outline" className="w-full font-bold text-xs h-10 rounded-xl" onClick={() => handleSubscribe('1-on-1 Session')}>
                  Book for ${instructor.hourlyRate}/hr
               </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-6 border-b border-border-subtle mb-8">
           <button 
             onClick={() => setActiveTab('profile')}
             className={`pb-4 text-sm font-bold border-b-2 transition-colors uppercase tracking-widest ${activeTab === 'profile' ? 'border-primary text-text-main' : 'border-transparent text-text-muted hover:text-text-main'}`}
           >
             Profile
           </button>
           <button 
             onClick={() => setActiveTab('live')}
             className={`pb-4 text-sm font-bold border-b-2 transition-colors uppercase tracking-widest ${activeTab === 'live' ? 'border-primary text-text-main' : 'border-transparent text-text-muted hover:text-text-main'}`}
           >
             Live & VODs
           </button>
        </div>

        {/* Content Flow */}
        {activeTab === 'profile' ? (
        <div className="space-y-12 max-w-5xl mx-auto">
          
          {/* Ongoing Course Section */}
          {instructor.ongoingCourse && (
            <section>
              <h2 className="text-xl font-black text-text-main mb-6 uppercase tracking-tight">Currently Teaching</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {/* Left Side: Video & Info */}
                 <div className="flex flex-col gap-6 bg-bg-surface border border-border-subtle rounded-3xl p-6 shadow-xl">
                    <div className="w-full aspect-video bg-bg-panel rounded-2xl overflow-hidden relative group">
                       <img src={instructor.ongoingCourse.introVideoUrl} className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105" alt="" />
                       <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                       <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-transform">
                             <Play className="text-white h-6 w-6 ml-1" />
                          </div>
                       </div>
                       <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-widest">
                          Intro Video
                       </div>
                    </div>
                    
                    <div className="flex flex-col flex-1">
                       <div className="flex items-center gap-2 mb-3">
                          <Badge className="bg-primary/10 text-primary border-transparent text-[10px] shadow-none uppercase tracking-widest">{instructor.ongoingCourse.status}</Badge>
                          {instructor.ongoingCourse.requiresCatchUp ? (
                             <Badge className="bg-amber-500/10 text-amber-500 dark:text-amber-400 border-transparent text-[10px] shadow-none uppercase tracking-widest flex items-center gap-1">
                                Requires Catch-Up
                             </Badge>
                          ) : (
                             <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-transparent text-[10px] shadow-none uppercase tracking-widest">Join Immediately</Badge>
                          )}
                       </div>
                       <h3 className="text-2xl font-black text-text-main mb-3">{instructor.ongoingCourse.title}</h3>
                       <p className="text-text-muted text-sm leading-relaxed mb-6">{instructor.ongoingCourse.description}</p>
                       
                       <div className="flex items-center gap-6 mt-auto border-t border-border-subtle pt-4">
                          <div className="flex flex-col">
                             <span className="text-[10px] uppercase tracking-widest text-text-faint font-bold">Duration</span>
                             <span className="text-sm font-bold text-text-main">{instructor.ongoingCourse.duration}</span>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Right Side: Schedule & Details */}
                 <div className="flex flex-col gap-6">
                    <div className="bg-bg-panel border border-border-subtle rounded-3xl p-6 shadow-xl flex flex-col flex-1 overflow-hidden">
                       <h3 className="text-base font-bold text-text-main mb-4 flex items-center gap-2">
                         <Calendar className="h-4 w-4 text-primary" /> Live Schedule
                       </h3>
                       <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                             <thead>
                                <tr className="border-b border-border-subtle text-[10px] uppercase tracking-widest text-text-faint">
                                   <th className="pb-3 font-bold">Day</th>
                                   <th className="pb-3 font-bold">Time</th>
                                   <th className="pb-3 font-bold">Class Type</th>
                                </tr>
                             </thead>
                             <tbody className="text-sm divide-y divide-border-subtle/50">
                                {instructor.ongoingCourse.schedule?.map((slot, idx) => (
                                   <tr key={idx} className="group hover:bg-bg-surface transition-colors">
                                      <td className="py-3 font-black text-text-main">{slot.day}</td>
                                      <td className="py-3 font-medium text-text-muted">{slot.time}</td>
                                      <td className="py-3 font-bold text-text-main">{slot.type}</td>
                                   </tr>
                                ))}
                             </tbody>
                          </table>
                       </div>
                    </div>

                    <div className="bg-bg-surface border border-border-subtle rounded-3xl p-6 shadow-xl">
                       <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-faint mb-4">Course Details</h3>
                       <div className="grid grid-cols-2 gap-4">
                          {instructor.ongoingCourse.relatedDetails?.map((detail, idx) => (
                             <div key={idx} className="flex flex-col gap-1">
                                <span className="text-[10px] uppercase tracking-widest text-text-faint">{detail.label}</span>
                                <span className="text-sm font-bold text-text-main">{detail.value}</span>
                             </div>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
            </section>
          )}

          {/* Catch Up Section */}
          {instructor.catchUpPlan && (
            <section>
              <h2 className="text-xl font-black text-text-main mb-6 uppercase tracking-tight">How to Catch Up</h2>
              <div className="bg-bg-panel border border-border-subtle rounded-3xl overflow-hidden shadow-lg">
                 {/* Intro Header */}
                 <div className="p-6 md:p-8 border-b border-border-subtle flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1">
                       <h3 className="text-xl font-black text-text-main mb-2">{instructor.catchUpPlan.title}</h3>
                       <p className="text-text-muted text-sm leading-relaxed">{instructor.catchUpPlan.description}</p>
                    </div>
                    <div className="w-full md:w-1/3 aspect-video bg-bg-surface rounded-2xl overflow-hidden relative group shrink-0 shadow-md">
                       <img src={instructor.catchUpPlan.introVideoUrl} className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105" alt="" />
                       <div className="absolute inset-0 bg-black/20" />
                       <div className="absolute inset-0 flex items-center justify-center cursor-pointer">
                          <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform">
                             <Play className="text-white h-5 w-5 ml-1" />
                          </div>
                       </div>
                    </div>
                 </div>
                 
                  {/* Steps List */}
                 <div className="p-6 md:p-8 bg-bg-surface">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-text-faint mb-4">Required Materials</h4>
                    <HorizontalScrollContainer>
                       {instructor.catchUpPlan.steps.map((step, idx) => (
                          <div key={idx} className="flex-none w-64 md:w-72 rounded-2xl border border-border-subtle hover:border-border-strong bg-bg-panel overflow-hidden transition-all cursor-pointer snap-start shadow-md group">
                             <div className="aspect-video relative bg-bg-surface">
                                {step.thumbnail ? (
                                   <img src={step.thumbnail} alt={step.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
                                ) : (
                                   <div className="w-full h-full flex items-center justify-center bg-bg-surface text-text-faint">No Image</div>
                                )}
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                   <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center shadow-lg">
                                      <Play className="text-white h-4 w-4 ml-1" />
                                   </div>
                                </div>
                                <div className="absolute top-2 left-2 w-6 h-6 rounded-md bg-black/60 backdrop-blur text-white flex items-center justify-center text-xs font-black shadow-sm">
                                   {idx + 1}
                                </div>
                                <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-white tracking-widest shadow-sm">
                                   {step.duration}
                                </div>
                             </div>
                             <div className="p-4">
                                <p className="text-sm font-bold text-text-main line-clamp-1 mb-1">{step.title}</p>
                                <p className="text-[10px] uppercase tracking-widest text-text-faint">{step.type}</p>
                             </div>
                          </div>
                       ))}
                    </HorizontalScrollContainer>
                 </div>
              </div>
            </section>
          )}

          {/* Standard Courses Section */}
          {instructor.standardCourses && instructor.standardCourses.length > 0 && (
            <section>
              <h2 className="text-xl font-black text-text-main mb-6 uppercase tracking-tight">Standard Courses</h2>
              <div className="flex flex-col gap-10">
                 {instructor.standardCourses.map(course => (
                    <div key={course.id} className="bg-bg-panel border border-border-subtle rounded-3xl overflow-hidden shadow-lg">
                       {/* Course Info */}
                       <div className="p-6 md:p-8 border-b border-border-subtle flex flex-col md:flex-row gap-8 items-center">
                          <div className="flex-1">
                             <h3 className="text-xl font-black text-text-main mb-2">{course.title}</h3>
                             <p className="text-text-muted text-sm leading-relaxed">{course.description}</p>
                          </div>
                          <div className="w-full md:w-1/3 aspect-video bg-bg-surface rounded-2xl overflow-hidden relative group shrink-0 shadow-md">
                             <img src={course.thumbnail} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="" />
                             <div className="absolute inset-0 bg-black/20" />
                          </div>
                       </div>
                       
                       {/* Modules Video Lane */}
                       <div className="p-6 md:p-8 bg-bg-surface">
                          <h4 className="text-[10px] font-bold uppercase tracking-widest text-text-faint mb-4">Course Modules</h4>
                          <HorizontalScrollContainer>
                             {course.modules.map((mod, i) => (
                                <div key={i} className="flex-none w-64 md:w-72 rounded-2xl border border-border-subtle hover:border-border-strong bg-bg-panel overflow-hidden transition-all cursor-pointer snap-start shadow-md group">
                                   <div className="aspect-video relative bg-bg-surface">
                                      {mod.thumbnail ? (
                                         <img src={mod.thumbnail} alt={mod.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
                                      ) : (
                                         <div className="w-full h-full flex items-center justify-center bg-bg-surface text-text-faint">No Image</div>
                                      )}
                                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                         <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center shadow-lg">
                                            <Play className="text-white h-4 w-4 ml-1" />
                                         </div>
                                      </div>
                                      <div className="absolute top-2 left-2 w-6 h-6 rounded-md bg-black/60 backdrop-blur text-white flex items-center justify-center text-xs font-black shadow-sm">
                                         {i + 1}
                                      </div>
                                      <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-white tracking-widest shadow-sm">
                                         {mod.duration}
                                      </div>
                                   </div>
                                   <div className="p-4">
                                      <p className="text-sm font-bold text-text-main line-clamp-1">{mod.title}</p>
                                   </div>
                                </div>
                             ))}
                          </HorizontalScrollContainer>
                       </div>
                    </div>
                 ))}
              </div>
            </section>
          )}
        </div>
        ) : (
          <div className="space-y-12 max-w-5xl mx-auto">
             {/* Live & VOD Content */}
             <section>
               {(() => {
                 const instructorClasses = MOCK_CLASSES.filter(c => c.instructorId === instructor.id);
                 if (instructorClasses.length === 0) {
                   return (
                     <div className="py-16 text-center text-text-muted border border-dashed border-border-subtle rounded-3xl bg-bg-surface/50">
                       <p className="font-bold text-text-main mb-1">No live content yet</p>
                       <p className="text-sm">Check back later for scheduled streams and VODs.</p>
                     </div>
                   );
                 }
                 
                 const liveClasses = instructorClasses.filter(c => c.type === 'live');
                 const vodClasses = instructorClasses.filter(c => c.type === 'vod');
                 
                 const groupedByWeek = vodClasses.reduce((acc, cls) => {
                   const week = cls.week || 'Other';
                   if (!acc[week]) acc[week] = [];
                   acc[week].push(cls);
                   return acc;
                 }, {} as Record<string, typeof vodClasses>);
                 
                 return (
                   <>
                     {liveClasses.length > 0 && (
                       <div className="mb-12">
                         <h3 className="text-xl font-black text-text-main mb-6 uppercase tracking-tight flex items-center gap-2">
                           <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" /> Live Now
                         </h3>
                         <HorizontalScrollContainer>
                           {liveClasses.map(cls => (
                             <Link key={cls.id} to={`/live/${cls.id}`} className="flex-none w-72 md:w-80 group bg-bg-surface border border-border-subtle rounded-3xl overflow-hidden hover:border-border-strong shadow-lg hover:shadow-xl transition-all block snap-start">
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
                       <div key={week} className="mb-10 last:mb-0">
                         <h3 className="text-xl font-black text-text-main mb-6 uppercase tracking-tight">{week}</h3>
                         <HorizontalScrollContainer>
                           {classes.map(cls => (
                             <Link key={cls.id} to={`/live/${cls.id}`} className="flex-none w-72 md:w-80 group bg-bg-surface border border-border-subtle rounded-3xl overflow-hidden hover:border-border-strong shadow-lg hover:shadow-xl transition-all block snap-start">
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
                   </>
                 );
               })()}
             </section>
          </div>
        )}
      </div>
      
      <CheckoutModal isOpen={showCheckout} onClose={() => setShowCheckout(false)} amount={selectedPlan === 'Premium Subscription' ? instructor.subscriptionPrice : instructor.hourlyRate} planName={selectedPlan} />
    </div>
  );
}
