import React, { useState } from 'react';
import { Category, Lesson, Language } from '../types';
import { SEED_CATEGORIES, SEED_LESSONS } from '../data/seedData';
import { StorageService } from '../services/storageService';
import {
  Shield,
  Network,
  Terminal,
  Globe,
  Key,
  Lock,
  Cpu,
  AlertTriangle,
  Mail,
  EyeOff,
  Radio,
  Wifi,
  ChevronRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';

interface LearnScreenProps {
  language: Language;
  onOpenLesson: (lesson: Lesson) => void;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  ShieldCheck: Shield,
  Network: Network,
  Terminal: Terminal,
  Globe: Globe,
  Key: Key,
  Lock: Lock,
  Cpu: Cpu,
  AlertTriangle: AlertTriangle,
  Mail: Mail,
  EyeOff: EyeOff,
  Radio: Radio,
  Wifi: Wifi,
};

export const LearnScreen: React.FC<LearnScreenProps> = ({ language, onOpenLesson }) => {
  const isArabic = language === 'ar';
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(1);
  const lessonProgress = StorageService.getLessonProgress();

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Beginner':
        return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
      case 'Intermediate':
        return 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10';
      case 'Advanced':
        return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
      default:
        return 'text-slate-400 border-slate-700 bg-slate-800';
    }
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-white">
          {isArabic ? 'مسارات الأكاديمية السيبرانية' : 'Cybersecurity Learning Paths'}
        </h2>
        <p className="text-xs text-slate-400">
          {isArabic
            ? '12 مساراً تعليمياً شاملاً مع تدريبات عملية واختبارات معرفية دون اتصال'
            : '12 core domains with practical exercises, knowledge checks, and offline persistence.'}
        </p>
      </div>

      {/* Categories List */}
      <div className="space-y-2.5">
        {SEED_CATEGORIES.map((cat) => {
          const Icon = ICON_MAP[cat.iconName] || Shield;
          const isSelected = selectedCategoryId === cat.id;
          const catLessons = SEED_LESSONS.filter(l => l.categoryId === cat.id);
          const completedCount = catLessons.filter(l => lessonProgress[l.id]?.status === 'COMPLETED').length;

          return (
            <div
              key={cat.id}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isSelected
                  ? 'bg-slate-900 border-emerald-500/50 shadow-md shadow-emerald-500/10'
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Category Header Row */}
              <button
                onClick={() => setSelectedCategoryId(isSelected ? null : cat.id)}
                className="w-full p-4 flex items-center justify-between text-left rtl:text-right cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-800 text-emerald-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">
                        {isArabic ? cat.titleAr : cat.titleEn}
                      </span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getDifficultyColor(cat.difficulty)}`}>
                        {cat.difficulty}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                      {isArabic ? cat.descriptionAr : cat.descriptionEn}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] font-mono text-slate-400">
                    {completedCount}/{catLessons.length}
                  </span>
                  <ChevronRight
                    className={`w-4 h-4 text-slate-500 transition-transform ${isSelected ? 'rotate-90 rtl:-rotate-90' : 'rtl:rotate-180'}`}
                  />
                </div>
              </button>

              {/* Expanded Lessons Drawer */}
              {isSelected && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-800/80 bg-slate-950/40 space-y-2">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider pt-1">
                    {isArabic ? 'الدروس المتاحة' : 'Lessons in this Domain'}
                  </div>

                  {catLessons.length === 0 ? (
                    <div className="p-3 text-xs text-slate-400 bg-slate-900/60 rounded-xl border border-slate-800/80">
                      {isArabic
                        ? 'المزيد من المحتوى التعليمي متاح في التحديثات القادمة.'
                        : 'Foundational modules active; advanced drills unlocked in next unit.'}
                    </div>
                  ) : (
                    catLessons.map((lesson) => {
                      const isCompleted = lessonProgress[lesson.id]?.status === 'COMPLETED';

                      return (
                        <div
                          key={lesson.id}
                          onClick={() => onOpenLesson(lesson)}
                          className="flex items-center justify-between p-3 rounded-xl bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/40 transition-colors cursor-pointer group"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                              {isCompleted ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              ) : (
                                <BookOpen className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400" />
                              )}
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                                {isArabic ? lesson.titleAr : lesson.titleEn}
                              </h4>
                              <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {lesson.estimatedMinutes} {isArabic ? 'دقائق' : 'min'}
                                </span>
                                <span>·</span>
                                <span className="font-semibold text-emerald-400">+50 XP</span>
                              </div>
                            </div>
                          </div>

                          <span className={`text-[11px] font-medium px-2 py-1 rounded-lg ${
                            isCompleted
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-slate-800 text-slate-300 group-hover:bg-emerald-500 group-hover:text-slate-950 font-semibold'
                          }`}>
                            {isCompleted
                              ? (isArabic ? 'مكتمل' : 'Completed')
                              : (isArabic ? 'اقرأ' : 'Read')}
                          </span>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
