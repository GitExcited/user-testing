import { PredictionScenario, PREDICTION_SCENARIOS } from "@/data/predictionScenarios";

export class PredictionEngine {
  private currentScenario: PredictionScenario | null = null;
  private shuffleCache: Map<string, string[]> = new Map();
  private trickWordDecisions: Map<number, boolean> = new Map(); // Cache 50% decisions per word

  setScenario(scenario: PredictionScenario) {
    this.currentScenario = scenario;
    this.shuffleCache.clear();
    this.trickWordDecisions.clear(); // Reset trick decisions for new scenario
  }
  
  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  private shouldUseTrickWord(wordIndex: number): boolean {
    // FIXED: Apply to ANY word that has a trick word available (not just index 1)
    if (!this.currentScenario?.trickWords) return false;
    if (wordIndex >= this.currentScenario.trickWords.length) return false;
    if (this.currentScenario.trickWords[wordIndex] === null) return false; // No trick for this position
    
    // Check if we've already made a decision for this word in this scenario
    if (this.trickWordDecisions.has(wordIndex)) {
      return this.trickWordDecisions.get(wordIndex)!;
    }
    
    // Make a 50% decision and cache it
    const useTrick = Math.random() < 0.5;
    this.trickWordDecisions.set(wordIndex, useTrick);
    
    console.log(`Trick word decision for word ${wordIndex}: ${useTrick ? 'USE TRICK' : 'USE CORRECT'} (trick available: "${this.currentScenario.trickWords[wordIndex]}")`);
    
    return useTrick;
  }

  private getTrickWord(wordIndex: number): string | null {
    if (!this.currentScenario?.trickWords) return null;
    if (wordIndex >= this.currentScenario.trickWords.length) return null;
    return this.currentScenario.trickWords[wordIndex];
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
    let correctNextWord = this.currentScenario.words[nextWordIndex];
    
    // FIXED: Check if we should use a trick word instead (50% chance for ANY word that has a trick)
    if (this.shouldUseTrickWord(nextWordIndex)) {
      const trickWord = this.getTrickWord(nextWordIndex);
      if (trickWord) {
        correctNextWord = trickWord;
        console.log(`🎭 Using TRICK WORD "${trickWord}" instead of "${this.currentScenario.words[nextWordIndex]}" for position ${nextWordIndex}`);
      }
    } else {
      console.log(`✅ Using CORRECT WORD "${correctNextWord}" for position ${nextWordIndex}`);
    }
    
    console.log('Final word to include:', correctNextWord);
    
    // Get fake predictions for this position
    const fakePredictions = this.currentScenario.fakePredictions[nextWordIndex] || [];
    console.log('Fake predictions:', fakePredictions);
    
    // Combine correct/trick and fake predictions, then randomize the order
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
    let completions = wordCompletionsForWord[characterIndex];
    console.log('Raw completions for position:', completions);
    
    if (!Array.isArray(completions)) {
      console.log('Completions is not an array:', completions);
      return [];
    }
    
    // FIXED: For character-level completions, consider trick words for ANY position (not just index 1)
    if (this.shouldUseTrickWord(wordIndex)) {
      const trickWord = this.getTrickWord(wordIndex);
      if (trickWord && trickWord.toLowerCase().startsWith(currentWord.toLowerCase())) {
        // Add the trick word to the completions if it matches what user is typing
        completions = [...completions];
        if (!completions.includes(trickWord)) {
          completions.unshift(trickWord); // Add trick word at the beginning
        }
        console.log('🎭 Added trick word to character completions:', trickWord);
      }
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
      
      // FIXED: Check if we should return the trick word instead (for ANY position)
      if (this.shouldUseTrickWord(nextWordIndex)) {
        const trickWord = this.getTrickWord(nextWordIndex);
        if (trickWord) return trickWord;
      }
      
      return this.currentScenario.words[nextWordIndex];
    } else {
      // User is typing a word, get the target word they should be completing
      const currentWordIndex = inputWords.length - 1;
      if (currentWordIndex < 0 || currentWordIndex >= this.currentScenario.words.length) return null;
      
      // FIXED: Check if we should return the trick word instead (for ANY position)
      if (this.shouldUseTrickWord(currentWordIndex)) {
        const trickWord = this.getTrickWord(currentWordIndex);
        if (trickWord) return trickWord;
      }
      
      return this.currentScenario.words[currentWordIndex];
    }
  }
  
  isCorrectSuggestion(suggestion: string, currentInput: string): boolean {
    const correctWord = this.getNextCorrectWord(currentInput);
    return suggestion === correctWord;
  }
  
  clearCache() {
    this.shuffleCache.clear();
    this.trickWordDecisions.clear(); // Also clear trick decisions
  }

  // NEW: Method to get current trick word decisions (for debugging/analytics)
  getTrickWordDecisions(): Map<number, boolean> {
    return new Map(this.trickWordDecisions);
  }

  // NEW: Method to force a specific trick word decision (for testing)
  setTrickWordDecision(wordIndex: number, useTrick: boolean): void {
    this.trickWordDecisions.set(wordIndex, useTrick);
  }

  // NEW: Debug method to see what decisions were made
  logTrickWordDecisions(): void {
    console.log('🎭 Trick Word Decisions for current scenario:');
    this.trickWordDecisions.forEach((useTrick, wordIndex) => {
      const trickWord = this.getTrickWord(wordIndex);
      const correctWord = this.currentScenario?.words[wordIndex];
      console.log(`  Word ${wordIndex}: ${useTrick ? `TRICK "${trickWord}"` : `CORRECT "${correctWord}"`}`);
    });
  }
}

// DO NOT re-export - this was causing the circular dependency!