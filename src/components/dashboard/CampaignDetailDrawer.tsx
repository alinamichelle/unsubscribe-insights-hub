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
      <SheetContent className="w-[600px] sm:max-w-[600px] overflow-y-auto">
        <SheetHeader>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <SheetTitle className="text-lg">{campaign.subject}</SheetTitle>
              <SheetDescription className="mt-1">
                <Badge variant={campaign.emailType === 'mass' ? 'default' : campaign.emailType === 'manual' ? 'secondary' : 'outline'}>
                  {campaign.emailType}
                </Badge>
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Campaign Overview */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Campaign Overview</h3>
            <div className="grid grid-cols-2 gap-3">
              <Card className="p-3">
                <p className="text-xs text-muted-foreground">Total Sent</p>
                <p className="text-2xl font-bold">{campaign.totalSent.toLocaleString()}</p>
              </Card>
              <Card className="p-3">
                <p className="text-xs text-muted-foreground">Total Opens</p>
                <p className="text-2xl font-bold">{campaign.totalOpened.toLocaleString()}</p>
              </Card>
              <Card className="p-3">
                <p className="text-xs text-muted-foreground">Total Unsubs</p>
                <p className="text-2xl font-bold text-critical">{campaign.totalUnsubs}</p>
              </Card>
              <Card className="p-3">
                <p className="text-xs text-muted-foreground">Unsub Rate</p>
                <p className={`text-2xl font-bold ${campaign.unsubRate < 2 ? 'text-success' : campaign.unsubRate < 4 ? 'text-warning' : 'text-critical'}`}>
                  {campaign.unsubRate.toFixed(1)}%
                </p>
              </Card>
              <Card className="p-3">
                <p className="text-xs text-muted-foreground">Open Rate</p>
                <p className="text-2xl font-bold">{campaign.openRate.toFixed(1)}%</p>
              </Card>
              <Card className="p-3">
                <p className="text-xs text-muted-foreground">Days Active</p>
                <p className="text-2xl font-bold">{daysActive}</p>
              </Card>
            </div>
          </div>

          <Separator />

          {/* Engagement Insights */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Engagement Insights</h3>
            <div className="space-y-3">
              <Card className="p-3 border-l-4 border-l-warning">
                <div className="flex items-start gap-2">
                  {isAboveAverage ? <TrendingUp className="h-4 w-4 text-warning mt-0.5" /> : <TrendingDown className="h-4 w-4 text-success mt-0.5" />}
                  <div>
                    <p className="text-sm font-medium">Comparison to Account Average</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {isAboveAverage 
                        ? `${Math.abs(comparisonToAvg).toFixed(1)}% higher than team average (${avgUnsubRate.toFixed(1)}%)`
                        : `${Math.abs(comparisonToAvg).toFixed(1)}% lower than team average (${avgUnsubRate.toFixed(1)}%)`
                      }
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-3 border-l-4 border-l-critical">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-critical mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Highest Risk Segment</p>
                    <p className="text-xs text-muted-foreground mt-1">
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
            <h3 className="text-sm font-semibold mb-3">Unsubscribers ({campaign.unsubEvents.length})</h3>
            <div className="space-y-2">
              {campaign.unsubEvents.map((event) => (
                <Card 
                  key={event.id}
                  className="p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => onLeadClick(event)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{event.lead.full_name}</p>
                      <p className="text-xs text-muted-foreground">{event.lead.email}</p>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">{event.agent.name}</Badge>
                        <Badge variant="outline" className="text-xs">{event.lead.pipeline}</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">
                        {new Date(event.occurred_at).toLocaleDateString()}
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
