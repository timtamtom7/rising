import Foundation

// MARK: - Social Data Models

/// Lightweight book reference for sharing
struct BookRef: Codable, Identifiable, Equatable, Hashable {
    var id: String { isbn ?? "\(title)-\(author)" }
    var title: String
    var author: String
    var isbn: String?

    init(title: String, author: String, isbn: String? = nil) {
        self.title = title
        self.author = author
        self.isbn = isbn
    }

    init(from book: Book) {
        self.title = book.title
        self.author = book.author
        self.isbn = book.isbn
    }
}

/// A shareable reading list
struct SharedList: Identifiable, Codable {
    var id: UUID
    var name: String
    var ownerId: String
    var books: [BookRef]
    var isPublic: Bool
    var createdAt: Date
    var shareCode: String

    init(
        id: UUID = UUID(),
        name: String,
        ownerId: String,
        books: [BookRef],
        isPublic: Bool = false,
        createdAt: Date = Date()
    ) {
        self.id = id
        self.name = name
        self.ownerId = ownerId
        self.books = books
        self.isPublic = isPublic
        self.createdAt = createdAt
        self.shareCode = String(id.uuidString.prefix(6)).uppercased()
    }
}

/// A friend/follower
struct Friend: Identifiable, Codable, Equatable {
    var id: UUID
    var name: String
    var avatarUrl: String?
    var currentlyReading: BookRef?
    var recentlyFinished: [BookRef]
    var friendCode: String

    init(
        id: UUID = UUID(),
        name: String,
        avatarUrl: String? = nil,
        currentlyReading: BookRef? = nil,
        recentlyFinished: [BookRef] = [],
        friendCode: String? = nil
    ) {
        self.id = id
        self.name = name
        self.avatarUrl = avatarUrl
        self.currentlyReading = currentlyReading
        self.recentlyFinished = recentlyFinished
        self.friendCode = friendCode ?? String(id.uuidString.prefix(8)).uppercased()
    }
}

/// User profile with social info
struct UserProfile: Codable {
    var id: UUID
    var name: String
    var friendCode: String
    var following: [String]

    init(id: UUID = UUID(), name: String, friendCode: String? = nil, following: [String] = []) {
        self.id = id
        self.name = name
        self.friendCode = friendCode ?? String(id.uuidString.prefix(8)).uppercased()
        self.following = following
    }
}

/// Book club discussion message
struct Message: Identifiable, Codable, Equatable {
    var id: UUID
    var authorName: String
    var text: String
    var timestamp: Date

    init(id: UUID = UUID(), authorName: String, text: String, timestamp: Date = Date()) {
        self.id = id
        self.authorName = authorName
        self.text = text
        self.timestamp = timestamp
    }
}

/// Book club discussion thread
struct Discussion: Identifiable, Codable, Equatable {
    var id: UUID
    var bookId: UUID
    var messages: [Message]

    init(id: UUID = UUID(), bookId: UUID, messages: [Message] = []) {
        self.id = id
        self.bookId = bookId
        self.messages = messages
    }

    var messageCount: Int { messages.count }
}

/// A book club
struct BookClub: Identifiable, Codable, Equatable {
    var id: UUID
    var name: String
    var clubDescription: String
    var members: [String]
    var currentBook: BookRef?
    var discussions: [Discussion]
    var nextMeeting: Date?
    var ownerId: String

    init(
        id: UUID = UUID(),
        name: String,
        clubDescription: String = "",
        members: [String] = [],
        currentBook: BookRef? = nil,
        discussions: [Discussion] = [],
        nextMeeting: Date? = nil,
        ownerId: String = ""
    ) {
        self.id = id
        self.name = name
        self.clubDescription = clubDescription
        self.members = members
        self.currentBook = currentBook
        self.discussions = discussions
        self.nextMeeting = nextMeeting
        self.ownerId = ownerId
    }
}

// MARK: - SocialReadingService

/// Service for social reading features: shared lists, friends, book clubs
@MainActor
final class SocialReadingService: ObservableObject {
    static let shared = SocialReadingService()

    @Published var sharedLists: [SharedList] = []
    @Published var friends: [Friend] = []
    @Published var userProfile: UserProfile
    @Published var bookClubs: [BookClub] = []
    @Published var friendRecommendations: [BookSuggestion] = []

    private let listsKey = "readr_shared_lists"
    private let friendsKey = "readr_friends"
    private let profileKey = "readr_user_profile"
    private let clubsKey = "readr_book_clubs"

    private init() {
        let profile = UserProfile(name: "Me")
        self.userProfile = Self.load(key: profileKey) ?? profile
        self.sharedLists = Self.load(key: listsKey) ?? Self.sampleLists()
        self.friends = Self.load(key: friendsKey) ?? Self.sampleFriends()
        self.bookClubs = Self.load(key: clubsKey) ?? Self.sampleBookClubs()
        generateFriendRecommendations()
    }

    // MARK: - Reading Lists

    func createReadingList(name: String, books: [Book]) -> SharedList {
        let refs = books.map { BookRef(from: $0) }
        let list = SharedList(
            name: name,
            ownerId: userProfile.friendCode,
            books: refs
        )
        sharedLists.append(list)
        saveLists()
        return list
    }

    func shareList(listId: UUID, withFriends friendCodes: [String]) {
        guard let idx = sharedLists.firstIndex(where: { $0.id == listId }) else { return }
        sharedLists[idx].isPublic = true
        saveLists()
    }

    func importList(shareCode: String) -> SharedList? {
        return sharedLists.first { $0.shareCode == shareCode }
    }

    func deleteSharedList(_ list: SharedList) {
        sharedLists.removeAll { $0.id == list.id }
        saveLists()
    }

    // MARK: - Friends

    func getFriendRecommendations() -> [BookSuggestion] {
        return friendRecommendations
    }

    func addFriend(friendCode: String) {
        guard !userProfile.following.contains(friendCode) else { return }
        userProfile.following.append(friendCode)
        saveProfile()
    }

    func removeFriend(friendCode: String) {
        userProfile.following.removeAll { $0 == friendCode }
        saveProfile()
    }

    private func generateFriendRecommendations() {
        // Map friends to book suggestions
        var suggestions: [BookSuggestion] = []
        for friend in friends {
            if let currentlyReading = friend.currentlyReading {
                suggestions.append(BookSuggestion(
                    book: Book(
                        title: currentlyReading.title,
                        author: currentlyReading.author,
                        isbn: currentlyReading.isbn,
                        pageCount: 300
                    ),
                    reason: "\(friend.name) is reading it",
                    matchScore: 75
                ))
            }
        }
        friendRecommendations = suggestions
    }

    // MARK: - Book Clubs

    func createBookClub(name: String, description: String) -> BookClub {
        let club = BookClub(
            name: name,
            clubDescription: description,
            members: [userProfile.friendCode],
            ownerId: userProfile.friendCode
        )
        bookClubs.append(club)
        saveClubs()
        return club
    }

    func joinClub(clubId: UUID) {
        guard let idx = bookClubs.firstIndex(where: { $0.id == clubId }) else { return }
        if !bookClubs[idx].members.contains(userProfile.friendCode) {
            bookClubs[idx].members.append(userProfile.friendCode)
            saveClubs()
        }
    }

    func leaveClub(clubId: UUID) {
        bookClubs.removeAll { $0.id == clubId }
        saveClubs()
    }

    func setCurrentBook(_ book: BookRef, forClub clubId: UUID) {
        guard let idx = bookClubs.firstIndex(where: { $0.id == clubId }) else { return }
        bookClubs[idx].currentBook = book
        // Start a new discussion for the book
        let discussion = Discussion(bookId: UUID())
        bookClubs[idx].discussions.append(discussion)
        saveClubs()
    }

    func postMessage(_ text: String, toDiscussion discussionId: UUID, inClub clubId: UUID) {
        guard let clubIdx = bookClubs.firstIndex(where: { $0.id == clubId }),
              let discIdx = bookClubs[clubIdx].discussions.firstIndex(where: { $0.id == discussionId }) else { return }

        let message = Message(authorName: userProfile.name, text: text)
        bookClubs[clubIdx].discussions[discIdx].messages.append(message)
        saveClubs()
    }

    func setNextMeeting(_ date: Date, forClub clubId: UUID) {
        guard let idx = bookClubs.firstIndex(where: { $0.id == clubId }) else { return }
        bookClubs[idx].nextMeeting = date
        saveClubs()
    }

    // MARK: - Persistence

    private func saveLists() {
        SocialReadingService.save(sharedLists, key: listsKey)
    }

    private func saveProfile() {
        SocialReadingService.save(userProfile, key: profileKey)
    }

    private func saveClubs() {
        SocialReadingService.save(bookClubs, key: clubsKey)
    }

    private static func load<T: Decodable>(key: String) -> T? {
        guard let data = UserDefaults.standard.data(forKey: key) else { return nil }
        return try? JSONDecoder().decode(T.self, from: data)
    }

    private static func save<T: Encodable>(_ value: T, key: String) {
        if let data = try? JSONEncoder().encode(value) {
            UserDefaults.standard.set(data, forKey: key)
        }
    }

    // MARK: - Sample Data

    private static func sampleLists() -> [SharedList] {
        [
            SharedList(
                name: "Summer Reads",
                ownerId: "TOMMAS01",
                books: [
                    BookRef(title: "Project Hail Mary", author: "Andy Weir"),
                    BookRef(title: "The Midnight Library", author: "Matt Haig")
                ],
                isPublic: true
            )
        ]
    }

    private static func sampleFriends() -> [Friend] {
        [
            Friend(
                name: "Tommaso",
                currentlyReading: BookRef(title: "Atomic Habits", author: "James Clear"),
                recentlyFinished: [
                    BookRef(title: "Sapiens", author: "Yuval Noah Harari")
                ],
                friendCode: "TOMMAS01"
            ),
            Friend(
                name: "Sarah",
                currentlyReading: BookRef(title: "Project Hail Mary", author: "Andy Weir"),
                recentlyFinished: [
                    BookRef(title: "The Midnight Library", author: "Matt Haig"),
                    BookRef(title: "Dune", author: "Frank Herbert")
                ],
                friendCode: "SARAH002"
            ),
            Friend(
                name: "Alex",
                recentlyFinished: [
                    BookRef(title: "Clean Code", author: "Robert C. Martin"),
                    BookRef(title: "The Pragmatic Programmer", author: "David Thomas")
                ],
                friendCode: "ALEX003"
            )
        ]
    }

    private static func sampleBookClubs() -> [BookClub] {
        [
            BookClub(
                name: "Sci-Fi Readers",
                clubDescription: "We read science fiction and talk about the future.",
                members: ["TOMMAS01", "SARAH002"],
                currentBook: BookRef(title: "Project Hail Mary", author: "Andy Weir"),
                discussions: [
                    Discussion(
                        bookId: UUID(),
                        messages: [
                            Message(authorName: "Sarah", text: "This book is incredible so far!", timestamp: Date().addingTimeInterval(-86400)),
                            Message(authorName: "Tommaso", text: "Right?! The opening is so mysterious.", timestamp: Date().addingTimeInterval(-3600))
                        ]
                    )
                ],
                nextMeeting: Date().addingTimeInterval(86400 * 7),
                ownerId: "TOMMAS01"
            )
        ]
    }
}
