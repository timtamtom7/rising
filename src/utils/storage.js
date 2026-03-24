import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'rising_data';

const defaultData = {
  goals: [],
  properties: [],
  milestones: [],
  notifications: [],
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

export function createProperty({ name, address, price, link, photos, notes, estimatedValue }) {
  return {
    id: generateId(),
    name,
    address: address || '',
    price: parseFloat(price) || 0,
    link: link || '',
    photos: photos || [],
    notes: notes || '',
    estimatedValue: parseFloat(estimatedValue) || null,
    createdAt: new Date().toISOString(),
    priceDroppedAt: null,
    listedAt: new Date().toISOString(),
  };
}

export function createMilestone({ goalId, type, label, completedAt, amount, lender, date }) {
  return {
    id: generateId(),
    goalId,
    type,
    label: label || type,
    completedAt: completedAt || null,
    amount: amount || null,
    lender: lender || '',
    date: date || null,
    createdAt: new Date().toISOString(),
  };
}
