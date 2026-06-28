import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Filter, Heart } from "lucide-react";
import { INSTRUCTORS } from "../mockData";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";

export function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [skillLevel, setSkillLevel] = useState<string>("All");
  
  const categories = ["All", "Yoga", "HIIT", "Strength", "Pilates"];
  
  const filteredInstructors = INSTRUCTORS.filter(i => {
    const categoryMatch = !selectedCategory || selectedCategory === "All" || i.category === selectedCategory;
    const skillMatch = skillLevel === "All" || i.skillLevel === skillLevel;
    return categoryMatch && skillMatch;
  });

  return (
    <div className="flex flex-1 overflow-hidden bg-bg-base transition-colors duration-300">
      {/* Optional sidebar replacing the grid/container model for a more app-like layout */}
      <aside className="hidden lg:flex w-60 border-r border-border-strong flex-col bg-bg-panel transition-colors duration-300">
        <div className="p-4">
          <h3 className="text-[10px] uppercase tracking-widest text-text-faint font-bold mb-4">Disciplines</h3>
          <div className="grid grid-cols-1 gap-1">
            {categories.map((cat) => {
              const isActive = (selectedCategory === cat || (cat === "All" && !selectedCategory));
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex items-center justify-between p-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-text-main/5 text-text-muted hover:text-text-main"
                  }`}
                >
                  <span>{cat}</span>
                  {isActive && <span className="text-[10px] bg-primary/20 px-1.5 rounded text-primary">Active</span>}
                </button>
              )
            })}
          </div>
        </div>
        <div className="mt-4 px-4">
          <h3 className="text-[10px] uppercase tracking-widest text-text-faint font-bold mb-3">Skill Level</h3>
          <div className="flex flex-col gap-1">
             {["All", "Beginner", "Intermediate", "Advanced", "All Levels"].map(lvl => (
                <button
                  key={lvl}
                  onClick={() => setSkillLevel(lvl)}
                  className={`text-left p-2 rounded-lg text-sm font-medium transition-colors ${
                    skillLevel === lvl ? "bg-text-main/10 text-text-main" : "text-text-faint hover:bg-text-main/5 hover:text-text-main"
                  }`}
                >
                  {lvl}
                </button>
             ))}
          </div>
        </div>
      </aside>

      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-text-main">Discover</h1>
            <p className="mt-1 text-sm text-text-muted">
              Find top-tier instructors for live classes and personalized coaching.
            </p>
          </div>
          <div className="flex lg:hidden gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-lg px-4 py-2 text-xs font-bold transition whitespace-nowrap ${
                  (selectedCategory === cat || (cat === "All" && !selectedCategory))
                    ? "bg-primary text-black"
                    : "bg-text-main/5 text-text-muted hover:bg-text-main/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredInstructors.map((instructor) => (
            <Link 
              key={instructor.id} 
              to={`/instructor/${instructor.id}`}
              className="group flex flex-col overflow-hidden rounded-2xl bg-bg-surface border border-border-subtle hover:border-border-strong transition-colors shadow-2xl"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-bg-panel">
                <img 
                  src={instructor.profileImage} 
                  alt={instructor.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
                <button 
                  className="absolute right-3 top-3 rounded-full bg-black/40 p-1.5 backdrop-blur-md transition hover:bg-black/60 text-white/80 hover:text-[#FF4B4B]"
                  onClick={(e) => e.preventDefault()}
                >
                  <Heart className="h-4 w-4" />
                </button>
                <div className="absolute bottom-3 left-3 flex gap-2">
                  <Badge className="text-[8px] border-transparent shadow-lg text-black bg-primary">
                    {instructor.category}
                  </Badge>
                  <Badge variant="secondary" className="bg-black/60 text-white border-transparent backdrop-blur-md text-[8px]">
                    {instructor.skillLevel}
                  </Badge>
                </div>
              </div>
              
              <div className="flex flex-1 flex-col p-4">
                <div className="mb-1 flex items-start justify-between">
                  <h3 className="text-lg font-bold text-text-main">{instructor.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-text-muted bg-text-main/5 px-1.5 py-0.5 rounded">
                    <Star className="h-3 w-3 fill-primary text-primary" />
                    <span className="font-bold text-text-main">{instructor.rating}</span>
                  </div>
                </div>
                
                <p className="mt-2 line-clamp-2 text-xs text-text-faint leading-relaxed">
                  {instructor.bio}
                </p>
                
                <div className="mt-4 pt-4 flex items-center justify-between border-t border-border-strong">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-text-faint font-bold">Subscription</span>
                    <span className="font-bold text-primary">${instructor.subscriptionPrice}<span className="text-xs text-text-faint">/mo</span></span>
                  </div>
                  <Button variant="secondary" size="sm" className="font-bold text-xs bg-text-main/10 text-text-main px-3">
                    Profile
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
