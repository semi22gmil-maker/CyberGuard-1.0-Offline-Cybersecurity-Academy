package com.cyberguard.academy.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalLayoutDirection
import androidx.compose.ui.unit.LayoutDirection

val CyberDarkBackground = Color(0xFF0A0E17)
val CyberDarkSurface = Color(0xFF131B2E)
val CyberDarkCard = Color(0xFF1E293B)
val CyberDarkBorder = Color(0xFF334155)

val CyberEmerald = Color(0xFF10B981)
val CyberCyan = Color(0xFF06B6D4)
val CyberAmber = Color(0xFFF59E0B)
val CyberRed = Color(0xFFEF4444)

private val DarkColorScheme = darkColorScheme(
    primary = CyberEmerald,
    onPrimary = Color.Black,
    secondary = CyberCyan,
    onSecondary = Color.Black,
    background = CyberDarkBackground,
    onBackground = Color(0xFFF1F5F9),
    surface = CyberDarkSurface,
    onSurface = Color(0xFFF1F5F9),
    surfaceVariant = CyberDarkCard,
    onSurfaceVariant = Color(0xFF94A3B8),
    outline = CyberDarkBorder,
    error = CyberRed
)

private val LightColorScheme = lightColorScheme(
    primary = Color(0xFF059669),
    onPrimary = Color.White,
    secondary = Color(0xFF0284C7),
    onSecondary = Color.White,
    background = Color(0xFFF8FAFC),
    onBackground = Color(0xFF0F172A),
    surface = Color.White,
    onSurface = Color(0xFF0F172A),
    surfaceVariant = Color(0xFFF1F5F9),
    onSurfaceVariant = Color(0xFF475569),
    outline = Color(0xFFCBD5E1),
    error = Color(0xFFDC2626)
)

@Composable
fun CyberGuardTheme(
    darkTheme: Boolean = true,
    isArabic: Boolean = false,
    content: @Composable () -> Unit
) {
    val colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme
    val layoutDirection = if (isArabic) LayoutDirection.Rtl else LayoutDirection.Ltr

    CompositionLocalProvider(LocalLayoutDirection provides layoutDirection) {
        MaterialTheme(
            colorScheme = colorScheme,
            typography = Typography(),
            content = content
        )
    }
}
