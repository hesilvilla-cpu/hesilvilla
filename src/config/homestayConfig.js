/**
 * HESIL VILLA - NATURE-INSPIRED PRIVATE KERALA HOMESTAY CONFIGURATION
 * 
 * Central configuration file for property details, accommodations, confirmed pricing,
 * curated gallery, verified nearby attractions, policies, and direct booking channels.
 * 
 * Confirmed Host Contacts:
 * Primary WhatsApp & Call: +91 75105 19751 (https://wa.me/917510519751)
 * Secondary WhatsApp & Call: +91 94977 31378 (https://wa.me/919497731378)
 * Google Maps Link: https://maps.app.goo.gl/GZz7cF5FMcsFXw5u6?g_st=ac (Confirmed)
 */

export const homestayConfig = {
  // Brand & Identity
  brand: {
    name: "Hesil Villa",
    subName: "Private Kerala Homestay",
    headline: "Your own little escape in Kerala.",
    tagline: "Your own little escape in Kerala.",
    supportingDescription:
      "Surrounded by greenery, with a peaceful garden, a fish pond and spaces to sit, play and unwind, Hesil Villa offers a private stay with the warmth of a Kerala home.",
    locationLabel: "ALAPPUZHA, KERALA, INDIA",
    shortStory:
      "Located in a quieter, slightly interior residential area of Alappuzha, away from crowded tourist spots, Hesil Villa is surrounded by trees and greenery within an enclosed private compound. Ideal for families, couples and groups who value privacy, personal space, and unhurried days.",
  },

  // Contact Information (Both Confirmed Numbers)
  contact: {
    primaryPhone: "+917510519751",
    primaryPhoneDisplay: "+91 75105 19751",
    primaryWhatsapp: "917510519751",
    primaryWhatsappUrl: "https://wa.me/917510519751",

    secondaryPhone: "+919497731378",
    secondaryPhoneDisplay: "+91 94977 31378",
    secondaryWhatsapp: "919497731378",
    secondaryWhatsappUrl: "https://wa.me/919497731378",

    // Convenient list for selection in booking form and contact components
    phoneList: [
      {
        id: "primary",
        label: "Primary Host",
        phone: "+917510519751",
        display: "+91 75105 19751",
        whatsappUrl: "https://wa.me/917510519751",
        callUrl: "tel:+917510519751",
      },
      {
        id: "secondary",
        label: "Secondary Host",
        phone: "+919497731378",
        display: "+91 94977 31378",
        whatsappUrl: "https://wa.me/919497731378",
        callUrl: "tel:+919497731378",
      },
    ],

    // Default primary links
    whatsappUrl: "https://wa.me/917510519751",
    callUrl: "tel:+917510519751",
    phoneDisplay: "+91 75105 19751 / +91 94977 31378",

    email: null, // No email address per confirmed instructions
    address: {
      area: "Kanichukulangara, Mararikulam North",
      city: "Alappuzha (Alleppey)",
      state: "Kerala",
      country: "India",
    },
    googleMapsDirectLink: "https://maps.app.goo.gl/GZz7cF5FMcsFXw5u6?g_st=ac",
    googleMapsEmbedUrl:
      "https://maps.google.com/maps?q=9.635318125878603,76.307138423238&hl=en&z=15&output=embed",
  },

  // Check-in & Stay Policies (Confirmed)
  policies: {
    checkInTime: "11:00 AM",
    checkOutTime: "10:00 AM",
    timingNote: "Check-in is at 11:00 AM and check-out is at 10:00 AM.",
    earlyCheckInNote:
      "Early check-in and late check-out may be possible depending on availability. Please contact the host in advance.",
    ratesNotice: "Rates are per night. Contact us to confirm availability.",
    kitchenNotice: "Basic kitchen amenities available. Induction stove usage: ₹200 extra.",
  },

  // Accommodation Categories
  accommodationCategories: [
    { id: "suites", name: "Suites & Entire Villa" },
    { id: "cottages", name: "Cottages" },
  ],

  // 5 Accommodation Options Across 2 Categories (Confirmed Details & Pricing)
  accommodations: [
    {
      id: "upper-suite",
      categoryGroup: "suites",
      galleryTag: "upper-suite",
      name: "Upper Suite",
      tagline: "Upstairs Sanctuary with Balcony",
      subtitle: "First Floor • 2 Bedrooms • AC • One Kitchen Upstairs",
      floor: "Upstairs (First Floor)",
      acType: "AC",
      isAC: true,
      pricePerNight: 3000,
      priceDisplay: "₹3,000",
      extraBedCharge: 400,
      extraBedChargeDisplay: "₹400",
      capacity: {
        standard: 4,
        maxExtraBeds: 2,
        totalMax: 6,
        label: "4 guests + up to 2 extra beds",
        summary: "Accommodates 4 guests with up to 2 extra beds (₹400/bed)",
      },
      bed: "2 Bedrooms Upstairs with King & Queen Beds",
      layout: "2 AC Bedrooms + 1 Bathroom + 1 Dedicated Kitchen + Balcony Terrace",
      kitchenNote: "One kitchen available upstairs for guest use",
      description:
        "Located on the first floor, the Upper Suite features two air-conditioned bedrooms, one dedicated kitchen, and an airy balcony terrace overlooking the trees. Perfect for families and groups who appreciate privacy and comfort.",
      highlights: [
        "Two air-conditioned bedrooms upstairs",
        "One dedicated kitchen upstairs with basic amenities",
        "Airy balcony terrace overlooking compound trees",
        "Modern bathroom with 24/7 hot water geyser",
        "High-speed Wi-Fi, television & automatic power backup",
        "Complimentary breakfast included",
      ],
      // Local image target with reliable fallback
      image: "/images/upper-suite/upper bed.webp",
      fallbackImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=85",
      isPlaceholder: true,
      gallery: [
        "/images/upper-suite/upper extra.webp",
        "/images/upper-suite/upper washroom.webp",
        "/images/upper-suite/upper bed.webp",
      ],
      galleryFallbacks: [
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80",
      ],
    },
    {
      id: "lower-suite",
      categoryGroup: "suites",
      galleryTag: "lower-suite",
      name: "Lower Suite",
      tagline: "Ground Floor Comfort & Garden Access",
      subtitle: "Ground Floor • 1 Bedroom • AC • No Separate Kitchen",
      floor: "Ground Floor",
      acType: "AC",
      isAC: true,
      pricePerNight: 1500,
      priceDisplay: "₹1,500",
      extraBedCharge: 400,
      extraBedChargeDisplay: "₹400",
      capacity: {
        standard: 2,
        maxExtraBeds: 1,
        totalMax: 3,
        label: "2 guests + up to 1 extra bed",
        summary: "Accommodates 2 guests with up to 1 extra bed (₹400/bed)",
      },
      bed: "1 Ground Floor Bedroom with King Bed",
      layout: "1 AC Bedroom + 1 Ensuite Bathroom + Garden Verandah Access",
      kitchenNote: "No separate kitchen (Ground floor suite)",
      description:
        "Opening toward the front verandah and garden courtyard, the Lower Suite offers effortless step-free ground living with an air-conditioned bedroom and ensuite bathroom. Ideal for couples or solo travelers seeking quiet comfort.",
      highlights: [
        "Step-free ground access to front verandah & garden",
        "Air-conditioned master bedroom for restful sleep",
        "Modern private ensuite bathroom with hot water",
        "Direct access to the garden and fish pond",
        "High-speed Wi-Fi, television & automatic power backup",
        "Complimentary breakfast included",
      ],
      image: "/images/lower-suite/lower-suite-bedroom-01.webp",
      fallbackImage: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1400&q=85",
      isPlaceholder: true,
      gallery: [
        "/images/lower-suite/lowerkitchen.webp",
        "/images/lower-suite/lowerbathroom.webp",
        "/images/lower-suite/lowerbed.webp",
      ],
      galleryFallbacks: [
        "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1507038772120-7ffe76f79d04?auto=format&fit=crop&w=1000&q=80",
      ],
    },
    {
      id: "entire-villa",
      categoryGroup: "suites",
      galleryTag: "entire-villa",
      name: "Entire Villa",
      tagline: "Exclusive Private Compound Buyout",
      subtitle: "Both Floors Combined • 3 Bedrooms • AC • Includes Upstairs Kitchen",
      floor: "Both Floors (Entire Compound)",
      acType: "AC",
      isAC: true,
      pricePerNight: 4000,
      priceDisplay: "₹4,000",
      extraBedCharge: 400,
      extraBedChargeDisplay: "₹400",
      capacity: {
        standard: 6,
        maxExtraBeds: 3,
        totalMax: 9,
        label: "6 guests + up to 3 extra beds",
        summary: "Accommodates 6 guests with up to 3 extra beds (₹400/bed)",
      },
      bed: "3 AC Bedrooms across 2 Floors (Multiple Beds)",
      layout: "3 Bedrooms across both floors + Bathrooms + Upstairs Kitchen + Garden & Fish Pond + Parking for 4 Cars",
      kitchenNote: "Includes full access to the upstairs kitchen",
      description:
        "Reserve the complete Hesil Villa property for exclusive family vacations, reunion getaways, or friends traveling together. Includes all bedrooms across both floors, the upstairs kitchen, private compound, lush garden, fish pond, outdoor leisure space, and parking for up to four cars.",
      highlights: [
        "100% exclusive private use of the two-story villa and compound",
        "Includes the upstairs kitchen for self-catering",
        "Private garden with fish pond, benches & games table",
        "Gated compound with boundary wall and parking for up to 4 cars",
        "Air conditioning, Wi-Fi, television, hot water, and power backup",
        "Complimentary breakfast included",
      ],
      image: "/images/entire-villa/entire1.webp",
      fallbackImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85",
      isPlaceholder: true,
      gallery: [
"/images/entire-villa/lower.webp",
"/images/entire-villa/sitout.webp",
"/images/entire-villa/lowerkitchen.webp",

      ],
      galleryFallbacks: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80",
      ],
    },
    {
      id: "simple-cottage",
      categoryGroup: "cottages",
      galleryTag: "simple-cottage",
      name: "Simple Cottage",
      tagline: "Peaceful Ground Floor Budget Stay",
      subtitle: "Ground Floor • Non-AC • 2 Guests • 1 Extra Bed Available",
      floor: "Ground Floor",
      acType: "Non-AC",
      isAC: false,
      pricePerNight: 1000,
      priceDisplay: "₹1,000",
      extraBedCharge: 300,
      extraBedChargeDisplay: "₹300",
      capacity: {
        standard: 2,
        maxExtraBeds: 1,
        totalMax: 3,
        label: "2 guests + up to 1 extra bed",
        summary: "Accommodates 2 guests with up to 1 extra bed (₹300/bed)",
      },
      bed: "1 Double Bed with Fresh Linens",
      layout: "Ground Floor Cottage Room + Private Bathroom + Garden Access",
      kitchenNote: "No kitchen",
      description:
        "A peaceful, non-AC ground-floor cottage set right within the lush green compound. Offers clean, honest comfort for two travelers with a private bathroom, cool natural airflow, and immediate step-out access to the garden and pond.",
      highlights: [
        "Ground floor step-free cottage room",
        "Non-AC accommodation with natural cross-ventilation & fans",
        "Private bathroom with fresh towels",
        "Quiet tropical greenery right outside your door",
        "High-speed Wi-Fi & power backup",
        "Complimentary breakfast included",
      ],
      image: "/images/simple-cottage/simple bed.webp",
      fallbackImage: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1400&q=85",
      isPlaceholder: true,
      gallery: [
        "/images/simple-cottage/simple bed 2.webp",
        "/images/simple-cottage/cottage.webp",
        "/images/simple-cottage/simple kitchen.webp",
      ],
      galleryFallbacks: [
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1507038772120-7ffe76f79d04?auto=format&fit=crop&w=1000&q=80",
      ],
    },
    {
      id: "solo-cottage",
      categoryGroup: "cottages",
      galleryTag: "solo-cottage",
      name: "Solo Cottage",
      tagline: "Affordable Individual Retreat",
      subtitle: "Ground Floor • Non-AC • Bed & Hall • Outside Washroom",
      floor: "Ground Floor",
      acType: "Non-AC",
      isAC: false,
      pricePerNight: 600,
      priceDisplay: "₹600",
      extraBedCharge: 0,
      extraBedChargeDisplay: "N/A",
      capacity: {
        standard: 1,
        maxExtraBeds: 0,
        totalMax: 1,
        label: "1 guest (Solo Stay)",
        summary: "Accommodates 1 guest (Bed & Hall, outside washroom)",
      },
      bed: "1 Single Bed in Cozy Hall Setting",
      layout: "Ground Floor Bed & Hall + Dedicated Outside Washroom",
      kitchenNote: "No kitchen",
      description:
        "An honest, wallet-friendly option tailored for solo wanderers, backpackers, or remote workers looking for a quiet stay in Alappuzha. Features a comfortable bed, hall space, dedicated outside washroom, and peaceful garden surroundings.",
      highlights: [
        "Affordable solo stay in peaceful Kerala compound",
        "Non-AC ground floor layout with bed and hall",
        "Dedicated outside washroom",
        "Quiet garden environment for reading or working",
        "High-speed Wi-Fi across the property",
        "Complimentary breakfast included",
      ],
      image: "/images/simple-cottage/cottage.webp",
      fallbackImage: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=85",
      isPlaceholder: true,
      gallery: [
        "/images/solo-cottage/board.webp",
        "/images/solo-cottage/road.webp",
        "/images/simple-cottage/cottage.webp",
      ],
      galleryFallbacks: [
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=80",
      ],
    },
  ],

  // Garden and Stay Experience Section
  gardenExperience: {
    heading: "A little more space to slow down.",
    copy: "Spend time beside the garden fish pond, relax on the benches, enjoy snacks and casual games at the outdoor table, or simply unwind beneath the trees. Hesil Villa offers a private space to enjoy time together, at your own pace.",
    features: [
      {
        id: "pond",
        title: "Garden & Fish Pond",
        description:
          "A quiet garden featuring a pond with many fish and benches set nearby to sit, unwind, and watch the water in the shade of Kerala trees.",
        tag: "Peaceful Outdoors",
      },
      {
        id: "leisure",
        title: "Outdoor Table for Games & Snacks",
        description:
          "An outdoor table designed for casual board games, morning tea, snacks, and shared meals with family and friends in the open air.",
        tag: "Family & Play",
      },
      {
        id: "greenery",
        title: "Trees & Greenery",
        description:
          "Abundant coconut palms and native Kerala trees within the compound create a calm, natural microclimate away from traffic and noise.",
        tag: "Natural Atmosphere",
      },
      {
        id: "compound",
        title: "Enclosed Compound & Parking",
        description:
          "A boundary wall encloses the entire property, offering security, personal privacy, and dedicated parking space for up to four cars.",
        tag: "Privacy & Space",
      },
    ],
  },

  // Owner Confirmed Amenities (16 Verified Amenities)
  amenities: [
    { title: "Dedicated Workspace", description: "Quiet table space suited for remote work and reading" },
    { title: "High-Speed Wi-Fi", description: "Reliable wireless internet access across all rooms & compound" },
    { title: "Premium Bedding & Linens", description: "Crisp, fresh bed linens with comfortable mattresses" },
    { title: "Firm & Soft Pillow Options", description: "Choice of pillows to suit your sleeping preference" },
    { title: "Extra Blankets", description: "Cozy blankets available upon request" },
    { title: "Shampoo & Conditioner", description: "Essential bath amenities provided in bathrooms" },
    { title: "Body Wash & Hand Soap", description: "Refreshing soap and cleansing wash in every bath area" },
    { title: "Fresh Bath Towels", description: "Clean, freshly laundered towels provided for every guest" },
    { title: "Air Conditioning", description: "Individual climate control in applicable AC suites" },
    { title: "Heating, Fans & Space Heaters", description: "Available for seasonal comfort during cooler evenings" },
    { title: "24/7 Hot Water", description: "Dedicated water heaters in modern bathrooms" },
    { title: "Automatic Power Backup", description: "Inverter backup ensuring continuous lighting, fans and essentials" },
    { title: "Television", description: "TV setup for relaxed family leisure and entertainment" },
    { title: "Parking for Up to 4 Cars", description: "Secure on-premises parking inside the gated boundary wall" },
    { title: "Complimentary Breakfast", description: "Fresh morning breakfast included for all staying guests" },
    { title: "One Kitchen Located Upstairs", description: "Basic kitchen amenities available. Induction stove usage: ₹200 extra" },
  ],

  // Verified Nearby Attractions & Connectivity
  // Format: Place name on LEFT, Distance on RIGHT
  nearbyAttractions: [
    {
      id: "att-temple",
      name: "Kanichukulangara Temple",
      distance: "Approx. 1 km",
      note: "Historic Kerala temple, approximately 1 km away by road.",
    },
    {
      id: "att-harbour",
      name: "Chethy Harbour",
      distance: "Approx. 2 km",
      note: "Coastal fishing harbour and coastal shoreline.",
    },
    {
      id: "att-beach",
      name: "Mararikulam Beach",
      distance: "Approx. 4.5 km",
      note: "Renowned peaceful white sand beach and coastal walk.",
    },
    {
      id: "att-church",
      name: "Arthunkal Church and Beach",
      distance: "Approx. 6 km",
      note: "Historic St. Andrew's Basilica and adjacent coastal beach.",
    },
  ],

  // Curated Mosaic Gallery Collection
  // Supports categories: All, Exterior, Garden, Fish Pond, Upper Suite, Lower Suite, Entire Villa, Cottages, Simple Cottage, Solo Cottage, Kitchen, Common Areas
  gallery: [
    {
      id: "gal-exterior-01",
      src: "/images/exterior/villa-exterior-01.webp",
      fallbackSrc: "/images/exterior/villa-exterior-01.webp",
      alt: "Villa architecture and enclosed private compound at Hesil Villa",
      category: "Exterior",
      categorySlug: "exterior",
      accommodation: ["entire-villa"],
      caption: "Contemporary Kerala villa enclosed within a private boundary wall with tropical trees.",
      featured: true,
      aspect: "landscape",
      isPlaceholder: true,
    },
    {
      id: "gal-pond-01",
      src: "/images/exterior/pond.webp",
      fallbackSrc: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=85",
      alt: "Garden fish pond and relaxation benches at Hesil Villa",
      category: "Fish Pond",
      categorySlug: "pond",
      accommodation: ["entire-villa"],
      caption: "Serene garden pond with fish and surrounding benches to sit, slow down, and unwind.",
      featured: false,
      aspect: "landscape",
      isPlaceholder: true,
    },
    {
      id: "gal-upper-01",
      src: "/images/upper-suite/upper-suite-bedroom-01.webp",
      fallbackSrc: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=85",
      alt: "Upper Suite master bedroom at Hesil Villa",
      category: "Upper Suite",
      categorySlug: "upper-suite",
      accommodation: ["upper-suite", "entire-villa"],
      caption: "Air-conditioned upper suite bedroom filled with gentle natural light.",
      featured: false,
      aspect: "portrait",
      isPlaceholder: true,
    },
    {
      id: "gal-lower-01",
      src: "/images/lower-suite/lower-suite-bedroom-01.webp",
      fallbackSrc: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=900&q=85",
      alt: "Lower Suite bedroom suite at Hesil Villa",
      category: "Lower Suite",
      categorySlug: "lower-suite",
      accommodation: ["lower-suite", "entire-villa"],
      caption: "Ground floor air-conditioned suite offering quiet comfort and step-free verandah access.",
      featured: false,
      aspect: "portrait",
      isPlaceholder: true,
    },
    {
      id: "gal-simple-01",
      src: "/images/simple-cottage/simple bed.webp",
      fallbackSrc: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=85",
      alt: "Simple Cottage ground-floor room at Hesil Villa",
      category: "Simple Cottage",
      categorySlug: "simple-cottage",
      accommodation: ["cottages", "simple-cottage"],
      caption: "Comfortable non-AC ground cottage room with private bathroom and garden breeze.",
      featured: false,
      aspect: "landscape",
      isPlaceholder: true,
    },
    {
      id: "gal-solo-01",
      src: "/images/simple-cottage/cottage.webp",
      fallbackSrc: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85",
      alt: "Solo Cottage bed and hall at Hesil Villa",
      category: "Solo Cottage",
      categorySlug: "solo-cottage",
      accommodation: ["cottages", "solo-cottage"],
      caption: "Cozy, affordable solo staycation space with bed, hall and outside washroom.",
      featured: false,
      aspect: "landscape",
      isPlaceholder: true,
    },
    {
      id: "gal-kitchen-01",
      src: "/images/lower-suite/lowerkitchen.webp",
      fallbackSrc: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85",
      alt: "Kitchen at Hesil Villa",
      category: "Kitchen",
      categorySlug: "kitchen",
      accommodation: ["lower-suite", "entire-villa"],
      caption: "The single dedicated kitchen located lower suite (Induction stove usage: ₹200 extra).",
      featured: false,
      aspect: "landscape",
      isPlaceholder: true,
    },
    {
      id: "gal-benches-01",
      src: "/images/entire-villa/sitout.webp",
      fallbackSrc: "https://images.unsplash.com/photo-1507038772120-7ffe76f79d04?auto=format&fit=crop&w=1200&q=85",
      alt: "Outdoor relaxation benches and table at Hesil Villa",
      category: "Common Areas",
      categorySlug: "common-areas",
      accommodation: ["entire-villa"],
      caption: "Outdoor table and benches for casual board games, snacks, and morning tea beneath the trees.",
      featured: false,
      aspect: "landscape",
      isPlaceholder: true,
    },
    {
      id: "gal-upper-02",
      src: "/images/upper-suite/upper extra.webp",
      fallbackSrc: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=85",
      alt: "Second bedroom in Upper Suite at Hesil Villa",
      category: "Upper Suite",
      categorySlug: "upper-suite",
      accommodation: ["upper-suite", "entire-villa"],
      caption: "Second bedroom upstairs accommodating extra family members or friends.",
      featured: false,
      aspect: "portrait",
      isPlaceholder: true,
    },
    {
      id: "gal-garden-trees-01",
      src: "/images/exterior/tree.webp",
      fallbackSrc: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=85",
      alt: "Compound garden and mature coconut trees at Hesil Villa",
      category: "Garden",
      categorySlug: "garden",
      accommodation: ["entire-villa"],
      caption: "Lush tropical green foliage and quiet garden courtyard with open space for leisure.",
      featured: false,
      aspect: "landscape",
      isPlaceholder: true,
    },
  ],

  // Verified FAQ (Short and factual per brief)
  faqs: [
    {
      question: "What accommodation options are available at Hesil Villa?",
      answer:
        "We offer five accommodation options across two categories: Suites & Entire Villa (Upper Suite with 2 AC bedrooms, Lower Suite with 1 AC bedroom, and the Entire Villa buyout) and Cottages (Simple Cottage with Non-AC for 2 guests, and Solo Cottage with Non-AC for 1 guest).",
    },
    {
      question: "What are the per-night rates and extra-bed charges?",
      answer:
        "Upper Suite (AC, 4 guests): ₹3,000/night (extra bed ₹400 each, max 2). Lower Suite (AC, 2 guests): ₹1,500/night (extra bed ₹400, max 1). Entire Villa (AC, 6 guests): ₹4,000/night (extra bed ₹400 each, max 3). Simple Cottage (Non-AC, 2 guests): ₹1,000/night (extra bed ₹300, max 1). Solo Cottage (Non-AC, 1 guest): ₹600/night (no extra bed).",
    },
    {
      question: "Is complimentary breakfast included?",
      answer:
        "Yes, complimentary breakfast is included for all staying guests across all accommodation types.",
    },
    {
      question: "What are the kitchen facilities and is there an induction charge?",
      answer:
        "There is one kitchen in the property, located upstairs with basic amenities (available with Upper Suite and Entire Villa bookings). Usage of the induction stove is ₹200 extra.",
    },
    {
      question: "What are the check-in and check-out timings?",
      answer:
        "Check-in is at 11:00 AM and check-out is at 10:00 AM. Early check-in or late check-out may be possible depending on availability; please contact the host in advance.",
    },
    {
      question: "Is vehicle parking available on premises?",
      answer:
        "Yes, secure private parking is available for up to four cars inside our enclosed compound with boundary wall.",
    },
    {
      question: "How do I enquire and book?",
      answer:
        "All enquiries and bookings are handled directly via WhatsApp with the host at +91 75105 19751 or +91 94977 31378 with zero middleman commissions.",
    },
  ],
};
