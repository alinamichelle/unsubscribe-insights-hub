import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  status?: 'good' | 'warning' | 'critical';
  onClick?: () => void;
}

export const KPICard = ({ title, value, subtitle, trend, status, onClick }: KPICardProps) => {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden p-8 cursor-pointer transition-all duration-300 hover:shadow-xl border-border/50 bg-card/50 backdrop-blur-sm",
        onClick && "hover:border-primary/50",
        status === 'good' && "hover:shadow-success/5",
        status === 'warning' && "hover:shadow-warning/5",
        status === 'critical' && "hover:shadow-destructive/5"
      )}
      onClick={onClick}
    >
      {/* Subtle gradient overlay on hover */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none",
        status === 'good' && "bg-gradient-to-br from-success/5 to-transparent",
        status === 'warning' && "bg-gradient-to-br from-warning/5 to-transparent",
        status === 'critical' && "bg-gradient-to-br from-destructive/5 to-transparent"
      )} />

      <div className="relative space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground tracking-tight">{title}</p>
          {status && (
            <span
              className={cn(
                "text-xs font-semibold px-2.5 py-1 rounded-full border",
                status === 'good' && "bg-success/10 text-success border-success/20",
                status === 'warning' && "bg-warning/10 text-warning border-warning/20",
                status === 'critical' && "bg-destructive/10 text-destructive border-destructive/20"
              )}
            >
              {status === 'good' && 'Good'}
              {status === 'warning' && 'Warning'}
              {status === 'critical' && 'Critical'}
            </span>
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className="text-4xl font-bold tracking-tight">{value}</h3>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>

        {trend && (
          <div className="flex items-center gap-2 pt-2 border-t border-border/50">
            {trend.direction === 'up' ? (
              <TrendingUp className="h-4 w-4 text-destructive" />
            ) : (
              <TrendingDown className="h-4 w-4 text-success" />
            )}
            <span className={cn(
              "text-sm font-semibold tabular-nums",
              trend.direction === 'up' ? "text-destructive" : "text-success"
            )}>
              {Math.abs(trend.value)}%
            </span>
            <span className="text-sm text-muted-foreground">vs prev period</span>
          </div>
        )}
      </div>
    </Card>
  );
};
