import React from 'react';
import { UserStats, UserProfile, Language, Lesson, HistoryEntry } from '../types';
import { StorageService } from '../services/storageService';
import { ShieldCheck, Zap, Award, Flame, Target, ArrowRight, Play, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { SEED_LESSONS, SEED_CHALLENGES } from '../data/seedData';

interface HomeScreenProps {
  profile: UserProfile;
  stats: UserStats;
  language: Language;
  onOpenLesson: (lesson: Lesson) => void;
  onOpenChallenges: () => void;
  onNavigateTab: (tab: 'learn' | 'lab' | 'radar' | 'profile') => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  profile,
  stats,
  language,
  onOpenLesson,
  onOpenChallenges,
  onNavigateTab,
}) => {
  const isArabic = language === 'ar';
  const progressRatio = StorageService.progressToNextLevel(stats.totalXp);
  const nextLevelXp = StorageService.xpRequiredForLevel(stats.currentLevel + 1);
  const currentLevelXp = StorageService.xpRequiredForLevel(stats.currentLevel);
  const lessonProgress = StorageService.getLessonProgress();
  const recentHistory = StorageService.getHistory();

  // Find next unfinished lesson or default to first
  const nextLesson = SEED_LESSONS.find(l => lessonProgress[l.id]?.status !== 'COMPLETED') || SEED_LESSONS[0];

  const accuracyPercent = stats.totalAnswers > 0
    ? Math.round((stats.correctAnswers / stats.totalAnswers) * 100)
    : 100;

  return (
    <div className="space-y-4 pb-20">
      {/* Level & Welcome Card */}
      <div className="rounded-2xl p-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/80 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-xs font-semibold text-emerald-400 tracking-wider uppercase">
                {isArabic ? 'المدافع الرقمي' : 'Cyber Defender'}
              </span>
              <h2 className="text-xl font-bold text-white">
                {isArabic ? `أهلاً بك، ${profile.displayName}` : `Welcome, ${profile.displayName}`}
              </h2>
            </div>
            <div className="flex flex-col items-end">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                {isArabic ? `المستوى ${stats.currentLevel}` : `Level ${stats.currentLevel}`}
              </span>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-300 font-mono">
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <Zap className="w-3.5 h-3.5" />
                {stats.totalXp} XP
              </span>
              <span className="text-slate-400">
                {isArabic
                  ? `${nextLevelXp - stats.totalXp} نقطة للمستوى التالي`
                  : `${Math.max(0, nextLevelXp - stats.totalXp)} XP to next level`}
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full transition-all duration-500"
                style={{ width: `${Math.max(4, Math.round(progressRatio * 100))}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Real-time KPI Stats Grid */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
          <div className="w-7 h-7 mx-auto mb-1.5 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
            <Target className="w-4 h-4" />
          </div>
          <div className="text-lg font-bold text-white font-mono">{stats.completedLessons}</div>
          <div className="text-[10px] text-slate-400 leading-tight">
            {isArabic ? 'الدروس المنجزة' : 'Lessons Done'}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
          <div className="w-7 h-7 mx-auto mb-1.5 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <Award className="w-4 h-4" />
          </div>
          <div className="text-lg font-bold text-white font-mono">{accuracyPercent}%</div>
          <div className="text-[10px] text-slate-400 leading-tight">
            {isArabic ? 'دقة الاختبارات' : 'Quiz Accuracy'}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
          <div className="w-7 h-7 mx-auto mb-1.5 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
            <Flame className="w-4 h-4" />
          </div>
          <div className="text-lg font-bold text-white font-mono">{stats.currentStreak}d</div>
          <div className="text-[10px] text-slate-400 leading-tight">
            {isArabic ? 'أيام متتالية' : 'Day Streak'}
          </div>
        </div>
      </div>

      {/* Continue Learning CTA Card */}
      <div className="rounded-2xl p-4 bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-colors">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
            <Play className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
            {isArabic ? 'متابعة المسار التعليمي' : 'Continue Learning'}
          </span>
          <span className="text-[11px] text-slate-400">
            {nextLesson.estimatedMinutes} {isArabic ? 'دقائق' : 'min'}
          </span>
        </div>
        <h3 className="text-base font-bold text-white mb-1">
          {isArabic ? nextLesson.titleAr : nextLesson.titleEn}
        </h3>
        <p className="text-xs text-slate-400 line-clamp-2 mb-3">
          {isArabic ? nextLesson.descriptionAr : nextLesson.descriptionEn}
        </p>
        <button
          onClick={() => onOpenLesson(nextLesson)}
          className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 active:scale-[0.98] transition-all cursor-pointer"
        >
          <span>{isArabic ? 'ابدأ الدرس الآن' : 'Start Lesson Now'}</span>
          <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
        </button>
      </div>

      {/* Daily Challenge Card */}
      <div className="rounded-2xl p-4 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-slate-900 border border-cyan-800/50">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isArabic ? 'التحدي التكتيكي اليومي' : 'Daily Tactical Challenge'}</span>
          </div>
          <span className="text-xs font-mono font-bold text-cyan-300">+50 XP</span>
        </div>
        <h4 className="text-sm font-bold text-white mb-1">
          {isArabic ? SEED_CHALLENGES[0].titleAr : SEED_CHALLENGES[0].titleEn}
        </h4>
        <p className="text-xs text-slate-400 mb-3">
          {isArabic ? SEED_CHALLENGES[0].descriptionAr : SEED_CHALLENGES[0].descriptionEn}
        </p>
        <button
          onClick={onOpenChallenges}
          className="w-full py-2 px-3 rounded-lg bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-700/60 font-semibold text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors"
        >
          <span>{isArabic ? 'فتح التحديات الميدانية' : 'Open Practical Challenges'}</span>
          <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
        </button>
      </div>

      {/* Recent Activity Stream */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {isArabic ? 'النشاط الأخير في الجهاز' : 'Recent Local Activity'}
          </h4>
          <span className="text-[11px] text-slate-500">
            {isArabic ? 'محفوظ في SQLite' : 'Saved in Room DB'}
          </span>
        </div>

        {recentHistory.length === 0 ? (
          <div className="rounded-xl p-4 bg-slate-900/60 border border-slate-800 text-center text-xs text-slate-400">
            {isArabic
              ? 'لا يوجد نشاط مسجل بعد. أكمل أول درس لك لكسب نقاط الخبرة!'
              : 'No activity logged yet. Complete your first lesson to earn XP!'}
          </div>
        ) : (
          <div className="space-y-1.5">
            {recentHistory.slice(0, 4).map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 text-xs"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-slate-200 line-clamp-1">
                    {isArabic ? entry.titleAr : entry.titleEn}
                  </span>
                </div>
                <span className="font-mono text-emerald-400 font-semibold shrink-0">
                  +{entry.xpEarned} XP
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
