import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/hooks/use-language";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Training from "@/pages/Training";
import Feedback from "@/pages/Feedback";
import Contact from "@/pages/Contact";
import ServiceDetail from "@/pages/ServiceDetail";
import TrainingDetail from "@/pages/TrainingDetail";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/layout/Preloader";
import PromotionModal from "@/components/layout/PromotionModal";

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="flex flex-col min-h-[100dvh] overflow-x-hidden">
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/ve-chung-toi" component={About} />
          
          {/* Services Routes */}
          <Route path="/dich-vu" component={Services} />
          <Route path="/dich-vu/phun-xam">
            <Services />
          </Route>
          <Route path="/dich-vu/spa">
            <Services />
          </Route>
          <Route path="/dich-vu/:slug" component={ServiceDetail} />
          
          {/* Training Routes */}
          <Route path="/dao-tao" component={Training} />
          <Route path="/dao-tao/phun-xam">
            <Training />
          </Route>
          <Route path="/dao-tao/spa">
            <Training />
          </Route>
          <Route path="/dao-tao/:slug" component={TrainingDetail} />

          <Route path="/feedback" component={Feedback} />
          <Route path="/lien-he" component={Contact} />
          <Route path="/booking" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Preloader />
          <PromotionModal />
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
