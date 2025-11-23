import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { IntakeData } from "@/pages/AgentIntake";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface IntakeReviewProps {
  onBack: () => void;
  data: IntakeData;
}

const IntakeReview = ({ onBack, data }: IntakeReviewProps) => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Here you would typically submit to your backend
    console.log("Intake data:", data);
    toast.success("Intake submitted successfully! We'll be in touch soon.");
    navigate("/");
  };

  const getWorkStyleTitle = (value: string) => {
    const styles: Record<string, string> = {
      independent: "Independent Operator",
      collaborative: "Collaborative Team Player",
      structured: "Structured Executor",
      creative: "Creative Entrepreneur",
      relationship: "Relationship Builder",
      metrics: "Metrics-Driven Closer"
    };
    return styles[value] || value;
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <CheckCircle2 className="h-16 w-16 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Review Your Intake</h2>
          <p className="text-muted-foreground text-lg">
            Here's what you've shared with us. Take a moment to review before submitting.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>About You</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Years in Real Estate</p>
              <p className="font-medium">{data.yearsInRealEstate}</p>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground mb-2">Career Locations</p>
              <div className="flex flex-wrap gap-2">
                {data.careerLocations?.map(location => (
                  <Badge key={location} variant="secondary">{location}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Business Mix</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Current Clients</p>
              <div className="flex flex-wrap gap-2">
                {data.currentClientTypes?.map(type => (
                  <Badge key={type} variant="secondary">{type}</Badge>
                ))}
              </div>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground mb-2">Desired Clients</p>
              <div className="flex flex-wrap gap-2">
                {data.desiredClientTypes?.map(type => (
                  <Badge key={type} variant="secondary">{type}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Work Style</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium">{data.workStyle ? getWorkStyleTitle(data.workStyle) : "Not specified"}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Goals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {data.goals?.map(goal => (
                <Badge key={goal} variant="secondary">{goal}</Badge>
              ))}
            </div>
            {data.otherGoals && (
              <>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">Additional Goals</p>
                  <p className="mt-1">{data.otherGoals}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Why Realty Haus</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Why you're considering us</p>
              <p className="whitespace-pre-wrap">{data.whyRealtyHaus}</p>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground mb-2">What you bring</p>
              <p className="whitespace-pre-wrap">{data.whatYouBring}</p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={onBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <Button onClick={handleSubmit} size="lg" className="gap-2">
            Submit Intake
            <CheckCircle2 className="h-5 w-5" />
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground pt-4">
          Once submitted, our team will review your intake and reach out within 2–3 business days.
        </p>
      </div>
    </div>
  );
};

export default IntakeReview;
