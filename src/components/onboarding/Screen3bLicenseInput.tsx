import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Screen3bLicenseInputProps {
  onNext: (licenseNumber?: string) => void;
  onBack: () => void;
  onDataChange: (data: { licenseNumber?: string }) => void;
}

const Screen3bLicenseInput = ({ onNext, onBack, onDataChange }: Screen3bLicenseInputProps) => {
  const [licenseNumber, setLicenseNumber] = useState("");

  const handleSubmit = () => {
    if (licenseNumber.trim()) {
      onDataChange({ licenseNumber: licenseNumber.trim() });
      onNext(licenseNumber.trim());
    }
  };

  const handleSkip = () => {
    onNext();
  };

  return (
    <div className="container mx-auto px-4 max-w-2xl">
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-light tracking-tight">
            Want LiteHaus to analyze your MLS transactions?
          </h1>
          <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
            This helps LiteHaus identify repeat clients, referral patterns, and long-term opportunities. 
            It also allows us to show your full career analytics.
          </p>
        </div>

        {/* Input Section */}
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">License Number</label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="text-sm">
                      LiteHaus uses your license to match closed transactions in MLS records. 
                      This lets us detect repeat clients, 5–7 year move cycles, and referral likelihood.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              type="text"
              placeholder="Your license number (optional)"
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
              className="text-base"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && licenseNumber.trim()) {
                  handleSubmit();
                }
              }}
            />
            <p className="text-sm text-muted-foreground font-light">
              Used only to match your transaction history securely. Skip if you prefer.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center pt-8">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleSkip}>
              Skip for now
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!licenseNumber.trim()}
            >
              Add My License Number
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Screen3bLicenseInput;
