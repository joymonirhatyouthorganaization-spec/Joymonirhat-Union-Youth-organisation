import React, { useState } from 'react';
import { 
  HeartHandshake, 
  ShieldAlert, 
  UserCheck, 
  Sprout, 
  CloudRain, 
  Activity, 
  Shield, 
  BookOpen, 
  Pickaxe, 
  Trophy,
  ArrowRight,
  X,
  CheckCircle2,
  PhoneCall,
  ExternalLink
} from 'lucide-react';
import { ACTIVITIES, ORG_DETAILS } from '../data/organizationData';
import { ActivityItem, Language } from '../types';

interface ActivitiesProps {
  language: Language;
  onOpenVolunteerModal: () => void;
}

export const Activities: React.FC<ActivitiesProps> = ({ language, onOpenVolunteerModal }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeModalItem, setActiveModalItem] = useState<ActivityItem | null>(null);

  const filterTabs = [
    { key: 'all', labelBn: 'সকল কার্যক্রম (১০টি)', labelEn: 'All Activities (10)' },
    { key: 'welfare', labelBn: 'মানবকল্যাণ ও স্বাস্থ্য', labelEn: 'Welfare & Health' },
    { key: 'social', labelBn: 'সামাজিক আন্দোলন', labelEn: 'Social Movement' },
    { key: 'environment', labelBn: 'পরিবেশ ও গ্রামীণ উন্নয়ন', labelEn: 'Environment & Rural' },
    { key: 'rights', labelBn: 'অধিকার ও নাগরিক সেবা', labelEn: 'Rights & Civic' },
    { key: 'youth', labelBn: 'যুব উন্নয়ন ও ক্রীড়া', labelEn: 'Youth & Sports' },
  ];

  const filteredActivities = ACTIVITIES.filter((item) => {
    if (selectedFilter === 'all') return true;
    return item.category === selectedFilter;
  });

  const getIcon = (iconName: string) => {
    const props = { className: 'w-6 h-6' };
    switch (iconName) {
      case 'HeartHandshake': return <HeartHandshake {...props} className="w-6 h-6 text-rose-600" />;
      case 'ShieldAlert': return <ShieldAlert {...props} className="w-6 h-6 text-amber-600" />;
      case 'UserCheck': return <UserCheck {...props} className="w-6 h-6 text-indigo-600" />;
      case 'Sprout': return <Sprout {...props} className="w-6 h-6 text-emerald-600" />;
      case 'CloudRain': return <CloudRain {...props} className="w-6 h-6 text-sky-600" />;
      case 'Activity': return <Activity {...props} className="w-6 h-6 text-red-600" />;
      case 'Shield': return <Shield {...props} className="w-6 h-6 text-purple-600" />;
      case 'BookOpen': return <BookOpen {...props} className="w-6 h-6 text-blue-600" />;
      case 'Pickaxe': return <Pickaxe {...props} className="w-6 h-6 text-orange-600" />;
      case 'Trophy': return <Trophy {...props} className="w-6 h-6 text-yellow-600" />;
      default: return <HeartHandshake {...props} className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <section id="activities" className="py-16 lg:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="text-xs font-semibold text-blue-900 uppercase tracking-widest mb-2">
            {language === 'bn' ? 'আমাদের সেবামূলক উদ্যোগ' : 'What We Do'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {language === 'bn'
              ? 'সমাজ সংস্কার ও গ্রামীণ কল্যাণে আমাদের ১০টি প্রধান কার্যক্রম'
              : 'Our 10 Core Voluntary Services & Social Pillars'}
          </h2>
          <p className="mt-3 text-base text-stone-600 leading-relaxed">
            {language === 'bn'
              ? 'জয়মনিরহাট ইউনিয়ন যুব সংগঠন আত্ম-মানবতার সেবা থেকে শুরু করে যুব উন্নয়ন পর্যন্ত প্রতিটি গুরুত্বপূর্ণ সামাজিক ক্ষেত্রে প্রত্যক্ষ ভূমিকা পালন করে।'
              : 'From emergency cold relief to drug prevention campaigns, we tackle critical grassroots challenges through youth mobilization.'}
          </p>
        </div>

        {/* Facebook Live Activities Profile Banner */}
        <div className="mb-8 p-4 sm:p-5 bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 rounded-2xl text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md border border-blue-800/40">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-xs">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                  {language === 'bn' ? 'অফিসিয়াল ফেসবুক পেজ ও প্রোফাইল' : 'Official Facebook Page & Profile'}
                </span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                {language === 'bn'
                  ? 'আমাদের সংগঠনের সকল সামাজিক ও মানবিক কার্যক্রমের সচিত্র আপডেট'
                  : 'Live Photos & Field Videos of All JUYO Social Activities'}
              </h3>
              <p className="text-xs text-blue-200 mt-0.5 leading-relaxed">
                {language === 'bn'
                  ? 'মাঠপর্যায়ের প্রতিটি উদ্যোগ, মিটিং, সমাবেশ ও ত্রাণ কার্যক্রম সরাসরি দেখতে আমাদের অফিশিয়াল ফেসবুক পেজ ভিজিট করুন।'
                  : 'Visit our official Facebook page to view live community actions, event photo albums, and videos.'}
              </p>
            </div>
          </div>

          <a
            href={ORG_DETAILS.facebookPageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-900 bg-amber-300 hover:bg-amber-400 rounded-xl transition-all shadow-xs cursor-pointer group"
          >
            <span>{language === 'bn' ? 'আমাদের ফেসবুক প্রোফাইল ভিজিট করুন' : 'Visit Our Facebook Profile'}</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Functional Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedFilter(tab.key)}
              type="button"
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedFilter === tab.key
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
              }`}
            >
              {language === 'bn' ? tab.labelBn : tab.labelEn}
            </button>
          ))}
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((act) => (
            <div
              key={act.id}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-blue-400 hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              {act.imageSrc && (
                <div className="relative aspect-16/9 overflow-hidden bg-stone-100">
                  <img
                    src={act.imageSrc}
                    alt={language === 'bn' ? act.titleBn : act.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 text-[11px] font-bold text-white bg-slate-900/80 rounded-md backdrop-blur-xs shadow-xs">
                      {language === 'bn' ? act.categoryLabelBn : act.categoryLabelEn}
                    </span>
                  </div>
                </div>
              )}

              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center justify-center">
                      {getIcon(act.iconName)}
                    </div>
                    {!act.imageSrc && (
                      <span className="text-xs font-medium text-stone-500">
                        {language === 'bn' ? act.categoryLabelBn : act.categoryLabelEn}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                    {language === 'bn' ? act.titleBn : act.titleEn}
                  </h3>

                  <p className="mt-2 text-sm text-stone-600 line-clamp-3 leading-relaxed">
                    {language === 'bn' ? act.shortDescBn : act.shortDescEn}
                  </p>

                {/* Key Metric Indicator */}
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center gap-2 text-xs font-medium text-stone-700">
                  <span className="text-blue-900 font-semibold">
                    {language === 'bn' ? 'মূল অর্জন:' : 'Impact:'}
                  </span>
                  <span className="font-mono text-emerald-700 font-bold">
                    {language === 'bn' ? act.impactMetricBn : act.impactMetricEn}
                  </span>
                </div>

                {/* Facebook field posts indicator (for drug prevention or activities with specific posts) */}
                {act.facebookPosts && act.facebookPosts.length > 0 && (
                  <div className="mt-3 py-1.5 px-2.5 bg-blue-50/90 border border-blue-200/80 rounded-lg flex items-center justify-between text-xs text-blue-900">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                      <span className="font-semibold">
                        {language === 'bn' ? `${act.facebookPosts.length}টি অফিশিয়াল রিপোর্ট সংযুক্ত` : `${act.facebookPosts.length} Field Reports Linked`}
                      </span>
                    </div>
                    <span className="text-[11px] text-blue-700 font-medium">
                      {language === 'bn' ? 'পোস্ট দেখুন →' : 'View →'}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-2 flex flex-col gap-2">
                <button
                  onClick={() => setActiveModalItem(act)}
                  type="button"
                  className="w-full flex items-center justify-center gap-2 py-2 text-xs sm:text-sm font-semibold text-blue-900 bg-blue-50/80 hover:bg-blue-100 border border-blue-200/60 rounded-lg transition-colors cursor-pointer"
                >
                  <span>{language === 'bn' ? 'বিস্তারিত কর্মপরিকল্পনা' : 'Action Details'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Direct Facebook Link for all activities */}
                <a
                  href={ORG_DETAILS.facebookPageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-1.5 py-1.5 text-[11px] sm:text-xs font-semibold text-blue-800 bg-stone-50 hover:bg-blue-600 hover:text-white border border-stone-200 hover:border-blue-600 rounded-lg transition-all group/fb"
                >
                  <svg className="w-3.5 h-3.5 fill-current text-blue-600 group-hover/fb:text-white transition-colors" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>{language === 'bn' ? 'ফেসবুকে সচিত্র আপডেট দেখুন' : 'View on Facebook'}</span>
                  <ExternalLink className="w-3 h-3 group-hover/fb:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
            </div>
          ))}
        </div>

        {/* Bottom All-Activities Facebook CTA Strip */}
        <div className="mt-12 p-6 bg-white rounded-2xl border border-blue-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900">
                {language === 'bn'
                  ? 'সংগঠনের সকল কার্যক্রমের ফটো ও ভিডিও দেখতে চান?'
                  : 'Looking for full albums and videos of all activities?'}
              </h4>
              <p className="text-xs text-stone-600 mt-0.5">
                {language === 'bn'
                  ? 'আমাদের অফিসিয়াল ফেসবুক পেজে নিয়মিত প্রতিটি উদ্যোগের সচিত্র প্রতিবেদন ও ভিডিও সরাসরি সম্প্রচার করা হয়।'
                  : 'Follow our official profile to stay updated with every relief drive, rally, and seminar.'}
              </p>
            </div>
          </div>

          <a
            href={ORG_DETAILS.facebookPageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shrink-0 shadow-xs"
          >
            <span>{language === 'bn' ? 'ফেসবুকে সকল কার্যক্রম দেখুন' : 'Explore All on Facebook'}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Detail Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-stone-200 shadow-2xl p-6 sm:p-8 relative">
            <button
              onClick={() => setActiveModalItem(null)}
              type="button"
              className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                {getIcon(activeModalItem.iconName)}
              </div>
              <div>
                <span className="text-xs text-stone-500 font-medium">
                  {language === 'bn' ? activeModalItem.categoryLabelBn : activeModalItem.categoryLabelEn}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {language === 'bn' ? activeModalItem.titleBn : activeModalItem.titleEn}
                </h3>
              </div>
            </div>

            {/* Optional Activity Image Preview */}
            {activeModalItem.imageSrc && (
              <div className="my-4 rounded-xl overflow-hidden border border-stone-200 max-h-64">
                <img
                  src={activeModalItem.imageSrc}
                  alt={activeModalItem.titleBn}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Full description */}
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed mb-6">
              {language === 'bn' ? activeModalItem.fullDescBn : activeModalItem.fullDescEn}
            </p>

            {/* Official Facebook Campaign Posts Section (for drug-prevention and others) */}
            {activeModalItem.facebookPosts && activeModalItem.facebookPosts.length > 0 && (
              <div className="mb-6 p-4 sm:p-5 bg-gradient-to-br from-blue-50/90 to-indigo-50/70 border border-blue-200 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center text-white shrink-0">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {language === 'bn' ? 'অফিসিয়াল ফেসবুক পেজের মাদকবিরোধী কার্যক্রম ও পোস্টসমূহ' : 'Official Facebook Anti-Drug Campaign Posts'}
                    </h4>
                  </div>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-200/80 text-blue-900 shrink-0">
                    {activeModalItem.facebookPosts.length}টি আপডেট
                  </span>
                </div>
                <p className="text-xs text-stone-600 mb-3">
                  {language === 'bn' 
                    ? 'মাঠপর্যায়ে আয়োজিত মাদকবিরোধী সমাবেশ, সচেতনতামূলক পদযাত্রা ও শপথ গ্রহণের অফিসিয়াল ফেসবুক পোস্ট ও সচিত্র প্রতিবেদন দেখতে নিচের লিঙ্কগুলোতে ক্লিক করুন:'
                    : 'Click on the field reports below to read complete photo journals and event coverage on our official Facebook page:'}
                </p>
                <div className="space-y-2.5">
                  {activeModalItem.facebookPosts.map((post, idx) => (
                    <a
                      key={idx}
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block p-3 bg-white rounded-lg border border-blue-200/90 hover:border-blue-500 hover:shadow-xs transition-all"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                              {post.highlight || `পোস্ট ${idx + 1}`}
                            </span>
                            <span className="text-[11px] text-stone-400">
                              {language === 'bn' ? post.dateBn : post.dateEn}
                            </span>
                          </div>
                          <h5 className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-blue-900 transition-colors">
                            {language === 'bn' ? post.titleBn : post.titleEn}
                          </h5>
                          <p className="text-xs text-stone-600 mt-1 line-clamp-2">
                            {language === 'bn' ? post.summaryBn : post.summaryEn}
                          </p>
                        </div>
                        <div className="shrink-0 flex items-center gap-1 text-xs font-semibold text-blue-700 group-hover:text-blue-900 mt-1">
                          <span className="hidden sm:inline">{language === 'bn' ? 'ফেসবুকে দেখুন' : 'View Post'}</span>
                          <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Action Points */}
            <div className="bg-stone-50 rounded-xl p-4 sm:p-5 border border-stone-200 mb-6">
              <h4 className="text-sm font-bold text-slate-900 mb-3">
                {language === 'bn' ? 'আমাদের সুনির্দিষ্ট পদক্ষেপসমূহ:' : 'Key Operational Interventions:'}
              </h4>
              <ul className="space-y-2.5">
                {(language === 'bn' ? activeModalItem.actionPointsBn : activeModalItem.actionPointsEn).map((pt, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-200">
              <div className="text-xs text-stone-500">
                <span className="font-semibold text-blue-900">
                  {language === 'bn' ? 'কার্যক্রম এলাকা:' : 'Area of Operation:'}
                </span>{' '}
                {language === 'bn' ? 'জয়মনিরহাট ইউনিয়ন (ওয়ার্ড ১-৯)' : 'Joymonirhat Union (Wards 1-9)'}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={ORG_DETAILS.facebookPageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>{language === 'bn' ? 'ফেসবুকে আপডেট দেখুন' : 'Facebook Updates'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <a
                  href={ORG_DETAILS.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-950 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{language === 'bn' ? 'সহায়তা নিন' : 'Request Assistance'}</span>
                </a>

                <button
                  onClick={() => {
                    setActiveModalItem(null);
                    onOpenVolunteerModal();
                  }}
                  type="button"
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-lg transition-colors cursor-pointer"
                >
                  {language === 'bn' ? 'এই কাজে ভলান্টিয়ার হোন' : 'Volunteer for this'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
