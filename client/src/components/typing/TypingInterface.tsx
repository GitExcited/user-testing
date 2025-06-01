import React, { useState } from "react";
import { Volume2 } from "lucide-react";
import { useSuggestions } from "../suggestions/SuggestionProvider";
import CustomTextInput from "./CustomTextInput";

export default function TypingInterface() {
  const { suggestions, handleSuggestionClick, buttonStyle, buttonPosition } = useSuggestions();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentlySpeaking, setCurrentlySpeaking] = useState("");

  const suggestionElements = (
    <div className="suggestions">
      <div className={`suggestion-buttons ${buttonStyle}-buttons`}>
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
      {buttonPosition === "above-textbox" && (
        <div className="flex flex-col h-full">
          <div className="flex justify-center mt-4">
            {suggestionElements}
          </div>
          
          <div className="mt-4 flex-grow flex justify-center items-center">
            <div className="w-[500px]">
              <CustomTextInput />
            </div>
          </div>
        </div>
      )}
      
      {buttonPosition === "below-textbox" && (
        <div className="flex flex-col h-full">
          <div className="flex justify-center items-center flex-grow">
            <div className="w-[500px]">
              <CustomTextInput />
            </div>
          </div>
          
          <div className="flex justify-center mt-4 mb-10">
            {suggestionElements}
          </div>
        </div>
      )}
      
      {buttonPosition === "right-textbox" && (
        <div className="flex flex-col h-full">
          <div className="flex justify-center mt-4">
            <div className="flex items-start gap-8 w-full max-w-4xl">
              {/* Text Input Container */}
              <div className="w-[500px] flex-shrink-0">
                <CustomTextInput />
              </div>
              
              {/* Vertical Suggestion Buttons */}
              <div className="flex flex-col gap-3 pt-2 min-w-[180px]">
                <div className={`${buttonStyle}-buttons vertical-stack`}>
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={`${suggestion}-${index}`}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="suggestion-button vertical-button"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}