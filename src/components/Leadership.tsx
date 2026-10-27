import React, { useState, useMemo } from 'react';
import { Users, PhoneCall, ShieldCheck, HeartHandshake, Sparkles, CheckCircle2, Search, LayoutGrid, Table as TableIcon, UserPlus } from 'lucide-react';
import { COMMITTEE_MEMBERS, COMMITTEE_SUMMARY } from '../data/organizationData';
import { Language } from '../types';
import { useLiveContent } from '../utils/contentStore';

interface LeadershipProps {
  language: Language;
  onOpenVolunteerModal?: () => void;
  onOpenAdmin?: () => void;
}

export const Leadership: React.FC<LeadershipProps> = ({ language, onOpenVolunteerModal, onOpenAdmin }) => {
  const { members } = useLiveContent();
  const [filterTab, setFilterTab] = useState<'all' | 'executive' | 'general'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

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
      default: // ১২-৩৬ সাধারণ সদস্য
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

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      // Tab filter
      if (filterTab === 'executive' && member.serialNo > 11) return false;
      if (filterTab === 'general' && member.serialNo <= 11) return false;

      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.trim().toLowerCase();
        const matchNameBn = member.nameBn.toLowerCase().includes(query);
        const matchNameEn = member.nameEn.toLowerCase().includes(query);
        const matchSerialBn = member.serialBn.includes(query);
        const matchSerialEn = member.serialEn.includes(query);
        const matchSerialNo = String(member.serialNo).includes(query);
        const matchPhone = member.phone.includes(query);
        const matchDesignation = member.designationBn.toLowerCase().includes(query) || member.designationEn.toLowerCase().includes(query);

        return matchNameBn || matchNameEn || matchSerialBn || matchSerialEn || matchSerialNo || matchPhone || matchDesignation;
      }

      return true;
    });
  }, [filterTab, searchQuery]);

  return (
    <section id="leadership" className="py-16 lg:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-900 uppercase tracking-widest mb-2">
            <Users className="w-4 h-4 text-blue-800" />
            <span>{language === 'bn' ? 'কার্যনির্বাহী পরিষদ ও সদস্য পরিচিতি' : 'Executive Council & Membership Directory'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {language === 'bn'
              ? '৩৬ সদস্য বিশিষ্ট পূর্ণাঙ্গ পরিষদ ও সদস্য পরিচিতি'
              : '36-Member Official Council & Membership Directory'}
          </h2>
          <p className="mt-3 text-base text-stone-600 leading-relaxed">
            {language === 'bn'
              ? 'যুব উন্নয়ন অধিদপ্তর কুড়িগ্রাম জেলা কার্যালয় কর্তৃক নিবন্ধিত (রেজি: যু.উ.অ/কুড়ি-৮৮/২০২৩) জয়মনিরহাট ইউনিয়ন যুব সংগঠনের ১১ সদস্য বিশিষ্ট পূর্ণাঙ্গ কার্যনির্বাহী পরিষদ এবং ১২ থেকে ৩৬ ক্রমিকের আরও ২৫ জন সাধারণ ও সক্রিয় সদস্যের পূর্ণাঙ্গ পরিচিতি।'
              : 'Officially registered under the Department of Youth Development (Reg: DYD-Kuri-88/2023), our 11-member executive council and 25 general field members (serials 12 to 36) lead grassroots community transformation.'}
          </p>
        </div>

        {/* 4-Stat Membership Overview Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-2xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-900 font-mono">
              {language === 'bn' ? COMMITTEE_SUMMARY.executiveCountBn : COMMITTEE_SUMMARY.executiveCountEn}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-800 mt-1">
              {language === 'bn' ? 'কার্যনির্বাহী পরিষদ' : 'Executive Council'}
            </div>
            <p className="text-[11px] text-stone-500 mt-0.5">
              {language === 'bn' ? '০১ থেকে ১১ ক্রমিক' : 'Serials 01 to 11'}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-2xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-mono">
              {language === 'bn' ? COMMITTEE_SUMMARY.generalCountBn : COMMITTEE_SUMMARY.generalCountEn}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-800 mt-1">
              {language === 'bn' ? 'সাধারণ সদস্য' : 'General Members'}
            </div>
            <p className="text-[11px] text-stone-500 mt-0.5">
              {language === 'bn' ? '১২ থেকে ৩৬ ক্রমিক' : 'Serials 12 to 36'}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-2xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 font-mono">
              {language === 'bn' ? COMMITTEE_SUMMARY.totalMembersBn : COMMITTEE_SUMMARY.totalMembersEn}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-800 mt-1">
              {language === 'bn' ? 'মোট নিবন্ধিত সদস্য' : 'Total Registered Members'}
            </div>
            <p className="text-[11px] text-stone-500 mt-0.5">
              {language === 'bn' ? 'সরকারি তালিকায় অনুমোদিত' : 'Officially certified roster'}
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

        {/* Directory Navigation & Control Bar */}
        <div className="mb-8 bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-2xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
              <button
                type="button"
                onClick={() => setFilterTab('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors shrink-0 cursor-pointer ${
                  filterTab === 'all'
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {language === 'bn' ? 'সকল ৩৬ জন সদস্য' : 'All 36 Members'}
              </button>
              <button
                type="button"
                onClick={() => setFilterTab('executive')}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors shrink-0 cursor-pointer ${
                  filterTab === 'executive'
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {language === 'bn' ? 'কার্যনির্বাহী পরিষদ (০১ - ১১)' : 'Executive Council (01 - 11)'}
              </button>
              <button
                type="button"
                onClick={() => setFilterTab('general')}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors shrink-0 cursor-pointer ${
                  filterTab === 'general'
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {language === 'bn' ? 'সাধারণ সদস্য (১২ - ৩৬)' : 'General Members (12 - 36)'}
              </button>
            </div>

            {/* Search Input & View Toggle */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'bn' ? 'নাম, ক্রমিক বা নম্বর দিয়ে খুঁজুন...' : 'Search name, serial, phone...'}
                  className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 cursor-pointer"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* View Switcher Buttons */}
              <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200 shrink-0">
                <button
                  type="button"
                  onClick={() => setViewMode('cards')}
                  title={language === 'bn' ? 'কার্ড ভিউ' : 'Card View'}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === 'cards' ? 'bg-white text-blue-900 shadow-2xs' : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('table')}
                  title={language === 'bn' ? 'সরকারি তালিকা টেবিল ভিউ' : 'Official Table View'}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === 'table' ? 'bg-white text-blue-900 shadow-2xs' : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  <TableIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-stone-500 pt-3 border-t border-stone-100">
            <span>
              {language === 'bn'
                ? `প্রদর্শন করা হচ্ছে: মোট ${filteredMembers.length} জন সদস্য`
                : `Showing: Total ${filteredMembers.length} members`}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-emerald-700 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'সরকারিভাবে নিবন্ধিত ও যাচাইকৃত' : 'Officially Registered & Verified'}</span>
            </span>
          </div>
        </div>

        {/* Members Display: Card View OR Official Table View */}
        {viewMode === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
            {filteredMembers.map((member, index) => {
              const isExecutive = member.serialNo <= 11;
              return (
                <div
                  key={member.id}
                  className={`bg-white rounded-2xl p-5 border transition-all flex flex-col justify-between group ${
                    isExecutive
                      ? 'border-stone-200 hover:border-blue-400 hover:shadow-md'
                      : 'border-stone-200 hover:border-emerald-300 hover:shadow-xs'
                  }`}
                >
                  <div>
                    {/* Top Bar: Serial Badge + Category / Age */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-800 text-xs font-mono font-bold border border-stone-200">
                        <span>{language === 'bn' ? 'ক্রমিক:' : 'Serial:'}</span>
                        <span className="text-blue-900 font-black">{language === 'bn' ? member.serialBn : member.serialEn}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isExecutive ? 'bg-blue-50 text-blue-800' : 'bg-emerald-50 text-emerald-800'
                        }`}>
                          {isExecutive
                            ? (language === 'bn' ? 'কার্যনির্বাহী' : 'Executive')
                            : (language === 'bn' ? 'সাধারণ সদস্য' : 'General')}
                        </span>
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 text-xs font-medium border border-amber-200/80">
                          <span>{language === 'bn' ? 'বয়স:' : 'Age:'}</span>
                          <span className="font-bold">{language === 'bn' ? member.ageBn : `${member.age} yrs`}</span>
                        </div>
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
                        <div className={`w-12 h-12 rounded-xl text-white font-bold text-base flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform ${
                          isExecutive ? 'bg-gradient-to-br from-blue-900 to-indigo-900' : 'bg-gradient-to-br from-slate-700 to-slate-900'
                        }`}>
                          {getInitials(member.nameBn)}
                        </div>
                      )}
                      <div>
                        <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-900 transition-colors leading-snug">
                          {language === 'bn' ? member.nameBn : member.nameEn}
                        </h4>
                        <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[11px] font-bold border ${getRoleBadgeColor(member.serialNo - 1)}`}>
                          {language === 'bn' ? member.designationBn : member.designationEn}
                        </span>
                      </div>
                    </div>

                    {/* Quote / Message if available */}
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
              );
            })}
          </div>
        ) : (
          /* Official Table View (Matching Government Registry Document) */
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs mb-14">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-100/80 border-b border-stone-200 text-slate-800 text-xs sm:text-sm font-bold">
                    <th className="py-3 px-4 text-center w-16">
                      {language === 'bn' ? 'ক্রমিক' : 'Serial'}
                    </th>
                    <th className="py-3 px-4">
                      {language === 'bn' ? 'সদস্যের নাম' : 'Member Name'}
                    </th>
                    <th className="py-3 px-4">
                      {language === 'bn' ? 'পদবী' : 'Designation'}
                    </th>
                    <th className="py-3 px-4 text-center">
                      {language === 'bn' ? 'বয়স' : 'Age'}
                    </th>
                    <th className="py-3 px-4">
                      {language === 'bn' ? 'মোবাইল নম্বর' : 'Mobile Number'}
                    </th>
                    <th className="py-3 px-4 text-center">
                      {language === 'bn' ? 'সরাসরি যোগাযোগ' : 'Action'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-xs sm:text-sm text-slate-700">
                  {filteredMembers.map((member) => {
                    const isExecutive = member.serialNo <= 11;
                    return (
                      <tr
                        key={member.id}
                        className={`hover:bg-blue-50/50 transition-colors ${
                          isExecutive ? 'bg-blue-50/20' : ''
                        }`}
                      >
                        <td className="py-3 px-4 text-center font-mono font-bold text-blue-900">
                          {language === 'bn' ? member.serialBn : member.serialEn}
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900">
                            {language === 'bn' ? member.nameBn : member.nameEn}
                          </div>
                          <div className="text-[11px] text-stone-500">
                            {language === 'bn' ? member.villageBn : member.villageEn}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold border ${getRoleBadgeColor(member.serialNo - 1)}`}>
                            {language === 'bn' ? member.designationBn : member.designationEn}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center font-mono font-semibold text-stone-700">
                          {language === 'bn' ? member.ageBn : `${member.age} yrs`}
                        </td>
                        <td className="py-3 px-4 font-mono font-semibold text-slate-800">
                          {member.phone}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <a
                            href={`tel:${member.phone}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-lg text-xs font-semibold transition-colors"
                          >
                            <PhoneCall className="w-3.5 h-3.5 text-emerald-700" />
                            <span>{language === 'bn' ? 'কল করুন' : 'Call'}</span>
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* General Members & Field Volunteer Brigade (৩৬ জন সদস্যের ভূমিকা ও ওয়ার্ড সমন্বয়) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-blue-200/80 shadow-sm relative overflow-hidden">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-widest mb-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{language === 'bn' ? 'মাঠপর্যায়ের যুবশক্তি ও ওয়ার্ড বিস্তৃতি' : 'Grassroots Youth Force & Ward Coverage'}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {language === 'bn'
                ? '১২ থেকে ৩৬ ক্রমিক: ২৫ জন সাধারণ সদস্যের সক্রিয় ভূমিকা'
                : 'Serials 12 to 36: Active Role of 25 General Members'}
            </h3>
            <p className="mt-2 text-sm sm:text-base text-stone-600 leading-relaxed">
              {language === 'bn'
                ? 'নির্বাহী পরিষদের ১১ জন কর্মকর্তার নেতৃত্বাধীন এই সংগঠনে ১২ থেকে ৩৬ নম্বর ক্রমিকের ২৫ জন উদ্যমী ও সমাজসেবী সাধারণ সদস্য জয়মনিরহাট ইউনিয়নের ৯টি ওয়ার্ডে সার্বক্ষণিক দায়িত্ব পালন করেন। জরুরি রক্তদান, বৃক্ষরোপণ, শীতার্তদের কম্বল বিতরণ, প্রাকৃতিক দুর্যোগে ত্রাণ ও মাদক প্রতিরোধে তাঁরা দিন-রাত মাঠে নিয়োজিত থাকেন।'
                : 'Beyond our 11 executive council leaders, 25 dedicated general members (serials 12 to 36) across all 9 wards of Joymonirhat Union power our front-line relief, blood donations, environmental drives, and anti-narcotics vigilance.'}
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
