import { PredictionScenario, PREDICTION_SCENARIOS } from "@/data/predictionScenarios";

export class PredictionEngine {
  private currentScenario: PredictionScenario | null = null;
  private shuffleCache: Map<string, string[]> = new Map();

  setScenario(scenario: PredictionScenario) {
    this.currentScenario = scenario;
    this.shuffleCache.clear();
  }
  
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
    
    console.log('getPredictions called with:', `"${currentInput}"`);
    
    // Clean and split the input into words
    const inputWords = currentInput.trim().split(/\s+/).filter(word => word.length > 0);
    console.log('Input words:', inputWords);
    
    // If no words typed yet, don't show predictions
    if (inputWords.length === 0) return [];
    
    // Determine what type of predictions to show
    if (currentInput.endsWith(' ')) {
      // User just finished a word - show word-level predictions for NEXT word
      return this.getWordLevelPredictions(inputWords.length);
    } else {
      // User is typing a word - show character-level completions
      const currentWordIndex = inputWords.length - 1;
      const currentWord = inputWords[currentWordIndex];
      return this.getCharacterLevelCompletions(currentWordIndex, currentWord);
    }
  }

  private getWordLevelPredictions(nextWordIndex: number): string[] {
    if (!this.currentScenario) return [];
    
    console.log('Getting word-level predictions for index:', nextWordIndex);
    
    // If we've reached the end of the target sentence, return empty or show last fake predictions
    if (nextWordIndex >= this.currentScenario.words.length) {
      console.log('Reached end of target sentence');
      // Optionally show the last set of fake predictions for testing
      if (this.currentScenario.fakePredictions.length > nextWordIndex - 1) {
        const lastPredictions = this.currentScenario.fakePredictions[nextWordIndex - 1] || [];
        return this.shuffleArray(lastPredictions);
      }
      return [];
    }
    
    // Check cache
    const cacheKey = `word-${nextWordIndex}`;
    if (this.shuffleCache.has(cacheKey)) {
      const cachedPredictions = this.shuffleCache.get(cacheKey)!;
      console.log('Using cached word predictions for index', nextWordIndex, ':', cachedPredictions);
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
    
    // Cache the shuffled predictions
    this.shuffleCache.set(cacheKey, randomizedPredictions);
    
    console.log('NEW shuffled word predictions for index', nextWordIndex, ':', randomizedPredictions);
    
    return randomizedPredictions;
  }

  private getCharacterLevelCompletions(wordIndex: number, currentWord: string): string[] {
    if (!this.currentScenario?.wordCompletions) {
      console.log('No wordCompletions available in scenario');
      return [];
    }
    
    console.log('Getting character-level completions for word index:', wordIndex, 'current word:', `"${currentWord}"`);
    
    // Check if we have completions for this word
    if (wordIndex >= this.currentScenario.wordCompletions.length) {
      console.log('No word completions available for word index:', wordIndex);
      return [];
    }
    
    const wordCompletionsForWord = this.currentScenario.wordCompletions[wordIndex];
    console.log('Word completions for word:', wordCompletionsForWord);
    
    // The character index is based on how many characters the user has typed (1-based to 0-based)
    const characterIndex = currentWord.length - 1;
    
    console.log('Character index:', characterIndex, 'Word completions length:', wordCompletionsForWord.length);
    
    // Check if we have completions for this character position
    if (characterIndex < 0 || characterIndex >= wordCompletionsForWord.length) {
      console.log('No completions available for character index:', characterIndex);
      return [];
    }
    
    // Check cache
    const cacheKey = `char-${wordIndex}-${characterIndex}`;
    if (this.shuffleCache.has(cacheKey)) {
      const cachedCompletions = this.shuffleCache.get(cacheKey)!;
      console.log('Using cached character completions:', cachedCompletions);
      return cachedCompletions;
    }
    
    // Get completions for this character position
    const completions = wordCompletionsForWord[characterIndex];
    console.log('Raw completions for position:', completions);
    
    if (!Array.isArray(completions)) {
      console.log('Completions is not an array:', completions);
      return [];
    }
    
    // Filter completions to only show those that start with what the user has typed
    const filteredCompletions = completions.filter(completion => 
      completion.toLowerCase().startsWith(currentWord.toLowerCase())
    );
    
    console.log('Filtered completions:', filteredCompletions);
    
    // Shuffle the filtered completions
    const shuffledCompletions = this.shuffleArray(filteredCompletions);
    
    // Cache the shuffled completions
    this.shuffleCache.set(cacheKey, shuffledCompletions);
    
    console.log('Final character-level completions:', shuffledCompletions);
    
    return shuffledCompletions;
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
    
    if (currentInput.endsWith(' ')) {
      // User finished a word, get next word
      const nextWordIndex = inputWords.length;
      if (nextWordIndex >= this.currentScenario.words.length) return null;
      return this.currentScenario.words[nextWordIndex];
    } else {
      // User is typing a word, get the target word they should be completing
      const currentWordIndex = inputWords.length - 1;
      if (currentWordIndex < 0 || currentWordIndex >= this.currentScenario.words.length) return null;
      return this.currentScenario.words[currentWordIndex];
    }
  }
  
  isCorrectSuggestion(suggestion: string, currentInput: string): boolean {
    const correctWord = this.getNextCorrectWord(currentInput);
    return suggestion === correctWord;
  }
  
  clearCache() {
    this.shuffleCache.clear();
  }
}

// DO NOT re-export - this was causing the circular dependency!