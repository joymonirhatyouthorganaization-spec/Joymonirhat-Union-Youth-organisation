import React from 'react';
import { Users, PhoneCall, ShieldCheck, HeartHandshake, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { COMMITTEE_MEMBERS, COMMITTEE_SUMMARY, ORG_DETAILS } from '../data/organizationData';
import { Language } from '../types';

interface LeadershipProps {
  language: Language;
  onOpenVolunteerModal?: () => void;
}

export const Leadership: React.FC<LeadershipProps> = ({ language, onOpenVolunteerModal }) => {
  // Designated color accents for different committee roles
  const getRoleBadgeColor = (index: number) => {
    switch (index) {
      case 0: // সভাপতি
        return 'bg-blue-100 text-blue-900 border-blue-200';
      case 1: // সহ-সভাপতি
        return 'bg-indigo-100 text-indigo-900 border-indigo-200';
      case 2: // সাধারণ সম্পাদক
        return 'bg-amber-100 text-amber-900 border-amber-200';
      case 3: // যুগ্ম সাধারণ সম্পাদক
        return 'bg-sky-100 text-sky-900 border-sky-200';
      case 4: // সাংগঠনিক সম্পাদক
        return 'bg-emerald-100 text-emerald-900 border-emerald-200';
      case 5: // প্রচার সম্পাদক
        return 'bg-purple-100 text-purple-900 border-purple-200';
      case 6: // অর্থ বিষয়ক সম্পাদক
        return 'bg-teal-100 text-teal-900 border-teal-200';
      case 7: // নারী ও শিশু বিষয়ক সম্পাদক
        return 'bg-rose-100 text-rose-900 border-rose-200';
      case 8: // প্রশিক্ষণ বিষয়ক সম্পাদক
        return 'bg-orange-100 text-orange-900 border-orange-200';
      case 9: // ধর্ম বিষয়ক সম্পাদক
        return 'bg-lime-100 text-lime-900 border-lime-200';
      case 10: // যুব ও ক্রীড়া বিষয়ক সম্পাদক
        return 'bg-cyan-100 text-cyan-900 border-cyan-200';
      default:
        return 'bg-stone-100 text-stone-800 border-stone-200';
    }
  };

  const getInitials = (name: string) => {
    const parts = name.split(' ').filter(Boolean);
    if (parts.length >= 2) {
      return parts[parts.length - 2][0] + parts[parts.length - 1][0];
    }
    return name.slice(0, 2);
  };

  return (
    <section id="leadership" className="py-16 lg:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-900 uppercase tracking-widest mb-2">
            <Users className="w-4 h-4 text-blue-800" />
            <span>{language === 'bn' ? 'কার্যনির্বাহী পরিষদ ও সদস্য পরিচিতি' : 'Executive Council & Membership'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {language === 'bn'
              ? '১১ সদস্য বিশিষ্ট পূর্ণাঙ্গ নির্বাহী পরিষদ ও সদস্য পরিচিতি'
              : '11-Member Full Executive Committee & Membership Directory'}
          </h2>
          <p className="mt-3 text-base text-stone-600 leading-relaxed">
            {language === 'bn'
              ? 'যুব উন্নয়ন অধিদপ্তর কুড়িগ্রাম জেলা কার্যালয় কর্তৃক নিবন্ধিত (রেজি: যু.উ.অ/কুড়ি-৮৮/২০২৩) জয়মনিরহাট ইউনিয়ন যুব সংগঠনের ১১ সদস্য বিশিষ্ট পূর্ণাঙ্গ কার্যনির্বাহী পরিষদ এবং ইউনিয়নব্যাপী আরও ৩৬ জন নিবেদিতপ্রাণ সদস্যের তথ্য।'
              : 'Officially registered under the Department of Youth Development (Reg: DYD-Kuri-88/2023), our 11-member executive council and 36 field volunteers lead grassroots community transformation.'}
          </p>
        </div>

        {/* 4-Stat Membership Overview Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-2xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-900 font-mono">
              {language === 'bn' ? COMMITTEE_SUMMARY.executiveCountBn : COMMITTEE_SUMMARY.executiveCountEn}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-800 mt-1">
              {language === 'bn' ? 'নির্বাহী পরিষদ কর্মকর্তা' : 'Executive Officers'}
            </div>
            <p className="text-[11px] text-stone-500 mt-0.5">
              {language === 'bn' ? 'সভাপতি ও সাধারণ সম্পাদক সহ' : 'President, Sec & Department heads'}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-2xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-mono">
              {language === 'bn' ? COMMITTEE_SUMMARY.generalCountBn : COMMITTEE_SUMMARY.generalCountEn}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-800 mt-1">
              {language === 'bn' ? 'সাধারণ ও সক্রিয় সদস্য' : 'General & Field Members'}
            </div>
            <p className="text-[11px] text-stone-500 mt-0.5">
              {language === 'bn' ? '৯টি ওয়ার্ডের মাঠপর্যায়ের তরুণ' : 'Active youth in all 9 wards'}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-2xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 font-mono">
              {language === 'bn' ? COMMITTEE_SUMMARY.totalMembersBn : COMMITTEE_SUMMARY.totalMembersEn}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-800 mt-1">
              {language === 'bn' ? 'মোট নিবন্ধিত সদস্য পরিবার' : 'Total Registered Members'}
            </div>
            <p className="text-[11px] text-stone-500 mt-0.5">
              {language === 'bn' ? 'তারুণ্যের সম্মিলিত শক্তি' : 'United youth force for good'}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-2xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-700 font-mono">
              ১০০%
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-800 mt-1">
              {language === 'bn' ? 'অরাজনৈতিক ও নিঃস্বার্থ' : 'Non-Political Service'}
            </div>
            <p className="text-[11px] text-stone-500 mt-0.5">
              {language === 'bn' ? 'সেবায় শক্তি, মানবতায় ঐক্য' : 'Strength in Service & Unity'}
            </p>
          </div>
        </div>

        {/* Executive Committee - Top 2 Leadership Spotlight: President & General Secretary */}
        <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl mb-12 relative overflow-hidden border border-blue-900">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
              {language === 'bn' ? 'নেতৃত্বের অঙ্গীকার ও রূপরেখা' : 'Core Executive Leadership'}
            </span>
            <span className="text-xs text-blue-200">·</span>
            <span className="text-xs text-blue-200">
              {language === 'bn' ? 'রেজি: যু.উ.অ/কুড়ি-৮৮/২০২৩' : 'Reg: DYD-Kuri-88/2023'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/15">
            {/* President */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="relative shrink-0">
                {COMMITTEE_MEMBERS[0].photo ? (
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shadow-xl ring-2 ring-amber-400/90 bg-slate-800">
                    <img
                      src={COMMITTEE_MEMBERS[0].photo}
                      alt={COMMITTEE_MEMBERS[0].nameBn}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-200 text-blue-950 font-black text-2xl flex items-center justify-center shadow-lg">
                    {getInitials(COMMITTEE_MEMBERS[0].nameBn)}
                  </div>
                )}
                <span className="absolute -top-2 -right-2 px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[11px] font-mono font-bold shadow-md border border-white/20">
                  {COMMITTEE_MEMBERS[0].serialBn}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-amber-400 text-blue-950 shadow-xs">
                    {language === 'bn' ? COMMITTEE_MEMBERS[0].designationBn : COMMITTEE_MEMBERS[0].designationEn}
                  </span>
                  <span className="text-xs text-amber-200 font-mono">
                    {language === 'bn' ? `বয়স: ${COMMITTEE_MEMBERS[0].ageBn}` : `Age: ${COMMITTEE_MEMBERS[0].age}`}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1.5">
                  {language === 'bn' ? COMMITTEE_MEMBERS[0].nameBn : COMMITTEE_MEMBERS[0].nameEn}
                </h3>
                <p className="text-xs sm:text-sm text-blue-200 mt-1 leading-relaxed">
                  "{language === 'bn' ? COMMITTEE_MEMBERS[0].messageBn : COMMITTEE_MEMBERS[0].messageEn}"
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <a
                    href={`tel:${COMMITTEE_MEMBERS[0].phone}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-xs font-medium text-white transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{COMMITTEE_MEMBERS[0].phone}</span>
                  </a>
                  <span className="text-xs text-blue-300">
                    {language === 'bn' ? COMMITTEE_MEMBERS[0].villageBn : COMMITTEE_MEMBERS[0].villageEn}
                  </span>
                </div>
              </div>
            </div>

            {/* General Secretary */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pt-6 md:pt-0 md:pl-8">
              <div className="relative shrink-0">
                {COMMITTEE_MEMBERS[2].photo ? (
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shadow-xl ring-2 ring-blue-400/90 bg-slate-800">
                    <img
                      src={COMMITTEE_MEMBERS[2].photo}
                      alt={COMMITTEE_MEMBERS[2].nameBn}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-400 to-indigo-300 text-blue-950 font-black text-2xl flex items-center justify-center shadow-lg">
                    {getInitials(COMMITTEE_MEMBERS[2].nameBn)}
                  </div>
                )}
                <span className="absolute -top-2 -right-2 px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[11px] font-mono font-bold shadow-md border border-white/20">
                  {COMMITTEE_MEMBERS[2].serialBn}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-blue-400 text-blue-950 shadow-xs">
                    {language === 'bn' ? COMMITTEE_MEMBERS[2].designationBn : COMMITTEE_MEMBERS[2].designationEn}
                  </span>
                  <span className="text-xs text-blue-200 font-mono">
                    {language === 'bn' ? `বয়স: ${COMMITTEE_MEMBERS[2].ageBn}` : `Age: ${COMMITTEE_MEMBERS[2].age}`}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1.5">
                  {language === 'bn' ? COMMITTEE_MEMBERS[2].nameBn : COMMITTEE_MEMBERS[2].nameEn}
                </h3>
                <p className="text-xs sm:text-sm text-blue-200 mt-1 leading-relaxed">
                  "{language === 'bn' ? COMMITTEE_MEMBERS[2].messageBn : COMMITTEE_MEMBERS[2].messageEn}"
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <a
                    href={`tel:${COMMITTEE_MEMBERS[2].phone}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-xs font-medium text-white transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{COMMITTEE_MEMBERS[2].phone}</span>
                  </a>
                  <span className="text-xs text-blue-300">
                    {language === 'bn' ? COMMITTEE_MEMBERS[2].villageBn : COMMITTEE_MEMBERS[2].villageEn}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 11 Executive Committee Members Full Grid */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                {language === 'bn' ? 'নির্বাহী কমিটির ১১ জন সদস্যের তালিকা' : 'Full Executive Committee (11 Members)'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                {language === 'bn'
                  ? 'ক্রমিক নম্বর, নাম, পদবী, বয়স ও সরাসরি যোগাযোগের নম্বর সহ বিস্তারিত'
                  : 'Complete directory including serial number, name, designation, age, and phone'}
              </p>
            </div>
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-900 border border-blue-200 rounded-full text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
              <span>{language === 'bn' ? 'যুব উন্নয়ন অধিদপ্তর অনুমোদিত' : 'DYD Approved'}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {COMMITTEE_MEMBERS.map((member, index) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl p-5 border border-stone-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar: Serial Badge + Age Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-800 text-xs font-mono font-bold border border-stone-200">
                      <span>{language === 'bn' ? 'ক্রমিক:' : 'Serial:'}</span>
                      <span className="text-blue-900 font-black">{language === 'bn' ? member.serialBn : member.serialEn}</span>
                    </div>

                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-900 text-xs font-medium border border-amber-200/80">
                      <span>{language === 'bn' ? 'বয়স:' : 'Age:'}</span>
                      <span className="font-bold">{language === 'bn' ? member.ageBn : `${member.age} yrs`}</span>
                    </div>
                  </div>

                  {/* Member Name & Designation */}
                  <div className="flex items-start gap-3.5 mt-2">
                    {member.photo ? (
                      <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 shadow-xs border-2 border-blue-900/20 bg-stone-100 group-hover:scale-105 transition-transform">
                        <img
                          src={member.photo}
                          alt={member.nameBn}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-900 to-indigo-900 text-white font-bold text-base flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                        {getInitials(member.nameBn)}
                      </div>
                    )}
                    <div>
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-900 transition-colors leading-snug">
                        {language === 'bn' ? member.nameBn : member.nameEn}
                      </h4>
                      <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[11px] font-bold border ${getRoleBadgeColor(index)}`}>
                        {language === 'bn' ? member.designationBn : member.designationEn}
                      </span>
                    </div>
                  </div>

                  {/* Quote / Focus Area */}
                  {member.messageBn && (
                    <p className="mt-3.5 text-xs text-stone-600 leading-relaxed border-t border-stone-100 pt-2.5">
                      "{language === 'bn' ? member.messageBn : member.messageEn}"
                    </p>
                  )}
                </div>

                {/* Footer: Phone Call Action & Location */}
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-stone-500 truncate">
                    {language === 'bn' ? member.villageBn : member.villageEn}
                  </span>

                  <a
                    href={`tel:${member.phone}`}
                    className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-lg text-xs font-semibold transition-colors"
                    title={`Call ${member.phone}`}
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-700" />
                    <span className="font-mono">{member.phone}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* General Members & Field Volunteer Brigade (৩৬ জন সাধারণ সদস্য) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-blue-200/80 shadow-sm relative overflow-hidden">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-widest mb-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{language === 'bn' ? 'মাঠপর্যায়ের যুবশক্তি' : 'Grassroots Youth Force'}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {language === 'bn'
                ? '৩৬ জন সাধারণ ও সক্রিয় স্বেচ্ছাসেবক সদস্য'
                : '36 General Members & Active Field Volunteers'}
            </h3>
            <p className="mt-2 text-sm sm:text-base text-stone-600 leading-relaxed">
              {language === 'bn'
                ? 'নির্বাহী পরিষদের ১১ জন কর্মকর্তার নেতৃত্বাধীন এই সংগঠনে রয়েছেন জয়মনিরহাট ইউনিয়নের ৯টি ওয়ার্ডের আরও ৩৬ জন উদ্যমী ও সমাজসেবী সাধারণ সদস্য। জরুরি রক্তদান, বৃক্ষরোপণ, শীতার্তদের কম্বল বিতরণ, প্রাকৃতিক দুর্যোগে ত্রাণ ও মাদক প্রতিরোধে তাঁরা দিন-রাত মাঠে নিয়োজিত থাকেন।'
                : 'Beyond our 11 executive officers, 36 dedicated youth members across all 9 wards of Joymonirhat Union power our front-line relief, blood donations, environmental drives, and social vigilance.'}
            </p>
          </div>

          {/* 9-Ward Distribution Matrix */}
          <div className="mt-6 pt-6 border-t border-stone-100">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
              {language === 'bn' ? 'ইউনিয়নব্যাপী ৯টি ওয়ার্ডে সদস্য বিস্তৃতি:' : 'Union-Wide Ward Distribution of Members:'}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {[
                { ward: 'ওয়ার্ড নং ১', desc: 'অষ্টমীর ঘাট ও বাজার এরিয়া' },
                { ward: 'ওয়ার্ড নং ২', desc: 'উত্তর জয়মনিরহাট' },
                { ward: 'ওয়ার্ড নং ৩', desc: 'পূর্ব জয়মনিরহাট ও চরাঞ্চল' },
                { ward: 'ওয়ার্ড নং ৪', desc: 'মধ্যপাড়া ও স্কুল সংযোগ' },
                { ward: 'ওয়ার্ড নং ৫', desc: 'দক্ষিণ জয়মনিরহাট' },
                { ward: 'ওয়ার্ড নং ৬', desc: 'সীমান্তবর্তী পাহারা বেল্ট' },
                { ward: 'ওয়ার্ড নং ৭', desc: 'পশ্চিমপাড়া যুব দল' },
                { ward: 'ওয়ার্ড নং ৮', desc: 'নদীপাড় ও চর উন্নয়ন স্কোয়াড' },
                { ward: 'ওয়ার্ড নং ৯', desc: 'দক্ষিণ চর ও প্রান্তিক সেবা' },
                { ward: 'সমন্বয় সেল', desc: 'জরুরি রক্তদান ও ত্রাণ স্কোয়াড' },
              ].map((item, idx) => (
                <div key={idx} className="p-2.5 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="text-xs font-bold text-blue-900 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{item.ward}</span>
                  </div>
                  <div className="text-[11px] text-stone-500 mt-0.5 truncate">
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Join as Member CTA */}
          <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs sm:text-sm text-stone-600">
              <span className="font-semibold text-slate-900">
                {language === 'bn' ? 'আপনিও কি সমাজসেবায় যুক্ত হতে চান?' : 'Want to join our youth movement?'}
              </span>{' '}
              {language === 'bn'
                ? 'জয়মনিরহাটের যেকোনো সৎ, কর্মঠ ও অরাজনৈতিক তরুণ-তরুণী আমাদের সংগঠনে সদস্য হতে পারেন।'
                : 'Any energetic youth of Joymonirhat committed to selfless service can join as a member.'}
            </div>

            {onOpenVolunteerModal && (
              <button
                onClick={onOpenVolunteerModal}
                type="button"
                className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <HeartHandshake className="w-4 h-4 text-amber-300" />
                <span>{language === 'bn' ? 'সদস্য / ভলান্টিয়ার হিসেবে আবেদন করুন' : 'Apply for Membership'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
