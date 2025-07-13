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
            <h2 className="text-2xl font-bold text-gray-800 mb-2">C’est terminé, merci !</h2>
            <p className="text-gray-600 mb-4">
              Votre aide est précieuse pour améliorer nos outils. Toutes vos données ont été transmises avec succès.
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
              Résumé des instructions
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Vous allez écrire 10 courtes phrases le plus rapidement possible. Une fois chaque phrase complétée, cliquez sur "Envoyer".
            </p>
            <div className="flex justify-center">
              <button
                onClick={startAutomatedTesting}
                className="flex items-center gap-2 bg-[#36CFB3] text-white px-8 py-3 rounded-lg hover:bg-[#2eb89e] transition-colors font-medium text-lg shadow-md"
              >
                <Play className="h-5 w-5" />
                Commencer 
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