export interface PredictionScenario {
  id: string;
  targetSentence: string;
  words: string[];
  wordCompletions?: string[][][];
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export const PREDICTION_SCENARIOS: PredictionScenario[] = [
  {
    id: "sentence-1",
    targetSentence: "Le livre était posé sur la table près de la fenêtre",
    words: ["Le", "livre", "était", "posé", "sur", "la", "table", "près", "de", "la", "fenêtre"],
    category: "Neutral",
    difficulty: "medium",
    wordCompletions: [
      [ // Le
        [["Le", "Les", "Lait"]],
        [["Le", "Les"]],
      ],
      [ // livre
        [["livre", "lire", "lit"]],
        [["livre", "lire"]],
        [["livre"]],
        [["livre"]],
        [["livre"]],
      ],
      [ // était
        [["était", "étais", "étaient"]],
        [["était", "étais", "étaient"]],
        [["était", "étaient"]],
        [["était", "étaient"]],
        [["était"]],
      ],
      [ // posé
        [["posé", "posté", "porté"]],
        [["posé", "posté"]],
        [["posé"]],
        [["posé"]],
      ],
      [ // sur
        [["sur", "sous", "sans"]],
        [["sur", "sous"]],
        [["sur"]],
      ],
      [ // la
        [["la", "le", "les"]],
        [["la", "les"]],
      ],
      [ // table
        [["table", "tablette", "tabouret"]],
        [["table", "tablette"]],
        [["table"]],
        [["table"]],
        [["table"]],
      ],
      [ // près
        [["près", "prêt", "premier"]],
        [["près", "prêt"]],
        [["près"]],
        [["près"]],
      ],
      [ // de
        [["de", "des", "du"]],
        [["de", "des"]],
      ],
      [ // la
        [["la", "le", "les"]],
        [["la", "les"]],
      ],
      [ // fenêtre
        [["fenêtre", "ferme", "fête"]],
        [["fenêtre", "ferme"]],
        [["fenêtre"]],
        [["fenêtre"]],
        [["fenêtre"]],
        [["fenêtre"]],
        [["fenêtre"]],
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
    targetSentence: "La machine à café a cessé de fonctionner ce matin",
    words: ["La", "machine", "à", "café", "a", "cessé", "de", "fonctionner", "ce", "matin"],
    category: "Neutral",
    difficulty: "medium",
    wordCompletions: [
        [ // La
            [["La", "Le", "Les"]],
            [["La"]],
        ],
        [ // machine
            [["machine", "machines", "machin"]],
            [["machine", "machines"]],
            [["machine"]],
            [["machine"]],
            [["machine"]],
            [["machine"]],
            [["machine"]],
        ],
        [ // à
            [["à", "a", "as"]],
        ],
        [ // café
            [["café", "cahier", "cacao"]],
            [["café"]],
            [["café"]],
            [["café"]],
        ],
        [ // a
            [["a", "à", "as"]],
        ],
        [ // cessé
            [["cessé", "cesser", "cesse"]],
            [["cessé", "cesse"]],
            [["cessé"]],
            [["cessé"]],
            [["cessé"]],
        ],
        [ // de
            [["de", "des", "du"]],
            [["de"]],
        ],
        [ // fonctionner
            [["fonctionner", "fonctionnait", "fonction"]],
            [["fonctionner", "fonction"]],
            [["fonctionner"]],
            [["fonctionner"]],
            [["fonctionner"]],
            [["fonctionner"]],
            [["fonctionner"]],
            [["fonctionner"]],
            [["fonctionner"]],
            [["fonctionner"]],
            [["fonctionner"]],
        ],
        [ // ce
            [["ce", "se", "ces"]],
            [["ce"]],
        ],
        [ // matin
            [["matin", "matinée", "matinal"]],
            [["matin", "matinée"]],
            [["matin"]],
            [["matin"]],
            [["matin"]],
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
    targetSentence: "Il a regardé l'écran et a tapoté le bouton",
    words: ["Il", "a", "regardé", "l'écran", "et", "a", "tapoté", "le", "bouton"],
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
        [ // tapoté
            [["tapoté", "tapoter", "tape"]],
            [["tapoté", "tapoter"]],
            [["tapoté"]],
            [["tapoté"]],
            [["tapoté"]],
            [["tapoté"]],
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
    targetSentence: "La pièce semblait lumineuse et vraiment bien rangée",
    words: ["La", "pièce", "semblait", "lumineuse", "et", "vraiment", "bien", "rangée"],
    category: "Neutral",
    difficulty: "medium",
    wordCompletions: [
        [ // La
            [["La", "Le", "Les"]],
            [["La"]],
        ],
        [ // pièce
            [["pièce", "pièces", "petit"]],
            [["pièce", "pièces"]],
            [["pièce"]],
            [["pièce"]],
            [["pièce"]],
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
    targetSentence: "Le train est arrivé avec environ cinq minutes de retard",
    words: ["Le", "train", "est", "arrivé", "avec", "environ", "cinq", "minutes", "de", "retard"],
    category: "Neutral",
    difficulty: "medium",
    wordCompletions: [
        [ // Le
            [["Le", "La", "Les"]],
            [["Le"]],
        ],
        [ // train
            [["train", "trains", "traineau"]],
            [["train", "trains"]],
            [["train"]],
            [["train"]],
            [["train"]],
        ],
        [ // est
            [["est", "et", "es"]],
            [["est", "et"]],
            [["est"]],
        ],
        [ // arrivé
            [["arrivé", "arriver", "arrive"]],
            [["arrivé", "arriver"]],
            [["arrivé"]],
            [["arrivé"]],
            [["arrivé"]],
            [["arrivé"]],
        ],
        [ // avec
            [["avec", "avant", "après"]],
            [["avec", "avant"]],
            [["avec"]],
            [["avec"]],
        ],
        [ // environ
            [["environ", "environs", "environnant"]],
            [["environ", "environs"]],
            [["environ"]],
            [["environ"]],
            [["environ"]],
            [["environ"]],
            [["environ"]],
        ],
        [ // cinq
            [["cinq", "six", "sept"]],
            [["cinq"]],
            [["cinq"]],
            [["cinq"]],
        ],
        [ // minutes
            [["minutes", "minute", "minutieux"]],
            [["minutes", "minute"]],
            [["minutes"]],
            [["minutes"]],
            [["minutes"]],
            [["minutes"]],
            [["minutes"]],
        ],
        [ // de
            [["de", "des", "du"]],
            [["de"]],
        ],
        [ // retard
            [["retard", "retards", "retarder"]],
            [["retard", "retards"]],
            [["retard"]],
            [["retard"]],
            [["retard"]],
            [["retard"]],
        ],
    ]
  },
  {
    id: "sentence-11",
    targetSentence: "Un chien aboyait quelque part au loin",
    words: ["Un", "chien", "aboyait", "quelque", "part", "au", "loin"],
    category: "Neutral",
    difficulty: "medium",
    wordCompletions: [
        [ // Un
            [["Un", "Une", "Des"]],
            [["Un"]],
        ],
        [ // chien
            [["chien", "chiens", "chienne"]],
            [["chien", "chiens"]],
            [["chien"]],
            [["chien"]],
            [["chien"]],
        ],
        [ // aboyait
            [["aboyait", "aboie", "aboyer"]],
            [["aboyait", "aboie"]],
            [["aboyait"]],
            [["aboyait"]],
            [["aboyait"]],
            [["aboyait"]],
            [["aboyait"]],
        ],
        [ // quelque
            [["quelque", "quelques", "quelqu'un"]],
            [["quelque", "quelques"]],
            [["quelque"]],
            [["quelque"]],
            [["quelque"]],
            [["quelque"]],
            [["quelque"]],
        ],
        [ // part
            [["part", "parts", "partout"]],
            [["part", "parts"]],
            [["part"]],
            [["part"]],
        ],
        [ // au
            [["au", "aux", "à"]],
            [["au", "aux"]],
        ],
        [ // loin
            [["loin", "lointain", "long"]],
            [["loin"]],
            [["loin"]],
            [["loin"]],
        ],
    ]
  },
  {
    id: "sentence-12",
    targetSentence: "Il a mis le dossier sur l'étagère du haut",
    words: ["Il", "a", "mis", "le", "dossier", "sur", "l'étagère", "du", "haut"],
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
        [ // mis
            [["mis", "mise", "met"]],
            [["mis", "mise"]],
            [["mis"]],
        ],
        [ // le
            [["le", "la", "les"]],
            [["le"]],
        ],
        [ // dossier
            [["dossier", "dossiers", "dos"]],
            [["dossier", "dossiers"]],
            [["dossier"]],
            [["dossier"]],
            [["dossier"]],
            [["dossier"]],
            [["dossier"]],
        ],
        [ // sur
            [["sur", "sous", "sans"]],
            [["sur", "sous"]],
            [["sur"]],
        ],
        [ // l'étagère
            [["l'étagère", "étagère", "étagères"]],
            [["l'étagère", "étagère"]],
            [["l'étagère"]],
            [["l'étagère"]],
            [["l'étagère"]],
            [["l'étagère"]],
            [["l'étagère"]],
            [["l'étagère"]],
        ],
        [ // du
            [["du", "de", "des"]],
            [["du"]],
        ],
        [ // haut
            [["haut", "haute", "hauteur"]],
            [["haut", "haute"]],
            [["haut"]],
            [["haut"]],
        ],
    ]
  },
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