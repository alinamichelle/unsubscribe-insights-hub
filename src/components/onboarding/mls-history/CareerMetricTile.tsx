import { Card } from "@/components/ui/card";

interface CareerMetricTileProps {
  title: string;
  value: string | number;
  description: string;
  visual?: "pie" | "none";
  pieData?: { buyers: number; sellers: number };
}

const CareerMetricTile = ({ title, value, description, visual, pieData }: CareerMetricTileProps) => {
  const renderVisual = () => {
    if (visual === "pie" && pieData) {
      const total = pieData.buyers + pieData.sellers;
      const buyersPercent = Math.round((pieData.buyers / total) * 100);
      const sellersPercent = 100 - buyersPercent;
      
      return (
        <div className="relative w-20 h-20 mx-auto mb-4">
          <svg viewBox="0 0 100 100" className="transform -rotate-90">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="20"
              strokeDasharray={`${buyersPercent * 2.51} 251`}
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="hsl(var(--primary) / 0.4)"
              strokeWidth="20"
              strokeDasharray={`${sellersPercent * 2.51} 251`}
              strokeDashoffset={`-${buyersPercent * 2.51}`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-xs">
            <div className="text-center">
              <div className="font-medium">{buyersPercent}%</div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6 text-center space-y-3">
      {renderVisual()}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <p className="text-3xl font-light">{value}</p>
        <p className="text-xs text-muted-foreground font-light">{description}</p>
      </div>
    </Card>
  );
};

export default CareerMetricTile;
