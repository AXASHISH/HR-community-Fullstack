import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { routes } from "./routes";
import PublicLayout from "./components/layouts/PublicLayout";
import PrivateLayout from "./components/layouts/PrivateLayout";

const queryClient = new QueryClient();

// Loading component for Suspense fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
  </div>
);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public Routes */}
              <Route element={<PublicLayout />}>
                {routes
                  .filter((r) => r.layout === "public")
                  .map(({ path, element: Element }) => (
                    <Route key={path} path={path} element={<Element />} />
                  ))}
              </Route>

              {/* Private Routes */}
              <Route element={<PrivateLayout />}>
                {routes
                  .filter((r) => r.layout === "private")
                  .map(({ path, element: Element }) => (
                    <Route key={path} path={path} element={<Element />} />
                  ))}
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
