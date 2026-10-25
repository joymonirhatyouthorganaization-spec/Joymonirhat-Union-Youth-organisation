import React from 'react';
import { 
  ShieldAlert, 
  MapPin, 
  School, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  Trophy, 
  Scale, 
  Users, 
  HeartHandshake, 
  Eye, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { FLAGSHIP_PROJECT, BORDER_CONTEXT, ORG_DETAILS } from '../data/organizationData';
import { Language } from '../types';

interface FlagshipProjectSectionProps {
  language: Language;
  onOpenVolunteerModal?: () => void;
}

export const FlagshipProjectSection: React.FC<FlagshipProjectSectionProps> = ({ 
  language,
  onOpenVolunteerModal 
}) => {
  const getIcon = (iconName: string) => {
    const props = { className: 'w-5 h-5' };
    switch (iconName) {
      case 'BookOpen': return <BookOpen {...props} className="w-5 h-5 text-blue-600" />;
      case 'ShieldCheck': return <ShieldAlert {...props} className="w-5 h-5 text-amber-600" />;
      case 'Trophy': return <Trophy {...props} className="w-5 h-5 text-emerald-600" />;
      case 'Scale': return <Scale {...props} className="w-5 h-5 text-purple-600" />;
      case 'Users': return <Users {...props} className="w-5 h-5 text-indigo-600" />;
      case 'HeartHandshake': return <HeartHandshake {...props} className="w-5 h-5 text-rose-600" />;
      case 'Eye': return <Eye {...props} className="w-5 h-5 text-sky-600" />;
      default: return <Sparkles {...props} className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <section id="flagship-project" className="py-16 lg:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-rose-800 uppercase tracking-widest mb-2 bg-rose-50 px-3 py-1 rounded-full border border-rose-200/80">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            <span>{language === 'bn' ? 'বিশেষ প্রস্তাবিত প্রকল্প' : 'Featured Flagship Project'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {language === 'bn' ? FLAGSHIP_PROJECT.titleBn : FLAGSHIP_PROJECT.titleEn}
          </h2>
          <p className="mt-3 text-base text-stone-600 leading-relaxed">
            {language === 'bn' ? FLAGSHIP_PROJECT.subtitleBn : FLAGSHIP_PROJECT.subtitleEn}
          </p>
        </div>

        {/* Border Reality & Context Box */}
        <div className="bg-gradient-to-br from-amber-50/90 via-stone-50 to-orange-50/60 rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-xs mb-12">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              {language === 'bn' ? BORDER_CONTEXT.titleBn : BORDER_CONTEXT.titleEn}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-stone-700 leading-relaxed">
            <div>
              <p className="font-medium text-slate-900 mb-2">
                {language === 'bn' ? 'ভৌগোলিক বাস্তবতা ও চ্যালেঞ্জ:' : 'Geographic Vulnerability:'}
              </p>
              <p>
                {language === 'bn' ? BORDER_CONTEXT.locationDetailsBn : BORDER_CONTEXT.locationDetailsEn}
              </p>
            </div>
            <div>
              <p className="font-medium text-slate-900 mb-2">
                {language === 'bn' ? 'কুসংস্কার দূরীকরণ ও বাল্যবিবাহের ঝুঁকি:' : 'Debunking Myths & Protecting Girls:'}
              </p>
              <p>
                {language === 'bn' ? BORDER_CONTEXT.communityImpactBn : BORDER_CONTEXT.communityImpactEn}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-amber-200/60 flex flex-wrap items-center justify-between gap-3 text-xs text-amber-950 font-medium">
            <span>
              {language === 'bn' ? 'মূল দৃষ্টিভঙ্গি:' : 'Our Approach:'}{' '}
              {language === 'bn' ? BORDER_CONTEXT.solutionPillarsBn : BORDER_CONTEXT.solutionPillarsEn}
            </span>
          </div>
        </div>

        {/* Project Target Locations & Schools */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {FLAGSHIP_PROJECT.locations.map((loc, idx) => (
            <div key={idx} className="bg-stone-50 rounded-2xl p-5 border border-stone-200 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-900 mb-3 font-mono font-bold">
                  <MapPin className="w-5 h-5 text-blue-800" />
                </div>
                <h4 className="text-base font-bold text-slate-900">
                  {language === 'bn' ? loc.nameBn : loc.nameEn}
                </h4>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  {language === 'bn' ? loc.detailsBn : loc.detailsEn}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-200/70 text-[11px] font-semibold text-blue-900">
                {language === 'bn' ? 'কৌশলগত কর্মএলাকা' : 'Strategic Action Zone'}
              </div>
            </div>
          ))}
        </div>

        {/* 9 Wards Union-wide Banner in Flagship Project */}
        <div className="mb-12 p-4 bg-blue-50/80 rounded-2xl border border-blue-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0"></span>
            <span className="text-slate-800 font-medium">
              {language === 'bn'
                ? 'প্রকল্পের আওতাধীন জয়মনিরহাট ইউনিয়নের ৯টি ওয়ার্ডের সকল গ্রাম (১ নং ওয়ার্ড অষ্টমীর ঘাট থেকে ৯ নং ওয়ার্ড বল্লার ভিটা পর্যন্ত) সমভাবে অন্তর্ভুক্ত।'
                : 'All 9 wards across Joymonirhat Union (from Ward 1 Ashtamir Ghat to Ward 9 Bollar Vita) are actively covered under this initiative.'}
            </span>
          </div>
          <a
            href="#wards"
            className="inline-flex items-center gap-1 font-bold text-blue-900 hover:text-blue-700 underline shrink-0 whitespace-nowrap"
          >
            <span>{language === 'bn' ? '৯টি ওয়ার্ডের বিস্তারিত দেখুন' : 'Explore All 9 Wards'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 7 Core Action Pillars */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                {language === 'bn' ? 'প্রকল্পের ৭টি প্রধান সুনির্দিষ্ট কার্যক্রম' : '7 Core Project Interventions'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                {language === 'bn' ? 'শিক্ষার্থী, অভিভাবক ও তৃণমূল জনগণকে নিয়ে প্রত্যক্ষ মাঠপর্যায়ের উদ্যোগ' : 'Field-level actions engaging adolescents, guardians, and local citizens'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FLAGSHIP_PROJECT.activities.map((act) => (
              <div 
                key={act.id} 
                className="bg-white rounded-2xl p-5 border border-stone-200 hover:border-blue-400 hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center justify-center">
                      {getIcon(act.icon)}
                    </div>
                    <span className="text-[11px] font-mono font-bold text-stone-400">
                      #{act.id}
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {language === 'bn' ? act.titleBn : act.titleEn}
                  </h4>
                  <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                    {language === 'bn' ? act.descBn : act.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real Field Photo Evidence & Vigilance Photostory */}
        <div className="mb-14 bg-gradient-to-br from-stone-50 via-white to-blue-50/40 rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-800 uppercase tracking-wider mb-1">
                <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                <span>{language === 'bn' ? 'মাঠপর্যায়ের বাস্তব প্রমাণ' : 'Verified Field Evidence'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                {language === 'bn' ? 'মাদক প্রতিরোধে আমাদের সরেজমিন কার্যক্রমের কিছু দৃশ্য' : 'Photo Gallery: Grassroots Anti-Drug Interventions'}
              </h3>
            </div>
            <a
              href="#gallery"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-blue-900 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors shadow-2xs self-start sm:self-auto"
            >
              <span>{language === 'bn' ? 'পূর্ণাঙ্গ ২৯টি ছবি দেখুন' : 'View All 29 Photos'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* 4 Authentic Photos Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              {
                src: '/assets/aistudio/FB_IMG_1792936411324_95d46bc1.jpg',
                badgeBn: 'নাইট উঠান বৈঠক',
                badgeEn: 'Night Assembly',
                titleBn: 'মাদকের প্রাদুর্ভাব রোধে উঠান বৈঠক',
                titleEn: 'Courtyard Anti-Drug Gathering',
                descBn: 'গ্রামবাসীদের সাথে রাতে মাদক প্রতিরোধে খোলামেলা আলোচনা ও দিকনির্দেশনা।'
              },
              {
                src: '/assets/aistudio/FB_IMG_1792936349431_8dd4fd3d.jpg',
                badgeBn: 'যৌথ নৈশ পাহারা',
                badgeEn: 'Night Vigilance',
                titleBn: 'গ্রাম পুলিশ ও যুবদের যৌথ টহল',
                titleEn: 'Village Police & Youth Patrol',
                descBn: 'সীমান্ত সংলগ্ন মাদকপ্রবণ পয়েন্টগুলোতে গভীর রাতে নিরাপত্তা পাহারা।'
              },
              {
                src: '/assets/aistudio/FB_IMG_1792936236515_1ecf8245.jpg',
                badgeBn: 'বকুলতলী সমাবেশ',
                badgeEn: 'CNB Project',
                titleBn: 'অভিভাবক সমাবেশ (বকুলতলী)',
                titleEn: 'Parent Anti-Drug Assembly',
                descBn: 'ছোট খাটামারী বকুলতলীতে অভিভাবকদের সাথে মাদক ও বাল্যবিবাহ নিরোধ সভা।'
              },
              {
                src: '/assets/aistudio/FB_IMG_1792936253622_2028a1b7.jpg',
                badgeBn: 'অষ্টমীর ঘাট',
                badgeEn: 'School Drive',
                titleBn: 'শিক্ষার্থীদের মাঝে খাতা ও শিক্ষা উপকরণ',
                titleEn: 'Student Education Kit Drive',
                descBn: 'অষ্টমীর ঘাটে কিশোর শিক্ষার্থীদের মাদক বর্জনে উদ্বুদ্ধকরণ ও খাতা বিতরণ।'
              }
            ].map((photo, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-2xs flex flex-col group">
                <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                  <img
                    src={photo.src}
                    alt={photo.titleBn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-0.5 text-[10px] font-bold text-white bg-slate-900/80 rounded-md backdrop-blur-xs">
                      {language === 'bn' ? photo.badgeBn : photo.badgeEn}
                    </span>
                  </div>
                </div>
                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 line-clamp-1">
                      {photo.titleBn}
                    </h5>
                    <p className="mt-1 text-[11px] text-stone-600 line-clamp-2 leading-relaxed">
                      {photo.descBn}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Official Facebook Reports & Live Links */}
          <div className="border-t border-stone-200/80 pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center text-white text-xs">
                  f
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-900">
                  {language === 'bn' ? 'অফিসিয়াল ফেসবুক ফিল্ড রিপোর্ট ও আপডেট লিংকসমূহ' : 'Official Facebook Field Reports & Links'}
                </span>
              </div>
              <a
                href={ORG_DETAILS.facebookPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-blue-700 hover:underline inline-flex items-center gap-1"
              >
                <span>{language === 'bn' ? 'অফিসিয়াল পেজ ভিজিট করুন' : 'Visit Official Page'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                {
                  url: 'https://www.facebook.com/share/p/1MSNk1yDJa/',
                  tagBn: 'রিপোর্ট ১ • যুব শপথ',
                  tagEn: 'Report 1',
                  titleBn: 'মাদকবিরোধী যুব সংহতি ও অরাজনৈতিক সমাজসেবার শপথ',
                  titleEn: 'Anti-Drug Youth Solidarity & Community Oath'
                },
                {
                  url: 'https://www.facebook.com/share/p/1CBVRGqQ4b/',
                  tagBn: 'রিপোর্ট ২ • পদযাত্রা',
                  tagEn: 'Report 2',
                  titleBn: '‘না বলুন মাদককে’ — শিক্ষাপ্রতিষ্ঠান ও শিক্ষার্থীদের র‍্যালি',
                  titleEn: '“Say No to Drugs” — School & Student Awareness Rally'
                },
                {
                  url: 'https://www.facebook.com/share/p/1Emry7ow3v/',
                  tagBn: 'রিপোর্ট ৩ • গণসংযোগ',
                  tagEn: 'Report 3',
                  titleBn: 'মাদক প্রতিরোধে যুব সমাবেশ ও জনসচেতনতামূলক ক্যাম্পেইন',
                  titleEn: 'Anti-Drug Youth Gathering & Public Campaign'
                },
                {
                  url: 'https://www.facebook.com/share/p/1CG56JyTBy/',
                  tagBn: 'রিপোর্ট ৪ • সীমান্ত সভা',
                  tagEn: 'Report 4',
                  titleBn: 'সীমান্তবর্তী এলাকায় মাদকের কুফল বিষয়ক জনসচেতনতা সভা',
                  titleEn: 'Border-Belt Drug Awareness Assembly'
                },
                {
                  url: 'https://www.facebook.com/share/p/1HXd1GduPy/',
                  tagBn: 'রিপোর্ট ৫ • পরিকল্পনা',
                  tagEn: 'Report 5',
                  titleBn: 'মাদকমুক্ত জয়মনিরহাট গঠনে তরুণ নেতৃত্বের কর্মপরিকল্পনা',
                  titleEn: 'Youth Action Blueprint for a Drug-Free Joymonirhat'
                },
                {
                  url: ORG_DETAILS.facebookPageUrl,
                  tagBn: 'সংগঠনের পেজ',
                  tagEn: 'Official Profile',
                  titleBn: 'আমাদের সকল মাঠপর্যায়ের কার্যক্রমের ভিডিও ও সচিত্র তথ্য দেখতে ভিজিট করুন',
                  titleEn: 'Visit our complete Facebook profile to see all daily activities'
                }
              ].map((post, idx) => (
                <a
                  key={idx}
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white rounded-xl border border-stone-200 hover:border-blue-400 hover:shadow-xs transition-all flex items-start justify-between gap-2 group"
                >
                  <div className="flex-1">
                    <span className="text-[10px] font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded">
                      {language === 'bn' ? post.tagBn : post.tagEn}
                    </span>
                    <p className="mt-1.5 text-xs font-semibold text-slate-800 group-hover:text-blue-900 transition-colors line-clamp-2">
                      {language === 'bn' ? post.titleBn : post.titleEn}
                    </p>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-blue-600 shrink-0 mt-1 transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Expected Outcomes Strip */}
        <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl">
          <div className="max-w-3xl mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
              {language === 'bn' ? 'প্রত্যাশিত সামাজিক ফলাফল' : 'Expected Project Outcomes'}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
              {language === 'bn' 
                ? 'এই প্রকল্পের বাস্তবায়নে জয়মনিরহাটে যে ইতিবাচক রূপান্তর ঘটবে' 
                : 'Projected Transformation for Joymonirhat Community'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(language === 'bn' ? FLAGSHIP_PROJECT.expectedOutcomesBn : FLAGSHIP_PROJECT.expectedOutcomesEn).map((outcome, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3.5 bg-white/10 rounded-xl border border-white/10 backdrop-blur-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span className="text-xs sm:text-sm text-blue-100 leading-relaxed">{outcome}</span>
              </div>
            ))}
          </div>

          {/* Project Call to Action */}
          <div className="mt-8 pt-6 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs sm:text-sm text-blue-200">
              <span className="font-bold text-white">
                {language === 'bn' ? 'প্রকল্পে অংশীদার হতে চান?' : 'Interested in Partnering?'}
              </span>{' '}
              {language === 'bn' 
                ? 'সরকারি-বেসরকারি প্রতিষ্ঠান, উন্নয়ন সংস্থা ও প্রবাসী শুভাকাঙ্ক্ষীদের অংশীদারিত্ব সাদরে আমন্ত্রিত।'
                : 'We welcome institutional partnerships and donations to expand this life-saving initiative.'}
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href={ORG_DETAILS.facebookPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                <span>{language === 'bn' ? 'মাঠপর্যায়ের আপডেট' : 'Field Updates'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              {onOpenVolunteerModal && (
                <button
                  onClick={onOpenVolunteerModal}
                  type="button"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-900 bg-amber-300 hover:bg-amber-400 rounded-lg transition-colors cursor-pointer"
                >
                  <span>{language === 'bn' ? 'প্রকল্পে যুক্ত হোন' : 'Join Project'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
