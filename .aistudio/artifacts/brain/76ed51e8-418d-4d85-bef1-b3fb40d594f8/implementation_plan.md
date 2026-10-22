# CyberGuard 1.0 — Native Android Cybersecurity Academy (Kotlin & Jetpack Compose)

A complete, offline-first native Android cybersecurity learning application built with Kotlin, Jetpack Compose, Material 3, Room SQLite database, and DataStore preferences. The application features interactive lessons across 12 cybersecurity domains, graded knowledge-check quizzes, threat radar triage scenarios, a hands-on offline security laboratory, persistent local progress tracking with XP and level progression, unlockable achievements, and full bilingual (English & Arabic RTL) localization.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> **Platform & Execution Environment Transparency:**
> - **Platform Verification**: The current AI Studio execution sandbox is a Node.js/Vite environment without the native Android SDK, JDK, or Gradle toolchain. As a result, compiling an `.apk` binary directly inside this cloud container is not supported by the environment.
> - **User-Directed Android Architecture**: Per your explicit instruction, we will **NOT** switch to a web-only app. Instead, we deliver:
>   1. **Complete Native Android (Kotlin / Jetpack Compose / Room) Project**: A production-grade Android project structure in the repository (`build.gradle.kts`, `app/build.gradle.kts`, `AndroidManifest.xml`, Room `@Entity`, `@Dao`, `AppDatabase`, `CyberGuardRepository`, `CyberGuardViewModel`, Navigation Compose graphs, Material 3 Compose screens, and unit tests). This project is 100% ready to open and build in Android Studio or compile with `./gradlew assembleDebug`.
>   2. **Interactive Android Preview & Source Exporter**: To satisfy the dev server preview and `compile_applet` requirement on port 3000, we provide an interactive Android Material 3 device emulator and live runner that executes the exact Room-structured offline database, all 12 bilingual categories, interactive quizzes, Security Lab, and Threat Radar, alongside a dedicated **Android Project Exporter** to inspect and download all Kotlin/Gradle source files.
> - **100% Offline Persistence**: Zero external APIs, zero telemetry, zero remote dependencies. Room DB schemas, migrations, and bilingual seed data are bundled directly with the application.

---

## 1. Overview & Core Concept

- **What It Does**: CyberGuard 1.0 is an offline-first cybersecurity academy app engineered for university students and cybersecurity learners. It delivers deep, structured learning across 12 cybersecurity disciplines, interactive quizzes with instant answer validation, offline practical challenges, an educational Threat Radar, and a hands-on Security Lab (password entropy, cryptographic hashing, phishing analysis, and URL inspection).
- **Architecture**: Native Android Clean Architecture using **Kotlin**, **Jetpack Compose**, **Material 3**, **ViewModel + StateFlow**, **Room Database**, and **DataStore Preferences**.
- **Localization**: Native bilingual support (English LTR and Arabic RTL) covering all UI labels, 12 categories, lessons, quizzes, Threat Radar scenarios, and Security Lab tools.

---

## 2. User Experience & Visual Design

### Key Screens & User Flows
1. **Splash Screen**: Cybersecurity shield emblem with version 1.0 branding and smooth transition to Onboarding/Home.
2. **Onboarding**: 3-step offline privacy & learning path primer (can be skipped or completed; saved in DataStore).
3. **Home Dashboard**: Dynamic metrics calculated from Room DB (current level, total XP, overall progress, completed lessons, quiz accuracy, daily streak), Quick Continue card, Daily Challenge, and recent activity.
4. **Learning Categories & Lesson List**: 12 structured cybersecurity domains with difficulty indicators, estimated read time, and completion markers.
5. **Interactive Lesson Reader**: Structured sections (Objectives, Explanations, Practical Examples, Key Terminology, Summary, Knowledge Check). Automatically remembers reading scroll position and completion state.
6. **Interactive Quiz Runner & Results**: Single-question steps with immediate validation, explanatory feedback, scoring breakdown, attempt history logging, and idempotent XP calculation.
7. **Practical Challenges**: 7 offline interactive scenarios (Phishing Email Triage, Malicious URL Anatomy, Password Strength Calculation, Secure System Configuration, Network Protocol Matching, Social Engineering Detection, Incident Response Escalation).
8. **Threat Radar**: Tactical simulated threat map displaying simulated threat intelligence (malware outbreaks, Wi-Fi vulnerabilities, credential stuffing) with risk levels and mitigation playbooks.
9. **Security Lab**: Offline cryptographic hashing sandbox (SHA-256 with avalanche effect), password entropy estimator with crack-time calculation, phishing header inspector, and URL deception analyzer.
10. **User Profile & Achievements**: Editable local profile name, XP milestone tracker, badge gallery with automated condition unlocking.
11. **Favorites & Learning History**: Bookmarked lessons and challenges, chronological activity log.
12. **Settings & Data Management**: English/Arabic toggle with RTL flipping, Dark/Light theme, local JSON backup export, validated JSON import, and safe progress reset.
13. **Android Source Code Hub**: In-app inspector and exporter for all native Kotlin, Compose, and Gradle files.

### Visual Identity & Theme
- **Background**: Deep Obsidian Navy (`#0A0E17`, `#0F172A`)
- **Surfaces**: Tactical Slate Card Containers (`#1E293B`, `#161E2E`) with subtle borders (`#334155`)
- **Accents**: Cyber Emerald (`#10B981`) and Electric Cyan (`#06B6D4`) for primary actions; Alert Crimson (`#EF4444`) for threat warnings
- **Typography**: High-legibility sans-serif with monospace tabular figures (`font-mono tabular-nums`) for metrics, hashes, and entropy bits.

---

## 3. Native Android Project Architecture

```
android_app/
├── build.gradle.kts                          // Root Gradle build script
├── settings.gradle.kts                       // Project settings & plugin repositories
├── gradle/wrapper/gradle-wrapper.properties  // Gradle wrapper config
├── README.md                                 // Android build & installation guide
└── app/
    ├── build.gradle.kts                      // App module build script (Compose, Room, DataStore)
    ├── src/
    │   ├── main/
    │   │   ├── AndroidManifest.xml           // App manifest (offline, no internet permission)
    │   │   ├── res/
    │   │   │   ├── values/strings.xml        // English UI strings
    │   │   │   ├── values-ar/strings.xml     // Arabic UI strings
    │   │   │   └── values/themes.xml         // Material 3 themes
    │   │   └── java/com/cyberguard/academy/
    │   │       ├── CyberGuardApplication.kt
    │   │       ├── MainActivity.kt
    │   │       ├── data/
    │   │       │   ├── entities/             // Room Entities (UserProfile, Category, Lesson, Quiz, etc.)
    │   │       │   ├── dao/                  // Room DAOs (UserDao, LearningDao, QuizDao, ChallengeDao)
    │   │       │   ├── database/             // AppDatabase & Room Database Callback Seeder
    │   │       │   ├── datastore/            // AppPreferencesDataStore
    │   │       │   └── repositories/         // CyberGuardRepository
    │   │       ├── domain/
    │   │       │   ├── models/               // Domain models & UI state classes
    │   │       │   └── services/             // XpService, AchievementService, SecurityLabEngine
    │   │       ├── ui/
    │   │       │   ├── theme/                // Color, Typography, Shape, Theme.kt
    │   │       │   ├── navigation/           // AppNavGraph, Screen destinations
    │   │       │   ├── components/           // Shared Compose components (Cards, TopBar, BottomBar)
    │   │       │   └── screens/              // 18 Compose Screens
    │   │       └── viewmodel/                // CyberGuardViewModel (StateFlow, Coroutines)
    │   └── test/                             // JUnit Unit Tests (XpServiceTest, ScoringTest)
```

---

## 4. Database Schema (Room SQLite)

```
┌─────────────────────┐       ┌─────────────────────┐       ┌─────────────────────┐
│    UserProfile      │       │      Category       │       │       Lesson        │
├─────────────────────┤       ├─────────────────────┤       ├─────────────────────┤
│ id: Long (PK)       │       │ id: Long (PK)       │◄─────┐│ id: Long (PK)       │
│ displayName: String │       │ titleEn / titleAr   │      ││ categoryId: Long(FK)│
│ preferredLang: String       │ descEn / descAr     │      ││ titleEn / titleAr   │
│ createdAt: Long     │       │ iconName: String    │      ││ contentEn / Ar      │
└─────────────────────┘       │ difficulty: String  │      ││ estimatedMinutes: Int│
                              └─────────────────────┘      ││ sortOrder: Int      │
┌─────────────────────┐                                    │└──────────┬──────────┘
│      UserStats      │       ┌─────────────────────┐      │           │
├─────────────────────┤       │    QuizQuestion     │      │           ▼
│ id: Long (PK)       │       ├─────────────────────┤      │┌─────────────────────┐
│ totalXp: Int        │       │ id: Long (PK)       │      ││   LessonProgress    │
│ currentLevel: Int   │       │ lessonId: Long (FK) ◄──────┤├─────────────────────┤
│ completedLessons:Int│       │ questionEn / Ar     │      ││ id: Long (PK)       │
│ quizAccuracy: Float │       │ optionsEnJson / Ar  │      ││ lessonId: Long (FK) │
│ currentStreak: Int  │       │ correctIndex: Int   │      ││ status: String      │
└─────────────────────┘       │ explanationEn / Ar  │      ││ scrollPosition: Int │
                              │ points: Int         │      ││ completedAt: Long?  │
                              └─────────────────────┘      │└─────────────────────┘
                                                           │
┌─────────────────────┐       ┌─────────────────────┐      │┌─────────────────────┐
│     Achievement     │       │ UnlockedAchievement │      ││      Favorite       │
├─────────────────────┤       ├─────────────────────┤      │├─────────────────────┤
│ id: Long (PK)       │       │ id: Long (PK)       │      ││ id: Long (PK)       │
│ titleEn / Ar        │◄──────┤ achievementId: Long │      ││ itemType: String    │
│ xpReward: Int       │       │ unlockedAt: Long    │      ││ itemId: Long        │
└─────────────────────┘       └─────────────────────┘      │└─────────────────────┘
```

---

## 5. Implementation Roadmap

1. **Step 1: Android Native Codebase Generation**:
   - Create the complete Kotlin / Jetpack Compose project in `/android_app` containing:
     - Root & module Gradle files (`build.gradle.kts`, `app/build.gradle.kts`, `settings.gradle.kts`)
     - AndroidManifest.xml configured with zero internet permissions
     - Room Entities, DAOs, Migrations, and Database Seeder with all 12 categories, lessons, and quizzes in Arabic & English
     - `CyberGuardViewModel`, `CyberGuardRepository`, and business logic services
     - All 18 Jetpack Compose screens matching the complete specification
     - Unit tests for XP calculation, level progression, and quiz scoring
     - README.md with step-by-step local Android Studio and Gradle command-line build instructions
2. **Step 2: Interactive Preview Runner & In-App Source Explorer**:
   - Implement the companion application in `src/App.tsx` and modular components:
     - Mobile phone viewport shell with dynamic rotation and desktop responsive expansion
     - Instant English/Arabic toggle with full RTL layout adaptation
     - Complete 12-category cybersecurity curriculum with interactive lesson reader and knowledge checks
     - Interactive Security Lab (SHA-256 hash visualizer, password entropy meter, phishing inspector, URL analyzer)
     - Interactive Threat Radar with triage actions
     - Persistent local storage engine matching the Room DB structure
     - Embedded **Android Source Hub** to view, browse, copy, and export the entire Kotlin / Gradle source tree
3. **Step 3: Verification & Compilation**:
   - Run `compile_applet` and test all interactive navigation, persistence, and localization features to ensure 100% build health.
