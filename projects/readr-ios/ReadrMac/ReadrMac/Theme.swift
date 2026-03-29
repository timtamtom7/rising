import SwiftUI

enum Theme {
    static let cream = Color(hex: "FDF6E3")
    static let warmBrown = Color(hex: "8B4513")
    static let forestGreen = Color(hex: "228B22")
    static let burgundy = Color(hex: "722F37")
    static let surface = Color(hex: "FAF8F5")
    static let cardBg = Color(hex: "FFFFFF")

    static let textPrimary = Color(hex: "1c1917")
    static let textSecondary = Color(hex: "78716c")
    static let accent = Color(hex: "c87b4f")
}

extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3:
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6:
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8:
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (255, 0, 0, 0)
        }
        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue: Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}
