import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, HelpCircle, Check } from "lucide-react";
import { OnboardingData } from "@/pages/Onboarding";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Screen5FieldMappingProps {
  onNext: () => void;
  onBack: () => void;
  onDataChange: (data: Partial<OnboardingData>) => void;
  data: OnboardingData;
}

interface FieldMapping {
  csvField: string;
  suggestedType: string;
  confirmed: boolean;
}

const Screen5FieldMapping = ({ onNext, onBack, onDataChange, data }: Screen5FieldMappingProps) => {
  const [mappings, setMappings] = useState<FieldMapping[]>([
    { csvField: "source", suggestedType: "Lead Source", confirmed: false },
    { csvField: "tags", suggestedType: "Tag List", confirmed: false },
    { csvField: "stage", suggestedType: "Pipeline Stage", confirmed: false },
    { csvField: "last_contact", suggestedType: "Last Touch Date", confirmed: false },
    { csvField: "status", suggestedType: "Contact Status", confirmed: false },
    { csvField: "priority", suggestedType: "Priority Level", confirmed: false },
  ]);

  const fieldTypes = [
    "Lead Source",
    "Tag List",
    "Pipeline Stage",
    "Last Touch Date",
    "Contact Status",
    "Priority Level",
    "Custom Field",
    "Ignore"
  ];

  const handleConfirm = (index: number) => {
    const newMappings = [...mappings];
    newMappings[index].confirmed = true;
    setMappings(newMappings);
  };

  const handleTypeChange = (index: number, value: string) => {
    const newMappings = [...mappings];
    newMappings[index].suggestedType = value;
    newMappings[index].confirmed = false;
    setMappings(newMappings);
  };

  const allConfirmed = mappings.every(m => m.confirmed);

  const handleNext = () => {
    const fieldMappings = mappings.reduce((acc, m) => {
      acc[m.csvField] = m.suggestedType;
      return acc;
    }, {} as Record<string, string>);
    onDataChange({ fieldMappings });
    onNext();
  };

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-light tracking-tight">
            Let's interpret your fields together.
          </h1>
          <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
            We've analyzed your CSV and suggested what each field represents. Confirm or adjust as needed.
          </p>
        </div>

        <div className="space-y-4">
          {mappings.map((mapping, index) => (
            <Card key={mapping.csvField} className="p-6">
              <div className="flex items-center gap-6">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2">
                    <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                      {mapping.csvField}
                    </code>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>What does this field represent in your workflow?</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">This looks like a</span>
                    <Select
                      value={mapping.suggestedType}
                      onValueChange={(value) => handleTypeChange(index, value)}
                    >
                      <SelectTrigger className="w-[200px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {fieldTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  variant={mapping.confirmed ? "default" : "outline"}
                  onClick={() => handleConfirm(index)}
                  disabled={mapping.confirmed}
                  className="min-w-[100px]"
                >
                  {mapping.confirmed ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Confirmed
                    </>
                  ) : (
                    "Confirm"
                  )}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {!allConfirmed && (
          <p className="text-center text-sm text-muted-foreground">
            Please confirm all field mappings to continue
          </p>
        )}

        <div className="flex justify-between pt-8">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={handleNext} disabled={!allConfirmed}>
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Screen5FieldMapping;
