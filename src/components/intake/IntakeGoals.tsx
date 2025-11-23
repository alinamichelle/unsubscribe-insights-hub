import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { IntakeData } from "@/pages/AgentIntake";
import { useState } from "react";

interface IntakeGoalsProps {
  onNext: () => void;
  onBack: () => void;
  onDataChange: (data: Partial<IntakeData>) => void;
  data: IntakeData;
}

const IntakeGoals = ({ onNext, onBack, onDataChange, data }: IntakeGoalsProps) => {
  const [goals, setGoals] = useState<string[]>(data.goals || []);
  const [otherGoals, setOtherGoals] = useState(data.otherGoals || "");

  const handleNext = () => {
    onDataChange({ goals, otherGoals });
    onNext();
  };

  const toggleGoal = (goal: string) => {
    setGoals(prev => 
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    );
  };

  const goalOptions = [
    "Hit a specific production target",
    "Build a sustainable pipeline system",
    "Improve work-life balance",
    "Develop stronger negotiation skills",
    "Grow my personal brand / marketing",
    "Build or scale a team",
    "Transition from part-time to full-time",
    "Break through a production plateau",
    "Master my CRM and follow-up process",
    "Increase my average sale price",
    "Work with higher-quality clients",
    "Establish long-term referral systems"
  ];

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="space-y-8 animate-fade-in">
        <div className="text-center space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Goals</h2>
          <p className="text-muted-foreground text-lg">
            What are you trying to accomplish in the next 12–18 months?
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Select your primary goals</CardTitle>
            <CardDescription>
              Choose all that apply. Be specific—this shapes how we support you.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-3">
              {goalOptions.map((goal) => (
                <div 
                  key={goal}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer"
                  onClick={() => toggleGoal(goal)}
                >
                  <Checkbox 
                    checked={goals.includes(goal)}
                    id={goal}
                  />
                  <Label htmlFor={goal} className="cursor-pointer flex-1">
                    {goal}
                  </Label>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="other-goals">Anything else? (Optional)</Label>
              <Textarea
                id="other-goals"
                placeholder="Describe any other goals or specific targets..."
                value={otherGoals}
                onChange={(e) => setOtherGoals(e.target.value)}
                rows={4}
                className="resize-none"
              />
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
            disabled={goals.length === 0}
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

export default IntakeGoals;
