package com.cyberguard.academy.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.cyberguard.academy.domain.services.SecurityLabEngine
import com.cyberguard.academy.ui.navigation.Screen
import com.cyberguard.academy.ui.theme.CyberCyan
import com.cyberguard.academy.ui.theme.CyberEmerald
import com.cyberguard.academy.viewmodel.CyberGuardViewModel

@Composable
fun HomeScreen(viewModel: CyberGuardViewModel, navController: NavController) {
    val state by viewModel.dashboardState.collectAsState()
    val isArabic = state.language == "ar"

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item {
            // Header
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text(
                        text = if (isArabic) "أهلاً بك يا ${state.displayName}" else "Welcome, ${state.displayName}",
                        style = MaterialTheme.typography.titleLarge,
                        fontWeight = FontWeight.Bold
                    )
                    Text(
                        text = if (isArabic) "المستوى ${state.level} • ${state.totalXp} نقطة خبرة" else "Level ${state.level} • ${state.totalXp} XP",
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
                IconButton(onClick = { navController.navigate(Screen.Settings.route) }) {
                    Icon(Icons.Default.Settings, contentDescription = "Settings")
                }
            }
        }

        item {
            // Level Progress Card
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
                shape = RoundedCornerShape(16.dp)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text(
                            text = if (isArabic) "التقدم نحو المستوى التالي" else "Progress to Next Level",
                            fontWeight = FontWeight.SemiBold
                        )
                        Text(
                            text = "${(state.nextLevelProgress * 100).toInt()}%",
                            color = CyberEmerald,
                            fontWeight = FontWeight.Bold
                        )
                    }
                    Spacer(modifier = Modifier.height(8.dp))
                    LinearProgressIndicator(
                        progress = { state.nextLevelProgress },
                        modifier = Modifier.fillMaxWidth().height(8.dp),
                        color = CyberEmerald,
                        trackColor = MaterialTheme.colorScheme.outline.copy(alpha = 0.3f)
                    )
                }
            }
        }

        item {
            // Stats Strip
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                StatCard(
                    modifier = Modifier.weight(1f),
                    label = if (isArabic) "الدروس المنجزة" else "Completed",
                    value = "${state.completedLessonsCount}/${state.totalLessonsCount}",
                    color = CyberCyan
                )
                StatCard(
                    modifier = Modifier.weight(1f),
                    label = if (isArabic) "دقة الاختبارات" else "Accuracy",
                    value = "${state.quizAccuracy.toInt()}%",
                    color = CyberEmerald
                )
                StatCard(
                    modifier = Modifier.weight(1f),
                    label = if (isArabic) "أيام التعلم" else "Streak",
                    value = "${state.streakDays}d",
                    color = Color(0xFFF59E0B)
                )
            }
        }

        item {
            // Quick Continue Card
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(
                        text = if (isArabic) "متابعة المسار التعليمي" else "Continue Learning",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = if (isArabic) "أساسيات الأمن السيبراني: ثالوث CIA" else "Cybersecurity Fundamentals: The CIA Triad",
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                    Spacer(modifier = Modifier.height(12.dp))
                    Button(
                        onClick = { navController.navigate(Screen.Categories.route) },
                        modifier = Modifier.fillMaxWidth(),
                        colors = ButtonDefaults.buttonColors(containerColor = CyberEmerald)
                    ) {
                        Text(if (isArabic) "افتح الدروس" else "Open Curriculum", color = Color.Black, fontWeight = FontWeight.Bold)
                    }
                }
            }
        }
    }
}

@Composable
fun StatCard(modifier: Modifier = Modifier, label: String, value: String, color: Color) {
    Card(
        modifier = modifier,
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
        shape = RoundedCornerShape(12.dp)
    ) {
        Column(
            modifier = Modifier.padding(12.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(text = value, style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.Bold, color = color)
            Spacer(modifier = Modifier.height(4.dp))
            Text(text = label, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
        }
    }
}

@Composable
fun CategoriesScreen(viewModel: CyberGuardViewModel, navController: NavController) {
    val categories by viewModel.categories.collectAsState()
    val isArabic = viewModel.dashboardState.collectAsState().value.language == "ar"

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        item {
            Text(
                text = if (isArabic) "مسارات الأكاديمية السيبرانية (12 مساراً)" else "Cybersecurity Learning Paths (12 Domains)",
                style = MaterialTheme.typography.titleLarge,
                fontWeight = FontWeight.Bold
            )
        }
        items(categories) { cat ->
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = if (isArabic) cat.titleAr else cat.titleEn,
                            style = MaterialTheme.typography.titleMedium,
                            fontWeight = FontWeight.Bold
                        )
                        Text(
                            text = cat.difficulty,
                            style = MaterialTheme.typography.labelSmall,
                            color = CyberCyan
                        )
                    }
                    Spacer(modifier = Modifier.height(6.dp))
                    Text(
                        text = if (isArabic) cat.descriptionAr else cat.descriptionEn,
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
        }
    }
}

@Composable
fun SecurityLabScreen(viewModel: CyberGuardViewModel, navController: NavController) {
    val isArabic = viewModel.dashboardState.collectAsState().value.language == "ar"
    var testPassword by remember { mutableStateOf("CorrectHorse#Battery99") }
    var hashInput by remember { mutableStateOf("CyberGuard 2026") }

    val entropy = SecurityLabEngine.calculatePasswordEntropy(testPassword)
    val crackTime = SecurityLabEngine.estimateCrackTime(entropy)
    val sha256 = SecurityLabEngine.computeHash(hashInput, "SHA-256")

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item {
            Text(
                text = if (isArabic) "مختبر الأمان الرقمي دون اتصال" else "Offline Security Laboratory",
                style = MaterialTheme.typography.titleLarge,
                fontWeight = FontWeight.Bold
            )
        }

        item {
            // Password Entropy Card
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(
                        text = if (isArabic) "محلل إنتروبيا وقوة كلمة المرور" else "Password Entropy & Strength Analyzer",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    OutlinedTextField(
                        value = testPassword,
                        onValueChange = { testPassword = it },
                        label = { Text(if (isArabic) "اكتب كلمة مرور للاختبار" else "Enter password to test") },
                        modifier = Modifier.fillMaxWidth()
                    )
                    Spacer(modifier = Modifier.height(12.dp))
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text(text = if (isArabic) "الإنتروبيا الرياضية:" else "Entropy Bits:")
                        Text(text = "%.1f bits".format(entropy), fontWeight = FontWeight.Bold, color = CyberEmerald)
                    }
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text(text = if (isArabic) "تقدير وقت الكسر:" else "Estimated Crack Time:")
                        Text(text = crackTime, fontWeight = FontWeight.SemiBold, color = CyberCyan)
                    }
                }
            }
        }

        item {
            // Cryptographic Hash Card
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(
                        text = if (isArabic) "مولد التجزئة الرياضية (SHA-256)" else "Cryptographic Hash Visualizer (SHA-256)",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    OutlinedTextField(
                        value = hashInput,
                        onValueChange = { hashInput = it },
                        label = { Text(if (isArabic) "النص المراد تجزئته" else "Input payload") },
                        modifier = Modifier.fillMaxWidth()
                    )
                    Spacer(modifier = Modifier.height(12.dp))
                    Text(text = "SHA-256 Digest:", style = MaterialTheme.typography.labelMedium)
                    Surface(
                        modifier = Modifier.fillMaxWidth(),
                        color = MaterialTheme.colorScheme.background,
                        shape = RoundedCornerShape(8.dp)
                    ) {
                        Text(
                            text = sha256,
                            modifier = Modifier.padding(10.dp),
                            style = MaterialTheme.typography.bodySmall,
                            fontFamily = androidx.compose.ui.text.font.FontFamily.Monospace,
                            color = CyberEmerald
                        )
                    }
                }
            }
        }
    }
}

@Composable
fun ThreatRadarScreen(viewModel: CyberGuardViewModel, navController: NavController) {
    val isArabic = viewModel.dashboardState.collectAsState().value.language == "ar"

    val scenarios = listOf(
        Pair("Rogue Evil Twin Wi-Fi", "High-gain AP broadcasting 'Airport_Free_WiFi' capturing cleartext credentials. Defense: Enforce VPN tunnel."),
        Pair("Spear Phishing HR Invoice", "Fake macro-enabled PDF.exe targeting finance staff. Defense: Application whitelisting & header analysis."),
        Pair("Credential Stuffing Flood", "Automated botnet spraying 50,000 breached password combos. Defense: CAPTCHA & adaptive rate-limiting.")
    )

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item {
            Text(
                text = if (isArabic) "رادار التهديدات التعليمي" else "Educational Threat Radar",
                style = MaterialTheme.typography.titleLarge,
                fontWeight = FontWeight.Bold
            )
            Text(
                text = if (isArabic) "محاكاة واقعية للسيناريوهات السيبرانية والتكتيكات الدفاعية (تعليمي فقط)" else "Simulated live threat triage and defense playbooks (Educational only)",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }

        items(scenarios) { item ->
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(text = item.first, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold, color = Color(0xFFEF4444))
                    Spacer(modifier = Modifier.height(6.dp))
                    Text(text = item.second, style = MaterialTheme.typography.bodyMedium)
                }
            }
        }
    }
}

@Composable
fun ProfileScreen(viewModel: CyberGuardViewModel, navController: NavController) {
    val state by viewModel.dashboardState.collectAsState()
    val isArabic = state.language == "ar"

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Text(
            text = if (isArabic) "الملف الشخصي والإحصائيات" else "Profile & Progression",
            style = MaterialTheme.typography.titleLarge,
            fontWeight = FontWeight.Bold
        )
        Spacer(modifier = Modifier.height(16.dp))
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text(text = state.displayName, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
                Text(text = if (isArabic) "أكاديمية سايبر جارد 1.0" else "CyberGuard Academy 1.0", color = MaterialTheme.colorScheme.onSurfaceVariant)
                Spacer(modifier = Modifier.height(12.dp))
                Text(text = "${if (isArabic) "المستوى الحالي: " else "Current Level: "} ${state.level}")
                Text(text = "${if (isArabic) "إجمالي نقاط الخبرة: " else "Total XP: "} ${state.totalXp}")
                Text(text = "${if (isArabic) "الدروس المكتملة: " else "Completed Lessons: "} ${state.completedLessonsCount}")
            }
        }
    }
}

@Composable
fun SettingsScreen(viewModel: CyberGuardViewModel, navController: NavController) {
    val state by viewModel.dashboardState.collectAsState()
    val isArabic = state.language == "ar"

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        Text(
            text = if (isArabic) "الإعدادات واللغة" else "Settings & Localization",
            style = MaterialTheme.typography.titleLarge,
            fontWeight = FontWeight.Bold
        )

        Button(
            onClick = { viewModel.setLanguage(if (isArabic) "en" else "ar") },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text(if (isArabic) "Switch to English (LTR)" else "التبديل إلى العربية (RTL)")
        }

        OutlinedButton(
            onClick = { viewModel.setDarkTheme(!state.isDark) },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text(if (state.isDark) "Switch to Light Theme" else "التبديل إلى الوضع الداكن")
        }

        OutlinedButton(
            onClick = { viewModel.resetAllProgress() },
            modifier = Modifier.fillMaxWidth(),
            colors = ButtonDefaults.outlinedButtonColors(contentColor = Color(0xFFEF4444))
        ) {
            Text(if (isArabic) "إعادة ضبط سجل التقدم (تأكيد)" else "Reset All Learning Data")
        }
    }
}

@Composable
fun AchievementsScreen(viewModel: CyberGuardViewModel, navController: NavController) {
    val achievements by viewModel.achievements.collectAsState()
    val isArabic = viewModel.dashboardState.collectAsState().value.language == "ar"

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        item {
            Text(
                text = if (isArabic) "أوسمة الإنجازات" else "Achievements",
                style = MaterialTheme.typography.titleLarge,
                fontWeight = FontWeight.Bold
            )
        }
        items(achievements) { ach ->
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(text = if (isArabic) ach.titleAr else ach.titleEn, fontWeight = FontWeight.Bold)
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(text = if (isArabic) ach.descriptionAr else ach.descriptionEn, color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
            }
        }
    }
}
