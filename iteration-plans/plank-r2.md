# PLANK — R2: Widgets in Sidebar, Pinned Apps

## Goal
Embed widgets in sidebar (clock, calendar, weather, notes), show pinned running apps.

---

## Scope

### Widget Container System
- `WidgetContainer`: protocol for embeddable widgets
- Widget protocol: `id`, `title`, `size`, `content`, `refresh()`
- Positioned in sidebar below bookmarks or in dedicated widget section
- Resizable widgets: small (fixed height), medium, large

### Clock Widget
- Current time (HH:mm) and date
- Timezone display (if not local)
- Analog or digital toggle
- Auto-refresh every minute

### Calendar Widget
- Current month mini-calendar grid
- Highlight today
- Click date → show day's events (if Calendar access granted)
- `EventKit` integration for calendar events
- "No Calendar Access" state if permission denied

### Weather Widget
- Current temperature and condition icon
- Location: auto-detect or manual city
- `wttr.in` API or Apple Weather (if available)
- Auto-refresh every 30 minutes
- "No Location" fallback

### Notes Widget
- Quick scratch pad
- `NSTextView` with minimal formatting
- Auto-save on edit (debounced 500ms)
- Stored in `UserDefaults`
- Clear button with confirmation

### Pinned Apps Section
- List of user-selected apps to show in sidebar
- "Pin App" action: from running apps list or app selection
- Pinned app shows: icon, name, running indicator (dot)
- Click pinned app → launch or focus if running
- Running apps highlighted

### Running Apps Widget
- Show currently running apps (from `NSWorkspace.shared.runningApplications`)
- Filter: user apps only (exclude system)
- Click → focus app
- Badge for apps with notification count (if `NSUserNotificationCenter`)
- Refresh on app launch/terminate notifications

### Widget Configuration
- Toggle widgets on/off in settings
- Reorder widgets via drag
- Widget-specific settings (location for weather, calendar account)

### Sidebar Layout with Widgets
- Section: "Widgets" header
- Vertical stack of enabled widgets
- Collapsible widget section
- Footer adjustments for widget space

### System Integration
- `EKEventStore` for calendar access (request permission)
- Location for weather (`CLLocationManager`)
- Running app notifications (`NSWorkspace` notifications)

---

## Out of Scope (R3+)
- Multiple sidebar configurations
- Keyboard navigation
- Global hotkey
- iCloud sync
- WidgetKit
