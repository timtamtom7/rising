# Readr R12 — Social Reading Lists & Book Clubs

## Goal
Transform Readr from a solo reading tracker into a social experience — share lists, get recommendations from friends, and join book clubs.

---

## Feature: Shareable Reading Lists

### Concept
Users can create named reading lists (e.g., "Summer Reads", "Tech Books 2026") and share them via link.

### Data Model

```swift
struct SharedList: Identifiable, Codable {
    var id: UUID
    var name: String
    var ownerId: String
    var books: [BookRef]  // lightweight references (title, author, isbn only)
    var isPublic: Bool
    var createdAt: Date
    var shareCode: String  // short code for URL sharing
}

struct BookRef: Codable {
    var title: String
    var author: String
    var isbn: String?
}
```

### Implementation
- Store shared lists in SQLite with a `shared_lists` table
- Generate short share codes (6 chars) using `UUID` prefix
- Export list as a shareable URL: `readr://list/{shareCode}`
- Import list by scanning/visiting a share code URL

### UI
- New "Lists" tab in main window (or section in sidebar)
- Create list: name + pick books from library
- Share list: copy link button → generates share code
- Browse shared lists: enter code or scan QR

---

## Feature: Friend System (Simple)

### Concept
Follow other readers to see what they're reading and finished.

### Data Model

```swift
struct Friend: Identifiable, Codable {
    var id: UUID
    var name: String
    var avatarUrl: String?
    var currentlyReading: BookRef?
    var recentlyFinished: [BookRef]
    var friendCode: String
}

struct UserProfile: Codable {
    var id: UUID
    var name: String
    var friendCode: String
    var following: [String]  // friend codes
}
```

### UI: FriendActivityView
- Accessible via sidebar "Friends" tab
- Shows cards per friend:
  - Avatar, name
  - Currently reading with progress
  - Last 3 finished books
- "Add Friend" → enter their friend code

### Privacy
- User must opt-in to appear in friend searches
- Reading stats are always visible to friends
- Book notes are private

---

## Feature: Book Clubs

### Concept
Join a book club with a shared reading list and a discussion thread per book.

### Data Model

```swift
struct BookClub: Identifiable, Codable {
    var id: UUID
    var name: String
    var description: String
    var members: [String]  // friend codes
    var currentBook: BookRef?
    var discussions: [Discussion]
}

struct Discussion: Identifiable, Codable {
    var id: UUID
    var bookId: UUID
    var messages: [Message]
}

struct Message: Identifiable, Codable {
    var id: UUID
    var authorName: String
    var text: String
    var timestamp: Date
}
```

### Implementation
- Clubs stored locally in SQLite
- For MVP: no real-time sync — just local shared club data
- Members exchange club data via exported JSON files (advanced: AirDrop, Files app)
- Future: CloudKit or simple JSON hosting for sync

### UI: BookClubView
- Club list in sidebar
- Club detail: current book, members, discussion thread
- Discussion thread: chronological messages, newest at bottom
- "Set Current Book" for club admin

---

## File Changes

```
ReadrMac/ReadrMac/
  SharedList.swift           (new)
  FriendSystem.swift         (new)
  BookClub.swift             (new)
  Models.swift               (update with BookRef, SharedList, Friend, UserProfile)
  ContentView.swift          (add Friends tab)
  FriendActivityView.swift   (new)
  BookClubView.swift         (new)
  ShareListView.swift        (new)
```

## Testing Plan
- [ ] Create a shared list, share via code, import on another device
- [ ] Add friend via code, see their reading activity
- [ ] Create a book club, set current book, post a message
- [ ] Export/import club data via JSON

## Success Metric
- At least 2 shared lists created in first week of testing
- Friend activity view accessed > 3x per week by active users
