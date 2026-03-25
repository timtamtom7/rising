// Rising Browser Extension — Content Script
// Detects property listings on Zillow/Realtor/Redfin and shows savings overlay

(function () {
  'use strict';

  // Don't run twice
  if (window.__risingExtensionLoaded) return;
  window.__risingExtensionLoaded = true;

  // ── Storage helpers ────────────────────────────────────────
  function getStorage(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  // ── Extract property price from page ──────────────────────
  function extractPrice() {
    // Zillow
    let el = document.querySelector('[data-testid="price"] span');
    if (el) return parsePrice(el.textContent);

    el = document.querySelector('.summary-container .price span');
    if (el) return parsePrice(el.textContent);

    // Fallback: any element with price-like content
    const priceRe = /\$[\d,]+/;
    const allText = document.body.innerText;
    const match = allText.match(/\$(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/);
    if (match) return parsePrice(match[0]);

    return null;
  }

  function parsePrice(text) {
    if (!text) return null;
    const cleaned = text.replace(/[^0-9.]/g, '');
    return parseFloat(cleaned);
  }

  function extractAddress() {
    // Zillow
    let el = document.querySelector('[data-testid="street-address"]');
    if (el) return el.textContent.trim();

    el = document.querySelector('.summary-container .address');
    if (el) return el.textContent.trim();

    el = document.querySelector('h1');
    if (el) return el.textContent.trim();

    return null;
  }

  // ── Format currency ────────────────────────────────────────
  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  }

  // ── Calculate down payment & monthly ──────────────────────
  function calculatePayment(price) {
    const downPct = 0.20;
    const downPayment = price * downPct;
    const loanAmount = price - downPayment;
    const rate = 0.07;
    const monthlyRate = rate / 12;
    const numPayments = 30 * 12;
    const monthlyPI =
      loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);
    const monthlyTax = price * 0.012 / 12;
    const monthlyIns = 150;
    return {
      downPayment,
      monthlyPayment: Math.round(monthlyPI + monthlyTax + monthlyIns),
    };
  }

  // ── Create overlay widget ──────────────────────────────────
  function createOverlay(price, address) {
    // Remove existing
    const existing = document.getElementById('rising-overlay-root');
    if (existing) existing.remove();

    const { downPayment, monthlyPayment } = calculatePayment(price);

    const savings = getStorage('rising_savings_goal', null);
    const totalSaved = getStorage('rising_total_saved', 0);

    let savingsHTML = '';
    if (savings && savings.targetAmount > 0) {
      const remaining = Math.max(0, savings.targetAmount - totalSaved);
      const pct = Math.min(100, Math.round((totalSaved / savings.targetAmount) * 100));
      const toGo = downPayment - totalSaved;

      savingsHTML = `
        <div class="rising-savings-bar">
          <div class="rising-savings-bar-label">
            <span>Your savings goal</span>
            <span>${pct}%</span>
          </div>
          <div class="rising-savings-bar-track">
            <div class="rising-savings-bar-fill" style="width:${pct}%"></div>
          </div>
          ${toGo > 0
            ? `<p class="rising-savings-to-go">Still need <strong>${formatCurrency(toGo)}</strong> for 20% down</p>`
            : `<p class="rising-savings-to-go rising-savings-to-go--met">✓ You've saved enough for 20% down!</p>`
          }
        </div>
      `;
    }

    const root = document.createElement('div');
    root.id = 'rising-overlay-root';
    root.innerHTML = `
      <div class="rising-widget">
        <div class="rising-widget-header">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Rising</span>
          <button class="rising-close-btn" id="rising-close" aria-label="Close">×</button>
        </div>
        <div class="rising-widget-body">
          <div class="rising-property-price">
            <span class="rising-label">List price</span>
            <span class="rising-value">${formatCurrency(price)}</span>
          </div>
          <div class="rising-grid">
            <div class="rising-stat">
              <span class="rising-label">20% down</span>
              <span class="rising-value">${formatCurrency(downPayment)}</span>
            </div>
            <div class="rising-stat">
              <span class="rising-label">Est. monthly</span>
              <span class="rising-value">${formatCurrency(monthlyPayment)}/mo</span>
            </div>
          </div>
          ${savingsHTML}
        </div>
        <a class="rising-widget-cta" href="http://localhost:5173/app" target="_blank">
          Open Rising App →
        </a>
      </div>
    `;

    // Position: bottom-right
    root.style.cssText = `
      position: fixed !important;
      bottom: 24px !important;
      right: 24px !important;
      z-index: 999999 !important;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
    `;

    document.body.appendChild(root);

    // Close button
    document.getElementById('rising-close').addEventListener('click', () => {
      root.remove();
    });
  }

  // ── Main init ──────────────────────────────────────────────
  function init() {
    const price = extractPrice();
    const address = extractAddress();

    if (!price) {
      // Retry after a short delay (Zillow loads dynamically)
      setTimeout(() => {
        const retryPrice = extractPrice();
        if (retryPrice) {
          createOverlay(retryPrice, extractAddress());
        }
      }, 2000);
      return;
    }

    createOverlay(price, address);
  }

  // Watch for SPA navigation (Zillow uses React Router)
  let lastUrl = location.href;
  const observer = new MutationObserver(() => {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      window.__risingExtensionLoaded = false;
      setTimeout(init, 1500);
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // Run after page load
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(init, 1000);
  } else {
    window.addEventListener('DOMContentLoaded', () => setTimeout(init, 1000));
  }
})();
