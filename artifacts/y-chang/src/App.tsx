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
import News from "@/pages/News";
import NewsDetail from "@/pages/NewsDetail";
import Contact from "@/pages/Contact";
import ServiceDetail from "@/pages/ServiceDetail";
import TrainingDetail from "@/pages/TrainingDetail";
import AdminLogin from "@/pages/admin/Login";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminServices from "@/pages/admin/Services";
import AdminTraining from "@/pages/admin/Training";
import AdminReviews from "@/pages/admin/Reviews";
import AdminCustomers from "@/pages/admin/Customers";
import AdminSettings from "@/pages/admin/Settings";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/layout/Preloader";
import PromotionModal from "@/components/layout/PromotionModal";
import FloatingContact from "@/components/layout/FloatingContact";
import ServiceVideosFab from "@/components/layout/ServiceVideosFab";
import SiteSeo from "@/components/seo/SiteSeo";
import AdminLegacyRedirect from "@/components/admin/AdminLegacyRedirect";
import { isAdminPath, isLegacyAdminPath } from "@/lib/admin-paths";
import { useFavicon } from "@/hooks/use-favicon";

const queryClient = new QueryClient();

function Router() {
  // Sử dụng window.location.pathname để kiểm tra trang Admin chính xác nhất ngay từ lúc load trang
  const pathname = window.location.pathname;
  const isAdminPage = isAdminPath(pathname) || isLegacyAdminPath(pathname);

  return (
    <div className="flex flex-col min-h-[100dvh] overflow-x-hidden bg-white">
      <SiteSeo />
      {/* Chỉ hiện các thành phần khách hàng nếu không phải trang Admin */}
      {!isAdminPage && (
        <>
          <Preloader />
          <PromotionModal />
          <ServiceVideosFab />
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

          {/* Admin CMS — đăng nhập: /adminbp */}
          <Route path="/adminbp">
            <AdminLogin />
          </Route>
          <Route path="/adminbp/dashboard">
            <AdminDashboard />
          </Route>
          <Route path="/adminbp/services">
            <AdminServices />
          </Route>
          <Route path="/adminbp/training">
            <AdminTraining />
          </Route>
          <Route path="/adminbp/feedback">
            <AdminReviews />
          </Route>
          <Route path="/adminbp/customers">
            <AdminCustomers />
          </Route>
          <Route path="/adminbp/settings">
            <AdminSettings />
          </Route>
          <Route path="/adminbp/:rest*">
            <AdminDashboard />
          </Route>

          {/* Chuyển hướng đường dẫn cũ /admin */}
          <Route path="/admin/login">
            <AdminLegacyRedirect />
          </Route>
          <Route path="/admin/dashboard">
            <AdminLegacyRedirect />
          </Route>
          <Route path="/admin/services">
            <AdminLegacyRedirect />
          </Route>
          <Route path="/admin/training">
            <AdminLegacyRedirect />
          </Route>
          <Route path="/admin/:rest*">
            <AdminLegacyRedirect />
          </Route>
          <Route path="/admin">
            <AdminLegacyRedirect />
          </Route>

          <Route path="/tin-tuc/:slug" component={NewsDetail} />
          <Route path="/tin-tuc" component={News} />
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
  useFavicon();
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
