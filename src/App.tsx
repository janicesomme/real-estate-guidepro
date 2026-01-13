import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PathSelection from "./pages/PathSelection";
import Index from "./pages/Index";
import Assessment from "./pages/Assessment";
import InvestorAssessment from "./pages/InvestorAssessment";
import EmptyNesterAssessment from "./pages/EmptyNesterAssessment";
import RelocatorAssessment from "./pages/RelocatorAssessment";
import UpsizerAssessment from "./pages/UpsizerAssessment";
import Dashboard from "./pages/Dashboard";
import Webinars from "./pages/Webinars";
import Partners from "./pages/Partners";
import About from "./pages/About";
import ActionTaker from "./pages/ActionTaker";
import FindYourHome from "./pages/FindYourHome";
import Selling from "./pages/Selling";
import AgentDashboard from "./pages/AgentDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PathSelection />} />
          <Route path="/home" element={<Index />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/assessment/investor" element={<InvestorAssessment />} />
          <Route path="/assessment/empty-nester" element={<EmptyNesterAssessment />} />
          <Route path="/assessment/relocator" element={<RelocatorAssessment />} />
          <Route path="/assessment/upsizer" element={<UpsizerAssessment />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/webinars" element={<Webinars />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/about" element={<About />} />
          <Route path="/action-taker" element={<ActionTaker />} />
          <Route path="/find-your-home" element={<FindYourHome />} />
          <Route path="/selling" element={<Selling />} />
          <Route path="/agent" element={<AgentDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
