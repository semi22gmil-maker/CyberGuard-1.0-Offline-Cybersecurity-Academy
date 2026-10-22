import React, { useState } from 'react';
import { QuizQuestion, Language } from '../types';
import { SEED_QUIZZES } from '../data/seedData';
import { StorageService } from '../services/storageService';
import { X, CheckCircle, AlertCircle, ArrowRight, RotateCcw, Award, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizModalProps {
  lessonId: number;
  language: Language;
  onClose: () => void;
  onQuizFinished: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  lessonId,
  language,
  onClose,
  onQuizFinished,
}) => {
  const isArabic = language === 'ar';
  const questions = SEED_QUIZZES.filter(q => q.lessonId === lessonId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [totalXpEarned, setTotalXpEarned] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (questions.length === 0) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full text-center space-y-4">
          <p className="text-sm text-slate-300">
            {isArabic ? 'لا توجد أسئلة مسجلة لهذا الدرس حالياً.' : 'No quizzes registered for this lesson yet.'}
          </p>
          <button
            onClick={onClose}
            className="w-full py-2 bg-emerald-500 rounded-xl text-slate-950 font-bold text-xs"
          >
            {isArabic ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const options = isArabic ? currentQuestion.optionsAr : currentQuestion.optionsEn;
  const questionText = isArabic ? currentQuestion.questionAr : currentQuestion.questionEn;
  const explanation = isArabic ? currentQuestion.explanationAr : currentQuestion.explanationEn;

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === currentQuestion.correctOptionIndex;
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
      setTotalScore(prev => prev + currentQuestion.points);
    }

    const { xpEarned } = StorageService.recordQuizAttempt(
      currentQuestion.id,
      lessonId,
      index,
      isCorrect,
      currentQuestion.points
    );
    setTotalXpEarned(prev => prev + xpEarned);

    if (isCorrect) {
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.6 },
      });
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      onQuizFinished();
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setTotalScore(0);
    setTotalXpEarned(0);
    setCorrectCount(0);
    setIsFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex flex-col justify-end sm:justify-center items-center sm:p-4">
      <div className="w-full sm:max-w-xl bg-slate-900 border border-slate-800 sm:rounded-3xl rounded-t-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white">
              {isArabic ? 'الاختبار المعرفي' : 'Knowledge Check'}
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-xs font-mono text-emerald-400">
              {currentIndex + 1} / {questions.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        {!isFinished ? (
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {/* Question Type Tag */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                {currentQuestion.questionType.replace('_', ' ')}
              </span>
              <span className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" />
                +{currentQuestion.points} XP
              </span>
            </div>

            {/* Question Heading */}
            <h3 className="text-base font-bold text-white leading-snug">
              {questionText}
            </h3>

            {/* Answer Options */}
            <div className="space-y-2 pt-2">
              {options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrectOption = idx === currentQuestion.correctOptionIndex;

                let optionStyle = 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-200';
                if (isAnswered) {
                  if (isCorrectOption) {
                    optionStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold';
                  } else if (isSelected) {
                    optionStyle = 'bg-red-950/60 border-red-500 text-red-200';
                  } else {
                    optionStyle = 'bg-slate-900/40 border-slate-800/40 text-slate-500 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-3.5 rounded-xl border text-xs text-left rtl:text-right flex items-start gap-2.5 transition-all cursor-pointer ${optionStyle}`}
                  >
                    <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center shrink-0 font-mono text-[11px] font-bold">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1 pt-0.5">{opt}</span>
                    {isAnswered && isCorrectOption && (
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    )}
                    {isAnswered && isSelected && !isCorrectOption && (
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation Card */}
            {isAnswered && (
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 animate-in fade-in duration-150 space-y-1">
                <span className="text-xs font-bold text-white block">
                  {selectedOption === currentQuestion.correctOptionIndex
                    ? (isArabic ? 'إجابة صحيحة ممتازة!' : 'Correct! Great reasoning.')
                    : (isArabic ? 'إجابة خاطئة — الشرح التكتيكي:' : 'Incorrect — Explanatory Insight:')}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">{explanation}</p>
              </div>
            )}
          </div>
        ) : (
          /* Results View */
          <div className="flex-1 p-6 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-1">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">
              {isArabic ? 'اكتمل الاختبار بنجاح!' : 'Quiz Completed!'}
            </h3>
            <p className="text-xs text-slate-400 max-w-xs">
              {isArabic
                ? 'تم تسجيل نتائجك وحساب نقاط الخبرة في قاعدة البيانات المحلية بأمان.'
                : 'Your attempts and XP score are safely stored in local device storage.'}
            </p>

            <div className="grid grid-cols-3 gap-2 w-full max-w-sm py-2">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-base font-bold font-mono text-emerald-400">
                  {correctCount}/{questions.length}
                </div>
                <div className="text-[10px] text-slate-400">{isArabic ? 'الصحيحة' : 'Correct'}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-base font-bold font-mono text-cyan-400">
                  {Math.round((correctCount / questions.length) * 100)}%
                </div>
                <div className="text-[10px] text-slate-400">{isArabic ? 'الدقة' : 'Accuracy'}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-base font-bold font-mono text-amber-400">
                  +{totalXpEarned}
                </div>
                <div className="text-[10px] text-slate-400">{isArabic ? 'نقاط جديدة' : 'New XP'}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full max-w-sm pt-2">
              <button
                onClick={handleRestart}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{isArabic ? 'إعادة المحاولة' : 'Retry'}</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-emerald-500/20"
              >
                <span>{isArabic ? 'إنهاء وحفظ' : 'Finish & Save'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Footer Next Button */}
        {!isFinished && isAnswered && (
          <div className="p-4 border-t border-slate-800 bg-slate-950/80">
            <button
              onClick={handleNext}
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-500/20"
            >
              <span>
                {currentIndex + 1 < questions.length
                  ? (isArabic ? 'السؤال التالي' : 'Next Question')
                  : (isArabic ? 'عرض النتائج والتقييم' : 'View Final Results')}
              </span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
