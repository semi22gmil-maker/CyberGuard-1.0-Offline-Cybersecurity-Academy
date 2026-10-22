import React, { useState } from 'react';
import { Language } from '../types';
import { ZipExportService } from '../services/zipExportService';
import { X, Download, Copy, Check, FileCode, FolderArchive, Terminal, Shield } from 'lucide-react';

interface AndroidSourceHubModalProps {
  language: Language;
  onClose: () => void;
}

interface SourceFile {
  name: string;
  path: string;
  language: string;
  code: string;
}

const ANDROID_SOURCE_FILES: SourceFile[] = [
  {
    name: 'AndroidManifest.xml',
    path: 'app/src/main/AndroidManifest.xml',
    language: 'xml',
    code: `<?xml version="1.0" encoding="utf-8"?>
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
</manifest>`,
  },
  {
    name: 'Entities.kt (Room)',
    path: 'app/src/main/java/com/cyberguard/academy/data/entities/Entities.kt',
    language: 'kotlin',
    code: `package com.cyberguard.academy.data.entities

import androidx.room.*

@Entity(tableName = "user_profile")
data class UserProfile(
    @PrimaryKey val id: Long = 1L,
    @ColumnInfo(name = "display_name") val displayName: String,
    @ColumnInfo(name = "preferred_language") val preferredLanguage: String = "en",
    @ColumnInfo(name = "theme_mode") val themeMode: String = "dark"
)

@Entity(tableName = "categories")
data class CategoryEntity(
    @PrimaryKey val id: Long,
    @ColumnInfo(name = "title_en") val titleEn: String,
    @ColumnInfo(name = "title_ar") val titleAr: String,
    @ColumnInfo(name = "difficulty") val difficulty: String,
    @ColumnInfo(name = "sort_order") val sortOrder: Int
)

@Entity(
    tableName = "lessons",
    foreignKeys = [ForeignKey(entity = CategoryEntity::class, parentColumns = ["id"], childColumns = ["category_id"])]
)
data class LessonEntity(
    @PrimaryKey val id: Long,
    @ColumnInfo(name = "category_id") val categoryId: Long,
    @ColumnInfo(name = "title_en") val titleEn: String,
    @ColumnInfo(name = "title_ar") val titleAr: String,
    @ColumnInfo(name = "content_en") val contentEn: String,
    @ColumnInfo(name = "content_ar") val contentAr: String,
    @ColumnInfo(name = "estimated_minutes") val estimatedMinutes: Int
)

@Entity(tableName = "user_stats")
data class UserStatsEntity(
    @PrimaryKey val id: Long = 1L,
    @ColumnInfo(name = "total_xp") val totalXp: Int = 0,
    @ColumnInfo(name = "current_level") val currentLevel: Int = 1,
    @ColumnInfo(name = "completed_lessons") val completedLessons: Int = 0,
    @ColumnInfo(name = "current_streak") val currentStreak: Int = 1
)`,
  },
  {
    name: 'AppDaos.kt (Room)',
    path: 'app/src/main/java/com/cyberguard/academy/data/dao/AppDaos.kt',
    language: 'kotlin',
    code: `package com.cyberguard.academy.data.dao

import androidx.room.*
import com.cyberguard.academy.data.entities.*
import kotlinx.coroutines.flow.Flow

@Dao
interface LearningDao {
    @Query("SELECT * FROM categories ORDER BY sort_order ASC")
    fun getAllCategories(): Flow<List<CategoryEntity>>

    @Query("SELECT * FROM lessons WHERE category_id = :categoryId")
    fun getLessonsForCategory(categoryId: Long): Flow<List<LessonEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertCategories(categories: List<CategoryEntity>)
}

@Dao
interface QuizDao {
    @Insert
    suspend fun recordAttempt(attempt: QuizAttemptEntity)
}`,
  },
  {
    name: 'CyberGuardViewModel.kt',
    path: 'app/src/main/java/com/cyberguard/academy/viewmodel/CyberGuardViewModel.kt',
    language: 'kotlin',
    code: `package com.cyberguard.academy.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.cyberguard.academy.data.repositories.CyberGuardRepository
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch

class CyberGuardViewModel(
    private val repository: CyberGuardRepository
) : ViewModel() {
    val categories = repository.categories
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    val dashboardState = repository.userStats
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), null)
}`,
  },
  {
    name: 'Screens.kt (Jetpack Compose)',
    path: 'app/src/main/java/com/cyberguard/academy/ui/screens/Screens.kt',
    language: 'kotlin',
    code: `package com.cyberguard.academy.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import com.cyberguard.academy.viewmodel.CyberGuardViewModel

@Composable
fun HomeScreen(viewModel: CyberGuardViewModel) {
    val state by viewModel.dashboardState.collectAsState()
    LazyColumn(modifier = Modifier.fillMaxSize()) {
        item {
            Text("CyberGuard 1.0 — Offline Academy", style = MaterialTheme.typography.titleLarge)
        }
    }
}`,
  },
  {
    name: 'build.gradle.kts (App)',
    path: 'app/build.gradle.kts',
    language: 'kotlin',
    code: `plugins {
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
    }
}

dependencies {
    implementation(platform("androidx.compose:compose-bom:2024.12.01"))
    implementation("androidx.compose.material3:material3")
    implementation("androidx.room:room-runtime:2.6.1")
    implementation("androidx.room:room-ktx:2.6.1")
    ksp("androidx.room:room-compiler:2.6.1")
}`,
  },
];

export const AndroidSourceHubModal: React.FC<AndroidSourceHubModalProps> = ({ language, onClose }) => {
  const isArabic = language === 'ar';
  const [selectedFileIdx, setSelectedFileIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const activeFile = ANDROID_SOURCE_FILES[selectedFileIdx];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    setIsExporting(true);
    try {
      const blob = await ZipExportService.generateAndroidProjectZip();
      ZipExportService.downloadBlob(blob, 'CyberGuard_Android_Native_Project.zip');
    } catch (e) {
      console.error(e);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex flex-col justify-end sm:justify-center items-center sm:p-4">
      <div className="w-full sm:max-w-4xl bg-slate-900 border border-slate-800 sm:rounded-3xl rounded-t-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-900/95 sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <FolderArchive className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>{isArabic ? 'مستودع مشروع أندرويد الأصلي (Kotlin & Jetpack Compose)' : 'Native Android Codebase & Project Exporter'}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                  Room + Compose + Gradle
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                {isArabic
                  ? 'ملفات المشروع جاهزة للفتح مباشرة في Android Studio أو البناء عبر Gradle'
                  : 'Production-ready Android project files ready for Android Studio and gradlew.'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Banner */}
        <div className="px-5 py-3 bg-gradient-to-r from-emerald-950/60 to-slate-900 border-b border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-emerald-300">
            <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              {isArabic
                ? 'تحميل المشروع بالكامل كملف ZIP متكامل'
                : 'Download complete native Android project bundle (.ZIP)'}
            </span>
          </div>
          <button
            onClick={handleDownloadZip}
            disabled={isExporting}
            className="py-2 px-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExporting ? (isArabic ? 'جارِ التحزيم...' : 'Bundling...') : (isArabic ? 'تحميل مشروع أندرويد (ZIP)' : 'Download Project .ZIP')}</span>
          </button>
        </div>

        {/* Explorer Body: File List + Code Viewer */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* File sidebar */}
          <div className="w-full md:w-60 border-b md:border-b-0 md:border-r border-slate-800 bg-slate-950/60 overflow-y-auto p-2 space-y-1">
            <div className="px-2 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              {isArabic ? 'الملفات البرمجية' : 'Project Files'}
            </div>
            {ANDROID_SOURCE_FILES.map((file, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedFileIdx(idx)}
                className={`w-full px-2.5 py-2 rounded-lg text-xs flex items-center gap-2 text-left rtl:text-right transition-colors cursor-pointer ${
                  selectedFileIdx === idx
                    ? 'bg-slate-800 text-emerald-400 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <FileCode className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{file.name}</span>
              </button>
            ))}
          </div>

          {/* Code display */}
          <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden">
            <div className="px-4 py-2 border-b border-slate-800/80 bg-slate-900/60 flex items-center justify-between text-xs">
              <span className="font-mono text-slate-400 text-[11px] truncate">{activeFile.path}</span>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? (isArabic ? 'تم النسخ!' : 'Copied!') : (isArabic ? 'نسخ الكود' : 'Copy Code')}</span>
              </button>
            </div>
            <pre className="flex-1 p-4 overflow-auto font-mono text-xs text-slate-200 leading-relaxed select-all">
              <code>{activeFile.code}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
