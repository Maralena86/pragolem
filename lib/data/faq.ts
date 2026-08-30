import type { FAQItem } from "../types/faq";

// [PLACEHOLDER] FAQ copy is realistic and SEO-oriented but will be finalized in Strapi.
const faqEn: FAQItem[] = [
  {
    id: "faq-en-001",
    slug: "what-is-a-free-tour",
    locale: "en",
    attributes: {
      question: "What is a walking tour? ",
      answer:
        "A walking tour is a guided city walk with no fixed ticket price and where you do not require entrances for museums, monuments or other. The contribution starts at 500 CZK or 20€ per person. You join the tour, and at the end you contribute what you feel is fair based on your experience on top of that initial fee.",
      category: "walking-tours",
      order: 1,
    },
    relationships: {},
  },
  {
    id: "faq-en-002",
    slug: "is-the-tour-really-free",
    locale: "en",
    attributes: {
      question: "Is it really free?",
      answer:
        "No. There is a mandatory minimum 500 CZK or 20€ per person fee. Pragolem operates in a way where we try to keep tours accessible while rewarding quality guiding. Nevertheless this is a job and we cannot operate at losses.",
      category: "walking-tours",
      order: 2,
    },
    relationships: {},
  },
  {
    id: "faq-en-003",
    slug: "how-much-should-i-tip",
    locale: "en",
    attributes: {
      question: "How much should I tip on a free tour?",
      answer:
        "TYou should always try to tip your guides as best as you can, They are there to provide you with knowledge and a lot of practical information that will save you money in the long run. As previously stated Pragolem operates at a minimum fee starting at 500 CZK or 20€ per person. Everything to pay on top of that is what keeps the project alive and that pays for example for this website.",
      category: "walking-tours",
      order: 3,
    },
    relationships: {},
  },
  {
    id: "faq-en-004",
    slug: "do-i-need-to-book",
    locale: "en",
    attributes: {
      question: "Do I need to book in advance?",
      answer:
        "Advance booking is strongly recommended. It helps us maintain group quality and confirms your place. It is also important that you confirm your attendance to the tour.",
      category: "walking-tours",
      order: 4,
    },
    relationships: {},
  },
  {
    id: "faq-en-005",
    slug: "can-i-join-without-reservation",
    locale: "en",
    attributes: {
      question: "Can I join without reservation?",
      answer:
        "Sometimes yes, if there is capacity. However, walk-in spots are not guaranteed and sometimes you can go to the meeting point and simply not find a guide as there was no tour scheduled for that day. Booking first is the safest option.",
      category: "walking-tours",
      order: 5,
    },
    relationships: {},
  },
  {
    id: "faq-en-006",
    slug: "how-long-are-the-tours",
    locale: "en",
    attributes: {
      question: "How long are your free tours?",
      answer:
        "Our main free walking tours in Prague are approximately 3 hours, with short standing stops and practical orientation breaks.",
      category: "tours",
      order: 6,
    },
    relationships: {},
  },
  {
    id: "faq-en-007",
    slug: "where-is-the-meeting-point",
    locale: "en",
    attributes: {
      question: "Where is the meeting point?",
      answer:
        `10:00am on the Old Town Square in front of Cartier for the tour of the Old Town and Jewish Quarter.
        14:00pm in front of the Malostranská metro station for the tour of the Castle, Lesser Town and Charles Bridge.`,
      category: "tours",
      order: 7,
    },
    relationships: {},
  },
  {
    id: "faq-en-008",
    slug: "which-languages-are-available",
    locale: "en",
    attributes: {
      question: "Which languages are available?",
      answer:
        "English and French. A Spanish-language tour is available privately.",
      category: "tours",
      order: 8,
    },
    relationships: {},
  },
  {
    id: "faq-en-009",
    slug: "what-if-it-rains",
    locale: "en",
    attributes: {
      question: "What happens in bad weather?",
      answer:
        "The tour will not run in the case of extreme weather, but a bit of rain won't stop us.",
      category: "tours",
      order: 9,
    },
    relationships: {},
  },
  {
    id: "faq-en-010",
    slug: "are-tours-good-for-children",
    locale: "en",
    attributes: {
      question: "Are tours suitable for children?",
      answer:
        "Yes, especially for children who enjoy stories and can walk for around three hours. We recommend bringing water and a snack for younger travelers.",
      category: "tours",
      order: 10,
    },
    relationships: {},
  },
  {
    id: "faq-en-011",
    slug: "wheelchair-accessibility",
    locale: "en",
    attributes: {
      question: "Are the tours wheelchair accessible?",
      answer:
        "The morning tour is wheelchair accessible. Unfortunately, the afternoon tour is not; the Prague castle has more than 220 stairs that we will need to walk down.",
      category: "tours",
      order: 11,
    },
    relationships: {},
  },
  {
    id: "faq-en-012",
    slug: "what-should-i-bring",
    locale: "en",
    attributes: {
      question: "What should I bring to the tour?",
      answer:
        "Bring comfortable shoes, weather-appropriate clothing, and water. In summer, sun protection is useful. In winter, warm layers are essential. For the English speaking tour mind that cards are not accepted so payments are required in cash",
      category: "tours",
      order: 12,
    },
    relationships: {},
  },
  {
    id: "faq-en-013",
    slug: "what-is-a-private-tour",
    locale: "en",
    attributes: {
      question: "What is included in a private tour?",
      answer:
        "Private tours are custom itineraries with a dedicated guide, fixed pricing, and personalized pacing. They are ideal for families, schools, and corporate groups.",
      category: "private-tours",
      order: 13,
    },
    relationships: {},
  },
  {
    id: "faq-en-014",
    slug: "who-pragolem-guides",
    locale: "en",
    attributes: {
      question: "Who are the Pragolem guides?",
      answer:
        "Pragolem is run by Lucas and Nathan, two certified local guides based in Prague with strong expertise in Czech history and visitor-focused storytelling.",
      category: "pragolem",
      order: 14,
    },
    relationships: {},
  },
  {
    id: "faq-en-015",
    slug: "are-your-guides-certified",
    locale: "en",
    attributes: {
      question: "Are your guides certified?",
      answer:
        "Yes. We are licensed and professionally trained guides, and we continuously update our routes and historical material.",
      category: "pragolem",
      order: 15,
    },
    relationships: {},
  },
  {
    id: "faq-en-016",
    slug: "cancel-or-reschedule",
    locale: "en",
    attributes: {
      question: "How can I cancel or reschedule?",
      answer:
        "Send us a message on WhatsApp or email as soon as possible. For private tours, early notice is especially helpful for logistics.",
      category: "walking-tours",
      order: 16,
    },
    relationships: {},
  },
  {
    id: "faq-en-017",
    slug: "still-have-question",
    locale: "en",
    attributes: {
      question: "Still have a question?",
      answer:
        "Send us a message and we will recommend the best tour format for your trip.",
      category: "pragolem",
      order: 17,
    },
    relationships: {},
  },
];

// [PLACEHOLDER] French FAQ content written for natural francophone SEO.
const faqFr: FAQItem[] = [
  {
    id: "faq-fr-001",
    slug: "quest-ce-quun-free-tour",
    locale: "fr",
    attributes: {
      question: "Qu'est-ce qu'une visite guidée à Prague ?",
      answer:
        "C'est une visite guidée à pied de la ville, sans tarif fixe et sans entrée dans les musées, monuments ou autres sites. La participation commence à 500 CZK ou 20 € par personne. Vous participez à la visite, puis, à la fin, vous pouvez ajouter ce qui vous semble juste en fonction de votre expérience.",
      category: "walking-tours",
      order: 1,
    },
    relationships: {},
  },
  {
    id: "faq-fr-002",
    slug: "est-ce-vraiment-gratuit",
    locale: "fr",
    attributes: {
      question: "Est-ce vraiment gratuit ?",
      answer:
        "Non. Une participation minimale obligatoire de 500 CZK ou 20 € par personne s’applique. Pragolem cherche à rendre ses visites accessibles tout en valorisant la qualité du guidage. Mais cela reste notre métier et nous ne pouvons pas travailler à perte.",
      category: "walking-tours",
      order: 2,
    },
    relationships: {},
  },
  {
    id: "faq-fr-003",
    slug: "combien-donner-pourboire",
    locale: "fr",
    attributes: {
      question: "Combien donner à la fin de la visite ?",
      answer:
        `Nous vous encourageons à remercier votre guide à la hauteur de votre expérience. Il est là pour vous transmettre ses connaissances et de nombreuses informations pratiques qui peuvent vous faire économiser de l’argent pendant votre séjour.
        Comme indiqué plus haut, la participation minimale chez Pragolem est de 500 CZK ou 20 € par personne. Toute contribution supplémentaire nous permet de faire vivre le projet et de financer, entre autres, ce site internet.`,
      category: "walking-tours",
      order: 3,
    },
    relationships: {},
  },
  {
    id: "faq-fr-004",
    slug: "faut-il-reserver",
    locale: "fr",
    attributes: {
      question: "Faut-il réserver à l'avance ?",
      answer:
        "La réservation à l’avance est fortement recommandée. Elle nous permet de maintenir des groupes de qualité et de garantir votre place. Il est également important de confirmer votre présence avant la visite.",
      category: "walking-tours",
      order: 4,
    },
    relationships: {},
  },
  {
    id: "faq-fr-005",
    slug: "venir-sans-reservation",
    locale: "fr",
    attributes: {
      question: "Peut-on venir sans réservation ?",
      answer:
        "Parfois, oui, s’il reste de la place. Cependant, les places sans réservation ne sont pas garanties. Il peut aussi arriver qu’aucune visite ne soit prévue ce jour-là et qu’il n’y ait donc pas de guide au point de rendez-vous. Réserver à l’avance reste l’option la plus sûre.",
      category: "walking-tours",
      order: 5,
    },
    relationships: {},
  },
  {
    id: "faq-fr-006",
    slug: "duree-des-visites",
    locale: "fr",
    attributes: {
      question: "Quelle est la durée des visites ?",
      answer:
        "Nos principales visites à pied à Prague durent environ 3 heures, avec de courtes pauses et des moments consacrés à l’orientation pratique.",
      category: "tours",
      order: 6,
    },
    relationships: {},
  },
  {
    id: "faq-fr-007",
    slug: "point-de-rendez-vous",
    locale: "fr",
    attributes: {
      question: "Où se trouve le point de rendez-vous ?",
      answer:
        `10h00 : sur la place de la Vieille Ville, devant Cartier, pour la visite de la Vieille Ville et du quartier juif.

        14h00 : devant la station de métro Malostranská, pour la visite du Château, de Malá Strana et du pont Charles.`,
      category: "tours",
      order: 7,
    },
    relationships: {},
  },
  {
    id: "faq-fr-008",
    slug: "langues-disponibles",
    locale: "fr",
    attributes: {
      question: "Quelles langues proposez-vous ?",
      answer:
        "Les visites sont proposées en français et en anglais. Une visite en espagnol est également possible sur demande, en privé.",
      category: "tours",
      order: 8,
    },
    relationships: {},
  },
  {
    id: "faq-fr-009",
    slug: "mauvaise-meteo",
    locale: "fr",
    attributes: {
      question: "Que se passe-t-il en cas de mauvais temps ?",
      answer:
        "La visite est annulée en cas de conditions météorologiques extrêmes. En revanche, un peu de pluie ne nous arrêtera pas !",
      category: "tours",
      order: 9,
    },
    relationships: {},
  },
  {
    id: "faq-fr-010",
    slug: "visites-avec-enfants",
    locale: "fr",
    attributes: {
      question: "Les visites conviennent-elles aux enfants ?",
      answer:
        "Oui, notamment pour les enfants qui aiment les histoires et peuvent marcher pendant environ trois heures. Pour les plus jeunes, nous recommandons de prévoir de l’eau et une petite collation.",
      category: "tours",
      order: 10,
    },
    relationships: {},
  },
  {
    id: "faq-fr-011",
    slug: "accessibilite-fauteuil",
    locale: "fr",
    attributes: {
      question: "Les parcours sont-ils accessibles en fauteuil roulant ?",
      answer:
        "La visite du matin est accessible en fauteuil roulant. Malheureusement, celle de l’après-midi ne l’est pas : la visite du Château comprend notamment plus de 220 marches à descendre.",
      category: "tours",
      order: 11,
    },
    relationships: {},
  },
  {
    id: "faq-fr-012",
    slug: "que-faut-il-apporter",
    locale: "fr",
    attributes: {
      question: "Que faut-il prévoir pour la visite ?",
      answer:
        `Prévoyez des chaussures confortables, une tenue adaptée à la météo et de l’eau. En été, une protection solaire est recommandée ; en hiver, prévoyez plusieurs couches bien chaudes.

        Pour la visite en anglais, veuillez noter que les cartes bancaires ne sont pas acceptées : le paiement doit se faire en espèces.`,
      category: "tours",
      order: 12,
    },
    relationships: {},
  },
  {
    id: "faq-fr-013",
    slug: "quest-ce-quune-visite-privee",
    locale: "fr",
    attributes: {
      question: "Que comprend une visite privée ?",
      answer:
        "Les visites privées sont conçues sur mesure, avec un guide dédié, un tarif fixe et un rythme adapté à vos envies. Elles sont particulièrement adaptées aux familles, aux écoles et aux groupes professionnels.",
      category: "private-tours",
      order: 13,
    },
    relationships: {},
  },
  {
    id: "faq-fr-016",
    slug: "qui-sont-les-guides",
    locale: "fr",
    attributes: {
      question: "Qui sont les guides Pragolem ?",
      answer:
        "Pragolem est animé par Lucas et Nathan, deux guides locaux certifiés, basés à Prague et spécialisés dans l’histoire tchèque et la transmission de connaissances de manière vivante et accessible.",
      category: "pragolem",
      order: 16,
    },
    relationships: {},
  },
  {
    id: "faq-fr-017",
    slug: "guides-certifies",
    locale: "fr",
    attributes: {
      question: "Êtes-vous des guides certifiés ?",
      answer:
        "Oui, nos guides sont certifiés et formés. Nous mettons régulièrement à jour nos contenus pour proposer des visites fiables et vivantes.",
      category: "pragolem",
      order: 17,
    },
    relationships: {},
  },
  {
    id: "faq-fr-018",
    slug: "annuler-ou-reprogrammer",
    locale: "fr",
    attributes: {
      question: "Comment annuler ou reprogrammer une visite ?",
      answer:
        "Contactez-nous par WhatsApp ou par e-mail dès que possible. Pour les visites privées, nous vous remercions de nous prévenir suffisamment à l’avance afin de faciliter l’organisation.",
      category: "pragolem",
      order: 18,
    },
    relationships: {},
  },
];

export const faqData: FAQItem[] = [...faqEn, ...faqFr];
