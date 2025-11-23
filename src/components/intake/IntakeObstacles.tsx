import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { IntakeData } from "@/pages/AgentIntake";
import { useState } from "react";

interface IntakeObstaclesProps {
  onNext: () => void;
  onBack: () => void;
  onDataChange: (data: Partial<IntakeData>) => void;
  data: IntakeData;
}

const IntakeObstacles = ({ onNext, onBack, onDataChange, data }: IntakeObstaclesProps) => {
  const [obstacles, setObstacles] = useState<string[]>(data.obstacles || []);

  const handleNext = () => {
    onDataChange({ obstacles });
    onNext();
  };

  const toggleObstacle = (obstacle: string) => {
    setObstacles(prev => 
      prev.includes(obstacle) ? prev.filter(o => o !== obstacle) : [...prev, obstacle]
    );
  };

  const obstacleOptions = [
    {
      value: "lead-gen",
      label: "Lead generation / pipeline consistency",
      description: "Inconsistent flow of quality leads"
    },
    {
      value: "conversion",
      label: "Conversion / closing ratio",
      description: "Struggle turning leads into closed deals"
    },
    {
      value: "systems",
      label: "Systems / CRM / follow-up discipline",
      description: "Lack of organized processes"
    },
    {
      value: "time",
      label: "Time management / overwhelm",
      description: "Too much to do, not enough time"
    },
    {
      value: "marketing",
      label: "Marketing / personal brand",
      description: "Difficulty standing out or building presence"
    },
    {
      value: "support",
      label: "Support / team / brokerage culture",
      description: "Need better infrastructure or collaboration"
    },
    {
      value: "confidence",
      label: "Confidence / negotiation / pricing strategy",
      description: "Uncertainty in high-stakes situations"
    },
    {
      value: "growth",
      label: "Scaling / breaking through a production ceiling",
      description: "Hit a plateau and can't get past it"
    },
    {
      value: "education",
      label: "Training / ongoing skill development",
      description: "Need more learning and mentorship"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="space-y-8 animate-fade-in">
        <div className="text-center space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">What's Holding You Back?</h2>
          <p className="text-muted-foreground text-lg">
            Honest answers help us support you better. Select all that apply.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>What challenges are you facing right now?</CardTitle>
            <CardDescription>
              We're not here to judge—we're here to help you solve them.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {obstacleOptions.map((option) => (
                <div 
                  key={option.value}
                  className="flex items-start space-x-3 p-4 rounded-lg hover:bg-accent transition-colors cursor-pointer border border-border"
                  onClick={() => toggleObstacle(option.value)}
                >
                  <Checkbox 
                    checked={obstacles.includes(option.value)}
                    id={option.value}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label htmlFor={option.value} className="cursor-pointer font-medium">
                      {option.label}
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {option.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={onBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <Button 
            onClick={handleNext} 
            disabled={obstacles.length === 0}
            className="gap-2"
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IntakeObstacles;
