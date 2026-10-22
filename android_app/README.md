# CyberGuard 1.0 — Offline Cybersecurity Academy (Native Android)

A complete, offline-first native Android application built with **Kotlin**, **Jetpack Compose**, **Material 3**, **Room SQLite**, and **DataStore Preferences**.

---

## Architecture Overview

CyberGuard 1.0 is engineered with Clean Architecture:
- **Presentation Layer**: 100% Jetpack Compose with Material 3 components, supporting dynamic English (LTR) and Arabic (RTL) localization.
- **State Management**: `CyberGuardViewModel` with Kotlin Coroutines and reactive `StateFlow`.
- **Data & Persistence Layer**:
  - `Room Database` (`cyberguard_database.db`) with 13 relational tables and pre-bundled bilingual curriculum seed.
  - `DataStore Preferences` for offline user preferences (language, theme mode, daily goals).
  - Clean `CyberGuardRepository` pattern with zero direct SQL inside UI composables.
- **Domain Layer**:
  - `XpService`: Normalized quadratic leveling formula ($Level = \lfloor\sqrt{XP/100}\rfloor + 1$).
  - `AchievementService`: Automated milestone observer.
  - `SecurityLabEngine`: Local cryptographic SHA-256 and Shannon entropy calculations.

---

## 100% Offline Guarantee

CyberGuard 1.0 contains **no remote APIs, no telemetry, no cloud databases, and requests zero internet permissions** in `AndroidManifest.xml`. All 12 cybersecurity disciplines, interactive quizzes, Security Lab tools, and Threat Radar simulations run strictly locally on the Android device.

---

## Building and Running the Android APK

### Prerequisites
1. **JDK 17 or higher**
2. **Android Studio Ladybug (2024.2+)** or command-line Android SDK (API 35, Build Tools 35.0.0)

### Option A: Build via Command Line
```bash
cd android_app
./gradlew assembleDebug
```
The compiled debug APK will be generated at:
```
android_app/app/build/outputs/apk/debug/app-debug.apk
```

### Option B: Open in Android Studio
1. Launch Android Studio.
2. Select **Open** and choose the `android_app` directory.
3. Allow Gradle to synchronize dependencies.
4. Select your connected Android device or emulator.
5. Click **Run 'app'** (or press Shift+F10).

### Install onto Device via ADB
```bash
adb install -r app/build/outputs/apk/debug/app-debug.apk
```

---

## Running Unit Tests
```bash
./gradlew testDebugUnitTest
```
Tests verify:
- Level & XP mathematical progression formulas.
- Next level progress fraction calculations.
- SHA-256 cryptographic test vectors.
- Shannon entropy bit calculations.
