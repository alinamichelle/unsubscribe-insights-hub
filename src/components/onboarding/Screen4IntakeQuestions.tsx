import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, HelpCircle } from "lucide-react";
import { OnboardingData } from "@/pages/Onboarding";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Screen4IntakeQuestionsProps {
  onNext: () => void;
  onBack: () => void;
  onDataChange: (data: Partial<OnboardingData>) => void;
  data: OnboardingData;
}

const Screen4IntakeQuestions = ({ onNext, onBack, onDataChange, data }: Screen4IntakeQuestionsProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const totalQuestions = 6;

  const [goals, setGoals] = useState<string[]>(data.goals || []);
  const [leadProcess, setLeadProcess] = useState(data.leadProcess || "");
  const [leadJourney, setLeadJourney] = useState(data.leadJourney || "");
  const [leadSources, setLeadSources] = useState<string[]>(data.leadSources || []);
  const [hasGrowthTargets, setHasGrowthTargets] = useState(data.hasGrowthTargets ?? false);
  const [growthTarget, setGrowthTarget] = useState(data.growthTarget || "");
  const [previousSystems, setPreviousSystems] = useState<string[]>(data.previousSystems || []);
  const [systemFeedback, setSystemFeedback] = useState(data.systemFeedback || "");

  const handleNext = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      onDataChange({
        goals,
        leadProcess,
        leadJourney,
        leadSources,
        hasGrowthTargets,
        growthTarget,
        previousSystems,
        systemFeedback,
      });
      onNext();
    }
  };

  const handleBack = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const renderQuestion = () => {
    switch (currentQuestion) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-light">
                What are you hoping LiteHaus will help you do this year?
              </h2>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="text-sm text-muted-foreground flex items-center gap-2 cursor-help">
                      Select all that apply
                      <HelpCircle className="h-4 w-4" />
                    </p>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This shapes the workflow we recommend.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="space-y-3">
              {[
                "Create structure",
                "Organize follow-up",
                "Improve consistency",
                "Understand my database",
                "Grow production",
                "Standardize the team",
                "Reduce busywork",
                "Other"
              ].map((goal) => (
                <div key={goal} className="flex items-center space-x-3">
                  <Checkbox
                    id={goal}
                    checked={goals.includes(goal)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setGoals([...goals, goal]);
                      } else {
                        setGoals(goals.filter(g => g !== goal));
                      }
                    }}
                  />
                  <Label htmlFor={goal} className="text-base font-normal cursor-pointer">
                    {goal}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-light">
                How would you describe your current lead process?
              </h2>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="text-sm text-muted-foreground flex items-center gap-2 cursor-help">
                      Choose one
                      <HelpCircle className="h-4 w-4" />
                    </p>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>A process is simply the path a person takes from first contact to close.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <RadioGroup value={leadProcess} onValueChange={setLeadProcess}>
              {[
                "We have a defined process",
                "We have parts of one",
                "It varies by agent",
                "We're creating one",
                "Not sure yet"
              ].map((option) => (
                <div key={option} className="flex items-center space-x-3">
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option} className="text-base font-normal cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-light">
                How do people usually move from stranger → lead → client today?
              </h2>
            </div>

            <RadioGroup value={leadJourney} onValueChange={setLeadJourney}>
              {[
                "There's a clear journey",
                "It's informal",
                "It depends on lead type",
                "I'd like help shaping this",
                "Not certain"
              ].map((option) => (
                <div key={option} className="flex items-center space-x-3">
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option} className="text-base font-normal cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-light">
                Where do most of your leads originate?
              </h2>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="text-sm text-muted-foreground flex items-center gap-2 cursor-help">
                      Select all that apply
                      <HelpCircle className="h-4 w-4" />
                    </p>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This helps us match behavior patterns to your sources.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="space-y-3">
              {[
                "Zillow",
                "Realtor.com",
                "Facebook",
                "Instagram",
                "Referrals",
                "Open houses",
                "Website",
                "Direct mail",
                "Sphere of influence",
                "Other"
              ].map((source) => (
                <div key={source} className="flex items-center space-x-3">
                  <Checkbox
                    id={source}
                    checked={leadSources.includes(source)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setLeadSources([...leadSources, source]);
                      } else {
                        setLeadSources(leadSources.filter(s => s !== source));
                      }
                    }}
                  />
                  <Label htmlFor={source} className="text-base font-normal cursor-pointer">
                    {source}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-light">
                Do you have growth targets for the next 12 months?
              </h2>
            </div>

            <RadioGroup 
              value={hasGrowthTargets.toString()} 
              onValueChange={(val) => setHasGrowthTargets(val === "true")}
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="true" id="yes" />
                <Label htmlFor="yes" className="text-base font-normal cursor-pointer">
                  Yes
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="false" id="no" />
                <Label htmlFor="no" className="text-base font-normal cursor-pointer">
                  No
                </Label>
              </div>
            </RadioGroup>

            {hasGrowthTargets && (
              <div className="space-y-2 animate-in slide-in-from-top-2">
                <Label htmlFor="target">What's your target?</Label>
                <Input
                  id="target"
                  placeholder="e.g., 20 closings, $5M in volume"
                  value={growthTarget}
                  onChange={(e) => setGrowthTarget(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Examples: "20 closings", "Increase nurture conversions"
                </p>
              </div>
            )}
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-light">
                What systems have you used before?
              </h2>
            </div>

            <div className="space-y-3">
              {[
                "Lofty",
                "Follow Up Boss",
                "Chime",
                "LionDesk",
                "KvCore",
                "Excel/Spreadsheets",
                "None",
                "Other"
              ].map((system) => (
                <div key={system} className="flex items-center space-x-3">
                  <Checkbox
                    id={system}
                    checked={previousSystems.includes(system)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setPreviousSystems([...previousSystems, system]);
                      } else {
                        setPreviousSystems(previousSystems.filter(s => s !== system));
                      }
                    }}
                  />
                  <Label htmlFor={system} className="text-base font-normal cursor-pointer">
                    {system}
                  </Label>
                </div>
              ))}
            </div>

            {previousSystems.length > 0 && !previousSystems.includes("None") && (
              <div className="space-y-2 animate-in slide-in-from-top-2">
                <Label htmlFor="feedback">What did you wish those tools helped you do better?</Label>
                <Textarea
                  id="feedback"
                  placeholder="Share your thoughts..."
                  value={systemFeedback}
                  onChange={(e) => setSystemFeedback(e.target.value)}
                  rows={4}
                />
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-3xl">
      <div className="space-y-12">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Question {currentQuestion} of {totalQuestions}
          </p>
        </div>

        <div className="min-h-[400px]">
          {renderQuestion()}
        </div>

        <div className="flex justify-between pt-8">
          <Button variant="ghost" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={handleNext}>
            {currentQuestion < totalQuestions ? "Next" : "Continue"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Screen4IntakeQuestions;
