import { useState } from "react";
import { Play } from "lucide-react";
import { useLocation } from "wouter";
import LandingFeatures from "./LandingFeatures"; // Import the newly created component

export default function LandingHero() {
  const [location, setLocation] = useLocation();
  const [isHovered, setIsHovered] = useState(false);

  const handleStartTest = () => {
    setLocation("/test");
  };

  return (
    <section className="container mx-auto px-6 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
           Participez à notre étude sur la vitesse de frappe
            
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-4">
            Nous développons des outils  pour aider les personnes ayant perdu l’usage de la parole (SLA, AVC, Parkinson, etc.) à communiquer.

          </p>

           <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Afin d’optimiser nos outils, nous étudions la manière dont les utilisateurs tapent sur une tablette.
          </p>
        </div>

        {/* CTA Button */}
        <div className="mb-12">
          <button
            onClick={handleStartTest}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative bg-[#36CFB3] hover:bg-[#2eb89e] text-white px-10 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center gap-3">
              <Play className={`h-6 w-6 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
              <span>Commencer </span>
            </div>

            {/* Animated background effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#36CFB3] to-[#5ED9C2] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          </button>

          
        </div>

        {/* Features Grid */}
        <LandingFeatures />
      </div>
    </section>
  );
}