import React from 'react';
import { Award, CheckCircle2, TrendingUp, Fish, GraduationCap, Heart, Users } from 'lucide-react';
import { PAST_ACHIEVEMENTS } from '../data/organizationData';
import { Language } from '../types';

interface AchievementsSectionProps {
  language: Language;
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({ language }) => {
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'ach-1': return <Heart className="w-5 h-5 text-rose-600" />;
      case 'ach-2': return <Users className="w-5 h-5 text-amber-600" />;
      case 'ach-3': return <Heart className="w-5 h-5 text-blue-600" />;
      case 'ach-4': return <GraduationCap className="w-5 h-5 text-emerald-600" />;
      case 'ach-5': return <Fish className="w-5 h-5 text-cyan-600" />;
      default: return <Award className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <section id="achievements" className="py-16 lg:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-900 uppercase tracking-widest mb-2 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/80">
            <Award className="w-4 h-4 text-blue-800" />
            <span>{language === 'bn' ? 'বাস্তব মাঠপর্যায়ের অর্জন' : 'Verified Track Record'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {language === 'bn' 
              ? 'সংগঠনের পূর্ববর্তী কার্যক্রম ও উল্লেখযোগ্য অর্জনসমূহ' 
              : 'Our Historic Impact, Field Milestones & Achievements'}
          </h2>
          <p className="mt-3 text-base text-stone-600 leading-relaxed">
            {language === 'bn'
              ? 'প্রতিষ্ঠার পর থেকে জয়মনিরহাট ইউনিয়ন যুব সংগঠন বাল্যবিবাহ প্রতিরোধ, মানবিক ত্রাণ, যুব কারিগরি প্রশিক্ষণ এবং সরকারি অনুদান বাস্তবায়নে দৃশ্যমান ভূমিকা রেখেছে।'
              : 'Concrete outcomes achieved across child protection, adolescent empowerment, technical TVET coaching, and government grant execution.'}
          </p>
        </div>

        {/* 5-Column High-Impact Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5 mb-12">
          {[
            { valueBn: '২০০ জন', valueEn: '200 Girls', labelBn: 'কন্যাশিশু মনিটরিং ও সুরক্ষা', labelEn: 'Vulnerable Girls Monitored' },
            { valueBn: '৫০,০০০ ৳', valueEn: '50k BDT', labelBn: 'বাল্যবিবাহ নিরোধ অনুদান (CNB)', labelEn: 'Child Marriage Grant (CNB)' },
            { valueBn: '১৩০+ জন', valueEn: '130+ People', labelBn: 'ঈদবস্ত্র ও কম্বল সহায়তা', labelEn: 'Eid Gifts & Blankets' },
            { valueBn: '৮১ জন', valueEn: '81 Youths', labelBn: 'পশুপালন ও আইসিটি প্রশিক্ষণ', labelEn: 'Vocational TVET Trainees' },
            { valueBn: '৫০,০০০ ৳', valueEn: '50k BDT', labelBn: 'মৎস্য প্রকল্পে যুব অনুদান (DYD)', labelEn: 'DYD Fisheries Grant 2025' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs">
              <div className="text-xl sm:text-2xl font-black text-blue-950 font-mono">
                {language === 'bn' ? stat.valueBn : stat.valueEn}
              </div>
              <div className="text-xs font-semibold text-slate-800 mt-1 leading-snug">
                {language === 'bn' ? stat.labelBn : stat.labelEn}
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Achievement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PAST_ACHIEVEMENTS.map((ach) => (
            <div
              key={ach.id}
              className="bg-white rounded-2xl p-6 border border-stone-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center justify-center">
                    {getCategoryIcon(ach.id)}
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/70">
                    {language === 'bn' ? ach.metricBn : ach.metricEn}
                  </span>
                </div>

                <div className="text-xs font-semibold text-blue-900 uppercase tracking-wider mb-1">
                  {language === 'bn' ? ach.categoryBn : ach.categoryEn}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {language === 'bn' ? ach.titleBn : ach.titleEn}
                </h3>

                <ul className="mt-4 space-y-2.5 pt-3 border-t border-stone-100">
                  {(language === 'bn' ? ach.pointsBn : ach.pointsEn).map((pt, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-stone-700 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
