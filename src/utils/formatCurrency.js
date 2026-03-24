const CURRENCY_SYMBOLS = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  CAD: 'C$',
  AUD: 'A$',
  CHF: 'CHF',
  INR: '₹',
  BRL: 'R$',
  MXN: 'MX$',
};

export function formatCurrency(amount, currency = 'USD') {
  const symbol = CURRENCY_SYMBOLS[currency] || '$';
  const formatted = Math.abs(amount).toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  return `${symbol}${formatted}`;
}

export function parseCurrencyInput(value) {
  return parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
}

export function formatCurrencyInput(value) {
  const num = parseCurrencyInput(value);
  if (isNaN(num)) return '';
  return num.toLocaleString('en-US');
}
