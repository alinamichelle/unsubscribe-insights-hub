import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface IntakeHeroProps {
  onNext: () => void;
}

const IntakeHero = ({ onNext }: IntakeHeroProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="max-w-3xl w-full text-center space-y-8 animate-fade-in">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <div className="text-3xl font-bold tracking-tight">
            REALTY HAUS
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
          We're not looking for more agents—
          <br />
          <span className="text-primary">we're looking for the right ones.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Before we talk about partnering, we want to understand who you are, 
          how you work, and where you want to grow.
        </p>

        {/* CTA */}
        <div className="pt-8">
          <Button 
            size="lg" 
            onClick={onNext}
            className="text-base px-8 py-6 gap-2"
          >
            Begin Intake
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Subtle note */}
        <p className="text-sm text-muted-foreground pt-12">
          This intake takes about 8–10 minutes. Be honest—we value clarity.
        </p>
      </div>
    </div>
  );
};

export default IntakeHero;
