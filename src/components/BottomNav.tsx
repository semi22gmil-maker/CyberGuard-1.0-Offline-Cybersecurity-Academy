import React from 'react';
import { Home, BookOpen, FlaskConical, Radar, User, ShieldAlert } from 'lucide-react';
import { Language } from '../types';

export type TabType = 'home' | 'learn' | 'lab' | 'radar' | 'profile';

interface BottomNavProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  language: Language;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange, language }) => {
  const isArabic = language === 'ar';

  const tabs: { id: TabType; labelEn: string; labelAr: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'home', labelEn: 'Home', labelAr: 'الرئيسية', icon: Home },
    { id: 'learn', labelEn: 'Curriculum', labelAr: 'المسارات', icon: BookOpen },
    { id: 'lab', labelEn: 'SecLab', labelAr: 'المختبر', icon: FlaskConical },
    { id: 'radar', labelEn: 'Radar', labelAr: 'الرادار', icon: Radar },
    { id: 'profile', labelEn: 'Profile', labelAr: 'الملف', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 safe-bottom">
      <div className="max-w-md mx-auto grid grid-cols-5 h-16 items-center px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center h-full w-full transition-colors cursor-pointer ${
                isActive ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-400" />
                )}
              </div>
              <span className="text-[11px] font-medium tracking-tight mt-1 truncate max-w-[64px]">
                {isArabic ? tab.labelAr : tab.labelEn}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
