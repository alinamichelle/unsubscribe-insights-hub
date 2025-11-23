import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Grid3x3, Target } from "lucide-react";

interface BehavioralPatternProps {
  title: string;
  insight: string;
  type: "cadence" | "dropoff" | "density" | "sources";
}

const BehavioralPattern = ({ title, insight, type }: BehavioralPatternProps) => {
  const renderMicroGraph = () => {
    switch (type) {
      case "cadence":
        return (
          <div className="h-16 flex items-end gap-0.5">
            {[8, 12, 6, 14, 4, 10, 3, 8, 2, 6, 2, 4].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-primary/60 rounded-t transition-all"
                style={{ height: `${h * 4}px` }}
              />
            ))}
          </div>
        );
      case "dropoff":
        return (
          <div className="h-16 flex items-center justify-center">
            <TrendingDown className="h-12 w-12 text-destructive/60" />
          </div>
        );
      case "density":
        return (
          <div className="h-16 flex items-center justify-center">
            <Grid3x3 className="h-12 w-12 text-primary/60" />
          </div>
        );
      case "sources":
        return (
          <div className="h-16 flex items-center justify-center gap-1">
            <div className="w-8 h-12 bg-primary rounded" />
            <div className="w-8 h-10 bg-primary/70 rounded" />
            <div className="w-8 h-8 bg-primary/40 rounded" />
            <div className="w-8 h-4 bg-muted rounded" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="p-4 space-y-3 hover:shadow-md transition-shadow">
      {renderMicroGraph()}
      <div className="space-y-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{insight}</p>
      </div>
    </Card>
  );
};

export default BehavioralPattern;
