package com.cyberguard.academy.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.cyberguard.academy.data.entities.*
import com.cyberguard.academy.data.repositories.CyberGuardRepository
import com.cyberguard.academy.domain.services.SecurityLabEngine
import com.cyberguard.academy.domain.services.XpService
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch

data class DashboardUiState(
    val displayName: String = "Cyber Cadet",
    val level: Int = 1,
    val totalXp: Int = 0,
    val nextLevelProgress: Float = 0f,
    val completedLessonsCount: Int = 0,
    val totalLessonsCount: Int = 12,
    val completedChallengesCount: Int = 0,
    val quizAccuracy: Float = 0f,
    val streakDays: Int = 1,
    val language: String = "en",
    val isDark: Boolean = true
)

class CyberGuardViewModel(
    private val repository: CyberGuardRepository
) : ViewModel() {

    val categories: StateFlow<List<CategoryEntity>> = repository.categories
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    val lessons: StateFlow<List<LessonEntity>> = repository.allLessons
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    val lessonProgress: StateFlow<List<LessonProgressEntity>> = repository.lessonProgressList
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    val challenges: StateFlow<List<ChallengeEntity>> = repository.allChallenges
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    val achievements: StateFlow<List<AchievementEntity>> = repository.achievements
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    val unlockedAchievements: StateFlow<List<UnlockedAchievementEntity>> = repository.unlockedAchievements
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    val favorites: StateFlow<List<FavoriteEntity>> = repository.favorites
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    val recentHistory: StateFlow<List<LearningHistoryEntity>> = repository.recentHistory
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    val preferredLanguage: StateFlow<String> = repository.preferredLanguage
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), "en")

    val isDarkTheme: StateFlow<Boolean> = repository.isDarkTheme
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), true)

    // Consolidated Dashboard StateFlow
    val dashboardState: StateFlow<DashboardUiState> = combine(
        repository.userProfile,
        repository.userStats,
        repository.allLessons,
        repository.lessonProgressList,
        repository.preferredLanguage,
        repository.isDarkTheme
    ) { profile, stats, allLessonsList, progressList, lang, dark ->
        val totalXp = stats?.totalXp ?: 0
        val level = stats?.currentLevel ?: 1
        val progressFraction = XpService.progressTowardsNextLevel(totalXp)
        val completedCount = progressList.count { it.status == "COMPLETED" }
        val accuracy = if ((stats?.totalAnswers ?: 0) > 0) {
            (stats?.correctAnswers?.toFloat() ?: 0f) / (stats?.totalAnswers?.toFloat() ?: 1f) * 100f
        } else 0f

        DashboardUiState(
            displayName = profile?.displayName ?: "Cyber Cadet",
            level = level,
            totalXp = totalXp,
            nextLevelProgress = progressFraction,
            completedLessonsCount = completedCount,
            totalLessonsCount = allLessonsList.size.coerceAtLeast(1),
            completedChallengesCount = stats?.completedChallenges ?: 0,
            quizAccuracy = accuracy,
            streakDays = stats?.currentStreak ?: 1,
            language = lang,
            isDark = dark
        )
    }.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), DashboardUiState())

    fun updateName(name: String) {
        viewModelScope.launch {
            repository.updateDisplayName(name)
        }
    }

    fun setLanguage(lang: String) {
        viewModelScope.launch {
            repository.setPreferredLanguage(lang)
        }
    }

    fun setDarkTheme(isDark: Boolean) {
        viewModelScope.launch {
            repository.setDarkTheme(isDark)
        }
    }

    fun completeLesson(lessonId: Long, titleEn: String, titleAr: String) {
        viewModelScope.launch {
            repository.completeLesson(lessonId, 50, titleEn, titleAr)
        }
    }

    fun submitQuizAnswer(quizId: Long, lessonId: Long, selectedIndex: Int, isCorrect: Boolean, points: Int) {
        viewModelScope.launch {
            repository.recordQuizAttempt(quizId, lessonId, selectedIndex, isCorrect, points)
        }
    }

    fun completeChallenge(challengeId: Long, score: Int, xpReward: Int, titleEn: String, titleAr: String) {
        viewModelScope.launch {
            repository.completeChallenge(challengeId, score, xpReward, titleEn, titleAr)
        }
    }

    fun toggleFavorite(type: String, id: Long) {
        viewModelScope.launch {
            repository.toggleFavorite(type, id)
        }
    }

    fun resetAllProgress() {
        viewModelScope.launch {
            repository.resetUserProgress()
        }
    }
}
