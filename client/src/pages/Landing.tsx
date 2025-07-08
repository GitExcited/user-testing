import { useLocation } from "wouter";
import LandingHeader from "@/components/landing/LandingHeader";
import LandingHero from "@/components/landing/LandingHero";
import LandingHowItWorks from "@/components/landing/LandingHowItWorks";
import LandingStats from "@/components/landing/LandingStats";
import LandingFooter from "@/components/landing/LandingFooter";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f9f9] via-white to-[#f0f9f7]">
      <LandingHeader />
      <LandingHero />
      <LandingHowItWorks />
      <LandingStats />
      <LandingFooter />
    </div>
  );
}