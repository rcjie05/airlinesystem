const flightSchedules = [
  {
    id: 1,
    flightNo: '5J 560',
    airline: 'SkyJet',
    from: 'Manila',
    to: 'Tokyo',
    departTime: '08:30',
    terminal: 'T1',
    hours: 4,
    seats: 20,
    tripOptions: {
      oneway: { price: 340, fareType: 'Promo', type: 'oneway' },
      roundtrip: { price: 510, fareType: 'Promo', type: 'roundtrip', returnTime: '18:00' }
    }
  },
  {
    id: 2,
    flightNo: 'PR 212',
    airline: 'PhilAir',
    from: 'Manila',
    to: 'New York',
    departTime: '22:00',
    terminal: 'T3',
    hours: 14,
    seats: 8,
    tripOptions: {
      oneway: { price: 920, fareType: 'Regular', type: 'oneway' },
      roundtrip: { price: 1380, fareType: 'Regular', type: 'roundtrip', returnTime: null } // Assume no fixed return for now
    }
  },
  {
    id: 3,
    flightNo: 'AK 321',
    airline: 'AeroKing',
    from: 'Cebu',
    to: 'Manila',
    departTime: '06:45',
    terminal: 'T2',
    hours: 1.5,
    seats: 30,
    tripOptions: {
      oneway: { price: 75, fareType: 'Promo', type: 'oneway' },
      roundtrip: { price: 113, fareType: 'Promo', type: 'roundtrip', returnTime: '12:15' }
    }
  },
  {
    id: 4,
    flightNo: 'QZ 410',
    airline: 'QuickAir',
    from: 'Manila',
    to: 'Singapore',
    departTime: '09:50',
    terminal: 'T1',
    hours: 3.5,
    seats: 12,
    tripOptions: {
      oneway: { price: 180, fareType: 'Regular', type: 'oneway' },
      roundtrip: { price: 270, fareType: 'Regular', type: 'roundtrip', returnTime: '15:00' }
    }
  },
  {
    id: 5,
    flightNo: 'XN 102',
    airline: 'Xplore',
    from: 'Manila',
    to: 'Tokyo',
    departTime: '13:15',
    terminal: 'T2',
    hours: 4.5,
    seats: 6,
    tripOptions: {
      oneway: { price: 360, fareType: 'Regular', type: 'oneway' },
      roundtrip: { price: 540, fareType: 'Regular', type: 'roundtrip', returnTime: null } // Assume no fixed return for now
    }
  },
  {
    id: 6,
    flightNo: 'XN 103',
    airline: 'Xplore',
    from: 'Manila',
    to: 'Himalaya',
    departTime: '14:00',
    terminal: 'T2',
    hours: 5,
    seats: 10,
    tripOptions: {
      oneway: { price: 400, fareType: 'Regular', type: 'oneway' },
      roundtrip: { price: 600, fareType: 'Regular', type: 'roundtrip', returnTime: null } // Assume no fixed return for now
    }
  },
  {
    id: 7,
    flightNo: 'XN 104',
    airline: 'Xplore',
    from: 'Manila',
    to: 'Boracay',
    departTime: '10:30',
    terminal: 'T2',
    hours: 1,
    seats: 15,
    tripOptions: {
      oneway: { price: 120, fareType: 'Promo', type: 'oneway' },
      roundtrip: { price: 180, fareType: 'Promo', type: 'roundtrip', returnTime: null } // Assume no fixed return for now
    }
  },
  {
    id: 8,
    flightNo: 'CE 501',
    airline: 'CebuPac',
    from: 'Manila',
    to: 'Cebu',
    departTime: '07:00',
    terminal: 'T2',
    hours: 1.5,
    seats: 25,
    tripOptions: {
      oneway: { price: 90, fareType: 'Promo', type: 'oneway' },
      roundtrip: { price: 135, fareType: 'Promo', type: 'roundtrip', returnTime: null } // Assume no fixed return for now
    }
  }
];