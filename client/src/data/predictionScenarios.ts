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
      // No more predictions after "piscine"
      []
    ]
  },
  {
    id: "rejoint-chien-maison",
    targetSentence: "Elle rejoint le chien dans la maison",
    words: ["Elle", "rejoint", "le", "chien", "dans", "la", "maison"],
    category: "Social",
    difficulty: "medium",
    fakePredictions: [
      // Predictions when user finishes typing "Elle" (predicting "rejoint")
      ["invite", "partage"],
      // Predictions when user finishes typing "rejoint" (predicting "le")
      ["un", "son"],
      // Predictions when user finishes typing "le" (predicting "chien")
      ["ami", "repas"],
      // Predictions when user finishes typing "chien" (predicting "dans")
      ["à", "chez"],
      // Predictions when user finishes typing "dans" (predicting "la")
      ["le", "un"],
      // Predictions when user finishes typing "la" (predicting "maison")
      ["piscine", "école"],
      // No more predictions after "maison"
      []
    ]
  },
  {
    id: "partage-repas-piscine",
    targetSentence: "Il partage son repas à la piscine",
    words: ["Il", "partage", "son", "repas", "à", "la", "piscine"],
    category: "Food",
    difficulty: "medium",
    fakePredictions: [
      // Predictions when user finishes typing "Il" (predicting "partage")
      ["rejoint", "invite"],
      // Predictions when user finishes typing "partage" (predicting "son")
      ["le", "un"],
      // Predictions when user finishes typing "son" (predicting "repas")
      ["ami", "chien"],
      // Predictions when user finishes typing "repas" (predicting "à")
      ["dans", "chez"],
      // Predictions when user finishes typing "à" (predicting "la")
      ["un", "le"],
      // Predictions when user finishes typing "la" (predicting "piscine")
      ["maison", "table"],
      // No more predictions after "piscine"
      []
    ]
  },
  {
    id: "invite-chien-ami",
    targetSentence: "Elle invite le chien chez un ami",
    words: ["Elle", "invite", "le", "chien", "chez", "un", "ami"],
    category: "Social",
    difficulty: "hard",
    fakePredictions: [
      // Predictions when user finishes typing "Elle" (predicting "invite")
      ["partage", "rejoint"],
      // Predictions when user finishes typing "invite" (predicting "le")
      ["son", "un"],
      // Predictions when user finishes typing "le" (predicting "chien")
      ["repas", "ami"],
      // Predictions when user finishes typing "chien" (predicting "chez")
      ["à", "dans"],
      // Predictions when user finishes typing "chez" (predicting "un")
      ["le", "son"],
      // Predictions when user finishes typing "un" (predicting "ami")
      ["chien", "repas"],
      // No more predictions after "ami"
      []
    ]
  },
  {
    id: "rejoint-ami-maison",
    targetSentence: "Il rejoint un ami à la maison",
    words: ["Il", "rejoint", "un", "ami", "à", "la", "maison"],
    category: "Social",
    difficulty: "easy",
    fakePredictions: [
      // Predictions when user finishes typing "Il" (predicting "rejoint")
      ["invite", "partage"],
      // Predictions when user finishes typing "rejoint" (predicting "un")
      ["le", "son"],
      // Predictions when user finishes typing "un" (predicting "ami")
      ["repas", "chien"],
      // Predictions when user finishes typing "ami" (predicting "à")
      ["chez", "dans"],
      // Predictions when user finishes typing "à" (predicting "la")
      ["le", "un"],
      // Predictions when user finishes typing "la" (predicting "maison")
      ["piscine", "école"],
      // No more predictions after "maison"
      []
    ]
  },
  {
    id: "partage-repas-chez-moi",
    targetSentence: "Elle partage un repas chez moi",
    words: ["Elle", "partage", "un", "repas", "chez", "moi"],
    category: "Food",
    difficulty: "easy",
    fakePredictions: [
      // Predictions when user finishes typing "Elle" (predicting "partage")
      ["rejoint", "invite"],
      // Predictions when user finishes typing "partage" (predicting "un")
      ["son", "le"],
      // Predictions when user finishes typing "un" (predicting "repas")
      ["ami", "chien"],
      // Predictions when user finishes typing "repas" (predicting "chez")
      ["à", "dans"],
      // Predictions when user finishes typing "chez" (predicting "moi")
      ["lui", "nous"],
      // No more predictions after "moi"
      []
    ]
  },
  {
    id: "invite-son-ami-piscine",
    targetSentence: "Il invite son ami à la piscine",
    words: ["Il", "invite", "son", "ami", "à", "la", "piscine"],
    category: "Social",
    difficulty: "medium",
    fakePredictions: [
      // Predictions when user finishes typing "Il" (predicting "invite")
      ["partage", "rejoint"],
      // Predictions when user finishes typing "invite" (predicting "son")
      ["un", "le"],
      // Predictions when user finishes typing "son" (predicting "ami")
      ["chien", "repas"],
      // Predictions when user finishes typing "ami" (predicting "à")
      ["dans", "chez"],
      // Predictions when user finishes typing "à" (predicting "la")
      ["un", "le"],
      // Predictions when user finishes typing "la" (predicting "piscine")
      ["maison", "plage"],
      // No more predictions after "piscine"
      []
    ]
  },
  {
    id: "rejoint-chien-piscine",
    targetSentence: "Elle rejoint le chien à la piscine",
    words: ["Elle", "rejoint", "le", "chien", "à", "la", "piscine"],
    category: "Social",
    difficulty: "medium",
    fakePredictions: [
      // Predictions when user finishes typing "Elle" (predicting "rejoint")
      ["invite", "partage"],
      // Predictions when user finishes typing "rejoint" (predicting "le")
      ["son", "un"],
      // Predictions when user finishes typing "le" (predicting "chien")
      ["ami", "repas"],
      // Predictions when user finishes typing "chien" (predicting "à")
      ["chez", "dans"],
      // Predictions when user finishes typing "à" (predicting "la")
      ["le", "un"],
      // Predictions when user finishes typing "la" (predicting "piscine")
      ["maison", "école"],
      // No more predictions after "piscine"
      []
    ]
  },
  {
    id: "partage-repas-maison",
    targetSentence: "Il partage le repas dans la maison",
    words: ["Il", "partage", "le", "repas", "dans", "la", "maison"],
    category: "Food",
    difficulty: "hard",
    fakePredictions: [
      // Predictions when user finishes typing "Il" (predicting "partage")
      ["invite", "rejoint"],
      // Predictions when user finishes typing "partage" (predicting "le")
      ["un", "son"],
      // Predictions when user finishes typing "le" (predicting "repas")
      ["chien", "ami"],
      // Predictions when user finishes typing "repas" (predicting "dans")
      ["à", "chez"],
      // Predictions when user finishes typing "dans" (predicting "la")
      ["le", "un"],
      // Predictions when user finishes typing "la" (predicting "maison")
      ["piscine", "cuisine"],
      // No more predictions after "maison"
      []
    ]
  },
  {
    id: "invite-ami-chez-moi",
    targetSentence: "Elle invite un ami chez moi",
    words: ["Elle", "invite", "un", "ami", "chez", "moi"],
    category: "Social",
    difficulty: "easy",
    fakePredictions: [
      // Predictions when user finishes typing "Elle" (predicting "invite")
      ["rejoint", "partage"],
      // Predictions when user finishes typing "invite" (predicting "un")
      ["son", "le"],
      // Predictions when user finishes typing "un" (predicting "ami")
      ["chien", "repas"],
      // Predictions when user finishes typing "ami" (predicting "chez")
      ["à", "dans"],
      // Predictions when user finishes typing "chez" (predicting "moi")
      ["lui", "elle"],
      // No more predictions after "moi"
      []
    ]
  },
  {
    id: "rejoint-son-ami-piscine",
    targetSentence: "Il rejoint son ami à la piscine",
    words: ["Il", "rejoint", "son", "ami", "à", "la", "piscine"],
    category: "Social",
    difficulty: "medium",
    fakePredictions: [
      // Predictions when user finishes typing "Il" (predicting "rejoint")
      ["partage", "invite"],
      // Predictions when user finishes typing "rejoint" (predicting "son")
      ["le", "un"],
      // Predictions when user finishes typing "son" (predicting "ami")
      ["repas", "chien"],
      // Predictions when user finishes typing "ami" (predicting "à")
      ["dans", "chez"],
      // Predictions when user finishes typing "à" (predicting "la")
      ["un", "le"],
      // Predictions when user finishes typing "la" (predicting "piscine")
      ["maison", "plage"],
      // No more predictions after "piscine"
      []
    ]
  },
  {
    id: "partage-repas-evenement",
    targetSentence: "Elle partage un repas à l'événement",
    words: ["Elle", "partage", "un", "repas", "à", "l'événement"],
    category: "Food",
    difficulty: "hard",
    fakePredictions: [
      // Predictions when user finishes typing "Elle" (predicting "partage")
      ["invite", "rejoint"],
      // Predictions when user finishes typing "partage" (predicting "un")
      ["le", "son"],
      // Predictions when user finishes typing "un" (predicting "repas")
      ["ami", "chien"],
      // Predictions when user finishes typing "repas" (predicting "à")
      ["chez", "dans"],
      // Predictions when user finishes typing "à" (predicting "l'événement")
      ["la", "le"],
      // No more predictions after "l'événement"
      []
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