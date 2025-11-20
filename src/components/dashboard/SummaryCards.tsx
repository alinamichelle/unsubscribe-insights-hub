import { Card } from "@/components/ui/card";
import { EmailCampaignPerformance } from "@/types/dashboard";
import { TrendingDown, TrendingUp, Users } from "lucide-react";

interface SummaryCardsProps {
  worstPerforming: EmailCampaignPerformance | null;
  mostEngaging: EmailCampaignPerformance | null;
  highestReach: EmailCampaignPerformance | null;
}

export const SummaryCards = ({ worstPerforming, mostEngaging, highestReach }: SummaryCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Worst Performing */}
      <Card className="p-6 border-destructive/20 bg-destructive/5 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-destructive/10">
            <TrendingDown className="h-5 w-5 text-destructive" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-destructive mb-1">Highest Unsub Rate</p>
            {worstPerforming ? (
              <>
                <p className="text-sm font-semibold text-foreground truncate">{worstPerforming.subject}</p>
                <p className="text-2xl font-bold text-destructive mt-1">{worstPerforming.unsubRate.toFixed(1)}%</p>
                <p className="text-xs text-muted-foreground mt-1">{worstPerforming.totalUnsubs} unsubs</p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">No data</p>
            )}
          </div>
        </div>
      </Card>

      {/* Most Engaging */}
      <Card className="p-6 border-success/20 bg-success/5 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-success/10">
            <TrendingUp className="h-5 w-5 text-success" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-success mb-1">Best Open Rate</p>
            {mostEngaging ? (
              <>
                <p className="text-sm font-semibold text-foreground truncate">{mostEngaging.subject}</p>
                <p className="text-2xl font-bold text-success mt-1">{mostEngaging.openRate.toFixed(1)}%</p>
                <p className="text-xs text-muted-foreground mt-1">{mostEngaging.totalOpened.toLocaleString()} opens</p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">No data</p>
            )}
          </div>
        </div>
      </Card>

      {/* Highest Reach */}
      <Card className="p-6 border-primary/20 bg-primary/5 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-primary mb-1">Largest Campaign</p>
            {highestReach ? (
              <>
                <p className="text-sm font-semibold text-foreground truncate">{highestReach.subject}</p>
                <p className="text-2xl font-bold text-primary mt-1">{highestReach.totalSent.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">recipients</p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">No data</p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
