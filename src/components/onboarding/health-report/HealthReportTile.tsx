import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

interface HealthReportTileProps {
  title: string;
  score: string;
  type: "donut" | "tags" | "line" | "bar" | "bubble" | "pulse";
  data: any;
  insight: string;
}

const HealthReportTile = ({ title, score, type, data, insight }: HealthReportTileProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const renderVisualization = () => {
    switch (type) {
      case "donut":
        return (
          <div className="relative w-24 h-24 mx-auto">
            <svg viewBox="0 0 100 100" className="transform -rotate-90">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="12"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="12"
                strokeDasharray={`${parseFloat(score) * 2.51} 251`}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-medium">{score}</span>
            </div>
          </div>
        );
      case "tags":
        return (
          <div className="flex flex-wrap gap-1 justify-center h-24 items-center">
            {["Lead", "Hot", "Buyer", "Seller", "Investor", "Renter"].map((tag, i) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="text-xs"
                style={{ opacity: 1 - (i * 0.15) }}
              >
                {tag}
              </Badge>
            ))}
          </div>
        );
      case "line":
        return (
          <div className="h-24 flex items-end justify-center gap-1">
            {[40, 65, 45, 70, 35, 60, 30, 55, 25, 50].map((height, i) => (
              <div
                key={i}
                className="w-2 bg-primary rounded-t transition-all duration-500"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        );
      case "bar":
        return (
          <div className="space-y-2">
            <div className="h-3 bg-primary rounded" style={{ width: "41%" }} />
            <div className="h-3 bg-primary/80 rounded" style={{ width: "21%" }} />
            <div className="h-3 bg-primary/60 rounded" style={{ width: "14%" }} />
            <div className="h-3 bg-muted rounded" style={{ width: "24%" }} />
          </div>
        );
      case "bubble":
        return (
          <div className="relative h-24 flex items-center justify-center gap-3">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-xs font-medium">17</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/40 flex items-center justify-center">
              <span className="text-xs font-medium">6</span>
            </div>
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-medium">52</span>
            </div>
          </div>
        );
      case "pulse":
        return (
          <div className="h-24 flex items-center justify-center">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-primary/20 animate-pulse" />
              <div className="absolute inset-0 w-16 h-16 rounded-full bg-primary/40 animate-ping" />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderDetailContent = () => {
    switch (type) {
      case "donut":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm">• {data.totalContacts.toLocaleString()} contacts</p>
              <p className="text-sm">• {data.withComplete}% have name + email or phone</p>
              <p className="text-sm">• {data.missingSource}% missing lead source</p>
              <p className="text-sm">• {data.missingInfo}% missing any usable contact info</p>
            </div>
          </div>
        );
      case "tags":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm">• {data.totalTags} total tag types</p>
              <p className="text-sm">• {data.underused} tags used fewer than 3 times</p>
              <p className="text-sm">• Several duplicates (e.g., {data.duplicates.map((d: string) => `"${d}"`).join(", ")})</p>
            </div>
          </div>
        );
      case "line":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm">• Median gap between touches: {data.medianGap} days</p>
              <p className="text-sm">• {data.stale} contacts with no touch in 6+ months</p>
              <p className="text-sm">• {data.recentTouches} contacts touched this week</p>
            </div>
          </div>
        );
      case "bar":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm">• {data.new}% in 'New'</p>
              <p className="text-sm">• {data.nurture}% in 'Nurture'</p>
              <p className="text-sm">• {data.hot}% in 'Hot'</p>
              <p className="text-sm">• {data.unassigned}% not assigned to any stage</p>
            </div>
          </div>
        );
      case "bubble":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm">• {data.nearTerm} contacts show "near-term conversion" patterns</p>
              <p className="text-sm">• {data.reEngagement} past clients showing "re-engagement" behavior</p>
              <p className="text-sm">• {data.renters} renters likely ready for next-step</p>
            </div>
          </div>
        );
      case "pulse":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm">• {data.total} past clients</p>
              <p className="text-sm">• {data.stale} haven't been contacted in 12+ months</p>
              <p className="text-sm">• {data.recentlyActive} recently active on your website</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Card
        className="p-6 cursor-pointer hover:shadow-lg transition-all hover:scale-105"
        onClick={() => setIsOpen(true)}
      >
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <h3 className="font-medium">{title}</h3>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
          
          {renderVisualization()}
          
          <div className="text-center">
            <p className="text-2xl font-light">{score}</p>
            <button className="text-sm text-primary hover:underline mt-2">
              View ▸
            </button>
          </div>
        </div>
      </Card>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription className="pt-4 space-y-4">
              {renderDetailContent()}
              <div className="pt-4 border-t">
                <p className="text-sm font-medium text-foreground">Insight:</p>
                <p className="text-sm mt-2">{insight}</p>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default HealthReportTile;
