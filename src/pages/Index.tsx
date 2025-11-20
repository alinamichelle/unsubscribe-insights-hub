import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart3, TrendingDown, Users, Mail } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <BarChart3 className="h-4 w-4" />
            HausSignal Analytics
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Unsubscribe Intelligence
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Monitor email performance & list health with comprehensive analytics for your real estate team
          </p>
          <Button size="lg" onClick={() => navigate('/dashboard')} className="text-lg px-8">
            Open Dashboard
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <TrendingDown className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Track Unsubscribes</h3>
            <p className="text-muted-foreground text-sm">
              Monitor who's unsubscribing, from which emails, and identify problem campaigns in real-time
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-success" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Agent Performance</h3>
            <p className="text-muted-foreground text-sm">
              See which agents and sources drive the most unsubs with interactive visualizations
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 rounded-lg bg-warning/10 flex items-center justify-center mb-4">
              <Mail className="h-6 w-6 text-warning" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Actionable Insights</h3>
            <p className="text-muted-foreground text-sm">
              Get recommendations on improving messaging and cadence to reduce unsubscribe rates
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
