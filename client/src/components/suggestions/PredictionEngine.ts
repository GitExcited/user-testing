import { PredictionScenario } from "@/data/predictionScenarios";

const PREDICTION_ACCURACY = 0.7;

export class PredictionEngine {
  private currentScenario: PredictionScenario | null = null;

  setScenario(scenario: PredictionScenario) {
    this.currentScenario = scenario;
  }

  private normalizeString(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  
  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  private getUniqueSuggestions(suggestions: string[]): string[] {
    const seen = new Set<string>();
    return suggestions.filter(suggestion => {
      const lowercased = suggestion.toLowerCase();
      if (seen.has(lowercased)) {
        return false;
      }
      seen.add(lowercased);
      return true;
    });
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
    if (!this.currentScenario?.wordCompletions) {
      console.log('No wordCompletions available in scenario');
      return [];
    }

    if (nextWordIndex >= this.currentScenario.words.length) {
      console.log('Reached end of target sentence');
      return [];
    }

    if (
      nextWordIndex >= this.currentScenario.wordCompletions.length ||
      !this.currentScenario.wordCompletions[nextWordIndex]?.[0]?.[0]
    ) {
      console.log('No word completions available for word index:', nextWordIndex);
      return [];
    }

    const correctNextWord = this.currentScenario.words[nextWordIndex];
    let initialSuggestions = this.currentScenario.wordCompletions[nextWordIndex][0][0];

    const isCorrectTrial = Math.random() <= PREDICTION_ACCURACY;
    let suggestions;

    if (isCorrectTrial) {
      console.log(`✅ Correct trial for "${correctNextWord}"`);
      suggestions = [...initialSuggestions];
      if (!suggestions.some(s => s.toLowerCase() === correctNextWord.toLowerCase())) {
        suggestions[suggestions.length - 1] = correctNextWord;
      }
    } else {
      console.log(`❌ Incorrect trial for "${correctNextWord}"`);
      suggestions = initialSuggestions.filter(word => word.toLowerCase() !== correctNextWord.toLowerCase());
    }

    let uniqueSuggestions = this.getUniqueSuggestions(suggestions);

    // Pad with distractors if we don't have enough unique suggestions
    if (uniqueSuggestions.length < 3) {
      const allWords = [...new Set(this.currentScenario.wordCompletions.flat(3))];
      const existingLowercased = uniqueSuggestions.map(s => s.toLowerCase());
      existingLowercased.push(correctNextWord.toLowerCase());

      let distractorPool = allWords.filter(word => !existingLowercased.includes(word.toLowerCase()));

      while (uniqueSuggestions.length < 3 && distractorPool.length > 0) {
        const randomIndex = Math.floor(Math.random() * distractorPool.length);
        const newWord = distractorPool.splice(randomIndex, 1)[0];
        uniqueSuggestions.push(newWord);
      }
    }

    const finalSuggestions = this.shuffleArray(uniqueSuggestions).slice(0, 3);
    console.log('Final word-level predictions:', finalSuggestions);
    return finalSuggestions;
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
    
    // Get completions for this character position
    const completionsArray = wordCompletionsForWord[characterIndex];
    if (!completionsArray || completionsArray.length === 0) {
      console.log('No completions array available for character index:', characterIndex);
      return [];
    }
    let completions = completionsArray[0];
    console.log('Raw completions for position:', completions);
    
    if (!Array.isArray(completions)) {
      console.log('Completions is not an array:', completions);
      return [];
    }
    
    // Filter completions to only show those that start with what the user has typed
    const normalizedCurrentWord = this.normalizeString(currentWord.toLowerCase());
    const filteredCompletions = completions.filter(completion => 
      this.normalizeString(completion.toLowerCase()).startsWith(normalizedCurrentWord)
    );
    
    console.log('Filtered completions:', filteredCompletions);
    
    const uniqueCompletions = this.getUniqueSuggestions(filteredCompletions);

    console.log('Final character-level completions:', uniqueCompletions);
    
    return uniqueCompletions;
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
}
