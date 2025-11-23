import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { IntakeData } from "@/pages/AgentIntake";
import { useState } from "react";

interface IntakeWhyHausProps {
  onNext: () => void;
  onBack: () => void;
  onDataChange: (data: Partial<IntakeData>) => void;
  data: IntakeData;
}

const IntakeWhyHaus = ({ onNext, onBack, onDataChange, data }: IntakeWhyHausProps) => {
  const [whyRealtyHaus, setWhyRealtyHaus] = useState(data.whyRealtyHaus || "");
  const [whatYouBring, setWhatYouBring] = useState(data.whatYouBring || "");

  const handleNext = () => {
    onDataChange({ whyRealtyHaus, whatYouBring });
    onNext();
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="space-y-8 animate-fade-in">
        <div className="text-center space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Why Realty Haus?</h2>
          <p className="text-muted-foreground text-lg">
            These are the most important questions in the entire intake.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Why are you considering Realty Haus?</CardTitle>
            <CardDescription>
              What specifically drew you here? What are you hoping will be different?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Be specific. What matters to you about this decision?"
              value={whyRealtyHaus}
              onChange={(e) => setWhyRealtyHaus(e.target.value)}
              rows={6}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground mt-2">
              We're looking for thoughtfulness, not perfection.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>What do you bring to the table?</CardTitle>
            <CardDescription>
              If we partner, what strengths, skills, or qualities would you contribute to the Realty Haus community?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Think about your unique strengths, experience, or perspective..."
              value={whatYouBring}
              onChange={(e) => setWhatYouBring(e.target.value)}
              rows={6}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground mt-2">
              This isn't about bragging—it's about mutual fit.
            </p>
          </CardContent>
        </Card>

        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={onBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <Button 
            onClick={handleNext} 
            disabled={!whyRealtyHaus.trim() || !whatYouBring.trim()}
            className="gap-2"
          >
            Continue to Review
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IntakeWhyHaus;
