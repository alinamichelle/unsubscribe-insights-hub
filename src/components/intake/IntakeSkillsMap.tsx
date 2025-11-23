import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { IntakeData } from "@/pages/AgentIntake";
import { useState } from "react";

interface IntakeSkillsMapProps {
  onNext: () => void;
  onBack: () => void;
  onDataChange: (data: Partial<IntakeData>) => void;
  data: IntakeData;
}

const IntakeSkillsMap = ({ onNext, onBack, onDataChange, data }: IntakeSkillsMapProps) => {
  const [skillLevels, setSkillLevels] = useState<Record<string, number>>(
    data.skillLevels || {
      prospecting: 3,
      conversion: 3,
      negotiation: 3,
      marketing: 3,
      systems: 3,
      relationships: 3
    }
  );

  const handleNext = () => {
    onDataChange({ skillLevels });
    onNext();
  };

  const updateSkill = (skill: string, value: number) => {
    setSkillLevels(prev => ({ ...prev, [skill]: value }));
  };

  const skills = [
    {
      key: "prospecting",
      label: "Prospecting / Lead Generation",
      description: "Finding and attracting new clients"
    },
    {
      key: "conversion",
      label: "Conversion / Follow-Up",
      description: "Turning leads into appointments and contracts"
    },
    {
      key: "negotiation",
      label: "Negotiation / Deal Management",
      description: "Navigating offers, counteroffers, and closing"
    },
    {
      key: "marketing",
      label: "Marketing / Personal Brand",
      description: "Positioning yourself and your listings"
    },
    {
      key: "systems",
      label: "Systems / Organization",
      description: "CRM, follow-up, database management"
    },
    {
      key: "relationships",
      label: "Relationship Building",
      description: "Trust, rapport, and long-term client connection"
    }
  ];

  const getSkillLabel = (value: number) => {
    const labels = ["Beginner", "Developing", "Competent", "Strong", "Expert"];
    return labels[value - 1];
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="space-y-8 animate-fade-in">
        <div className="text-center space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Skill Confidence Map</h2>
          <p className="text-muted-foreground text-lg">
            Rate your current confidence level in each area (1 = beginner, 5 = expert).
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>How confident are you in these core skills?</CardTitle>
            <CardDescription>
              Be honest—this helps us personalize your growth path.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {skills.map((skill) => (
              <div key={skill.key} className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{skill.label}</p>
                    <p className="text-sm text-muted-foreground">{skill.description}</p>
                  </div>
                  <div className="text-sm font-medium text-primary min-w-[100px] text-right">
                    {getSkillLabel(skillLevels[skill.key])}
                  </div>
                </div>
                <Slider
                  value={[skillLevels[skill.key]]}
                  onValueChange={(values) => updateSkill(skill.key, values[0])}
                  min={1}
                  max={5}
                  step={1}
                  className="w-full"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={onBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <Button onClick={handleNext} className="gap-2">
            Continue
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IntakeSkillsMap;
