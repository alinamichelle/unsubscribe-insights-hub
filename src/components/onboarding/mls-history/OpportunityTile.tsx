import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface OpportunityTileProps {
  title: string;
}

const OpportunityTile = ({ title }: OpportunityTileProps) => {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <TrendingUp className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
        <p className="text-sm font-light">{title}</p>
      </div>
    </Card>
  );
};

export default OpportunityTile;
