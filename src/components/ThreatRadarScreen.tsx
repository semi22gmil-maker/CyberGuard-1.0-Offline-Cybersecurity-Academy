import React, { useState } from 'react';
import { Language } from '../types';
import { Radar, AlertTriangle, ShieldCheck, ChevronRight, Activity, Radio, Eye } from 'lucide-react';

interface ThreatRadarScreenProps {
  language: Language;
}

interface SimulatedThreat {
  id: number;
  titleEn: string;
  titleAr: string;
  category: string;
  severity: 'Critical' | 'High' | 'Medium';
  indicatorsEn: string[];
  indicatorsAr: string[];
  defensesEn: string[];
  defensesAr: string[];
}

const THREAT_SCENARIOS: SimulatedThreat[] = [
  {
    id: 1,
    titleEn: 'Rogue "Evil Twin" Access Point',
    titleAr: 'نقطة وصول واي فاي مزورة (Evil Twin)',
    category: 'Network Perimeters',
    severity: 'High',
    indicatorsEn: [
      'Identical SSID to venue Wi-Fi with higher signal strength',
      'Missing 802.1X enterprise WPA3 handshake requirements',
      'Unusual MAC address not matching venue hardware vendor OUI',
    ],
    indicatorsAr: [
      'اسم شبكة SSID مطابق لشبكة المكان ولكن بإشارة أقوى وغير معتادة',
      'غياب متطلبات مصادقة المؤسسات WPA3 Enterprise',
      'عنوان MAC مختلف لا يتطابق مع عتاد الشبكة الرسمي للمؤسسة',
    ],
    defensesEn: [
      'Establish an authenticated IPsec/WireGuard VPN before sending any packet',
      'Disable automated Wi-Fi reconnect settings on mobile endpoints',
      'Use cellular LTE/5G hotspot for high-value administrative tasks',
    ],
    defensesAr: [
      'تفعيل نفق VPN مشفر (WireGuard) فوراً قبل إرسال أي بيانات',
      'إلغاء خاصية الاتصال التلقائي بشبكات الواي فاي غير المألوفة',
      'الاعتماد على باقة الهاتف المتنقل 5G للمهام الحساسة عوضاً عن الشبكات المفتوحة',
    ],
  },
  {
    id: 2,
    titleEn: 'Automated Credential Stuffing Campaign',
    titleAr: 'حملة حشو بيانات الاعتماد المؤتمتة',
    category: 'Identity & Authentication',
    severity: 'Critical',
    indicatorsEn: [
      'Sudden surge of failed login attempts across 5,000 distributed proxy IPs',
      'Rapid cycling of known leaked email/password credential pairs',
      'Abnormally low mouse movement entropy indicating headless browser bots',
    ],
    indicatorsAr: [
      'ارتفاع هائل ومفاجئ في محاولات تسجيل الدخول الفاشلة عبر آلاف عناوين IP الموزعة',
      'تجربة متسلسلة لقوائم مسربة سابقة من كلمات المرور',
      'حركات فأرة آلية ومعدومة العشوائية تدل على متصفحات خفية مبرمجة',
    ],
    defensesEn: [
      'Enforce hardware FIDO2 / WebAuthn passkeys (immune to stolen credentials)',
      'Deploy behavioral rate-limiting and IP reputation scoring at API gateways',
      'Integrate automated breached-credential check APIs during authentication',
    ],
    defensesAr: [
      'فرض استخدام مفاتيح الأمان الحيوية FIDO2 / WebAuthn المقاومة للسرقة',
      'تطبيق تقييد معدل الطلبات التكيفي (Rate Limiting) على بوابات واجهات البرمجة',
      'حظر استخدام كلمات المرور المعروف تسريبها مسبقاً بشكل آلي',
    ],
  },
  {
    id: 3,
    titleEn: 'Spear Phishing Executive Impersonation',
    titleAr: 'تصيد احتيالي موجه بانتحال صفة المدير التنفيذي',
    category: 'Social Engineering',
    severity: 'Critical',
    indicatorsEn: [
      'Mismatched domain in email envelope vs visual display name',
      'Severe time-pressure language demanding out-of-band wire transfer',
      'Request to bypass standard procurement purchase order policies',
    ],
    indicatorsAr: [
      'عدم تطابق نطاق المرسل الفعلي مع الاسم المعروض في الترويسة',
      'لغة ضغط زمني استعجالية تطلب تحويلاً مالياً فورياً خارج القنوات الرسمية',
      'محاولة لتخطي إجراءات التدقيق والموافقات المعتمدة في المؤسسة',
    ],
    defensesEn: [
      'Mandatory voice verification via known internal phone extension for all financial transfers',
      'Strict DMARC enforcement (p=reject) across corporate email domains',
      'User security awareness drills focused on cognitive urgency triggers',
    ],
    defensesAr: [
      'فرض التأكيد الصوتي عبر الهاتف الداخلي المعتمد لأي تحويلات مالية استثنائية',
      'تطبيق سياسة DMARC الصارمة برفض الرسائل غير الموثقة (p=reject)',
      'تدريب الموظفين المستمر على تمييز أساليب الضغط النفسي والاستعجال المصطنع',
    ],
  },
  {
    id: 4,
    titleEn: 'Unpatched Remote Code Execution (CVE-2026)',
    titleAr: 'ثغرة تنفيذ تعليمات برمجية عن بعد غير مرقعة',
    category: 'Vulnerability Management',
    severity: 'High',
    indicatorsEn: [
      'Active network scans targeting vulnerable service listener port',
      'Unusual outbound child process spawned by web server daemon (e.g. `cmd.exe` or `/bin/sh`)',
      'Abnormal spikes in CPU utilization due to post-exploitation beaconing',
    ],
    indicatorsAr: [
      'عمليات مسح نشطة للشبكة تستهدف المنفذ الخاص بالخدمة المصابة',
      'انبثاق عملية غريبة من خادم الويب مثل تشغيل موجه الأوامر `/bin/sh`',
      'استهلاك مفاجئ لموارد المعالج ناتج عن تشغيل برمجيات التثبيت الخفية',
    ],
    defensesEn: [
      'Apply vendor security hotfixes and kernel updates within emergency patch SLA',
      'Strict Network Micro-segmentation restricting server outbound egress to allowed endpoints',
      'Host-based EDR process ancestry behavioral blocking',
    ],
    defensesAr: [
      'تطبيق التحديثات والترقيعات الأمنية الفورية فور صدورها من الشركة المطورة',
      'تقسيم الشبكة وعزل الخوادم لمنع الاتصال الخارجي غير المصرح به',
      'استخدام أنظمة EDR لمراقبة شجرة العمليات ومنع تشغيل البرمجيات المشبوهة',
    ],
  },
];

export const ThreatRadarScreen: React.FC<ThreatRadarScreenProps> = ({ language }) => {
  const isArabic = language === 'ar';
  const [selectedThreatId, setSelectedThreatId] = useState<number>(1);

  const activeThreat = THREAT_SCENARIOS.find(t => t.id === selectedThreatId) || THREAT_SCENARIOS[0];

  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case 'Critical':
        return 'bg-red-950/70 text-red-300 border-red-800';
      case 'High':
        return 'bg-amber-950/70 text-amber-300 border-amber-800';
      default:
        return 'bg-cyan-950/70 text-cyan-300 border-cyan-800';
    }
  };

  return (
    <div className="space-y-4 pb-20">
      <div>
        <div className="flex items-center gap-2">
          <Radar className="w-5 h-5 text-emerald-400" />
          <h2 className="text-xl font-bold text-white">
            {isArabic ? 'رادار التهديدات التعليمي' : 'Educational Threat Radar'}
          </h2>
        </div>
        <p className="text-xs text-slate-400">
          {isArabic
            ? 'محاكاة تعليمية تكتيكية لسيناريوهات الاختراق المعاصرة وإرشادات الاستجابة السريعة (بيانات محاكاة)'
            : 'Simulated tactical threat intelligence scenarios and defensive playbooks (Educational only).'}
        </p>
      </div>

      {/* Radar Animation / Status Strip */}
      <div className="rounded-2xl p-4 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 relative overflow-hidden flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 relative">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <span className="text-xs font-bold text-white block">
              {isArabic ? 'حالة المراقبة الدفاعية المحاكاة' : 'Simulated Defense Monitor'}
            </span>
            <span className="text-[11px] text-emerald-400 font-mono">
              {isArabic ? '4 سيناريوهات تكتيكية نشطة للتدريب' : '4 Tactical Scenarios Loaded'}
            </span>
          </div>
        </div>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
          Offline Model
        </span>
      </div>

      {/* Threat Scenario Cards Carousel */}
      <div className="grid grid-cols-2 gap-2">
        {THREAT_SCENARIOS.map((threat) => {
          const isSelected = selectedThreatId === threat.id;
          return (
            <button
              key={threat.id}
              onClick={() => setSelectedThreatId(threat.id)}
              className={`p-3 rounded-xl border text-left rtl:text-right transition-all cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 border-emerald-500 shadow-md shadow-emerald-500/10'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${getSeverityBadge(threat.severity)}`}>
                  {threat.severity}
                </span>
                <span className="text-[10px] font-mono text-slate-500">SCENARIO {threat.id}</span>
              </div>
              <h4 className="text-xs font-bold text-white line-clamp-1">
                {isArabic ? threat.titleAr : threat.titleEn}
              </h4>
            </button>
          );
        })}
      </div>

      {/* Active Threat Detail Panel */}
      <div className="rounded-2xl p-4 bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <span className="text-xs font-semibold text-emerald-400">
              {activeThreat.category}
            </span>
            <h3 className="text-base font-bold text-white">
              {isArabic ? activeThreat.titleAr : activeThreat.titleEn}
            </h3>
          </div>
          <span className={`text-xs font-bold px-2 py-1 rounded-lg border ${getSeverityBadge(activeThreat.severity)}`}>
            {activeThreat.severity} Severity
          </span>
        </div>

        {/* Indicators of Compromise */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>{isArabic ? 'مؤشرات الاختراق والاشتباه (IoCs):' : 'Key Threat Indicators (IoCs):'}</span>
          </span>
          <div className="space-y-1.5">
            {(isArabic ? activeThreat.indicatorsAr : activeThreat.indicatorsEn).map((ind, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                <span className="text-amber-400 font-bold shrink-0">·</span>
                <span>{ind}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Defense Playbook */}
        <div className="space-y-2 pt-1">
          <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isArabic ? 'خطة الدفاع والاستجابة الموصى بها:' : 'Recommended Defensive Playbook:'}</span>
          </span>
          <div className="space-y-1.5">
            {(isArabic ? activeThreat.defensesAr : activeThreat.defensesEn).map((def, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-900/50 text-xs text-emerald-200 flex items-start gap-2">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span>{def}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
