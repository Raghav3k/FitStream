import React, { useRef, useEffect } from "react";

export function useHorizontalScroll() {
  const elRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = elRef.current;
    if (el) {
      const onWheel = (e: WheelEvent) => {
        if (e.deltaY == 0) return;
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY * 1.5,
          behavior: "smooth"
        });
      };
      el.addEventListener("wheel", onWheel);
      return () => el.removeEventListener("wheel", onWheel);
    }
  }, []);
  return elRef;
}

export function HorizontalScrollContainer({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const scrollRef = useHorizontalScroll();
  return (
    <div ref={scrollRef} className={`flex gap-4 overflow-x-auto pb-4 px-2 -mx-2 snap-x snap-mandatory ${className}`}>
      {children}
    </div>
  );
}
