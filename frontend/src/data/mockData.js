// Pass It On — Mock Data Model based on Project Brief

export const CURRENT_USER = {
  id: 'usr_sarmad',
  name: 'Sarmad Rj',
  email: 'sarmad@comsats.edu.pk',
  role: 'member', // member or admin
  isLender: true,
  isBorrower: true,
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
  rating: 4.95,
  reviewsCount: 38,
  activeBorrows: 2,
  activeListings: 4,
};

export const LISTINGS = [
  {
    id: 'item_1',
    title: 'Sony Alpha A7 IV Mirrorless Camera + 24-70mm f/2.8',
    category: 'Cameras & Video',
    dailyPrice: 45,
    depositAmount: 300,
    image: '/images/camera.jpg',
    owner: {
      name: 'Sarmad Rj',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      rating: 4.95,
      responseRate: '100%',
      responseTime: '< 15 mins'
    },
    location: 'Sector H-8 / COMSATS Campus',
    description: 'Ultra-crisp 33MP full-frame hybrid camera with 4K 60p recording, FE 24-70mm GM lens, 2x batteries, charger, and 128GB high-speed SD card. Perfect for student film projects and weekend photoshoots.',
    status: 'active',
    features: ['33MP Full-Frame', '4K 60p 10-Bit Video', '2x 2280mAh Batteries', '128GB V90 Card Included'],
    bookedRanges: [
      { start: '2026-10-22', end: '2026-10-25', borrower: 'Hamza Tariq', bookingId: 'BK-1082' },
      { start: '2026-11-04', end: '2026-11-07', borrower: 'Ayesha Khan', bookingId: 'BK-1095' },
    ],
    blockedRanges: [
      { start: '2026-10-29', end: '2026-10-30', reason: 'Lens sensor sensor cleaning & calibration' }
    ]
  },
  {
    id: 'item_2',
    title: 'DeWalt 20V MAX Cordless Drill & Impact Driver Combo Kit',
    category: 'Power Tools',
    dailyPrice: 18,
    depositAmount: 80,
    image: '/images/drill.jpg',
    owner: {
      name: 'Usman Ghani',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
      rating: 4.88,
      responseRate: '98%',
      responseTime: '< 30 mins'
    },
    location: 'Sector F-7, Islamabad',
    description: 'Heavy duty brushless drill/driver kit with two 4.0Ah batteries, rapid charger, magnetic bit holder, and 30-piece drill and screwdriver bit set. Ideal for home shelving and DIY lab builds.',
    status: 'active',
    features: ['Brushless Motor', '2x 4.0Ah Batteries', 'Rapid Charger', '30pc Bit Set'],
    bookedRanges: [
      { start: '2026-10-23', end: '2026-10-24', borrower: 'Bilal Ahmad', bookingId: 'BK-1084' }
    ],
    blockedRanges: []
  },
  {
    id: 'item_3',
    title: 'Trek Fuel EX 8 Full-Suspension Mountain Bike (Size L)',
    category: 'Bicycles & Mobility',
    dailyPrice: 38,
    depositAmount: 250,
    image: '/images/bike.jpg',
    owner: {
      name: 'Zainab Malik',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      rating: 5.0,
      responseRate: '100%',
      responseTime: '< 10 mins'
    },
    location: 'Sector E-11, Islamabad',
    description: 'High performance trail mountain bike with FOX Rhythm 34 suspension, Shimano XT 12-speed drivetrain, hydraulic disc brakes, and tubeless tires. Cleaned and tuned after every ride.',
    status: 'active',
    features: ['Fox 34 Float Fork', 'Shimano XT 12s', 'Hydraulic Brakes', 'Helmet & Lock Included'],
    bookedRanges: [
      { start: '2026-10-27', end: '2026-10-29', borrower: 'Omar Farooq', bookingId: 'BK-1089' }
    ],
    blockedRanges: []
  },
  {
    id: 'item_4',
    title: 'Coleman WeatherMaster 4-Person Dome Camping Tent',
    category: 'Outdoor & Camping',
    dailyPrice: 22,
    depositAmount: 90,
    image: '/images/tent.jpg',
    owner: {
      name: 'Fahad Rauf',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      rating: 4.92,
      responseRate: '95%',
      responseTime: '< 45 mins'
    },
    location: 'Sector G-10, Islamabad',
    description: 'Waterproof 4-person dome tent with WeatherTec system, rainfly, screened room, and ground tarp. Quick 15-minute setup. Cleaned, aired, and dried properly.',
    status: 'active',
    features: ['WeatherTec Waterproof', 'Rainfly Included', 'Ground Tarp', 'Stakes & Mallet'],
    bookedRanges: [],
    blockedRanges: []
  },
  {
    id: 'item_5',
    title: 'DJI Mini 4 Pro Drone + RC 2 Smart Controller',
    category: 'Cameras & Video',
    dailyPrice: 42,
    depositAmount: 220,
    image: '/images/drone.jpg',
    owner: {
      name: 'Sarmad Rj',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      rating: 4.95,
      responseRate: '100%',
      responseTime: '< 15 mins'
    },
    location: 'COMSATS Campus',
    description: 'Sub-249g ultralight drone with 4K HDR True Vertical shooting, omnidirectional obstacle sensing, 3x intelligent flight batteries, and high-brightness screen controller.',
    status: 'active',
    features: ['Omnidirectional Sensing', '4K 60fps HDR', '3x Flight Batteries', 'Fly More Bag'],
    bookedRanges: [
      { start: '2026-10-31', end: '2026-11-02', borrower: 'Daniyal Qureshi', bookingId: 'BK-1091' }
    ],
    blockedRanges: []
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'All Categories', icon: 'Sparkles', count: 48 },
  { id: 'tools', name: 'Power Tools', icon: 'Wrench', count: 14 },
  { id: 'cameras', name: 'Cameras & Video', icon: 'Camera', count: 11 },
  { id: 'outdoor', name: 'Outdoor & Camping', icon: 'Compass', count: 9 },
  { id: 'bicycles', name: 'Bicycles & Trail', icon: 'Bike', count: 8 },
  { id: 'tech', name: 'Electronics & Audio', icon: 'Cpu', count: 6 },
];

export const ADMIN_STATS = {
  totalMembers: 1428,
  activeListings: 184,
  conflictFreeBookings: 84,
  preventedDoubleBookings: 19,
  mockEscrowHeld: 14650,
  openDisputes: 3,
  disputeResolutionRate: '96.4%'
};

export const DISPUTES = [
  {
    id: 'DISP-201',
    bookingId: 'BK-1077',
    itemTitle: 'DeWalt 20V MAX Cordless Drill Kit',
    reporter: 'Usman Ghani (Lender)',
    respondent: 'Bilal Ahmad (Borrower)',
    reason: 'Tool returned with deep crack on battery housing and missing 1/4" magnetic bit adapter.',
    heldDeposit: 80,
    status: 'open', // open, investigating, resolved
    createdAt: '2026-10-19 14:30',
    proposedResolution: 'Deduct $35 for battery housing replacement, release $45 back to borrower.'
  },
  {
    id: 'DISP-202',
    bookingId: 'BK-1071',
    itemTitle: 'Trek Fuel EX 8 Mountain Bike',
    reporter: 'Zainab Malik (Lender)',
    respondent: 'Saad Rafique (Borrower)',
    reason: 'Returned 26 hours past agreed return time without prior notice; caused lender to reschedule another borrower.',
    heldDeposit: 250,
    status: 'investigating',
    createdAt: '2026-10-18 19:15',
    proposedResolution: 'Deduct 1 additional day rental ($38) + $20 late fee, refund remainder ($192).'
  },
  {
    id: 'DISP-203',
    bookingId: 'BK-1065',
    itemTitle: 'Sony FE 70-200mm f/2.8 GM Lens',
    reporter: 'Hamza Tariq (Borrower)',
    respondent: 'Kamran Shah (Lender)',
    reason: 'Lender claimed autofocus malfunction upon return, but borrower took time-stamped video before handover showing autofocus had same delay at pickup.',
    heldDeposit: 350,
    status: 'open',
    createdAt: '2026-10-19 10:05',
    proposedResolution: 'Examine video proof. If pre-existing, release full $350 deposit back to borrower.'
  }
];

export const OVERLAP_MONITOR_LOGS = [
  {
    id: 'LOG-992',
    timestamp: '10:42:15 AM',
    action: 'DOUBLE-BOOKING PREVENTED',
    item: 'Sony Alpha A7 IV',
    attemptedBy: 'User #419 (Ali Rehman)',
    attemptedRange: 'Oct 23 - Oct 25, 2026',
    conflictedWith: 'Booking #BK-1082 (Oct 22 - Oct 25)',
    layerCaught: 'Database Rule & Calendar UI',
    status: 'REJECTED_CLEANLY'
  },
  {
    id: 'LOG-991',
    timestamp: '10:15:02 AM',
    action: 'SIMULTANEOUS REQUEST RESOLVED',
    item: 'DJI Mini 4 Pro Drone',
    attemptedBy: 'Parallel Threads T-1 & T-2',
    attemptedRange: 'Oct 31 - Nov 02, 2026',
    conflictedWith: 'Atomic Transaction Guard',
    layerCaught: 'Booking Service Lock',
    status: 'T1_ACCEPTED_T2_SAFELY_NOTIFIED'
  },
  {
    id: 'LOG-990',
    timestamp: '09:30:44 AM',
    action: 'VALID BOOKING CONFIRMED',
    item: 'Coleman 4-Person Dome Tent',
    attemptedBy: 'User #312 (Zoya Q.)',
    attemptedRange: 'Nov 08 - Nov 11, 2026',
    conflictedWith: 'None (Clean Dates)',
    layerCaught: 'Pass All 3 Layers',
    status: 'LOCKED_CONFLICT_FREE'
  }
];
