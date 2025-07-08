import { TestingProvider } from "./testing/TestingProvider";
import AutomatedTestingControls from "./testing/AutomatedTestingControls";
import SuggestionProvider from "./suggestions/SuggestionProvider";
import TypingInterface from "./typing/TypingInterface";
import VirtualKeyboard from "./keyboard/VirtualKeyboard";



export default function TypingTestApp() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f9f9f9] overflow-hidden">
      <TestingProvider>
        <SuggestionProvider>
          <AutomatedTestingControls />
          <TypingInterface />
          <VirtualKeyboard />
        </SuggestionProvider>
      </TestingProvider>
    </div>
  );
}