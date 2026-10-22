import React, { useState, useEffect } from 'react';
import { UserProfile, UserStats, Language, Lesson } from './types';
import { StorageService } from './services/storageService';
import { Header } from './components/Header';
import { BottomNav, TabType } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { LearnScreen } from './components/LearnScreen';
import { SecurityLabScreen } from './components/SecurityLabScreen';
import { ThreatRadarScreen } from './components/ThreatRadarScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { ChallengesScreen } from './components/ChallengesScreen';
import { LessonDetailModal } from './components/LessonDetailModal';
import { QuizModal } from './components/QuizModal';
import { AndroidSourceHubModal } from './components/AndroidSourceHubModal';
import { Smartphone, Monitor, Shield, Sparkles } from 'lucide-react';

export default function App() {
  const [profile, setProfile] = useState<UserProfile>(() => StorageService.getProfile());
  const [stats, setStats] = useState<UserStats>(() => StorageService.getStats());
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [language, setLanguage] = useState<Language>(() => profile.preferredLanguage || 'en');
  const [isPhoneFrame, setIsPhoneFrame] = useState(false);

  // Modals & Sub-views
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [activeQuizLessonId, setActiveQuizLessonId] = useState<number | null>(null);
  const [showSourceHub, setShowSourceHub] = useState(false);
  const [showChallengesDrawer, setShowChallengesDrawer] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Sync Language change
  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    const updated = { ...profile, preferredLanguage: newLang };
    setProfile(updated);
    StorageService.saveProfile(updated);
  };

  const refreshStats = () => {
    setStats(StorageService.getStats());
    setProfile(StorageService.getProfile());
  };

  const isArabic = language === 'ar';

  return (
    <div
      dir={isArabic ? 'rtl' : 'ltr'}
      className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-start selection:bg-emerald-500/30 selection:text-emerald-300"
    >
      {/* Viewport & Device Frame Bar */}
      <div className="w-full bg-slate-900/60 border-b border-slate-800/80 px-4 py-2 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-slate-300">
            {isArabic ? 'محاكي أندرويد النشط 1.0 (بدون اتصال)' : 'Active Android Runtime 1.0 (Offline Mode)'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPhoneFrame(!isPhoneFrame)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
            title="Toggle Mobile Mock Frame"
          >
            {isPhoneFrame ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">{isArabic ? 'شاشة كاملة' : 'Full Screen'}</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">{isArabic ? 'إطار هاتف' : 'Mobile Frame'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Container / Mobile Device Container */}
      <div
        className={`w-full flex-1 flex flex-col transition-all duration-300 ${
          isPhoneFrame
            ? 'max-w-[420px] my-4 rounded-[40px] border-[10px] border-slate-800 shadow-2xl overflow-hidden min-h-[820px] bg-slate-950'
            : 'max-w-2xl px-3 sm:px-0'
        }`}
      >
        {/* Top Header */}
        <Header
          profile={profile}
          language={language}
          onLanguageChange={handleLanguageChange}
          onOpenSourceHub={() => setShowSourceHub(true)}
        />

        {/* Content Body */}
        <main className="flex-1 p-4 overflow-y-auto">
          {showChallengesDrawer ? (
            <div className="space-y-4">
              <button
                onClick={() => setShowChallengesDrawer(false)}
                className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
              >
                ← {isArabic ? 'العودة إلى الرئيسية' : 'Back to Home'}
              </button>
              <ChallengesScreen
                language={language}
                onChallengeCompleted={refreshStats}
              />
            </div>
          ) : showSettingsModal ? (
            <div className="space-y-4">
              <button
                onClick={() => setShowSettingsModal(false)}
                className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
              >
                ← {isArabic ? 'العودة' : 'Back to App'}
              </button>
              <SettingsScreen
                profile={profile}
                language={language}
                onLanguageChange={handleLanguageChange}
                onSettingsUpdated={refreshStats}
              />
            </div>
          ) : (
            <>
              {currentTab === 'home' && (
                <HomeScreen
                  profile={profile}
                  stats={stats}
                  language={language}
                  onOpenLesson={(lesson) => setActiveLesson(lesson)}
                  onOpenChallenges={() => setShowChallengesDrawer(true)}
                  onNavigateTab={(tab) => setCurrentTab(tab)}
                />
              )}

              {currentTab === 'learn' && (
                <LearnScreen
                  language={language}
                  onOpenLesson={(lesson) => setActiveLesson(lesson)}
                />
              )}

              {currentTab === 'lab' && (
                <SecurityLabScreen
                  language={language}
                />
              )}

              {currentTab === 'radar' && (
                <ThreatRadarScreen
                  language={language}
                />
              )}

              {currentTab === 'profile' && (
                <ProfileScreen
                  profile={profile}
                  stats={stats}
                  language={language}
                  onOpenLesson={(lesson) => setActiveLesson(lesson)}
                  onProfileUpdated={refreshStats}
                />
              )}
            </>
          )}
        </main>

        {/* Bottom Navigation */}
        <BottomNav
          currentTab={currentTab}
          onTabChange={(tab) => {
            setShowChallengesDrawer(false);
            setShowSettingsModal(false);
            setCurrentTab(tab);
          }}
          language={language}
        />
      </div>

      {/* Modals */}
      {activeLesson && (
        <LessonDetailModal
          lesson={activeLesson}
          language={language}
          onClose={() => setActiveLesson(null)}
          onStartQuiz={(lessonId) => {
            setActiveLesson(null);
            setActiveQuizLessonId(lessonId);
          }}
          onProgressUpdated={refreshStats}
        />
      )}

      {activeQuizLessonId !== null && (
        <QuizModal
          lessonId={activeQuizLessonId}
          language={language}
          onClose={() => setActiveQuizLessonId(null)}
          onQuizFinished={refreshStats}
        />
      )}

      {showSourceHub && (
        <AndroidSourceHubModal
          language={language}
          onClose={() => setShowSourceHub(false)}
        />
      )}
    </div>
  );
}
