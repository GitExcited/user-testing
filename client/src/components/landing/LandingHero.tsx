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
            Aidez Vocality à optimiser son
            <span className="text-[#36CFB3] block mt-2">expérience utilisateur</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Votre participation contribue à la recherche visant à améliorer l'expérience des personnes ayant perdu la capacité de parler
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
              <span>Commencer l'étude</span>
            </div>

            {/* Animated background effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#36CFB3] to-[#5ED9C2] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          </button>

          <p className="text-sm text-gray-500 mt-4">
            Aucune inscription requise • Données anonymisées • Gratuit
          </p>
        </div>

        {/* Features Grid */}
        <LandingFeatures />
      </div>
    </section>
  );
}