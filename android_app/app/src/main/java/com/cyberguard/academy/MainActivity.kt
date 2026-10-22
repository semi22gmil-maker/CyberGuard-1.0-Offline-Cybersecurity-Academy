package com.cyberguard.academy

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.compose.*
import com.cyberguard.academy.ui.navigation.Screen
import com.cyberguard.academy.ui.screens.*
import com.cyberguard.academy.ui.theme.CyberGuardTheme
import com.cyberguard.academy.viewmodel.CyberGuardViewModel

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val app = application as CyberGuardApplication
        
        setContent {
            val viewModel: CyberGuardViewModel = viewModel(
                factory = object : androidx.lifecycle.ViewModelProvider.Factory {
                    override fun <T : androidx.lifecycle.ViewModel> create(modelClass: Class<T>): T {
                        @Suppress("UNCHECKED_CAST")
                        return CyberGuardViewModel(app.repository) as T
                    }
                }
            )

            val dashboardState by viewModel.dashboardState.collectAsState()
            val isArabic = dashboardState.language == "ar"

            CyberGuardTheme(
                darkTheme = dashboardState.isDark,
                isArabic = isArabic
            ) {
                val navController = rememberNavController()
                val navBackStackEntry by navController.currentBackStackEntryAsState()
                val currentRoute = navBackStackEntry?.destination?.route

                Scaffold(
                    bottomBar = {
                        val bottomRoutes = listOf(
                            Screen.Home.route,
                            Screen.Categories.route,
                            Screen.SecurityLab.route,
                            Screen.ThreatRadar.route,
                            Screen.Profile.route
                        )
                        if (currentRoute in bottomRoutes) {
                            NavigationBar {
                                NavigationBarItem(
                                    selected = currentRoute == Screen.Home.route,
                                    onClick = {
                                        navController.navigate(Screen.Home.route) {
                                            popUpTo(navController.graph.findStartDestination().id) { saveState = true }
                                            launchSingleTop = true
                                            restoreState = true
                                        }
                                    },
                                    icon = { Icon(Icons.Default.Home, contentDescription = "Home") },
                                    label = { Text(if (isArabic) "الرئيسية" else "Home") }
                                )
                                NavigationBarItem(
                                    selected = currentRoute == Screen.Categories.route,
                                    onClick = {
                                        navController.navigate(Screen.Categories.route) {
                                            popUpTo(navController.graph.findStartDestination().id) { saveState = true }
                                            launchSingleTop = true
                                            restoreState = true
                                        }
                                    },
                                    icon = { Icon(Icons.Default.School, contentDescription = "Learn") },
                                    label = { Text(if (isArabic) "المسارات" else "Learn") }
                                )
                                NavigationBarItem(
                                    selected = currentRoute == Screen.SecurityLab.route,
                                    onClick = {
                                        navController.navigate(Screen.SecurityLab.route) {
                                            popUpTo(navController.graph.findStartDestination().id) { saveState = true }
                                            launchSingleTop = true
                                            restoreState = true
                                        }
                                    },
                                    icon = { Icon(Icons.Default.Build, contentDescription = "Lab") },
                                    label = { Text(if (isArabic) "المختبر" else "Lab") }
                                )
                                NavigationBarItem(
                                    selected = currentRoute == Screen.ThreatRadar.route,
                                    onClick = {
                                        navController.navigate(Screen.ThreatRadar.route) {
                                            popUpTo(navController.graph.findStartDestination().id) { saveState = true }
                                            launchSingleTop = true
                                            restoreState = true
                                        }
                                    },
                                    icon = { Icon(Icons.Default.Radar, contentDescription = "Radar") },
                                    label = { Text(if (isArabic) "الرادار" else "Radar") }
                                )
                                NavigationBarItem(
                                    selected = currentRoute == Screen.Profile.route,
                                    onClick = {
                                        navController.navigate(Screen.Profile.route) {
                                            popUpTo(navController.graph.findStartDestination().id) { saveState = true }
                                            launchSingleTop = true
                                            restoreState = true
                                        }
                                    },
                                    icon = { Icon(Icons.Default.Person, contentDescription = "Profile") },
                                    label = { Text(if (isArabic) "الملف" else "Profile") }
                                )
                            }
                        }
                    }
                ) { innerPadding ->
                    NavHost(
                        navController = navController,
                        startDestination = Screen.Home.route,
                        modifier = Modifier.padding(innerPadding)
                    ) {
                        composable(Screen.Home.route) {
                            HomeScreen(viewModel = viewModel, navController = navController)
                        }
                        composable(Screen.Categories.route) {
                            CategoriesScreen(viewModel = viewModel, navController = navController)
                        }
                        composable(Screen.SecurityLab.route) {
                            SecurityLabScreen(viewModel = viewModel, navController = navController)
                        }
                        composable(Screen.ThreatRadar.route) {
                            ThreatRadarScreen(viewModel = viewModel, navController = navController)
                        }
                        composable(Screen.Profile.route) {
                            ProfileScreen(viewModel = viewModel, navController = navController)
                        }
                        composable(Screen.Settings.route) {
                            SettingsScreen(viewModel = viewModel, navController = navController)
                        }
                        composable(Screen.Achievements.route) {
                            AchievementsScreen(viewModel = viewModel, navController = navController)
                        }
                    }
                }
            }
        }
    }
}
