import { useState, useEffect } from "react";
import { Volume2 } from "lucide-react";
import { useSuggestions } from "../suggestions/SuggestionProvider";
import { useTesting } from "../testing/TestingProvider";
import { useToast } from "@/hooks/use-toast";

export default function CustomTextInput() {
  const { userInput } = useSuggestions();
  const { testingData, currentTest } = useTesting();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentlySpeaking, setCurrentlySpeaking] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const { toast } = useToast();

  // Function to normalize text for comparison (removing accents, case-insensitive)
  const normalizeText = (text: string) => {
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  // Function to detect typos and find the correct prefix
  const getTypoInfo = (input: string) => {
    if (!currentTest?.scenario?.targetSentence) {
      return { hasTypo: false, correctPrefix: input, incorrectSuffix: "" };
    }
    
    const normalizedInput = normalizeText(input);
    const normalizedTarget = normalizeText(currentTest.scenario.targetSentence);
    
    if (normalizedInput.length === 0) {
      return { hasTypo: false, correctPrefix: input, incorrectSuffix: "" };
    }
    
    // Find the longest matching prefix
    let matchLength = 0;
    for (let i = 0; i < Math.min(normalizedInput.length, normalizedTarget.length); i++) {
      if (normalizedInput[i] === normalizedTarget[i]) {
        matchLength = i + 1;
      } else {
        break;
      }
    }
    
    const hasTypo = matchLength < normalizedInput.length;
    const correctPrefix = input.substring(0, matchLength);
    const incorrectSuffix = input.substring(matchLength);
    
    return { hasTypo, correctPrefix, incorrectSuffix };
  };

  // Update final text in testing data when user input changes
  useEffect(() => {
    if (testingData) {
      testingData.finalText = userInput.trim();
    }
  }, [userInput, testingData]);

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530); // Standard cursor blink rate

    return () => clearInterval(interval);
  }, []);

  // Reset cursor visibility when typing
  useEffect(() => {
    setShowCursor(true);
  }, [userInput]);

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
        description: "Use the keyboard below to type your message.",
        duration: 3000,
      });
    }
  };

  // Prevent any focus or interaction with the display area
  const handleInteraction = (e: React.MouseEvent | React.TouchEvent | React.FocusEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const typoInfo = getTypoInfo(userInput);

  return (
    <div className="custom-text-input">
      <div className="relative">
        <div
          className={`w-full min-h-[120px] border rounded-lg px-4 py-3 bg-white shadow-sm resize-none text-base leading-relaxed transition-all duration-300 ${
            typoInfo.hasTypo 
              ? 'border-red-300 bg-red-50' 
              : 'border-gray-300'
          }`}
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
            WebkitTouchCallout: 'none',
            WebkitTapHighlightColor: 'transparent',
            pointerEvents: 'none',
          }}
          onMouseDown={handleInteraction}
          onTouchStart={handleInteraction}
          onFocus={handleInteraction}
          tabIndex={-1}
        >
          <div className="flex items-start min-h-[24px]">
            <span className="whitespace-pre-wrap break-words">
              {userInput ? (
                <>
                  <span className="text-gray-800">
                    {typoInfo.correctPrefix}
                  </span>
                  {typoInfo.incorrectSuffix && (
                    <span className="bg-red-200 text-red-800 underline decoration-red-500 decoration-wavy">
                      {typoInfo.incorrectSuffix}
                    </span>
                  )}
                </>
              ) : (
                <span className="text-gray-400 italic">
                  Utilisez le clavier pour écrire votre message...
                </span>
              )}
            </span>
            
            {userInput && (
              <span
                className={`inline-block w-0.5 h-6 ml-0.5 transition-opacity duration-100 ${
                  showCursor ? 'opacity-100' : 'opacity-0'
                } ${typoInfo.hasTypo ? 'bg-red-500' : 'bg-[#36CFB3]'}`}
                style={{
                  animation: 'cursor-blink 1.06s infinite',
                }}
              />
            )}
          </div>
        </div>
        {/*
        <button
          onClick={handleSpeak}
          className="absolute bottom-3 right-3 bg-[#ED9390] text-white rounded-full w-10 h-10 p-0 flex items-center justify-center focus:outline-none hover:bg-opacity-90 transition-all duration-200 pointer-events-auto"
          title="Click to have text spoken (Text-to-Speech)"
        >
          <Volume2 className={`h-5 w-5 ${isSpeaking ? 'waveform-animation' : ''}`} />
        </button>
        */}
      </div>
      
    </div>
  );
}