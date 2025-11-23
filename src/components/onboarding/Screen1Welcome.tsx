import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface Screen1WelcomeProps {
  onNext: () => void;
}

const Screen1Welcome = ({ onNext }: Screen1WelcomeProps) => {
  return (
    <div className="container mx-auto px-4 max-w-3xl">
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-light tracking-tight">
            Let's set up LiteHaus around how your business actually works.
          </h1>
          <p className="text-xl text-muted-foreground font-light max-w-2xl">
            We'll walk through your data, workflow, and goals — clearly and at your pace.
          </p>
        </div>

        <Button 
          size="lg" 
          onClick={onNext}
          className="mt-8 px-12 py-6 text-base"
        >
          Begin
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Screen1Welcome;
