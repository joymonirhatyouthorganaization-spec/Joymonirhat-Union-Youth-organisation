import React from 'react';
import { ShieldCheck, Target, Eye, Users, Award, MapPin, CheckCircle2, Quote, Sparkles } from 'lucide-react';
import { ORG_DETAILS, COMMITTEE_MEMBERS } from '../data/organizationData';
import { Language } from '../types';

interface AboutProps {
  language: Language;
}

export const About: React.FC<AboutProps> = ({ language }) => {
  const objectives = [
    {
      titleBn: 'দক্ষ ও দায়িত্বশীল নাগরিক গঠন',
      titleEn: 'Skilled & Responsible Youth',
      descBn: 'যুবসমাজকে সুসংগঠিত, সুশৃঙ্খল, আত্মনির্ভরশীল ও মানবিক নাগরিক হিসেবে গড়ে তোলা।',
      descEn: 'Organizing rural youth into disciplined, self-reliant, and responsible community leaders.'
    },
    {
      titleBn: 'মাদকদ্রব্যের বিস্তার প্রতিরোধ',
      titleEn: 'Substance Abuse Prevention',
      descBn: 'মাদকদ্রব্যের অপব্যবহার ও অবৈধ বিস্তার প্রতিরোধে তৃণমূল পর্যায়ে ধারাবাহিক সামাজিক সচেতনতা তৈরি।',
      descEn: 'Preventing substance abuse through pervasive community vigilance and adolescent seminars.'
    },
    {
      titleBn: 'চিকিৎসা ও পুনর্বাসনে উৎসাহ',
      titleEn: 'Detox & Rehabilitation Support',
      descBn: 'মাদকাসক্ত ব্যক্তিদের বৈষম্য না করে তাঁদের চিকিৎসা, কাউন্সেলিং ও স্বাভাবিক জীবনে ফিরতে উৎসাহিত করা।',
      descEn: 'Stigma-free counseling encouraging medical treatment, psychosocial recovery, and social reintegration.'
    },
    {
      titleBn: 'বাল্যবিবাহ ও শিশু সুরক্ষা',
      titleEn: 'Child Marriage Prevention',
      descBn: 'বাল্যবিবাহ প্রতিরোধ এবং ঝুঁকিপূর্ণ মেয়ে শিশুদের তালিকাভুক্ত করে শিক্ষা ও সার্বিক সুরক্ষা নিশ্চিত করা।',
      descEn: 'Protecting vulnerable young girls, curbing early marriage, and tracking school retention.'
    },
    {
      titleBn: 'নারী ও শিশু নির্যাতন প্রতিরোধ',
      titleEn: 'Rights Protection & Gender Safety',
      descBn: 'নারী ও শিশুর প্রতি সহিংসতা, যৌতুক প্রথা এবং পারিবারিক নির্যাতন প্রতিরোধে জনসচেতনতা বৃদ্ধি।',
      descEn: 'Advocating against domestic violence, dowry abuses, and street harassment.'
    },
    {
      titleBn: 'আইসিটি ও কর্মমুখী কারিগরি প্রশিক্ষণ',
      titleEn: 'ICT & Vocational TVET Training',
      descBn: 'যুবকদের তথ্যপ্রযুক্তি, গবাদিপশু পালন, মৎস্য ও বৃত্তিমূলক প্রশিক্ষণের মাধ্যমে কর্মসংস্থানের উপযোগী করা।',
      descEn: 'Equipping youth with computer literacy, livestock farming, aquaculture, and TVET vocations.'
    },
    {
      titleBn: 'খেলাধুলা ও সুস্থ বিনোদন',
      titleEn: 'Sports & Creative Recreation',
      descBn: 'খেলাধুলা, যুব উৎসব ও সাংস্কৃতিক কার্যক্রমের মাধ্যমে তরুণদের অবসর সময়কে ইতিবাচক খাতে পরিচালিত করা।',
      descEn: 'Organizing sports tournaments and festivals to redirect youthful energy away from addiction.'
    },
    {
      titleBn: 'প্রাতিষ্ঠানিক উন্নয়ন অংশীদারিত্ব',
      titleEn: 'Institutional Synergy',
      descBn: 'সরকারি অধিদপ্তর ও আন্তর্জাতিক-জাতীয় উন্নয়ন সহযোগী সংস্থার সাথে সমন্বয়ে স্থানীয় উন্নয়ন বাস্তবায়ন।',
      descEn: 'Collaborating actively with government departments, local union parishad, and NGO leaders.'
    }
  ];

  return (
    <section id="about" className="py-16 lg:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-900 uppercase tracking-widest mb-2 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/80">
            <Award className="w-4 h-4 text-amber-500" />
            <span>{language === 'bn' ? 'আমাদের পরিচিতি ও রূপরেখা' : 'Institutional Profile'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {language === 'bn'
              ? 'তারুণ্যের শক্তিতে গড়ি সচেতন, মাদকমুক্ত ও মানবিক সমাজ'
              : 'Building a Conscious, Drug-Free & Humanitarian Society with Youth Power'}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-600 leading-relaxed">
            {language === 'bn'
              ? 'জয়মনিরহাট ইউনিয়ন যুব সংগঠন (JUYO) একটি অরাজনৈতিক, স্বেচ্ছাসেবী ও জনকল্যাণমূলক সামাজিক প্রতিষ্ঠান। ২১ ডিসেম্বর ২০২১ তারিখে প্রতিষ্ঠিত হয়ে ৯ অক্টোবর ২০২৩ তারিখে যুব উন্নয়ন অধিদপ্তর, কুড়িগ্রাম থেকে সরকারি নিবন্ধন লাভ করে।'
              : 'Joymonirhat Union Youth Organization (JUYO) is a legally registered, non-political voluntary institution founded on Dec 21, 2021 and accredited by the Department of Youth Development, Kurigram on Oct 9, 2023 (Reg: DYD-Kuri-88/2023).'}
          </p>
        </div>

        {/* Inspirational Motto Quote Ribbon */}
        <div className="mb-12 p-6 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white rounded-3xl shadow-sm border border-blue-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-blue-950 flex items-center justify-center shrink-0">
              <Quote className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm sm:text-base font-semibold italic text-amber-200">
                {language === 'bn' 
                  ? '“বয়স্করা ইতিহাস লেখে, কিন্তু যুবসমাজ ইতিহাস তৈরি করে।”' 
                  : '“Elders write history, but the youth create history.”'}
              </p>
              <p className="text-xs text-blue-200 mt-1">
                {language === 'bn'
                  ? 'তারুণ্যের শক্তি, স্বেচ্ছাসেবার অঙ্গীকার, সমাজ পরিবর্তনের প্রত্যয়।'
                  : 'Power of Youth, Commitment to Volunteerism, Determination for Social Change.'}
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-xl text-xs text-blue-100 border border-white/10">
            <Users className="w-4 h-4 text-emerald-400" />
            <span>
              {language === 'bn' ? '৩৬ জন সদস্য · ১৪ পুরুষ ও ২২ নারী' : '36 Members · 14 Male & 22 Female'}
            </span>
          </div>
        </div>

        {/* 2-Column Split: Detailed Story & Official Registration Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Left: Origin & Demographic Transparency */}
          <div className="lg:col-span-7 bg-stone-50 rounded-3xl p-6 sm:p-8 border border-stone-200 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900">
                {language === 'bn' ? 'সংগঠনের প্রেক্ষাপট ও আত্মপ্রকাশ' : 'Origin & Democratic Tenets'}
              </h3>
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
                {language === 'bn'
                  ? 'বাংলাদেশের মোট জনসংখ্যার এক-তৃতীয়াংশ যুবসমাজ। দেশের সামগ্রিক উন্নয়ন, সামাজিক পরিবর্তন এবং একটি সুন্দর ভবিষ্যৎ বিনির্মাণে যুবসমাজের ভূমিকা অপরিসীম। এই সম্ভাবনাময় যুবসমাজকে সুসংগঠিত, সুশৃঙ্খল ও দক্ষ জনশক্তিতে রূপান্তরিত করে স্বেচ্ছাসেবামূলক কার্যক্রমে সম্পৃক্ত করতে ২০২১ সালের ২১ ডিসেম্বর জয়মনিরহাট ইউনিয়ন যুব সংগঠনের জন্ম হয়।'
                  : 'One-third of Bangladesh is youth. To channel this boundless potential into constructive civic progress, JUYO was established on December 21, 2021 by progressive community youths in Bhurungamari, Kurigram.'}
              </p>
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
                {language === 'bn'
                  ? 'বর্তমানে সংগঠনটির মোট ৩৬ জন সাধারণ সদস্য রয়েছেন; তাঁদের মধ্যে ১৪ জন পুরুষ ও ২২ জন নারী (৬১% নারী অংশগ্রহণ)। সদস্যদের প্রত্যেকের বয়স ১৮ থেকে ২৪ বছরের মধ্যে। গণতান্ত্রিক রীতির প্রতি শতভাগ শ্রদ্ধা রেখে সদস্যদের প্রত্যক্ষ ভোটের মাধ্যমে আগামী ২ বছরের মেয়াদের জন্য ১১ সদস্যবিশিষ্ট একটি পূর্ণাঙ্গ কার্যনির্বাহী কমিটি গঠন করা হয়েছে।'
                  : 'Currently, JUYO boasts 36 registered general members (14 male and 22 female—over 61% women participation), all aged 18 to 24. Through direct ballot, an 11-member executive council leads the organization for a two-year constitutional tenure.'}
              </p>

              {/* Leadership Spotlight Mini-Card */}
              <div className="mt-5 p-3.5 bg-white rounded-2xl border border-stone-200 shadow-2xs">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                  <span>{language === 'bn' ? 'সংগঠনের শীর্ষ নেতৃত্ব' : 'Key Executive Officers'}</span>
                  <a href="#leadership" className="text-[11px] text-blue-700 hover:underline font-semibold">
                    {language === 'bn' ? 'পূর্ণাঙ্গ ১১ সদস্য দেখুন →' : 'View Full 11 Members →'}
                  </a>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* President */}
                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/90">
                    <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 ring-2 ring-amber-400 shadow-xs bg-slate-800">
                      <img
                        src={COMMITTEE_MEMBERS[0].photo}
                        alt={COMMITTEE_MEMBERS[0].nameBn}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-blue-950">
                        {language === 'bn' ? 'সভাপতি' : 'President'}
                      </span>
                      <div className="text-xs sm:text-sm font-bold text-slate-900 truncate mt-0.5">
                        {language === 'bn' ? COMMITTEE_MEMBERS[0].nameBn : COMMITTEE_MEMBERS[0].nameEn}
                      </div>
                      <a href={`tel:${COMMITTEE_MEMBERS[0].phone}`} className="text-[11px] text-stone-600 font-mono hover:text-blue-900">
                        {COMMITTEE_MEMBERS[0].phone}
                      </a>
                    </div>
                  </div>

                  {/* General Secretary */}
                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-blue-50/70 border border-blue-200/90">
                    <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 ring-2 ring-blue-400 shadow-xs bg-slate-800">
                      <img
                        src={COMMITTEE_MEMBERS[2].photo}
                        alt={COMMITTEE_MEMBERS[2].nameBn}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-500 text-white">
                        {language === 'bn' ? 'সাধারণ সম্পাদক' : 'Gen. Secretary'}
                      </span>
                      <div className="text-xs sm:text-sm font-bold text-slate-900 truncate mt-0.5">
                        {language === 'bn' ? COMMITTEE_MEMBERS[2].nameBn : COMMITTEE_MEMBERS[2].nameEn}
                      </div>
                      <a href={`tel:${COMMITTEE_MEMBERS[2].phone}`} className="text-[11px] text-stone-600 font-mono hover:text-blue-900">
                        {COMMITTEE_MEMBERS[2].phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Demographics Matrix */}
            <div className="mt-6 pt-6 border-t border-stone-200 grid grid-cols-3 gap-2.5 text-center">
              <div className="p-2.5 bg-white rounded-xl border border-stone-200">
                <div className="text-lg font-black text-blue-900 font-mono">৩৬ জন</div>
                <div className="text-[11px] text-stone-500">{language === 'bn' ? 'মোট সদস্য' : 'Total Members'}</div>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-stone-200">
                <div className="text-lg font-black text-rose-700 font-mono">২২ জন নারী</div>
                <div className="text-[11px] text-stone-500">{language === 'bn' ? 'নারী নেতৃত্ব (৬১%)' : 'Women (61%)'}</div>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-stone-200">
                <div className="text-lg font-black text-indigo-700 font-mono">১৮-২৪ বছর</div>
                <div className="text-[11px] text-stone-500">{language === 'bn' ? 'তারুণ্যের বয়সসীমা' : 'Age Bracket'}</div>
              </div>
            </div>
          </div>

          {/* Right: Official Government Accreditation Card */}
          <div className="lg:col-span-5 bg-blue-950 text-white rounded-3xl p-6 sm:p-8 border border-blue-900 flex flex-col justify-between shadow-md">
            <div>
              <div className="flex items-center justify-between border-b border-blue-800/80 pb-4">
                <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold">
                  {language === 'bn' ? 'সরকারি স্বীকৃতি ও নিবন্ধন সনদ' : 'Official Government Registration'}
                </span>
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>

              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-3 pb-3 border-b border-blue-900/60">
                  <div>
                    <div className="text-xs text-blue-200 font-medium">
                      {language === 'bn' ? 'প্রতিষ্ঠা তারিখ' : 'Foundation Date'}
                    </div>
                    <div className="text-base font-bold font-mono text-amber-300 mt-0.5">
                      {language === 'bn' ? ORG_DETAILS.establishedDateBn : ORG_DETAILS.establishedDateEn}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-blue-200 font-medium">
                      {language === 'bn' ? 'নিবন্ধন তারিখ' : 'Registration Date'}
                    </div>
                    <div className="text-base font-bold font-mono text-emerald-300 mt-0.5">
                      {language === 'bn' ? ORG_DETAILS.regDateBn : ORG_DETAILS.regDateEn}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-blue-200 font-medium">
                    {language === 'bn' ? 'নিবন্ধন নম্বর' : 'Registration Number'}
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-white mt-0.5">
                    {language === 'bn' ? ORG_DETAILS.regNumberBn : ORG_DETAILS.regNumberEn}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-blue-200 font-medium">
                    {language === 'bn' ? 'নিবন্ধনকারী অধিদপ্তর' : 'Registration Authority'}
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-white mt-0.5">
                    {language === 'bn' ? ORG_DETAILS.regAuthorityBn : ORG_DETAILS.regAuthorityEn}
                  </div>
                  <div className="text-xs text-blue-300 mt-0.5">
                    {language === 'bn' ? 'যুব ও ক্রীড়া মন্ত্রণালয়, গণপ্রজাতন্ত্রী বাংলাদেশ সরকার' : 'Ministry of Youth and Sports, Govt. of Bangladesh'}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-blue-200 font-medium">
                    {language === 'bn' ? 'প্রধান কার্যালয়' : 'Headquarters'}
                  </div>
                  <div className="text-xs sm:text-sm text-stone-200 mt-0.5">
                    {language === 'bn' ? ORG_DETAILS.addressBn : ORG_DETAILS.addressEn}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-blue-900/80 text-xs text-blue-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                {language === 'bn'
                  ? 'যুব উন্নয়ন অধিদপ্তরের নিয়মিত তদারকি ও বিধিমালার অধীন পরিচালিত'
                  : 'Monitored under statutory rules of the Department of Youth Development'}
              </span>
            </div>
          </div>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Vision */}
          <div className="bg-gradient-to-br from-amber-50/70 to-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-2xs">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700 mb-4">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              {language === 'bn' ? 'আমাদের দৃষ্টিভঙ্গি (Vision)' : 'Our Vision'}
            </h3>
            <p className="mt-3 text-sm sm:text-base text-stone-700 leading-relaxed">
              {language === 'bn'
                ? 'যুবসমাজের শক্তি, সৃজনশীলতা ও নেতৃত্বকে কাজে লাগিয়ে এমন একটি জয়মনিরহাট গড়ে তোলা; যেখানে তরুণরা মাদকের পরিবর্তে শিক্ষা ও খেলাধুলায় মাতবে, কন্যাশিশুরা নিরাপদে বেড়ে উঠবে এবং প্রতিটি মানুষ মানবিক মর্যাদা ও নিরাপত্তার সাথে বাস করবে।'
                : 'To build an enlightened, safe, drug-free, and progressive Joymonirhat Union where youth lead positive transformation and vulnerable women and children live in dignity.'}
            </p>
          </div>

          {/* Mission */}
          <div className="bg-gradient-to-br from-blue-50/70 to-white rounded-3xl p-6 sm:p-8 border border-blue-200/80 shadow-2xs">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-800 mb-4">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              {language === 'bn' ? 'আমাদের মূল ব্রত (Mission)' : 'Our Mission'}
            </h3>
            <p className="mt-3 text-sm sm:text-base text-stone-700 leading-relaxed">
              {language === 'bn'
                ? 'অরাজনৈতিক ও নিঃস্বার্থ মনোভাব নিয়ে মাদক ও বাল্যবিবাহের বিরুদ্ধে সামাজিক আন্দোলন পরিচালনা, জরুরি রক্তদান ও মানবিক ত্রাণ নিশ্চিত করা, তরুণদের কর্মমুখী কারিগরি শিক্ষায় দক্ষ করা এবং স্থানীয় উন্নয়ন সহযোগী সংস্থার সাথে সমন্বয়ে কাজ করা।'
                : 'Mobilizing disciplined youth in selfless community action, eradicating substance abuse and child marriage, providing round-the-clock emergency medical relief, and creating self-employment vocations.'}
            </p>
          </div>
        </div>

        {/* 8 Official Objectives from the Charter */}
        <div>
          <div className="max-w-3xl mb-8">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {language === 'bn' ? 'আমাদের প্রধান লক্ষ্য ও উদ্দেশ্যসমূহ' : 'Our 8 Core Statutory Objectives'}
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              {language === 'bn'
                ? 'সংগঠনের গঠনতন্ত্র ও যুব উন্নয়ন অধিদপ্তরের সনদ অনুযায়ী নির্ধারিত ৮টি মৌলিক সামাজিক উদ্দেশ্য'
                : 'Statutory social objectives defined in JUYOs official constitutional charter'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {objectives.map((obj, idx) => (
              <div
                key={idx}
                className="bg-stone-50 rounded-2xl p-5 border border-stone-200 hover:border-blue-400 hover:bg-white hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono font-bold text-blue-900 mb-1">
                    0{idx + 1}.
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">
                    {language === 'bn' ? obj.titleBn : obj.titleEn}
                  </h4>
                  <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                    {language === 'bn' ? obj.descBn : obj.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
