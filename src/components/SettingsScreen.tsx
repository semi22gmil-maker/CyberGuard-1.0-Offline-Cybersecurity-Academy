import React, { useState } from 'react';
import { UserProfile, Language } from '../types';
import { StorageService } from '../services/storageService';
import { Settings, Globe, Moon, Sun, Download, Upload, Trash2, Database, ShieldCheck, AlertTriangle } from 'lucide-react';

interface SettingsScreenProps {
  profile: UserProfile;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onSettingsUpdated: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  profile,
  language,
  onLanguageChange,
  onSettingsUpdated,
}) => {
  const isArabic = language === 'ar';
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleExportJson = () => {
    const json = StorageService.exportAllProgressJson();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cyberguard_progress_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = StorageService.importProgressJson(content);
      if (success) {
        setImportStatus(isArabic ? 'تم استيراد البيانات بنجاح!' : 'Data imported successfully!');
        onSettingsUpdated();
      } else {
        setImportStatus(isArabic ? 'خطأ في تنسيق الملف.' : 'Invalid backup JSON file.');
      }
      setTimeout(() => setImportStatus(null), 3000);
    };
    reader.readAsText(file);
  };

  const handleConfirmReset = () => {
    StorageService.resetUserProgress();
    setShowResetConfirm(false);
    onSettingsUpdated();
  };

  return (
    <div className="space-y-4 pb-20">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-emerald-400" />
          <span>{isArabic ? 'الإعدادات وإدارة البيانات' : 'Settings & Local Data Management'}</span>
        </h2>
        <p className="text-xs text-slate-400">
          {isArabic
            ? 'التحكم في لغة التطبيق، المظهر، والنسخ الاحتياطي المحلي لقاعدة البيانات'
            : 'Configure language, appearance, and local offline data backups.'}
        </p>
      </div>

      {/* Language Section */}
      <div className="rounded-2xl p-4 bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-white">
          <Globe className="w-4 h-4 text-emerald-400" />
          <span>{isArabic ? 'لغة التطبيق واتجاه الواجهة' : 'Language & Layout Direction'}</span>
        </div>
        <p className="text-xs text-slate-400">
          {isArabic
            ? 'يدعم سايبر جارد التبديل الفوري الكامل بين الإنجليزية والعربية مع ضبط الاتجاه (RTL).'
            : 'Full bilingual support with instant RTL alignment adaptation.'}
        </p>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onLanguageChange('en')}
            className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              language === 'en'
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            English (LTR)
          </button>
          <button
            onClick={() => onLanguageChange('ar')}
            className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              language === 'ar'
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            العربية (RTL)
          </button>
        </div>
      </div>

      {/* Storage & Backup Section */}
      <div className="rounded-2xl p-4 bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-white">
          <Database className="w-4 h-4 text-cyan-400" />
          <span>{isArabic ? 'إدارة التخزين المحلي (Offline SQLite / JSON)' : 'Offline Local Storage & Backups'}</span>
        </div>
        <p className="text-xs text-slate-400">
          {isArabic
            ? 'تصدير تقدمك ونقاط الخبرة كملف JSON مشفر محلي، أو استيراد نسخة احتياطية سابقة.'
            : 'Export your learning progress to a local JSON file or restore from a previous backup.'}
        </p>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={handleExportJson}
            className="py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>{isArabic ? 'تصدير التقدم (JSON)' : 'Export JSON'}</span>
          </button>

          <label className="py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors">
            <Upload className="w-4 h-4 text-cyan-400" />
            <span>{isArabic ? 'استيراد التقدم' : 'Import JSON'}</span>
            <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
          </label>
        </div>

        {importStatus && (
          <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs text-center font-medium">
            {importStatus}
          </div>
        )}
      </div>

      {/* Danger Zone: Reset Progress */}
      <div className="rounded-2xl p-4 bg-red-950/20 border border-red-900/50 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-red-400">
          <Trash2 className="w-4 h-4" />
          <span>{isArabic ? 'إعادة ضبط سجل التعلم' : 'Reset Learning Progress'}</span>
        </div>
        <p className="text-xs text-slate-400">
          {isArabic
            ? 'إعادة ضبط جميع الإحصائيات، الاختبارات، ونقاط الخبرة إلى الصفر. المناهج والدروس تبقى محفوظة دون حذف.'
            : 'Resets user statistics, quiz attempts, and earned XP. Bundled educational curriculum is never deleted.'}
        </p>

        {!showResetConfirm ? (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="w-full py-2.5 rounded-xl bg-red-950/60 hover:bg-red-900/60 text-red-300 border border-red-800/80 font-bold text-xs cursor-pointer transition-colors"
          >
            {isArabic ? 'إعادة ضبط سجل التقدم...' : 'Reset User Progress...'}
          </button>
        ) : (
          <div className="p-3 rounded-xl bg-red-950/80 border border-red-700 space-y-2 text-xs">
            <span className="font-bold text-white block">
              {isArabic ? 'هل أنت متأكد من رغبتك في إعادة الضبط؟' : 'Are you sure you want to proceed?'}
            </span>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={handleConfirmReset}
                className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold cursor-pointer"
              >
                {isArabic ? 'نعم، أعد الضبط' : 'Yes, Reset'}
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2 rounded-lg bg-slate-800 text-slate-300 cursor-pointer"
              >
                {isArabic ? 'إلغاء' : 'Cancel'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
