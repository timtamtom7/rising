// Rising 3.0 - AI Financial Advisor and Family Wealth Platform

// AI Financial Advisor
export class AIFinancialAdvisor {
  constructor() {
    this.userProfile = null;
  }

  setUserProfile(profile) {
    this.userProfile = profile;
  }

  async generateAdvice(goal) {
    const { savings, income, expenses, timeline } = this.userProfile || {};

    const adviceMap = {
      downpayment: this.adviseDownpayment({ savings, income, expenses, timeline }),
      mortgage: this.adviseMortgage({ savings, income, expenses }),
      timeline: this.adviseTimeline({ savings, income, timeline }),
    };

    return adviceMap[goal] || adviceMap.downpayment;
  }

  adviseDownpayment({ savings = 0, income = 5000, expenses = 3000, timeline = 24 }) {
    const monthlySavings = income - expenses;
    const projectedSavings = savings + (monthlySavings * timeline);

    if (projectedSavings < 20000) {
      return {
        summary: 'Focus on increasing your savings rate',
        tips: ['Cut discretionary spending', 'Consider side income', 'Automate your savings'],
        projectedAmount: projectedSavings,
      };
    }

    if (projectedSavings < 50000) {
      return {
        summary: 'On track for a modest downpayment',
        tips: ['Research first-time buyer programs', 'Consider FHA loan options', 'Build emergency fund first'],
        projectedAmount: projectedSavings,
      };
    }

    return {
      summary: 'Strong savings trajectory — you\'re ready to shop',
      tips: ['Get pre-approved', 'Research neighborhoods', 'Work with a buyer\'s agent'],
      projectedAmount: projectedSavings,
    };
  }

  adviseMortgage({ income = 5000, expenses = 3000 }) {
    const maxMonthly = income * 0.28;
    const discretionary = income - expenses;

    return {
      maxMonthlyPayment: maxMonthly,
      maxHomePrice: maxMonthly * 200, // approx 30yr at 6%
      tip: `With your income, aim for a home priced at $${Math.round(maxMonthly * 200).toLocaleString()} or less`,
    };
  }

  adviseTimeline({ savings = 0, income = 5000, expenses = 3000, timeline = 24 }) {
    const monthlySavings = income - expenses;
    const targetDownpayment = 50000;
    const monthsNeeded = Math.ceil((targetDownpayment - savings) / monthlySavings);

    return {
      monthsNeeded: Math.max(0, monthsNeeded),
      projectedDate: new Date(Date.now() + monthsNeeded * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      tip: monthsNeeded > 36 ? 'Consider adjusting your target price or timeline' : 'Your timeline is realistic',
    };
  }
}

// Real Estate Intelligence
export class RealEstateIntelligence {
  analyzeMarketTrends(historicalData) {
    const trends = this.calculateTrends(historicalData);
    return {
      direction: trends.slope > 0.05 ? 'rising' : trends.slope < -0.05 ? 'falling' : 'stable',
      volatility: trends.volatility,
      prediction: this.predictNextQuarter(trends),
    };
  }

  calculateTrends(data) {
    const n = data.length;
    if (n < 2) return { slope: 0, volatility: 0 };

    const sum = data.reduce((a, b) => a + b, 0);
    const mean = sum / n;

    let slope = 0;
    let volatility = 0;

    for (let i = 1; i < n; i++) {
      slope += (data[i] - data[i - 1]) / data[i - 1];
    }
    slope /= (n - 1);

    for (let i = 0; i < n; i++) {
      volatility += Math.pow(data[i] - mean, 2);
    }
    volatility = Math.sqrt(volatility / n);

    return { slope, volatility };
  }

  predictNextQuarter(trends) {
    if (trends.slope > 0.05) return 'Prices expected to rise — consider acting soon';
    if (trends.slope < -0.05) return 'Market cooling — good time to save and wait';
    return 'Market stable — focus on your financial readiness';
  }
}

// Family Wealth Platform
export class FamilyWealthTracker {
  constructor() {
    this.accounts = [];
  }

  addAccount(account) {
    this.accounts.push(account);
  }

  getNetWorth() {
    return this.accounts.reduce((sum, acc) => {
      return acc.type === 'asset' ? sum + acc.value : sum - acc.value;
    }, 0);
  }

  getHomeEquity() {
    const home = this.accounts.find(a => a.category === 'real_estate');
    return home ? home.value - (home.mortgage || 0) : 0;
  }

  getFamilyWealthSnapshot() {
    return {
      netWorth: this.getNetWorth(),
      homeEquity: this.getHomeEquity(),
      liquidAssets: this.accounts.filter(a => a.liquid).reduce((s, a) => s + a.value, 0),
      accounts: this.accounts.length,
    };
  }
}

export const aiFinancialAdvisor = new AIFinancialAdvisor();
export const realEstateIntelligence = new RealEstateIntelligence();
export const familyWealthTracker = new FamilyWealthTracker();
