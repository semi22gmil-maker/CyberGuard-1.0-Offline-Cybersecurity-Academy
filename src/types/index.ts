export type Language = 'en' | 'ar';

export interface UserProfile {
  id: number;
  displayName: string;
  preferredLanguage: Language;
  themeMode: 'dark' | 'light';
  dailyGoalMinutes: number;
}

export interface UserStats {
  totalXp: number;
  currentLevel: number;
  completedLessons: number;
  completedChallenges: number;
  correctAnswers: number;
  totalAnswers: number;
  currentStreak: number;
  lastActivityDate: string;
}

export interface Category {
  id: number;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  iconName: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  sortOrder: number;
}

export interface Lesson {
  id: number;
  categoryId: number;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  contentEn: string;
  contentAr: string;
  estimatedMinutes: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  sortOrder: number;
}

export interface QuizQuestion {
  id: number;
  lessonId: number;
  questionEn: string;
  questionAr: string;
  optionsEn: string[];
  optionsAr: string[];
  correctOptionIndex: number;
  explanationEn: string;
  explanationAr: string;
  points: number;
  questionType: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'SCENARIO';
}

export interface QuizAttempt {
  id: string;
  quizId: number;
  lessonId: number;
  selectedOptionIndex: number;
  isCorrect: boolean;
  pointsEarned: number;
  attemptedAt: number;
}

export interface Challenge {
  id: number;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  type: 'PHISHING_EMAIL' | 'URL_ANATOMY' | 'PASSWORD_STRENGTH' | 'PROTOCOLS' | 'INCIDENT_RESPONSE';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  instructionsEn: string;
  instructionsAr: string;
  xpReward: number;
  payload: any;
}

export interface ChallengeProgress {
  challengeId: number;
  status: 'PENDING' | 'COMPLETED';
  bestScore: number;
  attempts: number;
  completedAt?: number;
}

export interface Achievement {
  id: number;
  code: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  iconName: string;
  unlockCondition: string;
  xpReward: number;
}

export interface HistoryEntry {
  id: string;
  activityType: 'LESSON' | 'QUIZ' | 'CHALLENGE' | 'ACHIEVEMENT';
  titleEn: string;
  titleAr: string;
  xpEarned: number;
  createdAt: number;
}
