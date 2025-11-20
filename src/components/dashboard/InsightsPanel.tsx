import { AlertTriangle, Lightbulb, TrendingUp, TrendingDown } from "lucide-react";

export const InsightsPanel = () => {
  return (
    <div className="surface p-6 lg:p-8 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
      <div className="mb-6">
        <h3 className="text-base font-semibold tracking-tight mb-1">Key Insights</h3>
        <p className="text-[13px] text-muted-foreground">Actionable patterns from your data</p>
      </div>
      
      <div className="space-y-3">
        {/* At-Risk Patterns */}
        <div className="group relative overflow-hidden rounded-lg border border-warning/20 bg-warning-subtle/30 p-4 transition-all hover:shadow-md hover:border-warning/30">
          <div className="flex gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-warning/10">
              <AlertTriangle className="h-4 w-4 text-warning" strokeWidth={2} />
            </div>
            <div className="flex-1 space-y-2">
              <p className="text-sm font-semibold tracking-tight">At-Risk Patterns</p>
              <ul className="space-y-1.5 text-[13px] text-muted-foreground leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-warning mt-0.5">•</span>
                  <span>Most unsubs (43%) happen from mass emails within the first 30 days</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-warning mt-0.5">•</span>
                  <span>Anthony's unsub rate on 'Market Snapshot' emails is 2.3× higher than team avg</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Top Problem Campaigns */}
        <div className="group relative overflow-hidden rounded-lg border border-destructive/20 bg-destructive-subtle/30 p-4 transition-all hover:shadow-md hover:border-destructive/30">
          <div className="flex gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
              <TrendingDown className="h-4 w-4 text-destructive" strokeWidth={2} />
            </div>
            <div className="flex-1 space-y-3">
              <p className="text-sm font-semibold tracking-tight">Top Problem Campaigns</p>
              <div className="space-y-2">
                {[
                  { subject: "Our Journey Continues: Donald, Meet Realty Haus Group", unsubs: 12, rate: 8.2 },
                  { subject: "Market Snapshot: November 2024", unsubs: 8, rate: 5.1 },
                  { subject: "Weekly Property Updates", unsubs: 6, rate: 4.3 },
                ].map((campaign, i) => (
                  <div 
                    key={i} 
                    className="flex items-center justify-between gap-4 rounded-lg border border-border/50 bg-card/50 p-3 transition-all hover:bg-card hover:border-border hover:shadow-sm cursor-pointer"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium truncate leading-tight">{campaign.subject}</p>
                      <p className="text-xs text-muted-foreground mt-1 tabular-nums">
                        {campaign.unsubs} unsubs • {campaign.rate}% rate
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Safer Segments */}
        <div className="group relative overflow-hidden rounded-lg border border-success/20 bg-success-subtle/30 p-4 transition-all hover:shadow-md hover:border-success/30">
          <div className="flex gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-success/10">
              <TrendingUp className="h-4 w-4 text-success" strokeWidth={2} />
            </div>
            <div className="flex-1 space-y-2">
              <p className="text-sm font-semibold tracking-tight">Safer Segments</p>
              <ul className="space-y-1.5 text-[13px] text-muted-foreground leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-success mt-0.5">•</span>
                  <span>Past Clients have half the unsub rate of New Internet Leads</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success mt-0.5">•</span>
                  <span>Sphere contacts show 3× higher email engagement before unsubscribing</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Opportunities */}
        <div className="group relative overflow-hidden rounded-lg border border-info/20 bg-info-subtle/30 p-4 transition-all hover:shadow-md hover:border-info/30">
          <div className="flex gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-info/10">
              <Lightbulb className="h-4 w-4 text-info" strokeWidth={2} />
            </div>
            <div className="flex-1 space-y-2">
              <p className="text-sm font-semibold tracking-tight">Opportunities</p>
              <ul className="space-y-1.5 text-[13px] text-muted-foreground leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-info mt-0.5">•</span>
                  <span>Consider reducing mass email frequency for leads under 30 days old</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-info mt-0.5">•</span>
                  <span>A/B test subject lines for Market Snapshot series</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};