import * as React from "react";
import { cn } from "@/src/lib/utils";

const badgeVariants = "inline-flex items-center rounded-sm px-1.5 py-0.5 text-[10px] uppercase font-black tracking-widest transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variantStyles = {
    default: "border-transparent bg-primary text-[#050505]",
    secondary: "border-transparent bg-text-main/10 text-text-main",
    destructive: "border-transparent bg-[#FF4B4B] text-white",
    outline: "text-text-main border border-border-strong",
  };
  
  return (
    <div className={cn(badgeVariants, variantStyles[variant], className)} {...props} />
  );
}

export { Badge };
