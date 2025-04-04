import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import NotFound from "./pages/not-found";
import ProductsPage from "./pages/products";
import TokenPage from "./pages/token";
import EcosystemPage from "./pages/ecosystem";
import ResourcesPage from "./pages/resources";
import AboutPage from "./pages/about";
import WhitepaperPage from "./pages/whitepaper";
import PitchDeckPage from "./pages/pitch-deck";

// Create a client with enhanced configuration for better UX
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Better UX by not refetching on window focus
      retry: 1, // Limit retries for better user experience
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Add preloading for common routes
const preloadRoutes = () => {
  // Preload important routes for faster navigation
  const routes = ['/products', '/token', '/ecosystem'];
  routes.forEach(route => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = route;
    document.head.appendChild(link);
  });
};

const App = () => {
  // Preload routes after initial render
  useEffect(() => {
    preloadRoutes();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Enhanced toasters with better positioning */}
        <Toaster />
        <Sonner expand={true} closeButton richColors />
        
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/token" element={<TokenPage />} />
            <Route path="/ecosystem" element={<EcosystemPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/whitepaper" element={<WhitepaperPage />} />
            <Route path="/pitch-deck" element={<PitchDeckPage />} />
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
