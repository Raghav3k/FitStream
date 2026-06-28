import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Play, PlayCircle, Calendar, Star, Users, MessageSquare, CheckCircle2 } from "lucide-react";
import { INSTRUCTORS, MOCK_CLASSES } from "../mockData";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";

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

  if (!instructor) return <div className="p-8 text-center text-text-main">Instructor not found.</div>;

  const instClasses = MOCK_CLASSES.filter(c => c.instructorId === id);
  const liveClasses = instClasses.filter(c => c.type === "live");
  const vodClasses = instClasses.filter(c => c.type === "vod");

  const handleSubscribe = (plan: string) => {
    setSelectedPlan(plan);
    setShowCheckout(true);
  };

  return (
    <div className="flex-1 bg-bg-base overflow-y-auto p-4 sm:p-8 transition-colors duration-300">
      <div className="mx-auto max-w-6xl">
        {/* Profile Header */}
        <div className="relative rounded-3xl overflow-hidden bg-bg-surface border border-border-subtle shadow-2xl mb-8">
          <div className="h-48 w-full bg-gradient-to-r from-bg-surface to-bg-panel border-b border-border-subtle" />
          <div className="px-6 pb-8 sm:px-10 flex flex-col sm:flex-row gap-6 lg:gap-10 relative">
            <img 
              src={instructor.profileImage} 
              alt={instructor.name}
              className="h-32 w-32 rounded-2xl border-4 border-bg-surface object-cover shadow-2xl -mt-16 bg-bg-panel"
            />
            <div className="pt-4 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-text-main mb-2">{instructor.name}</h1>
                  <div className="flex items-center gap-3 text-sm">
                    <Badge variant="outline" className="text-primary border-primary/30 bg-primary/10">{instructor.category}</Badge>
                    <span className="text-text-faint">•</span>
                    <span className="flex items-center gap-1 text-text-muted font-medium">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="text-text-main font-bold">{instructor.rating}</span> ({instructor.reviews} reviews)
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="secondary" className="gap-2 px-3">
                    <MessageSquare className="h-4 w-4" /> Message
                  </Button>
                  <Button onClick={() => handleSubscribe('Premium Subscription')}>
                    Subscribe ${instructor.subscriptionPrice}/mo
                  </Button>
                </div>
              </div>
              
              <p className="mt-6 text-text-muted max-w-3xl text-sm leading-relaxed">
                {instructor.bio}
              </p>
              
              <div className="mt-6 flex flex-wrap gap-2">
                {instructor.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-bold uppercase tracking-widest bg-text-main/5 text-text-muted border border-border-strong px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            
            {/* Live Classes */}
            {liveClasses.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-lg font-bold text-text-main">Live & Upcoming</h2>
                  <div className="h-[1px] flex-1 bg-border-strong"></div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {liveClasses.map(cls => (
                    <Link key={cls.id} to={`/class/${cls.id}`} className="group relative overflow-hidden rounded-2xl bg-bg-panel border border-border-subtle hover:border-border-strong transition-all shadow-xl block">
                      <div className="aspect-[16/9] relative">
                         <img src={cls.thumbnail} alt={cls.title} className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 dark:from-bg-base to-transparent" />
                         <div className="absolute top-3 left-3">
                            <Badge className="bg-[#FF4B4B] text-white">LIVE NOW</Badge>
                         </div>
                      </div>
                      <div className="p-4 absolute bottom-0 inset-x-0">
                        <h3 className="text-base font-bold text-white mb-1 group-hover:underline">{cls.title}</h3>
                        <div className="flex items-center justify-between text-xs text-white/80">
                          <span className="flex items-center gap-1 font-bold"><Calendar className="h-3 w-3" /> Starts in 15m</span>
                          <span className="flex items-center gap-1 font-bold"><Users className="h-3 w-3" /> {cls.viewers} watching</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* VOD Library */}
            <section>
               <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3 flex-1 mr-4">
                    <h2 className="text-lg font-bold text-text-main">Video Library</h2>
                    <div className="h-[1px] flex-1 bg-border-strong"></div>
                  </div>
                  <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-[10px] tracking-widest uppercase">View All</Button>
               </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {vodClasses.map(cls => (
                  <div key={cls.id} className="group relative overflow-hidden rounded-2xl bg-bg-surface border border-border-subtle shadow-xl hover:border-border-strong transition cursor-pointer">
                    <div className="relative aspect-video bg-bg-panel">
                      <img src={cls.thumbnail} alt={cls.title} className="absolute inset-0 h-full w-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                         <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all">
                            <Play className="h-5 w-5 fill-white text-white translate-x-0.5" />
                         </div>
                      </div>
                      <Badge className="absolute bottom-2 right-2 bg-black/60 shadow-sm text-white backdrop-blur-md border-transparent">
                        {cls.duration}M
                      </Badge>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-text-main mb-1 text-sm">{cls.title}</h3>
                      <p className="text-[10px] uppercase font-bold tracking-widest text-primary">Recorded</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          <div className="space-y-6">
            <div className="bg-bg-surface border border-border-subtle rounded-3xl p-6 shadow-2xl">
               <h4 className="text-[10px] font-bold uppercase text-text-faint tracking-widest mb-3">1-on-1 Coaching</h4>
               <div className="flex items-end gap-1 mb-4">
                 <span className="text-3xl font-bold text-text-main">${instructor.hourlyRate}</span>
                 <span className="text-xs text-text-faint pb-1 font-bold uppercase tracking-widest">/ Session</span>
               </div>
               <p className="text-xs text-text-muted mb-6 leading-relaxed">
                 Book a private session for personalized feedback, goal setting, and tailored routines.
               </p>
               <Button className="w-full gap-2 text-xs" variant="secondary" onClick={() => handleSubscribe('1-on-1 Session')}>
                 <Calendar className="h-4 w-4" /> Schedule Session
               </Button>
            </div>

            <div className="bg-gradient-to-br from-bg-panel to-bg-surface border border-primary/20 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
              <h4 className="text-[10px] font-bold uppercase text-primary tracking-widest mb-4">Premium Access</h4>
              <ul className="text-xs space-y-4 mb-6">
                 <li className="flex items-center gap-3 text-text-muted"><CheckCircle2 className="h-4 w-4 text-primary" /> Full VOD Library Access</li>
                 <li className="flex items-center gap-3 text-text-muted"><CheckCircle2 className="h-4 w-4 text-primary" /> Unlimited Live Classes</li>
                 <li className="flex items-center gap-3 text-text-muted"><CheckCircle2 className="h-4 w-4 text-primary" /> Direct Community Chat</li>
                 <li className="flex items-center gap-3 text-text-muted"><CheckCircle2 className="h-4 w-4 text-primary" /> Custom Progress Tracking</li>
              </ul>
              <Button className="w-full text-xs font-bold uppercase tracking-tight shadow-[0_0_20px_rgba(46,209,153,0.3)]" onClick={() => handleSubscribe('Premium Subscription')}>
                Subscribe ${instructor.subscriptionPrice}/mo
              </Button>
            </div>
          </div>
        </div>
      </div>
      <CheckoutModal 
        isOpen={showCheckout} 
        onClose={() => setShowCheckout(false)} 
        amount={selectedPlan.includes('Session') ? instructor.hourlyRate : instructor.subscriptionPrice}
        planName={selectedPlan}
      />
    </div>
  );
}
