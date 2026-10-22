package com.cyberguard.academy.data.entities

import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.ForeignKey
import androidx.room.Index
import androidx.room.PrimaryKey

@Entity(tableName = "user_profile")
data class UserProfile(
    @PrimaryKey val id: Long = 1L,
    @ColumnInfo(name = "display_name") val displayName: String,
    @ColumnInfo(name = "preferred_language") val preferredLanguage: String = "en", // "en" or "ar"
    @ColumnInfo(name = "theme_mode") val themeMode: String = "dark", // "dark" or "light"
    @ColumnInfo(name = "daily_goal_minutes") val dailyGoalMinutes: Int = 15,
    @ColumnInfo(name = "created_at") val createdAt: Long = System.currentTimeMillis(),
    @ColumnInfo(name = "updated_at") val updatedAt: Long = System.currentTimeMillis()
)

@Entity(tableName = "categories")
data class CategoryEntity(
    @PrimaryKey val id: Long,
    @ColumnInfo(name = "title_en") val titleEn: String,
    @ColumnInfo(name = "title_ar") val titleAr: String,
    @ColumnInfo(name = "description_en") val descriptionEn: String,
    @ColumnInfo(name = "description_ar") val descriptionAr: String,
    @ColumnInfo(name = "icon_name") val iconName: String,
    @ColumnInfo(name = "difficulty") val difficulty: String, // Beginner, Intermediate, Advanced
    @ColumnInfo(name = "sort_order") val sortOrder: Int
)

@Entity(
    tableName = "lessons",
    foreignKeys = [
        ForeignKey(
            entity = CategoryEntity::class,
            parentColumns = ["id"],
            childColumns = ["category_id"],
            onDelete = ForeignKey.CASCADE
        )
    ],
    indices = [Index(value = ["category_id"]), Index(value = ["sort_order"])]
)
data class LessonEntity(
    @PrimaryKey val id: Long,
    @ColumnInfo(name = "category_id") val categoryId: Long,
    @ColumnInfo(name = "title_en") val titleEn: String,
    @ColumnInfo(name = "title_ar") val titleAr: String,
    @ColumnInfo(name = "description_en") val descriptionEn: String,
    @ColumnInfo(name = "description_ar") val descriptionAr: String,
    @ColumnInfo(name = "content_en") val contentEn: String,
    @ColumnInfo(name = "content_ar") val contentAr: String,
    @ColumnInfo(name = "estimated_minutes") val estimatedMinutes: Int,
    @ColumnInfo(name = "difficulty") val difficulty: String,
    @ColumnInfo(name = "sort_order") val sortOrder: Int
)

@Entity(
    tableName = "lesson_progress",
    foreignKeys = [
        ForeignKey(
            entity = LessonEntity::class,
            parentColumns = ["id"],
            childColumns = ["lesson_id"],
            onDelete = ForeignKey.CASCADE
        )
    ],
    indices = [Index(value = ["lesson_id"], unique = true)]
)
data class LessonProgressEntity(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    @ColumnInfo(name = "lesson_id") val lessonId: Long,
    @ColumnInfo(name = "status") val status: String, // "NOT_STARTED", "IN_PROGRESS", "COMPLETED"
    @ColumnInfo(name = "completion_percentage") val completionPercentage: Int = 0,
    @ColumnInfo(name = "last_position") val lastPosition: Int = 0,
    @ColumnInfo(name = "started_at") val startedAt: Long = System.currentTimeMillis(),
    @ColumnInfo(name = "completed_at") val completedAt: Long? = null
)

@Entity(
    tableName = "quizzes",
    foreignKeys = [
        ForeignKey(
            entity = LessonEntity::class,
            parentColumns = ["id"],
            childColumns = ["lesson_id"],
            onDelete = ForeignKey.CASCADE
        )
    ],
    indices = [Index(value = ["lesson_id"])]
)
data class QuizQuestionEntity(
    @PrimaryKey val id: Long,
    @ColumnInfo(name = "lesson_id") val lessonId: Long,
    @ColumnInfo(name = "question_en") val questionEn: String,
    @ColumnInfo(name = "question_ar") val questionAr: String,
    @ColumnInfo(name = "options_en_json") val optionsEnJson: String, // JSON array string
    @ColumnInfo(name = "options_ar_json") val optionsArJson: String, // JSON array string
    @ColumnInfo(name = "correct_option_index") val correctOptionIndex: Int,
    @ColumnInfo(name = "explanation_en") val explanationEn: String,
    @ColumnInfo(name = "explanation_ar") val explanationAr: String,
    @ColumnInfo(name = "points") val points: Int = 20,
    @ColumnInfo(name = "question_type") val questionType: String = "MULTIPLE_CHOICE" // "MULTIPLE_CHOICE", "TRUE_FALSE", "SCENARIO"
)

@Entity(
    tableName = "quiz_attempts",
    indices = [Index(value = ["quiz_id"]), Index(value = ["attempted_at"])]
)
data class QuizAttemptEntity(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    @ColumnInfo(name = "quiz_id") val quizId: Long,
    @ColumnInfo(name = "lesson_id") val lessonId: Long,
    @ColumnInfo(name = "selected_option_index") val selectedOptionIndex: Int,
    @ColumnInfo(name = "is_correct") val isCorrect: Boolean,
    @ColumnInfo(name = "points_earned") val pointsEarned: Int,
    @ColumnInfo(name = "attempted_at") val attemptedAt: Long = System.currentTimeMillis()
)

@Entity(tableName = "challenges")
data class ChallengeEntity(
    @PrimaryKey val id: Long,
    @ColumnInfo(name = "title_en") val titleEn: String,
    @ColumnInfo(name = "title_ar") val titleAr: String,
    @ColumnInfo(name = "description_en") val descriptionEn: String,
    @ColumnInfo(name = "description_ar") val descriptionAr: String,
    @ColumnInfo(name = "type") val type: String, // PHISHING_EMAIL, URL_ANATOMY, PASSWORD_STRENGTH, CONFIGURATION, PROTOCOLS, INCIDENT_RESPONSE
    @ColumnInfo(name = "difficulty") val difficulty: String,
    @ColumnInfo(name = "instructions_en") val instructionsEn: String,
    @ColumnInfo(name = "instructions_ar") val instructionsAr: String,
    @ColumnInfo(name = "xp_reward") val xpReward: Int = 50,
    @ColumnInfo(name = "payload_json") val payloadJson: String // Scenario/challenge data
)

@Entity(
    tableName = "challenge_progress",
    indices = [Index(value = ["challenge_id"], unique = true)]
)
data class ChallengeProgressEntity(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    @ColumnInfo(name = "challenge_id") val challengeId: Long,
    @ColumnInfo(name = "status") val status: String, // "PENDING", "COMPLETED"
    @ColumnInfo(name = "best_score") val bestScore: Int = 0,
    @ColumnInfo(name = "attempts") val attempts: Int = 0,
    @ColumnInfo(name = "completed_at") val completedAt: Long? = null
)

@Entity(tableName = "user_stats")
data class UserStatsEntity(
    @PrimaryKey val id: Long = 1L,
    @ColumnInfo(name = "total_xp") val totalXp: Int = 0,
    @ColumnInfo(name = "current_level") val currentLevel: Int = 1,
    @ColumnInfo(name = "completed_lessons") val completedLessons: Int = 0,
    @ColumnInfo(name = "completed_challenges") val completedChallenges: Int = 0,
    @ColumnInfo(name = "correct_answers") val correctAnswers: Int = 0,
    @ColumnInfo(name = "total_answers") val totalAnswers: Int = 0,
    @ColumnInfo(name = "current_streak") val currentStreak: Int = 1,
    @ColumnInfo(name = "last_activity_date") val lastActivityDate: String = ""
)

@Entity(tableName = "achievements")
data class AchievementEntity(
    @PrimaryKey val id: Long,
    @ColumnInfo(name = "code") val code: String,
    @ColumnInfo(name = "title_en") val titleEn: String,
    @ColumnInfo(name = "title_ar") val titleAr: String,
    @ColumnInfo(name = "description_en") val descriptionEn: String,
    @ColumnInfo(name = "description_ar") val descriptionAr: String,
    @ColumnInfo(name = "icon_name") val iconName: String,
    @ColumnInfo(name = "unlock_condition") val unlockCondition: String,
    @ColumnInfo(name = "xp_reward") val xpReward: Int = 50
)

@Entity(
    tableName = "unlocked_achievements",
    indices = [Index(value = ["achievement_id"], unique = true)]
)
data class UnlockedAchievementEntity(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    @ColumnInfo(name = "achievement_id") val achievementId: Long,
    @ColumnInfo(name = "unlocked_at") val unlockedAt: Long = System.currentTimeMillis()
)

@Entity(
    tableName = "favorites",
    indices = [Index(value = ["item_type", "item_id"], unique = true)]
)
data class FavoriteEntity(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    @ColumnInfo(name = "item_type") val itemType: String, // "LESSON", "CHALLENGE"
    @ColumnInfo(name = "item_id") val itemId: Long,
    @ColumnInfo(name = "created_at") val createdAt: Long = System.currentTimeMillis()
)

@Entity(
    tableName = "learning_history",
    indices = [Index(value = ["created_at"])]
)
data class LearningHistoryEntity(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    @ColumnInfo(name = "activity_type") val activityType: String, // "LESSON", "QUIZ", "CHALLENGE", "ACHIEVEMENT"
    @ColumnInfo(name = "title_en") val titleEn: String,
    @ColumnInfo(name = "title_ar") val titleAr: String,
    @ColumnInfo(name = "xp_earned") val xpEarned: Int,
    @ColumnInfo(name = "created_at") val createdAt: Long = System.currentTimeMillis()
)
