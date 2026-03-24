// Rising — Subscription Storage Utilities

export const PLANS = {
  free: {
    key: 'free',
    name: 'Free',
    price: 0,
    priceDisplay: 'Free forever',
    description: 'Start tracking your home buying journey.',
    color: '#71717a',
    features: [
      { label: 'Track 1 property', included: true },
      { label: 'Basic progress tracking', included: true },
      { label: 'Deposit history', included: true },
      { label: 'Export data', included: false, badge: 'Pro' },
      { label: 'Deposit calculator', included: false, badge: 'Homebuyer' },
      { label: 'Market alerts', included: false, badge: 'Homebuyer' },
      { label: 'Agent contacts', included: false, badge: 'Homebuyer' },
      { label: 'Portfolio view', included: false, badge: 'Investor' },
      { label: 'ROI calculations', included: false, badge: 'Investor' },
      { label: 'Market trends', included: false, badge: 'Investor' },
      { label: 'Unlimited properties', included: false, badge: 'Investor' },
    ],
  },
  homebuyer: {
    key: 'homebuyer',
    name: 'Homebuyer',
    price: 9.99,
    priceDisplay: '$9.99/mo',
    description: 'For first-time buyers serious about closing the deal.',
    color: '#22c55e',
    badge: 'Most Popular',
    features: [
      { label: 'Track 1 property', included: true },
      { label: 'Basic progress tracking', included: true },
      { label: 'Deposit history', included: true },
      { label: 'Deposit calculator', included: true },
      { label: 'Market alerts', included: true },
      { label: 'Agent contacts', included: true },
      { label: 'Export data', included: true },
      { label: 'Portfolio view', included: false, badge: 'Investor' },
      { label: 'ROI calculations', included: false, badge: 'Investor' },
      { label: 'Market trends', included: false, badge: 'Investor' },
      { label: 'Unlimited properties', included: false, badge: 'Investor' },
    ],
  },
  investor: {
    key: 'investor',
    name: 'Investor',
    price: 19.99,
    priceDisplay: '$19.99/mo',
    description: 'Full toolkit for serious property investors.',
    color: '#f59e0b',
    features: [
      { label: 'Unlimited properties', included: true },
      { label: 'Basic progress tracking', included: true },
      { label: 'Deposit history', included: true },
      { label: 'Portfolio view', included: true },
      { label: 'ROI calculations', included: true },
      { label: 'Market trends', included: true },
      { label: 'Deposit calculator', included: true },
      { label: 'Market alerts', included: true },
      { label: 'Agent contacts', included: true },
      { label: 'Export data', included: true },
    ],
  },
};

export function canUsePlan(currentPlan, feature) {
  const order = ['free', 'homebuyer', 'investor'];
  const currentIndex = order.indexOf(currentPlan);

  if (feature === 'unlimited_properties') {
    return currentIndex >= order.indexOf('investor');
  }
  if (feature === 'export_data') {
    return currentIndex >= order.indexOf('homebuyer');
  }
  if (['deposit_calculator', 'market_alerts', 'agent_contacts'].includes(feature)) {
    return currentIndex >= order.indexOf('homebuyer');
  }
  if (['portfolio_view', 'roi_calculations', 'market_trends'].includes(feature)) {
    return currentIndex >= order.indexOf('investor');
  }
  if (feature === 'basic_tracking') {
    return true; // always available
  }
  return currentIndex >= order.indexOf('free');
}

export function getPlanFromKey(key) {
  return PLANS[key] || PLANS.free;
}

export const SAMPLE_PROPERTIES = [
  {
    id: 'prop-1',
    address: '4212 Maple Ridge Drive',
    city: 'Portland, OR',
    price: 485000,
    beds: 3,
    baths: 2,
    sqft: 1650,
    type: 'Craftsman',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    downPaymentPercent: 20,
    estimatedPayment: 2748,
    neighborhood: 'Alberta Arts District',
  },
  {
    id: 'prop-2',
    address: '887 Queen Anne Ave N',
    city: 'Seattle, WA',
    price: 725000,
    beds: 4,
    baths: 2.5,
    sqft: 2100,
    type: 'Victorian',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    downPaymentPercent: 20,
    estimatedPayment: 4110,
    neighborhood: 'Queen Anne Hill',
  },
  {
    id: 'prop-3',
    address: '3301 Oak Street',
    city: 'Austin, TX',
    price: 395000,
    beds: 3,
    baths: 2,
    sqft: 1480,
    type: 'Mid-Century Ranch',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
    downPaymentPercent: 10,
    estimatedPayment: 2340,
    neighborhood: 'Barton Hills',
  },
];

export const DEPOSIT_SCENARIOS = [
  {
    label: '5% Down Payment',
    percent: 5,
    description: 'PMI required, lower upfront cost',
    example: '$21,250 on $425,000 home',
    monthly: '$2,847/mo',
  },
  {
    label: '10% Down Payment',
    percent: 10,
    description: 'Less PMI, better rate',
    example: '$42,500 on $425,000 home',
    monthly: '$2,640/mo',
  },
  {
    label: '20% Down Payment',
    percent: 20,
    description: 'No PMI, best long-term value',
    example: '$85,000 on $425,000 home',
    monthly: '$2,410/mo',
  },
];
