import { ButtonStyle, ButtonPosition } from "@/lib/styleUtils";
import { TestingProvider } from "./testing/TestingProvider";
import TestingControls from "./testing/TestingControls";
import SuggestionProvider from "./suggestions/SuggestionProvider";
import TypingInterface from "./typing/TypingInterface";
import VirtualKeyboard from "./keyboard/VirtualKeyboard";

// Import the CSS files to ensure styles are loaded
import "../styles/button-styles.css";
import "../styles/position-styles.css";

interface TypingTestAppProps {
  buttonStyle: ButtonStyle;
  buttonPosition: ButtonPosition;
}

export default function TypingTestApp({ buttonStyle, buttonPosition }: TypingTestAppProps) {
  return (
    <div className="flex flex-col min-h-screen bg-[#f9f9f9] overflow-hidden">
      <TestingProvider>
        <SuggestionProvider buttonStyle={buttonStyle} buttonPosition={buttonPosition}>
          <TestingControls />
          <TypingInterface />
          <VirtualKeyboard />
        </SuggestionProvider>
      </TestingProvider>
    </div>
  );
}