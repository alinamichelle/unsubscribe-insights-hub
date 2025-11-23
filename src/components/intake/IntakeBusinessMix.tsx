import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { IntakeData } from "@/pages/AgentIntake";
import { useState } from "react";

interface IntakeBusinessMixProps {
  onNext: () => void;
  onBack: () => void;
  onDataChange: (data: Partial<IntakeData>) => void;
  data: IntakeData;
}

const IntakeBusinessMix = ({ onNext, onBack, onDataChange, data }: IntakeBusinessMixProps) => {
  const [currentClientTypes, setCurrentClientTypes] = useState<string[]>(data.currentClientTypes || []);
  const [desiredClientTypes, setDesiredClientTypes] = useState<string[]>(data.desiredClientTypes || []);

  const handleNext = () => {
    onDataChange({ currentClientTypes, desiredClientTypes });
    onNext();
  };

  const toggleCurrent = (type: string) => {
    setCurrentClientTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const toggleDesired = (type: string) => {
    setDesiredClientTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const clientTypes = [
    "First-time buyers",
    "Move-up buyers",
    "Luxury buyers",
    "Investors",
    "Relocations",
    "Sellers (primary residence)",
    "Sellers (investment property)",
    "Renters",
    "Land / lots",
    "New construction"
  ];

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="space-y-8 animate-fade-in">
        <div className="text-center space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Business Mix</h2>
          <p className="text-muted-foreground text-lg">
            Help us understand your client base.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>What types of clients do you typically work with?</CardTitle>
            <CardDescription>Select all that apply to your current business.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {clientTypes.map((type) => (
                <Badge
                  key={type}
                  variant={currentClientTypes.includes(type) ? "default" : "outline"}
                  className="cursor-pointer px-4 py-2 text-sm hover:scale-105 transition-transform"
                  onClick={() => toggleCurrent(type)}
                >
                  {type}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>What types of clients do you want more of?</CardTitle>
            <CardDescription>This helps us understand your growth direction.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {clientTypes.map((type) => (
                <Badge
                  key={type}
                  variant={desiredClientTypes.includes(type) ? "default" : "outline"}
                  className="cursor-pointer px-4 py-2 text-sm hover:scale-105 transition-transform"
                  onClick={() => toggleDesired(type)}
                >
                  {type}
                </Badge>
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
            disabled={currentClientTypes.length === 0 || desiredClientTypes.length === 0}
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

export default IntakeBusinessMix;
