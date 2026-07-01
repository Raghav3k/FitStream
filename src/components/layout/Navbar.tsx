import { Link, useLocation } from "react-router-dom";
import { Activity, LayoutDashboard, Search } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { ThemeToggle } from "../ThemeToggle";

export function Navbar() {
  const location = useLocation();
  
  const navItems = [
    { name: "Discover", path: "/", icon: Search },
    { name: "My Progress", path: "/dashboard", icon: LayoutDashboard },
    { name: "Studio", path: "/studio", icon: LayoutDashboard },
  ];

  return (
    <header className="sticky top-0 z-50 w-full h-16 border-b border-border-strong bg-bg-elevated px-6 flex items-center justify-between transition-colors duration-300">
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm">
            <Activity className="h-5 w-5 text-bg-surface stroke-[2.5]" />
          </div>
          <span className="font-bold text-xl tracking-tighter text-text-main">FITSTREAM<span className="text-primary">.</span></span>
        </Link>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-text-muted">
          {navItems.map((item) => {
             const isActive = location.pathname === item.path;
             return (
               <Link
                 key={item.path}
                 to={item.path}
                 className={cn(
                   "hover:text-text-main transition-colors",
                   isActive ? "text-text-main" : ""
                 )}
               >
                 {item.name}
               </Link>
             )
          })}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block">
          <input type="text" placeholder="Search yoga, HIIT, pilates..." className="bg-text-main/[0.05] border border-border-strong rounded-full px-4 py-1.5 text-sm w-64 focus:outline-none focus:border-primary/50 text-text-main placeholder:text-text-faint transition-colors" />
        </div>
        <div className="flex items-center gap-3 pl-4 sm:border-l sm:border-border-strong">
          <ThemeToggle />
          <div className="hidden sm:block text-right">
            <p className="text-xs font-bold text-text-main">Alex D.</p>
            <p className="text-[10px] text-primary">Pro Member</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-emerald-800 border border-border-strong overflow-hidden shadow-sm">
            <img 
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d" 
              alt="Profile" 
              className="h-full w-full object-cover mix-blend-normal dark:mix-blend-overlay"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
