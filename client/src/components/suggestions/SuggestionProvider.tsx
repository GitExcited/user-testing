import React, { createContext, useContext, useState, useEffect } from "react";
import { ButtonStyle, ButtonPosition } from "@/lib/styleUtils";
import { PredictionEngine } from "./PredictionEngine";
import { PREDICTION_SCENARIOS } from "@/data/predictionScenarios";
import { useTesting } from "../testing/TestingProvider";

interface SuggestionContextType {
  suggestions: string[];
  userInput: string;
  setUserInput: (input: string) => void;
  handleSuggestionClick: (suggestion: string) => void;
  currentScenario: number;
  setCurrentScenario: (index: number) => void;
  buttonStyle: string;
  buttonPosition: string;
}

const SuggestionContext = createContext<SuggestionContextType | null>(null);

interface SuggestionProviderProps {
  children: React.ReactNode;
  buttonStyle: ButtonStyle;
  buttonPosition: ButtonPosition;
}

export default function SuggestionProvider({ 
  children, 
  buttonStyle, 
  buttonPosition 
}: SuggestionProviderProps) {
  const [userInput, setUserInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [predictionEngine] = useState(new PredictionEngine());
  const [currentScenario, setCurrentScenario] = useState(0);
  const { trackClick, trackSuggestion, isTestingActive } = useTesting();

  useEffect(() => {
    predictionEngine.setScenario(PREDICTION_SCENARIOS[currentScenario]);
    updateSuggestions("");
  }, [currentScenario]);

  useEffect(() => {
    updateSuggestions(userInput);
  }, [userInput, isTestingActive]);

  const updateSuggestions = (input: string) => {
    console.log('updateSuggestions called with:', `"${input}"`, 'isTestingActive:', isTestingActive);
    
    if (!isTestingActive) {
      console.log('Testing not active, clearing suggestions');
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

  const handleScenarioChange = (index: number) => {
    setCurrentScenario(index);
    setUserInput("");
  };

  return (
    <SuggestionContext.Provider value={{
      suggestions,
      userInput,
      setUserInput: handleSetUserInput,
      handleSuggestionClick,
      currentScenario,
      setCurrentScenario: handleScenarioChange,
      buttonStyle,
      buttonPosition
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