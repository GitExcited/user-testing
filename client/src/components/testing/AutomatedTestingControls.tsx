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
            <h2 className="text-2xl font-bold text-gray-800 mb-2">All Tests Completed!</h2>
            <p className="text-gray-600 mb-4">
              Thank you for completing all 12 test combinations. Your data has been submitted.
            </p>
            <p className="text-sm text-gray-500">
              You've helped us understand how different button styles and positions affect user interaction.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAutomatedTesting) {
    return (
      <div className="bg-white shadow-sm border-b">
        <div className="flex justify-center items-center p-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Welcome to the User Testing Study
            </h2>
            <p className="text-gray-600 mb-4 max-w-2xl">
              You'll complete 12 short typing tests with different button styles and positions. 
              Each test involves typing a French sentence using our virtual keyboard and prediction system.
            </p>
            <button
              onClick={startAutomatedTesting}
              className="flex items-center gap-2 bg-[#36CFB3] text-white px-8 py-3 rounded-lg hover:bg-[#2eb89e] transition-colors font-medium text-lg"
            >
              <Play className="h-5 w-5" />
              Start Testing
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentTest) return null;

  const getStyleDisplayName = (style: string) => {
    const styleMap: Record<string, string> = {
      'style1': 'Primary Eye-Catching',
      'style2': 'Subtle Outlined', 
      'style3': 'Vibrant Highlight',
      'style4': 'Soft Shadowed'
    };
    return styleMap[style] || style;
  };

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
              Test {progress.current + 1} of {progress.total}
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
              Submit & Continue
            </button>
          )}
        </div>

        {/* Target Sentence */}
        <div className="text-center bg-gray-50 rounded-lg p-4">
          <span className="text-sm text-gray-500 block mb-1">Type this sentence:</span>
          <span className="text-lg font-medium text-gray-800">
            "{currentTest.scenario.targetSentence}"
          </span>
        </div>
      </div>
    </div>
  );
}