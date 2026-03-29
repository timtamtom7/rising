import SwiftUI

struct ReadingListView: View {
    @EnvironmentObject var store: LibraryStore
    @State private var sortOption: SortOption = .priority
    @State private var filterGenre: Genre? = nil
    @State private var searchText: String = ""

    enum SortOption: String, CaseIterable {
        case priority = "Priority"
        case dateAdded = "Date Added"
        case author = "Author"
        case title = "Title"
    }

    var toReadBooks: [Book] {
        store.books
            .filter { $0.status == .toRead }
            .filter { book in
                if let genre = filterGenre {
                    return book.genre == genre
                }
                return true
            }
            .filter { book in
                if searchText.isEmpty { return true }
                return book.title.localizedCaseInsensitiveContains(searchText) ||
                       book.author.localizedCaseInsensitiveContains(searchText)
            }
            .sorted { lhs, rhs in
                switch sortOption {
                case .priority:
                    return lhs.priority.rawValue < rhs.priority.rawValue
                case .dateAdded:
                    return lhs.dateAdded > rhs.dateAdded
                case .author:
                    return lhs.author < rhs.author
                case .title:
                    return lhs.title < rhs.title
                }
            }
    }

    var body: some View {
        VStack(spacing: 0) {
            // Toolbar
            HStack {
                Text("Reading List")
                    .font(.system(size: 20, weight: .semibold, design: .serif))
                    .foregroundColor(Theme.textPrimary)

                Spacer()

                Menu {
                    ForEach(SortOption.allCases, id: \.self) { option in
                        Button(action: { sortOption = option }) {
                            HStack {
                                Text(option.rawValue)
                                if sortOption == option {
                                    Image(systemName: "checkmark")
                                }
                            }
                        }
                    }
                } label: {
                    Label("Sort: \(sortOption.rawValue)", systemImage: "arrow.up.arrow.down")
                        .font(.system(size: 12))
                }

                Menu {
                    Button(action: { filterGenre = nil }) {
                        HStack {
                            Text("All Genres")
                            if filterGenre == nil { Image(systemName: "checkmark") }
                        }
                    }
                    Divider()
                    ForEach(Genre.allCases, id: \.self) { genre in
                        Button(action: { filterGenre = genre }) {
                            HStack {
                                Text(genre.rawValue)
                                if filterGenre == genre { Image(systemName: "checkmark") }
                            }
                        }
                    }
                } label: {
                    Label(filterGenre?.rawValue ?? "All", systemImage: "line.3.horizontal.decrease.circle")
                        .font(.system(size: 12))
                }
            }
            .padding(.horizontal, 20)
            .padding(.vertical, 12)
            .background(Theme.cream)

            // Search
            HStack {
                Image(systemName: "magnifyingglass")
                    .foregroundColor(Theme.textSecondary)
                TextField("Search books...", text: $searchText)
                    .textFieldStyle(.plain)
                if !searchText.isEmpty {
                    Button(action: { searchText = "" }) {
                        Image(systemName: "xmark.circle.fill")
                            .foregroundColor(Theme.textSecondary)
                    }
                    .buttonStyle(.plain)
                }
            }
            .padding(10)
            .background(Theme.cardBg)
            .cornerRadius(8)
            .padding(.horizontal, 20)
            .padding(.vertical, 8)

            Divider()

            ScrollView {
                LazyVStack(spacing: 12) {
                    ForEach(toReadBooks) { book in
                        BookRowView(book: book)
                            .environmentObject(store)
                    }

                    if toReadBooks.isEmpty {
                        VStack(spacing: 12) {
                            Image(systemName: "books.vertical")
                                .font(.system(size: 40))
                                .foregroundColor(Theme.textSecondary)
                            Text("No books to read")
                                .font(.system(size: 16, design: .serif))
                                .foregroundColor(Theme.textSecondary)
                            Text("Add a book to get started")
                                .font(.system(size: 13))
                                .foregroundColor(Theme.textSecondary)
                        }
                        .frame(maxWidth: .infinity)
                        .padding(.top, 60)
                    }
                }
                .padding(20)
            }
        }
    }
}

struct BookRowView: View {
    let book: Book
    @EnvironmentObject var store: LibraryStore
    @State private var showDetail = false

    var body: some View {
        HStack(spacing: 16) {
            // Cover
            BookCoverView(book: book, size: .medium)

            // Info
            VStack(alignment: .leading, spacing: 4) {
                Text(book.title)
                    .font(.system(size: 15, weight: .semibold))
                    .foregroundColor(Theme.textPrimary)
                    .lineLimit(2)

                Text(book.author)
                    .font(.system(size: 13))
                    .foregroundColor(Theme.textSecondary)
                    .lineLimit(1)

                HStack(spacing: 8) {
                    Label("\(book.pageCount) pages", systemImage: "book.pages")
                        .font(.system(size: 11))
                        .foregroundColor(Theme.textSecondary)

                    Text(book.priority.label)
                        .font(.system(size: 11))
                }
                .padding(.top, 2)

                Text(book.genre.rawValue)
                    .font(.system(size: 10, weight: .medium))
                    .foregroundColor(Theme.warmBrown)
                    .padding(.horizontal, 6)
                    .padding(.vertical, 2)
                    .background(Theme.warmBrown.opacity(0.1))
                    .cornerRadius(4)
            }

            Spacer()

            // Actions
            VStack(spacing: 8) {
                Button("Start Reading") {
                    var updated = book
                    updated.status = .currentlyReading
                    store.updateBook(updated)
                }
                .buttonStyle(.borderedProminent)
                .tint(Theme.forestGreen)

                Button("Remove") {
                    store.deleteBook(book)
                }
                .buttonStyle(.plain)
                .font(.system(size: 11))
                .foregroundColor(Theme.textSecondary)
            }
        }
        .padding(16)
        .background(Theme.cardBg)
        .cornerRadius(12)
        .shadow(color: .black.opacity(0.04), radius: 4, x: 0, y: 2)
    }
}

struct BookCoverView: View {
    let book: Book
    let size: Size
    enum Size {
        case small, medium, large
        var dims: CGFloat {
            switch self {
            case .small: return 40
            case .medium: return 60
            case .large: return 120
            }
        }
    }

    var body: some View {
        ZStack {
            RoundedRectangle(cornerRadius: 4)
                .fill(Color(hex: book.coverColor))

            VStack(spacing: 2) {
                Image(systemName: "book.closed.fill")
                    .font(.system(size: size.dims * 0.3))
                    .foregroundColor(.white.opacity(0.7))

                Text(book.title.prefix(1).uppercased())
                    .font(.system(size: size.dims * 0.25, weight: .bold, design: .serif))
                    .foregroundColor(.white)
            }
        }
        .frame(width: size.dims * 0.7, height: size.dims)
    }
}
