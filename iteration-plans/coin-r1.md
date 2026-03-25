# COIN — R1: Security Check Engine, Gatekeeper, Firewall, FileVault

## Goal
Core security audit: check macOS hardening status, evaluate Gatekeeper, firewall, FileVault, screen lock, SIP. Compute overall security score.

---

## Scope

### Menu Bar Entry Point
- `NSStatusItem` with shield-checkmark SF Symbol icon
- `NSPopover` (380×300pt) showing quick security summary and score
- "Open COIN" button opens main audit window

### Security Check Engine
- `SecurityChecker` service: runs individual checks via shell commands and system APIs
- All checks run asynchronously, report progress
- Results cached until manual refresh

### Gatekeeper Check
- `spctl --status` to check enablement
- `spctl --list` for policy status
- Verify: Gatekeeper enabled, requires App Store or identified developers
- Status: Enabled/Disabled/Warning

### Firewall Check
- `sudo /usr/libexec/ApplicationFirewall/socketfilterfw --getglobalstate`
- Check if firewall is on
- List active firewall rules
- Status: On/Off/Warning

### FileVault Check
- `fdesetup status` to check encryption status
- Check if disk is fully encrypted
- Check recovery key escrowed status
- Status: On/Off/Encrypting/Off (Warning)

### Screen Lock Check
- Check current screen lock settings via `defaults`
- `osascript -e 'tell application "System Events" to get security preferences`
- Check: require password after sleep/screen saver
- Check screen saver timeout
- Check if lock on sleep is enabled
- Status: Secure/Insecure/Warning

### SIP (System Integrity Protection) Check
- `csrutil status` via `nvram`
- Verify SIP is enabled
- Status: Enabled/Disabled/Partial

### Security Score
- `SecurityScore`: 0-100 based on weighted checks
- Weights:
  - Gatekeeper: 20%
  - Firewall: 20%
  - FileVault: 25%
  - Screen Lock: 20%
  - SIP: 15%
- Score breakdown: Excellent (90+), Good (70-89), Fair (50-69), Poor (<50)
- Color-coded: green/yellow/orange/red

### Results Dashboard (Main Window)
- Overall score: large circular progress with score number
- Individual check cards:
  - Icon, check name, status (Pass/Warn/Fail), details button
  - Status color: green checkmark, yellow warning, red X
- "Run Full Audit" button
- Last audit timestamp
- Refresh button

### Check Details View
- Each check expandable to show:
  - What was checked
  - Current value
  - Recommended value
  - Why it matters (security context)
  - "Fix" button if fixable (one-click fixes in R3)

### Data Model
- `SecurityCheck`: id, name, description, status, currentValue, recommendedValue, weight, canAutoFix
- `AuditResult`: timestamp, overallScore, checks `[SecurityCheck]`
- Persist last result in `UserDefaults`

### Build & Run
- Target: macOS 13.0+
- SPM: `KeychainAccess` for secure storage (future use)
- No external dependencies
- Zero warnings, clean build

---

## Out of Scope (R2+)
- Software update checks
- Password strength checks
- Guest account checks
- Remote login/sharing checks
- Detailed fix recommendations
- Scheduled scans
