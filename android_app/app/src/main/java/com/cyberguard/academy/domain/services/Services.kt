package com.cyberguard.academy.domain.services

import com.cyberguard.academy.data.dao.AchievementDao
import com.cyberguard.academy.data.dao.HistoryDao
import com.cyberguard.academy.data.entities.LearningHistoryEntity
import com.cyberguard.academy.data.entities.UnlockedAchievementEntity
import com.cyberguard.academy.data.entities.UserStatsEntity
import java.security.MessageDigest
import kotlin.math.log2
import kotlin.math.sqrt

object XpService {
    /**
     * Calculates user level based on quadratic scaling:
     * Level = floor(sqrt(XP / 100)) + 1
     */
    fun calculateLevel(totalXp: Int): Int {
        if (totalXp <= 0) return 1
        return (sqrt(totalXp.toDouble() / 100.0)).toInt() + 1
    }

    /**
     * Returns total XP required to reach the given level.
     */
    fun xpRequiredForLevel(level: Int): Int {
        if (level <= 1) return 0
        val base = level - 1
        return base * base * 100
    }

    /**
     * Returns the fractional progress (0.0 to 1.0) towards the next level.
     */
    fun progressTowardsNextLevel(totalXp: Int): Float {
        val currentLevel = calculateLevel(totalXp)
        val currentLevelMinXp = xpRequiredForLevel(currentLevel)
        val nextLevelMinXp = xpRequiredForLevel(currentLevel + 1)
        val range = nextLevelMinXp - currentLevelMinXp
        if (range <= 0) return 1.0f
        val currentInLevel = totalXp - currentLevelMinXp
        return (currentInLevel.toFloat() / range.toFloat()).coerceIn(0.0f, 1.0f)
    }
}

object AchievementService {
    suspend fun checkAndUnlock(
        stats: UserStatsEntity,
        achievementDao: AchievementDao,
        historyDao: HistoryDao
    ) {
        if (stats.completedLessons >= 1) {
            unlock(1L, "First Steps in Defense", "الخطوة الأولى في الدفاع", 50, achievementDao, historyDao)
        }
        if (stats.correctAnswers >= 1) {
            unlock(2L, "Knowledge Verified", "إثبات المعرفة", 50, achievementDao, historyDao)
        }
        if (stats.completedLessons >= 5) {
            unlock(3L, "Security Apprentice", "متدرب أمن المعلومات", 100, achievementDao, historyDao)
        }
        if (stats.correctAnswers >= 10) {
            unlock(4L, "Sharp Defender", "المدافع اليقظ", 100, achievementDao, historyDao)
        }
        if (stats.completedChallenges >= 1) {
            unlock(5L, "Hands-On Operator", "خبير الميدان العملي", 75, achievementDao, historyDao)
        }
        if (stats.currentStreak >= 7) {
            unlock(6L, "Relentless Vigilance", "يقظة مستمرة", 150, achievementDao, historyDao)
        }
    }

    private suspend fun unlock(
        achievementId: Long,
        titleEn: String,
        titleAr: String,
        xpReward: Int,
        achievementDao: AchievementDao,
        historyDao: HistoryDao
    ) {
        achievementDao.unlockAchievement(
            UnlockedAchievementEntity(achievementId = achievementId)
        )
        historyDao.addHistoryEntry(
            LearningHistoryEntity(
                activityType = "ACHIEVEMENT",
                titleEn = "Unlocked badge: $titleEn",
                titleAr = "إنجاز مفتوح: $titleAr",
                xpEarned = xpReward
            )
        )
    }
}

object SecurityLabEngine {

    /**
     * Computes cryptographic hash offline using Java MessageDigest.
     */
    fun computeHash(input: String, algorithm: String = "SHA-256"): String {
        val digest = MessageDigest.getInstance(algorithm)
        val hashBytes = digest.digest(input.toByteArray(Charsets.UTF_8))
        return hashBytes.joinToString("") { "%02x".format(it) }
    }

    /**
     * Calculates mathematical Shannon entropy bits for a password:
     * E = L * log2(R)
     */
    fun calculatePasswordEntropy(password: String): Double {
        if (password.isEmpty()) return 0.0
        var poolSize = 0
        if (password.any { it.isLowerCase() }) poolSize += 26
        if (password.any { it.isUpperCase() }) poolSize += 26
        if (password.any { it.isDigit() }) poolSize += 10
        if (password.any { !it.isLetterOrDigit() }) poolSize += 32

        if (poolSize == 0) return 0.0
        return password.length * log2(poolSize.toDouble())
    }

    /**
     * Returns human-readable crack time estimate based on entropy.
     */
    fun estimateCrackTime(entropy: Double): String {
        return when {
            entropy < 28 -> "Instant (< 1 millisecond)"
            entropy < 36 -> "A few seconds"
            entropy < 50 -> "Several hours to days"
            entropy < 64 -> "Several months"
            entropy < 80 -> "Decades to centuries"
            else -> "Millions of years (Quantum-resistant)"
        }
    }
}
