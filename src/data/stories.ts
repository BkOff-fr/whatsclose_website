export const narrativeData = {
  opening: {
    title: "Le commerce local s'éveille",
    subtitle: "Une nouvelle ère commence",
    description: "Dans les rues de Strasbourg, une révolution silencieuse transforme la façon dont nous connectons producteurs et consommateurs.",
  },
  disconnection: {
    title: "La Déconnexion",
    subtitle: "Un problème invisible mais omniprésent",
    problems: [
      {
        icon: "🏪",
        title: "Artisans Isolés",
        description: "Des producteurs talentueux restent dans l'ombre, incapables d'atteindre leurs clients idéaux.",
        stat: "73% des artisans peinent à vendre leur production"
      },
      {
        icon: "⏰",
        title: "Timing Manqué",
        description: "Horaires désynchronisés entre l'offre et la demande créent frustration et gaspillage.",
        stat: "30% des produits locaux finissent jetés"
      },
      {
        icon: "🔍",
        title: "Recherche Impossible",
        description: "Les consommateurs ne trouvent pas les produits locaux qu'ils désirent.",
        stat: "68% préféreraient acheter local mais ne savent pas où"
      },
      {
        icon: "💸",
        title: "Valeur Perdue",
        description: "Le travail artisanal n'est pas valorisé à sa juste valeur économique.",
        stat: "40% de marge perdue sur les produits locaux"
      }
    ]
  },
  vision: {
    title: "La Vision",
    subtitle: "Windows. Android. Whatsclose.",
    description: "Imaginez un système d'exploitation pour le commerce local. Une infrastructure invisible qui connecte, organise et optimise chaque interaction commerciale de proximité.",
    metaphors: [
      {
        before: "Ordinateur sans OS",
        after: "Windows révolutionne l'informatique",
        parallel: "Commerce local fragmenté → Whatsclose l'unifie"
      },
      {
        before: "Téléphones basiques",
        after: "Android connecte le monde",
        parallel: "Commerces isolés → Whatsclose les relie"
      }
    ]
  }
} as const;

export const protagonistStories = [
  {
    id: "marie",
    name: "Marie",
    role: "Boulangère Passionnée",
    avatar: "/avatars/marie.jpg",
    story: "Chaque matin à 4h, Marie pétrit ses pains avec amour. Mais combien partira à la poubelle ce soir ?",
    problem: "Production incertaine",
    solution: "Commandes garanties avant production"
  },
  {
    id: "thomas",
    name: "Thomas",
    role: "Consommateur Engagé",
    avatar: "/avatars/thomas.jpg",
    story: "Thomas veut soutenir les producteurs locaux mais ne sait jamais quoi commander ni quand.",
    problem: "Découverte complexe",
    solution: "Notifications personnalisées et suggestions intelligentes"
  },
  {
    id: "sophie",
    name: "Sophie",
    role: "Restauratrice",
    avatar: "/avatars/sophie.jpg",
    story: "Sophie cherche des ingrédients frais pour son restaurant mais les commandes sont imprévisibles.",
    problem: "Approvisionnement chaotique",
    solution: "Planning partagé et flux optimisés"
  },
  {
    id: "jean",
    name: "Jean",
    role: "Maraîcher",
    avatar: "/avatars/jean.jpg",
    story: "Jean cultive des légumes bio mais ne sait jamais combien produire selon la demande.",
    problem: "Planification impossible",
    solution: "Demande prévisible et production adaptée"
  }
] as const;