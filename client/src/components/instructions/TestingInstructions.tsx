import { Play, Eye, Download, CheckCircle } from "lucide-react";

export default function TestingInstructions() {
  return (
    <div className="p-6 w-80 bg-gradient-to-br from-white to-gray-50">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">How to Use the Testing App</h3>
        <p className="text-sm text-gray-600">Follow these steps to complete your user testing session</p>
      </div>

      <div className="space-y-4">
        {/* Step 1 */}
        <div className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="flex-shrink-0 w-8 h-8 bg-[#36CFB3] text-white rounded-full flex items-center justify-center text-sm font-medium">
            1
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-800 text-sm mb-1">Select Scenario</h4>
            <p className="text-xs text-gray-600">Choose a target sentence from the dropdown in the testing controls</p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="flex-shrink-0 w-8 h-8 bg-[#36CFB3] text-white rounded-full flex items-center justify-center">
            <Play className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-800 text-sm mb-1">Start Testing</h4>
            <p className="text-xs text-gray-600">Click "Start Testing" to begin your session and activate data collection</p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="flex-shrink-0 w-8 h-8 bg-[#36CFB3] text-white rounded-full flex items-center justify-center">
            <Eye className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-800 text-sm mb-1">Type & Watch Predictions</h4>
            <p className="text-xs text-gray-600">Type the target sentence using the virtual keyboard. Watch for predictions after pressing space</p>
          </div>
        </div>

        {/* Step 4 */}
        <div className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="flex-shrink-0 w-8 h-8 bg-[#36CFB3] text-white rounded-full flex items-center justify-center">
            <CheckCircle className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-800 text-sm mb-1">Complete & Submit</h4>
            <p className="text-xs text-gray-600">Finish typing the sentence, then click "End Testing" to save your data</p>
          </div>
        </div>

        {/* Step 5 */}
        <div className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="flex-shrink-0 w-8 h-8 bg-[#ED9390] text-white rounded-full flex items-center justify-center">
            <Download className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-800 text-sm mb-1">Export Results</h4>
            <p className="text-xs text-gray-600">Use "Export Data" to download your testing results as a CSV file</p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-100">
        <h4 className="font-medium text-blue-800 text-sm mb-2">💡 Pro Tips</h4>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>• You can use predictions or type manually</li>
          <li>• Try different button styles and positions</li>
          <li>• Each test session is tracked separately</li>
          <li>• Use the speech button to hear your text</li>
        </ul>
      </div>
    </div>
  );
}