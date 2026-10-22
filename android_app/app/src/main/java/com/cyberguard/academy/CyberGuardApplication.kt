package com.cyberguard.academy

import android.app.Application
import com.cyberguard.academy.data.database.AppDatabase
import com.cyberguard.academy.data.datastore.AppPreferencesDataStore
import com.cyberguard.academy.data.repositories.CyberGuardRepository
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.launch

class CyberGuardApplication : Application() {

    val applicationScope = CoroutineScope(SupervisorJob() + Dispatchers.IO)

    val database by lazy { AppDatabase.getDatabase(this, applicationScope) }
    val preferencesDataStore by lazy { AppPreferencesDataStore(this) }
    
    val repository by lazy {
        CyberGuardRepository(
            userDao = database.userDao(),
            learningDao = database.learningDao(),
            quizDao = database.quizDao(),
            challengeDao = database.challengeDao(),
            statsDao = database.statsDao(),
            preferencesDataStore = preferencesDataStore
        )
    }

    override fun onCreate() {
        super.onCreate()
        // Ensure database seed executes on initial launch
        applicationScope.launch {
            repository.ensureInitialized()
        }
    }
}
