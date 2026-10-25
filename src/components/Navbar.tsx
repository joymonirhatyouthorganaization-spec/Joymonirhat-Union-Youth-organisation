import React, { useState } from 'react';
import { Menu, X, HeartHandshake, PhoneCall, Globe } from 'lucide-react';
import { ORG_DETAILS } from '../data/organizationData';
import { Language } from '../types';

interface NavbarProps {
  language: Language;
  onToggleLanguage: () => void;
  onOpenVolunteerModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onToggleLanguage,
  onOpenVolunteerModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#home', labelBn: 'মূলপাতা', labelEn: 'Home' },
    { href: '#about', labelBn: 'পরিচিতি', labelEn: 'About' },
    { href: '#wards', labelBn: '৯টি ওয়ার্ড', labelEn: '9 Wards' },
    { href: '#flagship-project', labelBn: 'মাদকবিরোধী প্রকল্প', labelEn: 'Flagship Project' },
    { href: '#activities', labelBn: 'কার্যক্রম', labelEn: 'Activities' },
    { href: '#achievements', labelBn: 'অর্জনসমূহ', labelEn: 'Milestones' },
    { href: '#leadership', labelBn: 'সদস্য পরিচিতি', labelEn: 'Members' },
    { href: '#partners', labelBn: 'সহযোগী সংস্থা', labelEn: 'Partners' },
    { href: '#gallery', labelBn: 'গ্যালারি', labelEn: 'Gallery' },
    { href: '#contact', labelBn: 'যোগাযোগ ও অনুদান', labelEn: 'Contact & Donate' },

  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4 lg:gap-8">
          {/* Zone 1: Brand Wordmark & Logo */}
          <a
            href="#home"
            className="flex items-center gap-3 group whitespace-nowrap shrink-0"
            title={language === 'bn' ? ORG_DETAILS.nameBn : ORG_DETAILS.nameEn}
          >
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white shadow-sm border border-stone-200 p-0.5 shrink-0 group-hover:scale-105 transition-transform duration-200">
              <img
                src={ORG_DETAILS.logoUrl}
                alt="JUYO Logo"
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/juyo-logo.jpg';
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-900 text-base sm:text-lg tracking-tight leading-tight group-hover:text-blue-900 transition-colors">
                {language === 'bn' ? ORG_DETAILS.nameBn : ORG_DETAILS.nameEn}
              </span>
              <span className="text-xs text-stone-500 font-medium">
                {language === 'bn'
                  ? `রেজি: ${ORG_DETAILS.regNumberBn} · অষ্টমীর ঘাট`
                  : `Reg: ${ORG_DETAILS.regNumberEn} · Joymonirhat`}
              </span>
            </div>
          </a>

          {/* Zone 2: 5–6 Single-Line Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-stone-600">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-blue-900 hover:border-b-2 hover:border-blue-800 py-1 transition-all whitespace-nowrap shrink-0"
              >
                {language === 'bn' ? link.labelBn : link.labelEn}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action + Language Toggle */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {/* Language Switch */}
            <button
              onClick={onToggleLanguage}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              title="Toggle Language / ভাষা পরিবর্তন"
            >
              <Globe className="w-3.5 h-3.5 text-stone-500" />
              <span>{language === 'bn' ? 'English' : 'বাংলা'}</span>
            </button>

            {/* Facebook Profile Button */}
            <a
              href={ORG_DETAILS.facebookPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors whitespace-nowrap shrink-0 shadow-2xs"
              title={language === 'bn' ? 'অফিসিয়াল ফেসবুক পেজ ও প্রোফাইল' : 'Facebook Profile'}
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>{language === 'bn' ? 'ফেসবুক' : 'Facebook'}</span>
            </a>

            {/* Emergency Hotline Button */}
            <a
              href={`tel:${ORG_DETAILS.whatsapp}`}
              className="hidden xl:flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-blue-950 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-md transition-colors whitespace-nowrap shrink-0"
              title={language === 'bn' ? 'জরুরি প্রয়োজনে কল করুন' : 'Emergency Hotline Call'}
            >
              <PhoneCall className="w-3.5 h-3.5 text-blue-700" />
              <span>{ORG_DETAILS.whatsapp}</span>
            </a>

            {/* Primary Action Button */}
            <button
              onClick={onOpenVolunteerModal}
              type="button"
              className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-900 hover:bg-blue-800 shadow-sm rounded-md transition-all active:scale-95 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <HeartHandshake className="w-4 h-4 text-amber-300" />
              <span>
                {language === 'bn' ? 'স্বেচ্ছাসেবক হোন' : 'Join Volunteer'}
              </span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onToggleLanguage}
              type="button"
              className="p-2 text-xs font-medium text-stone-700 bg-stone-100 rounded-md"
            >
              {language === 'bn' ? 'EN' : 'বাং'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 text-stone-700 hover:text-stone-900 rounded-md hover:bg-stone-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-base font-medium text-stone-700 hover:text-blue-900 hover:bg-stone-50 rounded-md transition-colors"
              >
                {language === 'bn' ? link.labelBn : link.labelEn}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-stone-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenVolunteerModal();
              }}
              type="button"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-md transition-colors"
            >
              <HeartHandshake className="w-4 h-4 text-amber-300" />
              <span>{language === 'bn' ? 'স্বেচ্ছাসেবক হোন' : 'Join Volunteer'}</span>
            </button>
            <a
              href={ORG_DETAILS.facebookPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>{language === 'bn' ? 'অফিসিয়াল ফেসবুক পেজ' : 'Official Facebook Profile'}</span>
            </a>
            <a
              href={`tel:${ORG_DETAILS.whatsapp}`}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-blue-950 bg-blue-50 border border-blue-200 rounded-md"
            >
              <PhoneCall className="w-4 h-4 text-blue-700" />
              <span>হটলাইন: {ORG_DETAILS.whatsapp}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
