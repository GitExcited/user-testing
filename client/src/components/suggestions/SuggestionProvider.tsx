import React, { createContext, useContext, useState, useEffect } from "react";
import { ButtonStyle } from "@/lib/styleUtils";
import { PredictionEngine } from "./PredictionEngine";
import { useTesting } from "../testing/TestingProvider";

interface SuggestionContextType {
  suggestions: string[];
  userInput: string;
  setUserInput: (input: string) => void;
  handleSuggestionClick: (suggestion: string) => void;
  buttonStyle: ButtonStyle; // Use ButtonStyle type
  predictionEnabled: boolean; // New: Indicates if prediction is enabled
}

const SuggestionContext = createContext<SuggestionContextType | null>(null);

interface SuggestionProviderProps {
  children: React.ReactNode;
}

export default function SuggestionProvider({ children }: SuggestionProviderProps) {
  const [userInput, setUserInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [predictionEngine] = useState(new PredictionEngine());
  const { trackClick, trackSuggestion, isTestingActive, currentTest } = useTesting();

  // Get buttonStyle and predictionEnabled from currentTest
  const buttonStyle = currentTest?.buttonStyle || 'style1'; // Default if no currentTest
  const predictionEnabled = currentTest?.predictionEnabled || false; // Default to false

  useEffect(() => {
    if (currentTest) {
      predictionEngine.setScenario(currentTest.scenario);
      setUserInput(""); // Reset input for new test
      updateSuggestions("");
    }
  }, [currentTest]);

  useEffect(() => {
    updateSuggestions(userInput);
  }, [userInput, isTestingActive, predictionEnabled]); // Add predictionEnabled to dependencies

  const updateSuggestions = (input: string) => {
    console.log('updateSuggestions called with:', `"${input}"`, 'isTestingActive:', isTestingActive, 'predictionEnabled:', predictionEnabled);
    
    if (!isTestingActive || !currentTest || !predictionEnabled) {
      console.log('Testing not active, no current test, or prediction disabled, clearing suggestions');
      setSuggestions([]);
      return;
    }
    
    // EDGE CASE: Don't show predictions when the last word is already completed
    const targetWords = currentTest?.scenario?.words || [];
    const currentWords = input.trim().split(/\s+/).filter(word => word.length > 0);
    
    // Check if user has completed typing the last word exactly
    if (currentWords.length === targetWords.length && 
        currentWords[currentWords.length - 1] === targetWords[targetWords.length - 1]) {
      console.log('🚫 Last word is completed - hiding predictions to indicate sentence completion');
      setSuggestions([]);
      return;
    }
    
    const newSuggestions = predictionEngine.getPredictions(input);
    console.log('Setting suggestions to:', newSuggestions);
    setSuggestions(newSuggestions);
  };

  const handleSuggestionClick = (suggestion: string) => {
    // Check if this suggestion is the correct one before making changes
    const isCorrect = predictionEngine.isCorrectSuggestion(suggestion, userInput);
    
    // Track the click with additional context about correctness
    trackClick('suggestion', suggestion);
    trackSuggestion();
    
    // Log for debugging
    console.log('Suggestion clicked:', suggestion, 'Is correct:', isCorrect);
    
    // Check if this is the last word in the target sentence
    const targetWords = currentTest?.scenario?.words || [];
    const currentWords = userInput.trim().split(/\s+/).filter(word => word.length > 0);
    
    let isLastWord = false;
    if (userInput.endsWith(' ')) {
      // User just finished a word - check if the suggestion would be the last word
      isLastWord = currentWords.length === targetWords.length - 1;
    } else {
      // User is typing a word - check if this is the last word position
      isLastWord = currentWords.length === targetWords.length;
    }
    
    console.log('Is last word:', isLastWord, 'Current words:', currentWords.length, 'Target words:', targetWords.length);
    
    // Smart word replacement logic
    const words = userInput.trim().split(/\s+/).filter(word => word.length > 0);
    
    if (userInput.endsWith(' ')) {
      // User just finished a word - add the suggestion as the next word
      let finalSuggestion = suggestion;
      
      // Capitalize first letter if this is the very first word
      if (userInput.trim().length === 0) {
        finalSuggestion = suggestion.charAt(0).toUpperCase() + suggestion.slice(1);
        console.log('Auto-capitalizing first suggestion:', suggestion, '→', finalSuggestion);
      }
      
      if (isLastWord) {
        setUserInput(userInput + finalSuggestion); // No space for last word
      } else {
        setUserInput(userInput + finalSuggestion + ' '); // Space for non-last words
      }
    } else {
      // User is typing a word - replace the current incomplete word with the suggestion
      if (words.length > 0) {
        // Remove the last incomplete word and replace with suggestion
        let finalSuggestion = suggestion;
        
        // Capitalize first letter if this is the very first word
        if (words.length === 1 && userInput.trim().split(/\s+/).length === 1) {
          finalSuggestion = suggestion.charAt(0).toUpperCase() + suggestion.slice(1);
          console.log('Auto-capitalizing first suggestion:', suggestion, '→', finalSuggestion);
        }
        
        words[words.length - 1] = finalSuggestion;
        if (isLastWord) {
          setUserInput(words.join(' ')); // No space for last word
        } else {
          setUserInput(words.join(' ') + ' '); // Space for non-last words
        }
      } else {
        // No words yet, just add the suggestion - always capitalize first word
        let finalSuggestion = suggestion.charAt(0).toUpperCase() + suggestion.slice(1);
        console.log('Auto-capitalizing first suggestion:', suggestion, '→', finalSuggestion);
        
        if (isLastWord) {
          setUserInput(finalSuggestion); // No space for last word
        } else {
          setUserInput(finalSuggestion + ' '); // Space for non-last words
        }
      }
    }
  };

  const handleSetUserInput = (input: string) => {
    // Auto-capitalize the first letter of the first word
    if (input.length > 0 && userInput.length === 0) {
      // This is the first character being typed
      const capitalizedInput = input.charAt(0).toUpperCase() + input.slice(1);
      console.log('Auto-capitalizing first letter:', input, '→', capitalizedInput);
      setUserInput(capitalizedInput);
    } else {
      setUserInput(input);
    }
  };

  return (
    <SuggestionContext.Provider value={{
      suggestions,
      userInput,
      setUserInput: handleSetUserInput,
      handleSuggestionClick,
      buttonStyle,
      predictionEnabled
    }}>
      {children}
    </SuggestionContext.Provider>
  );
}

export const useSuggestions = () => {
  const context = useContext(SuggestionContext);
  if (!context) throw new Error('useSuggestions must be used within SuggestionProvider');
  return context;
};