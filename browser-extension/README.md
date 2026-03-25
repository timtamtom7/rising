# Rising Browser Extension

Track your savings progress directly on Zillow, Realtor, and Redfin listing pages.

## Install

### Chrome / Edge
1. Open `chrome://extensions/`
2. Enable **Developer mode** (toggle in top-right)
3. Click **Load unpacked**
4. Select the `browser-extension/` folder
5. The Rising icon appears in your toolbar

### Safari
1. Open Safari → Preferences → Extensions
2. Click **+** to add extension
3. Select the `browser-extension/` folder
4. Enable the extension and grant permissions

## Features

- **Property overlay** — Shows list price, 20% down payment, and estimated monthly payment on any Zillow/Realtor/Redfin listing
- **Savings progress** — If you've set a savings goal in the Rising app, the overlay shows your progress
- **Quick link** — One click to open the full Rising app

## How It Works

The extension reads property prices from listing pages and calculates:
- 20% down payment amount
- Estimated monthly mortgage payment (P&I + property tax + insurance)

It reads your savings data from `localStorage` (the same storage the Rising web app uses), so make sure you're logged into Rising in the same browser.

## Permissions

- `activeTab` — reads the current tab to find property prices
- `storage` — reads your Rising savings goal from local storage

## Building Icons

Icons are generated with Node.js. To regenerate:

```bash
cd browser-extension/icons
node generate-icons.mjs
```

Requires `@napi-rs/canvas` (already in the project's devDependencies).
