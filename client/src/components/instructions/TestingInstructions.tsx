import { Play, CheckCircle, Clock, BarChart3 } from "lucide-react";

export default function TestingInstructions() {
  return (
    <div className="p-6 w-80 bg-gradient-to-br from-white to-gray-50">
      

      <div className="space-y-4">
        

        {/* Step 2 */}
        <div className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="flex-shrink-0 w-8 h-8 bg-[#36CFB3] text-white rounded-full flex items-center justify-center text-sm font-medium">
            ⌨️
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-800 text-sm mb-1">Tapez la phrase</h4>
            <p className="text-xs text-gray-600">Utilisez le clavier virtuel pour taper la phrase française affichée. Les suggestions apparaîtront automatiquement</p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="flex-shrink-0 w-8 h-8 bg-[#36CFB3] text-white rounded-full flex items-center justify-center">
            💡
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-800 text-sm mb-1">Utilisez les suggestions</h4>
            <p className="text-xs text-gray-600">Cliquez sur les boutons de suggestion ou continuez à taper manuellement - les deux options sont valides</p>
          </div>
        </div>

        {/* Step 4 */}
        <div className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="flex-shrink-0 w-8 h-8 bg-[#ED9390] text-white rounded-full flex items-center justify-center">
            <CheckCircle className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-800 text-sm mb-1">Terminer & Continuer</h4>
            <p className="text-xs text-gray-600">Une fois la phrase terminée, cliquez "Submit & Continue" pour passer au test suivant</p>
          </div>
        </div>

        {/* Step 5 */}
        <div className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="flex-shrink-0 w-8 h-8 bg-[#9333EA] text-white rounded-full flex items-center justify-center">
            <BarChart3 className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-800 text-sm mb-1">Répéter 12 fois</h4>
            <p className="text-xs text-gray-600">Le système vous présentera automatiquement 12 tests avec différents styles et positions de boutons</p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-100">
        <h4 className="font-medium text-blue-800 text-sm mb-2">📋 Informations importantes</h4>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>• Chaque test dure environ 1-2 minutes</li>
          <li>• Vous verrez différents styles de boutons automatiquement</li>
          <li>• Tapez naturellement - vitesse et précision sont mesurées</li>
          <li>• Vos données sont automatiquement sauvegardées</li>
        </ul>
      </div>

      <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-100">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="h-4 w-4 text-green-600" />
          <h4 className="font-medium text-green-800 text-sm">Durée estimée</h4>
        </div>
        <p className="text-xs text-green-700">
          <strong>15-20 minutes au total</strong> pour compléter les 12 tests
        </p>
      </div>
    </div>
  );
}