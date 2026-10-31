/**
 * HESIL VILLA - NATURE-INSPIRED BOUTIQUE HOMESTAY CONFIGURATION
 * 
 * Central configuration file for property details, accommodations, pricing,
 * curated gallery, nearby attractions, and booking channels.
 * 
 * Real property photographs can be saved into `/public/images/` and easily mapped below.
 */

export const homestayConfig = {
  // Brand & Identity
  brand: {
    name: "Hesil Villa",
    subName: "Boutique Homestay",
    headline: "Stay close to nature. Feel at home.",
    editorialLine: "A little closer to the slower side of Kerala.",
    tagline: "Stay close to nature. Feel at home.",
    locationLabel: "ALAPPUZHA, KERALA, INDIA",
    shortDescription:
      "Discover a peaceful modern stay in Alappuzha, thoughtfully designed for comfort, privacy and meaningful moments.",
    longPhilosophy:
      "Tucked into a tranquil coastal residential setting surrounded by palms and natural greenery, Hesil Villa offers the gentle pace of authentic Kerala life. Two independent 1BHK suites—each with its own private kitchen, master bedroom, and ensuite bathroom—provide the privacy of a private residence with the warmth of genuine local hospitality.",
  },

  // Geographic Coordinates & Location Details
  // Verified Property Coordinates: 9.635318125878603, 76.307138423238
  coordinates: {
    latitude: 9.635318125878603,
    longitude: 76.307138423238,
  },

  // Contact Information
  // LAUNCH BLOCKER: Real phone & WhatsApp numbers must be supplied by the property owner.
  // Set to null to prevent placeholder dummy numbers from being used in functional booking links.
  contact: {
    phone: null, // OWNER INPUT REQUIRED: e.g., "+91 XXXXX XXXXX"
    phoneDisplay: "Host Number Pending Configuration",
    whatsappNumber: null, // OWNER INPUT REQUIRED: Numbers only with country code (e.g., "91XXXXXXXXXX")
    email: "stay@hesilvilla.com", // OWNER INPUT REQUIRED: Verify active email
    address: {
      lane: "Coastal Road, Near Chettikad / Pathirappally",
      area: "Alappuzha Coast",
      city: "Alappuzha (Alleppey)",
      state: "Kerala",
      pincode: "688521",
      country: "India",
    },
    // Google Maps embed directly targeting coordinates 9.635318125878603, 76.307138423238
    googleMapsEmbedUrl:
      "https://maps.google.com/maps?q=9.635318125878603,76.307138423238&hl=en&z=15&output=embed",
    googleMapsDirectLink:
      "https://www.google.com/maps/dir/?api=1&destination=9.635318125878603,76.307138423238",
    instagram: null,
  },

  // Check-in & Stay Policies
  policies: {
    checkInTime: "02:00 PM",
    checkOutTime: "11:00 AM",
    cancellation: "Flexible 48-hour prior notification for direct WhatsApp bookings",
    smoking: "Smoking is strictly restricted to outdoor garden and open terrace areas",
    pets: "Please inquire in advance with our host",
    quietHours: "10:00 PM – 07:00 AM to preserve neighborhood serenity",
  },

  // Accommodations (Upper BHK, Lower BHK, Entire Villa)
  // Pricing Note: When price is null or unconfirmed, UI displays "Contact us for current rates."
  accommodations: [
    {
      id: "upper-bhk",
      name: "The Upper BHK",
      tagline: "Ocean Breeze & Private Balcony Terrace",
      subtitle: "Independent First Floor Residence",
      description:
        "Elevated amidst swaying coconut fronds, the Upper BHK offers natural cross-ventilation, refreshing coastal breezes, and an open terrace balcony. An independent 1BHK sanctuary complete with a restful master bedroom, private modern bathroom, and a fully equipped private kitchen.",
      capacity: {
        ideal: "2 Adults",
        max: "Up to 3 Guests (Extra mattress available on request)",
      },
      bed: "1 King Bed + Terrace Lounger",
      size: "approx. 480 sq.ft",
      layout: "1 Air-Conditioned Bedroom + 1 Private Bathroom + 1 Private Kitchen + Private Balcony Terrace",
      // Set amount to null or a string. If null, displays "Contact us for current rates."
      price: {
        amount: null, // Configurable: e.g. "₹2,800" or null
        period: "per night",
        unconfirmedText: "Contact us for current rates.",
        note: "Direct booking rate • Seasonal adjustments apply",
      },
      highlights: [
        "Private open-air terrace with garden and canopy view",
        "Quiet, individual air conditioning in bedroom",
        "Fully equipped private kitchen for self-catering",
        "Modern ensuite bathroom with 24/7 hot water geyser",
        "High-speed fiber Wi-Fi",
        "Complete upper-floor privacy with independent staircase access",
      ],
      // Development placeholder - ready to swap in /public/images/
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=85",
      isPlaceholder: true,
      gallery: [
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80",
      ],
    },
    {
      id: "lower-bhk",
      name: "The Lower BHK",
      tagline: "Garden Verandah & Effortless Ground Living",
      subtitle: "Independent Ground Floor Residence",
      description:
        "Opening directly onto the green garden courtyard, the Lower BHK is crafted for step-free comfort and calm relaxation. Features a spacious air-conditioned master bedroom, private ensuite bathroom, a fully equipped private kitchen, and a peaceful front verandah.",
      capacity: {
        ideal: "2 Adults",
        max: "Up to 3 Guests (Extra mattress available on request)",
      },
      bed: "1 King Bed + Verandah Seating",
      size: "approx. 510 sq.ft",
      layout: "1 Air-Conditioned Bedroom + 1 Private Bathroom + 1 Private Kitchen + Garden Verandah",
      price: {
        amount: null, // Configurable: e.g. "₹2,600" or null
        period: "per night",
        unconfirmedText: "Contact us for current rates.",
        note: "Direct booking rate • Seasonal adjustments apply",
      },
      highlights: [
        "Direct step-free ground access to garden verandah",
        "Shaded front seating overlooking tropical foliage",
        "Air-conditioned master bedroom",
        "Dedicated private kitchen with gas cooktop and cookware",
        "Modern ensuite bathroom with hot water",
        "On-doorstep private vehicle parking",
      ],
      image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1400&q=85",
      isPlaceholder: true,
      gallery: [
        "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80",
      ],
    },
    {
      id: "entire-villa",
      name: "The Entire Villa",
      tagline: "Exclusive Two-Story Tropical Sanctuary",
      subtitle: "Both Upper & Lower BHKs Combined",
      description:
        "Reserve the complete Hesil Villa property for exclusive family vacations, reunion getaways, or friends travelling together. Enjoy sole access to both floors: 2 independent air-conditioned bedrooms, 2 bathrooms, 2 private kitchens, garden courtyard, and upper sun terrace.",
      capacity: {
        ideal: "4 to 6 Adults",
        max: "Up to 7 Guests with extra rollaways",
      },
      bed: "2 King Beds + Living Lounges across 2 Floors",
      size: "approx. 1,000 sq.ft total",
      layout: "2 Bedrooms + 2 Bathrooms + 2 Private Kitchens + Balcony Terrace + Garden Courtyard",
      price: {
        amount: null, // Configurable: e.g. "₹5,200" or null
        period: "per night",
        unconfirmedText: "Contact us for current rates.",
        note: "Special group buyout tariff • Absolute privacy",
      },
      highlights: [
        "100% exclusive use of the two-story property & grounds",
        "Two independent private kitchens for flexible cooking",
        "Upper open breeze terrace and ground garden verandah",
        "Private gated parking on premises for multiple vehicles",
        "Automatic inverter power backup",
        "Dedicated local host and caretaker assistance",
      ],
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85",
      isPlaceholder: true,
      gallery: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80",
      ],
    },
  ],

  // External Booking Platforms (Configurable)
  // Per strict instructions: There are currently NO confirmed property listing URLs.
  // When URLs are added, set url to string and isLive to true.
  externalPlatforms: [
    {
      name: "Airbnb",
      url: null,
      isLive: false,
      badgeText: "Coming Soon",
      description: "Superhost listing in preparation",
    },
    {
      name: "Booking.com",
      url: null,
      isLive: false,
      badgeText: "Coming Soon",
      description: "Partner listing in preparation",
    },
    {
      name: "Agoda",
      url: null,
      isLive: false,
      badgeText: "Coming Soon",
      description: "Listing in preparation",
    },
    {
      name: "MakeMyTrip",
      url: null,
      isLive: false,
      badgeText: "Coming Soon",
      description: "Homestay listing in preparation",
    },
    {
      name: "Goibibo",
      url: null,
      isLive: false,
      badgeText: "Coming Soon",
      description: "Homestay listing in preparation",
    },
  ],

  // Nature-Inspired Amenities (Real, verified facilities only)
  amenities: [
    {
      title: "Natural Green Surroundings",
      description: "Surrounded by palms and greenery in a peaceful coastal residential enclave.",
      icon: "Trees",
    },
    {
      title: "2 Independent Kitchens",
      description: "Both Upper and Lower BHKs have their own private kitchen with gas cooktop and cookware.",
      icon: "Utensils",
    },
    {
      title: "Quiet Air-Conditioning",
      description: "Individual climate control in each master bedroom suite for restful sleep.",
      icon: "Wind",
    },
    {
      title: "High-Speed Fiber Wi-Fi",
      description: "Reliable fiber internet for remote working or streaming peaceful music.",
      icon: "Wifi",
    },
    {
      title: "Inverter Power Backup",
      description: "Automatic backup system ensuring uninterrupted lighting, fans, and essentials.",
      icon: "Zap",
    },
    {
      title: "Secure Gated Parking",
      description: "Dedicated private parking space on premises for cars and two-wheelers.",
      icon: "Car",
    },
    {
      title: "24/7 Hot Water Geyser",
      description: "Instant hot water geysers in both private ensuite bathrooms.",
      icon: "Flame",
    },
    {
      title: "Warm Homestay Hospitality",
      description: "Attentive caretaker support, clean linens, and authentic local travel advice.",
      icon: "HeartHandshake",
    },
  ],

  // Nature-Inspired Curated Photo Collection
  // Categories required:
  // villa exterior, front entrance, garden and greenery, upper BHK bedroom,
  // lower BHK bedroom, private kitchens, bathrooms, balcony and terrace,
  // outdoor seating, architectural details, natural light and shadows, nearby coastal surroundings.
  gallery: [
    {
      id: "gal-exterior",
      title: "Villa Architecture & Greenery",
      category: "exterior",
      categoryLabel: "Villa Exterior",
      aspect: "landscape",
      src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
      caption: "Clean contemporary lines framed by tropical coconut trees and green surroundings.",
      isPlaceholder: true,
    },
    {
      id: "gal-entrance",
      title: "Front Entrance & Gate",
      category: "exterior",
      categoryLabel: "Exterior",
      aspect: "portrait",
      src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=85",
      caption: "Welcoming entrance path lined with tropical flora.",
      isPlaceholder: true,
    },
    {
      id: "gal-garden",
      title: "Garden & Courtyard Greenery",
      category: "garden",
      categoryLabel: "Garden",
      aspect: "landscape",
      src: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=85",
      caption: "Lush tropical green foliage and quiet garden courtyard.",
      isPlaceholder: true,
    },
    {
      id: "gal-upper-bed",
      title: "Upper BHK Master Bedroom",
      category: "bedrooms",
      categoryLabel: "Bedrooms",
      aspect: "portrait",
      src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=85",
      caption: "Sunlit upper bedroom suite with calming neutral tones and crisp linens.",
      isPlaceholder: true,
    },
    {
      id: "gal-lower-bed",
      title: "Lower BHK Master Bedroom",
      category: "bedrooms",
      categoryLabel: "Bedrooms",
      aspect: "portrait",
      src: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=900&q=85",
      caption: "Ground-floor master bedroom offering cool, shaded comfort and quiet privacy.",
      isPlaceholder: true,
    },
    {
      id: "gal-kitchen",
      title: "Private Self-Catering Kitchen",
      category: "kitchen",
      categoryLabel: "Kitchen",
      aspect: "landscape",
      src: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85",
      caption: "Dedicated private kitchen equipped with gas stove, refrigerator, and cooking essentials.",
      isPlaceholder: true,
    },
    {
      id: "gal-terrace",
      title: "Upper Balcony & Terrace",
      category: "exterior",
      categoryLabel: "Exterior",
      aspect: "landscape",
      src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85",
      caption: "Private open terrace catching coastal breeze and evening sunsets.",
      isPlaceholder: true,
    },
    {
      id: "gal-seating",
      title: "Outdoor Verandah Seating",
      category: "garden",
      categoryLabel: "Garden",
      aspect: "landscape",
      src: "https://images.unsplash.com/photo-1507038772120-7ffe76f79d04?auto=format&fit=crop&w=1200&q=85",
      caption: "Peaceful spot for morning tea surrounded by quiet nature.",
      isPlaceholder: true,
    },
    {
      id: "gal-details",
      title: "Architectural Details & Shadows",
      category: "details",
      categoryLabel: "Details & Light",
      aspect: "portrait",
      src: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=900&q=85",
      caption: "Natural daylight filtering through wooden louvers and coastal architecture.",
      isPlaceholder: true,
    },
    {
      id: "gal-surroundings",
      title: "Nearby Coastal Surroundings",
      category: "surroundings",
      categoryLabel: "Coastal Surroundings",
      aspect: "landscape",
      src: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1400&q=85",
      caption: "The golden coastline of Alappuzha just a brief stroll down the neighborhood road.",
      isPlaceholder: true,
    },
    {
      id: "gal-backwater",
      title: "Serene Backwater Canal",
      category: "surroundings",
      categoryLabel: "Coastal Surroundings",
      aspect: "landscape",
      src: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1400&q=85",
      caption: "Quiet waterways with water lilies in the nearby Kuttanad canals.",
      isPlaceholder: true,
    },
  ],

  // Curated Alappuzha Experiences (Differentiating homestay arrangements vs self-guided)
  experiences: [
    {
      id: "exp-1",
      title: "Shallow Village Canoe Trails",
      type: "Arranged with trusted local boatmen",
      description:
        "Glide silently on traditional hand-rowed wooden canoes through narrow village canals shaded by coconut palms where motorized boats cannot enter.",
      duration: "2 - 3 Hours",
      image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "exp-2",
      title: "Houseboat Day Cruises on Vembanad",
      type: "Arranged with licensed partners",
      description:
        "Spend a tranquil day cruising the wider backwaters of Punnamada and Vembanad Lake on a traditional Kettuvallam with fresh Kerala lunch served on board.",
      duration: "Half-day / Full-day",
      image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "exp-3",
      title: "Coastal Sunset & Old Sea Pier",
      type: "Self-guided walk / Short drive",
      description:
        "Watch the Arabian Sea sunset against the historic sea bridge ruins at Alappuzha Beach while enjoying fresh sea air and roasted seaside snacks.",
      duration: "Evening stroll",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "exp-4",
      title: "Authentic Coastal Dining & Cooking",
      type: "Host recommendations & private kitchen",
      description:
        "Cook your own seafood in your suite's private kitchen or discover family-run eateries for authentic Kerala fish curry, appams, and vegetarian sadhya.",
      duration: "Flexible",
      image: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?auto=format&fit=crop&w=1000&q=80",
    },
  ],

  // Researched Nearby Attractions (Travel Journal Format)
  // Coordinates: 9.635318125878603, 76.307138423238
  // Curated travel journal: "There's more to discover around you."
  nearbyAttractions: [
    {
      id: "att-beach",
      name: "Alappuzha Beach",
      distance: "~6.5 km",
      travelTime: "12 - 15 min drive",
      description:
        "The iconic historic beach of Alleppey featuring the 150-year-old sea pier ruins, expansive sands, and lively evening stalls.",
      category: "Coastline",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "att-lighthouse",
      name: "Alappuzha Lighthouse",
      distance: "~6.2 km",
      travelTime: "12 min drive",
      description:
        "Constructed in 1862, this red-and-white striped beacon offers panoramic 360-degree views of the Arabian Sea and coconut tree canopy.",
      category: "Heritage",
      image: "https://images.unsplash.com/photo-1509233725247-49e657c54213?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "att-vijaya-park",
      name: "Vijaya Beach Park",
      distance: "~6.4 km",
      travelTime: "12 min drive",
      description:
        "A shaded coastal park right by the beach with walking trails, children's boating ponds, and open green recreation grounds.",
      category: "Park & Leisure",
      image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "att-sea-view-park",
      name: "Sea View Park",
      distance: "~6.6 km",
      travelTime: "13 min drive",
      description:
        "Serene coastal recreation grounds offering direct sunset vistas, boating facilities, and palm-shaded park benches.",
      category: "Park & Leisure",
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "att-museum",
      name: "Revi Karunakaran Memorial Museum",
      distance: "~7.8 km",
      travelTime: "16 min drive",
      description:
        "An internationally acclaimed museum housing a priceless private collection of Swarovski crystals, Belgian glass, Tanjore paintings, and antique artifacts.",
      category: "Culture & Art",
      image: "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "att-punnamada",
      name: "Punnamada Lake (Houseboat Jetty)",
      distance: "~9.5 km",
      travelTime: "20 min drive",
      description:
        "The starting hub for world-famous Kerala backwater cruises and the venue of the historic Nehru Trophy Snake Boat Race.",
      category: "Backwaters",
      image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "att-temple",
      name: "Mullakkal Rajarajeswari Temple",
      distance: "~8.5 km",
      travelTime: "18 min drive",
      description:
        "A multi-century-old traditional Kerala open-roof temple dedicated to Goddess Durga, reflecting authentic local temple architecture.",
      category: "Heritage & Faith",
      image: "https://images.unsplash.com/photo-1600100397608-f010f443b716?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "att-backwaters",
      name: "Alappuzha Backwaters & Kuttanad",
      distance: "Enroute / 20 min drive",
      travelTime: "Full / Half-day trip",
      description:
        "The 'Rice Bowl of Kerala' where farming is done below sea level, crisscrossed with scenic waterways, duck farms, and rural hamlets.",
      category: "Nature & Ecology",
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
    },
  ],

  // Trust Indicators (Verified homestay hospitality points)
  trustPoints: [
    {
      title: "Complete Independent Living",
      desc: "Both Upper & Lower BHKs feature private entrances, private master bedrooms, private bathrooms, and private kitchens.",
    },
    {
      title: "Direct WhatsApp Host Communication",
      desc: "Speak directly with your host with zero middleman markups, immediate local guidance, and personal attention.",
    },
    {
      title: "Tranquil Residential Nature",
      desc: "Situated away from busy commercial highways, surrounded by coastal trees and peaceful residential living.",
    },
    {
      title: "Freedom of Self-Catering",
      desc: "Enjoy the freedom to brew your morning tea, prepare breakfast, or cook fresh seafood in your own kitchen.",
    },
  ],
};
