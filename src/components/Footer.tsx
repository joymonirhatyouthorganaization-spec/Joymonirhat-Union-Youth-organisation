import React from 'react';
import { MapPin, Mail, Phone, Heart, Shield, ArrowUp, Lock } from 'lucide-react';
import { ORG_DETAILS } from '../data/organizationData';
import { Language } from '../types';

interface FooterProps {
  language: Language;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-stone-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1: Brand & Registration Identity */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-0.5 border border-slate-700 shrink-0">
                <img
                  src={ORG_DETAILS.logoUrl}
                  alt="JUYO"
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/juyo-logo.jpg';
                  }}
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {language === 'bn' ? ORG_DETAILS.nameBn : ORG_DETAILS.nameEn}
                </h3>
                <p className="text-xs text-amber-400 font-semibold">
                  "{language === 'bn' ? ORG_DETAILS.mottoBn : ORG_DETAILS.mottoEn}"
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-md">
              {language === 'bn'
                ? 'জয়মনিরহাট ইউনিয়ন যুব সংগঠন একটি অরাজনৈতিক স্বেচ্ছাসেবী সামাজিক প্রতিষ্ঠান। যুব উন্নয়ন অধিদপ্তর কুড়িগ্রাম জেলা কার্যালয় থেকে নিবন্ধিত হয়ে আমরা আত্ম-মানবতার সেবা ও গ্রামীণ সমাজ সংস্কারে নিরলসভাবে কাজ করে যাচ্ছি।'
                : 'A government-registered, non-political voluntary institution committed to altruistic community service, girl empowerment, and rural development in Bhurungamari, Kurigram.'}
            </p>

            <div className="inline-flex items-center gap-2 text-xs text-stone-300 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
              <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                {language === 'bn'
                  ? `রেজি: ${ORG_DETAILS.regNumberBn} · যুব উন্নয়ন অধিদপ্তর`
                  : `Reg: ${ORG_DETAILS.regNumberEn} · DYD Kurigram`}
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {language === 'bn' ? 'প্রয়োজনীয় লিংক' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm text-stone-400">
              <li>
                <a href="#home" className="hover:text-amber-400 transition-colors">
                  {language === 'bn' ? 'মূলপাতা' : 'Home'}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-amber-400 transition-colors">
                  {language === 'bn' ? 'আমাদের সম্পর্কে ও নিবন্ধন' : 'About & Registration'}
                </a>
              </li>
              <li>
                <a href="#flagship-project" className="hover:text-amber-400 transition-colors text-amber-300/90 font-medium">
                  {language === 'bn' ? 'মাদকবিরোধী বিশেষ প্রকল্প' : 'Anti-Drug Flagship Project'}
                </a>
              </li>
              <li>
                <a href="#activities" className="hover:text-amber-400 transition-colors">
                  {language === 'bn' ? '১০টি প্রধান কার্যক্রম' : '10 Core Activities'}
                </a>
              </li>
              <li>
                <a href="#achievements" className="hover:text-amber-400 transition-colors">
                  {language === 'bn' ? 'অর্জন ও সাফল্য' : 'Key Achievements'}
                </a>
              </li>
              <li>
                <a href="#leadership" className="hover:text-amber-400 transition-colors">
                  {language === 'bn' ? 'সদস্য পরিচিতি ও নেতৃত্ব (১১ জন)' : 'Leadership & Members'}
                </a>
              </li>
              <li>
                <a href="#partners" className="hover:text-amber-400 transition-colors">
                  {language === 'bn' ? 'সহযোগী সংস্থা ও নেটওয়ার্ক' : 'Partners & Network'}
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-amber-400 transition-colors">
                  {language === 'bn' ? 'স্থিরচিত্র গ্যালারি' : 'Photo Gallery'}
                </a>
              </li>
              <li>
                <a href="#social-hub" className="hover:text-amber-400 transition-colors">
                  {language === 'bn' ? 'ফেসবুক পেজ ও সোশ্যাল হাব' : 'Social Hub'}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-400 transition-colors">
                  {language === 'bn' ? 'যোগাযোগ ও অনুদান' : 'Contact & Donations'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Official Contact & Address */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {language === 'bn' ? 'প্রধান কার্যালয় ও যোগাযোগ' : 'Office & Contacts'}
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                <span>{language === 'bn' ? ORG_DETAILS.addressBn : ORG_DETAILS.addressEn}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${ORG_DETAILS.whatsapp}`} className="hover:text-emerald-400 font-mono">
                  {ORG_DETAILS.whatsapp} ({ORG_DETAILS.phoneFormatted})
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`mailto:${ORG_DETAILS.email}`} className="hover:text-blue-400 break-all">
                  {ORG_DETAILS.email}
                </a>
              </div>
            </div>

            {/* Official Donation Accounts */}
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 space-y-1.5 text-xs">
              <div className="text-amber-300 font-semibold flex items-center justify-between">
                <span>{language === 'bn' ? 'সংগঠনের অনুদান মাধ্যম:' : 'Donation Channels:'}</span>
                <span className="text-[10px] text-stone-400 font-normal">পার্সোনাল</span>
              </div>
              <div className="flex items-center justify-between font-mono text-stone-200">
                <span className="text-pink-400 font-bold">বিকাশ (bKash):</span>
                <span>{ORG_DETAILS.bkash}</span>
              </div>
              <div className="flex items-center justify-between font-mono text-stone-200">
                <span className="text-orange-400 font-bold">নগদ (Nagad):</span>
                <span>{ORG_DETAILS.nagad}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-1 flex flex-wrap items-center gap-2">
              <a
                href={ORG_DETAILS.facebookPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-blue-900/70 hover:bg-blue-800 text-white rounded-md text-xs font-semibold transition-colors"
              >
                ফেসবুক পেজ
              </a>
              <a
                href={ORG_DETAILS.facebookGroupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-blue-950 hover:bg-blue-900 text-white border border-blue-800 rounded-md text-xs font-semibold transition-colors"
              >
                ফেসবুক গ্রুপ
              </a>
              <a
                href={ORG_DETAILS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-emerald-900/70 hover:bg-emerald-800 text-white rounded-md text-xs font-semibold transition-colors"
              >
                হোয়াটসঅ্যাপ
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p className="text-center sm:text-left">
            © {ORG_DETAILS.establishedYearEn} - 2026 {ORG_DETAILS.nameBn} (JUYO)। সর্বস্বত্ব সংরক্ষিত।
          </p>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">
              {language === 'bn' ? 'অরাজনৈতিক ও অলাভজনক স্বেচ্ছাসেবী যুব সংগঠন' : 'Non-political & voluntary organization'}
            </span>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                type="button"
                className="inline-flex items-center gap-1 text-[11px] text-stone-600 hover:text-amber-400 transition-colors cursor-pointer py-1 px-1.5 rounded"
                title="Admin Control Panel / অ্যাডমিন প্যানেল"
              >
                <Lock className="w-3 h-3" />
                <span>{language === 'bn' ? 'অ্যাডমিন' : 'Admin'}</span>
              </button>
            )}
            <button
              onClick={scrollToTop}
              type="button"
              className="p-2 bg-slate-900 hover:bg-slate-800 text-stone-300 hover:text-white rounded-lg transition-colors cursor-pointer"
              title="Back to top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
