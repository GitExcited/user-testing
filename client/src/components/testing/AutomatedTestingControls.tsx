import { Play, Send, CheckCircle } from "lucide-react";
import { useTesting } from "./TestingProvider";

export default function AutomatedTestingControls() {
  const { 
    currentTest, 
    isAutomatedTesting, 
    startAutomatedTesting, 
    submitCurrentTest, 
    isAllTestsCompleted,
    progress,
    isTestingActive
  } = useTesting();

  if (isAllTestsCompleted) {
    return (
      <div className="bg-white shadow-sm border-b">
        <div className="flex justify-center items-center p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Tous les tests terminés !</h2>
            <p className="text-gray-600 mb-4">
              Merci d'avoir complété les 12 combinaisons de tests. Vos données ont été envoyées.
            </p>
            <p className="text-sm text-gray-500">
              Vous avez aidé à comprendre comment les différents styles et positions de boutons affectent l'interaction utilisateur.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAutomatedTesting) {
    return (
      <div className="bg-white shadow-sm border-b">
        <div className="flex justify-center items-center min-h-[200px] p-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Bienvenue dans l'étude de test utilisateur
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Vous allez compléter 12 tests de frappe courts. Chaque test consiste à taper une phrase française en utilisant notre clavier virtuel et, pour certains tests, un système de prédiction de texte.
            </p>
            <div className="flex justify-center">
              <button
                onClick={startAutomatedTesting}
                className="flex items-center gap-2 bg-[#36CFB3] text-white px-8 py-3 rounded-lg hover:bg-[#2eb89e] transition-colors font-medium text-lg shadow-md"
              >
                <Play className="h-5 w-5" />
                Commencer les tests
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentTest) return null;

  return (
    <div className="bg-white shadow-sm border-b">
      {/* Progress Bar */}
      <div className="bg-gray-100">
        <div 
          className="bg-[#36CFB3] h-2 transition-all duration-500 ease-out"
          style={{ width: `${progress.percentage}%` }}
        />
      </div>

      {/* Test Info */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-600">
              Test {progress.current + 1} sur {progress.total}
            </span>
            <span className="text-sm font-medium text-gray-600">
              Prédiction: {currentTest.predictionEnabled ? 'Activée' : 'Désactivée'}
            </span>
          </div>
          
          {isTestingActive && (
            <button
              onClick={submitCurrentTest}
              className="flex items-center gap-2 bg-[#ED9390] text-white px-6 py-2 rounded-lg hover:bg-[#e8807c] transition-colors font-medium"
            >
              <Send className="h-4 w-4" />
              Envoyer & Continuer
            </button>
          )}
        </div>

        {/* Target Sentence */}
        <div className="text-center bg-gray-50 rounded-lg p-4">
          <span className="text-sm text-gray-500 block mb-1">Tapez cette phrase :</span>
          <span className="text-lg font-medium text-gray-800">
            "{currentTest.scenario.targetSentence}"
          </span>
        </div>
      </div>
    </div>
  );
}