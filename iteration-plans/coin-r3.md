# COIN — R3: Detailed Fix Recommendations, One-Click Fixes

## Goal
Actionable security improvements: detailed fix steps with one-click automation where possible.

---

## Scope

### Fix Recommendation Engine
- `FixRecommendation`: id, checkId, title, description, steps `[String]`, canAutoFix, riskLevel
- Auto-generate recommendations from failed/warning checks
- Each recommendation includes:
  - What the issue is
  - Why it matters
  - Step-by-step fix instructions
  - Estimated time to fix
  - Risk level of the fix

### One-Click Fixes (Auto-Fixable)
Implement fixes via shell commands/scripting:

**Gatekeeper**
- Auto-fix: `sudo spctl --master-enable` / `sudo spctl --enable`
- Note: requires admin password

**Firewall**
- Auto-fix: `sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setglobalstate on`
- Enable stealth mode: `sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setstealthmode on`

**FileVault**
- Auto-fix: `fdesetup enable` (initiates enrollment flow)
- Note: requires user interaction and recovery key setup

**Screen Lock**
- Auto-fix: `defaults write com.apple.screensaver askForPassword -int 1`
- Auto-fix: `defaults write com.apple.screensaver askForPasswordDelay -int 5`
- Auto-fix: `sudo systemsetup -setminutesUntilSleep 10`

**Guest Account**
- Auto-fix: `sudo dscl . -create /Users/guest UserShell /usr/bin/false`
- Auto-fix: `sudo defaults write /Library/Preferences/com.apple.loginwindow GuestEnabled -bool false`

**SSH**
- Auto-fix: `sudo systemsetup -f -setremotelogin off`

**Sharing Services**
- Auto-fix: toggle individual services via `sharing` command
- File sharing: `sudo launchctl unload -w /System/Library/LaunchDaemons/com.apple.smbd.plist`

### Fix Execution Flow
- User clicks "Fix" on recommendation
- Confirmation dialog with details
- Admin password prompt if needed (via `AuthorizationServices`)
- Execute fix in background
- Show progress
- Verify fix worked, update check status
- Notification on complete

### Manual Fix Guide
- For non-auto-fixable issues: detailed step-by-step guide
- Screenshots/text instructions
- Link to System Preferences / Security & Privacy
- "Open System Preferences" button

### Fix History
- `FixHistory`: timestamp, fixType, success, notes
- Store in `UserDefaults`
- Show "Recently Fixed" section
- "Undo" option for reversible fixes

### Risk Assessment
- Each fix tagged: Safe / Moderate / Caution
- Warning before Caution-level fixes
- Rollback plan where possible

### Fix Dashboard
- "Fixes Available" section with count
- Priority-ordered list: Critical first
- One-click "Fix All Safe Issues" button
- Progress indicator during batch fix

---

## Out of Scope (R4+)
- Scheduled scans
- Notifications
- History logging
- Menu Bar Extra
