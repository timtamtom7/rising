import SwiftUI

struct AddBookView: View {
    @EnvironmentObject var store: LibraryStore
    @State private var searchQuery: String = ""
    @State private var searchResults: [Book] = []
    @State private var isSearching: Bool = false
    @State private var showManualEntry: Bool = false

    // Manual entry fields
    @State private var manualTitle: String = ""
    @State private var manualAuthor: String = ""
    @State private var manualISBN: String = ""
    @State private var manualPages: String = ""
    @State private var manualGenre: Genre = .fiction
    @State private var manualPriority: Priority = .medium
    @State private var manualCoverColor: String = "8B4513"

    let coverColors = ["8B4513", "228B22", "722F37", "c87b4f", "2563eb", "4a5568", "7c3aed", "059669"]

    var body: some View {
        VStack(spacing: 0) {
            HStack {
                Text("Add a Book")
                    .font(.system(size: 20, weight: .semibold, design: .serif))
                    .foregroundColor(Theme.textPrimary)

                Spacer()

                Button(action: { showManualEntry.toggle() }) {
                    Label("Manual Entry", systemImage: "square.and.pencil")
                }
                .buttonStyle(.bordered)
                .tint(showManualEntry ? Theme.warmBrown : Theme.textSecondary)
            }
            .padding(.horizontal, 20)
            .padding(.vertical, 12)
            .background(Theme.cream)

            Divider()

            ScrollView {
                VStack(spacing: 20) {
                    if showManualEntry {
                        ManualEntryCard(
                            title: $manualTitle,
                            author: $manualAuthor,
                            isbn: $manualISBN,
                            pages: $manualPages,
                            genre: $manualGenre,
                            priority: $manualPriority,
                            coverColor: $manualCoverColor,
                            coverColors: coverColors,
                            onSave: saveManualBook
                        )
                    }

                    // Search section
                    VStack(alignment: .leading, spacing: 12) {
                        Text("Search by Title, Author, or ISBN")
                            .font(.system(size: 14, weight: .semibold))
                            .foregroundColor(Theme.textPrimary)

                        HStack {
                            TextField("e.g. Atomic Habits, James Clear...", text: $searchQuery)
                                .textFieldStyle(.roundedBorder)

                            Button(action: performSearch) {
                                if isSearching {
                                    ProgressView()
                                        .controlSize(.small)
                                } else {
                                    Label("Search", systemImage: "magnifyingglass")
                                }
                            }
                            .buttonStyle(.borderedProminent)
                            .tint(Theme.warmBrown)
                            .disabled(searchQuery.isEmpty || isSearching)
                        }
                    }
                    .padding(20)
                    .background(Theme.cardBg)
                    .cornerRadius(12)

                    // Search results
                    if !searchResults.isEmpty {
                        VStack(alignment: .leading, spacing: 12) {
                            Text("Search Results")
                                .font(.system(size: 14, weight: .semibold))
                                .foregroundColor(Theme.textPrimary)

                            ForEach(searchResults) { book in
                                SearchResultRow(book: book) {
                                    store.addBook(book)
                                    searchResults.removeAll { $0.id == book.id }
                                }
                            }
                        }
                    }

                    // Quick add suggestions
                    if searchResults.isEmpty && !showManualEntry {
                        VStack(alignment: .leading, spacing: 12) {
                            Text("Popular Books to Add")
                                .font(.system(size: 14, weight: .semibold))
                                .foregroundColor(Theme.textPrimary)

                            ForEach(suggestedBooks) { book in
                                SearchResultRow(book: book) {
                                    store.addBook(book)
                                }
                            }
                        }
                    }
                }
                .padding(20)
            }
        }
    }

    var suggestedBooks: [Book] {
        [
            Book(title: "The Psychology of Money", author: "Morgan Housel", pageCount: 256, genre: .nonFiction, priority: .high, coverColor: "c87b4f"),
            Book(title: "Deep Work", author: "Cal Newport", pageCount: 318, genre: .selfHelp, priority: .medium, coverColor: "228B22"),
            Book(title: "The Midnight Library", author: "Matt Haig", pageCount: 304, genre: .fiction, priority: .medium, coverColor: "722F37"),
            Book(title: "Project Hail Mary", author: "Andy Weir", pageCount: 496, genre: .fiction, priority: .low, coverColor: "2563eb"),
        ]
    }

    func performSearch() {
        guard !searchQuery.isEmpty else { return }
        isSearching = true

        // Simulate search with sample results
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.8) {
            let query = searchQuery.lowercased()
            searchResults = [
                Book(title: "The Art of War", author: "Sun Tzu", pageCount: 273, genre: .philosophy, priority: .medium, coverColor: "8B4513"),
                Book(title: "1984", author: "George Orwell", pageCount: 328, genre: .fiction, priority: .high, coverColor: "722F37"),
            ].filter {
                $0.title.lowercased().contains(query) ||
                $0.author.lowercased().contains(query)
            }

            if searchResults.isEmpty {
                searchResults = [
                    Book(title: searchQuery, author: "Unknown Author", pageCount: 300, genre: .fiction, priority: .medium, coverColor: "8B4513")
                ]
            }
            isSearching = false
        }
    }

    func saveManualBook() {
        guard !manualTitle.isEmpty, !manualAuthor.isEmpty,
              let pages = Int(manualPages), pages > 0 else { return }

        let book = Book(
            title: manualTitle,
            author: manualAuthor,
            isbn: manualISBN.isEmpty ? nil : manualISBN,
            pageCount: pages,
            genre: manualGenre,
            priority: manualPriority,
            coverColor: manualCoverColor
        )

        store.addBook(book)

        // Reset fields
        manualTitle = ""
        manualAuthor = ""
        manualISBN = ""
        manualPages = ""
        manualGenre = .fiction
        manualPriority = .medium
        showManualEntry = false
    }
}

struct ManualEntryCard: View {
    @Binding var title: String
    @Binding var author: String
    @Binding var isbn: String
    @Binding var pages: String
    @Binding var genre: Genre
    @Binding var priority: Priority
    @Binding var coverColor: String
    let coverColors: [String]
    let onSave: () -> Void

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            HStack {
                Text("Manual Book Entry")
                    .font(.system(size: 14, weight: .semibold, design: .serif))
                    .foregroundColor(Theme.textPrimary)

                Spacer()

                Text("Cover Preview")
                    .font(.system(size: 11))
                    .foregroundColor(Theme.textSecondary)

                ZStack {
                    RoundedRectangle(cornerRadius: 4)
                        .fill(Color(hex: coverColor))
                        .frame(width: 36, height: 48)

                    Text(title.prefix(1).uppercased())
                        .font(.system(size: 14, weight: .bold, design: .serif))
                        .foregroundColor(.white)
                }
            }

            VStack(spacing: 12) {
                HStack(spacing: 12) {
                    VStack(alignment: .leading, spacing: 4) {
                        Text("Title *")
                            .font(.system(size: 11))
                            .foregroundColor(Theme.textSecondary)
                        TextField("Book title", text: $title)
                            .textFieldStyle(.roundedBorder)
                    }

                    VStack(alignment: .leading, spacing: 4) {
                        Text("Author *")
                            .font(.system(size: 11))
                            .foregroundColor(Theme.textSecondary)
                        TextField("Author name", text: $author)
                            .textFieldStyle(.roundedBorder)
                    }
                }

                HStack(spacing: 12) {
                    VStack(alignment: .leading, spacing: 4) {
                        Text("ISBN (optional)")
                            .font(.system(size: 11))
                            .foregroundColor(Theme.textSecondary)
                        TextField("978-...", text: $isbn)
                            .textFieldStyle(.roundedBorder)
                    }

                    VStack(alignment: .leading, spacing: 4) {
                        Text("Pages *")
                            .font(.system(size: 11))
                            .foregroundColor(Theme.textSecondary)
                        TextField("Page count", text: $pages)
                            .textFieldStyle(.roundedBorder)
                    }
                }

                HStack(spacing: 12) {
                    VStack(alignment: .leading, spacing: 4) {
                        Text("Genre")
                            .font(.system(size: 11))
                            .foregroundColor(Theme.textSecondary)
                        Picker("Genre", selection: $genre) {
                            ForEach(Genre.allCases, id: \.self) { g in
                                Text(g.rawValue).tag(g)
                            }
                        }
                        .labelsHidden()
                    }

                    VStack(alignment: .leading, spacing: 4) {
                        Text("Priority")
                            .font(.system(size: 11))
                            .foregroundColor(Theme.textSecondary)
                        Picker("Priority", selection: $priority) {
                            ForEach(Priority.allCases, id: \.self) { p in
                                Text(p.label).tag(p)
                            }
                        }
                        .labelsHidden()
                    }
                }

                VStack(alignment: .leading, spacing: 4) {
                    Text("Cover Color")
                        .font(.system(size: 11))
                        .foregroundColor(Theme.textSecondary)
                    HStack(spacing: 8) {
                        ForEach(coverColors, id: \.self) { color in
                            Circle()
                                .fill(Color(hex: color))
                                .frame(width: 28, height: 28)
                                .overlay(
                                    Circle()
                                        .stroke(coverColor == color ? Theme.textPrimary : Color.clear, lineWidth: 2)
                                )
                                .onTapGesture { coverColor = color }
                        }
                    }
                }
            }

            HStack {
                Spacer()
                Button(action: onSave) {
                    Label("Add to Library", systemImage: "plus.circle.fill")
                }
                .buttonStyle(.borderedProminent)
                .tint(Theme.forestGreen)
                .disabled(title.isEmpty || author.isEmpty || pages.isEmpty)
            }
        }
        .padding(20)
        .background(Theme.cardBg)
        .cornerRadius(12)
        .shadow(color: .black.opacity(0.04), radius: 4, x: 0, y: 2)
    }
}

struct SearchResultRow: View {
    let book: Book
    let onAdd: () -> Void

    var body: some View {
        HStack(spacing: 12) {
            BookCoverView(book: book, size: .small)

            VStack(alignment: .leading, spacing: 2) {
                Text(book.title)
                    .font(.system(size: 13, weight: .semibold))
                    .foregroundColor(Theme.textPrimary)

                Text(book.author)
                    .font(.system(size: 11))
                    .foregroundColor(Theme.textSecondary)

                HStack(spacing: 8) {
                    Text("\(book.pageCount) pages")
                        .font(.system(size: 10))
                        .foregroundColor(Theme.textSecondary)

                    Text(book.genre.rawValue)
                        .font(.system(size: 10))
                        .foregroundColor(Theme.warmBrown)
                }
            }

            Spacer()

            Button(action: onAdd) {
                Image(systemName: "plus.circle.fill")
                    .font(.system(size: 22))
                    .foregroundColor(Theme.forestGreen)
            }
            .buttonStyle(.plain)
        }
        .padding(12)
        .background(Theme.cream)
        .cornerRadius(8)
    }
}
