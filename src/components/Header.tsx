import React from 'react';
import { Shield, WifiOff, Globe, Code2, Moon, Sun } from 'lucide-react';
import { Language, UserProfile } from '../types';

interface HeaderProps {
  profile: UserProfile;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenSourceHub: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  language,
  onLanguageChange,
  onOpenSourceHub,
}) => {
  const isArabic = language === 'ar';

  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100">
      {/* Simulated Android Status Bar */}
      <div className="flex items-center justify-between px-4 py-1 text-[11px] text-slate-400 bg-slate-950/80 font-mono select-none">
        <span className="flex items-center gap-1.5">
          <WifiOff className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-emerald-400 font-medium">
            {isArabic ? 'وضع عدم الاتصال (100% أوفلاين)' : 'Airplane Mode (100% Offline)'}
          </span>
        </span>
        <div className="flex items-center gap-2">
          <span>Room SQLite</span>
          <span>·</span>
          <span>100%</span>
        </div>
      </div>

      {/* Main Top Bar */}
      <div className="flex items-center justify-between px-4 py-3">
        {/* Brand Area */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center text-slate-950 shadow-md shadow-emerald-500/20">
            <Shield className="w-5 h-5 fill-slate-950 stroke-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-bold tracking-tight text-white">CyberGuard</span>
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                1.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-none">
              {isArabic ? 'أكاديمية أندرويد الأصلية' : 'Native Android Academy'}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          {/* Android Source Code Hub Trigger */}
          <button
            onClick={onOpenSourceHub}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-cyan-400 bg-cyan-950/50 hover:bg-cyan-900/60 border border-cyan-800/60 rounded-lg transition-colors cursor-pointer"
            title="Inspect & Export Kotlin Android Project"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isArabic ? 'مشروع أندرويد' : 'Android Source'}</span>
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => onLanguageChange(isArabic ? 'en' : 'ar')}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-lg transition-colors cursor-pointer"
            title="Toggle English / Arabic"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold">{isArabic ? 'English' : 'عربي'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
