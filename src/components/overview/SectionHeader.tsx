import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  action?: ReactNode;
  className?: string;
}

export function SectionHeader({ eyebrow, title, action, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between mb-6", className)}>
      <div>
        {eyebrow && (
          <div className="text-[11px] uppercase tracking-[0.14em] text-slate-400 mb-1">
            {eyebrow}
          </div>
        )}
        <h2 className="text-sm font-medium text-slate-800">{title}</h2>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
