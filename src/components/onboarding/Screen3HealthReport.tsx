import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import HealthReportTile from "./health-report/HealthReportTile";
import OpportunityHighlight from "./health-report/OpportunityHighlight";
import BehavioralPattern from "./health-report/BehavioralPattern";

interface Screen3HealthReportProps {
  onNext: () => void;
  onBack: () => void;
}

const Screen3HealthReport = ({ onNext, onBack }: Screen3HealthReportProps) => {
  return (
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-light tracking-tight">
            Your Database Health Report
          </h1>
          <p className="text-lg text-muted-foreground font-light max-w-3xl mx-auto">
            Based on your uploaded data, here's what we found. Click any tile to explore deeper.
          </p>
        </div>

        {/* Health Report Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <HealthReportTile
            title="Contact Quality"
            score="62%"
            type="donut"
            data={{
              totalContacts: 1842,
              withComplete: 68,
              missingSource: 29,
              missingInfo: 18,
            }}
            insight="A portion of contacts may require enrichment for effective nurture."
          />
          
          <HealthReportTile
            title="Tag Integrity"
            score="Medium"
            type="tags"
            data={{
              totalTags: 124,
              underused: 37,
              duplicates: ["Relocate", "Relocation"],
            }}
            insight="Consolidating tags may create clearer automation paths."
          />
          
          <HealthReportTile
            title="Follow-Up Rhythm"
            score="Irregular"
            type="line"
            data={{
              medianGap: 47,
              stale: 612,
              recentTouches: 89,
            }}
            insight="Patterns suggest a strong first-touch behavior, followed by slowdown."
          />
          
          <HealthReportTile
            title="Stage Distribution"
            score="Unbalanced"
            type="bar"
            data={{
              new: 41,
              nurture: 21,
              hot: 14,
              unassigned: 24,
            }}
            insight="Unassigned contacts make automation harder and reduce predictive consistency."
          />
          
          <HealthReportTile
            title="Opportunity Signals"
            score="17 Found"
            type="bubble"
            data={{
              nearTerm: 17,
              reEngagement: 6,
              renters: 52,
            }}
            insight="These groups typically respond well to timely outreach or targeted plans."
          />
          
          <HealthReportTile
            title="Past Client Stability"
            score="Needs Attention"
            type="pulse"
            data={{
              total: 198,
              stale: 72,
              recentlyActive: 11,
            }}
            insight="Reconnecting with past clients strengthens referrals and loyalty."
          />
        </div>

        {/* Opportunity Highlights */}
        <div className="space-y-6">
          <h2 className="text-2xl font-light">Opportunity Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <OpportunityHighlight
              title="17 contacts match early-stage buying patterns."
              detail="These contacts looked at properties multiple times in the last 30 days and have complete contact info but no assigned follow-up path."
            />
            <OpportunityHighlight
              title="32 past clients may be ready for check-ins."
              detail="They show long-term value behavior: tax season interest, neighborhood updates, or life-stage changes."
            />
            <OpportunityHighlight
              title="One stage is absorbing 60% of your leads."
              detail="When this happens, teams often benefit from clearer definitions or automation that moves leads forward."
            />
            <OpportunityHighlight
              title="Your renters segment shows unusual long-term engagement."
              detail="This often signals the potential for renter → buyer transition campaigns."
            />
          </div>
        </div>

        {/* Behavioral Patterns */}
        <div className="space-y-6">
          <h2 className="text-2xl font-light">Behavioral Patterns</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <BehavioralPattern
              title="Touch Cadence"
              insight="Initial enthusiasm followed by long gaps."
              type="cadence"
            />
            <BehavioralPattern
              title="Drop-Off Points"
              insight="'New' → 'Qualified' is the biggest slowdown."
              type="dropoff"
            />
            <BehavioralPattern
              title="Tag Density"
              insight="High overlap across unrelated tags."
              type="density"
            />
            <BehavioralPattern
              title="Lead Source Reliability"
              insight="3 sources produce 74% of your closings."
              type="sources"
            />
          </div>
        </div>

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

export default Screen3HealthReport;
