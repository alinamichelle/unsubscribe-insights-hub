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
        "p-6 cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02]",
        onClick && "hover:border-primary"
      )}
      onClick={onClick}
    >
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className="flex items-baseline justify-between">
          <h3 className="text-3xl font-bold">{value}</h3>
          {status && (
            <span
              className={cn(
                "text-xs font-medium px-2 py-1 rounded-full",
                status === 'good' && "bg-success/10 text-success",
                status === 'warning' && "bg-warning/10 text-warning",
                status === 'critical' && "bg-destructive/10 text-destructive"
              )}
            >
              {status === 'good' && 'Good'}
              {status === 'warning' && 'Warning'}
              {status === 'critical' && 'Critical'}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
        {trend && (
          <div className="flex items-center gap-1 text-sm">
            {trend.direction === 'up' ? (
              <TrendingUp className="h-4 w-4 text-destructive" />
            ) : (
              <TrendingDown className="h-4 w-4 text-success" />
            )}
            <span className={cn(
              "font-medium",
              trend.direction === 'up' ? "text-destructive" : "text-success"
            )}>
              {Math.abs(trend.value)}%
            </span>
            <span className="text-muted-foreground text-xs">vs previous period</span>
          </div>
        )}
      </div>
    </Card>
  );
};
