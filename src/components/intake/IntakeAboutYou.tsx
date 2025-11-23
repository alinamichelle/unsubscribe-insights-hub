import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { IntakeData } from "@/pages/AgentIntake";
import { useState } from "react";

interface IntakeAboutYouProps {
  onNext: () => void;
  onBack: () => void;
  onDataChange: (data: Partial<IntakeData>) => void;
  data: IntakeData;
}

const IntakeAboutYou = ({ onNext, onBack, onDataChange, data }: IntakeAboutYouProps) => {
  const [yearsInRealEstate, setYearsInRealEstate] = useState(data.yearsInRealEstate || "");
  const [careerLocations, setCareerLocations] = useState<string[]>(data.careerLocations || []);

  const handleNext = () => {
    onDataChange({ yearsInRealEstate, careerLocations });
    onNext();
  };

  const toggleLocation = (location: string) => {
    setCareerLocations(prev => 
      prev.includes(location) 
        ? prev.filter(l => l !== location)
        : [...prev, location]
    );
  };

  const yearsOptions = [
    "Less than 1 year",
    "1–3 years",
    "3–5 years",
    "5–10 years",
    "10+ years"
  ];

  const locationOptions = [
    "Austin metro",
    "Multiple Texas markets",
    "Out-of-state",
    "National footprint",
    "Just starting / no history yet"
  ];

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="space-y-8 animate-fade-in">
        <div className="text-center space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">About You</h2>
          <p className="text-muted-foreground text-lg">
            Let's start with the basics.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>How long have you been in real estate?</CardTitle>
            <CardDescription>Select the option that best describes your experience.</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={yearsInRealEstate} onValueChange={setYearsInRealEstate}>
              <div className="space-y-3">
                {yearsOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors">
                    <RadioGroupItem value={option} id={option} />
                    <Label htmlFor={option} className="cursor-pointer flex-1">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Where have you spent most of your career?</CardTitle>
            <CardDescription>Select all that apply.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {locationOptions.map((location) => (
                <div 
                  key={location} 
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer"
                  onClick={() => toggleLocation(location)}
                >
                  <Checkbox 
                    checked={careerLocations.includes(location)}
                    id={location}
                  />
                  <Label htmlFor={location} className="cursor-pointer flex-1">
                    {location}
                  </Label>
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
            disabled={!yearsInRealEstate || careerLocations.length === 0}
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

export default IntakeAboutYou;
