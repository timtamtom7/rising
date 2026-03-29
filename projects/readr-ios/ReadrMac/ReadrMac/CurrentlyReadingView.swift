import SwiftUI

struct CurrentlyReadingView: View {
    @EnvironmentObject var store: LibraryStore
    @State private var selectedBook: Book?
    @State private var recommendation: BookSuggestion?
    @State private var showRecommendation = true

    var currentBooks: [Book] {
        store.books.filter { $0.status == .currentlyReading }
    }

    var recentlyRead: [Book] {
        store.books
            .filter { $0.status == .finished }
            .sorted { ($0.dateFinished ?? Date.distantPast) > ($1.dateFinished ?? Date.distantPast) }
            .prefix(5)
            .map { $0 }
    }

    var body: some View {
        VStack(spacing: 0) {
            HStack {
                Text("Currently Reading")
                    .font(.system(size: 20, weight: .semibold, design: .serif))
                    .foregroundColor(Theme.textPrimary)

                Spacer()

                Text("\(currentBooks.count) book\(currentBooks.count == 1 ? "" : "s")")
                    .font(.system(size: 13))
                    .foregroundColor(Theme.textSecondary)
            }
            .padding(.horizontal, 20)
            .padding(.vertical, 12)
            .background(Theme.cream)

            Divider()

            if currentBooks.isEmpty {
                VStack(spacing: 16) {
                    Image(systemName: "book.circle")
                        .font(.system(size: 60))
                        .foregroundColor(Theme.textSecondary)
                    Text("Nothing on your nightstand")
                        .font(.system(size: 18, design: .serif))
                        .foregroundColor(Theme.textSecondary)
                    Text("Start reading a book from your list")
                        .font(.system(size: 13))
                        .foregroundColor(Theme.textSecondary)
                }
                .frame(maxWidth: .infinity, maxHeight: .infinity)
            } else {
                ScrollView {
                    LazyVStack(spacing: 20) {
                        // AI Recommendation Banner (R11)
                        if showRecommendation, let suggestion = recommendation {
                            RecommendationBanner(
                                suggestion: suggestion,
                                onAccept: {
                                    acceptRecommendation(suggestion)
                                },
                                onDismiss: {
                                    showRecommendation = false
                                }
                            )
                        }

                        ForEach(currentBooks) { book in
                            CurrentlyReadingCard(book: book)
                                .environmentObject(store)
                        }
                    }
                    .padding(20)
                }
            }
        }
        .onAppear {
            updateRecommendation()
        }
        .onChange(of: store.books) { _, _ in
            updateRecommendation()
        }
    }

    private func updateRecommendation() {
        recommendation = ReadingAIService.shared.suggestNextBook(from: store.books, recentlyRead: recentlyRead)
    }

    private func acceptRecommendation(_ suggestion: BookSuggestion) {
        var updated = suggestion.book
        updated.status = .currentlyReading
        store.updateBook(updated)
        showRecommendation = false
    }
}

struct CurrentlyReadingCard: View {
    let book: Book
    @EnvironmentObject var store: LibraryStore
    @State private var pageInput: String = ""
    @State private var noteText: String = ""
    @State private var showAllNotes = false

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            // Header
            HStack(spacing: 16) {
                BookCoverView(book: book, size: .large)

                VStack(alignment: .leading, spacing: 6) {
                    Text(book.title)
                        .font(.system(size: 18, weight: .bold, design: .serif))
                        .foregroundColor(Theme.textPrimary)
                        .lineLimit(2)

                    Text(book.author)
                        .font(.system(size: 14))
                        .foregroundColor(Theme.textSecondary)

                    HStack(spacing: 12) {
                        Label("\(book.pageCount) pages", systemImage: "book.pages")
                        Label(book.genre.rawValue, systemImage: "tag")
                    }
                    .font(.system(size: 11))
                    .foregroundColor(Theme.textSecondary)
                    .padding(.top, 4)
                }

                Spacer()

                // Progress circle
                ZStack {
                    Circle()
                        .stroke(Theme.cream, lineWidth: 6)
                        .frame(width: 70, height: 70)

                    Circle()
                        .trim(from: 0, to: book.progress)
                        .stroke(Theme.forestGreen, style: StrokeStyle(lineWidth: 6, lineCap: .round))
                        .frame(width: 70, height: 70)
                        .rotationEffect(.degrees(-90))

                    VStack(spacing: 0) {
                        Text("\(book.progressPercent)%")
                            .font(.system(size: 14, weight: .bold))
                            .foregroundColor(Theme.forestGreen)
                    }
                }
            }
            .padding(20)

            Divider()

            // Progress bar
            VStack(alignment: .leading, spacing: 8) {
                HStack {
                    Text("\(book.currentPage) of \(book.pageCount) pages")
                        .font(.system(size: 12))
                        .foregroundColor(Theme.textSecondary)

                    Spacer()

                    Text("~\(book.pageCount - book.currentPage) pages left")
                        .font(.system(size: 12))
                        .foregroundColor(Theme.textSecondary)
                }

                GeometryReader { geo in
                    ZStack(alignment: .leading) {
                        RoundedRectangle(cornerRadius: 4)
                            .fill(Theme.cream)
                            .frame(height: 8)

                        RoundedRectangle(cornerRadius: 4)
                            .fill(
                                LinearGradient(
                                    colors: [Theme.forestGreen, Theme.forestGreen.opacity(0.8)],
                                    startPoint: .leading,
                                    endPoint: .trailing
                                )
                            )
                            .frame(width: geo.size.width * book.progress, height: 8)
                    }
                }
                .frame(height: 8)
            }
            .padding(.horizontal, 20)
            .padding(.vertical, 12)

            Divider()

            // Update progress
            VStack(alignment: .leading, spacing: 8) {
                Text("Update Progress")
                    .font(.system(size: 12, weight: .semibold))
                    .foregroundColor(Theme.textPrimary)

                HStack {
                    TextField("Current page", text: $pageInput)
                        .textFieldStyle(.roundedBorder)
                        .frame(width: 120)

                    Button("Update") {
                        if let page = Int(pageInput), page >= 0, page <= book.pageCount {
                            var updated = book
                            updated.currentPage = page
                            if page == book.pageCount {
                                updated.status = .finished
                                updated.dateFinished = Date()
                            }
                            store.updateBook(updated)
                            pageInput = ""
                        }
                    }
                    .buttonStyle(.borderedProminent)
                    .tint(Theme.warmBrown)

                    Spacer()

                    if book.progressPercent > 0 {
                        Text("I'm \(book.progressPercent)% done!")
                            .font(.system(size: 14, weight: .medium, design: .serif))
                            .foregroundColor(Theme.forestGreen)
                    }
                }
            }
            .padding(20)

            Divider()

            // Notes section
            VStack(alignment: .leading, spacing: 8) {
                HStack {
                    Text("Notes")
                        .font(.system(size: 12, weight: .semibold))
                        .foregroundColor(Theme.textPrimary)

                    Spacer()

                    Button(action: { showAllNotes.toggle() }) {
                        Label(showAllNotes ? "Hide" : "Show", systemImage: showAllNotes ? "chevron.up" : "chevron.down")
                            .font(.system(size: 11))
                    }
                    .buttonStyle(.plain)
                    .foregroundColor(Theme.warmBrown)
                }

                if showAllNotes || !book.notes.isEmpty {
                    if book.notes.isEmpty {
                        Text("No notes yet...")
                            .font(.system(size: 12))
                            .foregroundColor(Theme.textSecondary)
                            .italic()
                    } else {
                        Text(book.notes)
                            .font(.system(size: 12))
                            .foregroundColor(Theme.textPrimary)
                    }
                }

                HStack {
                    TextField("Add a note...", text: $noteText)
                        .textFieldStyle(.roundedBorder)

                    Button(action: saveNote) {
                        Image(systemName: "plus.circle.fill")
                            .foregroundColor(Theme.warmBrown)
                    }
                    .buttonStyle(.plain)
                    .disabled(noteText.isEmpty)
                }
            }
            .padding(20)
        }
        .background(Theme.cardBg)
        .cornerRadius(12)
        .shadow(color: .black.opacity(0.04), radius: 4, x: 0, y: 2)
    }

    private func saveNote() {
        guard !noteText.isEmpty else { return }
        var updated = book
        if updated.notes.isEmpty {
            updated.notes = noteText
        } else {
            updated.notes = updated.notes + "\n\n" + noteText
        }
        store.updateBook(updated)
        noteText = ""
    }
}
