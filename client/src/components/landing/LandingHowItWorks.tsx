import { Info } from "lucide-react";

export default function LandingHowItWorks() {
  return (
    <section className="bg-white/50 py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Comment effectuer le test ?
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Étapes à gauche */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#36CFB3] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">1</div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Tapez la phrase affichée à l’écran</h3>
                  <p className="text-gray-600 text-sm">Utilisez notre clavier virtuel pour taper 10 phrases courtes aussi rapidement que possible.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#36CFB3] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">2</div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Validez votre réponse</h3>
                  <p className="text-gray-600 text-sm">Cliquez sur "Envoyer" pour enregistrer automatiquement votre phrase.</p>
                </div>
              </div>
            </div>

            {/* Nouvelle section à droite */}
            <div className="bg-gradient-to-br from-[#36CFB3]/5 to-[#ED9390]/5 rounded-2xl p-8 border border-gray-100">
              <div className="text-center">
                <Info className="h-16 w-16 text-[#36CFB3] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Informations supplémentaires</h3>
                <ul className="text-gray-600 text-sm space-y-3 text-left list-decimal list-inside">
                  <li>Appuyez bien au centre des touches et prenez votre temps pour éviter les erreurs de frappe.</li>
                  <li>En cas d’erreur, le clavier deviendra gris : corrigez la lettre incorrecte pour pouvoir continuer.</li>
                  <li>Ne fermez ni ne rafraîchissez la page pendant le test, sinon toutes vos données seront perdues.
</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
