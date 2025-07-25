import React, { useState } from "react";
import { Volume2 } from "lucide-react";
import { useSuggestions } from "../suggestions/SuggestionProvider";
import { useTesting } from "../testing/TestingProvider";
import CustomTextInput from "./CustomTextInput";
import "../../styles/SuggestionStyles.css";

export default function TypingInterface() {
  const { suggestions, handleSuggestionClick, predictionEnabled } = useSuggestions();
  const { isAutomatedTesting } = useTesting();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentlySpeaking, setCurrentlySpeaking] = useState("");

  const suggestionElements = (
    <div className="suggestion-buttons">
      {suggestions.map((suggestion, index) => (
        <button
          key={`${suggestion}-${index}`}
          onClick={() => handleSuggestionClick(suggestion)}
          className="suggestion-button"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );

  const speechBanner = (
    <div className={`speech-banner ${isSpeaking ? 'visible' : ''}`}>
      <div className="flex items-center">
        <Volume2 className="h-5 w-5 mr-2 waveform-animation text-white" />
        <span className="text-sm">Speaking: "{currentlySpeaking}"</span>
      </div>
    </div>
  );

  return (
    <>
      {speechBanner}
      <div className="flex flex-col h-full">
        <div className="flex justify-center items-center flex-grow">
          <div className="w-[500px]">
            {isAutomatedTesting && <CustomTextInput />}
          </div>
        </div>

        <div className="flex justify-center mt-4 min-h-[48px]">
          {predictionEnabled ? suggestionElements : null}
        </div>
      </div>
    </>
  );
}
