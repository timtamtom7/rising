// Rising 2.0 Design System - Warm Hopeful Theme

export const hopefulTheme = {
  colors: {
    background: '#F5F9F6',
    surface: '#FFFFFF',
    surfaceElevated: '#EEF5F1',
    primary: '#2D8659', // hopeful green
    accent: '#5CB885', // light green
    textPrimary: '#1A2E1F',
    textSecondary: '#4A6B52',
    textTertiary: '#7A9A7F',
    border: '#D4E8DB',
    error: '#C0392B',
    success: '#27AE60',
    warning: '#F39C12',
  },
  typography: {
    display: { fontFamily: "'Inter', -apple-system, sans-serif", fontSize: '42px', fontWeight: '700', lineHeight: '1.1' },
    heading1: { fontFamily: "'Inter', -apple-system, sans-serif", fontSize: '30px', fontWeight: '600', lineHeight: '1.2' },
    heading2: { fontFamily: "'Inter', -apple-system, sans-serif", fontSize: '22px', fontWeight: '600', lineHeight: '1.3' },
    body: { fontFamily: "'Inter', -apple-system, sans-serif", fontSize: '16px', fontWeight: '400', lineHeight: '1.6' },
    caption: { fontFamily: "'Inter', -apple-system, sans-serif", fontSize: '13px', fontWeight: '400' },
    mono: { fontFamily: "'Space Mono', monospace", fontSize: '14px' },
  },
  spacing: { xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px', xxl: '48px' },
  borderRadius: { sm: '6px', md: '10px', lg: '14px', xl: '20px', pill: '999px' },
};

// Predictive Timeline AI
export class PredictiveTimelineService {
  constructor() {
    this.timeline = [];
  }

  async predictHomeBuyingTimeline(userProfile, marketData) {
    // Predict when user is likely to buy based on:
    // - Current savings rate
    // - Market trends
    // - User goals
    // - Historical patterns
    const { savingsRate, targetPrice, currentSavings } = userProfile;
    const monthlyRate = savingsRate || 1000;
    const gap = targetPrice - currentSavings;
    const monthsToGoal = Math.ceil(gap / monthlyRate);

    return {
      predictedMonths: Math.max(6, monthsToGoal),
      confidence: Math.min(0.85, 0.4 + (savingsRate / 2000)),
      milestones: this.generateMilestones(userProfile, monthsToGoal),
      marketAdvice: this.getMarketAdvice(marketData),
    };
  }

  generateMilestones(profile, totalMonths) {
    const milestones = [];
    const keyPoints = [0.25, 0.5, 0.75, 1.0];

    keyPoints.forEach(pct => {
      milestones.push({
        label: `${Math.round(pct * 100)}% of way there`,
        months: Math.round(totalMonths * pct),
        savingsAtPoint: Math.round(profile.currentSavings + (profile.targetPrice - profile.currentSavings) * pct),
      });
    });

    return milestones;
  }

  getMarketAdvice(marketData) {
    if (!marketData) return 'Market data unavailable';
    const { trend, monthsToPeak } = marketData;
    if (trend === 'rising' && monthsToPeak < 6) {
      return 'Market expected to rise in 6 months — consider acting sooner';
    }
    if (trend === 'falling') {
      return 'Market appears to be cooling — good time to continue saving';
    }
    return 'Market is stable — focus on your savings rate';
  }
}

export const predictiveTimelineService = new PredictiveTimelineService();
