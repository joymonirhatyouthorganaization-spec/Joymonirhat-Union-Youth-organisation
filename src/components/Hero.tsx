import React from 'react';
import { ArrowRight, HeartHandshake, ShieldCheck, MapPin, Droplet, Sparkles, MessageCircle } from 'lucide-react';
import { ORG_DETAILS, IMPACT_STATS, GALLERY_ITEMS } from '../data/organizationData';
import { Language } from '../types';

interface HeroProps {
  language: Language;
  onOpenVolunteerModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ language, onOpenVolunteerModal }) => {
  return (
    <section id="home" className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-stone-50 via-white to-stone-100/60 border-b border-stone-200">
      {/* Decorative ambient background accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Operational Ribbon */}
        <div className="inline-flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium text-blue-900 bg-blue-50/90 border border-blue-200/80 px-3.5 py-1.5 rounded-full mb-6 shadow-xs">
          <span className="flex items-center gap-1.5 font-semibold text-blue-950">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{language === 'bn' ? `প্রতিষ্ঠা: ${ORG_DETAILS.establishedDateBn}` : `Est: ${ORG_DETAILS.establishedDateEn}`}</span>
          </span>
          <span className="text-blue-300">·</span>
          <span>{language === 'bn' ? `নিবন্ধন: ${ORG_DETAILS.regDateBn}` : `Reg: ${ORG_DETAILS.regDateEn}`}</span>
          <span className="text-blue-300">·</span>
          <span className="text-stone-700 font-semibold">{language === 'bn' ? `রেজি: ${ORG_DETAILS.regNumberBn}` : `Reg: ${ORG_DETAILS.regNumberEn}`}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Core Message & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2] text-balance">
              {language === 'bn' ? (
                <>
                  <span className="text-blue-900">তারুণ্যের শক্তিতে গড়ি</span>{' '}
                  <span className="text-amber-600">সচেতন, মাদকমুক্ত ও মানবিক সমাজ</span>
                  <br />
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mt-2 block">
                    জয়মনিরহাট ইউনিয়ন যুব সংগঠন
                  </span>
                </>
              ) : (
                <>
                  <span className="text-blue-900">Building a Conscious,</span>{' '}
                  <span className="text-amber-600">Drug-Free & Humane Society</span>
                  <br />
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mt-2 block">
                    Joymonirhat Union Youth Organization
                  </span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-stone-600 max-w-2xl leading-relaxed">
              {language === 'bn'
                ? 'কুড়িগ্রামের ভূরুঙ্গামারী উপজেলার জয়মনিরহাট ইউনিয়নে সম্পূর্ণ অরাজনৈতিক ও স্বেচ্ছাসেবী উদ্যোগে গড়ে ওঠা তরুণদের মঞ্চ। আত্ম-মানবতার সেবা, মাদক ও বাল্যবিবাহ প্রতিরোধ, রক্তদান, পরিবেশ রক্ষা এবং গ্রামীণ আত্মনির্ভরশীলতায় আমরা অঙ্গীকারাবদ্ধ।'
                : 'A dedicated, non-political youth organization based in Joymonirhat, Bhurungamari, Kurigram. We mobilize local youths for selfless humanitarian relief, anti-drug and anti-child marriage advocacy, disaster response, and rural community development.'}
            </p>

            {/* Location & Contact Meta info */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-stone-500 pt-1">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{language === 'bn' ? ORG_DETAILS.addressBn : ORG_DETAILS.addressEn}</span>
              </div>
              <span className="hidden sm:inline text-stone-300">·</span>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{language === 'bn' ? ORG_DETAILS.natureBn : ORG_DETAILS.natureEn}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenVolunteerModal}
                type="button"
                className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-blue-900 hover:bg-blue-800 shadow-sm hover:shadow rounded-lg transition-all active:scale-95 cursor-pointer"
              >
                <HeartHandshake className="w-4 h-4 text-amber-300" />
                <span>{language === 'bn' ? 'স্বেচ্ছাসেবক হিসেবে যুক্ত হন' : 'Join as a Volunteer'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={ORG_DETAILS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-emerald-950 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>{language === 'bn' ? 'হোয়াটসঅ্যাপ হেল্পডেস্ক' : 'WhatsApp Desk'}</span>
              </a>

              <a
                href="#activities"
                className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-stone-700 bg-white hover:bg-stone-50 border border-stone-300 rounded-lg transition-colors"
              >
                <Droplet className="w-4 h-4 text-rose-500" />
                <span>{language === 'bn' ? 'রক্তদান ও সেবা কার্যক্রম' : 'Blood & Services'}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Organization Official Emblem & Spotlight Card */}
          <div className="lg:col-span-5">
            <div className="relative bg-white rounded-2xl p-6 shadow-md border border-stone-200">
              {/* Official Logo Spotlight */}
              <div className="flex flex-col items-center text-center pb-6 border-b border-stone-100">
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full p-2 bg-gradient-to-tr from-blue-900 via-amber-400 to-blue-800 shadow-inner flex items-center justify-center">
                  <div className="w-full h-full bg-white rounded-full overflow-hidden p-1 flex items-center justify-center">
                    <img
                      src={ORG_DETAILS.logoUrl}
                      alt="জয়মনিরহাট ইউনিয়ন যুব সংগঠন প্রতীক"
                      className="w-full h-full object-contain rounded-full"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/juyo-logo.jpg';
                      }}
                    />
                  </div>
                </div>

                <h3 className="mt-4 text-lg font-bold text-slate-900">
                  {language === 'bn' ? ORG_DETAILS.nameBn : ORG_DETAILS.nameEn}
                </h3>
                <p className="text-xs font-semibold text-amber-700 mt-1 uppercase tracking-wider">
                  "{language === 'bn' ? ORG_DETAILS.mottoBn : ORG_DETAILS.mottoEn}"
                </p>
                <p className="text-xs text-stone-500 mt-1">
                  {language === 'bn' ? 'রেজি: যু.উ.অ/কুড়ি-৮৮/২০২৩' : 'Reg: DYD-Kuri-88/2023'}
                </p>
              </div>

              {/* Quick Contact & Verified info inside card */}
              <div className="pt-4 space-y-3 text-xs sm:text-sm">
                <div className="flex items-start justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500 font-medium">
                    {language === 'bn' ? 'কার্যালয়' : 'Headquarters'}
                  </span>
                  <span className="font-semibold text-slate-800 text-right">
                    {language === 'bn' ? 'অষ্টমীর ঘাট, জয়মনিরহাট' : 'Ashtamir Ghat, Joymonirhat'}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500 font-medium">
                    {language === 'bn' ? 'নিবন্ধন কর্তৃপক্ষ' : 'Reg. Authority'}
                  </span>
                  <span className="font-semibold text-blue-900">
                    {language === 'bn' ? 'যুব উন্নয়ন অধিদপ্তর, কুড়িগ্রাম' : 'DYD, Kurigram'}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-stone-500 font-medium">
                    {language === 'bn' ? 'হটলাইন / হোয়াটসঅ্যাপ' : 'WhatsApp Hotline'}
                  </span>
                  <a
                    href={`tel:${ORG_DETAILS.whatsapp}`}
                    className="font-bold text-emerald-700 hover:underline"
                  >
                    {ORG_DETAILS.whatsapp}
                  </a>
                </div>

                <div className="pt-2">
                  <a
                    href={ORG_DETAILS.facebookPageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-2xs"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span>{language === 'bn' ? 'অফিসিয়াল ফেসবুক পেজ ও প্রোফাইল' : 'Official Facebook Profile'}</span>
                  </a>
                </div>

                {/* Field Photos Mini-Strip */}
                <div className="pt-3 border-t border-stone-100">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-stone-500 mb-2">
                    <span>{language === 'bn' ? 'বাস্তব মাঠপর্যায়ের কার্যক্রম' : 'Field Photo Highlights'}</span>
                    <a href="#gallery" className="text-blue-700 hover:underline">
                      {language === 'bn' ? `${GALLERY_ITEMS.length}টি ছবি দেখুন →` : `View ${GALLERY_ITEMS.length} Photos →`}
                    </a>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { src: '/assets/aistudio/FB_IMG_1792936411324_95d46bc1.jpg', label: 'মাদক প্রতিরোধ' },
                      { src: '/assets/aistudio/FB_IMG_1792936416482_4933e4df.jpg', label: 'বৃক্ষরোপণ' },
                      { src: '/assets/aistudio/FB_IMG_1792936434107_3f50184e.jpg', label: 'রাস্তা সংস্কার' }
                    ].map((item, idx) => (
                      <a
                        key={idx}
                        href="#gallery"
                        className="group/thumb block relative aspect-4/3 rounded-lg overflow-hidden border border-stone-200 bg-stone-100"
                      >
                        <img
                          src={item.src}
                          alt={item.label}
                          className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-200"
                        />
                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-[9px] font-bold text-white px-1 py-0.5 bg-black/60 rounded">
                            {item.label}
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Column Full-width Impact & Rigor Strip */}
        <div className="mt-14 pt-8 border-t border-stone-200">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {IMPACT_STATS.map((stat, idx) => (
              <div key={idx} className="bg-white/80 rounded-xl p-4 border border-stone-200/80 shadow-2xs">
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-950 font-mono tabular-nums">
                  {language === 'bn' ? stat.valueBn : stat.valueEn}
                </div>
                <div className="text-xs sm:text-sm font-medium text-stone-600 mt-1 leading-snug">
                  {language === 'bn' ? stat.labelBn : stat.labelEn}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
