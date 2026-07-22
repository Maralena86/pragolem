import type { BlogPost } from "../types/blog";

// [PLACEHOLDER] Blog body content is realistic placeholder markdown for future CMS migration.
export const blogPostsData: BlogPost[] = [
  // [PLACEHOLDER] English blog post 1
  {
    id: "blog-old-town-facts-en",
    slug: {
      en: "10-things-old-town-square-prague",
      fr: "10-choses-place-vieille-ville-prague",
    },
    locale: "en",
    attributes: {
      title: "10 Things You Didn't Know About Prague's Old Town Square",
      excerpt:
        "From medieval market drama to hidden political symbols, discover 10 surprising facts that make Old Town Square far more than a photo stop.",
      content: `# 10 Things You Didn't Know About Prague's Old Town Square

Prague's Old Town Square is one of the most photographed places in Europe, but most visitors only scratch the surface. If you want to understand why this square matters, you need to read it as a timeline carved into stone.

## 1) It was once a major international marketplace
Long before tourism, merchants from across Central Europe traded here. The square grew because Prague sat on important commercial routes.

## 2) The architecture is a visual history lesson
Gothic, Renaissance and Baroque styles stand side by side. Each facade reflects a different period of wealth, religion or political change.

## 3) The Astronomical Clock is political as well as technical
People focus on mechanics, but the clock also reflects medieval worldviews, public authority and civic prestige.

## 4) Executions shaped Czech memory here
The square witnessed public punishments and political violence, especially after key uprisings.

## 5) Týn Church was central to religious conflict
Its silhouette is iconic, but its historical role in confessional tensions is even more important.

## 6) The square changed function many times
Market space, ceremonial stage, protest site and tourism hub: each phase left visible traces.

## 7) House signs were practical navigation tools
Before modern numbering, symbols helped residents and visitors identify buildings.

## 8) Urban planning erased and reinvented streets
Some medieval lanes vanished, while new alignments changed movement patterns in the area.

## 9) It is a perfect starting point for context
If you understand this square, the rest of Prague becomes easier to read.

## 10) A guided walk reveals what static plaques cannot
A strong free walking tour in Prague connects monuments to lived history, helping details finally make sense.

Want to go deeper? Join our **Old Town & Jewish Quarter** route and continue with Prague's layered story on foot.`,
      featuredImage: {
        url: "/images/placeholders/blog-old-town-facts.jpg",
        alt: "Prague Old Town Square at sunrise",
      },
      author: "Lucas",
      publishedAt: "2026-02-10",
      readingTimeMinutes: 5,
      seo: {
        metaTitle: "10 Things You Didn't Know About Prague's Old Town Square | Pragolem",
        metaDescription:
          "Discover hidden stories behind Prague Old Town Square and see why a guided walking tour reveals far more than the classic postcard view.",
        ogImage: "/images/placeholders/og-blog-old-town-facts.jpg",
      },
    },
    relationships: {
      relatedTours: {
        data: [{ id: "tour-old-town-en", type: "tour", slug: "old-town-free-tour", locale: "en" }],
      },
    },
  },
  // [PLACEHOLDER] French blog post 1
  {
    id: "blog-old-town-facts-fr",
    slug: {
      en: "10-things-old-town-square-prague",
      fr: "10-choses-place-vieille-ville-prague",
    },
    locale: "fr",
    attributes: {
      title: "10 Choses Que Vous Ne Saviez Pas Sur la Place de la Vieille-Ville de Prague",
      excerpt:
        "Entre anecdotes médiévales, architecture et mémoire politique, découvrez pourquoi la place de la Vieille-Ville mérite bien plus qu'une simple photo.",
      content: `# 10 Choses Que Vous Ne Saviez Pas Sur la Place de la Vieille-Ville de Prague

La place de la Vieille-Ville est incontournable, mais beaucoup de visiteurs la traversent sans comprendre ce qu'elle raconte vraiment. Voici dix clés pour la lire autrement.

## 1) C'était un centre commercial majeur
Au Moyen Âge, des marchands de toute l'Europe centrale y négociaient leurs marchandises.

## 2) Les façades forment une chronologie urbaine
Gothique, Renaissance, baroque: chaque style révèle une période de transformation politique et sociale.

## 3) L'horloge astronomique est aussi un symbole de pouvoir
Au-delà de la technique, elle représente l'autorité civique et la vision du monde de son époque.

## 4) La place a été un théâtre politique
Des événements violents et des décisions majeures de l'histoire tchèque s'y sont joués.

## 5) L'église de Týn reflète les tensions religieuses
Sa présence monumentale rappelle le rôle de Prague dans les conflits confessionnels européens.

## 6) La fonction du lieu a changé au fil des siècles
Marché, scène officielle, lieu de rassemblement, pôle touristique: la place s'est constamment réinventée.

## 7) Les enseignes de maison servaient d'adresse
Avant la numérotation moderne, on identifiait les bâtiments par des symboles visibles.

## 8) L'urbanisme a modifié les circulations
Certaines rues anciennes ont disparu, d'autres ont été redessinées.

## 9) C'est un excellent point de départ pour visiter Prague
Comprendre cette place aide à mieux lire les autres quartiers historiques.

## 10) Une visite guidée donne du sens aux détails
Un guide replace les monuments dans une histoire cohérente, vivante et mémorable.

Pour aller plus loin, rejoignez notre **free tour Vieille Ville & Quartier Juif** et découvrez Prague avec un vrai fil conducteur historique.`,
      featuredImage: {
        url: "/images/placeholders/blog-old-town-facts.jpg",
        alt: "Place de la Vieille-Ville à Prague tôt le matin",
      },
      author: "Lucas",
      publishedAt: "2026-02-10",
      readingTimeMinutes: 5,
      seo: {
        metaTitle:
          "10 Choses Que Vous Ne Saviez Pas Sur la Place de la Vieille-Ville de Prague | Pragolem",
        metaDescription:
          "Explorez les coulisses historiques de la place de la Vieille-Ville et comprenez Prague avec une approche guidée claire et passionnante.",
        ogImage: "/images/placeholders/og-blog-old-town-facts-fr.jpg",
      },
    },
    relationships: {
      relatedTours: {
        data: [
          {
            id: "tour-old-town-fr",
            type: "tour",
            slug: "free-tour-vieille-ville",
            locale: "fr",
          },
        ],
      },
    },
  },
  // [PLACEHOLDER] English blog post 2
  {
    id: "blog-free-vs-private-en",
    slug: {
      en: "free-tour-vs-private-tour-prague",
      fr: "free-tour-ou-visite-privee-prague",
    },
    locale: "en",
    attributes: {
      title: "Free Tour vs Private Tour in Prague: Which Should You Choose?",
      excerpt:
        "Not sure whether to book a free walking tour or a private guide in Prague? Here is a practical comparison based on budget, depth, and flexibility.",
      content: `# Free Tour vs Private Tour in Prague: Which Should You Choose?

If you are planning your first days in Prague, this decision matters. Both options are valuable, but they serve different travel goals.

## Choose a free tour if you want...
- A strong city introduction at flexible cost
- A social group atmosphere
- A structured route covering major highlights
- Great value during short stays

A free walking tour Prague format works best when you want orientation quickly. You pay what you wish at the end, which makes it budget-friendly without sacrificing quality.

## Choose a private tour if you want...
- A fully custom itinerary
- Deeper thematic focus (architecture, Jewish history, Cold War, etc.)
- Flexible start time and pacing
- Dedicated attention for your group

Private tours are ideal for families, corporate teams, students, and travelers with specific interests or mobility constraints.

## Budget comparison
A free tour has no fixed upfront ticket. A private tour has fixed pricing, but you gain personalization, scheduling control and route customization.

## Time efficiency
Private tours can save significant time because logistics are planned around your needs. Free tours follow a shared structure and pace.

## Final recommendation
If you are in Prague for 2-3 days, start with a free tour to build context. Then add a private tour if you want deeper exploration of selected topics or neighborhoods.

At Pragolem, many visitors combine both: **Old Town Free Tour** first, then a **Private Guided Tour** for tailored depth.`,
      featuredImage: {
        url: "/images/placeholders/blog-free-vs-private.jpg",
        alt: "Small private group and larger public walking tour in Prague",
      },
      author: "Nathan",
      publishedAt: "2026-02-14",
      readingTimeMinutes: 4,
      seo: {
        metaTitle: "Free Tour vs Private Tour in Prague: Which Should You Choose? | Pragolem",
        metaDescription:
          "Compare free walking tours and private guided tours in Prague. Learn which format fits your budget, schedule, and travel goals.",
        ogImage: "/images/placeholders/og-blog-free-vs-private.jpg",
      },
    },
    relationships: {
      relatedTours: {
        data: [
          { id: "tour-old-town-en", type: "tour", slug: "old-town-free-tour", locale: "en" },
          { id: "tour-private-en", type: "tour", slug: "private-tours", locale: "en" },
        ],
      },
    },
  },
  // [PLACEHOLDER] French blog post 2
  {
    id: "blog-free-vs-private-fr",
    slug: {
      en: "free-tour-vs-private-tour-prague",
      fr: "free-tour-ou-visite-privee-prague",
    },
    locale: "fr",
    attributes: {
      title: "Free Tour ou Visite Privée à Prague : Que Choisir ?",
      excerpt:
        "Vous hésitez entre free tour et visite privée à Prague ? Voici un comparatif clair selon votre budget, vos attentes et votre rythme.",
      content: `# Free Tour ou Visite Privée à Prague : Que Choisir ?

Pour organiser un séjour à Prague, ce choix change vraiment l'expérience. Les deux formats sont utiles, mais ils ne répondent pas aux mêmes besoins.

## Le free tour est idéal si vous cherchez...
- Une excellente introduction à Prague à prix libre
- Une ambiance de groupe conviviale
- Un parcours structuré avec les incontournables
- Un format flexible pour un court séjour

Un free tour à Prague fonctionne très bien pour se repérer rapidement et comprendre les grandes bases historiques.

## La visite privée est idéale si vous cherchez...
- Un itinéraire 100 % personnalisé
- Un niveau de profondeur plus ciblé
- Un horaire flexible
- Une attention dédiée à votre groupe

La visite privée convient particulièrement aux familles, groupes scolaires, entreprises ou voyageurs avec besoins spécifiques.

## Question budget
Le free tour n'impose pas de prix fixe au départ. La visite privée a un tarif défini, mais vous gagnez en confort, en adaptation et en efficacité.

## Question temps
Une visite privée peut faire gagner du temps grâce à une logistique pensée pour vous. Un free tour suit un rythme collectif.

## Notre conseil pratique
Pour un premier séjour de 2 à 3 jours, commencez par un free tour pour poser les bases, puis ajoutez une visite privée si vous voulez approfondir un thème précis.

Chez Pragolem, beaucoup de voyageurs combinent les deux: **free tour Vieille Ville** puis **visite privée sur mesure**.`,
      featuredImage: {
        url: "/images/placeholders/blog-free-vs-private.jpg",
        alt: "Comparaison entre visite de groupe et visite privée à Prague",
      },
      author: "Lucas",
      publishedAt: "2026-02-14",
      readingTimeMinutes: 4,
      seo: {
        metaTitle: "Free Tour ou Visite Privée à Prague : Que Choisir ? | Pragolem",
        metaDescription:
          "Comparez free tour et visite privée à Prague pour choisir le format le plus adapté à votre budget, votre temps et vos objectifs.",
        ogImage: "/images/placeholders/og-blog-free-vs-private-fr.jpg",
      },
    },
    relationships: {
      relatedTours: {
        data: [
          {
            id: "tour-old-town-fr",
            type: "tour",
            slug: "free-tour-vieille-ville",
            locale: "fr",
          },
          { id: "tour-private-fr", type: "tour", slug: "visites-privees", locale: "fr" },
        ],
      },
    },
  },
  // [PLACEHOLDER] English blog post 3
  {
    id: "blog-french-guide-prague-en",
    slug: {
      en: "french-speakers-guide-to-prague",
      fr: "guide-de-prague-pour-les-francophones",
    },
    locale: "en",
    attributes: {
      title: "A French Speaker's Guide to Prague",
      excerpt:
        "Practical cultural tips, French-friendly recommendations, and historical links between France and Bohemia for francophone travelers.",
      content: `# A French Speaker's Guide to Prague

Prague is one of the most rewarding capitals for francophone travelers, especially if you want culture, walkability, and layered history in one compact city.

## Why Prague feels familiar to many French visitors
The city's urban fabric reflects centuries of European exchange. Gothic and Baroque references often resonate with travelers who know Paris, Strasbourg or Lyon. You also find historical links through dynastic networks and intellectual circulation.

## A key historical bridge: Charles IV and Paris
Charles IV studied in Paris and absorbed strong French influences before shaping Prague as an imperial capital. This connection helps explain why Prague's medieval development fits naturally into a broader European narrative.

## Practical tips for francophones
- Book core activities early in high season
- Use walking tours to orient yourself on day one
- Combine Old Town and Castle routes for full context
- Keep cash for small purchases, but card is widely accepted
- Plan calm morning slots for major landmarks

## Cultural etiquette
Czechs are often direct and polite rather than overly expressive at first contact. A simple greeting and respectful tone go a long way.

## Where a guide adds value
If your priority is depth, a French-speaking guide in Prague helps bridge local context quickly. This is especially useful for the Jewish Quarter, castle history, and political turning points.

For many travelers, the best formula is simple: start with a **free tour in French in Prague**, then add one private or thematic experience for deeper exploration.`,
      featuredImage: {
        url: "/images/placeholders/blog-french-guide-prague.jpg",
        alt: "Francophone travelers overlooking Prague Castle",
      },
      author: "Lucas",
      publishedAt: "2026-02-20",
      readingTimeMinutes: 5,
      seo: {
        metaTitle: "A French Speaker's Guide to Prague | Pragolem",
        metaDescription:
          "Planning Prague as a francophone traveler? Discover practical tips, cultural context, and the best French-speaking tour options in Prague.",
        ogImage: "/images/placeholders/og-blog-french-guide-prague.jpg",
      },
    },
    relationships: {
      relatedTours: {
        data: [
          { id: "tour-old-town-en", type: "tour", slug: "old-town-free-tour", locale: "en" },
          { id: "tour-private-en", type: "tour", slug: "private-tours", locale: "en" },
        ],
      },
    },
  },
  // [PLACEHOLDER] French blog post 3
  {
    id: "blog-french-guide-prague-fr",
    slug: {
      en: "french-speakers-guide-to-prague",
      fr: "guide-de-prague-pour-les-francophones",
    },
    locale: "fr",
    attributes: {
      title: "Guide de Prague pour les Francophones",
      excerpt:
        "Conseils pratiques, repères culturels et liens historiques entre la France et la Bohême pour réussir votre séjour à Prague en français.",
      content: `# Guide de Prague pour les Francophones

Prague est une destination particulièrement adaptée aux voyageurs francophones: ville compacte, patrimoine exceptionnel, ambiance vivante et coût souvent plus doux que d'autres capitales européennes.

## Pourquoi Prague plaît aux visiteurs français
La ville combine une forte densité historique et une vraie lisibilité urbaine. En quelques quartiers, vous passez du gothique au baroque, puis à l'époque moderne, sans perdre le fil.

## Le lien historique France - Bohême
Un repère majeur est Charles IV, formé en partie à Paris avant de faire de Prague un centre politique et culturel de premier plan. Ce lien aide à replacer Prague dans une histoire européenne familière pour un public francophone.

## Conseils pratiques avant votre arrivée
- Réservez vos activités clés en avance en haute saison
- Commencez par une visite guidée pour vous orienter
- Privilégiez les premières heures pour les sites très fréquentés
- Prévoyez de bonnes chaussures (pavés fréquents)
- Combinez Vieille Ville et Château pour une vision complète

## Quelques repères culturels
Les Tchèques sont souvent sobres et courtois dans les interactions. Un contact simple, direct et respectueux fonctionne très bien.

## Pourquoi choisir un guide francophone à Prague
Un guide francophone permet de gagner du temps, d'éviter les explications approximatives et de mieux comprendre les grands enjeux historiques de la ville.

Pour un séjour équilibré, l'idéal est souvent de commencer par un **free tour français à Prague**, puis d'ajouter une visite privée si vous souhaitez approfondir un thème précis.`,
      featuredImage: {
        url: "/images/placeholders/blog-french-guide-prague.jpg",
        alt: "Vue de Prague pour les voyageurs francophones",
      },
      author: "Lucas",
      publishedAt: "2026-02-20",
      readingTimeMinutes: 5,
      seo: {
        metaTitle: "Guide de Prague pour les Francophones | Pragolem",
        metaDescription:
          "Préparez votre voyage à Prague avec des conseils concrets pour francophones, des repères historiques et les meilleures options de visite guidée en français.",
        ogImage: "/images/placeholders/og-blog-french-guide-prague-fr.jpg",
      },
    },
    relationships: {
      relatedTours: {
        data: [
          {
            id: "tour-old-town-fr",
            type: "tour",
            slug: "free-tour-vieille-ville",
            locale: "fr",
          },
          { id: "tour-private-fr", type: "tour", slug: "visites-privees", locale: "fr" },
        ],
      },
    },
  },
];
