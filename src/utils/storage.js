import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'rising_data';

const defaultData = {
  goals: [],
  settings: {
    currency: 'USD',
    theme: 'light',
    subscription: {
      plan: 'free', // 'free' | 'homebuyer' | 'investor'
      status: 'active', // 'active' | 'cancelled' | 'past_due'
      subscribedAt: null,
      expiresAt: null,
    },
  },
};

export function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultData;
    return JSON.parse(raw);
  } catch {
    return defaultData;
  }
}

export function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function generateId() {
  return uuidv4();
}

export function createGoal({ name, targetAmount, deadline, photoUrl, startingAmount = 0 }) {
  return {
    id: generateId(),
    name,
    targetAmount: parseFloat(targetAmount),
    currentAmount: parseFloat(startingAmount) || 0,
    deadline: deadline || null,
    photoUrl: photoUrl || '',
    createdAt: new Date().toISOString(),
    completedAt: null,
    archived: false,
    deposits: [],
  };
}

export function createDeposit({ amount, note }) {
  return {
    id: generateId(),
    amount: parseFloat(amount),
    note: note || '',
    createdAt: new Date().toISOString(),
  };
}
