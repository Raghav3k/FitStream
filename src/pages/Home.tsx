import { useState } from "react";
import { Link } from "react-router-dom";
import { INSTRUCTORS, MOCK_CLASSES } from "../mockData";
import { Star, Heart, Calendar, Users, ChevronDown, Activity, Play } from "lucide-react";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";

export function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"instructors" | "live">("instructors");
  const [sortBy, setSortBy] = useState<"popularity" | "rating">("popularity");

  const categories = [
    { name: "All", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=300&h=400&fit=crop" },
    { name: "Yoga", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=300&h=400&fit=crop" },
    { name: "HIIT", image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=300&h=400&fit=crop" },
    { name: "Strength", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=300&h=400&fit=crop" },
    { name: "Calisthenics", image: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?q=80&w=300&h=400&fit=crop" },
    { name: "Pilates", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=300&h=400&fit=crop" }
  ];

  const filteredInstructors = INSTRUCTORS.filter(
    (inst) => selectedCategory === "All" || inst.category === selectedCategory
  ).sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    return b.reviews - a.reviews; // popularity based on reviews
  });

  const filteredLive = MOCK_CLASSES.filter(
    (cls) => cls.type === "live" && (selectedCategory === "All" || INSTRUCTORS.find(i => i.id === cls.instructorId)?.category === selectedCategory)
  );

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-bg-base transition-colors duration-300">
      
      {/* Category Header */}
      <div className="border-b border-border-subtle bg-bg-surface px-6 py-8 transition-colors duration-300">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-black tracking-tighter text-text-main mb-6">EXPLORE</h1>
          <div className="flex gap-4 overflow-x-auto pb-4 px-2 pt-2 -mx-2 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((cat, index) => {
              const isSelected = selectedCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  style={{ animationDelay: `${index * 75}ms` }}
                  className={`group relative flex-none w-28 md:w-36 aspect-[9/16] rounded-2xl overflow-hidden snap-start transition-all duration-300 animate-fade-in-up ${
                    isSelected ? "ring-2 ring-primary ring-offset-2 ring-offset-bg-surface scale-100" : "hover:scale-105"
                  }`}
                >
                  <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity ${isSelected ? "opacity-90" : "opacity-70 group-hover:opacity-90"}`} />
                  <div className="absolute inset-x-0 bottom-0 p-3 md:p-4 text-left">
                    <span className={`block font-black tracking-tight ${isSelected ? "text-primary text-lg md:text-xl" : "text-white text-base md:text-lg"}`}>
                      {cat.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="mx-auto max-w-7xl">
          
          {/* Controls: View Toggle & Sort */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 rounded-xl bg-bg-panel p-1 border border-border-subtle w-fit transition-colors">
              <button
                onClick={() => setViewMode("instructors")}
                className={`rounded-lg px-6 py-2 text-sm font-bold transition-all ${
                  viewMode === "instructors"
                    ? "bg-bg-surface text-text-main shadow"
                    : "text-text-muted hover:text-text-main"
                }`}
              >
                Instructors
              </button>
              <button
                onClick={() => setViewMode("live")}
                className={`rounded-lg px-6 py-2 text-sm font-bold transition-all flex items-center gap-2 ${
                  viewMode === "live"
                    ? "bg-bg-surface text-text-main shadow"
                    : "text-text-muted hover:text-text-main"
                }`}
              >
                Live Right Now
                {filteredLive.length > 0 && (
                  <span className="flex h-2 w-2 rounded-full bg-[#FF4B4B] animate-pulse"></span>
                )}
              </button>
            </div>

            {viewMode === "instructors" && (
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-widest text-text-faint">Sort By</span>
                <div className="relative">
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="appearance-none bg-bg-panel border border-border-strong rounded-lg pl-4 pr-10 py-2 text-sm font-bold text-text-main focus:outline-none focus:border-primary cursor-pointer transition-colors"
                  >
                    <option value="popularity">Popularity</option>
                    <option value="rating">Top Rated</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted pointer-events-none" />
                </div>
              </div>
            )}
          </div>

          {/* Grid Content */}
          {viewMode === "instructors" ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {filteredInstructors.map((instructor, index) => (
                <Link 
                  key={instructor.id} 
                  to={`/instructor/${instructor.id}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  className="group relative flex overflow-hidden rounded-3xl bg-neutral-950 border border-border-subtle hover:border-border-strong transition-all shadow-xl hover:shadow-2xl h-[280px] animate-fade-in-up"
                >
                  {/* Right Side: Instructor Pose/Cover (starts from 1/4 of card) */}
                  <div className="absolute inset-y-0 right-0 w-3/4 z-0">
                    <img 
                      src={instructor.coverImage || instructor.profileImage} 
                      alt={instructor.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Left Side: Solid Matte Gradient Info Area */}
                  {/* Using w-full to overlay the gradient smoothly over the image on the right */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${instructor.brandColor || 'from-neutral-900 via-neutral-900'} to-transparent z-10 w-full from-30% via-50% flex flex-col p-6 md:p-8 pointer-events-none`}>
                    <div className="flex items-center gap-2 mb-3 pointer-events-auto">
                      <Badge className="bg-black/40 text-white border-transparent backdrop-blur-md text-[10px]">
                        {instructor.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-white bg-black/40 px-2 py-1 rounded backdrop-blur-md font-bold">
                        <Star className="h-3.5 w-3.5 fill-current text-yellow-400" />
                        {instructor.rating}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2 group-hover:translate-x-1 transition-transform pointer-events-auto">
                      {instructor.name}
                    </h3>
                    
                    <p className="line-clamp-2 text-sm text-white/70 font-medium max-w-xs md:max-w-sm mb-auto pointer-events-auto">
                      {instructor.bio}
                    </p>
                    
                    <div className="flex items-center gap-4 mt-4 pointer-events-auto">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest text-white/50 font-bold mb-1">Subscription</span>
                        <span className="font-black text-white text-xl">
                          ${instructor.subscriptionPrice}<span className="text-xs text-white/50 font-medium">/mo</span>
                        </span>
                      </div>
                      <Button className="font-bold text-xs bg-white text-black hover:bg-white/90 px-4 md:px-6 rounded-xl border-transparent ml-auto transition-transform group-hover:scale-105">
                        View Profile
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
              {filteredInstructors.length === 0 && (
                <div className="col-span-full py-12 text-center text-text-muted">
                  <Activity className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>No instructors found in this category.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredLive.length > 0 ? filteredLive.map((cls, index) => {
                const instructor = INSTRUCTORS.find(i => i.id === cls.instructorId);
                return (
                  <Link 
                    key={cls.id} 
                    to={`/class/${cls.id}`} 
                    style={{ animationDelay: `${index * 100}ms` }}
                    className="group relative overflow-hidden rounded-2xl bg-bg-panel border border-border-subtle hover:border-border-strong transition-all shadow-xl block animate-fade-in-up"
                  >
                    <div className="aspect-video relative bg-bg-base">
                       <img src={cls.thumbnail} alt={cls.title} className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                       <div className="absolute top-3 left-3 flex gap-2">
                          <Badge className="bg-[#FF4B4B] text-white border-transparent shadow-lg text-[10px]">LIVE</Badge>
                       </div>
                       <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center shadow-2xl">
                            <Play className="h-5 w-5 fill-white text-white translate-x-0.5" />
                         </div>
                       </div>
                    </div>
                    <div className="p-4 relative">
                      <div className="flex gap-3">
                        <img src={instructor?.profileImage} className="w-10 h-10 rounded-xl object-cover shrink-0 bg-bg-surface border border-border-subtle shadow-sm" alt="" />
                        <div className="min-w-0">
                          <h3 className="text-sm font-bold text-text-main mb-1 truncate group-hover:text-primary transition-colors">{cls.title}</h3>
                          <p className="text-xs text-text-muted truncate mb-2">{instructor?.name}</p>
                          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-text-faint">
                            <span className="flex items-center gap-1 text-[#FF4B4B]"><Users className="h-3 w-3" /> {cls.viewers}</span>
                            <span>{instructor?.category}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              }) : (
                <div className="col-span-full py-20 text-center text-text-muted flex flex-col items-center justify-center border-2 border-dashed border-border-strong rounded-3xl">
                  <div className="w-16 h-16 rounded-full bg-bg-panel flex items-center justify-center mb-4">
                     <Calendar className="h-6 w-6 text-text-faint" />
                  </div>
                  <h3 className="text-lg font-bold text-text-main mb-1">No live classes right now</h3>
                  <p className="text-sm text-text-faint">Check back later or explore our instructors' on-demand content.</p>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

