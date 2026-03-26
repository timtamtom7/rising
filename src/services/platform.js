// Platform Detection and Subscription Utilities - Rising

export const PLATFORM = {
  WEB: 'web',
  IOS: 'ios',
  ANDROID: 'android',
};

export function getPlatform() {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('android')) return PLATFORM.ANDROID;
  if (/iphone|ipad|ipod/.test(ua)) return PLATFORM.IOS;
  return PLATFORM.WEB;
}

export const SUBSCRIPTION_TIERS = {
  FREE: 'free',
  HOMEBUYER: 'homebuyer',
  COMPLETE: 'complete',
};

export const subscriptionConfig = {
  [SUBSCRIPTION_TIERS.FREE]: {
    name: 'Free',
    price: '$0',
    features: ['5 properties', 'Basic market data', 'Mortgage calculator'],
  },
  [SUBSCRIPTION_TIERS.HOMEBUYER]: {
    name: 'Homebuyer',
    price: '$9.99/month',
    features: ['Unlimited properties', 'AI insights', 'Offer tracking', 'Market trends', 'Alerts'],
  },
  [SUBSCRIPTION_TIERS.COMPLETE]: {
    name: 'Complete',
    price: '$14.99/month',
    features: ['Everything in Homebuyer', 'Plaid bank sync', 'Zillow integration', 'Priority support', 'Agent matching'],
  },
};

export const RETENTION_MILESTONES = [
  { day: 1, event: 'first_property', title: 'First Property', description: 'Add your first property to track' },
  { day: 3, event: 'first_insight', title: 'First Insight', description: 'Receive your first AI market insight' },
  { day: 7, event: 'first_briefing', title: 'AI Briefing', description: 'Get your first AI-generated property briefing' },
];
