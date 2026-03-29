import SwiftUI

struct BookClubView: View {
    @StateObject private var socialService = SocialReadingService.shared
    @State private var showCreateClub = false
    @State private var newClubName = ""
    @State private var newClubDescription = ""
    @State private var selectedClubId: UUID?

    var body: some View {
        VStack(spacing: 0) {
            // Header
            HStack {
                Text("Book Clubs")
                    .font(.headline)
                Spacer()
                Button(action: { showCreateClub = true }) {
                    Label("New Club", systemImage: "plus")
                        .font(.system(size: 13))
                }
                .buttonStyle(.bordered)
            }
            .padding(.horizontal, 20)
            .padding(.vertical, 12)
            .background(Theme.cream)

            Divider()

            if socialService.bookClubs.isEmpty {
                emptyState
            } else {
                clubListOrDetail
            }
        }
        .sheet(isPresented: $showCreateClub) {
            CreateClubSheet(
                name: $newClubName,
                description: $newClubDescription,
                onCreate: createClub
            )
        }
    }

    // MARK: - Empty State

    private var emptyState: some View {
        VStack(spacing: 16) {
            Spacer()
            Image(systemName: "books.vertical")
                .font(.system(size: 48))
                .foregroundColor(Theme.textSecondary.opacity(0.5))
            Text("No Book Clubs Yet")
                .font(.headline)
                .foregroundColor(Theme.textSecondary)
            Text("Create a book club to discuss books with friends")
                .font(.caption)
                .foregroundColor(Theme.textSecondary.opacity(0.8))
                .multilineTextAlignment(.center)
            Button("Create a Club") {
                showCreateClub = true
            }
            .buttonStyle(.borderedProminent)
            .tint(Theme.warmBrown)
            Spacer()
        }
        .padding(40)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }

    // MARK: - Club List / Detail

    @ViewBuilder
    private var clubListOrDetail: some View {
        if let clubId = selectedClubId,
           let club = socialService.bookClubs.first(where: { $0.id == clubId }) {
            ClubDetailView(
                club: club,
                onBack: { selectedClubId = nil },
                onPostMessage: { text, discId in
                    socialService.postMessage(text, toDiscussion: discId, inClub: clubId)
                },
                onSetCurrentBook: { book in
                    socialService.setCurrentBook(book, forClub: clubId)
                },
                onSetMeeting: { date in
                    socialService.setNextMeeting(date, forClub: clubId)
                }
            )
        } else {
            clubList
        }
    }

    private var clubList: some View {
        ScrollView {
            LazyVStack(spacing: 12) {
                ForEach(socialService.bookClubs) { club in
                    ClubCard(club: club, onSelect: { selectedClubId = club.id })
                }
            }
            .padding(16)
        }
    }

    // MARK: - Actions

    private func createClub() {
        guard !newClubName.isEmpty else { return }
        let club = socialService.createBookClub(name: newClubName, description: newClubDescription)
        newClubName = ""
        newClubDescription = ""
        showCreateClub = false
        selectedClubId = club.id
    }
}

// MARK: - Club Card

struct ClubCard: View {
    let club: BookClub
    let onSelect: () -> Void

    var body: some View {
        Button(action: onSelect) {
            VStack(alignment: .leading, spacing: 10) {
                HStack {
                    VStack(alignment: .leading, spacing: 2) {
                        Text(club.name)
                            .font(.system(size: 15, weight: .semibold))
                            .foregroundColor(Theme.textPrimary)
                        Text(club.clubDescription.isEmpty ? "No description" : club.clubDescription)
                            .font(.caption)
                            .foregroundColor(Theme.textSecondary)
                            .lineLimit(1)
                    }

                    Spacer()

                    VStack(alignment: .trailing, spacing: 2) {
                        Text("\(club.members.count)")
                            .font(.system(size: 16, weight: .bold))
                            .foregroundColor(Theme.warmBrown)
                        Text("members")
                            .font(.system(size: 10))
                            .foregroundColor(Theme.textSecondary)
                    }
                }

                Divider()

                if let currentBook = club.currentBook {
                    HStack(spacing: 8) {
                        Circle()
                            .fill(Theme.warmBrown.opacity(0.15))
                            .frame(width: 32, height: 32)
                            .overlay(
                                Image(systemName: "book.fill")
                                    .font(.system(size: 12))
                                    .foregroundColor(Theme.warmBrown)
                            )
                        VStack(alignment: .leading, spacing: 1) {
                            Text("Currently Reading")
                                .font(.system(size: 10, weight: .medium))
                                .foregroundColor(Theme.textSecondary)
                            Text(currentBook.title)
                                .font(.system(size: 12, weight: .medium))
                                .foregroundColor(Theme.textPrimary)
                                .lineLimit(1)
                        }
                        Spacer()
                    }
                } else {
                    Text("No book set yet")
                        .font(.caption)
                        .foregroundColor(Theme.textSecondary)
                        .italic()
                }

                if let meeting = club.nextMeeting {
                    HStack(spacing: 6) {
                        Image(systemName: "calendar")
                            .font(.system(size: 11))
                            .foregroundColor(Theme.accent)
                        Text("Next meeting: \(meeting.formatted(date: .abbreviated, time: .omitted))")
                            .font(.system(size: 11))
                            .foregroundColor(Theme.accent)
                        Spacer()
                    }
                }
            }
            .padding(14)
            .background(Theme.cardBg)
            .cornerRadius(10)
            .shadow(color: .black.opacity(0.04), radius: 4, x: 0, y: 2)
        }
        .buttonStyle(.plain)
    }
}

// MARK: - Club Detail View

struct ClubDetailView: View {
    let club: BookClub
    let onBack: () -> Void
    let onPostMessage: (String, UUID) -> Void
    let onSetCurrentBook: (BookRef) -> Void
    let onSetMeeting: (Date) -> Void

    @State private var newMessage = ""
    @State private var showSetBook = false
    @State private var showSetMeeting = false
    @State private var selectedDiscussionId: UUID?

    var body: some View {
        VStack(spacing: 0) {
            // Back nav
            HStack {
                Button(action: onBack) {
                    HStack(spacing: 4) {
                        Image(systemName: "chevron.left")
                        Text("Back")
                    }
                    .font(.system(size: 13))
                }
                .buttonStyle(.plain)
                .foregroundColor(Theme.warmBrown)

                Spacer()

                Text(club.name)
                    .font(.headline)

                Spacer()

                Menu {
                    Button(action: { showSetBook = true }) {
                        Label("Set Current Book", systemImage: "book")
                    }
                    Button(action: { showSetMeeting = true }) {
                        Label("Schedule Meeting", systemImage: "calendar")
                    }
                } label: {
                    Image(systemName: "ellipsis.circle")
                        .font(.system(size: 16))
                        .foregroundColor(Theme.textSecondary)
                }
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 10)
            .background(Theme.cream)

            // Current book banner
            if let book = club.currentBook {
                currentBookBanner(book)
            } else {
                noBookBanner
            }

            Divider()

            // Discussions
            ScrollView {
                LazyVStack(spacing: 0) {
                    ForEach(club.discussions) { discussion in
                        DiscussionThread(
                            discussion: discussion,
                            onPostMessage: { text in
                                onPostMessage(text, discussion.id)
                            }
                        )
                    }

                    if club.discussions.isEmpty {
                        emptyDiscussion
                    }
                }
                .padding(16)
            }
        }
        .sheet(isPresented: $showSetBook) {
            SetBookSheet(onSet: onSetCurrentBook)
        }
        .sheet(isPresented: $showSetMeeting) {
            SetMeetingSheet(onSet: onSetMeeting)
        }
    }

    private func currentBookBanner(_ book: BookRef) -> some View {
        HStack(spacing: 12) {
            Circle()
                .fill(Theme.warmBrown.opacity(0.15))
                .frame(width: 44, height: 44)
                .overlay(
                    Image(systemName: "book.fill")
                        .font(.system(size: 18))
                        .foregroundColor(Theme.warmBrown)
                )

            VStack(alignment: .leading, spacing: 2) {
                Text("Our club is reading")
                    .font(.caption)
                    .foregroundColor(Theme.textSecondary)
                Text(book.title)
                    .font(.system(size: 14, weight: .semibold))
                    .foregroundColor(Theme.textPrimary)
                Text("by \(book.author)")
                    .font(.caption)
                    .foregroundColor(Theme.textSecondary)
            }

            Spacer()

            if let meeting = club.nextMeeting {
                VStack(alignment: .trailing, spacing: 2) {
                    Text("Meeting")
                        .font(.caption2)
                        .foregroundColor(Theme.textSecondary)
                    Text(meeting.formatted(date: .abbreviated, time: .shortened))
                        .font(.system(size: 11, weight: .medium))
                        .foregroundColor(Theme.warmBrown)
                }
            }
        }
        .padding(12)
        .background(Theme.warmBrown.opacity(0.06))
    }

    private var noBookBanner: some View {
        HStack {
            Image(systemName: "book.closed")
                .foregroundColor(Theme.textSecondary)
            Text("No book set yet — tap ••• to choose one")
                .font(.caption)
                .foregroundColor(Theme.textSecondary)
        }
        .padding(12)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(Theme.cream)
    }

    private var emptyDiscussion: some View {
        VStack(spacing: 8) {
            Image(systemName: "bubble.left.and.bubble.right")
                .font(.system(size: 32))
                .foregroundColor(Theme.textSecondary.opacity(0.5))
            Text("No discussions yet")
                .font(.subheadline)
                .foregroundColor(Theme.textSecondary)
            Text("Start talking about the book!")
                .font(.caption)
                .foregroundColor(Theme.textSecondary.opacity(0.8))
        }
        .padding(40)
    }
}

// MARK: - Discussion Thread

struct DiscussionThread: View {
    let discussion: Discussion
    let onPostMessage: (String) -> Void

    @State private var newMessage = ""

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Discussion")
                .font(.system(size: 12, weight: .semibold))
                .foregroundColor(Theme.textSecondary)
                .textCase(.uppercase)

            if discussion.messages.isEmpty {
                Text("No messages yet — be the first!")
                    .font(.caption)
                    .foregroundColor(Theme.textSecondary)
                    .italic()
            } else {
                ForEach(discussion.messages) { message in
                    MessageBubble(message: message)
                }
            }

            // Message input
            HStack(spacing: 8) {
                TextField("Say something...", text: $newMessage)
                    .textFieldStyle(.roundedBorder)
                    .font(.system(size: 13))

                Button(action: postMessage) {
                    Image(systemName: "arrow.up.circle.fill")
                        .font(.system(size: 22))
                        .foregroundColor(newMessage.isEmpty ? Theme.textSecondary : Theme.warmBrown)
                }
                .disabled(newMessage.isEmpty)
            }
        }
        .padding(14)
        .background(Theme.cardBg)
        .cornerRadius(10)
        .shadow(color: .black.opacity(0.04), radius: 4, x: 0, y: 2)
    }

    private func postMessage() {
        guard !newMessage.isEmpty else { return }
        onPostMessage(newMessage)
        newMessage = ""
    }
}

// MARK: - Message Bubble

struct MessageBubble: View {
    let message: Message

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            HStack(spacing: 6) {
                Text(message.authorName)
                    .font(.system(size: 12, weight: .semibold))
                    .foregroundColor(Theme.warmBrown)
                Text(message.timestamp.formatted(date: .omitted, time: .shortened))
                    .font(.system(size: 10))
                    .foregroundColor(Theme.textSecondary)
            }
            Text(message.text)
                .font(.system(size: 13))
                .foregroundColor(Theme.textPrimary)
        }
        .padding(10)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(Theme.cream)
        .cornerRadius(8)
    }
}

// MARK: - Create Club Sheet

struct CreateClubSheet: View {
    @Binding var name: String
    @Binding var description: String
    let onCreate: () -> Void
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        VStack(spacing: 16) {
            Text("Create a Book Club")
                .font(.headline)

            VStack(alignment: .leading, spacing: 8) {
                Text("Club Name")
                    .font(.caption)
                    .foregroundColor(Theme.textSecondary)
                TextField("e.g. Sci-Fi Readers", text: $name)
                    .textFieldStyle(.roundedBorder)
            }

            VStack(alignment: .leading, spacing: 8) {
                Text("Description (optional)")
                    .font(.caption)
                    .foregroundColor(Theme.textSecondary)
                TextField("What will you read about?", text: $description)
                    .textFieldStyle(.roundedBorder)
            }

            HStack {
                Button("Cancel") { dismiss() }
                    .buttonStyle(.bordered)
                Button("Create") { onCreate() }
                    .buttonStyle(.borderedProminent)
                    .tint(Theme.warmBrown)
                    .disabled(name.isEmpty)
            }
        }
        .padding(24)
        .frame(width: 340)
    }
}

// MARK: - Set Book Sheet

struct SetBookSheet: View {
    let onSet: (BookRef) -> Void
    @Environment(\.dismiss) private var dismiss
    @StateObject private var store = LibraryStore()
    @State private var searchText = ""

    private var filteredBooks: [Book] {
        if searchText.isEmpty { return store.books }
        return store.books.filter {
            $0.title.localizedCaseInsensitiveContains(searchText) ||
            $0.author.localizedCaseInsensitiveContains(searchText)
        }
    }

    var body: some View {
        VStack(spacing: 16) {
            Text("Set Current Book")
                .font(.headline)

            TextField("Search books...", text: $searchText)
                .textFieldStyle(.roundedBorder)

            ScrollView {
                LazyVStack(spacing: 8) {
                    ForEach(filteredBooks) { book in
                        Button(action: {
                            onSet(BookRef(from: book))
                            dismiss()
                        }) {
                            HStack(spacing: 10) {
                                Circle()
                                    .fill(Color(hex: book.coverColorNS))
                                    .frame(width: 28, height: 28)
                                    .overlay(
                                        Text(String(book.title.prefix(1)))
                                            .font(.system(size: 11, weight: .bold))
                                            .foregroundColor(.white)
                                    )
                                VStack(alignment: .leading, spacing: 1) {
                                    Text(book.title)
                                        .font(.system(size: 13, weight: .medium))
                                        .foregroundColor(Theme.textPrimary)
                                    Text(book.author)
                                        .font(.caption)
                                        .foregroundColor(Theme.textSecondary)
                                }
                                Spacer()
                            }
                            .padding(8)
                            .background(Theme.cream)
                            .cornerRadius(6)
                        }
                        .buttonStyle(.plain)
                    }
                }
            }
            .frame(maxHeight: 300)

            Button("Cancel") { dismiss() }
                .buttonStyle(.bordered)
        }
        .padding(24)
        .frame(width: 360)
    }
}

// MARK: - Set Meeting Sheet

struct SetMeetingSheet: View {
    let onSet: (Date) -> Void
    @Environment(\.dismiss) private var dismiss
    @State private var meetingDate = Date()

    var body: some View {
        VStack(spacing: 16) {
            Text("Schedule Meeting")
                .font(.headline)

            DatePicker(
                "Next Meeting",
                selection: $meetingDate,
                displayedComponents: [.date, .hourAndMinute]
            )
            .datePickerStyle(.graphical)

            HStack {
                Button("Cancel") { dismiss() }
                    .buttonStyle(.bordered)
                Button("Save") {
                    onSet(meetingDate)
                    dismiss()
                }
                .buttonStyle(.borderedProminent)
                .tint(Theme.warmBrown)
            }
        }
        .padding(24)
        .frame(width: 300)
    }
}
