import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { EmailCampaignPerformance, UnsubEvent } from "@/types/dashboard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Mail, TrendingDown, TrendingUp, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CampaignDetailDrawerProps {
  campaign: EmailCampaignPerformance | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLeadClick: (event: UnsubEvent) => void;
  avgUnsubRate: number;
}

export const CampaignDetailDrawer = ({ 
  campaign, 
  open, 
  onOpenChange,
  onLeadClick,
  avgUnsubRate
}: CampaignDetailDrawerProps) => {
  if (!campaign) return null;

  const daysActive = Math.ceil(
    (new Date(campaign.lastSent).getTime() - new Date(campaign.firstSent).getTime()) / (1000 * 60 * 60 * 24)
  );

  const comparisonToAvg = ((campaign.unsubRate - avgUnsubRate) / avgUnsubRate * 100);
  const isAboveAverage = comparisonToAvg > 0;

  const highestRiskSegment = campaign.pipelineBreakdown.reduce((max, curr) => 
    curr.count > max.count ? curr : max
  , campaign.pipelineBreakdown[0]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[600px] sm:max-w-[600px] overflow-y-auto bg-background/95 backdrop-blur-xl border-l border-border/50">
        <SheetHeader className="space-y-4 pb-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary/10 ring-1 ring-primary/20">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <SheetTitle className="text-xl font-bold tracking-tight mb-2">{campaign.subject}</SheetTitle>
              <div className="flex items-center gap-2">
                <Badge 
                  variant={campaign.emailType === 'mass' ? 'default' : campaign.emailType === 'manual' ? 'secondary' : 'outline'}
                  className="font-medium"
                >
                  {campaign.emailType}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {campaign.totalSent.toLocaleString()} recipients
                </span>
              </div>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-8">
          {/* Campaign Overview */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wider">Performance Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <p className="text-xs font-medium text-muted-foreground mb-2">Total Sent</p>
                <p className="text-3xl font-bold tabular-nums">{campaign.totalSent.toLocaleString()}</p>
              </Card>
              <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <p className="text-xs font-medium text-muted-foreground mb-2">Total Opens</p>
                <p className="text-3xl font-bold tabular-nums">{campaign.totalOpened.toLocaleString()}</p>
              </Card>
              <Card className="p-4 border-destructive/20 bg-destructive/5 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <p className="text-xs font-medium text-destructive mb-2">Total Unsubs</p>
                <p className="text-3xl font-bold text-destructive tabular-nums">{campaign.totalUnsubs}</p>
              </Card>
              <Card className={cn(
                "p-4 backdrop-blur-sm hover:shadow-lg transition-all duration-300",
                campaign.unsubRate < 2 
                  ? "border-success/20 bg-success/5" 
                  : campaign.unsubRate < 4 
                  ? "border-warning/20 bg-warning/5" 
                  : "border-destructive/20 bg-destructive/5"
              )}>
                <p className="text-xs font-medium text-muted-foreground mb-2">Unsub Rate</p>
                <p className={cn(
                  "text-3xl font-bold tabular-nums",
                  campaign.unsubRate < 2 ? 'text-success' : campaign.unsubRate < 4 ? 'text-warning' : 'text-destructive'
                )}>
                  {campaign.unsubRate.toFixed(1)}%
                </p>
              </Card>
              <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <p className="text-xs font-medium text-muted-foreground mb-2">Open Rate</p>
                <p className="text-3xl font-bold tabular-nums">{campaign.openRate.toFixed(1)}%</p>
              </Card>
              <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <p className="text-xs font-medium text-muted-foreground mb-2">Days Active</p>
                <p className="text-3xl font-bold tabular-nums">{daysActive}</p>
              </Card>
            </div>
          </div>

          <Separator />

          {/* Engagement Insights */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wider">Key Insights</h3>
            <div className="space-y-3">
              <Card className={cn(
                "p-4 border-l-4 backdrop-blur-sm transition-all duration-300 hover:shadow-lg",
                isAboveAverage ? "border-l-warning bg-warning/5" : "border-l-success bg-success/5"
              )}>
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "p-2 rounded-lg",
                    isAboveAverage ? "bg-warning/10" : "bg-success/10"
                  )}>
                    {isAboveAverage ? (
                      <TrendingUp className="h-4 w-4 text-warning" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-success" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold mb-1">Comparison to Account Average</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {isAboveAverage 
                        ? `${Math.abs(comparisonToAvg).toFixed(1)}% higher than team average (${avgUnsubRate.toFixed(1)}%)`
                        : `${Math.abs(comparisonToAvg).toFixed(1)}% lower than team average (${avgUnsubRate.toFixed(1)}%)`
                      }
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 border-l-4 border-l-destructive bg-destructive/5 backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-destructive/10">
                    <AlertCircle className="h-4 w-4 text-destructive" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold mb-1">Highest Risk Segment</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {highestRiskSegment.pipeline} leads ({highestRiskSegment.count} unsubs)
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <Separator />

          {/* Agent Breakdown */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Unsubs by Agent</h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={campaign.agentBreakdown} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis type="number" />
                  <YAxis dataKey="agentName" type="category" width={100} className="text-xs" />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(var(--critical))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <Separator />

          {/* Pipeline Breakdown */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Unsubs by Pipeline Stage</h3>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={campaign.pipelineBreakdown}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="pipeline" className="text-xs" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(var(--warning))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <Separator />

          {/* Unsubscribers List */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wider">
              Unsubscribers ({campaign.unsubEvents.length})
            </h3>
            <div className="space-y-2">
              {campaign.unsubEvents.map((event) => (
                <Card 
                  key={event.id}
                  className="group p-4 cursor-pointer border-border/50 bg-card/30 backdrop-blur-sm hover:bg-muted/50 hover:shadow-md hover:border-primary/30 transition-all duration-200"
                  onClick={() => onLeadClick(event)}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors truncate">
                        {event.lead.full_name}
                      </p>
                      <p className="text-xs text-muted-foreground mb-2 truncate">{event.lead.email}</p>
                      <div className="flex gap-2 flex-wrap">
                        <Badge variant="outline" className="text-xs font-medium border-border/50">
                          {event.agent.name}
                        </Badge>
                        <Badge variant="outline" className="text-xs font-medium border-border/50">
                          {event.lead.pipeline}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-muted-foreground tabular-nums">
                        {new Date(event.occurred_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
