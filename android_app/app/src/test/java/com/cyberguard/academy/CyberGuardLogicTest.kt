package com.cyberguard.academy

import com.cyberguard.academy.domain.services.SecurityLabEngine
import com.cyberguard.academy.domain.services.XpService
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

class CyberGuardLogicTest {

    @Test
    fun testLevelProgression() {
        // 0 XP -> Level 1
        assertEquals(1, XpService.calculateLevel(0))
        
        // 99 XP -> Level 1
        assertEquals(1, XpService.calculateLevel(99))

        // 100 XP -> Level 2
        assertEquals(2, XpService.calculateLevel(100))

        // 400 XP -> Level 3
        assertEquals(3, XpService.calculateLevel(400))

        // 900 XP -> Level 4
        assertEquals(4, XpService.calculateLevel(900))
    }

    @Test
    fun testNextLevelProgressFraction() {
        val fraction = XpService.progressTowardsNextLevel(50)
        assertTrue(fraction in 0.0f..1.0f)
        assertEquals(0.5f, fraction, 0.01f)
    }

    @Test
    fun testCryptographicHashing() {
        val hash = SecurityLabEngine.computeHash("cyberguard", "SHA-256")
        // SHA-256 output must be exactly 64 hex characters
        assertEquals(64, hash.length)
        // Known test vector for "cyberguard"
        val expected = "22513f56eb72f3e8fca9b19dfa9f733e8b030b42c433364f3d1bcf5ea68571fa"
        assertEquals(expected, hash)
    }

    @Test
    fun testPasswordEntropyCalculation() {
        // "password" -> 8 lowercase chars -> 8 * log2(26) = ~37.6 bits
        val entropy = SecurityLabEngine.calculatePasswordEntropy("password")
        assertTrue(entropy in 37.0..38.0)

        // Empty password -> 0 bits
        assertEquals(0.0, SecurityLabEngine.calculatePasswordEntropy(""), 0.001)

        // Strong 16-char mixed password
        val strongEntropy = SecurityLabEngine.calculatePasswordEntropy("K9#mQ2@xL7!pW5&z")
        assertTrue(strongEntropy > 90.0)
    }
}
