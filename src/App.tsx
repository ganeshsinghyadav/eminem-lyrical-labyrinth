
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Discography from "./pages/Discography";
import Lyrics from "./pages/Lyrics";
import EasterEggs from "./pages/EasterEggs";
import Quiz from "./pages/Quiz";
import Legacy from "./pages/Legacy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-em-dark">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/discography" element={<Discography />} />
            <Route path="/lyrics" element={<Lyrics />} />
            <Route path="/easter-eggs" element={<EasterEggs />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/legacy" element={<Legacy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
