import { AlertTriangle, Flame, Clock, CheckSquare, Sprout } from "lucide-react";
import { Card } from "@/components/ui/card";

const signals = [
  {
    icon: AlertTriangle,
    label: "Humans Needed",
    count: 12,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    icon: Flame,
    label: "Warming Up",
    count: 8,
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
  {
    icon: Clock,
    label: "Idle Clients",
    count: 15,
    color: "text-slate-600",
    bgColor: "bg-slate-50",
  },
  {
    icon: CheckSquare,
    label: "Overdue Tasks",
    count: 7,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    icon: Sprout,
    label: "New Leads Waiting",
    count: 4,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
];

export function PrioritySignals() {
  return (
    <div className="mb-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {signals.map((signal, index) => {
          const Icon = signal.icon;
          return (
            <Card
              key={index}
              className="p-5 hover:shadow-md transition-all duration-200 cursor-pointer border-border/40"
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${signal.bgColor}`}>
                  <Icon className={`h-5 w-5 ${signal.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-2xl font-semibold text-foreground mb-1">{signal.count}</div>
                  <div className="text-xs text-muted-foreground leading-tight">{signal.label}</div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
