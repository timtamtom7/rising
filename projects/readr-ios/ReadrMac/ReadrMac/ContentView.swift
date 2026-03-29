import SwiftUI

struct ContentView: View {
    @StateObject private var store = LibraryStore()
    @State private var selectedTab: AppTab = .readingList

    enum AppTab: String, CaseIterable {
        case readingList = "To Read"
        case currentlyReading = "Reading"
        case finished = "Finished"
        case friends = "Friends"
        case bookClubs = "Clubs"
        case addBook = "Add Book"
    }

    var body: some View {
        VStack(spacing: 0) {
            TabBar(selectedTab: $selectedTab)

            TabView(selection: $selectedTab) {
                ReadingListView()
                    .environmentObject(store)
                    .tag(AppTab.readingList)

                CurrentlyReadingView()
                    .environmentObject(store)
                    .tag(AppTab.currentlyReading)

                FinishedBooksView()
                    .environmentObject(store)
                    .tag(AppTab.finished)

                FriendActivityView()
                    .tag(AppTab.friends)

                BookClubView()
                    .tag(AppTab.bookClubs)

                AddBookView()
                    .environmentObject(store)
                    .tag(AppTab.addBook)
            }
        }
        .frame(minWidth: 600, minHeight: 400)
        .background(Theme.surface)
    }
}

struct TabBar: View {
    @Binding var selectedTab: ContentView.AppTab

    var body: some View {
        HStack(spacing: 0) {
            ForEach(ContentView.AppTab.allCases, id: \.self) { tab in
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
        .background(Theme.cream)
    }
}
