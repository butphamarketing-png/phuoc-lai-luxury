import { lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/context/LanguageContext";

const Home = lazy(() => import("@/pages/home"));
const About = lazy(() => import("@/pages/about"));
const Services = lazy(() => import("@/pages/services"));
const ServiceDetail = lazy(() => import("@/pages/service-detail"));
const Training = lazy(() => import("@/pages/training"));
const TrainingDetail = lazy(() => import("@/pages/training-detail"));
const Feedback = lazy(() => import("@/pages/feedback"));
const News = lazy(() => import("@/pages/news"));
const NewsDetail = lazy(() => import("@/pages/news-detail"));
const Contact = lazy(() => import("@/pages/contact"));
const NotFound = lazy(() => import("@/pages/not-found"));

const queryClient = new QueryClient();

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ebebeb]">
      <p className="text-[10px] uppercase tracking-[0.4em] text-[#1a1a1a]/40">Đang tải...</p>
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/ve-chung-toi" component={About} />
        <Route path="/dich-vu/:slug" component={ServiceDetail} />
        <Route path="/dich-vu" component={Services} />
        <Route path="/dao-tao/:slug" component={TrainingDetail} />
        <Route path="/dao-tao" component={Training} />
        <Route path="/tin-tuc/:slug" component={NewsDetail} />
        <Route path="/tin-tuc" component={News} />
        <Route path="/feedback" component={Feedback} />
        <Route path="/lien-he" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
