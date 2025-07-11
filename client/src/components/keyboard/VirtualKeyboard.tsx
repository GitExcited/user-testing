import { Delete, Send } from "lucide-react";
import { useSuggestions } from "../suggestions/SuggestionProvider";
import { useTesting } from "../testing/TestingProvider";

export default function VirtualKeyboard() {
  const { userInput, setUserInput } = useSuggestions();
  const { trackClick, submitCurrentTest, isTestingActive } = useTesting();

  const handleKeyPress = (key: string) => {
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
    } else if (key === 'BACKSPACE') {
      const newInput = userInput.slice(0, -1);
      console.log('Backspace, new input:', `"${newInput}"`);
      setUserInput(newInput);
    } else {
      const newInput = userInput + key.toLowerCase();
      console.log('Adding letter, new input:', `"${newInput}"`);
      setUserInput(newInput);
    }
  };
  
  return (
    <div className="virtual-keyboard mx-4 bg-white rounded-lg shadow-lg w-full p-6">
      {/* First row - QWERTY */}
      <div className="flex gap-2 mb-3 justify-center">
        {['q','w','e','r','t','y','u','i','o','p'].map(key => (
          <button 
            key={key}
            onClick={() => handleKeyPress(key)} 
            className="bg-gray-50 rounded-md h-14 flex-1 max-w-20 flex items-center justify-center text-gray-700 font-medium shadow-sm hover:bg-gray-100 active:bg-gray-200 transition-colors text-lg"
          >
            {key.toUpperCase()}
          </button>
        ))}
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
        {['a','s','d','f','g','h','j','k','l'].map(key => (
          <button 
            key={key}
            onClick={() => handleKeyPress(key)} 
            className="bg-gray-50 rounded-md h-14 flex-1 max-w-20 flex items-center justify-center text-gray-700 font-medium shadow-sm hover:bg-gray-100 active:bg-gray-200 transition-colors text-lg"
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
            className="bg-gray-50 rounded-md h-14 flex-1 max-w-20 flex items-center justify-center text-gray-700 font-medium shadow-sm hover:bg-gray-100 active:bg-gray-200 transition-colors text-lg"
          >
            {key.toUpperCase()}
          </button>
        ))}
        {isTestingActive && (
          <button
            onClick={submitCurrentTest}
            className="flex items-center gap-2 bg-[#ED9390] text-white px-4 py-2 rounded-lg hover:bg-[#e8807c] transition-colors font-medium h-14 flex-1 max-w-40"
          >
            <Send className="h-4 w-4" />
            Continuer
          </button>
        )}
        <div className="w-16"></div> {/* Spacer for balance */}
      </div>

      {/* Bottom row - Space bar */}
      <div className="flex justify-center px-8">
        <button 
          onClick={() => handleKeyPress('SPACE')} 
          className="bg-gray-50 rounded-md h-14 w-full max-w-2xl flex items-center justify-center text-gray-700 font-medium shadow-sm hover:bg-gray-100 active:bg-gray-200 transition-colors text-lg"
        >
          SPACE
        </button>
      </div>
    </div>
  );
}