import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, HeartHandshake, PhoneCall, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const headerScrollRef = useRef<HTMLDivElement>(null);
  const navScrollRef = useRef<HTMLElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

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
    { href: '#contact', labelBn: 'যোগাযোগ ও রক্তদান', labelEn: 'Contact & Blood' },
  ];

  const updateNavScrollState = () => {
    if (navScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = navScrollRef.current;
      setCanScrollLeft(scrollLeft > 6);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 6);
    }
  };

  useEffect(() => {
    updateNavScrollState();
    window.addEventListener('resize', updateNavScrollState);
    return () => window.removeEventListener('resize', updateNavScrollState);
  }, []);

  const handleNavScroll = (direction: 'left' | 'right') => {
    if (navScrollRef.current) {
      const scrollOffset = direction === 'left' ? -200 : 200;
      navScrollRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-colors shadow-2xs w-full">
      {/* Outer scrollable container that guarantees overflow-x scrolling and prevents any element from breaking out */}
      <div 
        ref={headerScrollRef}
        className="w-full overflow-x-auto no-scrollbar scroll-smooth"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8 w-full min-w-max lg:min-w-0">
          {/* Header Row - Dynamically resilient layout where elements sit perfectly in bounds */}
          <div className="flex items-center justify-between h-20 gap-3 sm:gap-4 lg:gap-5 w-full">
            
            {/* Zone 1: Brand Logo & Title (Fixed anchor on the left) */}
            <a
              href="#home"
              className="flex items-center gap-2.5 sm:gap-3 group shrink-0 min-w-0"
              title={language === 'bn' ? ORG_DETAILS.nameBn : ORG_DETAILS.nameEn}
            >
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-white shadow-2xs border border-stone-200 p-0.5 shrink-0 group-hover:scale-105 transition-transform duration-200">
                <img
                  src={ORG_DETAILS.logoUrl}
                  alt="JUYO Logo"
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/juyo-logo.jpg';
                  }}
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-slate-900 text-sm sm:text-base lg:text-lg tracking-tight leading-tight group-hover:text-blue-900 transition-colors whitespace-nowrap">
                  {language === 'bn' ? ORG_DETAILS.nameBn : ORG_DETAILS.nameEn}
                </span>
                <span className="text-[11px] sm:text-xs text-stone-500 font-medium whitespace-nowrap">
                  {language === 'bn'
                    ? `রেজি: ${ORG_DETAILS.regNumberBn} · অষ্টমীর ঘাট`
                    : `Reg: ${ORG_DETAILS.regNumberEn} · Joymonirhat`}
                </span>
              </div>
            </a>

            {/* Zone 2: Horizontally Scrollable Navigation Menu (Takes available flex space, scrollable with buttons) */}
            <div className="hidden lg:flex items-center min-w-0 flex-1 mx-2 xl:mx-3 relative group">
              {canScrollLeft && (
                <button
                  type="button"
                  onClick={() => handleNavScroll('left')}
                  className="absolute -left-2 z-10 p-1 rounded-full bg-white shadow-md border border-stone-200 text-stone-700 hover:text-blue-900 hover:bg-stone-50 transition-all cursor-pointer"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}

              <nav
                ref={navScrollRef}
                onScroll={updateNavScrollState}
                className="flex items-center gap-1 xl:gap-2 overflow-x-auto no-scrollbar scroll-smooth w-full py-1.5 px-1 min-w-0"
              >
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="px-2.5 py-1.5 rounded-lg text-xs xl:text-sm font-medium text-stone-700 hover:text-blue-950 hover:bg-blue-50/80 border border-transparent hover:border-blue-100 transition-all whitespace-nowrap shrink-0"
                  >
                    {language === 'bn' ? link.labelBn : link.labelEn}
                  </a>
                ))}
              </nav>

              {canScrollRight && (
                <button
                  type="button"
                  onClick={() => handleNavScroll('right')}
                  className="absolute -right-2 z-10 p-1 rounded-full bg-white shadow-md border border-stone-200 text-stone-700 hover:text-blue-900 hover:bg-stone-50 transition-all cursor-pointer"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Zone 3: Action Buttons & Controls (Right anchored, neatly spaced) */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              {/* Language Switch */}
              <button
                onClick={onToggleLanguage}
                type="button"
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
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
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-2xs"
                title={language === 'bn' ? 'অফিসিয়াল ফেসবুক পেজ' : 'Official Facebook Page'}
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>{language === 'bn' ? 'ফেসবুক' : 'Facebook'}</span>
              </a>

              {/* Emergency Hotline Button */}
              <a
                href={`tel:${ORG_DETAILS.whatsapp}`}
                className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-950 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
                title={language === 'bn' ? 'জরুরি প্রয়োজনে কল করুন' : 'Emergency Hotline Call'}
              >
                <PhoneCall className="w-3.5 h-3.5 text-blue-700" />
                <span>{ORG_DETAILS.whatsapp}</span>
              </a>

              {/* Primary Action Button */}
              <button
                onClick={onOpenVolunteerModal}
                type="button"
                className="hidden sm:inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-900 hover:bg-blue-800 shadow-sm rounded-lg transition-all active:scale-95 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <HeartHandshake className="w-4 h-4 text-amber-300" />
                <span>
                  {language === 'bn' ? 'স্বেচ্ছাসেবক হোন' : 'Join Volunteer'}
                </span>
              </button>

              {/* Mobile hamburger menu button */}
              <div className="flex lg:hidden items-center gap-1">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  type="button"
                  className="p-2 text-stone-700 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Quick Navigation Strip (Smooth horizontal swipe) */}
      <div className="lg:hidden border-t border-stone-200/80 bg-stone-50/95 px-3 py-2 overflow-x-auto no-scrollbar scroll-smooth w-full">
        <div className="flex items-center gap-1.5 min-w-max">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1 rounded-full text-xs font-medium text-stone-700 bg-white border border-stone-200/90 shadow-2xs hover:bg-blue-50 hover:text-blue-900 hover:border-blue-300 transition-all shrink-0 whitespace-nowrap"
            >
              {language === 'bn' ? link.labelBn : link.labelEn}
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-semibold text-stone-700 hover:text-blue-900 hover:bg-stone-50 rounded-lg transition-colors"
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
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-lg transition-colors cursor-pointer"
            >
              <HeartHandshake className="w-4 h-4 text-amber-300" />
              <span>{language === 'bn' ? 'স্বেচ্ছাসেবক হোন' : 'Join Volunteer'}</span>
            </button>
            <a
              href={ORG_DETAILS.facebookPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>{language === 'bn' ? 'অফিসিয়াল ফেসবুক পেজ' : 'Official Facebook Page'}</span>
            </a>
            <a
              href={`tel:${ORG_DETAILS.whatsapp}`}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-blue-950 bg-blue-50 border border-blue-200 rounded-lg"
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
