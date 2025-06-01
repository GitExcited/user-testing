import { Play, Square, Send } from "lucide-react";
import { useTesting } from "./TestingProvider";
import { useSuggestions } from "../suggestions/SuggestionProvider";
import { PREDICTION_SCENARIOS } from "@/data/predictionScenarios";
import { testGoogleFormsSubmission } from "@/utils/googleFormsSubmission";

export default function TestingControls() {
  const { isTestingActive, startTesting, endTesting, testingData } = useTesting();
  const { currentScenario, setCurrentScenario, buttonStyle, buttonPosition } = useSuggestions();

  const handleStartTesting = () => {
    const scenario = PREDICTION_SCENARIOS[currentScenario];
    startTesting(scenario.targetSentence, buttonStyle, buttonPosition);
  };

  const handleTestGoogleForms = async () => {
    console.log('Testing Google Forms submission...');
    await testGoogleFormsSubmission();
  };

  return (
    <div className="flex justify-center items-center gap-4 p-4 bg-white shadow-sm">
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600">Scenario:</label>
        <select 
          value={currentScenario} 
          onChange={(e) => setCurrentScenario(Number(e.target.value))}
          disabled={isTestingActive}
          className="text-sm border rounded px-2 py-1"
        >
          {PREDICTION_SCENARIOS.map((scenario, index) => (
            <option key={index} value={index}>
              {scenario.targetSentence}
            </option>
          ))}
        </select>
      </div>

      <div className="text-sm text-gray-600">
        Target: "{PREDICTION_SCENARIOS[currentScenario].targetSentence}"
      </div>

      {!isTestingActive ? (
        <>
          <button
            onClick={handleStartTesting}
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            <Play className="h-4 w-4" />
            Start Testing
          </button>
          
          {/* NEW: Test Google Forms button */}
          <button
            onClick={handleTestGoogleForms}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            title="Send test data to Google Forms"
          >
            <Send className="h-4 w-4" />
            Test Forms
          </button>
        </>
      ) : (
        <button
          onClick={endTesting}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          <Square className="h-4 w-4" />
          End Testing
        </button>
      )}

      {testingData && (
        <div className="text-xs text-gray-500 ml-4">
          Session: {testingData.sessionId.slice(0, 8)}... | 
          Style: {testingData.buttonStyle} | 
          Position: {testingData.buttonPosition}
        </div>
      )}
    </div>
  );
}