import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { CryptoService } from '../services/cryptoService';
import { FlaskConical, Hash, Key, Mail, Globe, Shield, Sparkles, Copy, Check } from 'lucide-react';

interface SecurityLabScreenProps {
  language: Language;
}

export const SecurityLabScreen: React.FC<SecurityLabScreenProps> = ({ language }) => {
  const isArabic = language === 'ar';
  const [activeTool, setActiveTool] = useState<'entropy' | 'hash' | 'url' | 'email'>('entropy');

  // Tool 1: Password Entropy State
  const [passwordInput, setPasswordInput] = useState('CyberShield#2026!');
  const entropyData = CryptoService.calculateEntropy(passwordInput);

  // Tool 2: Cryptographic Hash State
  const [hashInput, setHashInput] = useState('CyberGuard Offline Academy');
  const [hashOutput, setHashOutput] = useState('');
  const [copiedHash, setCopiedHash] = useState(false);

  useEffect(() => {
    CryptoService.sha256(hashInput).then(setHashOutput);
  }, [hashInput]);

  const handleCopyHash = () => {
    navigator.clipboard.writeText(hashOutput);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  // Tool 3: URL Deception Scanner State
  const [urlInput, setUrlInput] = useState('https://secure-login.bank.com.auth-portal.top/verification');
  const urlAnalysis = CryptoService.analyzeUrl(urlInput);

  // Tool 4: Phishing Header Analyzer State
  const [headerScenario, setHeaderScenario] = useState<'suspicious' | 'legit'>('suspicious');

  return (
    <div className="space-y-4 pb-20">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <FlaskConical className="w-5 h-5 text-emerald-400" />
          <span>{isArabic ? 'مختبر الأمان الرقمي' : 'Offline Security Laboratory'}</span>
        </h2>
        <p className="text-xs text-slate-400">
          {isArabic
            ? 'أدوات تفاعلية تعمل 100% محلياً على جهازك دون إرسال أي بيانات لأي خادم'
            : 'Interactive local cryptographic and threat inspection utilities running strictly offline.'}
        </p>
      </div>

      {/* Tool Navigation Tabs */}
      <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800">
        <button
          onClick={() => setActiveTool('entropy')}
          className={`py-2 px-1 text-[11px] font-semibold rounded-lg transition-colors cursor-pointer text-center ${
            activeTool === 'entropy'
              ? 'bg-emerald-500 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {isArabic ? 'الإنتروبيا' : 'Entropy'}
        </button>
        <button
          onClick={() => setActiveTool('hash')}
          className={`py-2 px-1 text-[11px] font-semibold rounded-lg transition-colors cursor-pointer text-center ${
            activeTool === 'hash'
              ? 'bg-emerald-500 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {isArabic ? 'التجزئة' : 'Hash'}
        </button>
        <button
          onClick={() => setActiveTool('url')}
          className={`py-2 px-1 text-[11px] font-semibold rounded-lg transition-colors cursor-pointer text-center ${
            activeTool === 'url'
              ? 'bg-emerald-500 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {isArabic ? 'الروابط' : 'URL Scan'}
        </button>
        <button
          onClick={() => setActiveTool('email')}
          className={`py-2 px-1 text-[11px] font-semibold rounded-lg transition-colors cursor-pointer text-center ${
            activeTool === 'email'
              ? 'bg-emerald-500 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {isArabic ? 'الترويسات' : 'Headers'}
        </button>
      </div>

      {/* TOOL 1: Password Entropy Analyzer */}
      {activeTool === 'entropy' && (
        <div className="rounded-2xl p-4 bg-slate-900 border border-slate-800 space-y-4">
          <div>
            <span className="text-xs font-semibold text-emerald-400">
              {isArabic ? 'مقياس شانون الرياضي' : 'Shannon Mathematical Formula'}
            </span>
            <h3 className="text-base font-bold text-white">
              {isArabic ? 'محلل إنتروبيا وقوة كلمة المرور' : 'Password Entropy & Strength Meter'}
            </h3>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-slate-300 font-medium">
              {isArabic ? 'أدخل كلمة مرور للاختبار الفوري:' : 'Enter test password:'}
            </label>
            <input
              type="text"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
              placeholder="e.g. CorrectHorse#Battery99"
            />
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">
                {isArabic ? 'الإنتروبيا المقدرة' : 'Calculated Entropy'}
              </span>
              <span className="text-xl font-bold font-mono text-emerald-400">
                {entropyData.bits} <span className="text-xs text-slate-400">bits</span>
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">
                {isArabic ? 'تقدير وقت الكسر' : 'Brute Force Time'}
              </span>
              <span className="text-xs font-bold text-cyan-400 line-clamp-1 mt-1">
                {entropyData.crackTime}
              </span>
            </div>
          </div>

          {/* Character pool indicators */}
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs space-y-2">
            <span className="text-slate-400 block font-semibold">
              {isArabic ? 'تنوع المحارف ومجموعة الرموز (Pool Size):' : 'Active Character Sets:'}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              <span className={`px-2 py-1 rounded border text-center ${/[a-z]/.test(passwordInput) ? 'bg-emerald-950 text-emerald-300 border-emerald-800' : 'bg-slate-900 text-slate-500 border-slate-800'}`}>
                a-z (26)
              </span>
              <span className={`px-2 py-1 rounded border text-center ${/[A-Z]/.test(passwordInput) ? 'bg-emerald-950 text-emerald-300 border-emerald-800' : 'bg-slate-900 text-slate-500 border-slate-800'}`}>
                A-Z (26)
              </span>
              <span className={`px-2 py-1 rounded border text-center ${/[0-9]/.test(passwordInput) ? 'bg-emerald-950 text-emerald-300 border-emerald-800' : 'bg-slate-900 text-slate-500 border-slate-800'}`}>
                0-9 (10)
              </span>
              <span className={`px-2 py-1 rounded border text-center ${/[^a-zA-Z0-9]/.test(passwordInput) ? 'bg-emerald-950 text-emerald-300 border-emerald-800' : 'bg-slate-900 text-slate-500 border-slate-800'}`}>
                Special (33)
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 2: Cryptographic Hash Sandbox */}
      {activeTool === 'hash' && (
        <div className="rounded-2xl p-4 bg-slate-900 border border-slate-800 space-y-4">
          <div>
            <span className="text-xs font-semibold text-emerald-400">
              {isArabic ? 'دوال الاتجاه الواحد' : 'One-Way Cryptographic Functions'}
            </span>
            <h3 className="text-base font-bold text-white">
              {isArabic ? 'مولد التجزئة ومحاكي الانهيار الثلجي (SHA-256)' : 'SHA-256 Hash & Avalanche Demonstrator'}
            </h3>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-slate-300 font-medium">
              {isArabic ? 'النص المدخل (جرب تغيير حرف واحد لملاحظة التغير الجذري):' : 'Input plaintext payload:'}
            </label>
            <input
              type="text"
              value={hashInput}
              onChange={(e) => setHashInput(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>SHA-256 Digest (256-bit / 64 Hex Characters):</span>
              <button
                onClick={handleCopyHash}
                className="flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 cursor-pointer font-semibold"
              >
                {copiedHash ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedHash ? (isArabic ? 'تم النسخ' : 'Copied') : (isArabic ? 'نسخ التجزئة' : 'Copy Hash')}</span>
              </button>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400 break-all select-all">
              {hashOutput || 'Computing...'}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 leading-relaxed">
            <span className="font-semibold text-white block mb-0.5">
              {isArabic ? 'مبدأ الانهيار الثلجي (Avalanche Effect):' : 'The Avalanche Effect:'}
            </span>
            {isArabic
              ? 'في دوال التجزئة الآمنة مثل SHA-256، يؤدي تغيير بت واحد في المدخل إلى تغيير عشوائي لأكثر من 50% من بتات التجزئة الناتجة، مما يمنع التنبؤ العكسي تماماً.'
              : 'In cryptographic hash functions, flipping a single input bit cascades into an unpredictable change across >50% of the output digest.'}
          </div>
        </div>
      )}

      {/* TOOL 3: URL Anatomy Scanner */}
      {activeTool === 'url' && (
        <div className="rounded-2xl p-4 bg-slate-900 border border-slate-800 space-y-4">
          <div>
            <span className="text-xs font-semibold text-emerald-400">
              {isArabic ? 'تشريح الروابط الخادعة' : 'Deception Deconstructor'}
            </span>
            <h3 className="text-base font-bold text-white">
              {isArabic ? 'ماسح وفاحص بنية الروابط الإلكترونية' : 'URL Anatomy & Threat Scanner'}
            </h3>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-slate-300 font-medium">
              {isArabic ? 'أدخل رابطاً للفحص والتحليل:' : 'Enter URL to analyze:'}
            </label>
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* URL Breakdown */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/80">
              <span className="text-slate-500">Protocol:</span>
              <span className={urlAnalysis.isHttps ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                {urlAnalysis.protocol || 'None'}
              </span>
            </div>
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/80">
              <span className="text-slate-500">Hostname / Domain:</span>
              <span className="text-white font-bold">{urlAnalysis.hostname || 'None'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Path Destination:</span>
              <span className="text-slate-300">{urlAnalysis.pathname || '/'}</span>
            </div>
          </div>

          {/* Threat Flags */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-300">
              {isArabic ? 'مؤشرات الأمان والمخاطر المكتشفة:' : 'Evaluated Security Findings:'}
            </span>
            {urlAnalysis.flags.length === 0 ? (
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300">
                {isArabic ? 'لا توجد مؤشرات شائعة للخداع في هذا الرابط.' : 'No overt deception indicators detected.'}
              </div>
            ) : (
              <div className="space-y-1.5">
                {urlAnalysis.flags.map((flag, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-red-950/50 border border-red-800 text-xs text-red-200 flex items-start gap-2">
                    <span className="text-red-400 font-bold">!</span>
                    <span>{flag}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TOOL 4: Phishing Header Inspector */}
      {activeTool === 'email' && (
        <div className="rounded-2xl p-4 bg-slate-900 border border-slate-800 space-y-4">
          <div>
            <span className="text-xs font-semibold text-emerald-400">
              {isArabic ? 'تدقيق الترويسات الخام' : 'Raw Email Header Forensics'}
            </span>
            <h3 className="text-base font-bold text-white">
              {isArabic ? 'فاحص ترويسات البريد الإلكتروني (SPF / DKIM / DMARC)' : 'Email Header Forensics Inspector'}
            </h3>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setHeaderScenario('suspicious')}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold cursor-pointer ${
                headerScenario === 'suspicious'
                  ? 'bg-red-950 text-red-300 border border-red-800'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {isArabic ? 'نموذج ترويسة مخترقة / مزورة' : 'Spoofed Phishing Sample'}
            </button>
            <button
              onClick={() => setHeaderScenario('legit')}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold cursor-pointer ${
                headerScenario === 'legit'
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {isArabic ? 'نموذج ترويسة رسمية موثقة' : 'Authentic Signed Sample'}
            </button>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] space-y-1.5 text-slate-300 overflow-x-auto">
            {headerScenario === 'suspicious' ? (
              <>
                <div><span className="text-slate-500">Delivered-To:</span> victim@company.com</div>
                <div><span className="text-slate-500">From:</span> "CEO Office" &lt;ceo@company-verify-cloud.com&gt;</div>
                <div><span className="text-slate-500">Return-Path:</span> &lt;bounce-handler@compromised-host.ru&gt;</div>
                <div><span className="text-red-400 font-bold">Authentication-Results:</span> spf=fail smtp.mailfrom=company.com</div>
                <div><span className="text-red-400 font-bold">DKIM-Signature:</span> none (Missing cryptographic signature)</div>
                <div><span className="text-red-400 font-bold">DMARC:</span> fail action=none</div>
              </>
            ) : (
              <>
                <div><span className="text-slate-500">Delivered-To:</span> user@company.com</div>
                <div><span className="text-slate-500">From:</span> "IT Support" &lt;support@company.com&gt;</div>
                <div><span className="text-slate-500">Return-Path:</span> &lt;support@company.com&gt;</div>
                <div><span className="text-emerald-400 font-bold">Authentication-Results:</span> spf=pass (IP authorized in TXT record)</div>
                <div><span className="text-emerald-400 font-bold">DKIM:</span> pass header.i=@company.com</div>
                <div><span className="text-emerald-400 font-bold">DMARC:</span> pass (p=reject sp=reject)</div>
              </>
            )}
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
            <span className="font-semibold text-white block mb-1">
              {isArabic ? 'الشرح والتحليل الجنائي:' : 'Forensic Breakdown:'}
            </span>
            {headerScenario === 'suspicious'
              ? (isArabic
                ? 'فشل اختبار SPF و DMARC يدل على أن الخادم الذي أرسل هذه الرسالة ليس مصرحاً له من قبل مالك النطاق الأصلي، مما يؤكد انتحال الهوية.'
                : 'SPF and DMARC failures prove the originating IP is NOT authorized by the domain owner. This is an explicit spoofing indicator.')
              : (isArabic
                ? 'اجتياز SPF و DKIM يثبت أن الرسالة مشفرة بمفتاح النطاق الرسمي ومصرح لها من قبل خوادم البريد المعتمدة.'
                : 'Cryptographic DKIM signature matches the public key published in the domain DNS records, confirming integrity and authenticity.')}
          </div>
        </div>
      )}
    </div>
  );
};
