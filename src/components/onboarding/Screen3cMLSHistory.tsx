import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import CareerMetricTile from "./mls-history/CareerMetricTile";
import OpportunityTile from "./mls-history/OpportunityTile";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Screen3cMLSHistoryProps {
  onNext: () => void;
  onBack: () => void;
}

const Screen3cMLSHistory = ({ onNext, onBack }: Screen3cMLSHistoryProps) => {
  const [insightsExpanded, setInsightsExpanded] = useState(false);

  return (
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-light tracking-tight">
            Here's your verified transaction history.
          </h1>
          <p className="text-lg text-muted-foreground font-light max-w-3xl mx-auto">
            A clear snapshot of your career — all in one place.
          </p>
        </div>

        {/* Career Snapshot Metrics */}
        <div className="space-y-6">
          <h2 className="text-2xl font-light">Career Snapshot</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CareerMetricTile
              title="Total Closed Volume"
              value="$18.4M"
              description="Lifetime volume across all MLS-verified transactions."
            />
            <CareerMetricTile
              title="Total Transactions"
              value="42"
              description="Buyers + sellers combined."
            />
            <CareerMetricTile
              title="Average Sale-to-List Ratio"
              value="101.8%"
              description="Based on MLS closed data."
            />
            <CareerMetricTile
              title="Average ADOM"
              value="9 days"
              description="A proxy for your speed and efficiency."
            />
            <CareerMetricTile
              title="Buyer vs Seller Mix"
              value=""
              description="56% buyers / 44% sellers"
              visual="pie"
              pieData={{ buyers: 56, sellers: 44 }}
            />
            <CareerMetricTile
              title="Repeat Clients Detected"
              value="4"
              description="Same property or client in multiple closings."
            />
          </div>
        </div>

        {/* Detailed Graphs */}
        <div className="space-y-6">
          <h2 className="text-2xl font-light">Performance Over Time</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Annual Production Trend */}
            <Card className="p-6">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="space-y-4 cursor-help">
                      <h3 className="text-sm font-medium">Your Annual Production Trend</h3>
                      <div className="h-32 flex items-end justify-center gap-2">
                        {[3.2, 4.1, 5.8, 6.2, 7.4].map((value, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center gap-1">
                            <div
                              className="w-full bg-primary/70 rounded-t transition-all"
                              style={{ height: `${(value / 8) * 100}%` }}
                            />
                            <span className="text-xs text-muted-foreground">
                              {2020 + i}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm">Based on MLS-recorded closings.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Card>

            {/* Transaction Types Over Time */}
            <Card className="p-6">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="space-y-4 cursor-help">
                      <h3 className="text-sm font-medium">Transaction Types Over Time</h3>
                      <div className="h-32 flex items-end justify-center gap-2">
                        {[
                          { buyers: 60, sellers: 40 },
                          { buyers: 55, sellers: 45 },
                          { buyers: 62, sellers: 38 },
                          { buyers: 58, sellers: 42 },
                          { buyers: 56, sellers: 44 },
                        ].map((data, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center gap-1">
                            <div className="w-full flex flex-col" style={{ height: '100px' }}>
                              <div
                                className="w-full bg-primary rounded-t"
                                style={{ height: `${data.buyers}%` }}
                              />
                              <div
                                className="w-full bg-primary/40"
                                style={{ height: `${data.sellers}%` }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {2020 + i}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm">A visual breakdown of your career mix.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Card>

            {/* Sale vs List Ratio Distribution */}
            <Card className="p-6">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="space-y-4 cursor-help">
                      <h3 className="text-sm font-medium">Sale vs List Ratio Distribution</h3>
                      <div className="h-32 flex items-center justify-center">
                        <div className="relative w-28 h-28">
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
                              strokeDasharray="230 251"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xl font-light">101.8%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm">Shows pricing performance across all identifiable MLS transactions.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Card>
          </div>
        </div>

        {/* Long-Term Opportunities */}
        <div className="space-y-6">
          <h2 className="text-2xl font-light">Long-Term Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <OpportunityTile title="9 past clients purchased 5+ years ago — entering the typical resale window." />
            <OpportunityTile title="14 past clients show behavior patterns linked to referral activity." />
            <OpportunityTile title="3 addresses show recent listing or remodel activity." />
          </div>
        </div>

        {/* Smart Insights Panel */}
        <Card className="p-6">
          <div className="space-y-4">
            <button
              onClick={() => setInsightsExpanded(!insightsExpanded)}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="text-lg font-medium">What This Means for You</h3>
              {insightsExpanded ? (
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              )}
            </button>
            
            {insightsExpanded && (
              <div className="space-y-3 text-sm text-muted-foreground font-light animate-in slide-in-from-top-2 pt-4">
                <p>• Your transaction timeline suggests consistent growth over the past 5 years.</p>
                <p>• Your days-to-pending numbers place you in the top tier of your market.</p>
                <p>• Your buyer-to-seller mix indicates strong relationship-based business.</p>
                <p>• Several past clients appear statistically ready for new transactions or referrals.</p>
                <p>• Your pricing performance shows discipline and market accuracy.</p>
              </div>
            )}
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between pt-8">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={onNext}>
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Screen3cMLSHistory;
