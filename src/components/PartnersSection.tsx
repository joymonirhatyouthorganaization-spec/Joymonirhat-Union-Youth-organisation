import React from 'react';
import { Building2, Handshake, Shield, Sparkles } from 'lucide-react';
import { PARTNERS_COLLABORATORS } from '../data/organizationData';
import { Language } from '../types';

interface PartnersSectionProps {
  language: Language;
}

export const PartnersSection: React.FC<PartnersSectionProps> = ({ language }) => {
  return (
    <section id="partners" className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-900 uppercase tracking-widest mb-2 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/80">
            <Handshake className="w-4 h-4 text-blue-800" />
            <span>{language === 'bn' ? 'অংশীদারিত্ব ও প্রাতিষ্ঠানিক সংযোগ' : 'Institutional Collaboration'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {language === 'bn'
              ? 'সরকারি ও বেসরকারি উন্নয়ন সহযোগীদের সঙ্গে আমাদের সম্পৃক্ততা'
              : 'Our Synergy with Government & Non-Government Development Partners'}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-stone-600 leading-relaxed">
            {language === 'bn'
              ? 'জয়মনিরহাট ইউনিয়ন যুব সংগঠন স্থানীয় প্রশাসন, সরকারি অধিদপ্তর এবং জাতীয়-আন্তর্জাতিক উন্নয়ন সহযোগী সংস্থার সাথে সমন্বয় করে যুব উন্নয়ন ও সামাজিক সেবা কার্যক্রম বাস্তবায়ন করে।'
              : 'JUYO works hand-in-hand with civic administration, state directorates, and leading humanitarian organizations.'}
          </p>
        </div>

        {/* 11 Partners Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {PARTNERS_COLLABORATORS.map((partner, idx) => (
            <div
              key={idx}
              className="bg-stone-50/80 rounded-2xl p-4 border border-stone-200/90 hover:border-blue-400 hover:bg-white hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    partner.category === 'gov' 
                      ? 'bg-blue-100 text-blue-900 border border-blue-200' 
                      : partner.category === 'ngo'
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                      : 'bg-purple-100 text-purple-900 border border-purple-200'
                  }`}>
                    {language === 'bn' ? partner.categoryLabelBn : partner.categoryLabelEn}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  {language === 'bn' ? partner.nameBn : partner.nameEn}
                </h4>

                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  {language === 'bn' ? partner.roleBn : partner.roleEn}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-stone-200/70 text-[10px] font-semibold text-stone-400">
                {language === 'bn' ? 'কার্যক্রম সহযোগী' : 'Operational Linkage'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
