# Readr R11 — AI Book Recommendations & Genre Insights

## Goal
Help users discover their next great read and gain insights into their reading patterns.

---

## Feature: AI "What to Read Next"

### Concept
When a user finishes a book, proactively suggest the next book from their reading list using simple heuristics (genre affinity, author similarity, priority).

### Implementation

```swift
struct RecommendationEngine {
    func suggestNext(current: Book, from library: [Book]) -> Book? {
        // 1. Same author check
        if let sameAuthor = library.first(where: {
            $0.author == current.author && $0.status == .toRead
        }) {
            return sameAuthor
        }

        // 2. Same genre, priority sorted
        if let sameGenre = library
            .filter({ $0.genre == current.genre && $0.status == .toRead })
            .sorted(by: { $0.priority.rawValue < $1.priority.rawValue })
            .first {
            return sameGenre
        }

        // 3. Fall back to highest priority unread book
        return library
            .filter { $0.status == .toRead }
            .sorted(by: { $0.priority.rawValue < $1.priority.rawValue })
            .first
    }
}
```

### UI: Recommendation Banner
- Show on `CurrentlyReadingView` and `FinishedBooksView`
- "You finished [Book]. Up next: [Suggested Book]?"
- One-tap to move suggested book to "Currently Reading"

---

## Feature: Genre Insights Dashboard

### Concept
A breakdown of reading habits by genre — what genres they read most, which they neglect.

### Implementation

```swift
struct GenreInsights {
    var totalByGenre: [Genre: Int]
    var pagesByGenre: [Genre: Int]
    var dominantGenre: Genre
    var neglectedGenres: [Genre]

    var summary: String {
        "\(dominantGenre.rawValue) is your go-to genre (\(totalByGenre[dominantGenre] ?? 0) books)"
    }
}
```

### UI: Insights Panel
- Accessible from FinishedBooksView stats card
- Expandable section showing:
  - Pie/donut chart of books per genre
  - "You love [Genre]" highlight
  - "You haven't explored [Genre] yet" nudge
- Persist preferences: if user dismisses a genre nudge, don't show again

---

## Feature: "Reading Mood" Quick Filter

### Concept
Tag books with a mood tag (e.g., "light read", "heavy", "adrenaline", "contemplative") and filter by mood.

### Data Model

```swift
enum ReadingMood: String, CaseIterable, Codable {
    case light = "Light & Easy"
    case heavy = "Heavy & Deep"
    case fast = "Fast-Paced"
    case contemplative = "Contemplative"
    case inspiring = "Inspiring"
    case technical = "Technical"
}

extension Book {
    var moods: [ReadingMood]  // books can have multiple moods
}
```

### UI
- In `AddBookView`, add mood picker (multi-select chips)
- In `ReadingListView` filter bar, add "Mood" filter

---

## File Changes

```
ReadrMac/ReadrMac/
  RecommendationEngine.swift   (new)
  GenreInsightsView.swift       (new)
  Models.swift                  (add moods, update Book struct)
  ReadingListView.swift         (add mood filter)
  AddBookView.swift             (add mood picker)
  FinishedBooksView.swift       (embed insights panel)
```

## Testing Plan
- [ ] Finish a book → see recommendation banner
- [ ] Tap recommendation → book moves to Currently Reading
- [ ] Genre stats show correct counts
- [ ] Mood filter narrows reading list correctly
- [ ] Mood picker allows multi-select

## Success Metric
- User engagement with "What to Read Next" suggestion > 30%
- At least one genre insight visible on each FinishedBooksView visit
