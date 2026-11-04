import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import NewArrivals from "@/components/home/NewArrivals";
import BestSellers from "@/components/home/BestSellers";
import OfferBanner from "@/components/home/OfferBanner";
import WhyUs from "@/components/home/WhyUs";
import DailyInspiration from "@/components/home/DailyInspiration";
import Reviews from "@/components/home/Reviews";
import JoinSection from "@/components/home/JoinSection";
import GeometricDivider from "@/components/ui/GeometricDivider";

export default function Home() {
  return (
    <>
      <Hero />
      <GeometricDivider />
      <Categories />
      <GeometricDivider />
      <NewArrivals />
      <GeometricDivider />
      <BestSellers />
      <GeometricDivider />
      <OfferBanner />
      <GeometricDivider />
      <WhyUs />
      <GeometricDivider />
      <DailyInspiration />
      <GeometricDivider />
      <Reviews />
      <GeometricDivider />
      <JoinSection />
    </>
  );
}
