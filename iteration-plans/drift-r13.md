# Drift — R13 Iteration Plan

## Focus
**Family Sync & Multi-Device HealthKit Sharing**

## Goals
- Add Family Members model: invite up to 5 family members via share link
- Display family sleep leaderboard: who slept best last night, weekly averages
- Sync sleep data via iCloud HealthKit sharing (CloudKit + HealthKit)
- Family member cards: avatar, last night score, trend arrow, streak count

## Technical Details
- `FamilyMember` model already exists — expand with `cloudKitRecordID`, `inviteStatus`
- Use `HKAnchoredObjectQuery` on shared HealthKit containers for family data
- iCloud container: `iCloud.com.tommaso.drift` for family sync
- `FamilyView`: grid of `FamilyMemberCard` components

## UI Updates
- **Family Tab**: Horizontal scroll of family member cards + invite button
- **FamilyMemberCard**: Avatar, name, last score, streak badge, trend indicator
- **Leaderboard Sheet**: Ranked list of family by weekly average score
- **Invite Flow**: Share sheet with deep link to install Drift

## Dependencies
- CloudKit (via HealthKit sharing)
- ShareKit / native share sheet
- HealthKit family sharing entitlement

## Milestones
- [ ] FamilyMember model expansion
- [ ] Shared HealthKit container queries
- [ ] FamilyView with member cards
- [ ] Leaderboard sheet
- [ ] Invite flow

## Notes
- Family sharing requires all members to have iOS 26+ and opt-in to HealthKit sharing
- Privacy first: show aggregate scores only, raw data stays on device
- Consider a "Sleep Challenge" gamification angle for family competition
