import Navbar from "@/components/sections/Navbar";
import HomeHero from "@/components/sections/HomeHero";
import HomeIntro from "@/components/sections/HomeIntro";
import HomeServices from "@/components/sections/HomeServices";
import HomeTraining from "@/components/sections/HomeTraining";
import HomeFeedback from "@/components/sections/HomeFeedback";
import HomeWhyChooseUs from "@/components/sections/HomeWhyChooseUs";
import HomeBooking from "@/components/sections/HomeBooking";
import HomeSocial from "@/components/sections/HomeSocial";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background w-full overflow-x-hidden relative">
      <Navbar />
      <HomeHero />
      <HomeIntro />
      <HomeServices />
      <HomeTraining />
      <HomeFeedback />
      <HomeWhyChooseUs />
      <HomeBooking />
      <HomeSocial />
      <Footer />
    </main>
  );
}