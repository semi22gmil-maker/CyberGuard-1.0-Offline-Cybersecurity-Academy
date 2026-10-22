import JSZip from 'jszip';

export class ZipExportService {
  static async generateAndroidProjectZip(): Promise<Blob> {
    const zip = new JSZip();

    // 1. Root files
    zip.file('settings.gradle.kts', `pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}
rootProject.name = "CyberGuard"
include(":app")
`);

    zip.file('build.gradle.kts', `plugins {
    id("com.android.application") version "8.7.3" apply false
    id("org.jetbrains.kotlin.android") version "2.0.21" apply false
    id("org.jetbrains.kotlin.plugin.compose") version "2.0.21" apply false
    id("com.google.devtools.ksp") version "2.0.21-1.0.28" apply false
}
`);

    zip.file('README.md', `# CyberGuard 1.0 — Native Android Cybersecurity Academy

## Building with Android Studio
1. Unzip this package.
2. Open Android Studio -> Open project -> Select this directory.
3. Wait for Gradle sync to complete.
4. Press Run (Shift + F10) or build APK via:
   \`./gradlew assembleDebug\`

100% Offline with Room SQLite, Jetpack Compose, Material 3, and bilingual English & Arabic support.
`);

    // 2. App module files
    const appFolder = zip.folder('app')!;
    appFolder.file('build.gradle.kts', `plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
    id("org.jetbrains.kotlin.plugin.compose")
    id("com.google.devtools.ksp")
}

android {
    namespace = "com.cyberguard.academy"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.cyberguard.academy"
        minSdk = 26
        targetSdk = 35
        versionCode = 1
        versionName = "1.0.0"
        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = "17"
    }
    buildFeatures {
        compose = true
    }
}

dependencies {
    implementation("androidx.core:core-ktx:1.15.0")
    implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.8.7")
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.8.7")
    implementation("androidx.activity:activity-compose:1.9.3")

    val composeBom = platform("androidx.compose:compose-bom:2024.12.01")
    implementation(composeBom)
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.material3:material3")
    implementation("androidx.compose.material:material-icons-extended")
    implementation("androidx.navigation:navigation-compose:2.8.5")

    val roomVersion = "2.6.1"
    implementation("androidx.room:room-runtime:$roomVersion")
    implementation("androidx.room:room-ktx:$roomVersion")
    ksp("androidx.room:room-compiler:$roomVersion")

    implementation("androidx.datastore:datastore-preferences:1.1.1")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.9.0")

    testImplementation("junit:junit:4.13.2")
}
`);

    const mainFolder = appFolder.folder('src/main')!;
    mainFolder.file('AndroidManifest.xml', `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <!-- Strict Offline Architecture: No INTERNET permission requested -->
    <application
        android:name=".CyberGuardApplication"
        android:allowBackup="true"
        android:label="@string/app_name"
        android:supportsRtl="true"
        android:theme="@style/Theme.CyberGuard">
        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
`);

    const valuesFolder = mainFolder.folder('res/values')!;
    valuesFolder.file('strings.xml', `<resources>
    <string name="app_name">CyberGuard</string>
    <string name="app_tagline">Offline Cybersecurity Academy</string>
</resources>`);

    const valuesArFolder = mainFolder.folder('res/values-ar')!;
    valuesArFolder.file('strings.xml', `<resources>
    <string name="app_name">سايبر جارد</string>
    <string name="app_tagline">أكاديمية الأمن السيبراني دون اتصال</string>
</resources>`);

    const kotlinFolder = mainFolder.folder('java/com/cyberguard/academy')!;
    kotlinFolder.file('CyberGuardApplication.kt', `package com.cyberguard.academy
import android.app.Application

class CyberGuardApplication : Application() {
    override fun onCreate() {
        super.onCreate()
    }
}`);

    kotlinFolder.file('MainActivity.kt', `package com.cyberguard.academy
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.material3.Text

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            Text("CyberGuard 1.0 — Offline Cybersecurity Academy")
        }
    }
}`);

    return await zip.generateAsync({ type: 'blob' });
  }

  static downloadBlob(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
