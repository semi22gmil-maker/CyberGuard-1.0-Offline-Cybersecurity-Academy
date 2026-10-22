package com.cyberguard.academy.data.dao

import androidx.room.*
import com.cyberguard.academy.data.entities.*
import kotlinx.coroutines.flow.Flow

@Dao
interface UserDao {
    @Query("SELECT * FROM user_profile WHERE id = 1 LIMIT 1")
    fun getUserProfile(): Flow<UserProfile?>

    @Query("SELECT * FROM user_profile WHERE id = 1 LIMIT 1")
    suspend fun getUserProfileDirect(): UserProfile?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertOrUpdateProfile(profile: UserProfile)

    @Query("UPDATE user_profile SET display_name = :name, updated_at = :timestamp WHERE id = 1")
    suspend fun updateDisplayName(name: String, timestamp: Long = System.currentTimeMillis())

    @Query("UPDATE user_profile SET preferred_language = :language, updated_at = :timestamp WHERE id = 1")
    suspend fun updatePreferredLanguage(language: String, timestamp: Long = System.currentTimeMillis())

    @Query("UPDATE user_profile SET theme_mode = :theme, updated_at = :timestamp WHERE id = 1")
    suspend fun updateThemeMode(theme: String, timestamp: Long = System.currentTimeMillis())
}

@Dao
interface LearningDao {
    @Query("SELECT * FROM categories ORDER BY sort_order ASC")
    fun getAllCategories(): Flow<List<CategoryEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertCategories(categories: List<CategoryEntity>)

    @Query("SELECT * FROM lessons WHERE category_id = :categoryId ORDER BY sort_order ASC")
    fun getLessonsForCategory(categoryId: Long): Flow<List<LessonEntity>>

    @Query("SELECT * FROM lessons ORDER BY sort_order ASC")
    fun getAllLessons(): Flow<List<LessonEntity>>

    @Query("SELECT * FROM lessons WHERE id = :lessonId LIMIT 1")
    suspend fun getLessonById(lessonId: Long): LessonEntity?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertLessons(lessons: List<LessonEntity>)

    @Query("SELECT * FROM lesson_progress WHERE lesson_id = :lessonId LIMIT 1")
    fun getLessonProgress(lessonId: Long): Flow<LessonProgressEntity?>

    @Query("SELECT * FROM lesson_progress")
    fun getAllLessonProgress(): Flow<List<LessonProgressEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun saveLessonProgress(progress: LessonProgressEntity)

    @Query("UPDATE lesson_progress SET last_position = :position WHERE lesson_id = :lessonId")
    suspend fun updateLessonPosition(lessonId: Long, position: Int)

    @Query("DELETE FROM lesson_progress")
    suspend fun clearAllLessonProgress()
}

@Dao
interface QuizDao {
    @Query("SELECT * FROM quizzes WHERE lesson_id = :lessonId")
    fun getQuizzesForLesson(lessonId: Long): Flow<List<QuizQuestionEntity>>

    @Query("SELECT * FROM quizzes")
    fun getAllQuizzes(): Flow<List<QuizQuestionEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertQuizzes(quizzes: List<QuizQuestionEntity>)

    @Insert
    suspend fun recordAttempt(attempt: QuizAttemptEntity)

    @Query("SELECT * FROM quiz_attempts ORDER BY attempted_at DESC")
    fun getAllAttempts(): Flow<List<QuizAttemptEntity>>

    @Query("SELECT * FROM quiz_attempts WHERE lesson_id = :lessonId ORDER BY attempted_at DESC")
    fun getAttemptsForLesson(lessonId: Long): Flow<List<QuizAttemptEntity>>

    @Query("DELETE FROM quiz_attempts")
    suspend fun clearAllAttempts()
}

@Dao
interface ChallengeDao {
    @Query("SELECT * FROM challenges ORDER BY id ASC")
    fun getAllChallenges(): Flow<List<ChallengeEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertChallenges(challenges: List<ChallengeEntity>)

    @Query("SELECT * FROM challenge_progress")
    fun getAllChallengeProgress(): Flow<List<ChallengeProgressEntity>>

    @Query("SELECT * FROM challenge_progress WHERE challenge_id = :challengeId LIMIT 1")
    suspend fun getChallengeProgress(challengeId: Long): ChallengeProgressEntity?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun saveChallengeProgress(progress: ChallengeProgressEntity)

    @Query("DELETE FROM challenge_progress")
    suspend fun clearAllChallengeProgress()
}

@Dao
interface StatsDao {
    @Query("SELECT * FROM user_stats WHERE id = 1 LIMIT 1")
    fun getUserStats(): Flow<UserStatsEntity?>

    @Query("SELECT * FROM user_stats WHERE id = 1 LIMIT 1")
    suspend fun getUserStatsDirect(): UserStatsEntity?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertOrUpdateStats(stats: UserStatsEntity)

    @Query("DELETE FROM user_stats")
    suspend fun clearStats()
}

@Dao
interface AchievementDao {
    @Query("SELECT * FROM achievements ORDER BY id ASC")
    fun getAllAchievements(): Flow<List<AchievementEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAchievements(achievements: List<AchievementEntity>)

    @Query("SELECT * FROM unlocked_achievements")
    fun getUnlockedAchievements(): Flow<List<UnlockedAchievementEntity>>

    @Insert(onConflict = OnConflictStrategy.IGNORE)
    suspend fun unlockAchievement(unlocked: UnlockedAchievementEntity)

    @Query("DELETE FROM unlocked_achievements")
    suspend fun clearUnlockedAchievements()
}

@Dao
interface FavoriteDao {
    @Query("SELECT * FROM favorites ORDER BY created_at DESC")
    fun getAllFavorites(): Flow<List<FavoriteEntity>>

    @Insert(onConflict = OnConflictStrategy.IGNORE)
    suspend fun addFavorite(favorite: FavoriteEntity)

    @Query("DELETE FROM favorites WHERE item_type = :type AND item_id = :id")
    suspend fun removeFavorite(type: String, id: Long)

    @Query("SELECT EXISTS(SELECT 1 FROM favorites WHERE item_type = :type AND item_id = :id)")
    fun isFavorite(type: String, id: Long): Flow<Boolean>

    @Query("DELETE FROM favorites")
    suspend fun clearFavorites()
}

@Dao
interface HistoryDao {
    @Query("SELECT * FROM learning_history ORDER BY created_at DESC LIMIT 50")
    fun getRecentHistory(): Flow<List<LearningHistoryEntity>>

    @Insert
    suspend fun addHistoryEntry(entry: LearningHistoryEntity)

    @Query("DELETE FROM learning_history")
    suspend fun clearHistory()
}
