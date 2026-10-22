import { UserProfile, UserStats, QuizAttempt, ChallengeProgress, HistoryEntry, Language } from '../types';
import { SEED_CATEGORIES, SEED_LESSONS, SEED_QUIZZES, SEED_CHALLENGES, SEED_ACHIEVEMENTS } from '../data/seedData';

const STORAGE_KEYS = {
  PROFILE: 'cyberguard_profile_v1',
  STATS: 'cyberguard_stats_v1',
  LESSON_PROGRESS: 'cyberguard_lesson_progress_v1',
  QUIZ_ATTEMPTS: 'cyberguard_quiz_attempts_v1',
  CHALLENGE_PROGRESS: 'cyberguard_challenge_progress_v1',
  UNLOCKED_ACHIEVEMENTS: 'cyberguard_unlocked_achievements_v1',
  FAVORITES: 'cyberguard_favorites_v1',
  HISTORY: 'cyberguard_history_v1',
};

export class StorageService {
  static getProfile(): UserProfile {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        // fallback
      }
    }
    const defaultProfile: UserProfile = {
      id: 1,
      displayName: 'Cyber Cadet',
      preferredLanguage: 'en',
      themeMode: 'dark',
      dailyGoalMinutes: 15,
    };
    this.saveProfile(defaultProfile);
    return defaultProfile;
  }

  static saveProfile(profile: UserProfile): void {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  }

  static getStats(): UserStats {
    const raw = localStorage.getItem(STORAGE_KEYS.STATS);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        // fallback
      }
    }
    const defaultStats: UserStats = {
      totalXp: 0,
      currentLevel: 1,
      completedLessons: 0,
      completedChallenges: 0,
      correctAnswers: 0,
      totalAnswers: 0,
      currentStreak: 1,
      lastActivityDate: new Date().toISOString().split('T')[0],
    };
    this.saveStats(defaultStats);
    return defaultStats;
  }

  static saveStats(stats: UserStats): void {
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
  }

  static calculateLevel(totalXp: number): number {
    if (totalXp <= 0) return 1;
    return Math.floor(Math.sqrt(totalXp / 100)) + 1;
  }

  static xpRequiredForLevel(level: number): number {
    if (level <= 1) return 0;
    const base = level - 1;
    return base * base * 100;
  }

  static progressToNextLevel(totalXp: number): number {
    const currentLevel = this.calculateLevel(totalXp);
    const minXp = this.xpRequiredForLevel(currentLevel);
    const nextXp = this.xpRequiredForLevel(currentLevel + 1);
    const range = nextXp - minXp;
    if (range <= 0) return 1;
    return Math.min(1, Math.max(0, (totalXp - minXp) / range));
  }

  static getLessonProgress(): Record<number, { status: string; completedAt?: number; lastPosition?: number }> {
    const raw = localStorage.getItem(STORAGE_KEYS.LESSON_PROGRESS);
    if (!raw) return {};
    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  }

  static markLessonCompleted(lessonId: number, titleEn: string, titleAr: string, points: number = 50): { xpEarned: number } {
    const progress = this.getLessonProgress();
    const isFirstTime = progress[lessonId]?.status !== 'COMPLETED';

    progress[lessonId] = {
      status: 'COMPLETED',
      completedAt: Date.now(),
      lastPosition: 100,
    };
    localStorage.setItem(STORAGE_KEYS.LESSON_PROGRESS, JSON.stringify(progress));

    if (isFirstTime) {
      const stats = this.getStats();
      const newTotalXp = stats.totalXp + points;
      const newLevel = this.calculateLevel(newTotalXp);
      const newCompleted = stats.completedLessons + 1;

      const updatedStats = {
        ...stats,
        totalXp: newTotalXp,
        currentLevel: newLevel,
        completedLessons: newCompleted,
      };
      this.saveStats(updatedStats);

      this.addHistory({
        id: 'hist_' + Date.now(),
        activityType: 'LESSON',
        titleEn: `Completed lesson: ${titleEn}`,
        titleAr: `إتمام درس: ${titleAr}`,
        xpEarned: points,
        createdAt: Date.now(),
      });

      this.evaluateAchievements(updatedStats);
      return { xpEarned: points };
    }
    return { xpEarned: 0 };
  }

  static recordQuizAttempt(
    quizId: number,
    lessonId: number,
    selectedOptionIndex: number,
    isCorrect: boolean,
    points: number
  ): { xpEarned: number } {
    const attempts = this.getQuizAttempts();
    const hasAlreadyEarnedXp = attempts.some(a => a.quizId === quizId && a.isCorrect);

    attempts.push({
      id: 'attempt_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      quizId,
      lessonId,
      selectedOptionIndex,
      isCorrect,
      pointsEarned: (isCorrect && !hasAlreadyEarnedXp) ? points : 0,
      attemptedAt: Date.now(),
    });
    localStorage.setItem(STORAGE_KEYS.QUIZ_ATTEMPTS, JSON.stringify(attempts));

    const stats = this.getStats();
    const newCorrect = stats.correctAnswers + (isCorrect ? 1 : 0);
    const newTotal = stats.totalAnswers + 1;
    const earnedXp = (isCorrect && !hasAlreadyEarnedXp) ? points : 0;
    const newTotalXp = stats.totalXp + earnedXp;
    const newLevel = this.calculateLevel(newTotalXp);

    const updatedStats = {
      ...stats,
      totalXp: newTotalXp,
      currentLevel: newLevel,
      correctAnswers: newCorrect,
      totalAnswers: newTotal,
    };
    this.saveStats(updatedStats);

    if (isCorrect) {
      this.evaluateAchievements(updatedStats);
    }
    return { xpEarned: earnedXp };
  }

  static getQuizAttempts(): QuizAttempt[] {
    const raw = localStorage.getItem(STORAGE_KEYS.QUIZ_ATTEMPTS);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  static getChallengeProgress(): Record<number, ChallengeProgress> {
    const raw = localStorage.getItem(STORAGE_KEYS.CHALLENGE_PROGRESS);
    if (!raw) return {};
    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  }

  static completeChallenge(challengeId: number, score: number, xpReward: number, titleEn: string, titleAr: string): { xpEarned: number } {
    const progress = this.getChallengeProgress();
    const existing = progress[challengeId];
    const isFirstTime = existing?.status !== 'COMPLETED';

    progress[challengeId] = {
      challengeId,
      status: 'COMPLETED',
      bestScore: Math.max(score, existing?.bestScore || 0),
      attempts: (existing?.attempts || 0) + 1,
      completedAt: Date.now(),
    };
    localStorage.setItem(STORAGE_KEYS.CHALLENGE_PROGRESS, JSON.stringify(progress));

    if (isFirstTime) {
      const stats = this.getStats();
      const newTotalXp = stats.totalXp + xpReward;
      const newLevel = this.calculateLevel(newTotalXp);
      const newCompleted = stats.completedChallenges + 1;

      const updatedStats = {
        ...stats,
        totalXp: newTotalXp,
        currentLevel: newLevel,
        completedChallenges: newCompleted,
      };
      this.saveStats(updatedStats);

      this.addHistory({
        id: 'hist_' + Date.now(),
        activityType: 'CHALLENGE',
        titleEn: `Solved Challenge: ${titleEn}`,
        titleAr: `حل التحدي: ${titleAr}`,
        xpEarned: xpReward,
        createdAt: Date.now(),
      });

      this.evaluateAchievements(updatedStats);
      return { xpEarned: xpReward };
    }
    return { xpEarned: 0 };
  }

  static getUnlockedAchievements(): number[] {
    const raw = localStorage.getItem(STORAGE_KEYS.UNLOCKED_ACHIEVEMENTS);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  static evaluateAchievements(stats: UserStats): void {
    const unlocked = new Set(this.getUnlockedAchievements());
    const newlyUnlocked: number[] = [];

    if (stats.completedLessons >= 1 && !unlocked.has(1)) newlyUnlocked.push(1);
    if (stats.correctAnswers >= 1 && !unlocked.has(2)) newlyUnlocked.push(2);
    if (stats.completedLessons >= 5 && !unlocked.has(3)) newlyUnlocked.push(3);
    if (stats.correctAnswers >= 10 && !unlocked.has(4)) newlyUnlocked.push(4);
    if (stats.completedChallenges >= 1 && !unlocked.has(5)) newlyUnlocked.push(5);
    if (stats.currentStreak >= 7 && !unlocked.has(6)) newlyUnlocked.push(6);

    if (newlyUnlocked.length > 0) {
      newlyUnlocked.forEach(id => unlocked.add(id));
      localStorage.setItem(STORAGE_KEYS.UNLOCKED_ACHIEVEMENTS, JSON.stringify(Array.from(unlocked)));

      newlyUnlocked.forEach(id => {
        const ach = SEED_ACHIEVEMENTS.find(a => a.id === id);
        if (ach) {
          this.addHistory({
            id: 'ach_' + Date.now() + '_' + id,
            activityType: 'ACHIEVEMENT',
            titleEn: `Unlocked badge: ${ach.titleEn}`,
            titleAr: `فتح وسام: ${ach.titleAr}`,
            xpEarned: ach.xpReward,
            createdAt: Date.now(),
          });
        }
      });
    }
  }

  static getFavorites(): { type: string; id: number }[] {
    const raw = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  static toggleFavorite(type: 'LESSON' | 'CHALLENGE', id: number): boolean {
    const favs = this.getFavorites();
    const index = favs.findIndex(f => f.type === type && f.id === id);
    let isNowFav = false;
    if (index >= 0) {
      favs.splice(index, 1);
    } else {
      favs.push({ type, id });
      isNowFav = true;
    }
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favs));
    return isNowFav;
  }

  static getHistory(): HistoryEntry[] {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  static addHistory(entry: HistoryEntry): void {
    const history = this.getHistory();
    history.unshift(entry);
    // keep up to 60 recent entries
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history.slice(0, 60)));
  }

  static exportAllProgressJson(): string {
    const data = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      profile: this.getProfile(),
      stats: this.getStats(),
      lessonProgress: this.getLessonProgress(),
      quizAttempts: this.getQuizAttempts(),
      challengeProgress: this.getChallengeProgress(),
      unlockedAchievements: this.getUnlockedAchievements(),
      favorites: this.getFavorites(),
      history: this.getHistory(),
    };
    return JSON.stringify(data, null, 2);
  }

  static importProgressJson(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString);
      if (!data || typeof data !== 'object') return false;
      if (data.profile) this.saveProfile(data.profile);
      if (data.stats) this.saveStats(data.stats);
      if (data.lessonProgress) localStorage.setItem(STORAGE_KEYS.LESSON_PROGRESS, JSON.stringify(data.lessonProgress));
      if (data.quizAttempts) localStorage.setItem(STORAGE_KEYS.QUIZ_ATTEMPTS, JSON.stringify(data.quizAttempts));
      if (data.challengeProgress) localStorage.setItem(STORAGE_KEYS.CHALLENGE_PROGRESS, JSON.stringify(data.challengeProgress));
      if (data.unlockedAchievements) localStorage.setItem(STORAGE_KEYS.UNLOCKED_ACHIEVEMENTS, JSON.stringify(data.unlockedAchievements));
      if (data.favorites) localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(data.favorites));
      if (data.history) localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(data.history));
      return true;
    } catch (e) {
      return false;
    }
  }

  static resetUserProgress(): void {
    const currentProfile = this.getProfile();
    localStorage.removeItem(STORAGE_KEYS.LESSON_PROGRESS);
    localStorage.removeItem(STORAGE_KEYS.QUIZ_ATTEMPTS);
    localStorage.removeItem(STORAGE_KEYS.CHALLENGE_PROGRESS);
    localStorage.removeItem(STORAGE_KEYS.UNLOCKED_ACHIEVEMENTS);
    localStorage.removeItem(STORAGE_KEYS.FAVORITES);
    localStorage.removeItem(STORAGE_KEYS.HISTORY);

    const resetStats: UserStats = {
      totalXp: 0,
      currentLevel: 1,
      completedLessons: 0,
      completedChallenges: 0,
      correctAnswers: 0,
      totalAnswers: 0,
      currentStreak: 1,
      lastActivityDate: new Date().toISOString().split('T')[0],
    };
    this.saveStats(resetStats);
  }
}
