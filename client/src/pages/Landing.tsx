import { useState } from "react";
import { Play, Clock, Users, BarChart3, CheckCircle, Globe } from "lucide-react";
import { useLocation } from "wouter";
import vocalifyLogo from "@assets/image_1747158009500.png";

export default function Landing() {
  const [location, setLocation] = useLocation();
  const [isHovered, setIsHovered] = useState(false);

  const handleStartTest = () => {
    setLocation("/test");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f9f9] via-white to-[#f0f9f7]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={vocalifyLogo} alt="Vocalify" className="h-8" />
              <span className="text-xl font-semibold text-gray-800">Vocality Research</span>
            </div>
            <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              Étude utilisateur • 15-20 min
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
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
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#36CFB3]/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Clock className="h-6 w-6 text-[#36CFB3]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Rapide & Simple</h3>
              <p className="text-gray-600 text-sm">
                Participez à 12 courts tests ( 15-20 min )
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#ED9390]/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <BarChart3 className="h-6 w-6 text-[#ED9390]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Données Précieuses</h3>
              <p className="text-gray-600 text-sm">
                Votre précieuse contribution améliore Vocality pour des futurs utilisateurs
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#9333EA]/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <CheckCircle className="h-6 w-6 text-[#9333EA]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Anonyme & Sécurisé</h3>
              <p className="text-gray-600 text-sm">
                Aucune donnée personnelle collectée. Données anonymisées et sécurisées.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Do Section */}
      <section className="bg-white/50 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Comment ça fonctionne
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#36CFB3] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">1</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Tapez la phrase affichée au dessus de l'écrean</h3>
                    <p className="text-gray-600 text-sm">Utilisez notre clavier virtuel pour taper 12 phrases courtes et simples.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#36CFB3] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">2</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Testez les différents styles</h3>
                    <p className="text-gray-600 text-sm">Au cours de vos 12 tests, vous allez pouvoir tester 12 combinaisons de design différents.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#36CFB3] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">3</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Données automatiquement sauvées</h3>
                    <p className="text-gray-600 text-sm">Vos interactions sont enregistrées pour nous aider à identifier le plus intuitif de l'utilisateur</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-[#36CFB3]/5 to-[#ED9390]/5 rounded-2xl p-8 border border-gray-100">
                <div className="text-center">
                  <Globe className="h-16 w-16 text-[#36CFB3] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Impact Global</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Vos données contribuent à une recherche universitaire pour optimiser les interfaces de prédiction de phrases, aidant des millions d'utilisateurs, notamment ceux ayant perdu la capacité de parler.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="grid md:grid-cols-2 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-[#36CFB3] mb-2">12</div>
                <div className="text-sm text-gray-600 font-medium">Tests par session</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#9333EA] mb-2">15-20</div>
                <div className="text-sm text-gray-600 font-medium">Minutes nécessaires</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-8">
        <div className="container mx-auto px-6">
          <div className="text-center text-gray-500 text-sm">
            <p className="mb-2">
              © 2024 Vocalify Research • Étude utilisateur sur l'interaction homme-machine
            </p>
            <p>
              Données collectées de manière anonyme • Conforme RGPD • Recherche académique
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}