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
import AdminLogin from "@/pages/admin/Login";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminServices from "@/pages/admin/Services";
import AdminTraining from "@/pages/admin/Training";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/layout/Preloader";
import PromotionModal from "@/components/layout/PromotionModal";
import FloatingContact from "@/components/layout/FloatingContact";

const queryClient = new QueryClient();

function Router() {
  // Sử dụng window.location.pathname để kiểm tra trang Admin chính xác nhất ngay từ lúc load trang
  const isAdminPage = window.location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-[100dvh] overflow-x-hidden bg-white">
      {/* Chỉ hiện các thành phần khách hàng nếu không phải trang Admin */}
      {!isAdminPage && (
        <>
          <Preloader />
          <PromotionModal />
          <FloatingContact />
          <Navbar />
        </>
      )}
      
      <main className="flex-1 flex flex-col">
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

          {/* Admin Routes */}
          <Route path="/admin/login">
            <AdminLogin />
          </Route>
          <Route path="/admin/dashboard">
            <AdminDashboard />
          </Route>
          <Route path="/admin/services">
            <AdminServices />
          </Route>
          <Route path="/admin/training">
            <AdminTraining />
          </Route>
          
          {/* Fallback cho các trang admin khác chưa tạo */}
          <Route path="/admin/:rest*">
            <AdminDashboard />
          </Route>

          <Route path="/feedback" component={Feedback} />
          <Route path="/lien-he" component={Contact} />
          <Route path="/booking" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </main>
      
      {!isAdminPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
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
