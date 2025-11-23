import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Lightbulb, ChevronDown, ChevronUp } from "lucide-react";

interface OpportunityHighlightProps {
  title: string;
  detail: string;
}

const OpportunityHighlight = ({ title, detail }: OpportunityHighlightProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium">{title}</p>
          </div>
        </div>
        
        {isExpanded && (
          <p className="text-sm text-muted-foreground pl-8 animate-in slide-in-from-top-2">
            {detail}
          </p>
        )}
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs text-primary hover:underline flex items-center gap-1 pl-8"
        >
          {isExpanded ? (
            <>
              Less <ChevronUp className="h-3 w-3" />
            </>
          ) : (
            <>
              More <ChevronDown className="h-3 w-3" />
            </>
          )}
        </button>
      </div>
    </Card>
  );
};

export default OpportunityHighlight;
