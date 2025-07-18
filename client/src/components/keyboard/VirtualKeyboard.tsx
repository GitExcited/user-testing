import { Delete, Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useSuggestions } from "../suggestions/SuggestionProvider";
import { useTesting } from "../testing/TestingProvider";

export default function VirtualKeyboard() {
  const { userInput, setUserInput } = useSuggestions();
  const { trackClick, submitCurrentTest, isTestingActive, isSubmitting, currentTest } = useTesting();
  const [showAccent, setShowAccent] = useState(false);
  const [isTypoDetected, setIsTypoDetected] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const pressTimer = useRef<NodeJS.Timeout | null>(null);
  const flashTimer = useRef<NodeJS.Timeout | null>(null);

  // Function to normalize text for comparison (removing accents, case-insensitive)
  const normalizeText = (text: string) => {
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  // Function to detect typos by comparing user input with target sentence
  const detectTypo = (input: string) => {
    if (!currentTest?.scenario?.targetSentence) {
      return false;
    }
    
    const normalizedInput = normalizeText(input);
    const normalizedTarget = normalizeText(currentTest.scenario.targetSentence);
    
    // Check if the input matches the beginning of the target sentence
    if (normalizedInput.length === 0) {
      return false; // No typo if input is empty
    }
    
    // Check if the current input is a valid prefix of the target
    const isValidPrefix = normalizedTarget.startsWith(normalizedInput);
    
    console.log('Typo detection:', {
      input: normalizedInput,
      target: normalizedTarget,
      isValidPrefix,
      typoDetected: !isValidPrefix
    });
    
    return !isValidPrefix;
  };

  // Function to trigger the red flash effect
  const triggerFlash = () => {
    setShowFlash(true);
    if (flashTimer.current) {
      clearTimeout(flashTimer.current);
    }
    flashTimer.current = setTimeout(() => {
      setShowFlash(false);
    }, 300); // Flash for 300ms
  };

  // Check for typos whenever user input changes
  useEffect(() => {
    const typoDetected = detectTypo(userInput);
    setIsTypoDetected(typoDetected);
    
    if (typoDetected) {
      triggerFlash();
    }
  }, [userInput, currentTest]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (pressTimer.current) {
        clearTimeout(pressTimer.current);
      }
      if (flashTimer.current) {
        clearTimeout(flashTimer.current);
      }
    };
  }, []);

  const handlePressStart = (key: string) => {
    if (key === 'e') {
      pressTimer.current = setTimeout(() => {
        setShowAccent(true);
      }, 500); // 500ms for a long press
    }
  };

  const handlePressEnd = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
  };

  const handleAccentPress = (accentedKey: string) => {
    // Block accent input if typo is detected (except backspace)
    if (isTypoDetected) {
      triggerFlash();
      return;
    }
    
    trackClick('keyboard', accentedKey);
    const newInput = userInput + accentedKey;
    setUserInput(newInput);
    setShowAccent(false);
  };

  const handleKeyPress = (key: string) => {
    if (showAccent) {
        setShowAccent(false);
        return;
    }
    
    // Allow backspace even when typo is detected
    if (key === 'BACKSPACE') {
      trackClick('keyboard', key);
      const newInput = userInput.slice(0, -1);
      console.log('Backspace, new input:', `"${newInput}"`);
      setUserInput(newInput);
      return;
    }
    
    // Block all other input if typo is detected
    if (isTypoDetected) {
      triggerFlash();
      return;
    }
    
    trackClick('keyboard', key);
    
    console.log('Key pressed:', key, 'Current input:', `"${userInput}"`);
    
    if (key === 'SPACE') {
      // Only add space if the input doesn't already end with space
      if (!userInput.endsWith(' ') && userInput.trim().length > 0) {
        const newInput = userInput + ' ';
        console.log('Adding space, new input:', `"${newInput}"`);
        setUserInput(newInput);
      } else {
        console.log('Space not added - input already ends with space or is empty');
      }
    } else {
      const newInput = userInput + key.toLowerCase();
      console.log('Adding letter, new input:', `"${newInput}"`);
      setUserInput(newInput);
    }
  };

  // Function to get button classes - no red styling, only normal states
  const getButtonClasses = (baseClasses: string) => {
    return `${baseClasses} bg-gray-50 hover:bg-gray-100 active:bg-gray-200`;
  };
  
  return (
    <div className="virtual-keyboard mx-4 bg-white rounded-lg shadow-lg w-full p-6 transition-all duration-300">

      {/* First row - QWERTY */}
      <div className="flex gap-2 mb-3 justify-center">
        {['q','w','e','r','t','y','u','i','o','p'].map(key => {
  if (key === 'e') {
    return (
      <div key={key} className="relative flex-1 max-w-20">
        <button 
          onClick={() => handleKeyPress(key)} 
          className={getButtonClasses("rounded-md h-14 w-full flex items-center justify-center text-gray-700 font-medium shadow-sm transition-colors text-lg")}
          disabled={isTypoDetected}
        >
          {key.toUpperCase()}
        </button>
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-gray-50 border rounded-md shadow-sm p-1 z-0">
          <button
            onClick={() => handleAccentPress('é')}
            className="text-lg font-medium text-gray-700 hover:bg-gray-50 px-3 py-1 rounded-md"
            disabled={isTypoDetected}
          >
            é
          </button>
        </div>
      </div>
    )
  }

          return (
            <button 
              key={key}
              onClick={() => handleKeyPress(key)} 
              className={getButtonClasses("rounded-md h-14 flex-1 max-w-20 flex items-center justify-center text-gray-700 font-medium shadow-sm transition-colors text-lg")}
              disabled={isTypoDetected}
            >
              {key.toUpperCase()}
            </button>
          )
        })}
        <button 
          onClick={() => handleKeyPress('BACKSPACE')} 
          className="bg-gray-50 rounded-md h-14 w-32 flex items-center justify-center text-gray-700 font-medium shadow-sm hover:bg-gray-100 active:bg-gray-200 transition-colors ml-2"
          aria-label="Backspace"
        >
          <Delete className="h-6 w-6" />
        </button>
      </div>

      {/* Second row - ASDF */}
      <div className="flex gap-2 mb-3 justify-center">
        <div className="w-8"></div> {/* Spacer for offset */}
        {['a','s','d','f','g','h','j','k','l', "'"].map(key => (
          <button 
            key={key}
            onClick={() => handleKeyPress(key)} 
            className={getButtonClasses("rounded-md h-14 flex-1 max-w-20 flex items-center justify-center text-gray-700 font-medium shadow-sm transition-colors text-lg")}
            disabled={isTypoDetected}
          >
            {key.toUpperCase()}
          </button>
        ))}
        <div className="w-8"></div> {/* Spacer for balance */}
      </div>

      {/* Third row - ZXCV */}
      <div className="flex gap-2 mb-4 justify-center">
        <div className="w-16"></div> {/* Spacer for offset */}
        {['z','x','c','v','b','n','m'].map(key => (
          <button 
            key={key}
            onClick={() => handleKeyPress(key)} 
            className={getButtonClasses("rounded-md h-14 flex-1 max-w-20 flex items-center justify-center text-gray-700 font-medium shadow-sm transition-colors text-lg")}
            disabled={isTypoDetected}
          >
            {key.toUpperCase()}
          </button>
        ))}
      {isTestingActive && (
        <button
          onClick={submitCurrentTest}
          disabled={isSubmitting || isTypoDetected}
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium h-14 flex-1 max-w-40 ${
            isSubmitting || isTypoDetected 
              ? 'bg-gray-400 cursor-not-allowed text-gray-600' 
              : 'bg-[#ED9390] text-white hover:bg-[#e8807c]'
          }`}
        >
          <Send className="h-4 w-4" />
          <span className="leading-none">{isSubmitting ? 'Envoi...' : 'Envoyer'}</span>
        </button>
      )}
        <div className="w-16"></div> {/* Spacer for balance */}
      </div>

      {/* Bottom row - Space bar */}
      <div className="flex justify-center px-8">
        <button 
          onClick={() => handleKeyPress('SPACE')} 
          className={getButtonClasses("rounded-md h-14 w-full max-w-2xl flex items-center justify-center text-gray-700 font-medium shadow-sm transition-colors text-lg")}
          disabled={isTypoDetected}
        >
          ESPACE
        </button>
      </div>
    </div>
  );
}
