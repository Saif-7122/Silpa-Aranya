export interface ProjectMetric {
  id: string;
  value: string;
  label: string;
  detail: string;
}

export interface HouseType {
  id: '1bhk' | '2bhk' | 'manduva';
  name: string;
  subtitle: string;
  brochureTagline: string;
  builtUpNote: string;
  plotBaseline: string;
  architectureStyle: string;
  idealFor: string;
  highlights: string[];
  image: string;
  imageAlt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  category: 'Homes' | 'Nature' | 'Clubhouse & Fun' | 'Real Site Photos';
  mediaType: 'brochure' | 'actual-site';
  image: string;
  alt: string;
}

export interface MasterplanZone {
  id: string;
  code: string;
  title: string;
  category: string;
  xPercent: number;
  yPercent: number;
  summary: string;
  specs: string[];
  image: string;
  mediaType: 'brochure' | 'actual-site';
}

export interface LocationNode {
  id: string;
  name: string;
  corridor: string;
  distanceOrTime: string;
  status: string;
  description: string;
  sourceNote: string;
}

export interface AmenityCluster {
  id: string;
  title: string;
  subtitle: string;
  items: string[];
  image: string;
  imageAlt: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const BRAND_INFO = {
  brandName: 'ARANYA',
  officialProjectName: 'Silpa Aranya',
  tagline: 'Own Your Escape. Invest in Your Tomorrow.',
  brochureTagline: 'Return to Real',
  supportingMessage:
    'A place where weekends feel like a family holiday, greenery surrounds your home, and your land holds long-term value.',
  developer: 'Skandhanshi Infra Projects India Pvt. Ltd.',
  developerGroup: 'Skandhanshi Group & Silpa Infratech',
  locationShort: 'Chevella to Manneguda Road (NH-163), Hyderabad',
  siteAddress: 'Silpa Aranya, 8XFP+9J3, Mirzapur, Telangana 501102',
  sitePlusCode: '8XFP+9J3',
  siteCoordinates: { lat: 17.3269173, lng: 77.9858625 },
  googleMapsDirectionsUrl:
    'https://www.google.com/maps/dir//SILPA+ARANYA,+8XFP%2B9J3,+Mirzapur,+Telangana+501102/@17.4083899,78.3500869,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3bcbe1eedead7ff5:0x36e31a44dc96a1d9!2m2!1d77.9858625!2d17.3269173?entry=ttu',
  corporateAddress:
    '#4-50/P-1/14 & 15, Phase-1, Jayabheri Enclave, Gachibowli, Landmark: NEXA Showroom Lane, Behind The Platina, Serlingampally Mandal, Rangareddy District, Telangana.',
  phone: '92475 75834',
  phoneHref: 'tel:+919247575834',
  email: 'info@skandhanshi.com',
  brochurePdfUrl: '/assets/aistudio/SILPA_ARANYA_Brochure_RT_d93ff0ba.pdf',
};

export const HERO_METRICS: ProjectMetric[] = [
  {
    id: 'land',
    value: '112 Acres',
    label: 'Gated Farm Community',
    detail: 'Large green layout with red laterite soil and tree-lined roads',
  },
  {
    id: 'plots',
    value: '447 Plots',
    label: 'From 514 Sq. Yds.',
    detail: 'Spacious farm plots starting around ₹11,999 per sq. yd. (base info-sheet rate)',
  },
  {
    id: 'homes',
    value: '3 Home Designs',
    label: 'From 525 Sq. Ft.',
    detail: 'Choose from 1 BHK, 2 BHK, or traditional Manduva courtyard homes',
  },
  {
    id: 'clubhouse',
    value: '17,000 Sq. Ft.',
    label: 'Clubhouse & Pool',
    detail: 'Swimming pool, farm-fresh dining, indoor games, and family lawns',
  },
];

export const FARMLAND_INFRASTRUCTURE = [
  {
    title: 'Pure Red Laterite Soil',
    detail: 'Rich natural red soil that helps fruit trees and home gardens grow well.',
  },
  {
    title: 'Grand Entrance Gate',
    detail: 'Wide, welcoming entrance arch opening off a 100-ft main approach road.',
  },
  {
    title: '33 Ft & 50 Ft BT Roads',
    detail: 'Smooth black-top internal roads lined with shade trees and Mahogany.',
  },
  {
    title: 'Water & Drip Lines',
    detail: 'HDPE water pipeline with drip irrigation connected to every plot.',
  },
  {
    title: 'Power to Every Plot',
    detail: 'Electricity connection planned right up to each individual farm plot.',
  },
  {
    title: 'Overhead Tank & Sump',
    detail: 'Central water storage built for steady daily and weekend supply.',
  },
  {
    title: '24/7 Security',
    detail: 'Compounded boundary and round-the-clock gate security for peace of mind.',
  },
];

export const PLOT_PLANTATIONS: string[] = [
  'Anjeer (Fig)',
  'Pomegranate',
  'Amla',
  'Custard Apple',
  'Avocado',
  'Coconut',
  'Kala Jamun (Neredu)',
  'Jack Fruit (Panasa)',
  'Sweet Lime',
  'Mango (Different Varieties)',
  'Papaya',
  'Dragon Fruit',
];

export const HOUSE_TYPES: HouseType[] = [
  {
    id: '1bhk',
    name: '1 BHK Weekend Home',
    subtitle: 'From 525 Sq. Ft. Farmhouse',
    brochureTagline: 'The Simplicity of Real Living',
    builtUpNote: 'Starts from 525 Sq. Ft.',
    plotBaseline: 'Built on 514+ Sq. Yd. farm plots',
    architectureStyle: 'Warm wooden ceiling, big glass windows, and a raised sit-out porch',
    idealFor: 'Couples, small families & weekend stay guests',
    highlights: [
      'Open sit-out verandah facing your own fruit garden',
      'Large glass windows that bring in natural breeze and daylight',
      'Smart compact layout that leaves plenty of open lawn space',
    ],
    image: '/assets/brochure/house-1bhk.jpg',
    imageAlt: 'ARANYA 1 BHK weekend farmhouse surrounded by green lawn in evening light',
  },
  {
    id: '2bhk',
    name: '2 BHK Family Farm Villa',
    subtitle: 'Spacious Modern Weekend Home',
    brochureTagline: 'The Luxury of Real Space',
    builtUpNote: 'Larger two-bedroom layout on 514+ Sq. Yd. plots',
    plotBaseline: 'Stepped garden path & green boundary buffer',
    architectureStyle: 'Clean modern walls, covered outdoor patio, and warm wooden soffits',
    idealFor: 'Joint families, friends’ getaways & longer stays',
    highlights: [
      'Two comfortable bedrooms opening out to quiet garden views',
      'Wide front lawn ideal for family dinners and small celebrations',
      'Easy indoor-to-outdoor flow with plenty of shade',
    ],
    image: '/assets/brochure/house-2bhk.jpg',
    imageAlt: 'ARANYA 2 BHK modern farmhouse surrounded by green lawn and stepping stones',
  },
  {
    id: 'manduva',
    name: 'Manduva Courtyard House',
    subtitle: 'Traditional Telugu Courtyard Home',
    brochureTagline: 'The Charm of Real Heritage',
    builtUpNote: 'Classic central open-courtyard design',
    plotBaseline: 'Wide shaded verandah, tiled roof & garden entry',
    architectureStyle: 'Terracotta roof tiles, wooden verandah pillars, and an open central courtyard',
    idealFor: 'Families who love traditional charm & festive gatherings',
    highlights: [
      'Open-to-sky inner courtyard that keeps the home naturally cool',
      'Traditional red-ochre base design with carved wooden front doors',
      'Long front verandah to relax with morning tea and family',
    ],
    image: '/assets/brochure/house-manduva.jpg',
    imageAlt: 'ARANYA Manduva heritage courtyard farmhouse with terracotta roof tiles',
  },
];

export const AMENITY_CLUSTERS: AmenityCluster[] = [
  {
    id: 'clubhouse',
    title: 'Clubhouse & Organic Dining',
    subtitle: '17,000 Sq. Ft. Clubhouse with Swimming Pool',
    items: [
      '17,000 Sq. Ft. Clubhouse with Swimming Pool',
      'Fresh farm-to-table organic dining area',
      'Traditional woodfire cooking experiences',
      'Warm stone courtyard seating for neighbours & friends',
    ],
    image: '/assets/brochure/clubhouse-hub.jpg',
    imageAlt: 'Families chatting around stone tables under evening lights at the clubhouse',
  },
  {
    id: 'wellness',
    title: 'Yoga, Wellness & Work-from-Nature',
    subtitle: 'Stay Healthy or Work Quietly Amid Trees',
    items: [
      'Panchatatva Five-Element barefoot walking trail',
      'Meditation deck & open-air Yoga Pavilion',
      'Open-air workstations & nature co-working space',
      'Quiet reading corner & senior citizen sit-out area',
    ],
    image: '/assets/brochure/wellness-coworking.jpg',
    imageAlt: 'Yoga pavilion, meditation deck, and open-air workstations beside greenery',
  },
  {
    id: 'farm-animal',
    title: 'Goshala & Organic Farming',
    subtitle: 'Real Village Experiences for Kids & Families',
    items: [
      'Goshala with Punganur cows & petting zone',
      'Animal feeding activities for children',
      'Hands-on organic farming & seed planting',
      'Fruit & vegetable picking across 12 plot varieties',
    ],
    image: '/assets/brochure/goshala-farm.jpg',
    imageAlt: 'Children gently petting a Punganur calf and rabbits in a sunny paddock',
  },
  {
    id: 'sports-adventure',
    title: 'Sports, Games & Adventure',
    subtitle: 'Active Fun for Every Age',
    items: [
      'Cricket practice net, football & basketball courts',
      'Archery zone, cycling tracks & ATV bike trails',
      'Obstacle course & weekend camping zone',
      'Indoor gaming lounge with carrom, chess, VR & board games',
    ],
    image: '/assets/brochure/outdoor-sports.jpg',
    imageAlt: 'Outdoor sports zone with cricket net, football, basketball, and cycling track',
  },
  {
    id: 'social-picnic',
    title: 'Bonfire Lawn & Picnic Spots',
    subtitle: 'Evenings Made for Unhurried Conversations',
    items: [
      'Bonfire arena, outdoor movie screen & event lawn',
      'Music & cultural activity space',
      'Family picnic lawns, hammock garden & private gazebos',
      'Lake-view photo deck & hanging swing points',
    ],
    image: '/assets/brochure/bonfire-social.jpg',
    imageAlt: 'Families sitting around an evening bonfire with live music and warm lights',
  },
];

export const LOCATION_NODES: LocationNode[] = [
  {
    id: 'orr-exit18',
    name: 'Gachibowli via ORR Exit 18 (TSPA Junction)',
    corridor: 'Gachibowli → Nehru ORR → NH-163',
    distanceOrTime: '~1 Hr Drive from Gachibowli (40 Mins from ORR Exit 18)',
    status: 'Ready & Operational',
    description:
      'About a 1-hour smooth drive from Gachibowli, Financial District, and Kokapet via Nehru ORR Exit 18 onto NH-163.',
    sourceNote: 'Official ARANYA Brochure (p. 29)',
  },
  {
    id: 'nh163',
    name: 'NH-163 Chevella–Manneguda Highway',
    corridor: 'Main Highway Access',
    distanceOrTime: 'Direct Highway Belt',
    status: 'NHAI Highway Expansion Focus',
    description:
      'Connected via NH-163 (brochure mentions 6-lane NH-163 corridor; NHAI is expanding the APPA Junction–Manneguda stretch).',
    sourceNote: 'Brochure (p. 1, p. 29) & NHAI records',
  },
  {
    id: 'rrr',
    name: 'Proposed Regional Ring Road (RRR) — South',
    corridor: 'Choutuppal – Shadnagar – Chevella – Sangareddy',
    distanceOrTime: 'About 1 Km Away (Proposed)',
    status: 'Proposed / Planning Stage',
    description:
      'Brochure places ARANYA about 1 km from the proposed RRR near Chevella–Manneguda. The Southern Arc is still in planning/DPR stage and not yet built.',
    sourceNote: 'Brochure (p. 29) & Telangana RRR updates',
  },
  {
    id: 'chevella-manneguda',
    name: 'Chevella Town & Manneguda',
    corridor: 'Nearby Towns',
    distanceOrTime: 'Short Local Drive',
    status: 'Established Towns',
    description:
      'Located off Chevella–Manneguda Road near Mirzapur and Parigi Road turnoffs, close to daily essentials.',
    sourceNote: 'Official ARANYA Brochure Map (p. 29)',
  },
  {
    id: 'ananthagiri',
    name: 'Ananthagiri Hills (Vikarabad)',
    corridor: 'Weekend Hill Getaway',
    distanceOrTime: '~17 Km from Manneguda',
    status: 'Popular Green Destination',
    description:
      'Famous forest hills, viewpoints, and morning drive spot just past Manneguda toward Vikarabad.',
    sourceNote: 'Verified local distance',
  },
];

export const CORRIDOR_COMPARISON = [
  {
    zone: 'Closer West Hyderabad Plotted Areas',
    indicativeRange: '₹18,000 – ₹25,000 / Sq. Yd.',
    context: 'Approximate rates seen in established plotted areas nearer to ORR and city hubs.',
    note: 'Reference only — not ARANYA pricing or guaranteed future price.',
  },
  {
    zone: 'Chevella Main Road Plotted Layouts',
    indicativeRange: '₹12,000 – ₹16,500+ / Sq. Yd.',
    context: 'Typical market range for plotted layouts around Chevella town (2026 listings).',
    note: 'Varies depending on approvals, highway frontage, and facilities.',
  },
  {
    zone: 'ARANYA — 112-Acre Farm Community (Near Manneguda)',
    indicativeRange: '₹11,999 / Sq. Yd. (Starting Base)',
    context: 'Plots from 514 sq. yds. with 12 fruit trees, drip lines, 33/50 ft BT roads & 17,000 sq. ft. clubhouse.',
    note: 'Indicative starting figure from project info-sheet; confirm final plot & home price with our team.',
  },
];

export const MASTERPLAN_ZONES: MasterplanZone[] = [
  {
    id: 'entrance',
    code: '01',
    title: '100-Ft Boulevard & Main Gate',
    category: 'Entry & Security',
    xPercent: 18,
    yPercent: 78,
    summary:
      'Already built on site — a striking entrance gate off the 100-ft road with 24/7 security.',
    specs: ['100-Ft Wide Approach Road', '24/7 Security Gate', 'Built on site (Shot at Sight)'],
    image: '/assets/brochure/site-arch-actual.jpg',
    mediaType: 'actual-site',
  },
  {
    id: 'plots',
    code: '02',
    title: '447 Farm Plots & Fruit Trees',
    category: 'Your Land',
    xPercent: 48,
    yPercent: 52,
    summary:
      '112 acres divided into 447 plots starting at 514 sq. yds., with 33 ft & 50 ft BT roads, power, and drip water lines.',
    specs: ['Starting 514 Sq. Yds.', '12 Fruit Tree Varieties per Plot', 'Pure Red Laterite Soil'],
    image: '/assets/brochure/site-plots-actual.jpg',
    mediaType: 'actual-site',
  },
  {
    id: 'clubhouse',
    code: '03',
    title: '17,000 Sq. Ft. Clubhouse & Pool',
    category: 'Community Centre',
    xPercent: 72,
    yPercent: 34,
    summary:
      'The social heart for swimming, dining, indoor games, and family celebrations — construction is visibly underway on site.',
    specs: ['17,000 Sq. Ft. Clubhouse (Brochure)', 'Swimming Pool & Dining', 'Indoor Games & Event Lawn'],
    image: '/assets/brochure/site-clubhouse-actual.jpg',
    mediaType: 'actual-site',
  },
  {
    id: 'wellness',
    code: '04',
    title: 'Panchatatva Trail & Yoga Deck',
    category: 'Health & Calm',
    xPercent: 34,
    yPercent: 28,
    summary:
      'Barefoot five-element walking path, meditation deck, outdoor work tables, and shady garden sit-outs.',
    specs: ['Panchatatva Walking Loop', 'Yoga & Meditation Deck', 'Outdoor Workstations'],
    image: '/assets/brochure/panchatatva-trail.jpg',
    mediaType: 'brochure',
  },
  {
    id: 'villas',
    code: '05',
    title: 'Weekend Cottages (3 Designs)',
    category: 'Ready Concepts',
    xPercent: 60,
    yPercent: 68,
    summary:
      'Pick from a 1 BHK home (from 525 sq. ft.), 2 BHK Villa, or classic Manduva courtyard house — sample cottages are already on site.',
    specs: ['1 BHK / 2 BHK / Manduva', 'Sample cottages visible on site', 'Built for relaxed weekends'],
    image: '/assets/brochure/site-cottages-actual.jpg',
    mediaType: 'actual-site',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-arch-1bhk',
    title: '1 BHK Weekend Home',
    caption: 'Warm timber ceiling, glass living room, and garden sit-out.',
    category: 'Homes',
    mediaType: 'brochure',
    image: '/assets/brochure/house-1bhk.jpg',
    alt: '1 BHK glass and timber farmhouse view',
  },
  {
    id: 'g-arch-2bhk',
    title: '2 BHK Family Farm Villa',
    caption: 'Spacious two-bedroom layout opening onto a wide lawn.',
    category: 'Homes',
    mediaType: 'brochure',
    image: '/assets/brochure/house-2bhk.jpg',
    alt: '2 BHK modern weekend home view',
  },
  {
    id: 'g-arch-manduva',
    title: 'Manduva Courtyard House',
    caption: 'Traditional Telugu courtyard design with terracotta roof tiles.',
    category: 'Homes',
    mediaType: 'brochure',
    image: '/assets/brochure/house-manduva.jpg',
    alt: 'Traditional Manduva courtyard house view',
  },
  {
    id: 'g-arch-twilight',
    title: 'Evening Courtyard Neighbourhood',
    caption: 'Warm garden lights and peaceful courtyard homes at dusk.',
    category: 'Homes',
    mediaType: 'brochure',
    image: '/assets/brochure/farmland-twilight.jpg',
    alt: 'Evening aerial view of Manduva courtyard villas',
  },
  {
    id: 'g-nat-panchatatva',
    title: 'Panchatatva Wellness Trail',
    caption: 'Five-element barefoot walking path around an evening firepit.',
    category: 'Nature',
    mediaType: 'brochure',
    image: '/assets/brochure/panchatatva-trail.jpg',
    alt: 'Circular Panchatatva wellness trail and firepit',
  },
  {
    id: 'g-nat-hammock',
    title: 'Morning Hammock Grove',
    caption: 'Quiet tree-shaded hammocks and reading corners.',
    category: 'Nature',
    mediaType: 'brochure',
    image: '/assets/brochure/forest-hammock.jpg',
    alt: 'Reading in a hammock among tall trees in morning light',
  },
  {
    id: 'g-nat-planting',
    title: 'Family Fruit & Vegetable Plots',
    caption: '12 fruit-tree varieties planned for every plot including Mango, Fig & Avocado.',
    category: 'Nature',
    mediaType: 'brochure',
    image: '/assets/brochure/family-planting.jpg',
    alt: 'Family planting saplings together in garden beds',
  },
  {
    id: 'g-club-hub',
    title: 'Clubhouse Gathering Courtyard',
    caption: 'Friendly stone seating around the 17,000 sq. ft. Clubhouse.',
    category: 'Clubhouse & Fun',
    mediaType: 'brochure',
    image: '/assets/brochure/clubhouse-hub.jpg',
    alt: 'Clubhouse courtyard gathering under evening lights',
  },
  {
    id: 'g-club-harvest',
    title: 'Farm-Fresh Outdoor Cafe',
    caption: 'Open-air dining under lush green trees.',
    category: 'Clubhouse & Fun',
    mediaType: 'brochure',
    image: '/assets/brochure/harvest-cafe.jpg',
    alt: 'Outdoor farm-to-table organic dining courtyard under trees',
  },
  {
    id: 'g-club-bonfire',
    title: 'Bonfire & Music Evenings',
    caption: 'Outdoor movie lawn, live music, and family bonfire nights.',
    category: 'Clubhouse & Fun',
    mediaType: 'brochure',
    image: '/assets/brochure/bonfire-social.jpg',
    alt: 'Families gathered around an evening bonfire with live music',
  },
  {
    id: 'g-club-sports',
    title: 'Outdoor Sports & Cycling',
    caption: 'Cricket net, football, basketball, archery, and cycling paths.',
    category: 'Clubhouse & Fun',
    mediaType: 'brochure',
    image: '/assets/brochure/outdoor-sports.jpg',
    alt: 'Outdoor sports courts and cycling track',
  },
  {
    id: 'g-site-arch',
    title: 'Main Entrance Gate — Real Site',
    caption: 'Real on-site photo showing the completed entrance gate and BT road.',
    category: 'Real Site Photos',
    mediaType: 'actual-site',
    image: '/assets/brochure/site-arch-actual.jpg',
    alt: 'Real on-site photo of the constructed ARANYA entrance gate',
  },
  {
    id: 'g-site-aerial',
    title: '112-Acre Land View — Real Site',
    caption: 'Real aerial photo showing laid internal roads, compound wall, and plantations.',
    category: 'Real Site Photos',
    mediaType: 'actual-site',
    image: '/assets/brochure/site-aerial-actual.jpg',
    alt: 'Real aerial site photo of the 112-acre ARANYA land',
  },
  {
    id: 'g-site-cottages',
    title: 'Sample Cottages & Plots — Real Site',
    caption: 'Real site photo of sample cottages, paved roads, and planted fruit trees.',
    category: 'Real Site Photos',
    mediaType: 'actual-site',
    image: '/assets/brochure/site-cottages-actual.jpg',
    alt: 'Real site photo showing sample cottages and green avenue trees',
  },
  {
    id: 'g-site-clubhouse',
    title: 'Clubhouse Work in Progress — Real Site',
    caption: 'Real site photo showing the clubhouse building coming up on site.',
    category: 'Real Site Photos',
    mediaType: 'actual-site',
    image: '/assets/brochure/site-clubhouse-actual.jpg',
    alt: 'Real site photo of clubhouse construction progress',
  },
];

export const BUYING_STEPS = [
  {
    step: '01',
    title: 'Contact Our Team',
    description:
      'Fill out the short 2-step form to get plot availability, current pricing, and a call or Google Meet at a time that suits you.',
  },
  {
    step: '02',
    title: 'Visit the Site with Your Family',
    description:
      'Take a relaxed 1-hour drive from Gachibowli via ORR Exit 18 along NH-163. Walk the red-soil plots, see the completed entrance gate, and check the sample cottages.',
  },
  {
    step: '03',
    title: 'Pick Your Plot & Home Design',
    description:
      'Choose your plot starting from 514 sq. yds. and select a 1 BHK, 2 BHK, or Manduva farmhouse option that fits your budget and plans.',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'what-is-aranya',
    question: 'What is ARANYA (Silpa Aranya)?',
    answer:
      'Silpa Aranya by Skandhanshi Infra Projects India Pvt. Ltd. (Skandhanshi Group & Silpa Infratech) is a 112-acre gated farm-home community with 447 plots starting from 514 sq. yds., along with 1 BHK (from 525 sq. ft.), 2 BHK, and Manduva weekend home options.',
  },
  {
    id: 'location',
    question: 'Where is the project located?',
    answer:
      'It is located off the Chevella to Manneguda Road along NH-163 near Mirzapur / Manneguda, West Hyderabad, Telangana.',
  },
  {
    id: 'weekend-home',
    question: 'Why does it work well as a weekend home?',
    answer:
      'Every plot has red laterite soil, 12 fruit-tree varieties, and drip water lines. Plus, families get a 17,000 sq. ft. clubhouse with swimming pool, Panchatatva walking trail, Goshala with Punganur cows, bonfire lawns, sports courts, and open-air workstations.',
  },
  {
    id: 'hyderabad-connectivity',
    question: 'How long does it take to reach from Hyderabad?',
    answer:
      'It is about a 1-hour drive from Gachibowli (and around 40 minutes from ORR Exit 18 / TSPA Junction as noted in the brochure) via NH-163 through Moinabad and Chevella, with a 100-ft wide entrance road.',
  },
  {
    id: 'rrr-benefit',
    question: 'How does the proposed Regional Ring Road (RRR) help?',
    answer:
      'The brochure notes the project is around 1 km from the proposed RRR Southern Arc alignment near Chevella–Manneguda. Since the Southern Arc is still in planning and DPR stages (not built yet), look at it as a long-term future connector rather than a ready road.',
  },
  {
    id: 'rental-management',
    question: 'Can we earn rental income when we are not using the house?',
    answer:
      'Yes, owners can explore short weekend stays through holiday-home operators or platforms like Airbnb, depending on operator availability, local rules, community guidelines, demand, and maintenance costs. No fixed rental income or occupancy is promised.',
  },
  {
    id: 'specifications',
    question: 'What basic facilities are included in the layout?',
    answer:
      '112 acres total land, 447 plots from 514 sq. yds., 33 ft & 50 ft black-top roads, 100 ft entrance road, Grand Entrance Gate, electricity to all plots, HDPE water lines with drip irrigation to each plot, overhead tank with sump, Mahogany avenue trees, and 24/7 security.',
  },
  {
    id: 'site-visit',
    question: 'How do we book a site visit?',
    answer:
      'Just fill in your name, mobile number, and city in the Contact Our Team form on this page, or call 92475 75834 / email info@skandhanshi.com.',
  },
  {
    id: 'ownership-details',
    question: 'How do we confirm exact prices, approvals, and booking steps?',
    answer:
      'The project info-sheet mentions a starting plot rate of ₹11,999 per sq. yd. Please confirm final plot prices, house construction costs, payment schedules, and legal/approval documents directly with Skandhanshi Infra Projects India Pvt. Ltd. before booking.',
  },
];
