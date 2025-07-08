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
    
    // Smart word replacement logic
    const words = userInput.trim().split(/\s+/).filter(word => word.length > 0);
    
    if (userInput.endsWith(' ')) {
      // User just finished a word - add the suggestion as the next word
      setUserInput(userInput + suggestion + ' ');
    } else {
      // User is typing a word - replace the current incomplete word with the suggestion
      if (words.length > 0) {
        // Remove the last incomplete word and replace with suggestion
        words[words.length - 1] = suggestion;
        setUserInput(words.join(' ') + ' ');
      } else {
        // No words yet, just add the suggestion
        setUserInput(suggestion + ' ');
      }
    }
  };

  const handleSetUserInput = (input: string) => {
    setUserInput(input);
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