import type { Guide } from "../types/guide";

// [PLACEHOLDER] Guide profile text is realistic placeholder copy for future Strapi migration.
export const guidesData: Guide[] = [
  // [PLACEHOLDER] English profile for Lucas
  {
    id: "guide-lucas-en",
    slug: "lucas",
    locale: "en",
    attributes: {
      name: "Lucas",
      photo: {
        url: "/images/guides/lucas.webp",
        alt: "Lucas smiling during a walking tour in Prague",
      },
      role: "Co-founder & Certified Guide",
      languages: ["French", "English"],
      shortBio:
        // "Lucas is a Colombian-born architect educated in Paris who has lived in Prague for more than a decade. He leads French, English and Spanish tours with a strong focus on making Czech history accessible, vivid and personally relevant for every group.",
        "Lucas studied architecture in Paris, but discovered that the toilets in Prague are clean, and moved. He has been living in the city for over a decade, and can give a clear-sighted view on how the city has changed, on top of the history, the myths, the legends. Witty and loquacious, you get more than you expect with Lucas.",
      fullBio: `Lucas grew up in Colombia and later trained as an architect in Paris, where he developed a long-term fascination with European urban history. More than ten years ago, he moved to Prague and quickly realized the city offered the ideal combination of layered architecture, political complexity, and daily street life that never stops surprising people. He eventually became a certified guide and co-founded Pragolem with a clear goal: share Prague with rigor, warmth, and genuine curiosity.

On tour, Lucas is known for connecting Czech history to broader European narratives in ways that feel clear rather than academic. Guests often mention how naturally he links Charles IV, the Habsburg period, Napoleonic context, and modern Czech identity without losing the group in dates. As an architect, he also helps visitors read buildings as living documents, explaining why facades, street widths, and urban planning choices reveal social and political change over time.

Lucas regularly guides in French and English, he adapts each route to the profile of the group: first-time travelers who want orientation, history enthusiasts who want depth, or families who prefer a practical and story-driven format. His approach combines historical accuracy, practical recommendations, and conversational pacing. He believes a great visit should feel intellectually satisfying and human at the same time.

Outside tours, Lucas continues independent research, walks new corners of the city, and updates his narratives with fresh examples so returning travelers always discover something new.`,
      quote:
        "A lot of people are doing it because it can pay well, and because it can come across as easy. It's not. It's not an easy job, at least if you want to be good at it. But it's a beautiful job.",
      tourLanguages: "French and English Tours",
      yearsInPrague: 11,
    },
    relationships: {
      tours: {
        data: [
          { id: "tour-old-town-en", type: "tour", slug: "old-town-free-tour", locale: "en" },
          { id: "tour-private-en", type: "tour", slug: "private-tours", locale: "en" },
        ],
      },
    },
  },
  // [PLACEHOLDER] French profile for Lucas
  {
    id: "guide-lucas-fr",
    slug: "lucas",
    locale: "fr",
    attributes: {
      name: "Lucas",
      photo: {
        url: "/images/guides/lucas.webp",
        alt: "Lucas souriant pendant une visite guidée à Prague",
      },
      role: "Co-fondateur & Guide Certifié",
      languages: ["Français", "Anglais", "Espagnol"],
      shortBio:
        "Né en Colombie et formé à Paris en architecture, Lucas vit à Prague depuis plus de dix ans. Il guide en français, anglais et espagnol, avec une approche passionnée qui relie l'histoire tchèque aux grandes dynamiques européennes.",
      fullBio: `Lucas est né en Colombie puis a étudié l'architecture à Paris, où il a développé une passion durable pour l'histoire urbaine européenne. En s'installant à Prague il y a plus de dix ans, il a découvert une ville capable de raconter plusieurs siècles en quelques rues: Moyen Âge, empire, modernité, mémoire politique. Cette richesse l'a conduit à devenir guide certifié, puis à co-fonder Pragolem avec l'idée simple de proposer des visites sincères, exigeantes et profondément humaines.

Sa spécialité est de rendre l'histoire accessible sans la simplifier à outrance. Pendant ses visites, Lucas relie naturellement l'histoire tchèque à l'histoire française et européenne: Charles IV, les dynamiques impériales, les périodes de conflit religieux, les grandes continuités urbaines. Son regard d'architecte lui permet aussi d'expliquer la ville par ses volumes, ses perspectives, ses matériaux et ses transformations successives, ce qui aide les voyageurs à lire Prague autrement.

Lucas guide en français, en anglais et en espagnol. Il adapte chaque visite au profil du groupe: voyageurs qui découvrent Prague pour la première fois, passionnés d'histoire, familles, groupes d'amis ou entreprises. Son style combine précision historique, anecdotes incarnées et conseils pratiques immédiatement utiles pour le reste du séjour.

En dehors des visites, il continue de documenter la ville, d'explorer de nouveaux parcours et d'actualiser ses contenus. Sa conviction est constante: une bonne visite ne consiste pas à réciter des dates, mais à transmettre un regard vivant sur Prague.`,
      quote:
        "Beaucoup se lancent parce que cela semble facile et rentable. Ce n'est pas un métier facile, du moins si l'on veut bien le faire. Mais c'est un très beau métier.",
      tourLanguages: "Visites en Français, Anglais et Espagnol",
      yearsInPrague: 11,
    },
    relationships: {
      tours: {
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
          { id: "tour-private-fr", type: "tour", slug: "visites-privees", locale: "fr" },
        ],
      },
    },
  },
  // [PLACEHOLDER] English profile for Nathan
  {
    id: "guide-nathan-en",
    slug: "nathan",
    locale: "en",
    attributes: {
      name: "Nathan",
      photo: {
        url: "/images/guides/nathan.webp",
        alt: "Nathan guiding a group near Charles Bridge",
      },
      role: "Co-founder & Certified Guide",
      languages: ["English"],
      shortBio:
        // "Nathan is a British guide based in Prague for over seven years. He studied English literature and Russian, and is known for sharp historical storytelling, especially on religious conflict, defenestrations and the politics that shaped Czech lands.",
        "Nathan is British, but fell in love with Prague many years ago, when Lucas and he studied Czech together at Charles University. Interested in language and literature, Nathan's tours have a heavier focus on Medieval politics, and the grim and the real from the various historical periods. Prepare for defenestrations and executions.",
      fullBio: `Nathan moved from the UK to Prague more than seven years ago after studying English literature and Russian. What started as curiosity quickly turned into long-term commitment: he immersed himself in Czech history, walked the city obsessively, and built his own archive of sources to explain Prague with clarity and personality. He later became a certified guide and co-founded Pragolem to offer tours that feel both intellectually serious and genuinely welcoming.

His guiding style blends detailed research with humor and direct storytelling. Guests value the way he explains complex topics, especially religious warfare in the Czech lands, political turning points, and the famous defenestrations, without losing pace or accessibility. Rather than repeating generic scripts, Nathan structures each walk around narrative tension: what happened, why it happened, and why it still matters when you stand in that exact place today.

Nathan focuses on English-language tours and often works with travelers who already know some European history and want to go deeper. At the same time, he keeps his tours approachable for first-time visitors by adding practical orientation, neighborhood context, and candid recommendations. His aim is simple: by the end of the walk, guests should feel they understand Prague as a living city, not only a list of monuments.

When not guiding, Nathan continues independent reading and field research, testing new route segments and refining stories so repeat guests still get fresh insight.`,
      quote:
        // "You need to find ways to convey the information in a way that feels fresh for you, so it feels fresh for them too.",
        "I love this job, because I get to meet people and hear different stories - and I get to speak about something I'm passionate about: Prague. And I get to work outside. Ideal.",
      tourLanguages: "English Tours",
      yearsInPrague: 7,
    },
    relationships: {
      tours: {
        data: [
          {
            id: "tour-castle-en",
            type: "tour",
            slug: "prague-castle-free-tour",
            locale: "en",
          },
          { id: "tour-private-en", type: "tour", slug: "private-tours", locale: "en" },
        ],
      },
    },
  },
  // [PLACEHOLDER] French profile for Nathan
  {
    id: "guide-nathan-fr",
    slug: "nathan",
    locale: "fr",
    attributes: {
      name: "Nathan",
      photo: {
        url: "/images/guides/nathan.webp",
        alt: "Nathan en visite guidée près du Pont Charles",
      },
      role: "Co-fondateur & Guide Certifié",
      languages: ["Anglais"],
      shortBio:
        "Nathan est britannique et vit à Prague depuis plus de sept ans. Spécialiste des visites en anglais, il est réputé pour ses récits précis sur les conflits religieux, les défenestrations et l'histoire politique des pays tchèques.",
      fullBio: `Originaire du Royaume-Uni, Nathan s'est installé à Prague il y a plus de sept ans après des études de littérature anglaise et de russe. Très vite, il s'est engagé dans une recherche personnelle approfondie sur l'histoire tchèque: archives, bibliographie spécialisée, repérages de terrain et comparaison de sources. Cette exigence l'a conduit vers le métier de guide certifié, puis vers la cofondation de Pragolem.

Son style de visite est reconnu pour son équilibre entre rigueur et humour. Nathan excelle dans les thèmes qu'il affectionne: conflits religieux en Bohême, ruptures politiques, défenestrations et formation de l'identité tchèque moderne. Il construit ses parcours comme des récits structurés, où chaque lieu éclaire une question historique précise. Résultat: les visiteurs retiennent vraiment ce qu'ils voient.

Même lorsqu'il guide en anglais, Nathan prend le temps d'ajuster le rythme au niveau du groupe et de donner des repères très concrets pour la suite du séjour: quartiers où revenir, points de vue moins fréquentés, recommandations utiles. Son objectif n'est pas de réciter des faits, mais de faire comprendre Prague de l'intérieur.

En parallèle des visites, il poursuit un travail de recherche indépendant pour enrichir ses contenus et garder des parcours vivants.`,
      quote:
        "Il faut transmettre l'information d'une manière qui reste vivante pour le guide, afin qu'elle reste vivante pour les visiteurs.",
      tourLanguages: "Visites en Anglais",
      yearsInPrague: 7,
    },
    relationships: {
      tours: {
        data: [
          {
            id: "tour-castle-fr",
            type: "tour",
            slug: "free-tour-chateau-prague",
            locale: "fr",
          },
          { id: "tour-private-fr", type: "tour", slug: "visites-privees", locale: "fr" },
        ],
      },
    },
  },
];
