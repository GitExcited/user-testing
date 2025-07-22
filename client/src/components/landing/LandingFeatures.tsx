import { Clock, BarChart3, CheckCircle } from "lucide-react";

export default function LandingFeatures() {
  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="w-12 h-12 bg-[#36CFB3]/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
          <Clock className="h-6 w-6 text-[#36CFB3]" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Rapide & Simple</h3>
        <p className="text-gray-600 text-sm">
          Durée de 15 à 20 minutes 
        </p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="w-12 h-12 bg-[#ED9390]/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
          <BarChart3 className="h-6 w-6 text-[#ED9390]" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Données </h3>
        <p className="text-gray-600 text-sm">
          Votre précieuse contribution améliorera notre solution
        </p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="w-12 h-12 bg-[#9333EA]/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
          <CheckCircle className="h-6 w-6 text-[#9333EA]" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Anonyme & Sécurisé</h3>
        <p className="text-gray-600 text-sm">
          Données anonymisées et sécurisées
        </p>
      </div>
    </div>
  );
}