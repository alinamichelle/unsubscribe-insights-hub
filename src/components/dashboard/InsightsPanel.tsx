import { Card } from "@/components/ui/card";
import { AlertTriangle, Lightbulb, TrendingUp } from "lucide-react";

export const InsightsPanel = () => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Key Insights</h3>
      
      <div className="space-y-4">
        {/* At-Risk Patterns */}
        <div className="flex gap-3 p-4 bg-warning/5 border border-warning/20 rounded-lg">
          <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="font-medium text-sm">At-Risk Patterns</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Most unsubs (43%) happen from mass emails within the first 30 days</li>
              <li>• Anthony's unsub rate on 'Market Snapshot' emails is 2.3x higher than team avg</li>
            </ul>
          </div>
        </div>

        {/* Top Problem Campaigns */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <p className="font-medium text-sm">Top Problem Campaigns</p>
          </div>
          <div className="space-y-2">
            {[
              { subject: "Our Journey Continues: Donald, Meet Realty Haus Group", unsubs: 12, rate: 8.2 },
              { subject: "Market Snapshot: November 2024", unsubs: 8, rate: 5.1 },
              { subject: "Weekly Property Updates", unsubs: 6, rate: 4.3 },
            ].map((campaign, i) => (
              <div 
                key={i} 
                className="flex items-center justify-between p-3 bg-card border rounded cursor-pointer hover:border-primary transition-colors"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium truncate">{campaign.subject}</p>
                  <p className="text-xs text-muted-foreground">{campaign.unsubs} unsubs • {campaign.rate}% rate</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safer Segments */}
        <div className="flex gap-3 p-4 bg-success/5 border border-success/20 rounded-lg">
          <TrendingUp className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="font-medium text-sm">Safer Segments</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Past Clients have half the unsub rate of New Internet Leads</li>
              <li>• Sphere contacts show 3x higher email engagement before unsubscribing</li>
            </ul>
          </div>
        </div>

        {/* Opportunities */}
        <div className="flex gap-3 p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="font-medium text-sm">Opportunities</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Consider reducing mass email frequency for leads under 30 days old</li>
              <li>• A/B test subject lines for Market Snapshot series</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
};
