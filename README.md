# Referly

An app to match job seekers to job providers — a Hinge-style swipe, match, and chat
experience, but for recruiters, senior employees who can refer candidates, and people
looking for their next role.

This is a **frontend-only prototype**: every profile, message, and stat is placeholder
data. There is no backend, no real accounts, and nothing persists between app reloads
(aside from in-session state such as likes sent, matches made, and messages typed).

## Stack

- [Expo](https://expo.dev) SDK 54 (React Native 0.81)
- [expo-router](https://docs.expo.dev/router/introduction/) for file-based navigation
- TypeScript, `react-native-reanimated` + `react-native-gesture-handler` for the swipe deck
- `expo-image` for photos, `expo-blur` for the paywall blur effect

## Features

- **Onboarding**: role selection (job seeker vs. recruiter/referrer), profile basics,
  a LinkedIn-import simulation, prompt selection, and preferences
- **Discover**: a swipeable deck of profiles with match-score, "hiring for" criteria,
  and a mutual-match simulation that can trigger a real in-session match + chat thread
- **Standouts**: curated/featured profiles in their own tab
- **Likes You / Interest Sent**: who's interested in you, and who you've shown interest in
- **Matches**: a chat list with real (session-only) messaging, including a first-message
  prompt for brand-new matches
- **Activity**: a notifications feed (matches, interest, profile views, tips)
- **Profile**: your own profile, job/hiring preferences, account settings, and a
  Referly+ paywall screen

Both job seekers and recruiters/referrers are supported as a single toggle-able role —
switching roles changes what Discover, Likes, Matches, and Activity show.

## Getting started

```bash
npm install
npx expo start
```

In the output, you'll find options to open the app in a:

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a sandbox for trying out the app on a physical device

The app code lives under `src/app` (file-based routes), `src/components`, `src/data`
(placeholder data), and `src/state` (session-only app state via React Context).
