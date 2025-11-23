import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Target, Users, Tag, Zap, Calendar, TrendingUp, LayoutDashboard } from "lucide-react";
import { OnboardingData } from "@/pages/Onboarding";
import { Card } from "@/components/ui/card";

interface Screen6SummaryProps {
  onNext: () => void;
  onBack: () => void;
  data: OnboardingData;
}

const Screen6Summary = ({ onNext, onBack, data }: Screen6SummaryProps) => {
  const configurations = [
    {
      icon: Target,
      title: "Pipelines",
      description: "4 stages configured based on your workflow",
      items: ["New", "Nurture", "Qualified", "Hot"]
    },
    {
      icon: Users,
      title: "Segments",
      description: "7 smart segments created from your data",
      items: ["Hot Leads", "Past Clients", "Renters", "High-Value"]
    },
    {
      icon: Tag,
      title: "Tags",
      description: "Consolidated 124 tags into 32 meaningful categories",
      items: ["Buyer", "Seller", "Investor", "First-Time"]
    },
    {
      icon: Zap,
      title: "Automation",
      description: "5 workflows ready to activate",
      items: ["New lead nurture", "Re-engagement", "Birthday wishes", "Anniversary check-ins"]
    },
    {
      icon: Calendar,
      title: "Follow-Up Cadence",
      description: "Optimized touch schedule built",
      items: ["Day 1, 3, 7, 14, 30, 60, 90"]
    },
    {
      icon: TrendingUp,
      title: "Coaching Profile",
      description: "Personalized recommendations ready",
      items: data.goals?.slice(0, 3) || ["Structure", "Consistency", "Growth"]
    },
    {
      icon: LayoutDashboard,
      title: "Dashboard",
      description: "Custom views configured",
      items: ["Activity feed", "Hot leads", "Follow-ups", "Pipeline"]
    }
  ];

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Check className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-light tracking-tight">
            Your structure is ready.
          </h1>
          <p className="text-lg text-muted-foreground font-light max-w-3xl mx-auto">
            Based on your data and answers, here's what LiteHaus configured for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {configurations.map((config) => {
            const Icon = config.icon;
            return (
              <Card key={config.title} className="p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 flex-shrink-0">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg font-medium">{config.title}</h3>
                    <p className="text-sm text-muted-foreground">{config.description}</p>
                    <ul className="space-y-1 mt-3">
                      {config.items.map((item, i) => (
                        <li key={i} className="text-sm flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="text-center space-y-6 pt-8">
          <div className="space-y-2">
            <p className="text-muted-foreground">
              Everything is configured and ready to go. Let's get started.
            </p>
          </div>
          
          <div className="flex justify-center gap-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button size="lg" onClick={onNext} className="px-12">
              Enter LiteHaus
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Screen6Summary;
