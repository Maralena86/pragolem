import type { Review } from "../types/review";

export const reviewsData: Review[] = [
  // [REAL REVIEW]
  {
    id: "review-kate-tears",
    slug: "kate-tears-old-town",
    locale: "en",
    attributes: {
      authorName: "Kate Tears",
      rating: 5,
      text: "Lucas and Nathan were fantastic! I really enjoyed the tour, and they were able to answer all the questions I had. They covered all the main locations around old town Prague and gave very interesting stories for all the points around Prague. I highly recommend",
      tourSlug: "old-town-free-tour",
      source: "google",
      isRealReview: true,
    },
    relationships: {
      tour: {
        data: {
          id: "tour-old-town-en",
          type: "tour",
          slug: "old-town-free-tour",
          locale: "en",
        },
      },
    },
  },
  // [REAL REVIEW]
  {
    id: "review-boris",
    slug: "boris-discovery-prague",
    locale: "en",
    attributes: {
      authorName: "Boris",
      rating: 5,
      text: "An unforgettable discovery of Prague with Lucas",
      tourSlug: "old-town-free-tour",
      source: "direct",
      isRealReview: true,
    },
    relationships: {
      tour: {
        data: {
          id: "tour-old-town-en",
          type: "tour",
          slug: "old-town-free-tour",
          locale: "en",
        },
      },
    },
  },
  // [REAL REVIEW]
  {
    id: "review-loic-jacquemin",
    slug: "loic-super-guide",
    locale: "fr",
    attributes: {
      authorName: "Loïc Jacquemin",
      rating: 5,
      text: "Super guide",
      tourSlug: "free-tour-vieille-ville",
      source: "direct",
      isRealReview: true,
    },
    relationships: {
      tour: {
        data: {
          id: "tour-old-town-fr",
          type: "tour",
          slug: "free-tour-vieille-ville",
          locale: "fr",
        },
      },
    },
  },
  // [REAL REVIEW]
  {
    id: "review-adam-harvey",
    slug: "adam-harvey-castle",
    locale: "en",
    attributes: {
      authorName: "Adam Harvey",
      rating: 5,
      text: "I had the pleasure being guided by Nathan on a walking tour of Prague on Saturday, June 21, 2025. I've been on many historical walking tours in cities throughout Europe and the United States. I can say without hesitation this was one of the best. Nathan's knowledge of the history and architecture of Prague was first rate as well as his affable nature. I highly recommend this tour to everyone!",
      tourSlug: "prague-castle-free-tour",
      source: "google",
      date: "2025-06-21",
      isRealReview: true,
    },
    relationships: {
      tour: {
        data: {
          id: "tour-castle-en",
          type: "tour",
          slug: "prague-castle-free-tour",
          locale: "en",
        },
      },
    },
  },
  // [REAL REVIEW]
  {
    id: "review-yenyu-chen",
    slug: "yenyu-chen-organized",
    locale: "en",
    attributes: {
      authorName: "Yenyu Chen",
      rating: 5,
      text: "The guide was great and the tour was very well organized.",
      tourSlug: "old-town-free-tour",
      source: "google",
      isRealReview: true,
    },
    relationships: {
      tour: {
        data: {
          id: "tour-old-town-en",
          type: "tour",
          slug: "old-town-free-tour",
          locale: "en",
        },
      },
    },
  },
  // [REAL REVIEW]
  {
    id: "review-brandon",
    slug: "brandon-beneath-surface",
    locale: "en",
    attributes: {
      authorName: "Brandon",
      rating: 5,
      text: "Our guide Nathan was not only extremely knowledgeable about the history of Prague, but also about the various urban legends and architectural features the city has to offer. His passion for Prague is obvious as he mentioned it is his favorite place in the world... If you are looking to scratch beneath the surface please do yourself a favor and book this tour!",
      tourSlug: "prague-castle-free-tour",
      source: "google",
      isRealReview: true,
    },
    relationships: {
      tour: {
        data: {
          id: "tour-castle-en",
          type: "tour",
          slug: "prague-castle-free-tour",
          locale: "en",
        },
      },
    },
  },
  // [REAL REVIEW]
  {
    id: "review-paula-fader",
    slug: "paula-fader-best-of-prague",
    locale: "en",
    attributes: {
      authorName: "Paula Fader",
      rating: 5,
      text: "Nathan was a superb guide. He represented The Best of Prague and showed us The Best of Prague! ...We felt like we have a new friend in Prague. It was a wonderful tour and one we will highly recommend to all our friends.",
      tourSlug: "prague-castle-free-tour",
      source: "google",
      isRealReview: true,
    },
    relationships: {
      tour: {
        data: {
          id: "tour-castle-en",
          type: "tour",
          slug: "prague-castle-free-tour",
          locale: "en",
        },
      },
    },
  },
  // [REAL REVIEW]
  {
    id: "review-alper",
    slug: "alper-most-informative",
    locale: "en",
    attributes: {
      authorName: "Alper",
      rating: 5,
      text: "If you are coming to Prague and thinking of doing a walking tour, Pragolem is highly recommended. I had a walking tour with Nathan on 22/08/2025... I have attended more than ten walking tours across the EU and this was by far the best as well as the most informative one.",
      tourSlug: "prague-castle-free-tour",
      source: "google",
      date: "2025-08-22",
      isRealReview: true,
    },
    relationships: {
      tour: {
        data: {
          id: "tour-castle-en",
          type: "tour",
          slug: "prague-castle-free-tour",
          locale: "en",
        },
      },
    },
  },
  // [PLACEHOLDER]
  {
    id: "review-fr-placeholder-1",
    slug: "avis-francophone-vieille-ville",
    locale: "fr",
    attributes: {
      authorName: "Camille R.",
      rating: 5,
      text: "[PLACEHOLDER] Très belle visite guidée gratuite à Prague en français. Le guide était passionné, pédagogue et nous a donné d'excellents conseils pour la suite du séjour.",
      tourSlug: "free-tour-vieille-ville",
      source: "direct",
      isRealReview: false,
    },
    relationships: {
      tour: {
        data: {
          id: "tour-old-town-fr",
          type: "tour",
          slug: "free-tour-vieille-ville",
          locale: "fr",
        },
      },
    },
  },
  // [PLACEHOLDER]
  {
    id: "review-fr-placeholder-2",
    slug: "avis-francophone-chateau",
    locale: "fr",
    attributes: {
      authorName: "Julien M.",
      rating: 5,
      text: "[PLACEHOLDER] Nous avons adoré ce free tour du Château de Prague avec un guide francophone. Explications claires, excellent rythme et super ambiance du début à la fin.",
      tourSlug: "free-tour-chateau-prague",
      source: "direct",
      isRealReview: false,
    },
    relationships: {
      tour: {
        data: {
          id: "tour-castle-fr",
          type: "tour",
          slug: "free-tour-chateau-prague",
          locale: "fr",
        },
      },
    },
  },
];
