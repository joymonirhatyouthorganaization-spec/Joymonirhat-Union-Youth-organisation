import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  CheckCircle2, 
  ShieldCheck, 
  Users, 
  HeartHandshake, 
  Building2, 
  Sparkles, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { UNION_WARDS, ORG_DETAILS } from '../data/organizationData';
import { Language, UnionWardItem } from '../types';

interface WardCoverageSectionProps {
  language: Language;
  onOpenVolunteerModal?: (selectedWard?: string) => void;
}

export const WardCoverageSection: React.FC<WardCoverageSectionProps> = ({
  language,
  onOpenVolunteerModal
}) => {
  const [selectedWardId, setSelectedWardId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter wards based on selection and search query
  const filteredWards = UNION_WARDS.filter((ward) => {
    const matchesTab = selectedWardId === 'all' || ward.id === selectedWardId;
    if (!matchesTab) return false;

    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase().trim();
    const matchBn = 
      ward.wardNoBn.toLowerCase().includes(query) ||
      ward.titleBn.toLowerCase().includes(query) ||
      ward.summaryBn.toLowerCase().includes(query) ||
      ward.areasBn.some((a) => a.toLowerCase().includes(query)) ||
      ward.keyLandmarksBn.toLowerCase().includes(query);

    const matchEn =
      ward.wardNoEn.toLowerCase().includes(query) ||
      ward.titleEn.toLowerCase().includes(query) ||
      ward.summaryEn.toLowerCase().includes(query) ||
      ward.areasEn.some((a) => a.toLowerCase().includes(query)) ||
      ward.keyLandmarksEn.toLowerCase().includes(query);

    return matchBn || matchEn;
  });

  return (
    <section id="wards" className="py-16 lg:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-900 uppercase tracking-widest mb-2 bg-blue-100/70 px-3 py-1 rounded-full border border-blue-200">
              <MapPin className="w-4 h-4 text-rose-600" />
              <span>
                {language === 'bn' ? 'তৃণমূল ভৌগোলিক পরিচিতি · ৯টি ওয়ার্ড' : 'Grassroots Geography · 9 Wards'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {language === 'bn'
                ? 'জয়মনিরহাট ইউনিয়নের ৯টি ওয়ার্ড ও এলাকাভিত্তিক রূপরেখা'
                : 'Joymonirhat Union 9 Wards & Territory Coverage'}
            </h2>
            <p className="mt-3 text-base sm:text-lg text-stone-600 leading-relaxed">
              {language === 'bn'
                ? 'অষ্টমীর ঘাট সদর কার্যালয় থেকে শুরু করে শিংঝাড়, বাউসমারী ও বল্লার ভিটা পর্যন্ত ইউনিয়নের প্রতিটি পাড়া-মহল্লায় জয়মনিরহাট ইউনিয়ন যুব সংগঠনের সক্রিয় মানবিক ও সামাজিক উপস্থিতি।'
                : 'From our central secretariat at Ashtamir Ghat to Shingjhar, Bausmari, and Bollar Vita—JUYO volunteers maintain an active presence across all 9 municipal wards.'}
            </p>
          </div>

          {/* Quick Summary Pill */}
          <div className="shrink-0 flex items-center gap-3 p-3 bg-white rounded-2xl border border-stone-200 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-blue-900 text-white flex items-center justify-center font-bold font-mono">
              ৯
            </div>
            <div className="text-xs">
              <span className="font-bold text-slate-900 block">
                {language === 'bn' ? '৯টি ওয়ার্ডের পূর্ণাঙ্গ মানচিত্র' : 'Full 9 Wards Coverage'}
              </span>
              <span className="text-stone-500">
                {language === 'bn' ? '১০০% অরাজনৈতিক সেবা নেটওয়ার্ক' : '100% Non-political service network'}
              </span>
            </div>
          </div>
        </div>

        {/* Search & Fast Ward Filter Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-2xs mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === 'bn'
                    ? 'গ্রাম বা এলাকার নাম দিয়ে খুঁজুন (যেমন: বাউসমারী, বকুলতলী, শিংঝাড়, রইয়া বিল...)'
                    : 'Search by village or landmark (e.g. Bausmari, Bokultoli, Shingjhar, Roya Beel...)'
                }
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-700/20 focus:border-blue-700 transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 px-1"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick Action Button */}
            {onOpenVolunteerModal && (
              <button
                type="button"
                onClick={() => onOpenVolunteerModal()}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors shrink-0 shadow-2xs cursor-pointer"
              >
                <HeartHandshake className="w-4 h-4 text-amber-300" />
                <span>{language === 'bn' ? 'আপনার ওয়ার্ডে যুক্ত হোন' : 'Join from Your Ward'}</span>
              </button>
            )}
          </div>

          {/* Quick Ward Navigation Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            <button
              type="button"
              onClick={() => setSelectedWardId('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 cursor-pointer ${
                selectedWardId === 'all'
                  ? 'bg-blue-900 text-white font-bold shadow-2xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {language === 'bn' ? 'সকল ওয়ার্ড (১-৯)' : 'All Wards (1-9)'}
            </button>
            {UNION_WARDS.map((ward) => (
              <button
                key={ward.id}
                type="button"
                onClick={() => setSelectedWardId(ward.id)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 cursor-pointer ${
                  selectedWardId === ward.id
                    ? 'bg-blue-900 text-white font-bold shadow-2xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {language === 'bn' ? ward.wardNoBn : ward.wardNoEn}
              </button>
            ))}
          </div>
        </div>

        {/* Ward Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredWards.length > 0 ? (
            filteredWards.map((ward) => (
              <div
                key={ward.id}
                className="bg-white rounded-3xl p-6 border border-stone-200/90 hover:border-blue-500/80 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  {/* Card Header & Badges */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center font-bold text-blue-950 font-mono text-base group-hover:bg-blue-900 group-hover:text-white transition-colors">
                        {ward.wardNo < 10 ? `0${ward.wardNo}` : ward.wardNo}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-blue-900 block">
                          {language === 'bn' ? ward.wardNoBn : ward.wardNoEn}
                        </span>
                        <span className="text-[11px] text-stone-400 font-medium">
                          {language === 'bn' ? 'জয়মনিরহাট ইউনিয়ন' : 'Joymonirhat Union'}
                        </span>
                      </div>
                    </div>

                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 border border-stone-200">
                      {language === 'bn' ? ward.coverageBadgeBn : ward.coverageBadgeEn}
                    </span>
                  </div>

                  {/* Ward Title */}
                  <h3 className="text-base font-bold text-slate-900 leading-snug mb-3">
                    {language === 'bn' ? ward.titleBn : ward.titleEn}
                  </h3>

                  {/* Included Areas & Villages Chips */}
                  <div className="mb-4">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2">
                      {language === 'bn' ? 'অন্তর্ভুক্ত গ্রাম ও এলাকাসমূহ:' : 'Included Villages & Areas:'}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {(language === 'bn' ? ward.areasBn : ward.areasEn).map((area, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-800 bg-amber-50/80 px-2.5 py-1 rounded-lg border border-amber-200/80"
                        >
                          <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                          <span>{area}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* User Specified Summary Text */}
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 mb-4 text-xs text-stone-700 leading-relaxed font-medium">
                    <span className="text-blue-900 font-bold block mb-1">
                      {language === 'bn' ? 'অফিসিয়াল এলাকা তালিকা:' : 'Official Localities:'}
                    </span>
                    {language === 'bn' ? ward.summaryBn : ward.summaryEn}
                  </div>

                  {/* Key Landmarks */}
                  <div className="text-xs text-stone-600 space-y-1">
                    <div className="flex items-start gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-stone-400 mt-0.5 shrink-0" />
                      <span>
                        <strong className="text-stone-800">
                          {language === 'bn' ? 'প্রধান পরিচিতি:' : 'Key Focus:'}
                        </strong>{' '}
                        {language === 'bn' ? ward.keyLandmarksBn : ward.keyLandmarksEn}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{ward.volunteerCountEstimate}</span>
                  </div>

                  {onOpenVolunteerModal && (
                    <button
                      type="button"
                      onClick={() => onOpenVolunteerModal(`${ward.wardNoBn} (${ward.summaryBn})`)}
                      className="text-xs font-semibold text-blue-900 hover:text-blue-700 flex items-center gap-1 p-1 hover:underline cursor-pointer"
                    >
                      <span>{language === 'bn' ? 'ভলান্টিয়ার আবেদন' : 'Join as Volunteer'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center bg-white rounded-3xl border border-stone-200">
              <MapPin className="w-10 h-10 text-stone-300 mx-auto mb-3" />
              <p className="text-base font-semibold text-stone-800">
                {language === 'bn' ? 'কোনো ওয়ার্ড পাওয়া যায়নি' : 'No matching wards found'}
              </p>
              <p className="text-xs text-stone-500 mt-1">
                {language === 'bn'
                  ? 'অনুগ্রহ করে সঠিক গ্রাম বা এলাকার নাম দিয়ে আবার চেষ্টা করুন।'
                  : 'Please check your search keyword or reset the filter.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedWardId('all');
                }}
                className="mt-4 px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-bold hover:bg-blue-800 cursor-pointer"
              >
                {language === 'bn' ? 'সকল ওয়ার্ড প্রদর্শন করুন' : 'Show All Wards'}
              </button>
            </div>
          )}
        </div>

        {/* 9 Wards Civic Engagement Oath Banner */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 border border-blue-900 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-blue-950 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white">
                {language === 'bn'
                  ? '৯টি ওয়ার্ডের প্রতিটি পাড়া-মহল্লায় মাদকমুক্ত ও সচেতন সমাজ গঠনের অঙ্গীকার'
                  : 'Commitment to a Drug-Free & Conscious Society Across All 9 Wards'}
              </h4>
              <p className="text-xs sm:text-sm text-blue-200 mt-1">
                {language === 'bn'
                  ? 'আপনার এলাকায় জরুরি রক্তদান, মাদক প্রতিরোধ কিংবা সামাজিক উন্নয়ন উদ্যোগে আমাদের নিবেদিত যুব স্বেচ্ছাসেবকরা সর্বদা পাশে আছে।'
                  : 'For emergency blood requests, anti-drug vigilances, or community repair drives, our local youth volunteers are always at your service.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`https://wa.me/8801705929049?text=${encodeURIComponent('জয়মনিরহাট ইউনিয়ন যুব সংগঠনের ওয়ার্ড ভিত্তিক কার্যক্রম সম্পর্কে জানতে চাই')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors shadow-2xs flex items-center gap-1.5"
            >
              <span>{language === 'bn' ? 'ওয়ার্ড সমন্বয়কের সাথে আলাপ' : 'Contact Coordinator'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
