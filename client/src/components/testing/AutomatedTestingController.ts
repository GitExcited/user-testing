import { ButtonStyle, ButtonPosition } from "@/lib/styleUtils";
import { PREDICTION_SCENARIOS } from "@/data/predictionScenarios";

export interface TestCombination {
  id: string;
  buttonStyle: ButtonStyle;
  buttonPosition: ButtonPosition;
  scenario: typeof PREDICTION_SCENARIOS[0];
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
    const buttonPositions: ButtonPosition[] = ['above-textbox', 'below-textbox', 'right-textbox'];
    
    // Create all 12 combinations (4 styles × 3 positions)
    const allCombinations: Omit<TestCombination, 'id' | 'scenario' | 'completed'>[] = [];
    
    buttonStyles.forEach(style => {
      buttonPositions.forEach(position => {
        allCombinations.push({
          buttonStyle: style,
          buttonPosition: position
        });
      });
    });

    // Shuffle combinations randomly
    const shuffledCombinations = this.shuffleArray(allCombinations);
    
    // Shuffle scenarios randomly
    const shuffledScenarios = this.shuffleArray([...PREDICTION_SCENARIOS]);

    // Pair each combination with a random scenario
    this.combinations = shuffledCombinations.map((combo, index) => ({
      id: `test-${index + 1}`,
      ...combo,
      scenario: shuffledScenarios[index % shuffledScenarios.length],
      completed: false
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
    this.generateRandomizedCombinations();
  }

  getAllCombinations(): TestCombination[] {
    return [...this.combinations];
  }
}