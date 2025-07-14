export interface PredictionScenario {
  id: string;
  targetSentence: string;
  words: string[];
  wordCompletions?: string[][][][];
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export const NUMBER_OF_SENTENCES = 10;

export const PREDICTION_SCENARIOS: PredictionScenario[] = [
  {
    id: "sentence-1",
    targetSentence: "N'oublie pas de verrouiller la porte quand tu pars",
    words: ["N'oublie", "pas", "de", "verrouiller", "la", "porte", "quand", "tu", "pars"],
    category: "Neutral",
    difficulty: "medium",
    wordCompletions: [
        [
        [["N'oublie", "Nous", "Ne"]],
        [["N'oublie"]],
        [["N'oublie"]],
        [["N'oublie"]],
        [["N'oublie"]],
        [["N'oublie"]],
        [["N'oublie"]],
        [["N'oublie"]],
        ],
        [
        [["pas", "posé", "pièce"]],
        [["pas", "partir", "parc"]],
        [["pas"]],
        ],
        [
        [["de", "du", "dans"]],
        [["de", "descends", "devenu"]],
        ],
        [
        [["verrouiller", "vaisselle", "voiture"]],
        [["verrouiller", "verso"]],
        [["verrouiller", "verso"]],
        [["verrouiller"]],
        [["verrouiller"]],
        [["verrouiller"]],
        [["verrouiller"]],
        [["verrouiller"]],
        [["verrouiller"]],
        [["verrouiller"]],
        [["verrouiller"]],
        ],
        [
        [["la", "l'air", "lait"]],
        [["la", "lait", "lampadaire"]],
        ],
        [
        [["porte", "posé", "pièce"]],
        [["porte", "posé", "portable"]],
        [["porte", "portable"]],
        [["porte", "portable"]],
        [["porte"]],
        ],
        [
        [["quand", "que", "quelques"]],
        [["quand", "que", "quelques"]],
        [["quand", "quartier"]],
        [["quand"]],
        [["quand"]],
        ],
        [
        [["tu", "tapé", "train"]],
        [["tu"]],
        ],
        [
        [["pars", "posé", "pièce"]],
        [["pars", "partir", "parc"]],
        [["pars", "partir", "parc"]],
        [["pars"]],
        ],
    ]


  },
  {
    id: "sentence-2",
    targetSentence: "Elle est allée se promener dans le quartier",
    words: ["Elle", "est", "allée", "se", "promener", "dans", "le", "quartier"],
    category: "Neutral",
    difficulty: "medium",
    wordCompletions: [
        [ // Elle
            [["Elle", "Elles", "Et"]],
            [["Elle", "Elles"]],
            [["Elle"]],
            [["Elle"]],
        ],
        [ // est
            [["est", "et", "es"]],
            [["est", "es"]],
            [["est"]],
        ],
        [ // allée
            [["allée", "aller", "allées"]],
            [["allée", "aller", "allées"]],
            [["allée", "allées"]],
            [["allée", "allées"]],
            [["allée"]],
        ],
        [ // se
            [["se", "ce", "ses"]],
            [["se", "ses"]],
        ],
        [ // promener
            [["promener", "promenade", "premier"]],
            [["promener", "promenade"]],
            [["promener"]],
            [["promener"]],
            [["promener"]],
            [["promener"]],
            [["promener"]],
            [["promener"]],
        ],
        [ // dans
            [["dans", "d'un", "devant"]],
            [["dans"]],
            [["dans"]],
            [["dans"]],
        ],
        [ // le
            [["le", "la", "les"]],
            [["le", "les"]],
        ],
        [ // quartier
            [["quartier", "quartiers", "quatre"]],
            [["quartier", "quartiers"]],
            [["quartier"]],
            [["quartier"]],
            [["quartier"]],
            [["quartier"]],
            [["quartier"]],
            [["quartier"]],
        ],
    ]
  },
  {
    id: "sentence-3",
    targetSentence: "Peux-tu m'apporter les clés quand tu descends",
    words: ["Peux-tu", "m'apporter", "les", "clés", "quand", "tu", "descends"],
    category: "Neutral",
    difficulty: "medium",
    wordCompletions: [
        [ // Peux-tu
            [["Peux-tu", "Peux", "peut"]],
            [["Peux-tu", "Peux"]],
            [["Peux-tu"]],
            [["Peux-tu"]],
            [["Peux-tu"]],
            [["Peux-tu"]],
            [["Peux-tu"]],
        ],
        [ // m'apporter
            [["m'apporter", "apporter", "emporter"]],
            [["m'apporter", "apporter"]],
            [["m'apporter"]],
            [["m'apporter"]],
            [["m'apporter"]],
            [["m'apporter"]],
            [["m'apporter"]],
            [["m'apporter"]],
            [["m'apporter"]],
        ],
        [ // les
            [["les", "le", "la"]],
            [["les"]],
            [["les"]],
        ],
        [ // clés
            [["clés", "clefs", "claires"]],
            [["clés", "clefs"]],
            [["clés"]],
            [["clés"]],
        ],
        [ // quand
            [["quand", "quant", "comme"]],
            [["quand", "quant"]],
            [["quand"]],
            [["quand"]],
            [["quand"]],
        ],
        [ // tu
            [["tu", "te", "tout"]],
            [["tu"]],
        ],
        [ // descends
            [["descends", "descendras", "descendre"]],
            [["descends", "descendre"]],
            [["descends"]],
            [["descends"]],
            [["descends"]],
            [["descends"]],
            [["descends"]],
            [["descends"]],
        ],
    ]
  },
  {
    id: "sentence-4",
  targetSentence: "Ils ont terminé avant que la réunion ne commence",
  words: ["Ils", "ont", "terminé", "avant", "que", "la", "réunion", "ne", "commence"],
  category: "Neutral",
  difficulty: "medium",
  wordCompletions: [
    [
      [["Ils", "imprimées", "immédiatement"]],
      [["Ils", "Il"]],
      [["Ils"]],
    ],
    [
      [["ont", "ouvert", "oublié"]],
      [["ont"]],
      [["ont"]],
    ],
    [
      [["terminé", "tapé", "train"]],
      [["terminé", "tempête", "temps"]],
      [["terminé"]],
      [["terminé"]],
      [["terminé"]],
      [["terminé"]],
      [["terminé"]],
    ],
    [
      [["avant", "avec", "après"]],
      [["avant", "avec", "avons"]],
      [["avant"]],
      [["avant"]],
      [["avant"]],
    ],
    [
      [["que", "quelques", "quand"]],
      [["que", "quelques", "quand"]],
      [["que", "quelques", "quelque"]],
    ],
    [
      [["la", "l'air", "lait"]],
      [["la", "lait", "lampadaire"]],
    ],
    [
      [["réunion", "retard", "rapport"]],
      [["réunion"]],
      [["réunion"]],
      [["réunion"]],
      [["réunion"]],
      [["réunion"]],
      [["réunion"]],
    ],
    [
      [["ne", "nous", "nous",]],
      [["ne"]],
    ],
    [
      [["commence", "colis", "cessé"]],
      [["commence", "colis", "commencé"]],
      [["commence", "commencé"]],
      [["commence", "commencé"]],
      [["commence", "commencé"]],
      [["commence", "commencé"]],
      [["commence", "commencé"]],
      [["commence"]],
    ],
  ]
},

  {
    id: "sentence-5",
    targetSentence: "J'enverrai le rapport d'ici la fin de la journée",
    words: ["J'enverrai", "le", "rapport", "d'ici", "la", "fin", "de", "la", "journée"],
    category: "Neutral",
    difficulty: "medium",
    wordCompletions: [
        [ // J'enverrai
            [["J'enverrai", "J'envoie", "J'ai envoyé"]],
            [["J'enverrai", "J'envoie"]],
            [["J'enverrai"]],
            [["J'enverrai"]],
            [["J'enverrai"]],
            [["J'enverrai"]],
            [["J'enverrai"]],
            [["J'enverrai"]],
            [["J'enverrai"]],
        ],
        [ // le
            [["le", "la", "les"]],
            [["le"]],
        ],
        [ // rapport
            [["rapport", "rapports", "rapidement"]],
            [["rapport", "rapports"]],
            [["rapport"]],
            [["rapport"]],
            [["rapport"]],
            [["rapport"]],
            [["rapport"]],
        ],
        [ // d'ici
            [["d'ici", "ici", "d'où"]],
            [["d'ici"]],
            [["d'ici"]],
            [["d'ici"]],
        ],
        [ // la
            [["la", "le", "les"]],
            [["la"]],
        ],
        [ // fin
            [["fin", "final", "finalement"]],
            [["fin"]],
            [["fin"]],
        ],
        [ // de
            [["de", "des", "du"]],
            [["de"]],
        ],
        [ // la
            [["la", "le", "les"]],
            [["la"]],
        ],
        [ // journée
            [["journée", "jour", "journal"]],
            [["journée", "jour"]],
            [["journée"]],
            [["journée"]],
            [["journée"]],
            [["journée"]],
            [["journée"]],
        ],
    ]
  },
  {
  id: "sentence-6",
  targetSentence: "Il a regardé l'écran et a enfoncé le bouton",
  words: ["Il", "a", "regardé", "l'écran", "et", "a", "enfoncé", "le", "bouton"],
  category: "Neutral",
  difficulty: "medium",
  wordCompletions: [
    [ // Il
      [["Il", "Ils", "Elle"]],
      [["Il", "Ils"]],
    ],
    [ // a
      [["a", "à", "as"]],
    ],
    [ // regardé
      [["regardé", "regarder", "regarde"]],
      [["regardé", "regarder"]],
      [["regardé"]],
      [["regardé"]],
      [["regardé"]],
      [["regardé"]],
      [["regardé"]],
    ],
    [ // l'écran
      [["l'écran", "écran", "écrans"]],
      [["l'écran", "écran"]],
      [["l'écran"]],
      [["l'écran"]],
      [["l'écran"]],
      [["l'écran"]],
    ],
    [ // et
      [["et", "est", "es"]],
      [["et", "est"]],
    ],
    [ // a
      [["a", "à", "as"]],
    ],
    [ // enfoncé
      [["enfoncé", "enfiler", "enfin"]],
      [["enfoncé", "enfiler", "enfermer"]],
      [["enfoncé", "enfiler"]],
      [["enfoncé"]],
      [["enfoncé"]],
      [["enfoncé"]],
    ],
    [ // le
      [["le", "la", "les"]],
      [["le"]],
    ],
    [ // bouton
      [["bouton", "boutons", "boutonner"]],
      [["bouton", "boutons"]],
      [["bouton"]],
      [["bouton"]],
      [["bouton"]],
      [["bouton"]],
    ],
  ]
},

  {
    id: "sentence-7",
    targetSentence: "Ils ont marché jusqu'au magasin pour prendre du lait",
    words: ["Ils", "ont", "marché", "jusqu'au", "magasin", "pour", "prendre", "du", "lait"],
    category: "Neutral",
    difficulty: "medium",
    wordCompletions: [
        [ // Ils
            [["Ils", "Il", "Elles"]],
            [["Ils", "Il"]],
            [["Ils"]],
        ],
        [ // ont
            [["ont", "on", "ont-ils"]],
            [["ont", "on"]],
            [["ont"]],
        ],
        [ // marché
            [["marché", "marcher", "marche"]],
            [["marché", "marcher"]],
            [["marché"]],
            [["marché"]],
            [["marché"]],
            [["marché"]],
        ],
        [ // jusqu'au
            [["jusqu'au", "jusque", "jusqu'à"]],
            [["jusqu'au", "jusque"]],
            [["jusqu'au"]],
            [["jusqu'au"]],
            [["jusqu'au"]],
            [["jusqu'au"]],
            [["jusqu'au"]],
            [["jusqu'au"]],
        ],
        [ // magasin
            [["magasin", "magasins", "magazine"]],
            [["magasin", "magasins"]],
            [["magasin"]],
            [["magasin"]],
            [["magasin"]],
            [["magasin"]],
            [["magasin"]],
        ],
        [ // pour
            [["pour", "par", "pendant"]],
            [["pour", "par"]],
            [["pour"]],
            [["pour"]],
        ],
        [ // prendre
            [["prendre", "pris", "prenaient"]],
            [["prendre", "pris"]],
            [["prendre"]],
            [["prendre"]],
            [["prendre"]],
            [["prendre"]],
            [["prendre"]],
        ],
        [ // du
            [["du", "de", "des"]],
            [["du"]],
        ],
        [ // lait
            [["lait", "l'air", "laid"]],
            [["lait", "laid"]],
            [["lait"]],
            [["lait"]],
        ],
    ]
  },
  {
    id: "sentence-8",
    targetSentence: "La salle semblait lumineuse et vraiment bien rangée",
    words: ["La", "salle", "semblait", "lumineuse", "et", "vraiment", "bien", "rangée"],
    category: "Neutral",
    difficulty: "medium",
    wordCompletions: [
        [ // La
            [["La", "Le", "Les"]],
            [["La"]],
        ],
            [ // salle
        [["salle", "salon", "sac"]],
        [["salle", "salon"]],
        [["salle"]],
        [["salle"]],
        [["salle"]],
        ],
        [ // semblait
            [["semblait", "semble", "semblent"]],
            [["semblait", "semble"]],
            [["semblait"]],
            [["semblait"]],
            [["semblait"]],
            [["semblait"]],
            [["semblait"]],
            [["semblait"]],
        ],
        [ // lumineuse
            [["lumineuse", "lumineux", "lumière"]],
            [["lumineuse", "lumineux"]],
            [["lumineuse"]],
            [["lumineuse"]],
            [["lumineuse"]],
            [["lumineuse"]],
            [["lumineuse"]],
            [["lumineuse"]],
            [["lumineuse"]],
        ],
        [ // et
            [["et", "est", "es"]],
            [["et", "est"]],
        ],
        [ // vraiment
            [["vraiment", "vrai", "vraie"]],
            [["vraiment", "vrai"]],
            [["vraiment"]],
            [["vraiment"]],
            [["vraiment"]],
            [["vraiment"]],
            [["vraiment"]],
            [["vraiment"]],
        ],
        [ // bien
            [["bien", "biens", "bientôt"]],
            [["bien", "biens"]],
            [["bien"]],
            [["bien"]],
        ],
        [ // rangée
            [["rangée", "ranger", "rangement"]],
            [["rangée", "ranger"]],
            [["rangée"]],
            [["rangée"]],
            [["rangée"]],
            [["rangée"]],
        ],
    ]
  },
  {
    id: "sentence-9",
    targetSentence: "Elle a tapé son message et l'a envoyé immédiatement",
    words: ["Elle", "a", "tapé", "son", "message", "et", "l'a", "envoyé", "immédiatement"],
    category: "Neutral",
    difficulty: "medium",
    wordCompletions: [
        [ // Elle
            [["Elle", "Elles", "Il"]],
            [["Elle", "Elles"]],
            [["Elle"]],
            [["Elle"]],
        ],
        [ // a
            [["a", "à", "as"]],
        ],
        [ // tapé
            [["tapé", "taper", "tape"]],
            [["tapé", "taper"]],
            [["tapé"]],
            [["tapé"]],
        ],
        [ // son
            [["son", "sa", "ses"]],
            [["son"]],
            [["son"]],
        ],
        [ // message
            [["message", "messages", "messager"]],
            [["message", "messages"]],
            [["message"]],
            [["message"]],
            [["message"]],
            [["message"]],
            [["message"]],
        ],
        [ // et
            [["et", "est", "es"]],
            [["et", "est"]],
        ],
        [ // l'a
            [["l'a", "la", "le"]],
            [["l'a", "la"]],
            [["l'a"]],
        ],
        [ // envoyé
            [["envoyé", "envoyer", "envoie"]],
            [["envoyé", "envoyer"]],
            [["envoyé"]],
            [["envoyé"]],
            [["envoyé"]],
            [["envoyé"]],
        ],
        [ // immédiatement
            [["immédiatement", "immédiat", "immédiate"]],
            [["immédiatement", "immédiat"]],
            [["immédiatement"]],
            [["immédiatement"]],
            [["immédiatement"]],
            [["immédiatement"]],
            [["immédiatement"]],
            [["immédiatement"]],
            [["immédiatement"]],
            [["immédiatement"]],
            [["immédiatement"]],
            [["immédiatement"]],
            [["immédiatement"]],
        ],
    ]
  
  },
  
  {
    id: "sentence-10",
    targetSentence: "Elle lisait l'article en sirotant son café",
    words: ["Elle", "lisait", "l'article", "en", "sirotant", "son", "café"],
    category: "Neutral",
    difficulty: "medium",
    wordCompletions: [
        [
        [["Elle", "envoyé", "encore"]],
        [["Elle"]],
        [["Elle"]],
        [["Elle"]],
        ],
        [
        [["lisait", "l'air", "lait"]],
        [["lisait", "livre", "lire"]],
        [["lisait"]],
        [["lisait"]],
        [["lisait"]],
        [["lisait"]],
        ],
        [
        [["l'article", "l'air", "lait"]],
        [["l'article", "l'air", "l'écran"]],
        [["l'article", "l'air", "l'a"]],
        [["l'article"]],
        [["l'article"]],
        [["l'article"]],
        [["l'article"]],
        [["l'article"]],
        [["l'article"]],
        ],
        [
        [["en", "envoyé", "encore",]],
        [["en", "envoyé", "encore"]],
        ],
        [
        [["sirotant", "sur", "sommes", "sa"]],
        [["sirotant", "silencieux"]],
        [["sirotant"]],
        [["sirotant"]],
        [["sirotant"]],
        [["sirotant"]],
        [["sirotant"]],
        [["sirotant"]],
        ],
        [
        [["son", "sur", "sommes"]],
        [["son", "sommes", "sonneries"]],
        [["son", "sonneries"]],
        ],
        [
        [["café", "colis", "cessé"]],
        [["café", "carnet"]],
        [["café"]],
        [["café"]],
        ]
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

export const getRandomScenario = (): PredictionScenario => {
  const randomIndex = Math.floor(Math.random() * PREDICTION_SCENARIOS.length);
  return PREDICTION_SCENARIOS[randomIndex];
};

export const getRandomScenarioByCategory = (category: string): PredictionScenario | undefined => {
  const scenarios = getScenariosByCategory(category);
  if (scenarios.length === 0) return undefined;
  const randomIndex = Math.floor(Math.random() * scenarios.length);
  return scenarios[randomIndex];
};

export const getRandomScenarioByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): PredictionScenario | undefined => {
  const scenarios = getScenariosByDifficulty(difficulty);
  if (scenarios.length === 0) return undefined;
  const randomIndex = Math.floor(Math.random() * scenarios.length);
  return scenarios[randomIndex];
};