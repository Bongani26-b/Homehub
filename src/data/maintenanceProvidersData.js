export const SERVICE_CATEGORIES = [
  { id: 'all', label: 'All Services', icon: '🛠️' },
  { id: 'plumbing', label: 'Plumbers & Geysers', icon: '🚰' },
  { id: 'electrical', label: 'Electricians & Solar', icon: '⚡' },
  { id: 'gardening', label: 'Gardeners & Lawn Care', icon: '🌿' },
  { id: 'painting', label: 'Painters & Waterproofing', icon: '🎨' },
  { id: 'handyman', label: 'Handyman & Gate Motors', icon: '🔨' },
  { id: 'cleaning', label: 'Deep Cleaning', icon: '✨' }
];

export const SERVICE_PROVIDERS = [
  // 1. Master Plumber - Tembisa & Midrand
  {
    id: 'sp1',
    name: 'Sipho Khumalo',
    businessName: 'Khumalo Express Plumbing & Geyser Specialists',
    category: 'plumbing',
    trade: 'Licensed Plumber & Geyser Tech',
    rating: 4.95,
    reviewsCount: 142,
    hourlyRate: 450,
    location: 'Midrand & Tembisa, GP',
    distanceKm: 1.8,
    responseTime: '< 20 mins',
    verified: true,
    licensed: true,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80',
    bio: 'Licensed plumber with 12+ years experience servicing residential homes in Tembisa, Clayville, Midrand, and Waterfall. Specializing in burst geysers, pipe leaks, drain unblocking, and modern bathroom installations.',
    services: [
      'Burst Geyser Replacement & Element Repair',
      'Emergency Pipe Burst & Leak Detection',
      'Blocked Drain Jetting & Rodding',
      'Bathroom & Shower Fixture Installation',
      'Prepaid Water Meter Installation'
    ],
    portfolio: [
      {
        title: 'Emergency 150L Solar Geyser Replacement in Clayville',
        description: 'Replaced a burst 150-litre geyser with a high-efficiency solar-assisted system including new safety pressure valves and certified PIRB compliance.',
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Modern Matte Black Bathroom Fixtures in Midrand',
        description: 'Fitted dual thermostatic rain shower mixers, freestanding tub plumbing, and under-counter basin traps in a Waterfall townhouse.',
        image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80'
      }
    ],
    reviews: [
      {
        author: 'Lindiwe Ndlovu (Clayville)',
        rating: 5,
        date: '2 days ago',
        comment: 'Sipho arrived within 25 minutes on a Sunday morning when our geyser burst. Replaced the valves promptly with excellent workmanship.'
      },
      {
        author: 'Michael van Zyl (Carlswald)',
        rating: 5,
        date: '1 week ago',
        comment: 'Very professional, transparent pricing in Rands with no hidden charges. Highly recommended for Midrand residents.'
      }
    ]
  },

  // 2. Certified Electrician & Solar Installer
  {
    id: 'sp2',
    name: 'Thabo Mokoena',
    businessName: 'T&M Certified Electrical & Solar Solutions',
    category: 'electrical',
    trade: 'Registered Master Electrician',
    rating: 4.98,
    reviewsCount: 168,
    hourlyRate: 550,
    location: 'Tembisa & Midrand, GP',
    distanceKm: 2.3,
    responseTime: '< 15 mins',
    verified: true,
    licensed: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
    bio: 'Wireman’s License certified electrician providing residential electrical wiring, DB board upgrades, backup solar & inverter installations, fault finding, and Electrical Certificates of Compliance (CoC).',
    services: [
      '5kW & 8kW Inverter & Lithium Battery Installations',
      'Electrical Certificate of Compliance (CoC)',
      'DB Board Rewiring & Tripping Fault Detection',
      'Generator Changeover Switches',
      'LED Architectural Downlighting & Plugs'
    ],
    portfolio: [
      {
        title: '8kW Deye Hybrid Solar & Lithium Inverter Setup',
        description: 'Installed full backup power system in a Noordwyk home with 10 solar panels and 10kWh Dyness battery storage for 100% uninterrupted power.',
        image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Complete DB Board Replacement & CoC Issuance',
        description: 'Replaced faulty breakers with new CBI surge protection and issued official electrical transfer certificate in Winnie Mandela, Tembisa.',
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80'
      }
    ],
    reviews: [
      {
        author: 'Kagiso Molefe (Vorna Valley)',
        rating: 5,
        date: '4 days ago',
        comment: 'Thabo installed our hybrid inverter system smoothly. Very knowledgeable about Eskom regulations and issued CoC on the same day!'
      }
    ]
  },

  // 3. Gardener & Landscaping Specialist
  {
    id: 'sp3',
    name: 'Blessings Ndlovu',
    businessName: 'GreenThumb Landscaping & Garden Services',
    category: 'gardening',
    trade: 'Horticulturist & Garden Specialist',
    rating: 4.91,
    reviewsCount: 95,
    hourlyRate: 280,
    location: 'Midrand, Waterfall & Tembisa',
    distanceKm: 1.1,
    responseTime: '< 30 mins',
    verified: true,
    licensed: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    bio: 'Dedicated landscaping expert offering lawn maintenance, Kikuyu/LM lawn installation, hedge trimming, tree felling, and automated irrigation servicing across Midrand and Tembisa.',
    services: [
      'Weekly / Monthly Lawn Mowing & Edge Trimming',
      'Instant Roll-On Lawn Installation (Kikuyu & Buffalo)',
      'Tree Felling, Pruning & Stump Removal',
      'Garden Refuse Rubble Removal',
      'Automated Irrigation Sprinkler Systems'
    ],
    portfolio: [
      {
        title: 'Complete Lawn Transformation with Instant Kikuyu',
        description: 'Levelled yard, enriched soil, and laid 180sqm of fresh instant lawn with neat garden rockery in Waterfall City.',
        image: 'https://images.unsplash.com/photo-1558904541-efa8c4a57385?auto=format&fit=crop&w=800&q=80'
      }
    ],
    reviews: [
      {
        author: 'Nomsa Sithole (Halfway Gardens)',
        rating: 5,
        date: '1 week ago',
        comment: 'Blessings and his crew cleaned up our overgrown yard in 3 hours. Pristine edges and removed all garden refuse cleanly!'
      }
    ]
  },

  // 4. House Painter & Waterproofing Specialist
  {
    id: 'sp4',
    name: 'Sibusiso Dlamini',
    businessName: 'ProCoat Painting & Roof Waterproofing',
    category: 'painting',
    trade: 'Master Painter & Waterproofing Pro',
    rating: 4.93,
    reviewsCount: 110,
    hourlyRate: 350,
    location: 'Tembisa & Midrand, GP',
    distanceKm: 2.7,
    responseTime: '< 25 mins',
    verified: true,
    licensed: true,
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=256&q=80',
    bio: 'Professional residential painter with 10+ years transforming houses in Tembisa, Phomolong, Clayville, and Midrand. Expert in roof spray painting, exterior crack repair, and damp proofing.',
    services: [
      'Interior & Exterior Wall Painting (Dulux & Plascon)',
      'Tile & Corrugated Roof Rubberized Waterproofing',
      'Damp Proofing & Crack Repair Treatments',
      'Ceiling Painting & Cornice Installation',
      'Boundary Wall & Gate Priming & Coating'
    ],
    portfolio: [
      {
        title: 'Full Exterior Double-Storey Painting & Waterproofing',
        description: 'Repaired hairline plaster cracks, applied weather-resistant textured coat, and painted exterior walls in Clayville East.',
        image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80'
      }
    ],
    reviews: [
      {
        author: 'Bongani Zuma (Phomolong)',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Sibusiso painted my 4-room house inside and outside. Neat lines, very tidy, and finished within schedule.'
      }
    ]
  },

  // 5. Handyman, Gate Motors & Steelworks
  {
    id: 'sp5',
    name: 'Vusi Ndaba',
    businessName: 'Midrand-Tembisa Handyman & Steelworks',
    category: 'handyman',
    trade: 'General Handyman & Welder',
    rating: 4.94,
    reviewsCount: 88,
    hourlyRate: 380,
    location: 'Tembisa & Midrand, GP',
    distanceKm: 1.4,
    responseTime: '< 20 mins',
    verified: true,
    licensed: true,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80',
    bio: 'Experienced local handyman for Centurion gate motor repairs, razor wire/fence welding, tile repairs, door hanging, ceiling boards, and general household repairs.',
    services: [
      'Centurion Gate Motor Repair & Remote Programming',
      'Wall Razor Wire & Security Gate Welding',
      'Floor & Wall Porcelain Tiling Repairs',
      'Door Lock Replacement & Hinge Adjustments',
      'Drywall & Rhino Board Ceiling Patching'
    ],
    portfolio: [
      {
        title: 'Centurion D5-Evo Gate Motor Installation & Steel Gate Service',
        description: 'Installed heavy-duty gate motor with anti-theft bracket and battery backup in Winnie Mandela, Tembisa.',
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80'
      }
    ],
    reviews: [
      {
        author: 'Tebogo Radebe (Birch Acres)',
        rating: 5,
        date: '5 days ago',
        comment: 'Vusi fixed our sliding gate motor and programmed 4 new remotes on the spot. Great pricing and very dependable.'
      }
    ]
  },

  // 6. Deep Cleaning Specialist
  {
    id: 'sp6',
    name: 'Lerato Sithole',
    businessName: 'SparkleClean Home & Move-In Specialists',
    category: 'cleaning',
    trade: 'Professional Cleaning Specialist',
    rating: 4.97,
    reviewsCount: 134,
    hourlyRate: 300,
    location: 'Waterfall, Midrand & Tembisa',
    distanceKm: 2.0,
    responseTime: '< 15 mins',
    verified: true,
    licensed: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    bio: 'Move-in/move-out deep cleaning team equipped with industrial steam extractors, window washers, and eco-friendly products for flats, backrooms, and family homes in Tembisa and Midrand.',
    services: [
      'Pre-Occupation & Move-In Deep Cleaning',
      'Couch & Mattress Steam Shampooing',
      'Carpet Deep Extraction Cleaning',
      'Oven, Stove & Kitchen Degreasing',
      'Post-Construction Dust & Tile Cleaning'
    ],
    portfolio: [
      {
        title: 'Post-Tenancy Move-Out Deep Clean in Waterfall',
        description: 'Complete sanitization of 2-bedroom apartment including steam cleaned carpets, balcony scrub, and oven degreasing.',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80'
      }
    ],
    reviews: [
      {
        author: 'Dikeledi Morake (Erand Gardens)',
        rating: 5,
        date: '3 days ago',
        comment: 'Lerato’s team made our rental apartment spotless before moving in. Smells amazing and sparkling clean!'
      }
    ]
  }
];
