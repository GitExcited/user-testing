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
    this.generateCounterbalancedCombinations();
  }

  private generateCounterbalancedCombinations() {
    const buttonStyles: ButtonStyle[] = ['style1', 'style2', 'style3', 'style4'];
    const scenarios = this.shuffleArray([...PREDICTION_SCENARIOS]);

    if (scenarios.length < 12) {
      console.error("Not enough prediction scenarios for 12 tests!");
      while (scenarios.length < 12) {
        scenarios.push(...this.shuffleArray([...PREDICTION_SCENARIOS]));
      }
    }

    const combinations: TestCombination[] = [];
    for (let i = 0; i < 12; i++) {
      const predictionEnabled = i % 2 === 0; // Alternate between true and false
      combinations.push({
        id: `test-${i + 1}`,
        buttonStyle: buttonStyles[i % buttonStyles.length],
        predictionEnabled,
        scenario: scenarios[i],
        completed: false,
      });
    }

    this.combinations = combinations;
    console.log('🎯 Generated counterbalanced test combinations:', this.combinations);
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
    this.generateCounterbalancedCombinations(); // Regenerate combinations on reset
  }

  getAllCombinations(): TestCombination[] {
    return [...this.combinations];
  }
}