import type { Tour } from "../types/tour";

// [PLACEHOLDER] All textual content and media URLs in this file are realistic placeholders
// intended for later replacement through Strapi CMS.
export const toursData: Tour[] = [
  // [PLACEHOLDER] French content for Private Guided Tours
  {
    id: "tour-private-fr",
    slug: {
      en: "private-tours",
      fr: "visites-privees",
    },
    locale: "fr",
    attributes: {
      title: "Visites Privées à Prague (Sur Mesure)",
      shortDescription:
        "Des visites guidées privées à Prague pour familles, groupes scolaires et entreprises, avec devis clair et parcours personnalisé.",
      longDescription: `Nos visites privées à Prague sont pensées pour les voyageurs qui veulent un accompagnement sur mesure, un rythme flexible et un vrai niveau de personnalisation. Contrairement à un format collectif classique, chaque itinéraire est conçu selon vos priorités: histoire, architecture, culture locale, organisation logistique ou objectifs professionnels. C'est la meilleure option si vous cherchez un guide francophone à Prague pour un groupe, une famille ou une entreprise, avec un cadre clair et un tarif fixe.

La préparation commence par un échange court mais précis. Nous recueillons vos dates, la taille du groupe, vos contraintes horaires, le niveau de marche souhaité et les thèmes qui vous intéressent. Ensuite, nous proposons une trame adaptée: découverte essentielle, parcours historique approfondi, journée orientée patrimoine, ou formule mixte entre monuments majeurs et quartiers moins touristiques. Vous validez la proposition avant la visite, sans surprise de dernière minute.

Ce format fonctionne particulièrement bien pour les événements d'entreprise, les délégations professionnelles et les groupes étudiants. Pour les entreprises, nous pouvons coordonner un départ depuis l'hotel ou le lieu de conférence et respecter un timing serré. Pour les écoles et universités, nous adaptons le niveau de narration et la dynamique du groupe. Pour les familles intergénérationnelles, nous construisons des séquences plus souples avec des pauses utiles. L'objectif est toujours le meme: une expérience fluide, riche et confortable.

Les visites privées permettent aussi d'ajouter des options pratiques: conseils restaurants selon votre quartier, recommandations culturelles ciblées, itinéraire pour l'apres-midi, et orientation précise pour optimiser le reste du séjour. Vous pouvez choisir un programme concentré (2-3 heures) ou une journée plus ambitieuse combinant Vieille Ville, quartier juif, Malá Strana et Château de Prague.

Si vous recherchez une visite guidée privée à Prague en français, Pragolem propose une approche humaine et rigoureuse: guides certifiés, contenu sérieux, adaptation réelle au groupe et communication directe. Envoyez-nous vos attentes et nous préparons un parcours cohérent avec votre agenda. C'est la solution idéale pour les voyageurs qui veulent gagner du temps, éviter les parcours standardisés et vivre Prague avec un regard local.`,
      heroImage: {
        url: "/images/tours/tour_private.webp",
        alt: "Groupe privé accompagné d'un guide dans le centre historique de Prague",
      },
      duration: "PT3H",
      durationDisplay: "Flexible (2h à journée complète)",
      languages: ["fr", "en"],
      maxGroupSize: 40,
      priceType: "paid",
      isPrivate: true,
      timeSlots: [
        { valueTime: "10:00", labelTimeKey: "timeSlots.slot1000" },
        { valueTime: "14:00", labelTimeKey: "timeSlots.slot1400" },
      ],
      meetingPoint: {
        address: "Sur mesure (hotel, entreprise ou point central)",
        description:
          "Le point de rendez-vous final est confirmé apres validation de l'itinéraire.",
        latitude: 50.087,
        longitude: 14.421,
        googleMapsUrl: "https://www.google.com/maps/place/Pragolem/@50.0880329,14.4206504,16z/data=!3m1!4b1!4m6!3m5!1s0x470b95b05e564ad7:0x424f120f71a9b415!8m2!3d50.0880329!4d14.4206504!16s%2Fg%2F11xl02djfm!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D",
      },
      itinerary: [
        {
          order: 1,
          name: "Brief de préparation",
          description:
            "Définition des objectifs, contraintes et thématiques de la visite privée.",
          durationMinutes: 30,
        },
        {
          order: 2,
          name: "Accueil personnalisé",
          description:
            "Rendez-vous à l'hotel, au bureau ou au point convenu.",
          durationMinutes: 10,
        },
        {
          order: 3,
          name: "Premier segment guidé",
          description:
            "Parcours principal selon votre angle de visite (histoire, architecture, culture).",
          durationMinutes: 90,
        },
        {
          order: 4,
          name: "Pause et ajustements",
          description:
            "Temps de questions-réponses et adaptation du rythme selon le groupe.",
          durationMinutes: 20,
        },
        {
          order: 5,
          name: "Second segment thématique",
          description:
            "Suite du parcours vers un quartier complémentaire ou un sujet spécifique.",
          durationMinutes: 60,
        },
        {
          order: 6,
          name: "Clôture et recommandations",
          description:
            "Conseils personnalisés pour la suite du séjour à Prague.",
          durationMinutes: 10,
        },
      ],
      practicalInfo: {
        whatToBring: [
          "Chaussures confortables",
          "Eau",
          "Documents utiles pour groupes scolaires/entreprises",
          "Vos priorités de visite",
        ],
        accessibility:
          "L'itinéraire est ajusté selon la mobilité du groupe, avec alternatives adaptées si besoin.",
        weatherPolicy:
          "Plan B intégré en cas de météo défavorable, avec options partiellement en intérieur.",
        childFriendly:
          "Oui, avec adaptation du rythme et du format narratif selon l'âge des participants.",
        tipSuggestion:
          "Les visites privées sont à tarif fixe; les pourboires restent totalement facultatifs.",
        paymentMethods: ["Virement bancaire", "Lien de paiement carte", "Espèces sur accord"],
      },
      seo: {
        metaTitle:
          "Visite Privée à Prague en Français | Groupes & Entreprises | Pragolem",
        metaDescription:
          "Visite guidée privée et sur mesure à Prague avec un guide francophone certifié. Idéal pour groupes, entreprises et familles.",
        ogImage: "/images/placeholders/og-private-tours-fr.jpg",
        keywords: [
          "visite privée Prague français",
          "guide francophone Prague",
          "visite guidée privée Prague",
          "visite entreprise Prague",
          "tour sur mesure Prague",
        ],
      },
    },
    relationships: {
      guide: {
        data: [
      
      {
        id: "guide-lucas-en",
        type: "guide",
        slug: "lucas",
        locale: "en",
      }
    ],
      },
      relatedTours: {
        data: [
          {
            id: "tour-old-town-fr",
            type: "tour",
            slug: "free-tour-vieille-ville",
            locale: "fr",
          },
          {
            id: "tour-castle-fr",
            type: "tour",
            slug: "free-tour-chateau-prague",
            locale: "fr",
          },
        ],
      },
    },
  },
  // [PLACEHOLDER] English content for Private Guided Tours
  {
    id: "tour-private-en",
    slug: {
      en: "private-tours",
      fr: "visites-privees",
    },
    locale: "en",
    attributes: {
      title: "Private Guided Tours in Prague (Custom)",
      shortDescription:
        "Tailor-made private tours for families, student groups, and corporate visits with fixed pricing and flexible planning.",
      longDescription: `Our private Prague tours are built for travelers who need flexibility, depth, and logistics that match their schedule. Unlike a standard group format, private tours are designed around your pace, interests, and practical constraints. We work with couples, families, school groups, business delegations, and event planners who want an expert guide in English or French and a route that actually fits the day. If you want to compare a walking tour Prague style experience with a fully custom option, this is where private guidance adds real value.

The process begins with a short planning exchange. We ask about your dates, preferred duration, mobility needs, historical interests, and whether you want major landmarks, hidden streets, or thematic focus areas. From there, we propose a route and timing plan with transparent fixed pricing. You can choose a classic highlights program, a history-focused deep dive, or a specialty walk built around architecture, Jewish heritage, religious conflict, Habsburg Prague, Cold War memory, or modern urban life.

Private tours are also ideal for professional contexts. For corporate groups and business visitors, we can coordinate start points near hotels or conference venues and keep timing strict for tight schedules. For student groups, we adapt storytelling level and include more interactive segments to maintain attention. For multi-generational families, we reduce transitions and insert practical comfort breaks. The objective is always the same: relevant content, smooth pacing, and a warm human connection with your guide.

Because this is custom work, we can include add-ons like museum entry planning, neighborhood food recommendations, and post-tour route notes. We can also combine Old Town, Jewish Quarter, Lesser Town, and Prague Castle in one coherent day, or split them into thematic sessions over multiple days. You decide the structure, and we help you avoid common planning mistakes that cost time on the ground.

If you are searching for private guided tours in Prague with genuine local expertise, Pragolem offers a practical and personal approach. Pricing is fixed, communication is direct, and each itinerary is built with care rather than copied from a template. Send us your dates, group size, and priorities, and we will prepare a proposal that fits your trip goals.`,
      heroImage: {
        url: "/images/tours/tour_private.webp",
        alt: "Private group with guide overlooking Prague from a terrace",
      },
      duration: "PT3H",
      durationDisplay: "Flexible (2h to full day)",
      languages: ["en", "fr"],
      maxGroupSize: 40,
      priceType: "paid",
      isPrivate: true,
      timeSlots: [
        { valueTime: "10:00", labelTimeKey: "timeSlots.slot1000" },
        { valueTime: "14:00", labelTimeKey: "timeSlots.slot1400" },
      ],
      meetingPoint: {
        address: "Custom (hotel, office, or central meeting point)",
        description:
          "Final meeting instructions are confirmed after booking based on your itinerary.",
        latitude: 50.087,
        longitude: 14.421,
        googleMapsUrl: "https://www.google.com/maps/place/Pragolem/@50.0880329,14.4206504,16z/data=!3m1!4b1!4m6!3m5!1s0x470b95b05e564ad7:0x424f120f71a9b415!8m2!3d50.0880329!4d14.4206504!16s%2Fg%2F11xl02djfm!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D",
      },
      itinerary: [
        {
          order: 1,
          name: "Pre-Tour Planning Call",
          description:
            "Define objectives, schedule, language, and route priorities with your guide.",
          durationMinutes: 30,
        },
        {
          order: 2,
          name: "Custom Pick-Up",
          description:
            "Meet at your hotel, office, or agreed central point for immediate start.",
          durationMinutes: 10,
        },
        {
          order: 3,
          name: "Core Route Segment",
          description:
            "Focused guided walk through your chosen district(s) and historical themes.",
          durationMinutes: 90,
        },
        {
          order: 4,
          name: "Comfort & Q&A Break",
          description:
            "Pause for questions, practical recommendations, and pacing adjustments.",
          durationMinutes: 20,
        },
        {
          order: 5,
          name: "Second Thematic Segment",
          description:
            "Continue with a complementary neighborhood or topic selected in advance.",
          durationMinutes: 60,
        
        },
        {
          order: 6,
          name: "Wrap-Up & Next Steps",
          description:
            "Receive curated recommendations for food, museums, and self-guided follow-up.",
          durationMinutes: 10,
        },
      ],
      practicalInfo: {
        whatToBring: [
          "Comfortable shoes",
          "Water",
          "Any required student/corporate documents",
          "Questions and interests for your custom itinerary",
        ],
        accessibility:
          "Route is tailored to your group's mobility profile, including low-step alternatives when needed.",
        weatherPolicy:
          "Weather contingency options are built into planning, including indoor alternatives when required.",
        childFriendly:
          "Yes. We adapt duration, storytelling style, and stop frequency for families.",
        tipSuggestion:
          "Private tours use fixed pricing. Tips are optional and never expected.",
        paymentMethods: ["Bank transfer", "Card payment link", "Cash by arrangement"],
      },
      seo: {
        metaTitle: "Private Guided Tours in Prague | Corporate & Group Tours | Pragolem",
        metaDescription:
          "Book custom private tours in Prague for groups, families, students, and companies. Fixed pricing, flexible routes, certified local guides.",
        ogImage: "/images/placeholders/og-private-tours.jpg",
        keywords: [
          "private tour Prague",
          "corporate tours Prague",
          "group tours Prague",
          "custom guided tour Prague",
          "Prague private guide",
        ],
      },
    },
    relationships: {
      guide: {
        data: [
      {
        id: "guide-nathan-en",
        type: "guide",
        slug: "nathan",
        locale: "en",
      },
      {
        id: "guide-lucas-en",
        type: "guide",
        slug: "lucas",
        locale: "en",
      },
    ],
      },
      relatedTours: {
        data: [
          {
            id: "tour-old-town-en",
            type: "tour",
            slug: "old-town-free-tour",
            locale: "en",
          },
          {
            id: "tour-castle-en",
            type: "tour",
            slug: "prague-castle-free-tour",
            locale: "en",
          },
        ],
      },
    },
  },
  // [PLACEHOLDER] English content for Old Town & Jewish Quarter Free Tour
  {
    id: "tour-old-town-en",
    slug: {
      en: "old-town-free-tour",
      fr: "free-tour-vieille-ville",
    },
    locale: "en",
    attributes: {
      title: "Walking Tour: Old Town & Jewish Quarter",
      shortDescription:
        "Our tour of the Old Town of Prague and the Jewish Quarter covers a lot of Medieval history - from when Prague was the capital of an empire -, as well as the fascinating history of the Jewish Quarter.",
      longDescription: `We cover the history of the Old Town and Jewish Quarter start to finish: a complete tour with a specific emphasis on the Medieval Golden Age of the city. Including the more obvious highlights of things like the Astronomical Clock, but also making sure we don't miss the blood and guts, the ghosts, the tyrants - the gory details that have given birth to the Mother of Cities.

      We start on the Old Town Square, and then move through the ages to take in the architecture, the various changes that have altered the appearance of the city, and what lies behind. From there, we progress through the Jewish Quarter, full of legends that blend into historical fact.

      Because - what is history? A collection of stories re-told for generations - some of which have become myth, some of which have become established fact. But the key is to unravel the tapestry. The truth is not which story you believe. It's how the narrative is created, and what it means today.`,


      heroImage: {
        url: "/images/tours/jan_hus_brown.webp",
        alt: "Old Town Square and rooftops near Prague's historic center",
      },
      duration: "PT3H",
      durationDisplay: "~3 hours",
      languages: ["en", "fr"],
      maxGroupSize: 24,
      priceType: "free",
      timeSlots: [
        { valueTime: "10:00", labelTimeKey: "timeSlots.slot1000" },
      ],
      meetingPoint: {
        address: "Old Town Square,",
        description:
          " opposite the Cartier store.",
        latitude: 50.087,
        longitude: 14.4208,
        googleMapsUrl: "https://www.google.com/maps/place/Pragolem/@50.0880329,14.4206504,16z/data=!3m1!4b1!4m6!3m5!1s0x470b95b05e564ad7:0x424f120f71a9b415!8m2!3d50.0880329!4d14.4206504!16s%2Fg%2F11xl02djfm!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D",
      },
    

      itinerary: [
        {
          order: 1,
          // name: "Old Town Square",
          name: "Rudolfinum",
          description:
            "Origins of the medieval market square, civic power, and architectural layers from Gothic to Baroque.",
          durationMinutes: 25,
        },
        {
          order: 2,
          name: "Old Town Square",
          // name: "Astronomical Clock",
          description:
            "How the clock works, what each dial means, and why it became Prague's most recognized symbol.",
          durationMinutes: 20,
        },
        {
          order: 3,
          // name: "Church of Our Lady before Týn",
          name: "Prague Jewish Quarter",
          description:
            "Religious tensions, reform movements, and the square's role in confessional politics.",
          durationMinutes: 15,
        },
        {
          order: 4,
          // name: "Celetná Street & University Quarter",
          name: "The Bethlehem Chapel",
          description:
            "Royal routes, Charles University, and the city as an intellectual center in Central Europe.",
          durationMinutes: 20,
        },
        {
          order: 5,
          // name: "Josefov Synagogues",
          name: "Týnský dvůr - Ungelt",
          description:
            "History of Prague's Jewish community through worship spaces, legal reforms, and urban change.",
          durationMinutes: 30,
        },
        {
          order: 6,
          name: "Staroměstská radnice",
          // name: "Old Jewish Cemetery Area",
          description:
            "Burial traditions, memory, and the preservation of one of Europe's most significant Jewish sites.",
          durationMinutes: 20,
        },
        {
          order: 7,
          name: "The Old-New Synagogue",
          // name: "Pařížská Avenue Contrast",
          description:
            "From old quarter streets to modern boulevard planning and the transformation of city identity.",
          durationMinutes: 15,
        },
        {
          order: 8,
          name: "History of Prague and some myths",
          // name: "Charles Bridge Approach",
          description:
            "Strategic importance of river crossings and tips for exploring nearby viewpoints after the tour.",
          durationMinutes: 15,
        },
        {
          order: 9,
          name: "How to read the astronomical clock",
          // name: "Charles Bridge Approach",
          description:
            "",
          durationMinutes: 15,
        },
        {
          order: 10,
          name: "How to avoid tourist traps",
          // name: "Charles Bridge Approach",
          description:
            "",
          durationMinutes: 15,
        },
        {
          order: 11,
          name: "Tips about Prague",
          // name: "Charles Bridge Approach",
          description:
            "",
          durationMinutes: 15,
        },
        {
          order: 12,
          name: "The House at the Black Madonna",
          description:
            "",
          durationMinutes: 15,
        },
        {
          order: 13,
          name: "The Estates Theatre",
          description:"",
          durationMinutes: 15,
        },
        {
          order: 14,
          name: "Klementinum",
          description:"",          
          durationMinutes: 15,
        },
        {
          order: 15,
          name: "Faculty of Arts",
          description:"",          
          durationMinutes: 15,
        },
        {
          order: 16,
          name: "Prague Astronomical Clock",
          description:"",          
          durationMinutes: 15,
        },
        {
          order: 17,
          name: "Karolinum",
          description:"",          
          durationMinutes: 15,
        },
        {
          order: 18,
          name: "Spanish Synagogue",
          description:"",          
          durationMinutes: 15,
        },
        {
          order: 19,
          name: "History of the Jewish people in Prague",
          description:"",          
          durationMinutes: 15,
        },
        {
          order: 20,
          name: "History of the Hussite Wars",
          description:"",          
          durationMinutes: 15,
        },
        {
          order: 21,
          name: "History of religion in the Czech lands",
          description:"",          
          durationMinutes: 15,
        },
      ],
      practicalInfo: {
        whatToBring: [
          "Comfortable walking shoes",
          "Water bottle",
          "Weather-appropriate jacket",
          "Contactless card or cash for personal expenses",
        ],
        accessibility:
          "Route includes cobblestones and uneven surfaces; wheelchair users can join with prior notice for adjusted pacing.",
        weatherPolicy:
          "Tours run in light rain and cold weather. In severe storms or safety alerts, we contact all booked guests to reschedule.",
        childFriendly:
          "Recommended for children 10+ who are comfortable walking for up to three hours with short standing stops.",
        tipSuggestion:
          "Pay what you wish. Most guests contribute based on satisfaction, typically the equivalent of 15-25 EUR per adult.",
        paymentMethods: ["Cash (CZK/EUR)", "Card tap", "Revolut transfer"],
      },
      seo: {
        metaTitle: "Walking Tour: Prague Old Town & Jewish Quarter | Pragolem",
        metaDescription:
          "Join a 3-hour  walking tour in Prague Old Town and Jewish Quarter with certified local guides. Pay what you wish. Reserve your spot today.",
        ogImage: "/images/placeholders/og-old-town-tour.jpg",
        keywords: [
          "walking tour Prague",
          "Prague Old Town tour",
          "Prague Jewish Quarter tour",
          "pay what you wish Prague",
          "Prague guided tour",
        ],
      },
    },
    relationships: {
      guide: {
        data: [
      {
        id: "guide-nathan-en",
        type: "guide",
        slug: "nathan",
        locale: "en",
      },
      {
        id: "guide-lucas-en",
        type: "guide",
        slug: "lucas",
        locale: "en",
      },
    ],
      },
      relatedTours: {
        data: [
          {
            id: "tour-castle-en",
            type: "tour",
            slug: "prague-castle-free-tour",
            locale: "en",
          },
          {
            id: "tour-private-en",
            type: "tour",
            slug: "private-tours",
            locale: "en",
          },
        ],
      },
    },
  },
  // [PLACEHOLDER] French content for Old Town & Jewish Quarter Free Tour
  {
    id: "tour-old-town-fr",
    slug: {
      en: "old-town-free-tour",
      fr: "free-tour-vieille-ville",
    },
    locale: "fr",
    attributes: {
      title: "Tour Prague: Vieille Ville & Quartier Juif",
      shortDescription:
        // "Une visite guidée gratuite de 3 heures au coeur de Prague: Vieille Ville, horloge astronomique et quartier juif.",
        "Notre visite de la Vieille Ville de Prague et du Quartier juif couvre une grande partie de l’histoire médiévale de la ville — à l’époque où Prague était la capitale d’un empire — ainsi que l’histoire fascinante du Quartier juif.",
//       longDescription: `Si vous cherchez un tour en français à Prague qui combine les incontournables et une vraie profondeur historique, cet itinéraire est idéal pour commencer votre séjour. Pendant environ trois heures, nous parcourons à pied la Vieille Ville, les ruelles de Josefov et l'approche du Pont Charles, avec un rythme confortable et des pauses régulières. Ce n'est pas une récitation scolaire: c'est une visite guidée vivante, adaptée au groupe, à vos questions et à vos centres d'intérêt.

// Nous démarrons sur la place de la Vieille Ville, l'un des espaces urbains les plus emblématiques d'Europe centrale. En quelques minutes, vous voyez déjà plusieurs siècles d'histoire superposés: maisons marchandes médiévales, façades baroques, édifices gothiques et traces des bouleversements politiques tchèques. Devant l'horloge astronomique, nous expliquons bien plus que le mécanisme: pourquoi cet objet est devenu un symbole de Prague, ce qu'il raconte sur la relation entre science, religion et pouvoir, et comment l'histoire locale s'inscrit dans les dynamiques européennes.

// Nous continuons ensuite vers le quartier juif, un lieu essentiel pour comprendre la ville au-dela des cartes postales. Plutôt que d'aligner les monuments sans contexte, nous reconstituons l'évolution de Josefov: la vie communautaire, les périodes de restrictions, les transformations urbaines et les mémoires du XXe siècle. Vous découvrez les synagogues et l'environnement du vieux cimetière juif avec des explications claires, humaines et respectueuses. Cette partie de la visite est souvent celle qui marque le plus les voyageurs francophones.

// L'une des forces de Pragolem est de relier les anecdotes de rue aux grands épisodes de l'histoire tchèque et européenne. Vous comprenez pourquoi certaines places ont changé de rôle, comment les conflits religieux ont façonné Prague et de quelle manière la ville est devenue un carrefour culturel. A la fin, vous repartez avec des repères concrets, une chronologie enfin lisible et des recommandations pratiques pour continuer votre découverte en autonomie.

// Ce free tour Prague français convient tres bien aux premiers séjours, aux couples, aux voyageurs solo et aux familles qui aiment les récits incarnés. Le principe est simple: visite guidée gratuite a prix libre. Vous donnez ce qui vous semble juste selon votre satisfaction et votre budget. Si vous comparez les options de visite guidée gratuite à Prague, cette balade est une excellente porte d'entrée pour comprendre la ville en profondeur, dès le premier jour.`,
      longDescription: `Nous retraçons l’histoire de la Vieille Ville et du Quartier juif du début à la fin : une visite complète, avec un accent particulier sur l’âge d’or médiéval de la ville. Nous découvrirons les incontournables, comme l’Horloge astronomique, tout en veillant à ne pas passer à côté du sang et des violences, des fantômes, des tyrans — tous ces détails macabres qui ont contribué à façonner la « Mère des villes ».

      Nous commençons sur la place de la Vieille Ville, puis traversons les différentes époques pour découvrir l’architecture, les transformations successives qui ont modifié l’apparence de la ville, ainsi que ce qui se cache derrière. De là, nous poursuivons à travers le Quartier juif, où les légendes se mêlent aux faits historiques.

      Car, qu’est-ce que l’Histoire ? Une collection de récits racontés et transmis de génération en génération — certains devenus des mythes, d’autres établis comme des faits. Mais l’essentiel est de démêler cette tapisserie. La vérité ne réside pas dans l’histoire que vous choisissez de croire. Elle réside dans la manière dont le récit s’est construit, et dans ce qu’il signifie aujourd’hui.
`,
      heroImage: {
        url: "/images/tours/jan_hus_brown.webp",
        alt: "Place de la Vieille Ville et toits historiques de Prague",
      },
      duration: "PT3H",
      durationDisplay: "~3 heures",
      languages: ["fr", "en"],
      maxGroupSize: 24,
      priceType: "free",
      timeSlots: [
        { valueTime: "10:00", labelTimeKey: "timeSlots.slot1000" },
      ],
      meetingPoint: {
        address: "Place de la vieille ville face au magasin Cartier",
        description:
          "",
        latitude: 50.087,
        longitude: 14.4208,
        googleMapsUrl: "https://www.google.com/maps/place/Pragolem/@50.0880329,14.4206504,16z/data=!3m1!4b1!4m6!3m5!1s0x470b95b05e564ad7:0x424f120f71a9b415!8m2!3d50.0880329!4d14.4206504!16s%2Fg%2F11xl02djfm!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D",
      },
      itinerary: [
        {
          order: 1,
          // name: "Old Town Square",
          name: "Rudolfinum",
          description:
            "Origins of the medieval market square, civic power, and architectural layers from Gothic to Baroque.",
          durationMinutes: 25,
        },
        {
          order: 2,
          name: "Old Town Square",
          // name: "Astronomical Clock",
          description:
            "How the clock works, what each dial means, and why it became Prague's most recognized symbol.",
          durationMinutes: 20,
        },
        {
          order: 3,
          // name: "Church of Our Lady before Týn",
          name: "Prague Jewish Quarter",
          description:
            "Religious tensions, reform movements, and the square's role in confessional politics.",
          durationMinutes: 15,
        },
        {
          order: 4,
          // name: "Celetná Street & University Quarter",
          name: "The Bethlehem Chapel",
          description:
            "Royal routes, Charles University, and the city as an intellectual center in Central Europe.",
          durationMinutes: 20,
        },
        {
          order: 5,
          // name: "Josefov Synagogues",
          name: "Týnský dvůr - Ungelt",
          description:
            "History of Prague's Jewish community through worship spaces, legal reforms, and urban change.",
          durationMinutes: 30,
        },
        {
          order: 6,
          name: "Staroměstská radnice",
          // name: "Old Jewish Cemetery Area",
          description:
            "Burial traditions, memory, and the preservation of one of Europe's most significant Jewish sites.",
          durationMinutes: 20,
        },
        {
          order: 7,
          name: "The Old-New Synagogue",
          // name: "Pařížská Avenue Contrast",
          description:
            "From old quarter streets to modern boulevard planning and the transformation of city identity.",
          durationMinutes: 15,
        },
        {
          order: 8,
          name: "History of Prague and some myths",
          // name: "Charles Bridge Approach",
          description:
            "Strategic importance of river crossings and tips for exploring nearby viewpoints after the tour.",
          durationMinutes: 15,
        },
        {
          order: 9,
          name: "How to read the astronomical clock",
          // name: "Charles Bridge Approach",
          description:
            "",
          durationMinutes: 15,
        },
        {
          order: 10,
          name: "How to avoid tourist traps",
          // name: "Charles Bridge Approach",
          description:
            "",
          durationMinutes: 15,
        },
        {
          order: 11,
          name: "Tips about Prague",
          // name: "Charles Bridge Approach",
          description:
            "",
          durationMinutes: 15,
        },
        {
          order: 12,
          name: "The House at the Black Madonna",
          description:
            "",
          durationMinutes: 15,
        },
        {
          order: 13,
          name: "The Estates Theatre",
          description:"",
          durationMinutes: 15,
        },
        {
          order: 14,
          name: "Klementinum",
          description:"",          
          durationMinutes: 15,
        },
        {
          order: 15,
          name: "Faculty of Arts",
          description:"",          
          durationMinutes: 15,
        },
        {
          order: 16,
          name: "Prague Astronomical Clock",
          description:"",          
          durationMinutes: 15,
        },
        {
          order: 17,
          name: "Karolinum",
          description:"",          
          durationMinutes: 15,
        },
        {
          order: 18,
          name: "Spanish Synagogue",
          description:"",          
          durationMinutes: 15,
        },
        {
          order: 19,
          name: "History of the Jewish people in Prague",
          description:"",          
          durationMinutes: 15,
        },
        {
          order: 20,
          name: "History of the Hussite Wars",
          description:"",          
          durationMinutes: 15,
        },
        {
          order: 21,
          name: "History of religion in the Czech lands",
          description:"",          
          durationMinutes: 15,
        },
      ],
      practicalInfo: {
        whatToBring: [
          "Chaussures confortables",
          "Bouteille d'eau",
          "Veste adaptée a la météo",
          "Carte bancaire ou espèces pour vos dépenses personnelles",
        ],
        accessibility:
          "Présence de pavés et de surfaces irrégulieres; possible avec adaptation du rythme sur demande préalable.",
        weatherPolicy:
          "La visite a lieu meme en cas de pluie légère. En cas d'orage violent, nous vous proposons un report.",
        childFriendly:
          "Convient aux enfants de 10 ans et plus habitués a marcher pendant environ trois heures.",
        tipSuggestion:
          "Visite a prix libre: la plupart des participants donnent selon leur satisfaction, souvent entre 15 et 25 EUR par adulte.",
        paymentMethods: ["Espèces (CZK/EUR)", "Carte sans contact", "Virement Revolut"],
      },
      seo: {
        metaTitle:
          "Visite guidée à Prague en Français - Vieille Ville & Quartier Juif | Pragolem",
        metaDescription:
          "Découvrez la Vieille Ville de Prague et le Quartier Juif avec un guide francophone certifié. Visite guidée gratuite à prix libre de 3h.",
        ogImage: "/images/placeholders/og-old-town-tour-fr.jpg",
        keywords: [
          "free tour français à Prague",
          "visite guidée gratuite Prague",
          "quartier juif Prague visite",
          "vieille ville Prague guide francophone",
          "free tour Prague français",
        ],
      },
    },
    relationships: {
      guide: {
        data: [
      {
        id: "guide-lucas-en",
        type: "guide",
        slug: "lucas",
        locale: "en",
      }
    ],
      },
      relatedTours: {
        data: [
          {
            id: "tour-castle-fr",
            type: "tour",
            slug: "free-tour-chateau-prague",
            locale: "fr",
          },
          {
            id: "tour-private-fr",
            type: "tour",
            slug: "visites-privees",
            locale: "fr",
          },
        ],
      },
    },
  },
  // [PLACEHOLDER] English content for Prague Castle & Lesser Town Free Tour
  {
    id: "tour-castle-en",
    slug: {
      en: "prague-castle-free-tour",
      fr: "free-tour-chateau-prague",
    },
    locale: "en",
    attributes: {
      title: "Walking Tour: Prague Castle, Lesser Town & Charles Bridge",
      shortDescription:
        "Come see the glamorous, palatial settings of Prague Castle, and then descend with us to the mystical Lesser Town, the real soul of Prague - and then the Bridge: the symbol of the city, and a beguiling example of Medieval architecture.",
      longDescription: 

      `We start with a panoramic view of the city, before immersing ourselves in the Imperial history of Prague. Get to know Prague from where it all started. The Castle of the genesis of the city, filled with anecdotes, rumours, gossip, myths and legends - but also the end of the story. The Castle the seat of presidential power.
      
      From here, we descend into the murky, grim, fascinating, creepy, but, above all, beautiful Lesser Town. This is the seductive face of the city - the piece where you can get behind the facades of the tourist traps, the souvenir shops and the dreaded trdelník. It is a special feeling in the Lesser Town.
      
      And finally the Bridge. Charles Bridge is justly celebrated as a jewel preserved from the Middle Ages. But there is more to this monumental architectural achievement than immediately meets the eye. Discover it with us.`,
      heroImage: {
        url: "/images/tours/sv_vit_brown.webp",
        alt: "View of Prague Castle above Lesser Town rooftops",
      },
      duration: "PT3H",
      durationDisplay: "~3 hours",
      languages: ["en", "fr"],
      maxGroupSize: 24,
      priceType: "free",
      timeSlots: [
        { valueTime: "14:00", labelTimeKey: "timeSlots.slot1400" },
      ],
      meetingPoint: {
        address: "Exit of the Malostranská metro ",
        description: "Malostranská",
        latitude: 50.0865,
        longitude: 14.4113,
        googleMapsUrl: "https://www.google.com/maps/search/50.090793,+14.409621?entry=tts&g_ep=EgoyMDI1MDYyMy4yIPu8ASoASAFQAw%3D%3D&skid=e19b13e3-1c6f-4fb2-ae68-59f2276a3343",
      },
      itinerary: [
        {
          order: 1,
          name: "Lennon Wall",
          description:
            "Origines du pont et son rôle dans la circulation, le commerce et les cérémonies.",
          durationMinutes: 20,
        },
        {
          order: 2,
          name: "Černín Palace",
          description:
            "Statues, inondations, restaurations et anecdotes historiques majeures.",
          durationMinutes: 20,
        },
        {
          order: 3,
          name: "The Black Tower",
          description:
            "Comprendre l'identité aristocratique et diplomatique du quartier.",
          durationMinutes: 15,
        },
        {
          order: 4,
          name: "Charles Bridge",
          description:
            "Enseignes de maisons, métiers et quotidien des habitants proches du Château.",
          durationMinutes: 25,
        },
        {
          order: 5,
          name: "Prague Castle",
          description:
            "Grandes périodes du site, de la forteresse médiévale au complexe étatique actuel.",
          durationMinutes: 35,
        },
        {
          order: 6,
          name: "CHistory and General Information about Saint Vitus Cathedral",
          description:
            "Lecture historique et symbolique, avec conseils pratiques de visite.",
          durationMinutes: 25,
        },
        {
          order: 7,
          name: "History and General Information about Lesser Town",
          description:
            "Panorama sur Prague pour situer les quartiers et préparer vos visites suivantes.",
          durationMinutes: 20,
        },
        {
          order: 8,
          name: "General Prague information and tips",
          description:
            "Conseils personnalisés: jardins, cafés, musées et itinéraires de fin de journée.",
          durationMinutes: 10,
        },
        {
          order: 9,
          name: "Loreto",
          description:
            "Conseils personnalisés: jardins, cafés, musées et itinéraires de fin de journée.",
          durationMinutes: 10,
        },
        {
          order: 10,
          name: "Virgin Mary under Chain",
          description:
            "Conseils personnalisés: jardins, cafés, musées et itinéraires de fin de journée.",
          durationMinutes: 10,
        },
        {
          order: 11,
          name: "St. George's Basilica",
          description:
            "Conseils personnalisés: jardins, cafés, musées et itinéraires de fin de journée.",
          durationMinutes: 10,
        },
        {
          order: 12,
          name: "St. Vitus Cathedral",
          description:
            "Conseils personnalisés: jardins, cafés, musées et itinéraires de fin de journée.",
          durationMinutes: 10,
        },
        {
          order: 13,
          name: "History and General Information about Prague Castle",
          description:
            "Conseils personnalisés: jardins, cafés, musées et itinéraires de fin de journée.",
          durationMinutes: 10,
        },
        {
          order: 14,
          name: "Walk through Lesser Town",
          description:
            "Conseils personnalisés: jardins, cafés, musées et itinéraires de fin de journée.",
          durationMinutes: 10,
        },
        {
          order: 15,
          name: "Visit to the Castle Gardens (in summer)",
          description:
            "Conseils personnalisés: jardins, cafés, musées et itinéraires de fin de journée.",
          durationMinutes: 10,
        },
        {
          order: 16,
          name: "Histoire et Information générale sur le Pont Charles",
          description:
            "Conseils personnalisés: jardins, cafés, musées et itinéraires de fin de journée.",
          durationMinutes: 10,
        },
        {
          order: 17,
          name: "How to avoid tourist traps",
          description:
            "Conseils personnalisés: jardins, cafés, musées et itinéraires de fin de journée.",
          durationMinutes: 10,
        },
      ],
      practicalInfo: {
        whatToBring: [
          "Comfortable shoes with grip",
          "Water",
          "Layered clothing for hill and wind exposure",
          "Phone battery for photos and maps",
        ],
        accessibility:
          "Includes uphill segments and cobblestones. We can suggest alternative paths for reduced-mobility guests.",
        weatherPolicy:
          "Runs in normal rain and cold conditions. Severe weather may trigger a delay or route adjustment.",
        childFriendly:
          "Suitable for motivated children; the route includes climbs and longer standing explanations.",
        tipSuggestion:
          "Pay what you wish. Typical contributions range between 15-25 EUR per adult depending on satisfaction.",
        paymentMethods: ["Cash (CZK/EUR)", "Card tap", "Revolut transfer"],
      },
      seo: {
        metaTitle:
          "Walking Tour: Prague Castle, Lesser Town & Charles Bridge | Pragolem",
        metaDescription:
          "Explore Prague Castle, Lesser Town and Charles Bridge with a certified local guide. 3-hour pay-what-you-wish walking tour.",
        ogImage: "/images/placeholders/og-castle-tour.jpg",
        keywords: [
          "tour Prague Castle",
          "Charles Bridge walking tour",
          "Lesser Town Prague tour",
          "Prague Castle walking tour",
          "Prague guided tours",
        ],
      },
    },
    relationships: {
      guide: {
        data: [
      {
        id: "guide-nathan-en",
        type: "guide",
        slug: "nathan",
        locale: "en",
      },
      {
        id: "guide-lucas-en",
        type: "guide",
        slug: "lucas",
        locale: "en",
      },
    ],
      },
      relatedTours: {
        data: [
          {
            id: "tour-old-town-en",
            type: "tour",
            slug: "old-town-free-tour",
            locale: "en",
          },
          {
            id: "tour-private-en",
            type: "tour",
            slug: "private-tours",
            locale: "en",
          },
        ],
      },
    },
  },
  // [PLACEHOLDER] French content for Prague Castle & Lesser Town Free Tour
  {
    id: "tour-castle-fr",
    slug: {
      en: "prague-castle-free-tour",
      fr: "free-tour-chateau-prague",
    },
    locale: "fr",
    attributes: {
      title: "Tour Château de Prague, Malá Strana & Pont Charles",
      shortDescription:
     
        "Découvrez les somptueux palais et les décors grandioses du Château de Prague, puis descendez avec nous vers la mystérieuse Mala Strana, véritable âme de Prague. Nous poursuivrons jusqu’au Pont Charles, symbole emblématique de la ville et remarquable chef-d’œuvre de l’architecture médiévale.",
      longDescription: 
      `Nous commençons par une vue panoramique sur la ville, avant de nous plonger dans l’histoire impériale de Prague. Découvrez Prague depuis l’endroit où tout a commencé : le Château, berceau de la ville, riche en anecdotes, rumeurs, commérages, mythes et légendes — mais aussi là où l’histoire se poursuit, puisque le Château est aujourd’hui encore le siège du pouvoir présidentiel.

      De là, nous descendons vers la Mala Strana, mystérieuse, sombre, fascinante, parfois inquiétante, mais surtout magnifique. C’est le visage le plus séduisant de la ville — celui qui permet de voir au-delà des façades, des pièges à touristes, des boutiques de souvenirs et du fameux, parfois redouté, trdelník. Il y a quelque chose de particulier à Mala Strana.

      Et enfin, le Pont. Le Pont Charles est à juste titre considéré comme un joyau préservé du Moyen Âge. Mais derrière cette réalisation architecturale monumentale se cache bien plus que ce que l’on peut voir au premier regard. Découvrez-le avec nous.`,
      heroImage: {
        url: "/images/tours/sv_vit_brown.webp",
        alt: "Vue du Château de Prague depuis les hauteurs de Malá Strana",
      },
      duration: "PT3H",
      durationDisplay: "~3 heures",
      languages: ["fr", "en"],
      maxGroupSize: 24,
      priceType: "free",
      timeSlots: [
        { valueTime: "14:00", labelTimeKey: "timeSlots.slot1400" },
      ],
      meetingPoint: {
        address: "Malostranská ",
        description: "Sortie du métro Malostranská ",
        latitude: 50.0865,
        longitude: 14.4113,
        googleMapsUrl: "https://www.google.com/maps/search/50.090793,+14.409621?entry=tts&g_ep=EgoyMDI1MDYyMy4yIPu8ASoASAFQAw%3D%3D&skid=e19b13e3-1c6f-4fb2-ae68-59f2276a3343"},
      itinerary: [
        {
          order: 1,
          name: "Lennon Wall",
          description:
            "Origines du pont et son rôle dans la circulation, le commerce et les cérémonies.",
          durationMinutes: 20,
        },
        {
          order: 2,
          name: "Černín Palace",
          description:
            "Statues, inondations, restaurations et anecdotes historiques majeures.",
          durationMinutes: 20,
        },
        {
          order: 3,
          name: "The Black Tower",
          description:
            "Comprendre l'identité aristocratique et diplomatique du quartier.",
          durationMinutes: 15,
        },
        {
          order: 4,
          name: "Charles Bridge",
          description:
            "Enseignes de maisons, métiers et quotidien des habitants proches du Château.",
          durationMinutes: 25,
        },
        {
          order: 5,
          name: "Prague Castle",
          description:
            "Grandes périodes du site, de la forteresse médiévale au complexe étatique actuel.",
          durationMinutes: 35,
        },
        {
          order: 6,
          name: "CHistory and General Information about Saint Vitus Cathedral",
          description:
            "Lecture historique et symbolique, avec conseils pratiques de visite.",
          durationMinutes: 25,
        },
        {
          order: 7,
          name: "History and General Information about Lesser Town",
          description:
            "Panorama sur Prague pour situer les quartiers et préparer vos visites suivantes.",
          durationMinutes: 20,
        },
        {
          order: 8,
          name: "General Prague information and tips",
          description:
            "Conseils personnalisés: jardins, cafés, musées et itinéraires de fin de journée.",
          durationMinutes: 10,
        },
        {
          order: 9,
          name: "Loreto",
          description:
            "Conseils personnalisés: jardins, cafés, musées et itinéraires de fin de journée.",
          durationMinutes: 10,
        },
        {
          order: 10,
          name: "Virgin Mary under Chain",
          description:
            "Conseils personnalisés: jardins, cafés, musées et itinéraires de fin de journée.",
          durationMinutes: 10,
        },
        {
          order: 11,
          name: "St. George's Basilica",
          description:
            "Conseils personnalisés: jardins, cafés, musées et itinéraires de fin de journée.",
          durationMinutes: 10,
        },
        {
          order: 12,
          name: "St. Vitus Cathedral",
          description:
            "Conseils personnalisés: jardins, cafés, musées et itinéraires de fin de journée.",
          durationMinutes: 10,
        },
        {
          order: 13,
          name: "History and General Information about Prague Castle",
          description:
            "Conseils personnalisés: jardins, cafés, musées et itinéraires de fin de journée.",
          durationMinutes: 10,
        },
        {
          order: 14,
          name: "Walk through Lesser Town",
          description:
            "Conseils personnalisés: jardins, cafés, musées et itinéraires de fin de journée.",
          durationMinutes: 10,
        },
        {
          order: 15,
          name: "Visit to the Castle Gardens (in summer)",
          description:
            "Conseils personnalisés: jardins, cafés, musées et itinéraires de fin de journée.",
          durationMinutes: 10,
        },
        {
          order: 16,
          name: "Histoire et Information générale sur le Pont Charles",
          description:
            "Conseils personnalisés: jardins, cafés, musées et itinéraires de fin de journée.",
          durationMinutes: 10,
        },
        {
          order: 17,
          name: "How to avoid tourist traps",
          description:
            "Conseils personnalisés: jardins, cafés, musées et itinéraires de fin de journée.",
          durationMinutes: 10,
        },
      ],
      practicalInfo: {
        whatToBring: [
          "Chaussures confortables avec bonne adhérence",
          "Eau",
          "Vêtements superposables selon la météo",
          "Téléphone chargé pour photos et cartes",
        ],
        accessibility:
          "Le parcours inclut des montées et des pavés; un itinéraire adapté peut être proposé sur demande.",
        weatherPolicy:
          "La visite est maintenue en cas de pluie légère. En cas de météo extrême, un report est proposé.",
        childFriendly:
          "Accessible aux enfants motivés, avec quelques portions en montée.",
        tipSuggestion:
          "Visite à prix libre. Contribution habituelle selon satisfaction: environ 15-25 EUR par adulte.",
        paymentMethods: ["Espèces (CZK/EUR)", "Carte sans contact", "Virement Revolut"],
      },
      seo: {
        metaTitle:
          "Tour Château de Prague - Malá Strana & Pont Charles | Pragolem",
        metaDescription:
          "Explorez le Château de Prague, Malá Strana et le Pont Charles avec un guide francophone. Visite gratuite à prix libre de 3 heures.",
        ogImage: "/images/placeholders/og-castle-tour-fr.jpg",
        keywords: [
          "tour château Prague français",
          "visite château Prague en français",
          "Malá Strana visite guidée",
          "Pont Charles visite",
          "guide francophone Prague",
        ],
      },
    },
    relationships: {
      guide: {
        data: [
      
      {
        id: "guide-lucas-en",
        type: "guide",
        slug: "lucas",
        locale: "en",
      }
    ],
      },
      relatedTours: {
        data: [
          {
            id: "tour-old-town-fr",
            type: "tour",
            slug: "free-tour-vieille-ville",
            locale: "fr",
          },
          {
            id: "tour-private-fr",
            type: "tour",
            slug: "visites-privees",
            locale: "fr",
          },
        ],
      },
    },
  },
  
  
];
