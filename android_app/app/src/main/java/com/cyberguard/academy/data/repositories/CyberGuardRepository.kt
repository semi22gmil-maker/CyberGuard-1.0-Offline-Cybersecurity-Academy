package com.cyberguard.academy.data.repositories

import com.cyberguard.academy.data.dao.*
import com.cyberguard.academy.data.datastore.AppPreferencesDataStore
import com.cyberguard.academy.data.entities.*
import com.cyberguard.academy.domain.services.AchievementService
import com.cyberguard.academy.domain.services.XpService
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.first

class CyberGuardRepository(
    private val userDao: UserDao,
    private val learningDao: LearningDao,
    private val quizDao: QuizDao,
    private val challengeDao: ChallengeDao,
    private val statsDao: StatsDao,
    private val achievementDao: AchievementDao,
    private val favoriteDao: FavoriteDao,
    private val historyDao: HistoryDao,
    private val preferencesDataStore: AppPreferencesDataStore
) {

    // Preferences Flows
    val onboardingCompleted: Flow<Boolean> = preferencesDataStore.onboardingCompleted
    val preferredLanguage: Flow<String> = preferencesDataStore.preferredLanguage
    val isDarkTheme: Flow<Boolean> = preferencesDataStore.isDarkTheme

    // Room DB Flows
    val userProfile: Flow<UserProfile?> = userDao.getUserProfile()
    val userStats: Flow<UserStatsEntity?> = statsDao.getUserStats()
    val categories: Flow<List<CategoryEntity>> = learningDao.getAllCategories()
    val allLessons: Flow<List<LessonEntity>> = learningDao.getAllLessons()
    val lessonProgressList: Flow<List<LessonProgressEntity>> = learningDao.getAllLessonProgress()
    val allQuizzes: Flow<List<QuizQuestionEntity>> = quizDao.getAllQuizzes()
    val allChallenges: Flow<List<ChallengeEntity>> = challengeDao.getAllChallenges()
    val challengeProgressList: Flow<List<ChallengeProgressEntity>> = challengeDao.getAllChallengeProgress()
    val achievements: Flow<List<AchievementEntity>> = achievementDao.getAllAchievements()
    val unlockedAchievements: Flow<List<UnlockedAchievementEntity>> = achievementDao.getUnlockedAchievements()
    val favorites: Flow<List<FavoriteEntity>> = favoriteDao.getAllFavorites()
    val recentHistory: Flow<List<LearningHistoryEntity>> = historyDao.getRecentHistory()

    suspend fun ensureInitialized() {
        if (userDao.getUserProfileDirect() == null) {
            userDao.insertOrUpdateProfile(
                UserProfile(displayName = "Cyber Cadet", preferredLanguage = "en", themeMode = "dark")
            )
        }
        if (statsDao.getUserStatsDirect() == null) {
            statsDao.insertOrUpdateStats(UserStatsEntity())
        }
    }

    suspend fun updateDisplayName(name: String) {
        userDao.updateDisplayName(name)
    }

    suspend fun setPreferredLanguage(lang: String) {
        preferencesDataStore.setPreferredLanguage(lang)
        userDao.updatePreferredLanguage(lang)
    }

    suspend fun setDarkTheme(isDark: Boolean) {
        preferencesDataStore.setDarkTheme(isDark)
        userDao.updateThemeMode(if (isDark) "dark" else "light")
    }

    suspend fun completeLesson(lessonId: Long, points: Int = 50, titleEn: String, titleAr: String) {
        val existing = learningDao.getLessonProgress(lessonId).first()
        val isFirstTime = existing?.status != "COMPLETED"

        learningDao.saveLessonProgress(
            LessonProgressEntity(
                lessonId = lessonId,
                status = "COMPLETED",
                completionPercentage = 100,
                lastPosition = 0,
                completedAt = System.currentTimeMillis()
            )
        )

        if (isFirstTime) {
            val stats = statsDao.getUserStatsDirect() ?: UserStatsEntity()
            val newTotalXp = stats.totalXp + points
            val newLevel = XpService.calculateLevel(newTotalXp)
            val newCompletedLessons = stats.completedLessons + 1

            statsDao.insertOrUpdateStats(
                stats.copy(
                    totalXp = newTotalXp,
                    currentLevel = newLevel,
                    completedLessons = newCompletedLessons
                )
            )

            historyDao.addHistoryEntry(
                LearningHistoryEntity(
                    activityType = "LESSON",
                    titleEn = "Completed lesson: $titleEn",
                    titleAr = "إتمام درس: $titleAr",
                    xpEarned = points
                )
            )

            // Evaluate achievements
            AchievementService.checkAndUnlock(
                stats = stats.copy(totalXp = newTotalXp, currentLevel = newLevel, completedLessons = newCompletedLessons),
                achievementDao = achievementDao,
                historyDao = historyDao
            )
        }
    }

    suspend fun recordQuizAttempt(
        quizId: Long,
        lessonId: Long,
        selectedOptionIndex: Int,
        isCorrect: Boolean,
        points: Int
    ) {
        quizDao.recordAttempt(
            QuizAttemptEntity(
                quizId = quizId,
                lessonId = lessonId,
                selectedOptionIndex = selectedOptionIndex,
                isCorrect = isCorrect,
                pointsEarned = if (isCorrect) points else 0
            )
        )

        val stats = statsDao.getUserStatsDirect() ?: UserStatsEntity()
        val newCorrect = stats.correctAnswers + (if (isCorrect) 1 else 0)
        val newTotal = stats.totalAnswers + 1
        val earnedXp = if (isCorrect) points else 0
        val newTotalXp = stats.totalXp + earnedXp
        val newLevel = XpService.calculateLevel(newTotalXp)

        statsDao.insertOrUpdateStats(
            stats.copy(
                totalXp = newTotalXp,
                currentLevel = newLevel,
                correctAnswers = newCorrect,
                totalAnswers = newTotal
            )
        )

        if (isCorrect) {
            AchievementService.checkAndUnlock(
                stats = stats.copy(correctAnswers = newCorrect, totalAnswers = newTotal),
                achievementDao = achievementDao,
                historyDao = historyDao
            )
        }
    }

    suspend fun completeChallenge(challengeId: Long, score: Int, xpReward: Int, titleEn: String, titleAr: String) {
        val existing = challengeDao.getChallengeProgress(challengeId)
        val isFirstTime = existing?.status != "COMPLETED"

        challengeDao.saveChallengeProgress(
            ChallengeProgressEntity(
                challengeId = challengeId,
                status = "COMPLETED",
                bestScore = maxOf(score, existing?.bestScore ?: 0),
                attempts = (existing?.attempts ?: 0) + 1,
                completedAt = System.currentTimeMillis()
            )
        )

        if (isFirstTime) {
            val stats = statsDao.getUserStatsDirect() ?: UserStatsEntity()
            val newTotalXp = stats.totalXp + xpReward
            val newLevel = XpService.calculateLevel(newTotalXp)
            val newCompletedChallenges = stats.completedChallenges + 1

            statsDao.insertOrUpdateStats(
                stats.copy(
                    totalXp = newTotalXp,
                    currentLevel = newLevel,
                    completedChallenges = newCompletedChallenges
                )
            )

            historyDao.addHistoryEntry(
                LearningHistoryEntity(
                    activityType = "CHALLENGE",
                    titleEn = "Solved challenge: $titleEn",
                    titleAr = "حل تحدي: $titleAr",
                    xpEarned = xpReward
                )
            )

            AchievementService.checkAndUnlock(
                stats = stats.copy(totalXp = newTotalXp, currentLevel = newLevel, completedChallenges = newCompletedChallenges),
                achievementDao = achievementDao,
                historyDao = historyDao
            )
        }
    }

    suspend fun toggleFavorite(type: String, id: Long) {
        val isFav = favoriteDao.isFavorite(type, id).first()
        if (isFav) {
            favoriteDao.removeFavorite(type, id)
        } else {
            favoriteDao.addFavorite(FavoriteEntity(itemType = type, itemId = id))
        }
    }

    suspend fun resetUserProgress() {
        learningDao.clearAllLessonProgress()
        quizDao.clearAllAttempts()
        challengeDao.clearAllChallengeProgress()
        achievementDao.clearUnlockedAchievements()
        favoriteDao.clearFavorites()
        historyDao.clearHistory()
        statsDao.insertOrUpdateStats(UserStatsEntity())
    }
}
