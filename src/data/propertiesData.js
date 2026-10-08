export const PROPERTIES = [
  // 1. TEMBISA - Clayville East Family Home
  {
    id: 'p1',
    title: 'Modern 3-Bedroom Freestanding Family Home',
    type: 'House',
    mode: 'buy',
    price: 980000,
    priceMonthly: 8500,
    location: 'Tembisa, Gauteng',
    address: '24 Milkwood Crescent, Clayville East, Tembisa, 1666',
    neighborhood: 'Clayville East',
    coordinates: { lat: -25.9815, lng: 28.2321 },
    distanceKm: 1.2,
    beds: 3,
    baths: 2,
    sqft: 220, // sq metres
    yearBuilt: 2021,
    garage: 2,
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true,
    virtualTour: true,
    verified: true,
    landmarks: [
      'Clayville Shopping Centre (1.1 km)',
      'Midrand Corporate Parks via Olifantsfontein Rd (12 mins)',
      'Tembisa Mall (4.2 km)'
    ],
    amenities: [
      'Fully Paved Yard & Automated Gate',
      'Modern Fitted Kitchen with Granite Tops',
      'Built-in Bedroom Cupboards',
      'Solar Geyser Installed',
      'Prepaid Electricity Meter'
    ],
    description:
      'Stunning modern 3-bedroom family home in Clayville East, Tembisa. Quick commute to Midrand commercial parks, Olifantsfontein industrial zone, and Tembisa retail centres. Features a spacious open-plan lounge, ultra-modern fitted kitchen with granite countertops, and secure lock-up carport.',
    agent: {
      name: 'Kagiso Mthethwa',
      role: 'Direct Seller / Owner',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
      phone: '+27 82 459 1082',
      email: 'kagiso.m@propertyhub.co.za',
      rating: 4.95,
      reviewsCount: 42
    },
    hoa: 0,
    propertyTaxRate: 1.1
  },

  // 2. TEMBISA - Neat En-Suite Bachelor Room
  {
    id: 'p2',
    title: 'Neat En-Suite Bachelor Room to Rent with Prepaid Meter',
    type: 'Room to Rent',
    mode: 'rent',
    price: 180000,
    priceMonthly: 2200,
    location: 'Tembisa, Gauteng',
    address: 'Block 4, Winnie Mandela Park, Tembisa, 1632',
    neighborhood: 'Winnie Mandela',
    coordinates: { lat: -25.9928, lng: 28.2145 },
    distanceKm: 0.8,
    beds: 1,
    baths: 1,
    sqft: 35,
    yearBuilt: 2022,
    garage: 1,
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true,
    virtualTour: false,
    verified: true,
    landmarks: [
      'Phomolong Taxi Rank (5 mins walk)',
      'Tembisa Tertiary Hospital (3.1 km)',
      'Midrand Gautrain Link (15 mins)'
    ],
    amenities: [
      'Private Inside Bathroom (Shower, Basin, Toilet)',
      'Prepaid Electricity Meter',
      'Tiled Flooring & Ceiling',
      'High Security Perimeter Wall & Lockable Gate',
      'Close to Taxi Ranks & Phomolong Station'
    ],
    description:
      'Immaculate en-suite bachelor room in Winnie Mandela, Tembisa. Equipped with private hot shower and toilet inside, tiled floor, burglar bars, and parking space. Peaceful and well-managed yard near local shopping complexes, taxi ranks, and transit routes into Midrand.',
    agent: {
      name: 'Nokuthula Dladla',
      role: 'Property Host / Landlord',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
      phone: '+27 73 891 4420',
      email: 'nokuthula@tembisarentals.co.za',
      rating: 4.92,
      reviewsCount: 38
    },
    hoa: 0,
    propertyTaxRate: 1.0
  },

  // 3. MIDRAND - Luxury Waterfall City Apartment (Near PwC Tower & Mall of Africa)
  {
    id: 'p3',
    title: 'Luxury 2-Bed Polofields Waterfall Apartment near PwC Tower',
    type: 'Apartment',
    mode: 'buy',
    price: 2150000,
    priceMonthly: 14500,
    location: 'Midrand, Gauteng',
    address: 'Polofields Drive, Waterfall City, Midrand, 1685',
    neighborhood: 'Waterfall City',
    coordinates: { lat: -26.0125, lng: 28.1182 },
    distanceKm: 0.9,
    beds: 2,
    baths: 2,
    sqft: 118,
    yearBuilt: 2022,
    garage: 2,
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true,
    virtualTour: true,
    verified: true,
    landmarks: [
      'PwC Tower Waterfall (4 mins / 0.9 km)',
      'Mall of Africa (1.2 km)',
      'Deloitte Waterfall Campus (1.5 km)',
      'Netcare Waterfall City Hospital (1.8 km)',
      'Gautrain Midrand Station (6 mins drive)'
    ],
    amenities: [
      'Walk to PwC Tower & Mall of Africa',
      'Signature Lifestyle Centre (Gym, Pool, Spa, Squash)',
      'Integrated SMEG Appliances (Fridge, Washer, Dishwasher)',
      '24/7 Biometric Guarded Security',
      'Fibre Ready & Solar Supplemented'
    ],
    description:
      'High-end 2-bedroom, 2-bathroom ground floor apartment in Waterfall City, Midrand. Located less than 4 minutes from PwC Tower, Mall of Africa, and the Deloitte campus. Ideal for corporate professionals relocating to Midrand. Includes integrated SMEG appliances, covered patio with gas braai, and lifestyle centre.',
    agent: {
      name: 'Thabo Mokoena',
      role: 'Owner / Seller',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
      phone: '+27 84 312 9980',
      email: 'thabo@midrandproperties.co.za',
      rating: 4.98,
      reviewsCount: 76
    },
    hoa: 1450,
    propertyTaxRate: 1.2
  },

  // 4. MIDRAND - Carlswald 1-Bedroom Loft / Apartment
  {
    id: 'p4',
    title: 'Modern Executive 1-Bedroom Loft in Carlswald near PwC & N1',
    type: 'Apartment',
    mode: 'rent',
    price: 890000,
    priceMonthly: 7500,
    location: 'Midrand, Gauteng',
    address: '82 Tamboti Road, Carlswald, Midrand, 1684',
    neighborhood: 'Carlswald',
    coordinates: { lat: -25.9842, lng: 28.1245 },
    distanceKm: 1.5,
    beds: 1,
    baths: 1,
    sqft: 68,
    yearBuilt: 2020,
    garage: 1,
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true,
    virtualTour: true,
    verified: true,
    landmarks: [
      'PwC Tower / Waterfall City (6 mins / 3.8 km)',
      'Carlswald Lifestyle Shopping Centre (2 mins walk)',
      'Vodacom Corporate Park (4.2 km)',
      'N1 Allandale Offramp (5 mins)'
    ],
    amenities: [
      'Clubhouse & Swimming Pool',
      'Covered Parking & 24hr Guardhouse',
      'High-Speed Fibre Optic Internet',
      'Private Balcony with Sunset Views',
      'Walk to Carlswald Lifestyle Shopping Centre'
    ],
    description:
      'Chic executive 1-bedroom loft apartment in Carlswald, Midrand. Convenient 6-minute drive to PwC Tower in Waterfall City, Mall of Africa, and Vodacom HQ. Features an open-plan granite kitchen, high ceiling lounge flowing onto a scenic balcony, and top-tier security.',
    agent: {
      name: 'Lerato Sithole',
      role: 'Direct Landlord',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      phone: '+27 71 654 2210',
      email: 'lerato@carlswaldliving.co.za',
      rating: 4.88,
      reviewsCount: 29
    },
    hoa: 820,
    propertyTaxRate: 1.1
  },

  // 5. TEMBISA - Phomolong Private Backroom / Bachelor
  {
    id: 'p5',
    title: 'Spacious Bachelor Flat with Fitted Kitchenette in Phomolong',
    type: 'Room to Rent',
    mode: 'rent',
    price: 220000,
    priceMonthly: 2800,
    location: 'Tembisa, Gauteng',
    address: '15 Mvelase Street, Phomolong, Tembisa, 1632',
    neighborhood: 'Phomolong',
    coordinates: { lat: -26.0084, lng: 28.2198 },
    distanceKm: 0.5,
    beds: 1,
    baths: 1,
    sqft: 42,
    yearBuilt: 2023,
    garage: 1,
    images: [
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: false,
    virtualTour: false,
    verified: true,
    landmarks: [
      'Phomolong Metrorail Station (350m)',
      'Tembisa Mall (3.5 km)',
      'Midrand Industrial Corridors (15 mins)'
    ],
    amenities: [
      'Fitted Kitchen Sink & Cupboards',
      'En-Suite Bathroom with Hot Shower',
      'Full Porcelain Tiles',
      'Secure High Gates & Night Floodlights',
      'Prepaid Meter'
    ],
    description:
      'Newly built self-contained bachelor flat in Phomolong, Tembisa. Features modern ceiling design, shiny porcelain tiles, fitted kitchen cupboards, and own clean bathroom. Located in a quiet yard just 2 minutes from transport routes into Midrand and Kempton Park.',
    agent: {
      name: 'Vusi Ndaba',
      role: 'Property Owner',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80',
      phone: '+27 83 229 8812',
      email: 'vusi@tembisafurnished.co.za',
      rating: 4.96,
      reviewsCount: 51
    },
    hoa: 0,
    propertyTaxRate: 1.0
  },

  // 6. MIDRAND - Vorna Valley Room to Rent (Minutes to PwC Tower & Mall of Africa)
  {
    id: 'p6',
    title: 'Furnished Private Room in Vorna Valley — 5 Mins to PwC & Mall of Africa',
    type: 'Room to Rent',
    mode: 'rent',
    price: 350000,
    priceMonthly: 3800,
    location: 'Midrand, Gauteng',
    address: 'Berger Road, Vorna Valley, Midrand, 1686',
    neighborhood: 'Vorna Valley',
    coordinates: { lat: -26.0021, lng: 28.1287 },
    distanceKm: 1.1,
    beds: 1,
    baths: 1,
    sqft: 40,
    yearBuilt: 2019,
    garage: 1,
    images: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: false,
    virtualTour: false,
    verified: true,
    landmarks: [
      'PwC Tower Waterfall (4 mins / 1.8 km)',
      'Mall of Africa (1.1 km)',
      'Deloitte Waterfall (2.0 km)',
      'Vodacom Corporate Park (2.4 km)',
      'Midrand Gautrain Station (5 mins)'
    ],
    amenities: [
      'Walk to Mall of Africa & PwC Precinct',
      'Includes Water & Uncapped Fibre WiFi',
      'Shared Fully Equipped Modern Kitchen',
      'Swimming Pool in Complex',
      'Covered Parking Bay'
    ],
    description:
      'Bright, secure furnished room in a gated Vorna Valley townhouse, Midrand. Highly popular with corporate interns and professionals relocating to work at PwC Tower, Deloitte, or Vodacom. Rent includes fast unlimited Wi-Fi, water, covered parking, and communal pool.',
    agent: {
      name: 'Sipho Khumalo',
      role: 'Host / Tenant Rep',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=256&q=80',
      phone: '+27 82 990 1234',
      email: 'sipho@midrandrooms.co.za',
      rating: 4.9,
      reviewsCount: 19
    },
    hoa: 0,
    propertyTaxRate: 1.0
  },

  // 7. MIDRAND - Noordwyk 3-Bedroom Freehold Home
  {
    id: 'p7',
    title: 'Charming 3-Bedroom Standalone House with Private Garden in Noordwyk',
    type: 'House',
    mode: 'buy',
    price: 1650000,
    priceMonthly: 12500,
    location: 'Midrand, Gauteng',
    address: 'Lever Road, Noordwyk, Midrand, 1687',
    neighborhood: 'Noordwyk',
    coordinates: { lat: -25.9684, lng: 28.1342 },
    distanceKm: 2.4,
    beds: 3,
    baths: 2,
    sqft: 185,
    yearBuilt: 2018,
    garage: 2,
    images: [
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true,
    virtualTour: true,
    verified: true,
    landmarks: [
      'Vodacom Corporate Park (3.5 km)',
      'PwC Tower Waterfall (7 mins / 5.2 km)',
      'Gautrain Midrand Station (4.8 km)',
      'San Ridge Square & Carlswald Shopping (1.5 km)'
    ],
    amenities: [
      'Lush Pet-Friendly Private Lawn',
      'Double Automated Lock-Up Garage',
      'Solar Backup Inverter System',
      'Built-in Braai Entertainment Area',
      'Close to Midrand Primary & High Schools'
    ],
    description:
      'Beautiful freestanding 3-bedroom family house in Noordwyk, Midrand. Easy 7-minute commute to PwC Tower, Vodacom Campus, and Gautrain Midrand Station. Boasts a modern open kitchen with scullery, master bedroom with en-suite bath, sunny private garden, and a hybrid solar inverter.',
    agent: {
      name: 'Ayanda Zwane',
      role: 'Seller / Property Owner',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      phone: '+27 76 102 3344',
      email: 'ayanda@noordwykhomes.co.za',
      rating: 4.97,
      reviewsCount: 64
    },
    hoa: 350,
    propertyTaxRate: 1.1
  },

  // 8. TEMBISA - Birch Acres / Tembisa 4-Bed House
  {
    id: 'p8',
    title: 'Spacious 4-Bedroom Home with Outbuilding & Swimming Pool',
    type: 'House',
    mode: 'buy',
    price: 1350000,
    priceMonthly: 11000,
    location: 'Tembisa, Gauteng',
    address: 'Kwartel Road, Birch Acres / Tembisa, 1630',
    neighborhood: 'Birch Acres',
    coordinates: { lat: -26.0215, lng: 28.2045 },
    distanceKm: 1.9,
    beds: 4,
    baths: 2.5,
    sqft: 240,
    yearBuilt: 2017,
    garage: 2,
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true,
    virtualTour: true,
    verified: true,
    landmarks: [
      'Birch Acres Mall (1.4 km)',
      'OR Tambo International Airport (14 mins)',
      'Midrand Business Hub via Allandale (15 mins)'
    ],
    amenities: [
      'Sparkling Swimming Pool & Lapa',
      'Separate 1-Bed Cottage / Outbuilding (Rental Income)',
      'Double Carport & Electric Gate',
      'Spacious Kitchen with Scullery'
    ],
    description:
      'Imposing 4-bedroom property on the Tembisa-Birch Acres border. Perfect for a growing family or investor relocating to Gauteng, featuring an income-generating outside cottage, sparkling swimming pool with thatch lapa, and secure walling.',
    agent: {
      name: 'Kagiso Mthethwa',
      role: 'Direct Seller',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
      phone: '+27 82 459 1082',
      email: 'kagiso.m@propertyhub.co.za',
      rating: 4.95,
      reviewsCount: 42
    },
    hoa: 0,
    propertyTaxRate: 1.1
  }
];

export const CITIES = [
  'Tembisa, Gauteng',
  'Midrand, Gauteng',
  'Waterfall City, Midrand',
  'Carlswald, Midrand',
  'Vorna Valley, Midrand',
  'Noordwyk, Midrand',
  'Clayville, Tembisa'
];
