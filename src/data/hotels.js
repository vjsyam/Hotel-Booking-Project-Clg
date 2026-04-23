// Using local image paths for existing assets + Unsplash URLs for unique hotel images.
import standard from '../components/standard.jpeg';
import deluxe from '../components/delexue.jpeg';
import suite from '../components/suite.jpeg';
import accessible from '../components/Acc.jpeg';
import family from '../components/family.jpeg';
import oceanview from '../components/oceanview.jpg';
import connecting from '../components/connecting.jpg';
import villa from '../components/villa.jpg';

export const hotelData = [
  // ─── INDIA-BASED HOTELS ─────────────────────────────────
  {
    id: 17,
    name: 'Taj Lake Palace',
    location: 'Udaipur, Rajasthan',
    description: 'A floating marble palace on Lake Pichola. Iconic royal heritage, butler service, and sunset boat rides.',
    price: 42000,
    rating: 4.9,
    reviews: 1850,
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&h=400&fit=crop',
    tags: ['Luxury', 'Romantic', 'Cultural'],
    amenities: ['Lake View', 'Butler Service', 'Heritage Tours', 'Spa']
  },
  {
    id: 18,
    name: 'The Oberoi',
    location: 'Mumbai, Maharashtra',
    description: 'Iconic 5-star hotel overlooking Marine Drive and the Arabian Sea. World-class dining and business suites.',
    price: 32000,
    rating: 4.8,
    reviews: 2300,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop',
    tags: ['Business', 'Luxury', 'City Center'],
    amenities: ['Sea View', 'Conference Room', 'Infinity Pool', 'Fine Dining']
  },
  {
    id: 19,
    name: 'Backwater Houseboat Stay',
    location: 'Alleppey, Kerala',
    description: 'Cruise the serene Kerala backwaters on a traditional kettuvallam houseboat with fresh local cuisine.',
    price: 12500,
    rating: 4.7,
    reviews: 980,
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&h=400&fit=crop',
    tags: ['Nature', 'Relaxation', 'Cultural'],
    amenities: ['Private Houseboat', 'Local Cuisine', 'Backwater Cruise', 'Sunset Views']
  },
  {
    id: 20,
    name: 'Himalayan Mountain Lodge',
    location: 'Manali, Himachal Pradesh',
    description: 'A cozy wooden lodge surrounded by pine forests and snow-peaked Himalayas. Perfect for trekking and skiing.',
    price: 8500,
    rating: 4.6,
    reviews: 620,
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&h=400&fit=crop',
    tags: ['Adventure', 'Nature', 'Budget'],
    amenities: ['Mountain View', 'Fireplace', 'Trekking Guides', 'Bonfire']
  },
  {
    id: 21,
    name: 'ITC Grand Chola',
    location: 'Chennai, Tamil Nadu',
    description: 'A palatial luxury hotel inspired by the Chola dynasty. Multiple award-winning restaurants and lavish interiors.',
    price: 28000,
    rating: 4.8,
    reviews: 1400,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&h=400&fit=crop',
    tags: ['Luxury', 'Business', 'Cultural'],
    amenities: ['Multiple Restaurants', 'Pool', 'Spa', 'Convention Center']
  },
  {
    id: 22,
    name: 'Heritage Haveli',
    location: 'Jaipur, Rajasthan',
    description: 'A 200-year-old restored haveli in the Pink City. Rooftop dining with views of Nahargarh Fort.',
    price: 9500,
    rating: 4.5,
    reviews: 530,
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&h=400&fit=crop',
    tags: ['Cultural', 'Budget', 'Romantic'],
    amenities: ['Rooftop Restaurant', 'Fort View', 'Heritage Walk', 'Cooking Class']
  },
  {
    id: 23,
    name: 'Tea Estate Bungalow',
    location: 'Darjeeling, West Bengal',
    description: 'Wake up surrounded by rolling tea gardens with panoramic views of Kanchenjunga. Includes private tea tasting.',
    price: 7200,
    rating: 4.7,
    reviews: 340,
    image: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=600&h=400&fit=crop',
    tags: ['Relaxation', 'Nature', 'Budget'],
    amenities: ['Tea Garden View', 'Tea Tasting', 'Toy Train Access', 'Library']
  },
  {
    id: 24,
    name: 'Goa Beachfront Resort',
    location: 'Calangute, Goa',
    description: 'Premium beachfront resort with private beach access, water sports, live music nights, and infinity pools.',
    price: 18500,
    rating: 4.6,
    reviews: 2700,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop',
    tags: ['Nightlife', 'Beachfront', 'Groups'],
    amenities: ['Private Beach', 'Water Sports', 'Night Club', 'Pool Bar']
  },

  // ─── INTERNATIONAL HOTELS ──────────────────────────────
  {
    id: 1,
    name: 'The Grand Sapphire Resort',
    location: 'Maldives',
    description: 'A 5-star beachfront paradise featuring overwater bungalows, diving excursions, and an award-winning spa.',
    price: 36000,
    rating: 4.9,
    reviews: 1240,
    image: oceanview,
    tags: ['Relaxation', 'Beachfront', 'Luxury'],
    amenities: ['Private Pool', 'Ocean View', 'Spa', 'Free Wi-Fi']
  },
  {
    id: 2,
    name: 'Metropolitan Neon Suites',
    location: 'Tokyo, Japan',
    description: 'High-tech smart rooms located directly in the heart of Shibuya. Overlook the glowing city skyline.',
    price: 20000,
    rating: 4.7,
    reviews: 890,
    image: suite,
    tags: ['Nightlife', 'City Center', 'Modern'],
    amenities: ['Smart Home', 'City View', 'Gym']
  },
  {
    id: 3,
    name: 'Alpine Eco-Lodge',
    location: 'Swiss Alps',
    description: 'Sustainable luxury lodge hidden in the snow-capped mountains. Perfect for skiing and natural serenity.',
    price: 25000,
    rating: 4.8,
    reviews: 412,
    image: standard,
    tags: ['Adventure', 'Nature', 'Eco-friendly'],
    amenities: ['Ski Access', 'Fireplace', 'Sauna']
  },
  {
    id: 4,
    name: 'Sunset Family Villas',
    location: 'Bali, Indonesia',
    description: 'Spacious 3-bedroom villas with a large communal pool and kid-friendly entertainment rooms.',
    price: 14500,
    rating: 4.5,
    reviews: 2150,
    image: family,
    tags: ['Family', 'Relaxation', 'Budget'],
    amenities: ['Kitchen', 'Large Pool', 'Kids Club']
  },
  {
    id: 5,
    name: 'The Accessible Haven',
    location: 'London, UK',
    description: 'Fully designed for inclusive access, offering low-barrier entries, wider doors, and a prime central location.',
    price: 12000,
    rating: 4.6,
    reviews: 530,
    image: accessible,
    tags: ['Accessible', 'City Center'],
    amenities: ['Roll-in Shower', 'Elevator', 'Restaurant nearby']
  },
  {
    id: 6,
    name: 'Twin Peaks Connect',
    location: 'Seattle, WA',
    description: 'Adjoining rooms perfect for larger groups or extended families wanting to stay together but keep privacy.',
    price: 17500,
    rating: 4.4,
    reviews: 310,
    image: connecting,
    tags: ['Family', 'Groups', 'City Center'],
    amenities: ['Connecting Doors', 'Fast Wi-Fi', 'Coffee Machine']
  },
  {
    id: 7,
    name: 'Azure Private Villa',
    location: 'Santorini, Greece',
    description: 'Iconic white-washed architecture overlooking the endless blue Aegean sea. Utter privacy and supreme luxury.',
    price: 48000,
    rating: 5.0,
    reviews: 80,
    image: villa,
    tags: ['Luxury', 'Romantic', 'Relaxation'],
    amenities: ['Infinity Pool', 'Butler Service', 'Complimentary Breakfast']
  },
  {
    id: 8,
    name: 'Urban Deluxe Hub',
    location: 'New York, NY',
    description: 'A stylish, perfectly located deluxe room in Manhattan for the busy traveler.',
    price: 24000,
    rating: 4.3,
    reviews: 1500,
    image: deluxe,
    tags: ['Business', 'City Center', 'Modern'],
    amenities: ['Workspace', 'Gym', 'Bar']
  },
  {
    id: 9,
    name: 'Bamboo Rainforest Retreat',
    location: 'Costa Rica',
    description: 'Immerse yourself in nature in these elevated bamboo treehouses deep in the rainforest.',
    price: 10500,
    rating: 4.7,
    reviews: 420,
    image: 'https://images.unsplash.com/photo-1618767689160-da3fb810aad7?w=600&h=400&fit=crop',
    tags: ['Nature', 'Adventure', 'Eco-friendly'],
    amenities: ['Hiking Trails', 'Hammocks', 'Wildlife Tours']
  },
  {
    id: 10,
    name: 'Neon Cyber Capsule',
    location: 'Seoul, South Korea',
    description: 'The ultimate minimalist smart capsule experience. High speed gaming setups in every pod.',
    price: 6800,
    rating: 4.4,
    reviews: 3200,
    image: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=600&h=400&fit=crop',
    tags: ['Budget', 'Modern', 'Solo'],
    amenities: ['Gaming PC', 'High-Speed Internet', 'Shared Lounge']
  },
  {
    id: 11,
    name: 'The Historic Plaza',
    location: 'Rome, Italy',
    description: 'A classic 18th-century hotel located steps from the Colosseum. Old world charm meets modern comfort.',
    price: 27500,
    rating: 4.8,
    reviews: 900,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop',
    tags: ['Cultural', 'City Center', 'Romantic'],
    amenities: ['Fine Dining', 'Historical Tours', 'Concierge']
  },
  {
    id: 12,
    name: 'Desert Oasis Glamping',
    location: 'Sahara, Morocco',
    description: 'Luxury tents under the stars. Experience camel rides and traditional Berber music by the fire.',
    price: 16800,
    rating: 4.9,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop',
    tags: ['Adventure', 'Nature', 'Romantic'],
    amenities: ['Firepit', 'Stargazing', 'Guided Tours']
  },
  {
    id: 13,
    name: 'Miami Party Suites',
    location: 'Miami, FL',
    description: 'Located right on South Beach. Rooftop pool parties and VIP club access included with your stay.',
    price: 28000,
    rating: 4.5,
    reviews: 1100,
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&h=400&fit=crop',
    tags: ['Nightlife', 'Groups', 'Beachfront'],
    amenities: ['Pool Bar', 'Club Access', 'DJ Events']
  },
  {
    id: 14,
    name: 'Quiet Country Cottage',
    location: 'Cotswolds, UK',
    description: 'A serene, peaceful stone cottage perfect for escaping the city noise. Read by the fire.',
    price: 13000,
    rating: 4.8,
    reviews: 650,
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&h=400&fit=crop',
    tags: ['Relaxation', 'Nature', 'Romantic'],
    amenities: ['Fireplace', 'Garden', 'Pet Friendly']
  },
  {
    id: 15,
    name: 'Business Class Towers',
    location: 'Dubai, UAE',
    description: 'Towering above the skyline, offering state-of-the-art conference rooms and helicopter pads.',
    price: 44000,
    rating: 4.6,
    reviews: 780,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop',
    tags: ['Business', 'Luxury', 'City Center'],
    amenities: ['Conference Room', 'Helipad', 'Valet Parking']
  },
  {
    id: 16,
    name: 'The Inclusive Resort',
    location: 'Cancun, Mexico',
    description: 'An all-inclusive mega-resort with 10 restaurants, 5 pools, and activities for the entire family.',
    price: 24000,
    rating: 4.4,
    reviews: 4500,
    image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=600&h=400&fit=crop',
    tags: ['Family', 'Beachfront', 'Relaxation'],
    amenities: ['All-inclusive meals', 'Kids Club', 'Waterpark']
  }
];

export const destinations = [
  { id: 1, name: 'Udaipur', popular: true, image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h=300&fit=crop' },
  { id: 2, name: 'Goa', popular: true, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop' },
  { id: 3, name: 'Kerala', popular: true, image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&h=300&fit=crop' },
  { id: 4, name: 'Jaipur', popular: true, image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400&h=300&fit=crop' },
  { id: 5, name: 'Manali', popular: true, image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400&h=300&fit=crop' },
  { id: 6, name: 'Mumbai', popular: true, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop' },
];
