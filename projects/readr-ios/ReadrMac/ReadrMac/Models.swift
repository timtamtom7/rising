import Foundation

enum ReadingStatus: String, CaseIterable, Codable {
    case toRead = "To Read"
    case currentlyReading = "Currently Reading"
    case finished = "Finished"
}

enum Genre: String, CaseIterable, Codable {
    case fiction = "Fiction"
    case nonFiction = "Non-Fiction"
    case biography = "Biography"
    case science = "Science"
    case history = "History"
    case philosophy = "Philosophy"
    case selfHelp = "Self-Help"
    case other = "Other"
}

enum ReadingMood: String, CaseIterable, Codable {
    case light = "Light & Easy"
    case heavy = "Heavy & Deep"
    case fast = "Fast-Paced"
    case contemplative = "Contemplative"
    case inspiring = "Inspiring"
    case technical = "Technical"
}

enum Priority: Int, CaseIterable, Codable {
    case low = 3
    case medium = 2
    case high = 1

    var label: String {
        switch self {
        case .high: return "🔴 High"
        case .medium: return "🟡 Medium"
        case .low: return "🟢 Low"
        }
    }
}

struct Book: Identifiable, Codable, Equatable {
    var id: UUID
    var title: String
    var author: String
    var isbn: String?
    var pageCount: Int
    var currentPage: Int
    var genre: Genre
    var status: ReadingStatus
    var priority: Priority
    var dateAdded: Date
    var dateFinished: Date?
    var coverColor: String
    var notes: String
    var moods: [ReadingMood]

    init(
        id: UUID = UUID(),
        title: String,
        author: String,
        isbn: String? = nil,
        pageCount: Int,
        currentPage: Int = 0,
        genre: Genre = .fiction,
        status: ReadingStatus = .toRead,
        priority: Priority = .medium,
        dateAdded: Date = Date(),
        dateFinished: Date? = nil,
        coverColor: String = "8B4513",
        notes: String = "",
        moods: [ReadingMood] = []
    ) {
        self.id = id
        self.title = title
        self.author = author
        self.isbn = isbn
        self.pageCount = pageCount
        self.currentPage = currentPage
        self.genre = genre
        self.status = status
        self.priority = priority
        self.dateAdded = dateAdded
        self.dateFinished = dateFinished
        self.coverColor = coverColor
        self.notes = notes
        self.moods = moods
    }

    var progress: Double {
        guard pageCount > 0 else { return 0 }
        return Double(currentPage) / Double(pageCount)
    }

    var progressPercent: Int {
        Int(progress * 100)
    }

    var coverColorNS: String {
        coverColor
    }
}

struct ReadingStats: Codable {
    var totalBooks: Int
    var totalPages: Int
    var totalMinutesRead: Int
    var booksPerMonth: [String: Int]
    var currentStreak: Int

    init() {
        totalBooks = 0
        totalPages = 0
        totalMinutesRead = 0
        booksPerMonth = [:]
        currentStreak = 0
    }
}

class LibraryStore: ObservableObject {
    @Published var books: [Book] = []
    @Published var stats: ReadingStats = ReadingStats()

    init() {
        loadSampleData()
    }

    private func loadSampleData() {
        books = [
            Book(
                title: "The Pragmatic Programmer",
                author: "David Thomas & Andrew Hunt",
                pageCount: 352,
                currentPage: 127,
                genre: .science,
                status: .currentlyReading,
                priority: .high,
                coverColor: "228B22",
                moods: [.technical, .contemplative]
            ),
            Book(
                title: "Clean Code",
                author: "Robert C. Martin",
                pageCount: 464,
                currentPage: 0,
                genre: .science,
                status: .toRead,
                priority: .high,
                coverColor: "722F37",
                moods: [.technical]
            ),
            Book(
                title: "Atomic Habits",
                author: "James Clear",
                pageCount: 320,
                currentPage: 320,
                genre: .selfHelp,
                status: .finished,
                priority: .medium,
                dateFinished: Date().addingTimeInterval(-86400 * 30),
                coverColor: "c87b4f",
                moods: [.inspiring, .light]
            ),
            Book(
                title: "Sapiens",
                author: "Yuval Noah Harari",
                pageCount: 443,
                currentPage: 443,
                genre: .history,
                status: .finished,
                priority: .medium,
                dateFinished: Date().addingTimeInterval(-86400 * 90),
                coverColor: "8B4513",
                moods: [.contemplative, .heavy]
            ),
            Book(
                title: "Thinking, Fast and Slow",
                author: "Daniel Kahneman",
                pageCount: 499,
                currentPage: 0,
                genre: .philosophy,
                status: .toRead,
                priority: .low,
                coverColor: "4a5568",
                moods: [.heavy, .contemplative]
            ),
            Book(
                title: "The Design of Everyday Things",
                author: "Don Norman",
                pageCount: 368,
                currentPage: 89,
                genre: .nonFiction,
                status: .currentlyReading,
                priority: .medium,
                coverColor: "2563eb",
                moods: [.technical, .inspiring]
            )
        ]
        updateStats()
    }

    func updateStats() {
        let finished = books.filter { $0.status == .finished }
        stats.totalBooks = finished.count
        stats.totalPages = finished.reduce(0) { $0 + $1.pageCount }

        var monthCounts: [String: Int] = [:]
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM"
        for book in finished {
            if let date = book.dateFinished {
                let month = formatter.string(from: date)
                monthCounts[month, default: 0] += 1
            }
        }
        stats.booksPerMonth = monthCounts
    }

    func addBook(_ book: Book) {
        books.append(book)
    }

    func updateBook(_ book: Book) {
        if let idx = books.firstIndex(where: { $0.id == book.id }) {
            books[idx] = book
        }
    }

    func deleteBook(_ book: Book) {
        books.removeAll { $0.id == book.id }
    }
}
