import { PredictionScenario, PREDICTION_SCENARIOS } from "@/data/predictionScenarios";

export class PredictionEngine {
  private currentScenario: PredictionScenario | null = null;
  private shuffleCache: Map<number, string[]> = new Map(); // Cache shuffled predictions by word index
  
  setScenario(scenario: PredictionScenario) {
    this.currentScenario = scenario;
    this.shuffleCache.clear(); // Clear cache when scenario changes
  }
  
  // Helper function to shuffle an array randomly
  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
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
    
    // Check if we already have shuffled predictions cached for this word index
    if (this.shuffleCache.has(nextWordIndex)) {
      const cachedPredictions = this.shuffleCache.get(nextWordIndex)!;
      console.log('Using cached shuffled predictions for index', nextWordIndex, ':', cachedPredictions);
      return cachedPredictions;
    }
    
    // Get the correct next word
    const correctNextWord = this.currentScenario.words[nextWordIndex];
    console.log('Correct next word:', correctNextWord);
    
    // Get fake predictions for this position
    const fakePredictions = this.currentScenario.fakePredictions[nextWordIndex] || [];
    console.log('Fake predictions:', fakePredictions);
    
    // Combine correct and fake predictions, then randomize the order
    const allPredictions = [correctNextWord, ...fakePredictions];
    const randomizedPredictions = this.shuffleArray(allPredictions);
    
    // Cache the shuffled predictions for this word index
    this.shuffleCache.set(nextWordIndex, randomizedPredictions);
    
    console.log('Original order:', [correctNextWord, ...fakePredictions]);
    console.log('NEW shuffled order for index', nextWordIndex, ':', randomizedPredictions);
    
    return randomizedPredictions;
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
  
  // Helper method to check if a clicked suggestion is the correct one
  isCorrectSuggestion(suggestion: string, currentInput: string): boolean {
    const correctWord = this.getNextCorrectWord(currentInput);
    return suggestion === correctWord;
  }
  
  // Method to clear cache (useful for testing)
  clearCache() {
    this.shuffleCache.clear();
  }
}

// DO NOT re-export - this was causing the circular dependency!