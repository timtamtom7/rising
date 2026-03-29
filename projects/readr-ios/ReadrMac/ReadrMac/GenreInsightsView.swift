import SwiftUI

// MARK: - Genre Insights View

struct GenreInsightsView: View {
    let insights: GenreInsights
    let library: [Book]

    var body: some View {
        VStack(spacing: 20) {
            // Header
            HStack {
                Text("Reading Profile")
                    .font(.system(size: 18, weight: .semibold, design: .serif))
                    .foregroundColor(Theme.textPrimary)

                Spacer()

                if let dominant = insights.dominantGenre {
                    Text(dominant.rawValue)
                        .font(.system(size: 12, weight: .medium))
                        .foregroundColor(.white)
                        .padding(.horizontal, 10)
                        .padding(.vertical, 4)
                        .background(Theme.warmBrown)
                        .cornerRadius(12)
                }
            }

            // Genre breakdown
            if !insights.totalByGenre.isEmpty {
                VStack(alignment: .leading, spacing: 12) {
                    Text("Genre Distribution")
                        .font(.system(size: 13, weight: .medium))
                        .foregroundColor(Theme.textSecondary)

                    GenrePieChart(insights: insights)
                        .frame(height: 160)

                    // Genre bars
                    VStack(spacing: 8) {
                        ForEach(sortedGenres, id: \.genre) { item in
                            GenreBarRow(genre: item.genre, count: item.count, total: insights.totalByGenre.values.reduce(0, +))
                        }
                    }
                }
            }

            // Trend insights
            if !insights.genreTrend.isEmpty {
                VStack(alignment: .leading, spacing: 8) {
                    Text("Reading Mood")
                        .font(.system(size: 13, weight: .medium))
                        .foregroundColor(Theme.textSecondary)

                    ForEach(trendItems, id: \.genre) { item in
                        TrendRow(genre: item.genre, direction: item.direction)
                    }
                }
            }

            // Neglected genres nudge
            if !insights.neglectedGenres.isEmpty {
                VStack(alignment: .leading, spacing: 8) {
                    Text("Unexplored Territory")
                        .font(.system(size: 13, weight: .medium))
                        .foregroundColor(Theme.textSecondary)

                    ForEach(insights.neglectedGenres.prefix(3), id: \.self) { genre in
                        NeglectedGenreRow(genre: genre)
                    }
                }
            }

            // Summary
            Text(ReadingAIService.shared.generateInsightsSummary(insights))
                .font(.system(size: 12, design: .serif))
                .foregroundColor(Theme.textSecondary)
                .italic()
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(.top, 4)
        }
        .padding(20)
        .background(Theme.cardBg)
        .cornerRadius(12)
        .shadow(color: .black.opacity(0.04), radius: 4, x: 0, y: 2)
    }

    private var sortedGenres: [(genre: Genre, count: Int)] {
        insights.totalByGenre
            .map { ($0.key, $0.value) }
            .sorted { $0.1 > $1.1 }
    }

    private var trendItems: [(genre: Genre, direction: TrendDirection)] {
        insights.genreTrend
            .map { ($0.key, $0.value) }
            .filter { $0.1 != .stable }
            .sorted { trendValue($0.1) > trendValue($1.1) }
    }

    private func trendValue(_ direction: TrendDirection) -> Int {
        switch direction {
        case .increasing: return 2
        case .decreasing: return 1
        case .stable: return 0
        }
    }
}

// MARK: - Genre Pie Chart

struct GenrePieChart: View {
    let insights: GenreInsights

    var body: some View {
        GeometryReader { geo in
            let size = min(geo.size.width, geo.size.height)
            let center = CGPoint(x: geo.size.width / 2, y: geo.size.height / 2)
            let radius = size / 2 - 10

            ZStack {
                // Pie slices
                ForEach(Array(pieSlices.enumerated()), id: \.offset) { index, slice in
                    PieSlice(
                        startAngle: slice.startAngle,
                        endAngle: slice.endAngle,
                        innerRadius: radius * 0.5
                    )
                    .fill(slice.color)
                }

                // Center circle with total
                Circle()
                    .fill(Theme.cardBg)
                    .frame(width: radius, height: radius)

                VStack(spacing: 2) {
                    Text("\(insights.totalByGenre.values.reduce(0, +))")
                        .font(.system(size: 24, weight: .bold, design: .serif))
                        .foregroundColor(Theme.textPrimary)
                    Text("Books")
                        .font(.system(size: 11))
                        .foregroundColor(Theme.textSecondary)
                }
            }
            .frame(width: geo.size.width, height: geo.size.height)
        }
    }

    private var pieSlices: [(startAngle: Angle, endAngle: Angle, color: Color)] {
        let total = insights.totalByGenre.values.reduce(0, +)
        guard total > 0 else { return [] }

        let genreColors: [Genre: Color] = [
            .fiction: Color(hex: "E74C3C"),
            .nonFiction: Color(hex: "3498DB"),
            .biography: Color(hex: "9B59B6"),
            .science: Color(hex: "1ABC9C"),
            .history: Color(hex: "F39C12"),
            .philosophy: Color(hex: "2ECC71"),
            .selfHelp: Color(hex: "E91E63"),
            .other: Color(hex: "95A5A6")
        ]

        var slices: [(startAngle: Angle, endAngle: Angle, color: Color)] = []
        var currentAngle: Double = -90

        for genre in sortedGenresForPie {
            let count = insights.totalByGenre[genre] ?? 0
            let percent = Double(count) / Double(total)
            let angleSpan = percent * 360

            slices.append((
                startAngle: Angle(degrees: currentAngle),
                endAngle: Angle(degrees: currentAngle + angleSpan),
                color: genreColors[genre] ?? Theme.warmBrown
            ))

            currentAngle += angleSpan
        }

        return slices
    }

    private var sortedGenresForPie: [Genre] {
        insights.totalByGenre
            .sorted { $0.value > $1.value }
            .map { $0.key }
    }
}

struct PieSlice: Shape {
    let startAngle: Angle
    let endAngle: Angle
    let innerRadius: CGFloat

    func path(in rect: CGRect) -> Path {
        let center = CGPoint(x: rect.midX, y: rect.midY)
        let outerRadius = min(rect.width, rect.height) / 2

        var path = Path()

        path.addArc(center: center, radius: outerRadius, startAngle: startAngle, endAngle: endAngle, clockwise: false)
        path.addArc(center: center, radius: innerRadius, startAngle: endAngle, endAngle: startAngle, clockwise: true)
        path.closeSubpath()

        return path
    }
}

// MARK: - Genre Bar Row

struct GenreBarRow: View {
    let genre: Genre
    let count: Int
    let total: Int

    var percent: Double {
        guard total > 0 else { return 0 }
        return Double(count) / Double(total)
    }

    var genreColor: Color {
        switch genre {
        case .fiction: return Color(hex: "E74C3C")
        case .nonFiction: return Color(hex: "3498DB")
        case .biography: return Color(hex: "9B59B6")
        case .science: return Color(hex: "1ABC9C")
        case .history: return Color(hex: "F39C12")
        case .philosophy: return Color(hex: "2ECC71")
        case .selfHelp: return Color(hex: "E91E63")
        case .other: return Color(hex: "95A5A6")
        }
    }

    var body: some View {
        HStack(spacing: 8) {
            Text(genre.rawValue)
                .font(.system(size: 11))
                .foregroundColor(Theme.textPrimary)
                .frame(width: 80, alignment: .leading)

            GeometryReader { geo in
                ZStack(alignment: .leading) {
                    RoundedRectangle(cornerRadius: 3)
                        .fill(Theme.cream)

                    RoundedRectangle(cornerRadius: 3)
                        .fill(genreColor)
                        .frame(width: geo.size.width * percent)
                }
            }
            .frame(height: 12)

            Text("\(count)")
                .font(.system(size: 11, weight: .medium))
                .foregroundColor(Theme.textSecondary)
                .frame(width: 24, alignment: .trailing)

            Text("\(Int(percent * 100))%")
                .font(.system(size: 10))
                .foregroundColor(Theme.textSecondary)
                .frame(width: 32, alignment: .trailing)
        }
    }
}

// MARK: - Trend Row

struct TrendRow: View {
    let genre: Genre
    let direction: TrendDirection

    var icon: String {
        switch direction {
        case .increasing: return "arrow.up.right"
        case .decreasing: return "arrow.down.right"
        case .stable: return "arrow.right"
        }
    }

    var color: Color {
        switch direction {
        case .increasing: return Theme.forestGreen
        case .decreasing: return Theme.burgundy
        case .stable: return Theme.textSecondary
        }
    }

    var message: String {
        switch direction {
        case .increasing: return "You've been reading more \(genre.rawValue.lowercased()) lately"
        case .decreasing: return "Less \(genre.rawValue.lowercased()) recently"
        case .stable: return "\(genre.rawValue) reading steady"
        }
    }

    var body: some View {
        HStack(spacing: 8) {
            Image(systemName: icon)
                .font(.system(size: 12))
                .foregroundColor(color)

            Text(message)
                .font(.system(size: 12))
                .foregroundColor(Theme.textPrimary)

            Spacer()
        }
        .padding(.vertical, 4)
    }
}

// MARK: - Neglected Genre Row

struct NeglectedGenreRow: View {
    let genre: Genre

    var body: some View {
        HStack(spacing: 8) {
            Image(systemName: "book.closed")
                .font(.system(size: 11))
                .foregroundColor(Theme.textSecondary)

            Text("You haven't explored \(genre.rawValue) yet")
                .font(.system(size: 12))
                .foregroundColor(Theme.textSecondary)

            Spacer()

            Image(systemName: "sparkles")
                .font(.system(size: 10))
                .foregroundColor(Theme.accent)
        }
        .padding(.vertical, 4)
        .padding(.horizontal, 8)
        .background(Theme.accent.opacity(0.08))
        .cornerRadius(6)
    }
}

// MARK: - Reading Stats Dashboard

struct ReadingStatsDashboard: View {
    let stats: DetailedReadingStats

    var body: some View {
        VStack(spacing: 20) {
            // Header
            HStack {
                Text("Reading Stats")
                    .font(.system(size: 18, weight: .semibold, design: .serif))
                    .foregroundColor(Theme.textPrimary)

                Spacer()

                // Streak badge
                if stats.currentStreak > 0 {
                    HStack(spacing: 4) {
                        Image(systemName: "flame.fill")
                            .font(.system(size: 14))
                            .foregroundColor(Theme.accent)
                        Text("\(stats.currentStreak) day streak")
                            .font(.system(size: 12, weight: .medium))
                            .foregroundColor(Theme.accent)
                    }
                    .padding(.horizontal, 10)
                    .padding(.vertical, 4)
                    .background(Theme.accent.opacity(0.1))
                    .cornerRadius(12)
                }
            }

            // Main stats grid
            LazyVGrid(columns: [
                GridItem(.flexible()),
                GridItem(.flexible())
            ], spacing: 16) {
                StatBox(
                    title: "Books Finished",
                    value: "\(stats.totalBooksFinished)",
                    icon: "books.vertical.fill",
                    color: Theme.burgundy
                )

                StatBox(
                    title: "Pages Read",
                    value: "\(stats.totalPagesRead)",
                    icon: "book.pages.fill",
                    color: Theme.forestGreen
                )

                StatBox(
                    title: "Avg Book Length",
                    value: "\(stats.averageBookLength)p",
                    icon: "ruler",
                    color: Theme.warmBrown
                )

                StatBox(
                    title: "Completion Rate",
                    value: "\(stats.completionRatePercent)%",
                    icon: "checkmark.circle.fill",
                    color: Theme.accent
                )
            }

            // Weekly/Monthly stats
            VStack(alignment: .leading, spacing: 12) {
                Text("Reading Pace")
                    .font(.system(size: 13, weight: .medium))
                    .foregroundColor(Theme.textSecondary)

                HStack(spacing: 0) {
                    PaceStatBox(
                        value: "\(Int(stats.pagesPerWeek))",
                        label: "pages/week",
                        icon: "calendar",
                        color: Theme.forestGreen
                    )

                    Divider().frame(height: 50)

                    PaceStatBox(
                        value: "\(Int(stats.pagesPerMonth))",
                        label: "pages/month",
                        icon: "calendar.badge.clock",
                        color: Theme.warmBrown
                    )

                    Divider().frame(height: 50)

                    PaceStatBox(
                        value: "~\(stats.averageReadingDaysPerBook)",
                        label: "days/book",
                        icon: "clock",
                        color: Theme.burgundy
                    )
                }
            }

            // Monthly chart
            if !stats.booksPerMonth.isEmpty {
                VStack(alignment: .leading, spacing: 8) {
                    Text("Books per Month")
                        .font(.system(size: 13, weight: .medium))
                        .foregroundColor(Theme.textSecondary)

                    let sorted = stats.booksPerMonth.sorted { $0.key > $1.key }.prefix(6)
                    ForEach(Array(sorted), id: \.key) { month, count in
                        HStack {
                            Text(formatMonth(month))
                                .font(.system(size: 11))
                                .foregroundColor(Theme.textSecondary)
                                .frame(width: 60, alignment: .leading)

                            GeometryReader { geo in
                                ZStack(alignment: .leading) {
                                    RoundedRectangle(cornerRadius: 3)
                                        .fill(Theme.cream)
                                    RoundedRectangle(cornerRadius: 3)
                                        .fill(Theme.warmBrown)
                                        .frame(width: geo.size.width * CGFloat(count) / 6.0)
                                }
                            }
                            .frame(height: 16)

                            Text("\(count)")
                                .font(.system(size: 11, weight: .medium))
                                .foregroundColor(Theme.textPrimary)
                                .frame(width: 20, alignment: .trailing)
                        }
                    }
                }
            }
        }
        .padding(20)
        .background(Theme.cardBg)
        .cornerRadius(12)
        .shadow(color: .black.opacity(0.04), radius: 4, x: 0, y: 2)
    }

    private func formatMonth(_ monthStr: String) -> String {
        let inputFormatter = DateFormatter()
        inputFormatter.dateFormat = "yyyy-MM"

        let outputFormatter = DateFormatter()
        outputFormatter.dateFormat = "MMM yyyy"

        if let date = inputFormatter.date(from: monthStr) {
            return outputFormatter.string(from: date)
        }
        return monthStr
    }
}

// MARK: - Stat Box

struct StatBox: View {
    let title: String
    let value: String
    let icon: String
    let color: Color

    var body: some View {
        VStack(spacing: 8) {
            Image(systemName: icon)
                .font(.system(size: 20))
                .foregroundColor(color)

            Text(value)
                .font(.system(size: 24, weight: .bold, design: .serif))
                .foregroundColor(Theme.textPrimary)

            Text(title)
                .font(.system(size: 11))
                .foregroundColor(Theme.textSecondary)
                .multilineTextAlignment(.center)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 16)
        .background(color.opacity(0.08))
        .cornerRadius(10)
    }
}

// MARK: - Pace Stat Box

struct PaceStatBox: View {
    let value: String
    let label: String
    let icon: String
    let color: Color

    var body: some View {
        VStack(spacing: 6) {
            Image(systemName: icon)
                .font(.system(size: 16))
                .foregroundColor(color)

            Text(value)
                .font(.system(size: 18, weight: .bold, design: .serif))
                .foregroundColor(Theme.textPrimary)

            Text(label)
                .font(.system(size: 10))
                .foregroundColor(Theme.textSecondary)
        }
        .frame(maxWidth: .infinity)
    }
}

// MARK: - Recommendation Banner

struct RecommendationBanner: View {
    let suggestion: BookSuggestion
    let onAccept: () -> Void
    let onDismiss: () -> Void

    var body: some View {
        HStack(spacing: 16) {
            // Book cover
            ZStack {
                RoundedRectangle(cornerRadius: 6)
                    .fill(Color(hex: suggestion.book.coverColor))
                    .frame(width: 50, height: 70)

                Image(systemName: "book.closed.fill")
                    .font(.system(size: 20))
                    .foregroundColor(.white.opacity(0.7))
            }

            // Info
            VStack(alignment: .leading, spacing: 4) {
                Text("Up Next")
                    .font(.system(size: 11, weight: .medium))
                    .foregroundColor(Theme.accent)

                Text(suggestion.book.title)
                    .font(.system(size: 14, weight: .semibold, design: .serif))
                    .foregroundColor(Theme.textPrimary)
                    .lineLimit(1)

                Text(suggestion.reason)
                    .font(.system(size: 11))
                    .foregroundColor(Theme.textSecondary)
                    .lineLimit(1)
            }

            Spacer()

            // Match score
            VStack(spacing: 2) {
                Text("\(suggestion.matchPercent)%")
                    .font(.system(size: 16, weight: .bold))
                    .foregroundColor(Theme.forestGreen)
                Text("match")
                    .font(.system(size: 9))
                    .foregroundColor(Theme.textSecondary)
            }
            .padding(.horizontal, 8)

            // Actions
            VStack(spacing: 8) {
                Button("Start Reading") {
                    onAccept()
                }
                .buttonStyle(.borderedProminent)
                .tint(Theme.forestGreen)
                .controlSize(.small)

                Button("Maybe Later") {
                    onDismiss()
                }
                .buttonStyle(.plain)
                .font(.system(size: 11))
                .foregroundColor(Theme.textSecondary)
            }
        }
        .padding(16)
        .background(
            RoundedRectangle(cornerRadius: 12)
                .fill(Theme.cardBg)
                .overlay(
                    RoundedRectangle(cornerRadius: 12)
                        .stroke(Theme.forestGreen.opacity(0.3), lineWidth: 1)
                )
        )
        .shadow(color: .black.opacity(0.06), radius: 4, x: 0, y: 2)
    }
}
