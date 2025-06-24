import { ReactNode } from 'react';

interface GlassContainerProps {
  children: ReactNode;
  padding?: string;
  margin?: string;
  className?: string;
}

export function GlassContainer({
  children,
  padding = "p-6 md:p-10",
  margin = "",
  className = ""
}: GlassContainerProps) {
  return (
    <div className={`${margin} ${className}`}>
      <div className="rounded-2xl backdrop-blur-2xl bg-white/20 border border-white/30 shadow-lg">
        <div className={`${padding}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
