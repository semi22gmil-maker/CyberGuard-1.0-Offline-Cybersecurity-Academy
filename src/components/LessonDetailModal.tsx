import React, { useState, useEffect } from 'react';
import { Lesson, Language } from '../types';
import { StorageService } from '../services/storageService';
import { SEED_CATEGORIES, SEED_QUIZZES } from '../data/seedData';
import { X, Bookmark, BookmarkCheck, CheckCircle2, Award, Clock, ArrowRight, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LessonDetailModalProps {
  lesson: Lesson;
  language: Language;
  onClose: () => void;
  onStartQuiz: (lessonId: number) => void;
  onProgressUpdated: () => void;
}

export const LessonDetailModal: React.FC<LessonDetailModalProps> = ({
  lesson,
  language,
  onClose,
  onStartQuiz,
  onProgressUpdated,
}) => {
  const isArabic = language === 'ar';
  const category = SEED_CATEGORIES.find(c => c.id === lesson.categoryId);
  const quiz = SEED_QUIZZES.find(q => q.lessonId === lesson.id);

  const [isCompleted, setIsCompleted] = useState<boolean>(() => {
    return StorageService.getLessonProgress()[lesson.id]?.status === 'COMPLETED';
  });

  const [isFavorite, setIsFavorite] = useState<boolean>(() => {
    return StorageService.getFavorites().some(f => f.type === 'LESSON' && f.id === lesson.id);
  });

  const handleToggleFavorite = () => {
    const nextState = StorageService.toggleFavorite('LESSON', lesson.id);
    setIsFavorite(nextState);
  };

  const handleMarkCompleted = () => {
    const res = StorageService.markLessonCompleted(lesson.id, lesson.titleEn, lesson.titleAr, 50);
    setIsCompleted(true);
    if (res.xpEarned > 0) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    }
    onProgressUpdated();
  };

  // Render markdown-like sections cleanly
  const rawContent = isArabic ? lesson.contentAr : lesson.contentEn;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex flex-col justify-end sm:justify-center items-center sm:p-4">
      <div className="w-full sm:max-w-2xl bg-slate-900 border border-slate-800 sm:rounded-3xl rounded-t-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom duration-200">
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-900/90 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-emerald-400">
              {isArabic ? category?.titleAr : category?.titleEn}
            </span>
            <span className="text-slate-600">·</span>
            <span className="flex items-center gap-1 text-[11px] text-slate-400">
              <Clock className="w-3 h-3" />
              {lesson.estimatedMinutes} {isArabic ? 'دقائق' : 'min'}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleToggleFavorite}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Bookmark Lesson"
            >
              {isFavorite ? (
                <BookmarkCheck className="w-4 h-4 text-emerald-400" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Reader Content */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4 text-slate-200 text-sm leading-relaxed">
          <h1 className="text-xl font-extrabold text-white">
            {isArabic ? lesson.titleAr : lesson.titleEn}
          </h1>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
            <span className="font-semibold text-emerald-400 block mb-1">
              {isArabic ? 'ملخص الدرس السريع:' : 'Executive Summary:'}
            </span>
            {isArabic ? lesson.descriptionAr : lesson.descriptionEn}
          </div>

          <div className="prose prose-invert prose-sm max-w-none space-y-3 whitespace-pre-line font-sans">
            {rawContent}
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex flex-col sm:flex-row items-center gap-2.5">
          <button
            onClick={handleMarkCompleted}
            disabled={isCompleted}
            className={`w-full sm:flex-1 py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isCompleted
                ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20 active:scale-[0.98]'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>
              {isCompleted
                ? (isArabic ? 'تم إكمال الدرس (+50 XP)' : 'Lesson Completed (+50 XP)')
                : (isArabic ? 'تحديد كمكتمل (+50 XP)' : 'Mark as Completed (+50 XP)')}
            </span>
          </button>

          {quiz && (
            <button
              onClick={() => onStartQuiz(lesson.id)}
              className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-cyan-600/20 cursor-pointer active:scale-[0.98] transition-all"
            >
              <HelpCircle className="w-4 h-4" />
              <span>{isArabic ? 'بدء الاختبار المعرفي' : 'Take Knowledge Quiz'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
