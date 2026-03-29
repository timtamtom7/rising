import Foundation
import NaturalLanguage

/// ReadingAI Service - Provides intelligent book recommendations based on reading history
final class ReadingAIService: @unchecked Sendable {
    static let shared = ReadingAIService()

    private init() {}

    // MARK: - Book Suggestion

    /// Suggest the next book based on reading history
    /// - Parameters:
    ///   - library: All books in the user's library
    ///   - recentlyRead: Recently finished books (used to learn preferences)
    /// - Returns: A BookSuggestion with the recommended book and reasoning
    func suggestNextBook(from library: [Book], recentlyRead: [Book]) -> BookSuggestion? {
        let toReadBooks = library.filter { $0.status == .toRead }

        guard !toReadBooks.isEmpty else { return nil }

        // Build preference profile from recently read books
        let preferences = buildPreferenceProfile(from: recentlyRead)

        // Score all unread books
        var scoredBooks: [(book: Book, score: Double, reason: String)] = []

        for book in toReadBooks {
            let (score, reason) = scoreBook(book, against: preferences, recentlyRead: recentlyRead)
            scoredBooks.append((book, score, reason))
        }

        // Sort by score descending
        scoredBooks.sort { $0.score > $1.score }

        guard let best = scoredBooks.first else { return nil }

        return BookSuggestion(
            book: best.book,
            reason: best.reason,
            matchScore: best.score
        )
    }

    // MARK: - Preference Learning

    /// Build a preference profile from reading history using NLP
    func buildPreferenceProfile(from books: [Book]) -> ReadingProfile {
        var profile = ReadingProfile()

        for book in books {
            // Track genre preferences
            profile.genrePreferences[book.genre, default: 0] += 1

            // Track author preferences
            let authorKey = normalizeAuthor(book.author)
            profile.authorPreferences[authorKey, default: 0] += 1

            // Analyze title for themes
            let themes = extractThemes(from: book.title)
            for theme in themes {
                profile.themePreferences[theme, default: 0] += 1
            }
        }

        // Calculate dominant genre
        if let dominant = profile.genrePreferences.max(by: { $0.value < $1.value }) {
            profile.dominantGenre = dominant.key
        }

        // Calculate total books read for normalization
        profile.totalBooksAnalyzed = books.count

        return profile
    }

    // MARK: - Scoring

    private func scoreBook(_ book: Book, against profile: ReadingProfile, recentlyRead: [Book]) -> (Double, String) {
        var score: Double = 50.0 // Base score
        var reasons: [String] = []

        // 1. Genre affinity (up to +30 points)
        if let genreCount = profile.genrePreferences[book.genre] {
            let genreBonus = min(Double(genreCount) * 6.0, 30.0)
            score += genreBonus
            if genreCount >= 2 {
                reasons.append("You loved other \(book.genre.rawValue.lowercased()) books")
            }
        }

        // 2. Author affinity (up to +25 points)
        let authorKey = normalizeAuthor(book.author)
        if let authorCount = profile.authorPreferences[authorKey] {
            let authorBonus = min(Double(authorCount) * 12.5, 25.0)
            score += authorBonus
            if authorCount >= 1 {
                reasons.append("By \(book.author), who you've enjoyed before")
            }
        }

        // 3. Themed recommendations (up to +15 points)
        let bookThemes = extractThemes(from: book.title)
        var themeMatchCount = 0
        for theme in bookThemes {
            if let count = profile.themePreferences[theme], count > 0 {
                themeMatchCount += 1
            }
        }
        let themeBonus = min(Double(themeMatchCount) * 5.0, 15.0)
        score += themeBonus
        if themeMatchCount >= 2 {
            reasons.append("Themed recommendation matching your tastes")
        }

        // 4. Priority boost (up to +10 points)
        switch book.priority {
        case .high:
            score += 10.0
            reasons.append("High priority on your list")
        case .medium:
            score += 5.0
        case .low:
            break
        }

        // 5. Natural language sentiment from recent reads (+5 bonus if all recent reads were positive)
        if recentlyRead.count >= 3 {
            score += 5.0
        }

        // Build final reason
        let finalReason: String
        if let lastBook = recentlyRead.first, reasons.contains(where: { $0.contains("other \(book.genre.rawValue.lowercased()) books") || $0.contains("who you've enjoyed") }) {
            finalReason = "Based on your love of \"\(lastBook.title)\", try this"
        } else if !reasons.isEmpty {
            finalReason = reasons.first ?? "Recommended for you"
        } else {
            finalReason = "Top pick from your reading list"
        }

        return (min(score, 100.0), finalReason)
    }

    // MARK: - NLP Helpers

    /// Normalize author name for comparison
    private func normalizeAuthor(_ author: String) -> String {
        return author
            .lowercased()
            .components(separatedBy: CharacterSet.alphanumerics.inverted)
            .joined()
            .trimmingCharacters(in: .whitespaces)
    }

    /// Extract themes from book title using keyword matching
    private func extractThemes(from title: String) -> [String] {
        let lowercased = title.lowercased()
        var themes: [String] = []

        let themeKeywords: [String: String] = [
            "habit": "habit",
            "atomic": "habit",
            "think": "thinking",
            "thinking": "thinking",
            "mind": "thinking",
            "design": "design",
            "code": "programming",
            "clean": "programming",
            "pragmatic": "programming",
            "sapiens": "history",
            "history": "history",
            "philosophy": "philosophy",
            "life": "life",
            "death": "philosophy",
            "meaning": "philosophy",
            "power": "psychology",
            "influence": "psychology",
            "psychology": "psychology",
            "economic": "economics",
            "money": "economics",
            "rich": "economics",
            "science": "science",
            "physics": "science",
            "universe": "science",
            "cosmos": "science",
            "biology": "science",
            "biography": "biography",
            "memoir": "biography",
            "story": "storytelling",
            "narrative": "storytelling",
            "fiction": "fiction",
            "novel": "fiction"
        ]

        for (keyword, theme) in themeKeywords {
            if lowercased.contains(keyword) {
                themes.append(theme)
            }
        }

        return themes
    }

    // MARK: - Themed Recommendations

    /// Get recommendations based on a specific book ("If you liked X, try Y")
    func themedRecommendations(for book: Book, from library: [Book]) -> [BookSuggestion] {
        let toReadBooks = library.filter { $0.status == .toRead && $0.id != book.id }

        let targetThemes = extractThemes(from: book.title)
        let authorKey = normalizeAuthor(book.author)

        var suggestions: [(book: Book, score: Double, reason: String)] = []

        for candidate in toReadBooks {
            var score: Double = 0
            var reason = ""

            // Same genre
            if candidate.genre == book.genre {
                score += 30
                reason = "Same genre (\(book.genre.rawValue))"
            }

            // Same author
            if normalizeAuthor(candidate.author) == authorKey {
                score += 40
                reason = "Same author (\(candidate.author))"
            }

            // Theme overlap
            let candidateThemes = extractThemes(from: candidate.title)
            let overlap = Set(targetThemes).intersection(Set(candidateThemes))
            if !overlap.isEmpty {
                score += Double(overlap.count) * 15
                if reason.isEmpty {
                    reason = "Similar themes"
                } else {
                    reason += " with similar themes"
                }
            }

            if score > 0 {
                suggestions.append((candidate, score, reason))
            }
        }

        return suggestions
            .sorted { $0.score > $1.score }
            .prefix(3)
            .map { BookSuggestion(book: $0.book, reason: $0.reason, matchScore: $0.score) }
    }
}

// MARK: - Supporting Types

struct ReadingProfile {
    var genrePreferences: [Genre: Int] = [:]
    var authorPreferences: [String: Int] = [:]
    var themePreferences: [String: Int] = [:]
    var dominantGenre: Genre?
    var totalBooksAnalyzed: Int = 0
}

struct BookSuggestion {
    let book: Book
    let reason: String
    let matchScore: Double

    var matchPercent: Int {
        Int(matchScore)
    }
}

// MARK: - Genre Insights

extension ReadingAIService {
    /// Calculate detailed genre insights from reading history
    func calculateGenreInsights(from books: [Book]) -> GenreInsights {
        let finishedBooks = books.filter { $0.status == .finished }

        var insights = GenreInsights()

        // Count by genre
        for book in finishedBooks {
            insights.totalByGenre[book.genre, default: 0] += 1
            insights.pagesByGenre[book.genre, default: 0] += book.pageCount
        }

        // Determine dominant genre
        if let dominant = insights.totalByGenre.max(by: { $0.value < $1.value }) {
            insights.dominantGenre = dominant.key
            insights.dominantGenrePercent = Double(dominant.value) / max(Double(finishedBooks.count), 1) * 100
        }

        // Find neglected genres (all genres user hasn't explored)
        let exploredGenres = Set(insights.totalByGenre.keys)
        insights.neglectedGenres = Genre.allCases.filter { !exploredGenres.contains($0) }

        // Calculate genre trends over time
        insights.genreTrend = calculateGenreTrend(from: finishedBooks)

        return insights
    }

    /// Calculate which genres the user has been reading more/less of recently
    private func calculateGenreTrend(from books: [Book]) -> [Genre: TrendDirection] {
        var trend: [Genre: TrendDirection] = [:]

        let sorted = books.sorted { ($0.dateFinished ?? Date.distantPast) < ($1.dateFinished ?? Date.distantPast) }

        guard sorted.count >= 4 else { return trend }

        let recentHalf = Array(sorted.suffix(sorted.count / 2))
        let olderHalf = Array(sorted.prefix(sorted.count / 2))

        var recentCounts: [Genre: Int] = [:]
        var olderCounts: [Genre: Int] = [:]

        for book in recentHalf {
            recentCounts[book.genre, default: 0] += 1
        }
        for book in olderHalf {
            olderCounts[book.genre, default: 0] += 1
        }

        for genre in Genre.allCases {
            let recent = recentCounts[genre] ?? 0
            let older = olderCounts[genre] ?? 0

            if recent > older {
                trend[genre] = .increasing
            } else if recent < older {
                trend[genre] = .decreasing
            }
        }

        return trend
    }

    /// Generate a reading insights summary string
    func generateInsightsSummary(_ insights: GenreInsights) -> String {
        var parts: [String] = []

        if let dominant = insights.dominantGenre {
            let percent = Int(insights.dominantGenrePercent)
            parts.append("\(dominant.rawValue) dominates your reading at \(percent)%")
        }

        // Find increasing trends
        let increasingGenres = insights.genreTrend.filter { $0.value == .increasing }.map { $0.key }
        if !increasingGenres.isEmpty {
            let names = increasingGenres.prefix(2).map { $0.rawValue }.joined(separator: " and ")
            parts.append("You've been reading more \(names) lately")
        }

        // Find neglected genres worth mentioning
        if !insights.neglectedGenres.isEmpty {
            let readableNeglected = insights.neglectedGenres.prefix(2).map { $0.rawValue }
            if !readableNeglected.isEmpty {
                parts.append("You haven't explored \(readableNeglected.joined(separator: " or ")) yet")
            }
        }

        return parts.joined(separator: ". ") + "."
    }
}

struct GenreInsights {
    var totalByGenre: [Genre: Int] = [:]
    var pagesByGenre: [Genre: Int] = [:]
    var dominantGenre: Genre?
    var dominantGenrePercent: Double = 0
    var neglectedGenres: [Genre] = []
    var genreTrend: [Genre: TrendDirection] = [:]

    var summary: String {
        guard let dominant = dominantGenre else {
            return "Start finishing books to see your reading profile!"
        }
        return "\(dominant.rawValue) is your go-to genre (\(totalByGenre[dominant] ?? 0) books)"
    }
}

enum TrendDirection {
    case increasing
    case decreasing
    case stable
}

// MARK: - Reading Stats

extension ReadingAIService {
    /// Calculate comprehensive reading statistics
    func calculateReadingStats(from books: [Book]) -> DetailedReadingStats {
        var stats = DetailedReadingStats()

        let finishedBooks = books.filter { $0.status == .finished }
        let allBooks = books.filter { $0.status != .toRead }

        // Basic stats
        stats.totalBooksFinished = finishedBooks.count
        stats.totalPagesRead = finishedBooks.reduce(0) { $0 + $1.pageCount }
        stats.averageBookLength = finishedBooks.isEmpty ? 0 : stats.totalPagesRead / finishedBooks.count

        // Completion rate
        let totalStarted = books.filter { $0.status == .currentlyReading || $0.status == .finished }.count
        stats.completionRate = totalStarted > 0 ? Double(finishedBooks.count) / Double(totalStarted) * 100 : 0

        // Pages per week/month
        stats.pagesPerWeek = calculatePagesPerWeek(from: finishedBooks)
        stats.pagesPerMonth = calculatePagesPerMonth(from: finishedBooks)

        // Reading streak
        stats.currentStreak = calculateStreak(from: finishedBooks)

        // Books per month (last 6 months)
        stats.booksPerMonth = calculateBooksPerMonth(from: finishedBooks)

        // Average reading time per book (estimate based on page count)
        if !finishedBooks.isEmpty {
            stats.averageReadingDaysPerBook = 14 + (stats.averageBookLength / 30) // Rough estimate
        }

        return stats
    }

    private func calculatePagesPerWeek(from books: [Book]) -> Double {
        guard !books.isEmpty else { return 0 }

        let sorted = books.sorted { ($0.dateFinished ?? Date()) < ($1.dateFinished ?? Date()) }

        guard let oldest = sorted.first?.dateFinished,
              let newest = sorted.last?.dateFinished else { return 0 }

        let totalPages = books.reduce(0) { $0 + $1.pageCount }
        let days = Calendar.current.dateComponents([.day], from: oldest, to: newest).day ?? 1
        let weeks = max(Double(days) / 7.0, 1.0)

        return round(Double(totalPages) / weeks)
    }

    private func calculatePagesPerMonth(from books: [Book]) -> Double {
        guard !books.isEmpty else { return 0 }

        let sorted = books.sorted { ($0.dateFinished ?? Date()) < ($1.dateFinished ?? Date()) }

        guard let oldest = sorted.first?.dateFinished,
              let newest = sorted.last?.dateFinished else { return 0 }

        let totalPages = books.reduce(0) { $0 + $1.pageCount }
        let days = Calendar.current.dateComponents([.day], from: oldest, to: newest).day ?? 1
        let months = max(Double(days) / 30.0, 1.0)

        return round(Double(totalPages) / months)
    }

    private func calculateStreak(from books: [Book]) -> Int {
        guard !books.isEmpty else { return 0 }

        let sorted = books
            .compactMap { $0.dateFinished }
            .sorted(by: >)

        guard !sorted.isEmpty else { return 0 }

        var streak = 0
        var currentDate = Date()
        let calendar = Calendar.current

        for finishedDate in sorted {
            let daysBetween = calendar.dateComponents([.day], from: finishedDate, to: currentDate).day ?? 0

            if daysBetween <= 1 {
                streak += 1
                currentDate = finishedDate
            } else {
                break
            }
        }

        return streak
    }

    private func calculateBooksPerMonth(from books: [Book]) -> [String: Int] {
        var monthCounts: [String: Int] = [:]
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM"

        for book in books {
            if let date = book.dateFinished {
                let month = formatter.string(from: date)
                monthCounts[month, default: 0] += 1
            }
        }

        return monthCounts
    }
}

struct DetailedReadingStats {
    var totalBooksFinished: Int = 0
    var totalPagesRead: Int = 0
    var averageBookLength: Int = 0
    var completionRate: Double = 0
    var pagesPerWeek: Double = 0
    var pagesPerMonth: Double = 0
    var currentStreak: Int = 0
    var booksPerMonth: [String: Int] = [:]
    var averageReadingDaysPerBook: Int = 0

    var completionRatePercent: Int {
        Int(completionRate)
    }
}
