import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Overview from "./pages/Overview";
import Portal from "./pages/Portal";
import Login from "./pages/Login";
import Install from "./pages/Install";
import Onboarding from "./pages/Onboarding";
import AgentIntake from "./pages/AgentIntake";
import Today from "./pages/Today";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/portal" element={<Portal />} />
          <Route path="/install" element={<Install />} />
          <Route path="/intake" element={<AgentIntake />} />
          <Route path="/today" element={<Today />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
