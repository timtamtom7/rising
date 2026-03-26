// Company Structure and Investment Readiness - Rising

export const COMPANY = {
  name: 'Rising Technologies, Inc.',
  founded: '2023',
  website: 'rising.app',
  structure: 'C-Corp (Delaware)',
  stage: 'Bootstrapped / Pre-seed',
  employees: 1,
};

export const SUBSCRIPTION_PRICING = {
  free: { name: 'Free', price: 0, properties: 5 },
  homebuyer: { name: 'Homebuyer', price: 9.99, properties: -1, features: ['Unlimited properties', 'AI insights', 'Market trends'] },
  complete: { name: 'Complete', price: 14.99, properties: -1, features: ['Everything in Homebuyer', 'Plaid sync', 'Agent matching'] },
};

export const FINANCIAL_METRICS = {
  arr: 0,
  arrTarget: 500000,
  activeSubscribers: 0,
  churnRate: 0.04,
  ltv: 240,
  cac: 18,
  get progressToTarget() { return Math.min(1, this.arr / this.arrTarget); },
};

export const INVESTMENT_CHECKLIST = [
  { title: 'Business Plan', completed: true, notes: 'Homeownership platform strategy' },
  { title: 'Financial Model', completed: true, notes: 'ARR projections to $500K' },
  { title: 'Cap Table', completed: false, notes: 'Pending legal setup' },
  { title: 'Pitch Deck', completed: false, notes: 'Needs first-time buyer angle' },
  { title: 'Unit Economics', completed: true, notes: 'LTV:CAC > 3x' },
];

export const HIRING_PLAN = [
  { role: 'iOS Engineer', timing: 'Q1 2025', priority: 'high', salaryRange: '$110-140K' },
  { role: 'ML Engineer (Financial AI)', timing: 'Q2 2025', priority: 'high', salaryRange: '$130-160K' },
];
