import React, { useState } from 'react';
import { UserProfile, UserStats, Language, Lesson } from '../types';
import { StorageService } from '../services/storageService';
import { SEED_ACHIEVEMENTS, SEED_LESSONS } from '../data/seedData';
import { User, Award, Bookmark, History, Edit2, Check, ShieldCheck, Flame, Zap, Target } from 'lucide-react';

interface ProfileScreenProps {
  profile: UserProfile;
  stats: UserStats;
  language: Language;
  onOpenLesson: (lesson: Lesson) => void;
  onProfileUpdated: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  profile,
  stats,
  language,
  onOpenLesson,
  onProfileUpdated,
}) => {
  const isArabic = language === 'ar';
  const [activeSubTab, setActiveSubTab] = useState<'achievements' | 'favorites' | 'history'>('achievements');
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(profile.displayName);

  const unlockedIds = new Set(StorageService.getUnlockedAchievements());
  const favorites = StorageService.getFavorites();
  const historyEntries = StorageService.getHistory();

  const handleSaveName = () => {
    if (nameInput.trim()) {
      StorageService.saveProfile({ ...profile, displayName: nameInput.trim() });
      setIsEditingName(false);
      onProfileUpdated();
    }
  };

  const favoriteLessons = SEED_LESSONS.filter(l => favorites.some(f => f.type === 'LESSON' && f.id === l.id));

  return (
    <div className="space-y-4 pb-20">
      {/* Profile Card */}
      <div className="rounded-2xl p-4 bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-slate-950 font-bold text-lg shadow-md shadow-emerald-500/20">
              <User className="w-6 h-6" />
            </div>
            <div>
              {isEditingName ? (
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="px-2 py-1 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white font-bold focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    onClick={handleSaveName}
                    className="p-1 rounded bg-emerald-500 text-slate-950 cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">{profile.displayName}</h3>
                  <button
                    onClick={() => setIsEditingName(true)}
                    className="text-slate-400 hover:text-white cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
              <span className="text-xs text-slate-400 font-mono">
                {isArabic ? 'المعرف: محلي دون تسجيل' : 'Local Device ID #1'}
              </span>
            </div>
          </div>

          <div className="text-right rtl:text-left">
            <span className="text-xs font-bold font-mono text-emerald-400">
              Level {stats.currentLevel}
            </span>
            <span className="text-[11px] text-slate-400 block font-mono">
              {stats.totalXp} XP
            </span>
          </div>
        </div>

        {/* 4-KPI Strip */}
        <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-800 text-center">
          <div className="p-2 rounded-xl bg-slate-950 border border-slate-800/80">
            <span className="text-sm font-bold font-mono text-white block">{stats.completedLessons}</span>
            <span className="text-[9px] text-slate-400 leading-tight">{isArabic ? 'دروس' : 'Lessons'}</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-950 border border-slate-800/80">
            <span className="text-sm font-bold font-mono text-white block">{stats.completedChallenges}</span>
            <span className="text-[9px] text-slate-400 leading-tight">{isArabic ? 'تحديات' : 'Drills'}</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-950 border border-slate-800/80">
            <span className="text-sm font-bold font-mono text-emerald-400 block">
              {stats.totalAnswers > 0 ? Math.round((stats.correctAnswers / stats.totalAnswers) * 100) : 100}%
            </span>
            <span className="text-[9px] text-slate-400 leading-tight">{isArabic ? 'الدقة' : 'Accuracy'}</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-950 border border-slate-800/80">
            <span className="text-sm font-bold font-mono text-amber-400 block">{stats.currentStreak}d</span>
            <span className="text-[9px] text-slate-400 leading-tight">{isArabic ? 'المتتالية' : 'Streak'}</span>
          </div>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="grid grid-cols-3 gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800">
        <button
          onClick={() => setActiveSubTab('achievements')}
          className={`py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
            activeSubTab === 'achievements'
              ? 'bg-emerald-500 text-slate-950 shadow-sm font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>{isArabic ? 'الأوسمة' : 'Badges'}</span>
        </button>
        <button
          onClick={() => setActiveSubTab('favorites')}
          className={`py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
            activeSubTab === 'favorites'
              ? 'bg-emerald-500 text-slate-950 shadow-sm font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>{isArabic ? 'المفضلة' : 'Saved'}</span>
        </button>
        <button
          onClick={() => setActiveSubTab('history')}
          className={`py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
            activeSubTab === 'history'
              ? 'bg-emerald-500 text-slate-950 shadow-sm font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>{isArabic ? 'السجل' : 'History'}</span>
        </button>
      </div>

      {/* Tab: Achievements */}
      {activeSubTab === 'achievements' && (
        <div className="space-y-2">
          {SEED_ACHIEVEMENTS.map((ach) => {
            const isUnlocked = unlockedIds.has(ach.id);
            return (
              <div
                key={ach.id}
                className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
                  isUnlocked
                    ? 'bg-slate-900 border-emerald-500/50 shadow-md shadow-emerald-500/10'
                    : 'bg-slate-900/50 border-slate-800/80 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isUnlocked ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-500'
                  }`}>
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">
                      {isArabic ? ach.titleAr : ach.titleEn}
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      {isArabic ? ach.descriptionAr : ach.descriptionEn}
                    </p>
                  </div>
                </div>

                <div className="text-right rtl:text-left shrink-0">
                  <span className={`text-xs font-mono font-bold block ${isUnlocked ? 'text-emerald-400' : 'text-slate-500'}`}>
                    +{ach.xpReward} XP
                  </span>
                  <span className={`text-[10px] font-semibold ${isUnlocked ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {isUnlocked ? (isArabic ? 'مفتوح' : 'Unlocked') : (isArabic ? 'مقفل' : 'Locked')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab: Favorites */}
      {activeSubTab === 'favorites' && (
        <div className="space-y-2">
          {favoriteLessons.length === 0 ? (
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center text-xs text-slate-400">
              {isArabic
                ? 'لم تحفظ أي دروس في المفضلة بعد. اضغط على أيقونة الإشارة المرجعية داخل أي درس لحفظه هنا.'
                : 'No bookmarked lessons yet. Click the bookmark icon inside any lesson to save it here.'}
            </div>
          ) : (
            favoriteLessons.map((lesson) => (
              <div
                key={lesson.id}
                onClick={() => onOpenLesson(lesson)}
                className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 flex items-center justify-between cursor-pointer transition-colors"
              >
                <div>
                  <h4 className="text-xs font-bold text-white">
                    {isArabic ? lesson.titleAr : lesson.titleEn}
                  </h4>
                  <span className="text-[10px] text-slate-400">
                    {lesson.estimatedMinutes} {isArabic ? 'دقائق' : 'min read'}
                  </span>
                </div>
                <span className="text-xs font-bold text-emerald-400">
                  {isArabic ? 'افتح' : 'Open'}
                </span>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab: History */}
      {activeSubTab === 'history' && (
        <div className="space-y-2">
          {historyEntries.length === 0 ? (
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center text-xs text-slate-400">
              {isArabic ? 'سجل التعلم فارغ حالياً.' : 'Learning log is currently empty.'}
            </div>
          ) : (
            historyEntries.map((entry) => (
              <div
                key={entry.id}
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-semibold text-slate-200 block">
                    {isArabic ? entry.titleAr : entry.titleEn}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {new Date(entry.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <span className="font-mono text-emerald-400 font-bold">
                  +{entry.xpEarned} XP
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
