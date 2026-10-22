import React, { useState } from 'react';
import { Challenge, Language } from '../types';
import { SEED_CHALLENGES } from '../data/seedData';
import { StorageService } from '../services/storageService';
import { CryptoService } from '../services/cryptoService';
import { ShieldAlert, Mail, Globe, Key, CheckCircle, AlertTriangle, ArrowRight, Award, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ChallengesScreenProps {
  language: Language;
  onChallengeCompleted: () => void;
}

export const ChallengesScreen: React.FC<ChallengesScreenProps> = ({ language, onChallengeCompleted }) => {
  const isArabic = language === 'ar';
  const [activeChallengeId, setActiveChallengeId] = useState<number>(1);
  const challengeProgress = StorageService.getChallengeProgress();

  // Challenge 1: Phishing Email State
  const [phishingAnswer, setPhishingAnswer] = useState<'phish' | 'legit' | null>(null);
  const [phishingSubmitted, setPhishingSubmitted] = useState(false);

  // Challenge 2: URL Scanner State
  const [selectedUrlIdx, setSelectedUrlIdx] = useState<number | null>(null);
  const [urlSubmitted, setUrlSubmitted] = useState(false);

  // Challenge 3: Password Entropy State
  const [entropyPass, setEntropyPass] = useState('My#Secure&Shield2026!');
  const [entropySuccess, setEntropySuccess] = useState(false);

  const activeChallenge = SEED_CHALLENGES.find(c => c.id === activeChallengeId) || SEED_CHALLENGES[0];
  const isCurrentCompleted = challengeProgress[activeChallenge.id]?.status === 'COMPLETED';

  // Handle Phishing submission
  const handleSubmitPhishing = (choice: 'phish' | 'legit') => {
    setPhishingAnswer(choice);
    setPhishingSubmitted(true);
    const isCorrect = choice === 'phish';
    if (isCorrect) {
      StorageService.completeChallenge(1, 100, 50, SEED_CHALLENGES[0].titleEn, SEED_CHALLENGES[0].titleAr);
      confetti({ particleCount: 40, spread: 50 });
      onChallengeCompleted();
    }
  };

  // Handle URL selection
  const handleSelectUrl = (idx: number) => {
    setSelectedUrlIdx(idx);
    setUrlSubmitted(true);
    const isCorrect = activeChallenge.payload.options[idx].isLegit;
    if (isCorrect) {
      StorageService.completeChallenge(2, 100, 60, SEED_CHALLENGES[1].titleEn, SEED_CHALLENGES[1].titleAr);
      confetti({ particleCount: 40, spread: 50 });
      onChallengeCompleted();
    }
  };

  // Handle Entropy evaluation
  const entropyInfo = CryptoService.calculateEntropy(entropyPass);
  const handleCheckEntropy = () => {
    if (entropyInfo.bits >= 80) {
      setEntropySuccess(true);
      StorageService.completeChallenge(3, 100, 50, SEED_CHALLENGES[2].titleEn, SEED_CHALLENGES[2].titleAr);
      confetti({ particleCount: 50, spread: 60 });
      onChallengeCompleted();
    }
  };

  return (
    <div className="space-y-4 pb-20">
      <div>
        <h2 className="text-xl font-bold text-white">
          {isArabic ? 'التحديات التكتيكية الميدانية' : 'Practical Tactical Challenges'}
        </h2>
        <p className="text-xs text-slate-400">
          {isArabic
            ? 'سيناريوهات آمنة 100% تعمل محلياً دون أي اتصال بالإنترنت أو المساس بالأنظمة'
            : 'Safe offline simulated environments to test real security analysis skills.'}
        </p>
      </div>

      {/* Challenge Selector Tabs */}
      <div className="grid grid-cols-3 gap-2">
        {SEED_CHALLENGES.map((ch) => {
          const isDone = challengeProgress[ch.id]?.status === 'COMPLETED';
          const isSelected = activeChallengeId === ch.id;

          return (
            <button
              key={ch.id}
              onClick={() => {
                setActiveChallengeId(ch.id);
                setPhishingSubmitted(false);
                setUrlSubmitted(false);
              }}
              className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 border-emerald-500 text-white shadow-md shadow-emerald-500/10'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-center gap-1 mb-1">
                {isDone && <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />}
                <span className="text-xs font-bold font-mono">#{ch.id}</span>
              </div>
              <span className="text-[11px] font-semibold block truncate">
                {isArabic ? ch.titleAr.split(' ')[0] : ch.titleEn.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Challenge Body */}
      <div className="rounded-2xl p-4 bg-slate-900 border border-slate-800 space-y-4">
        {/* Challenge Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">
              {activeChallenge.difficulty} · +{activeChallenge.xpReward} XP
            </span>
            <h3 className="text-base font-bold text-white">
              {isArabic ? activeChallenge.titleAr : activeChallenge.titleEn}
            </h3>
          </div>
          {isCurrentCompleted && (
            <span className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-lg font-semibold">
              <CheckCircle className="w-3.5 h-3.5" />
              {isArabic ? 'تم الحل' : 'Solved'}
            </span>
          )}
        </div>

        {/* Instructions */}
        <p className="text-xs text-slate-300">
          {isArabic ? activeChallenge.instructionsAr : activeChallenge.instructionsEn}
        </p>

        {/* Challenge #1: Phishing Email Inspection */}
        {activeChallenge.id === 1 && (
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-2">
              <div className="text-slate-400">
                <span className="text-slate-500">From: </span>
                <span className="text-amber-300 font-semibold">{activeChallenge.payload.fromName}</span>{' '}
                &lt;{activeChallenge.payload.fromEmail}&gt;
              </div>
              <div className="text-slate-400">
                <span className="text-slate-500">Subject: </span>
                <span className="text-white font-semibold">{activeChallenge.payload.subject}</span>
              </div>
              <div className="text-slate-400 flex items-center gap-2">
                <span className="text-slate-500">Attachment: </span>
                <span className="text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-800/80">
                  {activeChallenge.payload.attachment}
                </span>
              </div>
              <div className="pt-2 text-slate-300 whitespace-pre-line border-t border-slate-800/80 font-sans text-xs">
                {activeChallenge.payload.body}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                disabled={phishingSubmitted}
                onClick={() => handleSubmitPhishing('phish')}
                className="py-2.5 px-3 rounded-xl bg-red-950/60 hover:bg-red-900/60 text-red-200 border border-red-800 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ShieldAlert className="w-4 h-4 text-red-400" />
                <span>{isArabic ? 'تصيد احتيالي (خبيث)' : 'Flag as Malicious Phishing'}</span>
              </button>
              <button
                disabled={phishingSubmitted}
                onClick={() => handleSubmitPhishing('legit')}
                className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{isArabic ? 'بريد سليم رسمي' : 'Legitimate Official Email'}</span>
              </button>
            </div>

            {phishingSubmitted && (
              <div className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                phishingAnswer === 'phish'
                  ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-200'
                  : 'bg-red-950/50 border-red-500/50 text-red-200'
              }`}>
                <span className="font-bold block">
                  {phishingAnswer === 'phish'
                    ? (isArabic ? 'صحيح تماماً! مؤشرات الخطر المكتشفة:' : 'Accurate Detection! Red flags found:')
                    : (isArabic ? 'خطر! هذا بريد خبيث واضح للأسباب التالية:' : 'Critical oversight! This email is phishing because:')}
                </span>
                <ul className="list-disc list-inside space-y-0.5 text-[11px] opacity-90">
                  {activeChallenge.payload.flags.map((flag: string, i: number) => (
                    <li key={i}>{flag}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Challenge #2: URL Deception Scanner */}
        {activeChallenge.id === 2 && (
          <div className="space-y-3">
            <div className="space-y-2">
              {activeChallenge.payload.options.map((opt: any, idx: number) => {
                const isSelected = selectedUrlIdx === idx;
                let cardColor = 'bg-slate-950 border-slate-800 hover:border-slate-700';
                if (urlSubmitted) {
                  if (opt.isLegit) cardColor = 'bg-emerald-950/70 border-emerald-500';
                  else if (isSelected && !opt.isLegit) cardColor = 'bg-red-950/70 border-red-500';
                }

                return (
                  <button
                    key={idx}
                    disabled={urlSubmitted}
                    onClick={() => handleSelectUrl(idx)}
                    className={`w-full p-3 rounded-xl border text-left rtl:text-right font-mono text-xs transition-all cursor-pointer ${cardColor}`}
                  >
                    <div className="text-slate-200 break-all">{opt.url}</div>
                    {urlSubmitted && (
                      <div className="text-[11px] font-sans mt-1.5 text-slate-300">
                        {opt.reason}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Challenge #3: Password Entropy */}
        {activeChallenge.id === 3 && (
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400">
                {isArabic ? 'اكتب عبارة مرور معقدة لاختبار إنتروبيا 80+ بت:' : 'Enter passphrase to reach 80+ bits:'}
              </label>
              <input
                type="text"
                value={entropyPass}
                onChange={(e) => {
                  setEntropyPass(e.target.value);
                  setEntropySuccess(false);
                }}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block">
                  {isArabic ? 'الإنتروبيا المقدرة' : 'Current Entropy'}
                </span>
                <span className="text-base font-bold font-mono text-emerald-400">
                  {entropyInfo.bits} bits
                </span>
              </div>
              <div className="text-right rtl:text-left">
                <span className="text-[10px] text-slate-400 block">
                  {isArabic ? 'مستوى التعقيد' : 'Estimated Strength'}
                </span>
                <span className="text-xs font-semibold text-cyan-400">{entropyInfo.strength}</span>
              </div>
            </div>

            <button
              onClick={handleCheckEntropy}
              disabled={entropyInfo.bits < 80}
              className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                entropyInfo.bits >= 80
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <span>{isArabic ? 'التحقق ومنح النقاط (80+ بت)' : 'Validate Passphrase (80+ bits)'}</span>
            </button>

            {entropySuccess && (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/60 text-emerald-200 text-xs">
                {isArabic
                  ? 'رائع! حققت عبارة المرور مستوى أمان فائق يتطلب ملايين السنين لكسره بالقوة الغاشمة.'
                  : 'Success! Your passphrase achieves quantum-resilient entropy resistant to modern GPU cracking.'}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
