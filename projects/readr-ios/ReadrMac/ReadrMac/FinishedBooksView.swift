import SwiftUI

struct FinishedBooksView: View {
    @EnvironmentObject var store: LibraryStore

    var finishedBooks: [Book] {
        store.books
            .filter { $0.status == .finished }
            .sorted { ($0.dateFinished ?? Date.distantPast) > ($1.dateFinished ?? Date.distantPast) }
    }

    var body: some View {
        VStack(spacing: 0) {
            HStack {
                Text("Finished Books")
                    .font(.system(size: 20, weight: .semibold, design: .serif))
                    .foregroundColor(Theme.textPrimary)

                Spacer()

                Text("\(finishedBooks.count) book\(finishedBooks.count == 1 ? "" : "s") read")
                    .font(.system(size: 13))
                    .foregroundColor(Theme.textSecondary)
            }
            .padding(.horizontal, 20)
            .padding(.vertical, 12)
            .background(Theme.cream)

            Divider()

            ScrollView {
                VStack(spacing: 20) {
                    // AI Reading Stats Dashboard (new R11)
                    let detailedStats = ReadingAIService.shared.calculateReadingStats(from: store.books)
                    ReadingStatsDashboard(stats: detailedStats)

                    // Genre Insights (new R11)
                    let insights = ReadingAIService.shared.calculateGenreInsights(from: store.books)
                    GenreInsightsView(insights: insights, library: store.books)

                    // Stats Card (existing)
                    StatsCard()
                        .environmentObject(store)

                    // Grid
                    LazyVGrid(columns: [
                        GridItem(.adaptive(minimum: 140), spacing: 16)
                    ], spacing: 16) {
                        ForEach(finishedBooks) { book in
                            FinishedBookCard(book: book)
                        }
                    }

                    if finishedBooks.isEmpty {
                        VStack(spacing: 12) {
                            Image(systemName: "checkmark.circle")
                                .font(.system(size: 40))
                                .foregroundColor(Theme.textSecondary)
                            Text("No finished books yet")
                                .font(.system(size: 16, design: .serif))
                                .foregroundColor(Theme.textSecondary)
                        }
                        .frame(maxWidth: .infinity)
                        .padding(.top, 40)
                    }
                }
                .padding(20)
            }
        }
    }
}

struct StatsCard: View {
    @EnvironmentObject var store: LibraryStore

    var stats: ReadingStats { store.stats }

    var body: some View {
        VStack(spacing: 16) {
            Text("Reading Stats")
                .font(.system(size: 16, weight: .semibold, design: .serif))
                .foregroundColor(Theme.textPrimary)
                .frame(maxWidth: .infinity, alignment: .leading)

            HStack(spacing: 0) {
                StatItem(value: "\(stats.totalBooks)", label: "Books Finished", icon: "books.vertical.fill", color: Theme.burgundy)
                Divider().frame(height: 40)
                StatItem(value: "\(stats.totalPages)", label: "Pages Read", icon: "book.pages.fill", color: Theme.forestGreen)
                Divider().frame(height: 40)
                StatItem(value: "\(stats.totalMinutesRead / 60)h", label: "Time Spent", icon: "clock.fill", color: Theme.warmBrown)
            }

            Divider()

            // Books per month chart
            VStack(alignment: .leading, spacing: 8) {
                Text("Books per Month")
                    .font(.system(size: 12, weight: .medium))
                    .foregroundColor(Theme.textSecondary)

                if stats.booksPerMonth.isEmpty {
                    Text("Start finishing books to see your monthly stats!")
                        .font(.system(size: 11))
                        .foregroundColor(Theme.textSecondary)
                        .italic()
                } else {
                    let sorted = stats.booksPerMonth.sorted { $0.key > $1.key }.prefix(6)
                    ForEach(Array(sorted), id: \.key) { month, count in
                        HStack {
                            Text(month)
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
            .frame(maxWidth: .infinity, alignment: .leading)
        }
        .padding(20)
        .background(Theme.cardBg)
        .cornerRadius(12)
        .shadow(color: .black.opacity(0.04), radius: 4, x: 0, y: 2)
    }
}

struct StatItem: View {
    let value: String
    let label: String
    let icon: String
    let color: Color

    var body: some View {
        VStack(spacing: 6) {
            Image(systemName: icon)
                .font(.system(size: 20))
                .foregroundColor(color)

            Text(value)
                .font(.system(size: 22, weight: .bold, design: .serif))
                .foregroundColor(Theme.textPrimary)

            Text(label)
                .font(.system(size: 10))
                .foregroundColor(Theme.textSecondary)
        }
        .frame(maxWidth: .infinity)
    }
}

struct FinishedBookCard: View {
    let book: Book

    var body: some View {
        VStack(spacing: 0) {
            // Cover
            ZStack {
                RoundedRectangle(cornerRadius: 6)
                    .fill(Color(hex: book.coverColor))

                VStack(spacing: 4) {
                    Image(systemName: "book.closed.fill")
                        .font(.system(size: 28))
                        .foregroundColor(.white.opacity(0.7))

                    Text(book.title.prefix(1).uppercased())
                        .font(.system(size: 24, weight: .bold, design: .serif))
                        .foregroundColor(.white)
                }
                .padding(8)
            }
            .frame(height: 140)

            // Info
            VStack(alignment: .leading, spacing: 2) {
                Text(book.title)
                    .font(.system(size: 12, weight: .semibold))
                    .foregroundColor(Theme.textPrimary)
                    .lineLimit(1)

                Text(book.author)
                    .font(.system(size: 10))
                    .foregroundColor(Theme.textSecondary)
                    .lineLimit(1)

                if let date = book.dateFinished {
                    Text(date, style: .date)
                        .font(.system(size: 9))
                        .foregroundColor(Theme.textSecondary)
                }
            }
            .padding(10)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(Theme.cardBg)
        }
        .background(Theme.cardBg)
        .cornerRadius(8)
        .shadow(color: .black.opacity(0.06), radius: 3, x: 0, y: 2)
    }
}
