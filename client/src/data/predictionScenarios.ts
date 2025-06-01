export interface PredictionScenario {
  id: string;
  targetSentence: string;
  words: string[];
  fakePredictions: string[][];
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export const PREDICTION_SCENARIOS: PredictionScenario[] = [
  {
    id: "invite-ami-piscine",
    targetSentence: "Il invite un ami à la piscine",
    words: ["Il", "invite", "un", "ami", "à", "la", "piscine"],
    category: "Social",
    difficulty: "easy",
    fakePredictions: [
      // Predictions when user finishes typing "Il" (predicting "invite")
      ["mange", "va"],
      // Predictions when user finishes typing "invite" (predicting "un")
      ["son", "le"],
      // Predictions when user finishes typing "un" (predicting "ami")
      ["chien", "repas"],
      // Predictions when user finishes typing "ami" (predicting "à")
      ["dans", "chez"],
      // Predictions when user finishes typing "à" (predicting "la")
      ["le", "un"],
      // Predictions when user finishes typing "la" (predicting "piscine")
      ["maison", "école"],
      // After "piscine" - no more words but you can still show this for testing
      ["plage", "parc"]  // ← Added fake predictions for after last word
    ]
  },
  {
    id: "rejoint-chien-maison",
    targetSentence: "Elle rejoint le chien dans la maison",
    words: ["Elle", "rejoint", "le", "chien", "dans", "la", "maison"],
    category: "Social",
    difficulty: "medium",
    fakePredictions: [
      ["invite", "partage"],
      ["un", "son"],
      ["ami", "repas"],
      ["à", "chez"],
      ["le", "un"],
      ["piscine", "école"],
      ["cuisine", "jardin"]  
    ]
  },
  {
    id: "partage-repas-piscine",
    targetSentence: "Il partage son repas à la piscine",
    words: ["Il", "partage", "son", "repas", "à", "la", "piscine"],
    category: "Food",
    difficulty: "medium",
    fakePredictions: [
      ["rejoint", "invite"],
      ["le", "un"],
      ["ami", "chien"],
      ["dans", "chez"],
      ["un", "le"],
      ["maison", "table"],
      ["plage", "parc"]  // ← Added for last word
    ]
  },
  {
    id: "invite-chien-ami",
    targetSentence: "Elle invite le chien chez un ami",
    words: ["Elle", "invite", "le", "chien", "chez", "un", "ami"],
    category: "Social",
    difficulty: "hard",
    fakePredictions: [
      ["partage", "rejoint"],
      ["son", "un"],
      ["repas", "ami"],
      ["à", "dans"],
      ["le", "son"],
      ["chien", "repas"],
      ["voisin", "collègue"]  // ← Added for last word
    ]
  },
  {
    id: "rejoint-ami-maison",
    targetSentence: "Il rejoint un ami à la maison",
    words: ["Il", "rejoint", "un", "ami", "à", "la", "maison"],
    category: "Social",
    difficulty: "easy",
    fakePredictions: [
      ["invite", "partage"],
      ["le", "son"],
      ["repas", "chien"],
      ["chez", "dans"],
      ["le", "un"],
      ["piscine", "école"],
      ["cuisine", "garage"]  // ← Added for last word
    ]
  },
  {
    id: "partage-repas-chez-moi",
    targetSentence: "Elle partage un repas chez moi",
    words: ["Elle", "partage", "un", "repas", "chez", "moi"],
    category: "Food",
    difficulty: "easy",
    fakePredictions: [
      ["rejoint", "invite"],
      ["son", "le"],
      ["ami", "chien"],
      ["à", "dans"],
      ["lui", "nous"],
      ["toi", "elle"]  // ← Added for last word
    ]
  },
  {
    id: "invite-son-ami-piscine",
    targetSentence: "Il invite son ami à la piscine",
    words: ["Il", "invite", "son", "ami", "à", "la", "piscine"],
    category: "Social",
    difficulty: "medium",
    fakePredictions: [
      ["partage", "rejoint"],
      ["un", "le"],
      ["chien", "repas"],
      ["dans", "chez"],
      ["un", "le"],
      ["maison", "plage"],
      ["parc", "plage"]  // ← Added for last word
    ]
  },
  {
    id: "rejoint-chien-piscine",
    targetSentence: "Elle rejoint le chien à la piscine",
    words: ["Elle", "rejoint", "le", "chien", "à", "la", "piscine"],
    category: "Social",
    difficulty: "medium",
    fakePredictions: [
      ["invite", "partage"],
      ["son", "un"],
      ["ami", "repas"],
      ["chez", "dans"],
      ["le", "un"],
      ["maison", "école"],
      ["parc", "plage"]  // ← Added for last word
    ]
  },
  {
    id: "partage-repas-maison",
    targetSentence: "Il partage le repas dans la maison",
    words: ["Il", "partage", "le", "repas", "dans", "la", "maison"],
    category: "Food",
    difficulty: "hard",
    fakePredictions: [
      ["invite", "rejoint"],
      ["un", "son"],
      ["chien", "ami"],
      ["à", "chez"],
      ["le", "un"],
      ["piscine", "cuisine"],
      ["jardin", "garage"]  // ← Added for last word
    ]
  },
  {
    id: "invite-ami-chez-moi",
    targetSentence: "Elle invite un ami chez moi",
    words: ["Elle", "invite", "un", "ami", "chez", "moi"],
    category: "Social",
    difficulty: "easy",
    fakePredictions: [
      ["rejoint", "partage"],
      ["son", "le"],
      ["chien", "repas"],
      ["à", "dans"],
      ["lui", "elle"],
      ["toi", "nous"]  // ← Added for last word
    ]
  },
  {
    id: "rejoint-son-ami-piscine",
    targetSentence: "Il rejoint son ami à la piscine",
    words: ["Il", "rejoint", "son", "ami", "à", "la", "piscine"],
    category: "Social",
    difficulty: "medium",
    fakePredictions: [
      ["partage", "invite"],
      ["le", "un"],
      ["repas", "chien"],
      ["dans", "chez"],
      ["un", "le"],
      ["maison", "plage"],
      ["parc", "jardin"]  // ← Added for last word
    ]
  },
  {
    id: "partage-repas-evenement",
    targetSentence: "Elle partage un repas à l'événement",
    words: ["Elle", "partage", "un", "repas", "à", "l'événement"],
    category: "Food",
    difficulty: "hard",
    fakePredictions: [
      ["invite", "rejoint"],
      ["le", "son"],
      ["ami", "chien"],
      ["chez", "dans"],
      ["la", "le"],
      ["fête", "concert"]  // ← Added for last word
    ]
  }
];

// Helper functions
export const getScenarioById = (id: string): PredictionScenario | undefined => {
  return PREDICTION_SCENARIOS.find(scenario => scenario.id === id);
};

export const getScenariosByCategory = (category: string): PredictionScenario[] => {
  return PREDICTION_SCENARIOS.filter(scenario => scenario.category === category);
};

export const getScenariosByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): PredictionScenario[] => {
  return PREDICTION_SCENARIOS.filter(scenario => scenario.difficulty === difficulty);
};

export const getAllCategories = (): string[] => {
  const categories = PREDICTION_SCENARIOS.map(scenario => scenario.category).filter(Boolean);
  return [...new Set(categories)] as string[];
};