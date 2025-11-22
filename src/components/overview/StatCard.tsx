import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  trendValue?: string;
  trendDirection?: "up" | "down" | "flat";
  chipLabel?: string;
  onClick?: () => void;
  className?: string;
}

export function StatCard({
  label,
  value,
  trendValue,
  trendDirection = "flat",
  chipLabel,
  onClick,
  className
}: StatCardProps) {
  const getTrendIcon = () => {
    switch (trendDirection) {
      case "up":
        return <TrendingUp className="w-3 h-3" />;
      case "down":
        return <TrendingDown className="w-3 h-3" />;
      default:
        return <Minus className="w-3 h-3" />;
    }
  };

  const getTrendColor = () => {
    switch (trendDirection) {
      case "up":
        return "text-emerald-600 bg-emerald-50";
      case "down":
        return "text-rose-600 bg-rose-50";
      default:
        return "text-slate-600 bg-slate-50";
    }
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "surface surface-hover rounded-2xl p-6 transition-all duration-200",
        onClick && "cursor-pointer hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/5",
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-sm font-medium text-slate-600">{label}</div>
        {trendValue && (
          <div className={cn(
            "flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium",
            getTrendColor()
          )}>
            {getTrendIcon()}
            {trendValue}
          </div>
        )}
      </div>

      <div className="flex items-end justify-between">
        <div className="text-3xl font-semibold text-slate-900 tracking-tight">
          {value}
        </div>
        {chipLabel && (
          <div className="px-2 py-1 rounded-md bg-slate-100 text-xs font-medium text-slate-700">
            {chipLabel}
          </div>
        )}
      </div>
    </div>
  );
}
