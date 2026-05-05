export const HOTEL_INFO = {
  name: "Hôtel Amoitrin",
  location: "Man, Côte d'Ivoire",
  tagline: "Élégance au Cœur des Montagnes",
  phone: "+225 07 00 77 2777",
  address: "Quartier Amoitrin, Man, Côte d'Ivoire",
  stars: 3,
  rating: 3.4,
  reviews: 339,
  email: "contact@hotelamoitrin.ci",
  socials: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
  },
};

export const ROOMS = [
  {
    id: 1,
    slug: "standard",
    name: "Chambre Standard",
    description:
      "Espace élégant et confortable, climatisé, avec salle de bain privative. La sérénité des montagnes de Man à portée de fenêtre.",
    price: 60000,
    priceLabel: "60 000 FCFA",
    tag: "Confort",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    features: ["Climatisation", "Wi-Fi Gratuit", "Salle de bain privée", "TV"],
    size: "28 m²",
    occupancy: 2,
  },
  {
    id: 2,
    slug: "superieure",
    name: "Chambre Supérieure",
    description:
      "Chambre spacieuse avec vue imprenable sur les montagnes verdoyantes. Un cadre apaisant où luxe et nature se rencontrent.",
    price: 75000,
    priceLabel: "75 000 FCFA",
    tag: "Vue Montagne",
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
    features: [
      "Vue panoramique",
      "Climatisation",
      "Baignoire",
      "Wi-Fi Gratuit",
    ],
    size: "36 m²",
    occupancy: 2,
  },
  {
    id: 3,
    slug: "suite",
    name: "Suite Prestige",
    description:
      "Notre suite d'exception : salon séparé, vue piscine, literie premium. Une expérience de séjour hors du commun au cœur de Man.",
    price: 0,
    priceLabel: "Sur demande",
    tag: "Prestige",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    features: [
      "Salon séparé",
      "Vue piscine",
      "Accès prioritaire",
      "Service personnalisé",
    ],
    size: "55 m²",
    occupancy: 3,
  },
];

export const AMENITIES = [
  {
    id: 1,
    icon: "🏊",
    name: "Piscine Extérieure",
    description: "Vue panoramique sur les montagnes de l'Ouest ivoirien.",
    detail: "Ouverte de 7h à 22h",
  },
  {
    id: 2,
    icon: "🍽️",
    name: "Restaurant & Bar",
    description: "Cuisine ivoirienne et internationale. Ambiance raffinée.",
    detail: "Petit-déjeuner · Déjeuner · Dîner",
  },
  {
    id: 3,
    icon: "📶",
    name: "Wi-Fi Premium",
    description: "Connexion haut débit dans tout l'établissement, gratuite.",
    detail: "Débit jusqu'à 100 Mbps",
  },
  {
    id: 4,
    icon: "🚗",
    name: "Parking Gratuit",
    description: "Stationnement sécurisé et surveillé sur le site.",
    detail: "Accessible 24h/24",
  },
  {
    id: 5,
    icon: "🏢",
    name: "Centre d'Affaires",
    description: "Salles de réunion équipées pour vos événements.",
    detail: "Jusqu'à 50 personnes",
  },
  {
    id: 6,
    icon: "👔",
    name: "Blanchisserie",
    description: "Service complet de pressing et de blanchisserie.",
    detail: "Livraison en 24h",
  },
  {
    id: 7,
    icon: "❄️",
    name: "Climatisation",
    description: "Chambres et espaces communs climatisés pour votre confort.",
    detail: "Réglage individuel",
  },
  {
    id: 8,
    icon: "🔔",
    name: "Réception 24h/24",
    description: "Notre équipe est disponible à toute heure pour vous servir.",
    detail: "7 jours sur 7",
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Kouassi Emmanuel",
    role: "Directeur Commercial",
    city: "Abidjan",
    rating: 5,
    text: "Un établissement qui surprend par son élégance. La vue sur les montagnes depuis la piscine est tout simplement époustouflante. Je recommande vivement.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
  },
  {
    id: 2,
    name: "Mariama Diallo",
    role: "Architecte",
    city: "Conakry",
    rating: 5,
    text: "L'accueil chaleureux et le cadre magnifique m'ont conquise dès l'arrivée. Les chambres sont soignées et la cuisine du restaurant est excellente.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
  },
  {
    id: 3,
    name: "Jean-Baptiste Koffi",
    role: "Entrepreneur",
    city: "San Pedro",
    rating: 4,
    text: "Cadre exceptionnel pour mes réunions d'affaires. Salle équipée, personnel disponible et atmosphère de travail productive. Mon hotel préféré à Man.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
  },
];

export const GALLERY_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
    alt: "Piscine extérieure Hôtel Amoitrin",
    category: "Piscine",
    span: "col-span-2 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    alt: "Chambre Standard",
    category: "Chambres",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    alt: "Restaurant",
    category: "Restaurant",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    alt: "Suite Prestige",
    category: "Suite",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
    alt: "Façade Hôtel",
    category: "Extérieur",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&q=80",
    alt: "Bar & Lounge",
    category: "Bar",
    span: "",
  },
];

export const NAV_LINKS = [
  { label: "L'Hôtel", href: "#about" },
  { label: "Chambres", href: "#rooms" },
  { label: "Services", href: "#amenities" },
  { label: "Galerie", href: "#gallery" },
  { label: "Contact", href: "#booking" },
];
