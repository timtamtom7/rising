import SwiftUI

struct MenuBarView: View {
    @EnvironmentObject var store: LibraryStore
    @State private var showAddBook = false

    var currentBook: Book? {
        store.books.first { $0.status == .currentlyReading }
    }

    var body: some View {
        VStack(spacing: 0) {
            // Header
            HStack {
                Image(systemName: "book.closed.fill")
                    .foregroundColor(Theme.warmBrown)
                Text("Readr")
                    .font(.system(size: 15, weight: .bold, design: .serif))
                    .foregroundColor(Theme.textPrimary)

                Spacer()

                Text("\(store.books.filter { $0.status == .toRead }.count) to read")
                    .font(.system(size: 11))
                    .foregroundColor(Theme.textSecondary)
            }
            .padding(.horizontal, 14)
            .padding(.vertical, 10)
            .background(Theme.cream)

            Divider()

            // Current reading
            if let book = currentBook {
                VStack(spacing: 0) {
                    HStack(spacing: 12) {
                        ZStack {
                            RoundedRectangle(cornerRadius: 3)
                                .fill(Color(hex: book.coverColor))
                                .frame(width: 28, height: 38)

                            Text(book.title.prefix(1).uppercased())
                                .font(.system(size: 12, weight: .bold, design: .serif))
                                .foregroundColor(.white)
                        }

                        VStack(alignment: .leading, spacing: 2) {
                            Text(book.title)
                                .font(.system(size: 12, weight: .semibold))
                                .foregroundColor(Theme.textPrimary)
                                .lineLimit(1)

                            Text("\(book.currentPage) / \(book.pageCount) pages")
                                .font(.system(size: 10))
                                .foregroundColor(Theme.textSecondary)
                        }

                        Spacer()

                        Text("\(book.progressPercent)%")
                            .font(.system(size: 14, weight: .bold))
                            .foregroundColor(Theme.forestGreen)
                    }
                    .padding(.horizontal, 14)
                    .padding(.vertical, 10)

                    // Mini progress bar
                    GeometryReader { geo in
                        ZStack(alignment: .leading) {
                            Rectangle()
                                .fill(Theme.cream)
                            Rectangle()
                                .fill(Theme.forestGreen)
                                .frame(width: geo.size.width * book.progress)
                        }
                    }
                    .frame(height: 4)
                }
                .background(Theme.cardBg)
            } else {
                HStack {
                    Image(systemName: "book.circle")
                        .foregroundColor(Theme.textSecondary)
                    Text("No book currently reading")
                        .font(.system(size: 12))
                        .foregroundColor(Theme.textSecondary)
                }
                .padding(.horizontal, 14)
                .padding(.vertical, 10)
            }

            Divider()

            // Quick actions
            VStack(spacing: 0) {
                QuickActionRow(icon: "plus", title: "Add Book", color: Theme.forestGreen) {
                    showAddBook = true
                }

                QuickActionRow(icon: "book.closed", title: "Reading List (\(store.books.filter { $0.status == .toRead }.count))", color: Theme.warmBrown) {
                    openMainWindow()
                }

                QuickActionRow(icon: "checkmark.circle", title: "Finished (\(store.books.filter { $0.status == .finished }.count))", color: Theme.burgundy) {
                    openMainWindow()
                }
            }

            Divider()

            // Stats summary
            HStack {
                StatPill(value: "\(store.stats.totalBooks)", label: "Finished", color: Theme.burgundy)
                StatPill(value: "\(store.books.filter { $0.status == .currentlyReading }.count)", label: "Reading", color: Theme.forestGreen)
                StatPill(value: "\(store.books.filter { $0.status == .toRead }.count)", label: "To Read", color: Theme.warmBrown)
            }
            .padding(.horizontal, 14)
            .padding(.vertical, 10)
        }
        .frame(width: 300)
        .background(Theme.surface)
    }

    func openMainWindow() {
        NSApp.activate(ignoringOtherApps: true)
    }
}

struct QuickActionRow: View {
    let icon: String
    let title: String
    let color: Color
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            HStack(spacing: 10) {
                Image(systemName: icon)
                    .font(.system(size: 13))
                    .foregroundColor(color)
                    .frame(width: 20)

                Text(title)
                    .font(.system(size: 12))
                    .foregroundColor(Theme.textPrimary)

                Spacer()

                Image(systemName: "chevron.right")
                    .font(.system(size: 10))
                    .foregroundColor(Theme.textSecondary)
            }
            .padding(.horizontal, 14)
            .padding(.vertical, 8)
        }
        .buttonStyle(.plain)
    }
}

struct StatPill: View {
    let value: String
    let label: String
    let color: Color

    var body: some View {
        VStack(spacing: 2) {
            Text(value)
                .font(.system(size: 14, weight: .bold))
                .foregroundColor(color)
            Text(label)
                .font(.system(size: 9))
                .foregroundColor(Theme.textSecondary)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 4)
        .background(Theme.cream)
        .cornerRadius(6)
    }
}
