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
              Vous allez compléter 12 tests de frappe courts avec différents styles et positions de boutons. 
              Chaque test consiste à taper une phrase française en utilisant notre clavier virtuel et système de prédiction.
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

  const getStyleDisplayName = (style: string) => {
    const styleMap: Record<string, string> = {
      'style1': 'Style Principal',
      'style2': 'Style Subtil', 
      'style3': 'Style Vibrant',
      'style4': 'Style Ombré'
    };
    return styleMap[style] || style;
  };

  const getPositionDisplayName = (position: string) => {
    const positionMap: Record<string, string> = {
      'above-textbox': 'Au-dessus du texte',
      'below-textbox': 'En-dessous du texte',
      'right-textbox': 'À droite du texte'
    };
    return positionMap[position] || position;
  };

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
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
              {getStyleDisplayName(currentTest.buttonStyle)}
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
              {getPositionDisplayName(currentTest.buttonPosition)}
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