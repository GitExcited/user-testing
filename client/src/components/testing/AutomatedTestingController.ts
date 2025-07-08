import { ButtonStyle } from "@/lib/styleUtils";
import { PREDICTION_SCENARIOS, PredictionScenario } from "@/data/predictionScenarios";

export interface TestCombination {
  id: string;
  buttonStyle: ButtonStyle;
  predictionEnabled: boolean; // New: Indicates if prediction is enabled for this test
  scenario: PredictionScenario;
  completed: boolean;
}

export class AutomatedTestingController {
  private combinations: TestCombination[] = [];
  private currentTestIndex: number = 0;

  constructor() {
    this.generateRandomizedCombinations();
  }

  private generateRandomizedCombinations() {
    const buttonStyles: ButtonStyle[] = ['style1', 'style2', 'style3', 'style4'];
    const allCombinations: Omit<TestCombination, 'id' | 'scenario' | 'completed'>[] = [];

    // Create 6 combinations with prediction enabled
    for (let i = 0; i < 6; i++) {
      allCombinations.push({
        buttonStyle: buttonStyles[i % buttonStyles.length], // Cycle through styles
        predictionEnabled: true,
      });
    }

    // Create 6 combinations with prediction disabled
    for (let i = 0; i < 6; i++) {
      allCombinations.push({
        buttonStyle: buttonStyles[i % buttonStyles.length], // Cycle through styles
        predictionEnabled: false,
      });
    }

    // Shuffle combinations randomly
    const shuffledCombinations = this.shuffleArray(allCombinations);

    // Shuffle scenarios randomly and ensure we have enough for 12 tests
    const shuffledScenarios = this.shuffleArray([...PREDICTION_SCENARIOS]);
    if (shuffledScenarios.length < 12) {
      console.error("Not enough prediction scenarios for 12 tests!");
      // Duplicate scenarios if not enough, for testing purposes
      while (shuffledScenarios.length < 12) {
        shuffledScenarios.push(...this.shuffleArray([...PREDICTION_SCENARIOS]));
      }
    }

    // Pair each combination with a unique scenario
    this.combinations = shuffledCombinations.map((combo, index) => ({
      id: `test-${index + 1}`,
      ...combo,
      scenario: shuffledScenarios[index], // Assign unique scenario
      completed: false,
    }));

    console.log('🎯 Generated randomized test combinations:', this.combinations);
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  getCurrentTest(): TestCombination | null {
    if (this.currentTestIndex >= this.combinations.length) {
      return null; // All tests completed
    }
    return this.combinations[this.currentTestIndex];
  }

  markCurrentTestCompleted() {
    if (this.currentTestIndex < this.combinations.length) {
      this.combinations[this.currentTestIndex].completed = true;
      this.currentTestIndex++;
    }
  }

  getProgress(): { current: number; total: number; percentage: number } {
    const current = this.currentTestIndex;
    const total = this.combinations.length;
    const percentage = Math.round((current / total) * 100);

    return { current, total, percentage };
  }

  isAllTestsCompleted(): boolean {
    return this.currentTestIndex >= this.combinations.length;
  }

  reset() {
    this.currentTestIndex = 0;
    this.combinations.forEach(combo => combo.completed = false);
    this.generateRandomizedCombinations(); // Regenerate combinations on reset
  }

  getAllCombinations(): TestCombination[] {
    return [...this.combinations];
  }
}