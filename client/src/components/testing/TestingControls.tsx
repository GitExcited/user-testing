import { Play, Square, Send, Settings, Target } from "lucide-react";
import { useTesting } from "./TestingProvider";
import { useSuggestions } from "../suggestions/SuggestionProvider";
import { PREDICTION_SCENARIOS } from "@/data/predictionScenarios";
import { testGoogleFormsSubmission } from "@/utils/googleFormsSubmission";

export default function TestingControls() {
  const { isTestingActive, startTesting, endTesting, testingData } = useTesting();
  const { currentScenario, setCurrentScenario, buttonStyle, buttonPosition } = useSuggestions();

  const handleStartTesting = () => {
    const scenario = PREDICTION_SCENARIOS[currentScenario];
    console.log('Starting test with configuration:', {
      scenario: scenario.targetSentence,
      buttonStyle,
      buttonPosition
    });
    startTesting(scenario.targetSentence, buttonStyle, buttonPosition);
  };

  const handleTestGoogleForms = async () => {
    console.log('Testing Google Forms submission...');
    await testGoogleFormsSubmission();
  };

  // Helper function to get readable style names
  const getStyleDisplayName = (style: string) => {
    const styleMap: Record<string, string> = {
      'style1': 'Primary Eye-Catching',
      'style2': 'Subtle Outlined', 
      'style3': 'Vibrant Highlight',
      'style4': 'Soft Shadowed'
    };
    return styleMap[style] || style;
  };

  // Helper function to get readable position names
  const getPositionDisplayName = (position: string) => {
    const positionMap: Record<string, string> = {
      'above-textbox': 'Above Text Input',
      'below-textbox': 'Below Text Input',
      'right-textbox': 'Right of Text Input'
    };
    return positionMap[position] || position;
  };

  return (
    <div className="bg-white shadow-sm border-b">
      {/* Main Controls Row */}
      <div className="flex justify-center items-center gap-6 p-4">
        {/* Scenario Selection */}
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-gray-500" />
          <label className="text-sm text-gray-600 font-medium">Scenario:</label>
          <select 
            value={currentScenario} 
            onChange={(e) => setCurrentScenario(Number(e.target.value))}
            disabled={isTestingActive}
            className="text-sm border rounded px-3 py-1 bg-white min-w-[200px]"
          >
            {PREDICTION_SCENARIOS.map((scenario, index) => (
              <option key={index} value={index}>
                {scenario.targetSentence}
              </option>
            ))}
          </select>
        </div>

        {/* Current Configuration Display */}
        <div className="flex items-center gap-4 px-4 py-2 bg-gray-50 rounded-lg">
          <Settings className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">
            <strong>Style:</strong> {getStyleDisplayName(buttonStyle)}
          </span>
          <span className="text-gray-300">|</span>
          <span className="text-sm text-gray-600">
            <strong>Position:</strong> {getPositionDisplayName(buttonPosition)}
          </span>
        </div>

        {/* Action Buttons */}
        {!isTestingActive ? (
          <>
            <button
              onClick={handleStartTesting}
              className="flex items-center gap-2 bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors font-medium"
            >
              <Play className="h-4 w-4" />
              Start Testing
            </button>
            
            <button
              onClick={handleTestGoogleForms}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
              title="Send test data to Google Forms"
            >
              <Send className="h-4 w-4" />
              Test Forms
            </button>
          </>
        ) : (
          <button
            onClick={endTesting}
            className="flex items-center gap-2 bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors font-medium"
          >
            <Square className="h-4 w-4" />
            End Testing
          </button>
        )}
      </div>

      {/* Target Sentence Display */}
      <div className="px-4 pb-3">
        <div className="text-center">
          <span className="text-sm text-gray-500">Target Sentence: </span>
          <span className="text-sm font-medium text-gray-800">
            "{PREDICTION_SCENARIOS[currentScenario].targetSentence}"
          </span>
        </div>
      </div>

      {/* Active Session Info */}
      {testingData && (
        <div className="px-4 pb-3">
          <div className="flex justify-center">
            <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2">
              <div className="flex items-center gap-4 text-xs text-green-700">
                <span>Session: <strong>{testingData.sessionId.slice(0, 8)}...</strong></span>
                <span>Style: <strong>{getStyleDisplayName(testingData.buttonStyle)}</strong></span>
                <span>Position: <strong>{getPositionDisplayName(testingData.buttonPosition)}</strong></span>
                <span>Started: <strong>{testingData.startTime.toLocaleTimeString()}</strong></span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}