import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Upload, FileSpreadsheet } from "lucide-react";
import { OnboardingData } from "@/pages/Onboarding";
import { useToast } from "@/hooks/use-toast";

interface Screen2UploadProps {
  onNext: () => void;
  onBack: () => void;
  onDataChange: (data: Partial<OnboardingData>) => void;
  data: OnboardingData;
}

const Screen2Upload = ({ onNext, onBack, onDataChange }: Screen2UploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && (file.type === "text/csv" || file.name.endsWith(".csv"))) {
      setFileName(file.name);
      onDataChange({ uploadedFile: file });
      toast({
        title: "File uploaded",
        description: "Analyzing your database structure...",
      });
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV file.",
        variant: "destructive",
      });
    }
  }, [onDataChange, toast]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onDataChange({ uploadedFile: file });
      toast({
        title: "File uploaded",
        description: "Analyzing your database structure...",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-light tracking-tight">
            Start with what you already have.
          </h1>
          <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
            Upload your contact list. I'll analyze its structure, completeness, and patterns so we have a clear starting point.
          </p>
        </div>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            border-2 border-dashed rounded-lg p-16 text-center transition-all
            ${isDragging ? "border-primary bg-primary/5" : "border-border"}
            ${fileName ? "bg-muted/30" : ""}
          `}
        >
          {fileName ? (
            <div className="space-y-4">
              <FileSpreadsheet className="h-16 w-16 mx-auto text-primary" />
              <div>
                <p className="text-lg font-medium">{fileName}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  File uploaded successfully
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="h-16 w-16 mx-auto text-muted-foreground" />
              <div>
                <p className="text-lg font-medium">
                  Drag and drop your CSV file here
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  or click to browse
                </p>
              </div>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileInput}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button variant="outline" className="mt-4" asChild>
                  <span>Choose File</span>
                </Button>
              </label>
            </div>
          )}
        </div>

        <p className="text-center text-sm text-muted-foreground italic">
          This isn't an evaluation. It's orientation.
        </p>

        <div className="flex justify-between pt-8">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={onNext} disabled={!fileName}>
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Screen2Upload;
