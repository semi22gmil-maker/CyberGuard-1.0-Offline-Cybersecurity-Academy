package com.cyberguard.academy.data.datastore

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.*
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

private val Context.dataStore: DataStore<Preferences> by preferencesDataStore(name = "cyberguard_preferences")

class AppPreferencesDataStore(private val context: Context) {

    companion object {
        val KEY_ONBOARDING_COMPLETED = booleanPreferencesKey("onboarding_completed")
        val KEY_PREFERRED_LANGUAGE = stringPreferencesKey("preferred_language")
        val KEY_DARK_THEME = booleanPreferencesKey("dark_theme")
        val KEY_DAILY_GOAL = intPreferencesKey("daily_goal_minutes")
    }

    val onboardingCompleted: Flow<Boolean> = context.dataStore.data.map { preferences ->
        preferences[KEY_ONBOARDING_COMPLETED] ?: false
    }

    val preferredLanguage: Flow<String> = context.dataStore.data.map { preferences ->
        preferences[KEY_PREFERRED_LANGUAGE] ?: "en"
    }

    val isDarkTheme: Flow<Boolean> = context.dataStore.data.map { preferences ->
        preferences[KEY_DARK_THEME] ?: true
    }

    val dailyGoalMinutes: Flow<Int> = context.dataStore.data.map { preferences ->
        preferences[KEY_DAILY_GOAL] ?: 15
    }

    suspend fun setOnboardingCompleted(completed: Boolean) {
        context.dataStore.edit { preferences ->
            preferences[KEY_ONBOARDING_COMPLETED] = completed
        }
    }

    suspend fun setPreferredLanguage(language: String) {
        context.dataStore.edit { preferences ->
            preferences[KEY_PREFERRED_LANGUAGE] = language
        }
    }

    suspend fun setDarkTheme(isDark: Boolean) {
        context.dataStore.edit { preferences ->
            preferences[KEY_DARK_THEME] = isDark
        }
    }

    suspend fun setDailyGoalMinutes(minutes: Int) {
        context.dataStore.edit { preferences ->
            preferences[KEY_DAILY_GOAL] = minutes
        }
    }
}
