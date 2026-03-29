import SwiftUI

struct FriendActivityView: View {
    @StateObject private var socialService = SocialReadingService.shared
    @State private var showAddFriend = false
    @State private var friendCodeInput = ""
    @State private var selectedTab: FriendTab = .activity

    enum FriendTab: String, CaseIterable {
        case activity = "Activity"
        case lists = "Lists"
    }

    var body: some View {
        VStack(spacing: 0) {
            // Tab bar
            HStack(spacing: 0) {
                ForEach(FriendTab.allCases, id: \.self) { tab in
                    Button(action: { selectedTab = tab }) {
                        VStack(spacing: 4) {
                            Text(tab.rawValue)
                                .font(.system(size: 13, weight: selectedTab == tab ? .semibold : .regular))
                                .foregroundColor(selectedTab == tab ? Theme.warmBrown : Theme.textSecondary)

                            Rectangle()
                                .fill(selectedTab == tab ? Theme.warmBrown : Color.clear)
                                .frame(height: 2)
                        }
                    }
                    .buttonStyle(.plain)
                    .frame(maxWidth: .infinity)
                }
            }
            .padding(.horizontal, 16)
            .padding(.top, 12)

            if selectedTab == .activity {
                friendActivityContent
            } else {
                sharedListsContent
            }
        }
        .background(Theme.surface)
        .sheet(isPresented: $showAddFriend) {
            AddFriendSheet(friendCode: $friendCodeInput, onAdd: addFriend)
        }
    }

    // MARK: - Friend Activity

    private var friendActivityContent: some View {
        VStack(spacing: 0) {
            // Header with friend code and add button
            HStack {
                VStack(alignment: .leading, spacing: 2) {
                    Text("My Friend Code")
                        .font(.caption)
                        .foregroundColor(Theme.textSecondary)
                    Text(socialService.userProfile.friendCode)
                        .font(.system(.body, design: .monospaced))
                        .fontWeight(.semibold)
                        .foregroundColor(Theme.warmBrown)
                }

                Spacer()

                Button(action: { showAddFriend = true }) {
                    Label("Add Friend", systemImage: "person.badge.plus")
                        .font(.system(size: 13))
                }
                .buttonStyle(.bordered)
            }
            .padding(.horizontal, 20)
            .padding(.vertical, 12)
            .background(Theme.cream)

            Divider()

            ScrollView {
                LazyVStack(spacing: 12) {
                    if socialService.friends.isEmpty {
                        emptyFriendsView
                    } else {
                        ForEach(socialService.friends) { friend in
                            FriendCard(friend: friend)
                        }
                    }

                    if !socialService.friendRecommendations.isEmpty {
                        recommendationsSection
                    }
                }
                .padding(16)
            }
        }
    }

    private var emptyFriendsView: some View {
        VStack(spacing: 12) {
            Image(systemName: "person.2")
                .font(.system(size: 40))
                .foregroundColor(Theme.textSecondary.opacity(0.5))
            Text("No friends yet")
                .font(.headline)
                .foregroundColor(Theme.textSecondary)
            Text("Share your friend code to start following other readers")
                .font(.caption)
                .foregroundColor(Theme.textSecondary.opacity(0.8))
                .multilineTextAlignment(.center)
            Button("Add a Friend") {
                showAddFriend = true
            }
            .buttonStyle(.borderedProminent)
            .tint(Theme.warmBrown)
        }
        .padding(40)
    }

    private var recommendationsSection: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text("Friend Recommendations")
                .font(.headline)
                .foregroundColor(Theme.textPrimary)

            ForEach(socialService.friendRecommendations, id: \.book.id) { suggestion in
                HStack(spacing: 10) {
                    Circle()
                        .fill(Color(hex: suggestion.book.coverColorNS))
                        .frame(width: 36, height: 36)
                        .overlay(
                            Text(String(suggestion.book.title.prefix(1)))
                                .font(.system(size: 14, weight: .semibold))
                                .foregroundColor(.white)
                        )

                    VStack(alignment: .leading, spacing: 2) {
                        Text(suggestion.book.title)
                            .font(.system(size: 13, weight: .medium))
                            .foregroundColor(Theme.textPrimary)
                        Text(suggestion.reason)
                            .font(.caption)
                            .foregroundColor(Theme.textSecondary)
                    }

                    Spacer()
                }
                .padding(10)
                .background(Theme.cardBg)
                .cornerRadius(8)
            }
        }
    }

    // MARK: - Shared Lists

    private var sharedListsContent: some View {
        VStack(spacing: 0) {
            HStack {
                Text("Shared Lists")
                    .font(.headline)
                Spacer()
                Button(action: { }) {
                    Label("New List", systemImage: "plus")
                        .font(.system(size: 13))
                }
                .buttonStyle(.bordered)
            }
            .padding(.horizontal, 20)
            .padding(.vertical, 12)
            .background(Theme.cream)

            Divider()

            ScrollView {
                LazyVStack(spacing: 12) {
                    if socialService.sharedLists.isEmpty {
                        emptyListsView
                    } else {
                        ForEach(socialService.sharedLists) { list in
                            SharedListCard(list: list)
                        }
                    }
                }
                .padding(16)
            }
        }
    }

    private var emptyListsView: some View {
        VStack(spacing: 12) {
            Image(systemName: "list.bullet.rectangle")
                .font(.system(size: 40))
                .foregroundColor(Theme.textSecondary.opacity(0.5))
            Text("No shared lists")
                .font(.headline)
                .foregroundColor(Theme.textSecondary)
            Text("Create a reading list and share it with friends")
                .font(.caption)
                .foregroundColor(Theme.textSecondary.opacity(0.8))
                .multilineTextAlignment(.center)
        }
        .padding(40)
    }

    // MARK: - Actions

    private func addFriend() {
        guard !friendCodeInput.isEmpty else { return }
        socialService.addFriend(friendCode: friendCodeInput.uppercased())
        friendCodeInput = ""
        showAddFriend = false
    }
}

// MARK: - Friend Card

struct FriendCard: View {
    let friend: Friend

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            // Header
            HStack(spacing: 10) {
                Circle()
                    .fill(avatarColor)
                    .frame(width: 40, height: 40)
                    .overlay(
                        Text(String(friend.name.prefix(1)))
                            .font(.system(size: 16, weight: .semibold))
                            .foregroundColor(.white)
                    )

                VStack(alignment: .leading, spacing: 2) {
                    Text(friend.name)
                        .font(.system(size: 14, weight: .semibold))
                        .foregroundColor(Theme.textPrimary)
                    Text("@\(friend.friendCode)")
                        .font(.system(size: 11, design: .monospaced))
                        .foregroundColor(Theme.textSecondary)
                }

                Spacer()
            }

            Divider()

            // Currently reading
            if let currentlyReading = friend.currentlyReading {
                VStack(alignment: .leading, spacing: 4) {
                    Label("Reading", systemImage: "book")
                        .font(.caption)
                        .foregroundColor(Theme.textSecondary)
                    HStack(spacing: 8) {
                        Circle()
                            .fill(Theme.warmBrown.opacity(0.2))
                            .frame(width: 28, height: 28)
                            .overlay(
                                Image(systemName: "book.fill")
                                    .font(.system(size: 12))
                                    .foregroundColor(Theme.warmBrown)
                            )
                        VStack(alignment: .leading, spacing: 1) {
                            Text(currentlyReading.title)
                                .font(.system(size: 13, weight: .medium))
                                .foregroundColor(Theme.textPrimary)
                            Text(currentlyReading.author)
                                .font(.caption)
                                .foregroundColor(Theme.textSecondary)
                        }
                    }
                }
            } else {
                Text("Not currently reading")
                    .font(.caption)
                    .foregroundColor(Theme.textSecondary)
            }

            // Recently finished
            if !friend.recentlyFinished.isEmpty {
                VStack(alignment: .leading, spacing: 4) {
                    Label("Recently Finished", systemImage: "checkmark.circle")
                        .font(.caption)
                        .foregroundColor(Theme.textSecondary)
                    ForEach(friend.recentlyFinished.prefix(3)) { book in
                        HStack(spacing: 8) {
                            Circle()
                                .fill(Theme.forestGreen.opacity(0.2))
                                .frame(width: 24, height: 24)
                                .overlay(
                                    Image(systemName: "checkmark")
                                        .font(.system(size: 10, weight: .bold))
                                        .foregroundColor(Theme.forestGreen)
                                )
                            Text(book.title)
                                .font(.system(size: 12))
                                .foregroundColor(Theme.textPrimary)
                                .lineLimit(1)
                        }
                    }
                }
            }
        }
        .padding(14)
        .background(Theme.cardBg)
        .cornerRadius(10)
        .shadow(color: .black.opacity(0.04), radius: 4, x: 0, y: 2)
    }

    private var avatarColor: Color {
        let colors: [Color] = [Theme.warmBrown, Theme.forestGreen, Theme.burgundy, Theme.accent]
        let idx = abs(friend.name.hashValue) % colors.count
        return colors[idx]
    }
}

// MARK: - Shared List Card

struct SharedListCard: View {
    let list: SharedList
    @StateObject private var socialService = SocialReadingService.shared

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            HStack {
                VStack(alignment: .leading, spacing: 2) {
                    Text(list.name)
                        .font(.system(size: 14, weight: .semibold))
                        .foregroundColor(Theme.textPrimary)
                    Text("\(list.books.count) books")
                        .font(.caption)
                        .foregroundColor(Theme.textSecondary)
                }

                Spacer()

                // Share code badge
                Text(list.shareCode)
                    .font(.system(size: 11, design: .monospaced))
                    .fontWeight(.semibold)
                    .foregroundColor(Theme.warmBrown)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(Theme.warmBrown.opacity(0.1))
                    .cornerRadius(4)
            }

            Divider()

            ForEach(list.books.prefix(3)) { book in
                HStack(spacing: 8) {
                    Circle()
                        .fill(Theme.cream)
                        .frame(width: 24, height: 24)
                        .overlay(
                            Image(systemName: "book")
                                .font(.system(size: 10))
                                .foregroundColor(Theme.textSecondary)
                        )
                    Text(book.title)
                        .font(.system(size: 12))
                        .foregroundColor(Theme.textPrimary)
                        .lineLimit(1)
                }
            }

            if list.books.count > 3 {
                Text("+\(list.books.count - 3) more")
                    .font(.caption)
                    .foregroundColor(Theme.textSecondary)
            }

            HStack {
                Button(action: copyShareLink) {
                    Label("Copy Link", systemImage: "link")
                        .font(.system(size: 11))
                }
                .buttonStyle(.plain)
                .foregroundColor(Theme.warmBrown)

                Spacer()

                Button(action: {}) {
                    Text("View")
                        .font(.system(size: 11, weight: .medium))
                }
                .buttonStyle(.bordered)
                .controlSize(.small)
            }
        }
        .padding(14)
        .background(Theme.cardBg)
        .cornerRadius(10)
        .shadow(color: .black.opacity(0.04), radius: 4, x: 0, y: 2)
    }

    private func copyShareLink() {
        let link = "readr://list/\(list.shareCode)"
        NSPasteboard.general.clearContents()
        NSPasteboard.general.setString(link, forType: .string)
    }
}

// MARK: - Add Friend Sheet

struct AddFriendSheet: View {
    @Binding var friendCode: String
    let onAdd: () -> Void
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        VStack(spacing: 20) {
            Text("Add a Friend")
                .font(.headline)

            VStack(alignment: .leading, spacing: 8) {
                Text("Enter their friend code")
                    .font(.caption)
                    .foregroundColor(Theme.textSecondary)
                TextField("Friend Code", text: $friendCode)
                    .textFieldStyle(.roundedBorder)
                    .font(.system(.body, design: .monospaced))
                    .onChange(of: friendCode) { _, newValue in
                        friendCode = newValue.uppercased()
                    }
            }

            HStack {
                Button("Cancel") { dismiss() }
                    .buttonStyle(.bordered)
                Button("Add") { onAdd() }
                    .buttonStyle(.borderedProminent)
                    .tint(Theme.warmBrown)
                    .disabled(friendCode.isEmpty)
            }
        }
        .padding(24)
        .frame(width: 300)
    }
}
