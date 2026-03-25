# COIN — R2: Software Updates, Passwords, Guest Account, Remote Login

## Goal
Extended security audit: software update status, weak password detection, guest account, remote login, and sharing settings.

---

## Scope

### Software Update Check
- `system_profiler SPApplicationsDataType` for installed apps
- Check for macOS updates: `softwareupdate --list`
- Check AutoCAD/Adobe/Microsoft update status via Sparkle (if installed)
- Identify outdated software with known vulnerabilities
- Status: Up to date / Updates Available / Warning

### Weak Password Detection
- `pwpolicy -getaccountpolicy` for local account password policy
- Check: minimum length, complexity requirements
- Password age check: passwords older than 90 days = warning
- Check if password matches common patterns (dictionary check optional)
- Report: password policy strength, account password age

### Guest Account Check
- `dscl . -read /Users/guest` to check guest account status
- Check if Guest account can log in via System Preferences
- Check if Guest has file sharing access
- Status: Disabled (Good) / Enabled (Warning)

### Remote Login (SSH) Check
- `systemsetup -getremotelogin` to check SSH status
- Check if SSH is enabled
- Check SSH allow/deny settings
- Status: Off / On (Warning if not needed)

### Sharing Services Check
- Check enabled sharing services:
  - Screen Sharing
  - File Sharing (SMB/AFP)
  - Printer Sharing
  - Remote Login (SSH)
  - Remote Management (ARD)
  - Bluetooth Sharing
- `sharing -l` to list all sharing services
- Status per service: On/Off
- Warning for unnecessary open services

### Bluetooth Check
- Check Bluetooth status
- Check Bluetooth device pairing history
- Check "Discoverable" setting
- Warning if Bluetooth is on but unused

### Firewall Configuration Check
- Check specific port blocking rules
- Check allowed apps list
- Stealth mode check: `sudo /usr/libexec/ApplicationFirewall/socketfilterfw --getstealthmode`
- Status: Stealth Mode On/Off

### Firewall Service Rules
- List application-specific firewall rules
- Check if critical apps are allowed/blocked
- Identify unknown/blocked apps that shouldn't be

### Extended Results UI
- New check cards for each R2 category
- Detailed breakdown view
- "All Issues" summary list
- Sort by severity: Critical, Warning, Info

### Score Update
- Extended scoring to include R2 checks
- Re-weight: add software updates (10%), guest account (5%), remote login (5%), sharing (5%)
- Recalculate overall score

---

## Out of Scope (R3+)
- Detailed fix recommendations with steps
- One-click fixes
- Scheduled scans
- Notifications
