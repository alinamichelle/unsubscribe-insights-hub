import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { IntakeData } from "@/pages/AgentIntake";
import { useState } from "react";

interface IntakeWorkStyleProps {
  onNext: () => void;
  onBack: () => void;
  onDataChange: (data: Partial<IntakeData>) => void;
  data: IntakeData;
}

const IntakeWorkStyle = ({ onNext, onBack, onDataChange, data }: IntakeWorkStyleProps) => {
  const [workStyle, setWorkStyle] = useState(data.workStyle || "");

  const handleNext = () => {
    onDataChange({ workStyle });
    onNext();
  };

  const workStyles = [
    {
      value: "independent",
      title: "Independent Operator",
      description: "I thrive on autonomy. I prefer to figure things out myself and work at my own pace."
    },
    {
      value: "collaborative",
      title: "Collaborative Team Player",
      description: "I do my best work with others. I like sharing ideas, learning together, and building systems as a team."
    },
    {
      value: "structured",
      title: "Structured Executor",
      description: "Give me a clear process and I'll follow it relentlessly. I value systems, checklists, and consistency."
    },
    {
      value: "creative",
      title: "Creative Entrepreneur",
      description: "I like experimenting, testing new ideas, and carving my own path. Structure is helpful but not required."
    },
    {
      value: "relationship",
      title: "Relationship Builder",
      description: "My strength is in connections. I focus on people first, and business follows naturally."
    },
    {
      value: "metrics",
      title: "Metrics-Driven Closer",
      description: "I'm motivated by numbers. Show me the KPIs, and I'll hit them. Volume and conversion are my focus."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="space-y-8 animate-fade-in">
        <div className="text-center space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">How You Work</h2>
          <p className="text-muted-foreground text-lg">
            Which working style resonates most with you?
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Select the persona that feels most like you</CardTitle>
            <CardDescription>
              There's no wrong answer—we're looking for fit, not perfection.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={workStyle} onValueChange={setWorkStyle}>
              <div className="space-y-4">
                {workStyles.map((style) => (
                  <div 
                    key={style.value}
                    className="flex items-start space-x-3 p-4 rounded-lg hover:bg-accent transition-colors cursor-pointer border-2 border-border data-[state=checked]:border-primary"
                    data-state={workStyle === style.value ? "checked" : "unchecked"}
                    onClick={() => setWorkStyle(style.value)}
                  >
                    <RadioGroupItem value={style.value} id={style.value} className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor={style.value} className="cursor-pointer font-semibold text-base">
                        {style.title}
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        {style.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={onBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <Button 
            onClick={handleNext} 
            disabled={!workStyle}
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

export default IntakeWorkStyle;
