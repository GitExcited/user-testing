import { Volume2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useSuggestions } from "../suggestions/SuggestionProvider";
import { useTesting } from "../testing/TestingProvider";
import { useToast } from "@/hooks/use-toast";

export default function TypingInterface() {
  const { suggestions, userInput, setUserInput, handleSuggestionClick, buttonStyle, buttonPosition } = useSuggestions();
  const { trackClick, testingData } = useTesting();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentlySpeaking, setCurrentlySpeaking] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  // Update final text in testing data when user input changes
  useEffect(() => {
    if (testingData) {
      testingData.finalText = userInput.trim();
    }
  }, [userInput, testingData]);

  // Auto-focus the textarea when component mounts
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      setIsFocused(true);
    }
  }, []);

  const handleSpeak = () => {
    if (userInput.trim()) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(userInput.trim());
        
        setIsSpeaking(true);
        setCurrentlySpeaking(userInput.trim());
        
        utterance.onend = () => {
          setIsSpeaking(false);
          setCurrentlySpeaking("");
        };
        
        utterance.onerror = () => {
          setIsSpeaking(false);
          setCurrentlySpeaking("");
        };
        
        window.speechSynthesis.speak(utterance);
      } else {
        toast({
          title: "Text-to-Speech",
          description: `"${userInput.trim()}" would be spoken in a real implementation.`,
          duration: 3000,
        });
      }
    } else {
      toast({
        title: "Text-to-Speech",
        description: "Type a message first or click a suggestion to have it spoken.",
        duration: 3000,
      });
    }
  };

  const handleInputChange = (value: string) => {
    // Track manual typing
    if (value.length > userInput.length) {
      const addedChar = value.slice(-1);
      trackClick('keyboard', addedChar);
    } else if (value.length < userInput.length) {
      trackClick('backspace', 'delete');
    }
    
    setUserInput(value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleSuggestionClickWithFocus = (suggestion: string) => {
    handleSuggestionClick(suggestion);
    // Refocus the textarea after clicking a suggestion
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        setIsFocused(true);
      }
    }, 0);
  };

  const inputContainer = (
    <div className="input-container">
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={userInput}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Type your message here or click a suggestion..."
          className={`w-full border-none rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#36CFB3] resize-none shadow-sm transition-all duration-200 ${
            isFocused ? 'ring-2 ring-[#36CFB3]' : ''
          }`}
          rows={3}
          style={{
            caretColor: '#36CFB3', // Custom cursor color
          }}
        />
        <button
          onClick={handleSpeak}
          className="absolute bottom-3 right-3 bg-[#ED9390] text-white rounded-full w-10 h-10 p-0 flex items-center justify-center focus:outline-none hover:bg-opacity-90 transition-all duration-200"
          title="Click to have text spoken (Text-to-Speech)"
        >
          <Volume2 className={`h-5 w-5 ${isSpeaking ? 'waveform-animation' : ''}`} />
        </button>
      </div>
    </div>
  );

  const suggestionElements = (
    <div className="suggestions">
      <div className={`suggestion-buttons ${buttonStyle}-buttons`}>
        {suggestions.map((suggestion, index) => (
          <button
            key={`${suggestion}-${index}`}
            onClick={() => handleSuggestionClickWithFocus(suggestion)}
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
              {inputContainer}
            </div>
          </div>
        </div>
      )}
      
      {buttonPosition === "below-textbox" && (
        <div className="flex flex-col h-full">
          <div className="flex justify-center items-center flex-grow">
            <div className="w-[500px]">
              {inputContainer}
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
                {inputContainer}
              </div>
              
              <div className="flex flex-col justify-center flex-shrink-0">
                <div className={`suggestion-buttons ${buttonStyle}-buttons`}>
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={`${suggestion}-${index}`}
                      onClick={() => handleSuggestionClickWithFocus(suggestion)}
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