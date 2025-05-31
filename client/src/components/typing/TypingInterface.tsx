import { Volume2 } from "lucide-react";
import { useState } from "react";
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
            <div className="flex items-start gap-5 w-[750px]">
              <div className="w-[500px]">
                <CustomTextInput />
              </div>
              
              <div className="flex flex-col justify-center flex-shrink-0">
                <div className={`suggestion-buttons ${buttonStyle}-buttons`}>
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={`${suggestion}-${index}`}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="suggestion-button mb-4"
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