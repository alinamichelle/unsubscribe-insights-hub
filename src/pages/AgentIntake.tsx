import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import IntakeHero from "@/components/intake/IntakeHero";
import IntakeAboutYou from "@/components/intake/IntakeAboutYou";
import IntakeBusinessMix from "@/components/intake/IntakeBusinessMix";
import IntakeObstacles from "@/components/intake/IntakeObstacles";
import IntakeSkillsMap from "@/components/intake/IntakeSkillsMap";
import IntakeWorkStyle from "@/components/intake/IntakeWorkStyle";
import IntakeGoals from "@/components/intake/IntakeGoals";
import IntakeWhyHaus from "@/components/intake/IntakeWhyHaus";
import IntakeReview from "@/components/intake/IntakeReview";

export interface IntakeData {
  yearsInRealEstate?: string;
  careerLocations?: string[];
  currentClientTypes?: string[];
  desiredClientTypes?: string[];
  obstacles?: string[];
  skillLevels?: Record<string, number>;
  workStyle?: string;
  goals?: string[];
  otherGoals?: string;
  whyRealtyHaus?: string;
  whatYouBring?: string;
}

const AgentIntake = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<IntakeData>({});

  const totalSteps = 9;
  const progress = (currentStep / (totalSteps - 1)) * 100;

  const updateData = (newData: Partial<IntakeData>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {currentStep > 0 && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
          <div className="container mx-auto px-4 py-4 max-w-3xl">
            <Progress value={progress} className="h-1" />
            <p className="text-xs text-muted-foreground mt-2">
              Step {currentStep} of {totalSteps - 1}
            </p>
          </div>
        </div>
      )}

      <div className={currentStep > 0 ? "pt-24" : ""}>
        {currentStep === 0 && <IntakeHero onNext={nextStep} />}
        {currentStep === 1 && (
          <IntakeAboutYou 
            onNext={nextStep} 
            onBack={prevStep}
            onDataChange={updateData}
            data={data}
          />
        )}
        {currentStep === 2 && (
          <IntakeBusinessMix 
            onNext={nextStep} 
            onBack={prevStep}
            onDataChange={updateData}
            data={data}
          />
        )}
        {currentStep === 3 && (
          <IntakeObstacles 
            onNext={nextStep} 
            onBack={prevStep}
            onDataChange={updateData}
            data={data}
          />
        )}
        {currentStep === 4 && (
          <IntakeSkillsMap 
            onNext={nextStep} 
            onBack={prevStep}
            onDataChange={updateData}
            data={data}
          />
        )}
        {currentStep === 5 && (
          <IntakeWorkStyle 
            onNext={nextStep} 
            onBack={prevStep}
            onDataChange={updateData}
            data={data}
          />
        )}
        {currentStep === 6 && (
          <IntakeGoals 
            onNext={nextStep} 
            onBack={prevStep}
            onDataChange={updateData}
            data={data}
          />
        )}
        {currentStep === 7 && (
          <IntakeWhyHaus 
            onNext={nextStep} 
            onBack={prevStep}
            onDataChange={updateData}
            data={data}
          />
        )}
        {currentStep === 8 && (
          <IntakeReview 
            onBack={prevStep}
            data={data}
          />
        )}
      </div>
    </div>
  );
};

export default AgentIntake;
