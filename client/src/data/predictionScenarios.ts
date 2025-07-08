export interface PredictionScenario {
  id: string;
  targetSentence: string;
  words: string[];
  wordCompletions?: string[][][]; // New property for character-level completions
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export const PREDICTION_SCENARIOS: PredictionScenario[] = [
  {
    id: "sentence-1",
    targetSentence: "Le livre etait pose sur la table pres de fenetre",
    words: ["Le", "livre", "etait", "pose", "sur", "la", "table", "pres", "de", "fenetre"],
    category: "Neutral",
    difficulty: "medium",
    wordCompletions: [
      [
        ["Le", "lair", "lait", ],  // after typing "L"
        ["Le", "Les", "les", ],  // after typing "Le"
      ],
      [
        ["livre", "lair", "lait"],  // after typing "l"
        ["livre", "lisait", "lire"],  // after typing "li"
        ["livre"],  // after typing "liv"
        ["livre"],  // after typing "livr"
        ["livre"],  // after typing "livre"
      ],
      [
        ["etait", "eteint", "etaient"],  // after typing "e"
        ["etait", "eteint", "etaient"],  // after typing "et"
        ["etait", "etaient"],  // after typing "eta"
        ["etait", "etaient"],  // after typing "etai"
        ["etait"],  // after typing "etait"
      ],
      [
        ["pose", "piece", "pres"],  // after typing "p"
        ["pose", "porte", "portable"],  // after typing "po"
        ["pose"],  // after typing "pos"
        ["pose"],  // after typing "pose"
      ],
      [
        ["sur", "sommes", "sa"],  // after typing "s"
        ["sur"],  // after typing "su"
        ["sur"],  // after typing "sur"
      ],
      [
        ["la", "lair", "lait"],  // after typing "l"
        ["la", "lait", "lampadaire"],  // after typing "la"
      ],
      [
        ["table", "tape", "train"],  // after typing "t"
        ["table", "tape", "tapote"],  // after typing "ta"
        ["table"],  // after typing "tab"
        ["table"],  // after typing "tabl"
        ["table"],  // after typing "table"
      ],
      [
        ["pres", "pose", "piece"],  // after typing "p"
        ["pres", "presentation", "promener"],  // after typing "pr"
        ["pres"],  // after typing "pre"
        ["pres"],  // after typing "pres"
      ],
      [
        ["de", "du", "dans"],  // after typing "d"
        ["de", "descends", "devenu"],  // after typing "de"
      ],
      [
        ["fenetre", "fonctionner", "fichier"],  // after typing "f"
        ["fenetre", "ferme"],  // after typing "fe"
        ["fenetre"],  // after typing "fen"
        ["fenetre"],  // after typing "fene"
        ["fenetre"],  // after typing "fenet"
        ["fenetre"],  // after typing "fenetr"
        ["fenetre"],  // after typing "fenetre"
      ],
    ]
  },
  {
    id: "sentence-2",
    targetSentence: "Elle est allee se promener dans le quartier",
    words: ["Elle", "est", "allee", "se", "promener", "dans", "le", "quartier"],
    category: "Neutral",
    difficulty: "medium",
    wordCompletions: [
      [
        ["Elle", "envoye", "encore"],  // after typing "E"
        ["Elle"],  // after typing "El"
        ["Elle"],  // after typing "Ell"
        ["Elle"],  // after typing "Elle"
      ],
      [
        ["est", "envoye", "encore"],  // after typing "e"
        ["est", "essuyee"],  // after typing "es"
        ["est"],  // after typing "est"
      ],
      [
        ["allee", "avec", "apres"],  // after typing "a"
        ["allee", "alles"],  // after typing "al"
        ["allee", "alles"],  // after typing "all"
        ["allee", "alles"],  // after typing "alle"
        ["allee"],  // after typing "allee"
      ],
      [
        ["se", "sur", "sommes"],  // after typing "s"
        ["se", "semblait", "secondes"],  // after typing "se"
      ],
      [
        ["promener", "pose", "piece"],  // after typing "p"
        ["promener", "pres", "presentation"],  // after typing "pr"
        ["promener", "promenade"],  // after typing "pro"
        ["promener", "promenade"],  // after typing "prom"
        ["promener", "promenade"],  // after typing "prome"
        ["promener", "promenade"],  // after typing "promen"
        ["promener"],  // after typing "promene"
        ["promener"],  // after typing "promener"
      ],
      [
        ["dans", "du", "descends"],  // after typing "d"
        ["dans"],  // after typing "da"
        ["dans"],  // after typing "dan"
        ["dans"],  // after typing "dans"
      ],
      [
        ["le", "lair", "lait"],  // after typing "l"
        ["le", "Les", "Le"],  // after typing "le"
      ],
      [
        ["quartier", "que", "quelques"],  // after typing "q"
        ["quartier", "que", "quelques"],  // after typing "qu"
        ["quartier", "quand"],  // after typing "qua"
        ["quartier"],  // after typing "quar"
        ["quartier"],  // after typing "quart"
        ["quartier"],  // after typing "quarti"
        ["quartier"],  // after typing "quartie"
        ["quartier"],  // after typing "quartier"
      ],
    ]
  },
  {
    id: "sentence-3",
    targetSentence: "Peux-tu apporter les cles quand tu descends",
    words: ["Peux-tu", "apporter", "les", "cles", "quand", "tu", "descends"],
    category: "Neutral",
    difficulty: "medium",
    wordCompletions: [
      [
        ["Peux-tu", "pose", "piece"],  // after typing "P"
        ["Peux-tu", "peu", "pendant"],  // after typing "Pe"
        ["Peux-tu", "peu"],  // after typing "Peu"
        ["Peux-tu"],  // after typing "Peux"
        ["Peux-tu"],  // after typing "Peux-"
        ["Peux-tu"],  // after typing "Peux-t"
        ["Peux-tu"],  // after typing "Peux-tu"
      ],
      [
        ["apporter", "avec", "apres"],  // after typing "a"
        ["apporter", "apres"],  // after typing "ap"
        ["apporter"],  // after typing "app"
        ["apporter"],  // after typing "appo"
        ["apporter"],  // after typing "appor"
        ["apporter"],  // after typing "apport"
        ["apporter"],  // after typing "apporte"
        ["apporter"],  // after typing "apporter"
      ],
      [
        ["les", "lair", "lait"],  // after typing "l"
        ["les", "Les", "Le"],  // after typing "le"
        ["les", "Les"],  // after typing "les"
      ],
      [
        ["cles", "colis", "cesse"],  // after typing "c"
        ["cles"],  // after typing "cl"
        ["cles"],  // after typing "cle"
        ["cles"],  // after typing "cles"
      ],
      [
        ["quand", "que", "quelques"],  // after typing "q"
        ["quand", "que", "quelques"],  // after typing "qu"
        ["quand", "quartier"],  // after typing "qua"
        ["quand"],  // after typing "quan"
        ["quand"],  // after typing "quand"
      ],
      [
        ["tu", "tape", "train"],  // after typing "t"
        ["tu"],  // after typing "tu"
      ],
      [
        ["descends", "du", "dans"],  // after typing "d"
        ["descends", "de", "devenu"],  // after typing "de"
        ["descends"],  // after typing "des"
        ["descends"],  // after typing "desc"
        ["descends"],  // after typing "desce"
        ["descends"],  // after typing "descen"
        ["descends"],  // after typing "descend"
        ["descends"],  // after typing "descends"
      ],
    ]
  },
  {
    id: "sentence-4",
    targetSentence: "La machine a cafe a cesse de fonctionner ce matin je pense",
    words: ["La", "machine", "a", "cafe", "a", "cesse", "de", "fonctionner", "ce", "matin", "je", "pense"],
    category: "Neutral",
    difficulty: "medium",
    wordCompletions: [
      [
        ["La", "lair", "lait"],  // after typing "L"
        ["La", "lait", "lampadaire"],  // after typing "La"
      ],
      [
        ["machine", "marche", "magasin"],  // after typing "m"
        ["machine", "marche", "magasin"],  // after typing "ma"
        ["machine"],  // after typing "mac"
        ["machine"],  // after typing "mach"
        ["machine"],  // after typing "machi"
        ["machine"],  // after typing "machin"
        ["machine"],  // after typing "machine"
      ],
      [
        ["a"],  // after typing "a"
      ],
      [
        ["cafe", "colis", "cesse"],  // after typing "c"
        ["cafe", "carnet"],  // after typing "ca"
        ["cafe"],  // after typing "caf"
        ["cafe"],  // after typing "cafe"
      ],
      [
        ["a", "avec", "apres"],  // after typing "a"
      ],
      [
        ["cesse", "colis", "cinq"],  // after typing "c"
        ["cesse", "ce"],  // after typing "ce"
        ["cesse"],  // after typing "ces"
        ["cesse"],  // after typing "cess"
        ["cesse"],  // after typing "cesse"
      ],
      [
        ["de", "du", "dans"],  // after typing "d"
        ["de", "descends", "devenu"],  // after typing "de"
      ],
      [
        ["fonctionner", "fenetre", "fichier"],  // after typing "f"
        ["fonctionner", "formulaire"],  // after typing "fo"
        ["fonctionner"],  // after typing "fon"
        ["fonctionner"],  // after typing "fonc"
        ["fonctionner"],  // after typing "fonct"
        ["fonctionner"],  // after typing "foncti"
        ["fonctionner"],  // after typing "fonctio"
        ["fonctionner"],  // after typing "fonction"
        ["fonctionner"],  // after typing "fonctionn"
        ["fonctionner"],  // after typing "fonctionne"
        ["fonctionner"],  // after typing "fonctionner"
      ],
      [
        ["ce", "colis", "cesse"],  // after typing "c"
        ["ce", "cesse"],  // after typing "ce"
      ],
      [
        ["matin", "marche", "magasin"],  // after typing "m"
        ["matin", "marche", "magasin"],  // after typing "ma"
        ["matin"],  // after typing "mat"
        ["matin"],  // after typing "mati"
        ["matin"],  // after typing "matin"
      ],
      [
        ["je", "jai", "jusquau"],  // after typing "j"
        ["je"],  // after typing "je"
      ],
      [
        ["pense", "pose", "piece"],  // after typing "p"
        ["pense", "peu", "pendant"],  // after typing "pe"
        ["pense", "pendant"],  // after typing "pen"
        ["pense"],  // after typing "pens"
        ["pense"],  // after typing "pense"
      ],
    ]
  },
  {
    id: "sentence-5",
    targetSentence: "Jenverrai le rapport dici la fin de journee",
    words: ["Jenverrai", "le", "rapport", "dici", "la", "fin", "de", "journee"],
    category: "Neutral",
    difficulty: "medium",
    wordCompletions: [
      [
        ["Jenverrai", "je", "jai"],  // after typing "J"
        ["Jenverrai", "jai"],  // after typing "Je"
        ["Jenverrai"],  // after typing "Jen"
        ["Jenverrai"],  // after typing "Jenv"
        ["Jenverrai"],  // after typing "Jenve"
        ["Jenverrai"],  // after typing "Jenver"
        ["Jenverrai"],  // after typing "Jenverr"
        ["Jenverrai"],  // after typing "Jenverra"
        ["Jenverrai"],  // after typing "Jenverrai"
      ],
      [
        ["le", "lair", "lait"],  // after typing "l"
        ["le", "Les", "Le"],  // after typing "le"
      ],
      [
        ["rapport", "retard", "rempli"],  // after typing "r"
        ["rapport", "rangee"],  // after typing "ra"
        ["rapport"],  // after typing "rap"
        ["rapport"],  // after typing "rapp"
        ["rapport"],  // after typing "rappo"
        ["rapport"],  // after typing "rappor"
        ["rapport"],  // after typing "rapport"
      ],
      [
        ["dici", "du", "dans"],  // after typing "d"
        ["dici"],  // after typing "di"
        ["dici"],  // after typing "dic"
        ["dici"],  // after typing "dici"
      ],
      [
        ["la", "lair", "lait"],  // after typing "l"
        ["la", "lait", "lampadaire"],  // after typing "la"
      ],
      [
        ["fin", "fenetre", "fonctionner"],  // after typing "f"
        ["fin", "fichier"],  // after typing "fi"
        ["fin"],  // after typing "fin"
      ],
      [
        ["de", "du", "dans"],  // after typing "d"
        ["de", "descends", "devenu"],  // after typing "de"
      ],
      [
        ["journee", "je", "jai"],  // after typing "j"
        ["journee", "jour"],  // after typing "jo"
        ["journee", "jour"],  // after typing "jou"
        ["journee", "jour"],  // after typing "jour"
        ["journee"],  // after typing "journ"
        ["journee"],  // after typing "journe"
        ["journee"],  // after typing "journee"
      ],
    ]
  },
  {
    id: "sentence-6",
    targetSentence: "Il a regarde lecran et tapote le bouton",
    words: ["Il", "a", "regarde", "lecran", "et", "tapote", "le", "bouton"],
    category: "Neutral",
    difficulty: "medium",
    wordCompletions: [
      [
        ["Il", "imprimees", "immediatement"],  // after typing "I"
        ["Il", "Ils"],  // after typing "Il"
      ],
      [
        ["a", "avec", "apres"],  // after typing "a"
      ],
      [
        ["regarde", "retard", "rapport"],  // after typing "r"
        ["regarde", "retard", "rempli"],  // after typing "re"
        ["regarde"],  // after typing "reg"
        ["regarde"],  // after typing "rega"
        ["regarde"],  // after typing "regar"
        ["regarde"],  // after typing "regard"
        ["regarde"],  // after typing "regarde"
      ],
      [
        ["lecran", "lair", "lait"],  // after typing "l"
        ["lecran", "lair", "lont"],  // after typing "le"
        ["lecran", "letagere"],  // after typing "lec"
        ["lecran"],  // after typing "lecr"
        ["lecran"],  // after typing "lecra"
        ["lecran"],  // after typing "lecran"
      ],
      [
        ["et", "envoye", "encore"],  // after typing "e"
        ["et"],  // after typing "et"
      ],
      [
        ["tapote", "tape", "train"],  // after typing "t"
        ["tapote", "tape", "table"],  // after typing "ta"
        ["tapote", "tape"],  // after typing "tap"
        ["tapote"],  // after typing "tapo"
        ["tapote"],  // after typing "tapot"
        ["tapote"],  // after typing "tapote"
      ],
      [
        ["le", "lair", "lait"],  // after typing "l"
        ["le", "Les", "Le"],  // after typing "le"
      ],
      [
        ["bouton", "bien", "bureau"],  // after typing "b"
        ["bouton"],  // after typing "bo"
        ["bouton"],  // after typing "bou"
        ["bouton"],  // after typing "bout"
        ["bouton"],  // after typing "bouto"
        ["bouton"],  // after typing "bouton"
      ],
    ]
  },
  {
    id: "sentence-7",
    targetSentence: "Ils ont marche jusquau magasin pour prendre du lait",
    words: ["Ils", "ont", "marche", "jusquau", "magasin", "pour", "prendre", "du", "lait"],
    category: "Neutral",
    difficulty: "medium",
    wordCompletions: [
      [
        ["Ils", "imprimees", "immediatement"],  // after typing "I"
        ["Ils", "Il"],  // after typing "Il"
        ["Ils"],  // after typing "Ils"
      ],
      [
        ["ont", "ouvert", "oublie"],  // after typing "o"
        ["ont"],  // after typing "on"
        ["ont"],  // after typing "ont"
      ],
      [
        ["marche", "magasin", "matin"],  // after typing "m"
        ["marche", "magasin", "machine"],  // after typing "ma"
        ["marche"],  // after typing "mar"
        ["marche"],  // after typing "marc"
        ["marche"],  // after typing "march"
        ["marche"],  // after typing "marche"
      ],
      [
        ["jusquau", "je", "jai"],  // after typing "j"
        ["jusquau", "juste"],  // after typing "ju"
        ["jusquau", "juste"],  // after typing "jus"
        ["jusquau"],  // after typing "jusq"
        ["jusquau"],  // after typing "jusqu"
        ["jusquau"],  // after typing "jusqua"
        ["jusquau"],  // after typing "jusquau"
      ],
      [
        ["magasin", "marche", "matin"],  // after typing "m"
        ["magasin", "marche", "machine"],  // after typing "ma"
        ["magasin"],  // after typing "mag"
        ["magasin"],  // after typing "maga"
        ["magasin"],  // after typing "magas"
        ["magasin"],  // after typing "magasi"
        ["magasin"],  // after typing "magasin"
      ],
      [
        ["pour", "pose", "piece"],  // after typing "p"
        ["pour", "pose", "porte"],  // after typing "po"
        ["pour"],  // after typing "pou"
        ["pour"],  // after typing "pour"
      ],
      [
        ["prendre", "pose", "piece"],  // after typing "p"
        ["prendre", "pres", "presentation"],  // after typing "pr"
        ["prendre"],  // after typing "pre"
        ["prendre"],  // after typing "pren"
        ["prendre"],  // after typing "prend"
        ["prendre"],  // after typing "prendr"
        ["prendre"],  // after typing "prendre"
      ],
      [
        ["du", "dans", "descends"],  // after typing "d"
        ["du"],  // after typing "du"
      ],
      [
        ["lait", "lair", "lecran"],  // after typing "l"
        ["lait", "lampadaire", "lave"],  // after typing "la"
        ["lait", "laisse", "laisser"],  // after typing "lai"
        ["lait"],  // after typing "lait"
      ],
    ]
  },
  {
    id: "sentence-8",
    targetSentence: "La piece semblait lumineuse et vraiment bien rangee",
    words: ["La", "piece", "semblait", "lumineuse", "et", "vraiment", "bien", "rangee"],
    category: "Neutral",
    difficulty: "medium",
    wordCompletions: [
      [
        ["La", "lair", "lait"],  // after typing "L"
        ["La", "lait", "lampadaire"],  // after typing "La"
      ],
      [
        ["piece", "pose", "pres"],  // after typing "p"
        ["piece"],  // after typing "pi"
        ["piece"],  // after typing "pie"
        ["piece"],  // after typing "piec"
        ["piece"],  // after typing "piece"
      ],
      [
        ["semblait", "sur", "sommes"],  // after typing "s"
        ["semblait", "secondes", "se"],  // after typing "se"
        ["semblait"],  // after typing "sem"
        ["semblait"],  // after typing "semb"
        ["semblait"],  // after typing "sembl"
        ["semblait"],  // after typing "sembla"
        ["semblait"],  // after typing "semblai"
        ["semblait"],  // after typing "semblait"
      ],
      [
        ["lumineuse", "lair", "lait"],  // after typing "l"
        ["lumineuse", "lumieres"],  // after typing "lu"
        ["lumineuse", "lumieres"],  // after typing "lum"
        ["lumineuse", "lumieres"],  // after typing "lumi"
        ["lumineuse"],  // after typing "lumin"
        ["lumineuse"],  // after typing "lumine"
        ["lumineuse"],  // after typing "lumineu"
        ["lumineuse"],  // after typing "lumineus"
        ["lumineuse"],  // after typing "lumineuse"
      ],
      [
        ["et", "envoye", "encore"],  // after typing "e"
        ["et"],  // after typing "et"
      ],
      [
        ["vraiment", "verrouiller", "vaisselle"],  // after typing "v"
        ["vraiment"],  // after typing "vr"
        ["vraiment"],  // after typing "vra"
        ["vraiment"],  // after typing "vrai"
        ["vraiment"],  // after typing "vraim"
        ["vraiment"],  // after typing "vraime"
        ["vraiment"],  // after typing "vraimen"
        ["vraiment"],  // after typing "vraiment"
      ],
      [
        ["bien", "bureau", "bouton"],  // after typing "b"
        ["bien"],  // after typing "bi"
        ["bien"],  // after typing "bie"
        ["bien"],  // after typing "bien"
      ],
      [
        ["rangee", "retard", "rapport"],  // after typing "r"
        ["rangee", "rapport"],  // after typing "ra"
        ["rangee"],  // after typing "ran"
        ["rangee"],  // after typing "rang"
        ["rangee"],  // after typing "range"
        ["rangee"],  // after typing "rangee"
      ],
    ]
  },
  {
    id: "sentence-9",
    targetSentence: "Elle a tape son message et envoye immediatement",
    words: ["Elle", "a", "tape", "son", "message", "et", "envoye", "immediatement"],
    category: "Neutral",
    difficulty: "medium",
    wordCompletions: [
      [
        ["Elle", "envoye", "encore"],  // after typing "E"
        ["Elle"],  // after typing "El"
        ["Elle"],  // after typing "Ell"
        ["Elle"],  // after typing "Elle"
      ],
      [
        ["a", "avec", "apres"],  // after typing "a"
      ],
      [
        ["tape", "train", "tour"],  // after typing "t"
        ["tape", "table", "tapote"],  // after typing "ta"
        ["tape", "tapote"],  // after typing "tap"
        ["tape"],  // after typing "tape"
      ],
      [
        ["son", "sur", "sommes"],  // after typing "s"
        ["son", "sommes", "sonneries"],  // after typing "so"
        ["son", "sonneries"],  // after typing "son"
      ],
      [
        ["message", "marche", "magasin"],  // after typing "m"
        ["message"],  // after typing "me"
        ["message"],  // after typing "mes"
        ["message"],  // after typing "mess"
        ["message"],  // after typing "messa"
        ["message"],  // after typing "messag"
        ["message"],  // after typing "message"
      ],
      [
        ["et", "envoye", "encore"],  // after typing "e"
        ["et"],  // after typing "et"
      ],
      [
        ["envoye", "encore", "ensoleille"],  // after typing "e"
        ["envoye", "encore", "entrer"],  // after typing "en"
        ["envoye", "environ"],  // after typing "env"
        ["envoye"],  // after typing "envo"
        ["envoye"],  // after typing "envoy"
        ["envoye"],  // after typing "envoye"
      ],
      [
        ["immediatement", "imprimees", "Ils"],  // after typing "i"
        ["immediatement", "imprimees"],  // after typing "im"
        ["immediatement"],  // after typing "imm"
        ["immediatement"],  // after typing "imme"
        ["immediatement"],  // after typing "immed"
        ["immediatement"],  // after typing "immedi"
        ["immediatement"],  // after typing "immedia"
        ["immediatement"],  // after typing "immediat"
        ["immediatement"],  // after typing "immediate"
        ["immediatement"],  // after typing "immediatem"
        ["immediatement"],  // after typing "immediateme"
        ["immediatement"],  // after typing "immediatemen"
        ["immediatement"],  // after typing "immediatement"
      ],
    ]
  },
  {
    id: "sentence-10",
    targetSentence: "Le train est arrive avec environ cinq minutes de retard",
    words: ["Le", "train", "est", "arrive", "avec", "environ", "cinq", "minutes", "de", "retard"],
    category: "Neutral",
    difficulty: "medium",
    wordCompletions: [
      [
        ["Le", "lair", "lait"],  // after typing "L"
        ["Le", "Les", "les"],  // after typing "Le"
      ],
      [
        ["train", "tape", "tour"],  // after typing "t"
        ["train"],  // after typing "tr"
        ["train"],  // after typing "tra"
        ["train"],  // after typing "trai"
        ["train"],  // after typing "train"
      ],
      [
        ["est", "envoye", "encore"],  // after typing "e"
        ["est", "essuyee"],  // after typing "es"
        ["est"],  // after typing "est"
      ],
      [
        ["arrive", "avec", "apres"],  // after typing "a"
        ["arrive"],  // after typing "ar"
        ["arrive"],  // after typing "arr"
        ["arrive"],  // after typing "arri"
        ["arrive"],  // after typing "arriv"
        ["arrive"],  // after typing "arrive"
      ],
      [
        ["avec", "apres", "a"],  // after typing "a"
        ["avec", "avons", "avant"],  // after typing "av"
        ["avec"],  // after typing "ave"
        ["avec"],  // after typing "avec"
      ],
      [
        ["environ", "envoye", "encore"],  // after typing "e"
        ["environ", "envoye", "entrer"],  // after typing "en"
        ["environ", "envoye"],  // after typing "env"
        ["environ"],  // after typing "envi"
        ["environ"],  // after typing "envir"
        ["environ"],  // after typing "enviro"
        ["environ"],  // after typing "environ"
      ],
      [
        ["cinq", "colis", "cesse"],  // after typing "c"
        ["cinq"],  // after typing "ci"
        ["cinq"],  // after typing "cin"
        ["cinq"],  // after typing "cinq"
      ],
      [
        ["minutes", "marche", "magasin"],  // after typing "m"
        ["minutes", "mise", "mis"],  // after typing "mi"
        ["minutes"],  // after typing "min"
        ["minutes"],  // after typing "minu"
        ["minutes"],  // after typing "minut"
        ["minutes"],  // after typing "minute"
        ["minutes"],  // after typing "minutes"
      ],
      [
        ["de", "du", "dans"],  // after typing "d"
        ["de", "descends", "devenu"],  // after typing "de"
      ],
      [
        ["retard", "rapport", "rempli"],  // after typing "r"
        ["retard", "rempli", "restes"],  // after typing "re"
        ["retard"],  // after typing "ret"
        ["retard"],  // after typing "reta"
        ["retard"],  // after typing "retar"
        ["retard"],  // after typing "retard"
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
      [
        ["Un", "une", "un"],  // after typing "U"
        ["Un", "une", "un"],  // after typing "Un"
      ],
      [
        ["chien", "colis", "cesse"],  // after typing "c"
        ["chien", "charger"],  // after typing "ch"
        ["chien"],  // after typing "chi"
        ["chien"],  // after typing "chie"
        ["chien"],  // after typing "chien"
      ],
      [
        ["aboyait", "avec", "apres"],  // after typing "a"
        ["aboyait"],  // after typing "ab"
        ["aboyait"],  // after typing "abo"
        ["aboyait"],  // after typing "aboy"
        ["aboyait"],  // after typing "aboya"
        ["aboyait"],  // after typing "aboyai"
        ["aboyait"],  // after typing "aboyait"
      ],
      [
        ["quelque", "que", "quelques"],  // after typing "q"
        ["quelque", "que", "quelques"],  // after typing "qu"
        ["quelque", "que", "quelques"],  // after typing "que"
        ["quelque", "quelques"],  // after typing "quel"
        ["quelque", "quelques"],  // after typing "quelq"
        ["quelque", "quelques"],  // after typing "quelqu"
        ["quelque", "quelques"],  // after typing "quelque"
      ],
      [
        ["part", "pose", "piece"],  // after typing "p"
        ["part", "partir", "parc"],  // after typing "pa"
        ["part", "partir", "pars"],  // after typing "par"
        ["part", "partir"],  // after typing "part"
      ],
      [
        ["au", "avec", "apres"],  // after typing "a"
        ["au", "aujourdhui"],  // after typing "au"
      ],
      [
        ["loin", "lair", "lait"],  // after typing "l"
        ["loin"],  // after typing "lo"
        ["loin"],  // after typing "loi"
        ["loin"],  // after typing "loin"
      ],
    ]
  },
  {
    id: "sentence-12",
    targetSentence: "Il a mis le dossier sur letagere du haut",
    words: ["Il", "a", "mis", "le", "dossier", "sur", "letagere", "du", "haut"],
    category: "Neutral",
    difficulty: "medium",
    wordCompletions: [
      [
        ["Il", "imprimees", "immediatement"],  // after typing "I"
        ["Il", "Ils"],  // after typing "Il"
      ],
      [
        ["a", "avec", "apres"],  // after typing "a"
      ],
      [
        ["mis", "marche", "magasin"],  // after typing "m"
        ["mis", "mise", "minutes"],  // after typing "mi"
        ["mis", "mise"],  // after typing "mis"
      ],
      [
        ["le", "lair", "lait"],  // after typing "l"
        ["le", "Les", "Le"],  // after typing "le"
      ],
      [
        ["dossier", "du", "dans"],  // after typing "d"
        ["dossier", "doucement"],  // after typing "do"
        ["dossier"],  // after typing "dos"
        ["dossier"],  // after typing "doss"
        ["dossier"],  // after typing "dossi"
        ["dossier"],  // after typing "dossie"
        ["dossier"],  // after typing "dossier"
      ],
      [
        ["sur", "sommes", "sa"],  // after typing "s"
        ["sur"],  // after typing "su"
        ["sur"],  // after typing "sur"
      ],
      [
        ["letagere", "lair", "lait"],  // after typing "l"
        ["letagere", "lair", "lecran"],  // after typing "le"
        ["letagere", "lecran"],  // after typing "let"
        ["letagere"],  // after typing "leta"
        ["letagere"],  // after typing "letag"
        ["letagere"],  // after typing "letage"
        ["letagere"],  // after typing "letager"
        ["letagere"],  // after typing "letagere"
      ],
      [
        ["du", "dans", "descends"],  // after typing "d"
        ["du"],  // after typing "du"
      ],
      [
        ["haut", "hier"],  // after typing "h"
        ["haut"],  // after typing "ha"
        ["haut"],  // after typing "hau"
        ["haut"],  // after typing "haut"
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