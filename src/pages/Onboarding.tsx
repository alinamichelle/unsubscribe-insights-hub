import { useState } from "react";
import { Navigate } from "react-router-dom";
import Screen1Welcome from "@/components/onboarding/Screen1Welcome";
import Screen2Upload from "@/components/onboarding/Screen2Upload";
import Screen3HealthReport from "@/components/onboarding/Screen3HealthReport";
import Screen3bLicenseInput from "@/components/onboarding/Screen3bLicenseInput";
import Screen3cMLSHistory from "@/components/onboarding/Screen3cMLSHistory";
import Screen4IntakeQuestions from "@/components/onboarding/Screen4IntakeQuestions";
import Screen5FieldMapping from "@/components/onboarding/Screen5FieldMapping";
import Screen6Summary from "@/components/onboarding/Screen6Summary";
import { Progress } from "@/components/ui/progress";

export interface OnboardingData {
  uploadedFile?: File;
  licenseNumber?: string;
  goals?: string[];
  leadProcess?: string;
  leadJourney?: string;
  leadSources?: string[];
  hasGrowthTargets?: boolean;
  growthTarget?: string;
  previousSystems?: string[];
  systemFeedback?: string;
  fieldMappings?: Record<string, string>;
}

const Onboarding = () => {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [data, setData] = useState<OnboardingData>({});
  const [isComplete, setIsComplete] = useState(false);
  const [showMLSHistory, setShowMLSHistory] = useState(false);

  const totalScreens = 8; // Updated to include license input and MLS history screens
  const progress = (currentScreen / totalScreens) * 100;

  const updateData = (newData: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  const nextScreen = () => {
    if (currentScreen < totalScreens) {
      setCurrentScreen(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      setIsComplete(true);
    }
  };

  const handleLicenseSubmit = (licenseNumber?: string) => {
    if (licenseNumber) {
      setShowMLSHistory(true);
      nextScreen();
    } else {
      // Skip MLS history, go to intake questions (screen 6)
      setShowMLSHistory(false);
      setCurrentScreen(6);
      window.scrollTo(0, 0);
    }
  };

  const prevScreen = () => {
    if (currentScreen > 1) {
      setCurrentScreen(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  if (isComplete) {
    return <Navigate to="/portal" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4">
          <Progress value={progress} className="h-1" />
          <p className="text-xs text-muted-foreground mt-2">
            Step {currentScreen} of {totalScreens}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-24 pb-16">
        {currentScreen === 1 && (
          <Screen1Welcome onNext={nextScreen} />
        )}
        {currentScreen === 2 && (
          <Screen2Upload 
            onNext={nextScreen} 
            onBack={prevScreen}
            onDataChange={updateData}
            data={data}
          />
        )}
        {currentScreen === 3 && (
          <Screen3HealthReport 
            onNext={nextScreen} 
            onBack={prevScreen}
          />
        )}
        {currentScreen === 4 && (
          <Screen3bLicenseInput 
            onNext={handleLicenseSubmit} 
            onBack={prevScreen}
            onDataChange={updateData}
          />
        )}
        {currentScreen === 5 && showMLSHistory && (
          <Screen3cMLSHistory 
            onNext={nextScreen} 
            onBack={prevScreen}
          />
        )}
        {currentScreen === 6 && (
          <Screen4IntakeQuestions 
            onNext={nextScreen} 
            onBack={prevScreen}
            onDataChange={updateData}
            data={data}
          />
        )}
        {currentScreen === 7 && (
          <Screen5FieldMapping 
            onNext={nextScreen} 
            onBack={prevScreen}
            onDataChange={updateData}
            data={data}
          />
        )}
        {currentScreen === 8 && (
          <Screen6Summary 
            onNext={nextScreen} 
            onBack={prevScreen}
            data={data}
          />
        )}
      </div>
    </div>
  );
};

export default Onboarding;
