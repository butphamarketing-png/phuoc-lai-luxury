import Navbar from "@/components/sections/Navbar";
import HomeHero from "@/components/sections/HomeHero";
import HomeIntro from "@/components/sections/HomeIntro";
import HomeServices from "@/components/sections/HomeServices";
import HomeTraining from "@/components/sections/HomeTraining";
import HomeFeedback from "@/components/sections/HomeFeedback";
import HomeBooking from "@/components/sections/HomeBooking";
import HomeSocial from "@/components/sections/HomeSocial";
import Footer from "@/components/sections/Footer";
import JsonLd from "@/components/JsonLd";
import { LOCAL_BUSINESS, webPageSchema } from "@/lib/seo-schema";

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#ebebeb]">
      <JsonLd
        data={[
          LOCAL_BUSINESS,
          webPageSchema({
            name: "Phun xăm Vũng Tàu — Phuoc Lai Luxury",
            description: "Studio phun xăm và spa đẳng cấp tại Vũng Tàu.",
            path: "/",
          }),
        ]}
      />
      <Navbar />
      <HomeHero />
      <HomeIntro />
      <HomeServices />
      <HomeTraining />
      <HomeFeedback />
      <HomeBooking />
      <HomeSocial />
      <Footer />
    </main>
  );
}
