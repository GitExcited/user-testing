import { PredictionScenario, PREDICTION_SCENARIOS } from "@/data/predictionScenarios";

export class PredictionEngine {
  private currentScenario: PredictionScenario | null = null;
  
  setScenario(scenario: PredictionScenario) {
    this.currentScenario = scenario;
  }
  
  getPredictions(currentInput: string): string[] {
    if (!this.currentScenario) return [];
    
    // Debug logging
    console.log('getPredictions called with:', `"${currentInput}"`);
    
    // Clean and split the input into words
    const inputWords = currentInput.trim().split(/\s+/).filter(word => word.length > 0);
    console.log('Input words:', inputWords);
    
    // If no words typed yet, don't show predictions
    if (inputWords.length === 0) return [];
    
    // Determine if we should show predictions based on two scenarios:
    // 1. User just finished a word (input ends with space) - show predictions for NEXT word
    // 2. User is typing a word after finishing previous word - keep showing same predictions
    
    let nextWordIndex: number;
    
    if (currentInput.endsWith(' ')) {
      // User just finished a word, predict the NEXT word
      nextWordIndex = inputWords.length;
      console.log('Input ends with space - predicting next word at index:', nextWordIndex);
    } else {
      // User is typing a word, keep showing predictions for the word they're currently typing
      nextWordIndex = inputWords.length - 1;
      console.log('User is typing - showing predictions for current word at index:', nextWordIndex);
      
      // If they haven't finished at least one word yet, no predictions
      if (nextWordIndex < 0) return [];
    }
    
    console.log('Target words:', this.currentScenario.words);
    
    // If we've reached the end of the target sentence, no more predictions
    if (nextWordIndex >= this.currentScenario.words.length) {
      console.log('Reached end of target sentence');
      return [];
    }
    
    // Get the correct next word
    const correctNextWord = this.currentScenario.words[nextWordIndex];
    console.log('Correct next word:', correctNextWord);
    
    // Get fake predictions for this position
    const fakePredictions = this.currentScenario.fakePredictions[nextWordIndex] || [];
    console.log('Fake predictions:', fakePredictions);
    
    // Return the correct word first, followed by fake predictions
    const result = [correctNextWord, ...fakePredictions];
    console.log('Returning predictions:', result);
    return result;
  }
  
  getTargetSentence(): string {
    return this.currentScenario?.targetSentence || "";
  }
  
  getCurrentScenario(): PredictionScenario | null {
    return this.currentScenario;
  }
  
  getNextCorrectWord(currentInput: string): string | null {
    if (!this.currentScenario) return null;
    
    const inputWords = currentInput.trim().split(/\s+/).filter(word => word.length > 0);
    const nextWordIndex = inputWords.length;
    
    if (nextWordIndex >= this.currentScenario.words.length) return null;
    
    return this.currentScenario.words[nextWordIndex];
  }
}

// DO NOT re-export - this was causing the circular dependency!