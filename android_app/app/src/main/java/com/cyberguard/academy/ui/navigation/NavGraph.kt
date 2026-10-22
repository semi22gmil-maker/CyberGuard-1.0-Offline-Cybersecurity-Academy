package com.cyberguard.academy.ui.navigation

sealed class Screen(val route: String) {
    object Splash : Screen("splash")
    object Onboarding : Screen("onboarding")
    object Home : Screen("home")
    object Categories : Screen("categories")
    object LessonList : Screen("lesson_list/{categoryId}") {
        fun createRoute(categoryId: Long) = "lesson_list/$categoryId"
    }
    object LessonDetail : Screen("lesson_detail/{lessonId}") {
        fun createRoute(lessonId: Long) = "lesson_detail/$lessonId"
    }
    object Quiz : Screen("quiz/{lessonId}") {
        fun createRoute(lessonId: Long) = "quiz/$lessonId"
    }
    object Challenges : Screen("challenges")
    object ThreatRadar : Screen("threat_radar")
    object SecurityLab : Screen("security_lab")
    object Profile : Screen("profile")
    object Achievements : Screen("achievements")
    object Favorites : Screen("favorites")
    object History : Screen("history")
    object Settings : Screen("settings")
    object DataManagement : Screen("data_management")
}
