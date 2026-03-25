# Pulse — R1: Menu Bar Foundation, Core Stats, SQLite Persistence

## Goal
A working macOS menu bar app showing live CPU, RAM, disk, and network stats in a popover. NSStatusItem displays a compact CPU % and RAM bar. Darwin host statistics power the data collection. SQLite persists a rolling history window.

---

## Scope

### Menu Bar Entry Point
- `NSStatusItem` with SF Symbol `chart.bar.fill` as default icon
- Custom `NSStatusBarButton` with:
  - CPU percentage text (e.g., "23%") left-aligned
  - Thin RAM bar (3pt wide, 16pt tall) right-aligned — fills proportional to used RAM
- Popover (360×420pt) on click — dismisses on click-outside and Escape
- `NSPopover` with `.transient` behavior for easy dismissal

### Stat Collection — Darwin Host Statistics
- `SystemMonitor` class using `host_statistics64()` for CPU
  - CPU user/system/idle/wired percentages computed from `mach_cpu_info`
  - Update interval: 2 seconds (configurable in future iterations)
- `host_info` for RAM: `vm_statistics64` → active, inactive, wired, compressed, free
  - RAM used = total - free - compressed
  - RAM percentage = used / total
- Disk usage via `FileManager.attributesOfFileSystem` → total/free capacity
- Network I/O via `getifaddrs()` / `if_data` → bytes in/out since boot
  - Track per-interval delta (not cumulative)
- All collection on a dedicated `DispatchQueue` (QoS: `.userInitiated`)

### Popover Stats View
- Header: "Pulse" title + settings gear icon button
- **CPU Section:**
  - Circular progress ring (64pt diameter) showing CPU %
  - Breakdown: User (blue), System (orange), Idle (gray)
  - Numeric label in center: "23%"
- **RAM Section:**
  - Linear progress bar (full width, 8pt tall)
  - Labels: "Used: 10.2 GB / 32 GB" + percentage
  - Color: green < 70%, amber 70–90%, red > 90%
- **Disk Section:**
  - Thin bar showing used/total
  - Labels: "SSD: 421 GB used of 1 TB" + percentage
  - Same color coding as RAM
- **Network Section:**
  - Up/Down arrows with current speed labels
  - Format: "↑ 12.3 MB/s  ↓ 45.6 MB/s"
  - Speed computed from byte delta / interval
- All values animate smoothly between updates (SwiftUI `animation(.easeInOut(0.3))`)

### SQLite Persistence
- Database at `~/Library/Application Support/Pulse/pulse.db`
- Auto-create `Application Support/Pulse` directory on first launch
- `samples` table: id, timestamp, cpu_user, cpu_system, cpu_idle, ram_used, ram_total, disk_used, disk_total, network_in_delta, network_out_delta
- Write a sample every 60 seconds (not on every poll to reduce I/O)
- Retention: keep last 7 days of samples, purge on launch
- `SampleStore` service class with `recordSample()` and `getRecentSamples(hours:)`

### App Lifecycle
- `main.swift` → `NSApplication.shared → AppDelegate` (no @main)
- `applicationDidFinishLaunching`: init SystemMonitor, load persisted samples, build status item
- Standard app menu: About Pulse, Settings, Quit
- Launch at login via `SMAppService.mainApp` (macOS 13+) with graceful fallback

### Build & Run
- Target: macOS 13.0+
- Swift Package Manager: SQLite.swift only
- Zero third-party UI dependencies — pure SwiftUI + AppKit
- Zero warnings, clean build
- Test: verify stats update in popover, close and reopen — history persists

---

## Out of Scope (R2+)
- Temperature monitoring
- Battery stats
- Detailed graphs and sparklines
- Color-coded warnings for high usage
- Customizable metrics
