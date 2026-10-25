import React, { useState } from 'react';
import { 
  MapPin, 
  Mail, 
  Phone, 
  MessageCircle, 
  Send, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  ShieldCheck, 
  CheckCircle2,
  Droplet
} from 'lucide-react';
import { ORG_DETAILS, FAQS } from '../data/organizationData';
import { Language } from '../types';

interface ContactSectionProps {
  language: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ language }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [senderName, setSenderName] = useState('');
  const [senderContact, setSenderContact] = useState('');
  const [subject, setSubject] = useState('সাধারণ অনুসন্ধান');
  const [message, setMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderContact || !message) return;

    // Direct WhatsApp dispatch option
    const queryText = encodeURIComponent(
      `*ওয়েবসাইট বার্তা / অনুসন্ধান*\nনাম: ${senderName}\nযোগাযোগ: ${senderContact}\nবিষয়: ${subject}\nবার্তা: ${message}`
    );
    window.open(`https://wa.me/8801705929049?text=${queryText}`, '_blank');

    setSentSuccess(true);
    setSenderName('');
    setSenderContact('');
    setMessage('');
    setTimeout(() => setSentSuccess(false), 5000);
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-900 uppercase tracking-widest mb-2">
            <MapPin className="w-4 h-4 text-rose-500" />
            <span>{language === 'bn' ? 'আমাদের সাথে যোগাযোগ' : 'Get in Touch'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {language === 'bn' ? 'সরাসরি যোগাযোগ ও সাধারণ জিজ্ঞাসা' : 'Contact Us & Community Inquiries'}
          </h2>
          <p className="mt-3 text-base text-stone-600">
            {language === 'bn'
              ? 'জরুরি রক্তের চাহিদা, ত্রাণ সহযোগিতা, সংগঠনের সদস্যপদ বা যেকোনো পরামর্শে আমাদের সাথে যোগাযোগ করুন।'
              : 'Reach out to our emergency blood coordination cell, visit our office, or submit an inquiry.'}
          </p>
        </div>

        {/* 2-Column Grid: Contact Information & Interactive Message Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          {/* Left Column: Official Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Address Card */}
            <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    {language === 'bn' ? 'অফিসের ঠিকানা' : 'Office Location'}
                  </h4>
                  <p className="mt-1 text-sm text-stone-700 leading-relaxed font-medium">
                    {language === 'bn' ? ORG_DETAILS.addressBn : ORG_DETAILS.addressEn}
                  </p>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {language === 'bn' ? 'উপজেলা: ভূরুঙ্গামারী, জেলা: কুড়িগ্রাম' : 'Upazila: Bhurungamari, Dist: Kurigram'}
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp & Phone Card */}
            <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    {language === 'bn' ? 'হটলাইন ও হোয়াটসঅ্যাপ' : 'Hotline & WhatsApp'}
                  </h4>
                  <a
                    href={`tel:${ORG_DETAILS.whatsapp}`}
                    className="mt-1 text-base font-mono font-bold text-emerald-700 hover:underline block"
                  >
                    {ORG_DETAILS.whatsapp} ({ORG_DETAILS.phoneFormatted})
                  </a>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {language === 'bn' ? '২৪ ঘণ্টা জরুরি রক্তদান ও মানবিক সহায়তা' : '24/7 Emergency Blood & Urgent Support'}
                  </p>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-base font-bold text-slate-900">
                    {language === 'bn' ? 'ইমেইল যোগাযোগ' : 'Official Email'}
                  </h4>
                  <a
                    href={`mailto:${ORG_DETAILS.email}`}
                    className="mt-1 text-xs sm:text-sm font-medium text-blue-900 hover:underline break-all block"
                  >
                    {ORG_DETAILS.email}
                  </a>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {language === 'bn' ? 'দাপ্তরিক ও প্রাতিষ্ঠানিক যোগাযোগ' : 'Official institutional correspondences'}
                  </p>
                </div>
              </div>
            </div>

            {/* Verified Donation Accounts (bKash & Nagad) */}
            <div className="bg-gradient-to-br from-amber-50/90 to-rose-50/50 rounded-2xl p-5 border border-amber-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                  {language === 'bn' ? 'আর্থিক সহায়তা ও অনুদান চ্যানেল' : 'Donation & Support Channels'}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-200/80 text-amber-950 text-[10px] font-bold">
                  {language === 'bn' ? 'সরাসরি সহায়তা' : 'Direct Support'}
                </span>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed mb-3.5">
                {language === 'bn'
                  ? 'আপনার সামান্য সহযোগিতাও একটি শিশুর ভবিষ্যৎ সুরক্ষা, একজন তরুণের দক্ষতা উন্নয়ন কিংবা সুবিধাবঞ্চিত মানুষের পাশে দাঁড়াতে শক্তি জোগাবে।'
                  : 'Your generous contribution powers youth skill building, emergency relief, and adolescent protection.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* bKash */}
                <div className="bg-white p-3 rounded-xl border border-pink-200 flex items-center justify-between shadow-2xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-pink-100 text-pink-800">
                      বিকাশ (bKash)
                    </span>
                    <div className="font-mono font-black text-sm text-slate-900 mt-1">
                      {ORG_DETAILS.bkash}
                    </div>
                    <div className="text-[10px] text-stone-500">পার্সোনাল / হটলাইন</div>
                  </div>
                  <button
                    onClick={() => navigator.clipboard.writeText(ORG_DETAILS.bkash)}
                    type="button"
                    className="p-1.5 text-xs text-pink-700 hover:bg-pink-50 rounded-md transition-colors cursor-pointer"
                    title="কপি করুন"
                  >
                    কপি
                  </button>
                </div>

                {/* Nagad */}
                <div className="bg-white p-3 rounded-xl border border-orange-200 flex items-center justify-between shadow-2xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-orange-100 text-orange-800">
                      নগদ (Nagad)
                    </span>
                    <div className="font-mono font-black text-sm text-slate-900 mt-1">
                      {ORG_DETAILS.nagad}
                    </div>
                    <div className="text-[10px] text-stone-500">পার্সোনাল নম্বর</div>
                  </div>
                  <button
                    onClick={() => navigator.clipboard.writeText(ORG_DETAILS.nagad)}
                    type="button"
                    className="p-1.5 text-xs text-orange-700 hover:bg-orange-50 rounded-md transition-colors cursor-pointer"
                    title="কপি করুন"
                  >
                    কপি
                  </button>
                </div>
              </div>
            </div>

            {/* Registration Summary badge */}
            <div className="bg-blue-50/70 rounded-xl p-4 border border-blue-200/80 text-xs text-blue-950 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-800 shrink-0" />
              <span>
                <strong>{language === 'bn' ? 'রেজিস্ট্রেশন:' : 'Registration:'}</strong>{' '}
                {language === 'bn' ? `যুব উন্নয়ন অধিদপ্তর, রেজি: ${ORG_DETAILS.regNumberBn} (তারিখ: ${ORG_DETAILS.regDateBn})` : `DYD Reg: ${ORG_DETAILS.regNumberEn} (${ORG_DETAILS.regDateEn})`}
              </span>
            </div>
          </div>

          {/* Right Column: Direct Message / Blood Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              {language === 'bn' ? 'বার্তা অথবা রক্তের অনুরোধ পাঠান' : 'Send Message or Blood Request'}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mb-6">
              {language === 'bn'
                ? 'ফর্মটি পূরণ করলেই আমাদের হটলাইন এবং সংশ্লিষ্ট ওয়ার্ডের স্বেচ্ছাসেবী সমন্বয়কের কাছে বার্তা পৌঁছে যাবে।'
                : 'Fill out the form below to reach our local volunteers or urgent blood matching squad.'}
            </p>

            {sentSuccess && (
              <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {language === 'bn'
                    ? 'আপনার বার্তাটি সফলভাবে প্রেরণ করা হয়েছে। ধন্যবাদ!'
                    : 'Your message has been initiated. Thank you!'}
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    {language === 'bn' ? 'আপনার নাম *' : 'Your Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder={language === 'bn' ? 'নাম লিখুন' : 'Enter name'}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    {language === 'bn' ? 'মোবাইল / হোয়াটসঅ্যাপ নম্বর *' : 'Phone / WhatsApp *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={senderContact}
                    onChange={(e) => setSenderContact(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  {language === 'bn' ? 'বার্তার বিষয়' : 'Subject of Inquiry'}
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
                >
                  <option value="জরুরি রক্তের প্রয়োজন">{language === 'bn' ? 'জরুরি রক্তের প্রয়োজন (Urgent Blood Request)' : 'Urgent Blood Request'}</option>
                  <option value="সাধারণ অনুসন্ধান">{language === 'bn' ? 'সাধারণ অনুসন্ধান (General Inquiry)' : 'General Inquiry'}</option>
                  <option value="ত্রাণ ও সহায়তা আবেদন">{language === 'bn' ? 'ত্রাণ ও সহায়তা আবেদন (Relief / Welfare Aid)' : 'Relief Aid Request'}</option>
                  <option value="বৃক্ষরোপণ কর্মসূচি">{language === 'bn' ? 'বৃক্ষরোপণ কর্মসূচি সংক্রান্ত (Tree Plantation Drive)' : 'Tree Plantation'}</option>
                  <option value="মাদক ও সামাজিক অভিযোগ">{language === 'bn' ? 'মাদক ও সামাজিক অভিযোগ (Social Grievance)' : 'Social Grievance'}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  {language === 'bn' ? 'বিস্তারিত বার্তা বা বিবরণ *' : 'Message or Details *'}
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    language === 'bn'
                      ? 'রোগীর বিস্তারিত বা আপনার বার্তা এখানে লিখুন...'
                      : 'Write patient details or inquiry here...'
                  }
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-stone-500">
                  {language === 'bn' ? 'বার্তা সরাসরি হোয়াটসঅ্যাপে প্রেরিত হবে' : 'Dispatches directly to WhatsApp'}
                </span>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-lg shadow-sm transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4 text-amber-300" />
                  <span>{language === 'bn' ? 'বার্তা প্রেরণ করুন' : 'Send Message'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="pt-8 border-t border-stone-200">
          <div className="max-w-3xl mx-auto mb-8 text-center">
            <h3 className="text-2xl font-bold text-slate-900">
              {language === 'bn' ? 'সচরাচর জিজ্ঞাসিত প্রশ্ন ও উত্তর' : 'Frequently Asked Questions'}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-stone-600">
              {language === 'bn'
                ? 'সংগঠন, সদস্যপদ, রক্তদান ও স্বচ্ছতা সম্পর্কে প্রয়োজনীয় তথ্যাবলী।'
                : 'Key answers regarding our non-political charter, membership, and emergency procedures.'}
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-stone-50 rounded-xl border border-stone-200 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    type="button"
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:bg-stone-100 transition-colors cursor-pointer"
                  >
                    <span>{language === 'bn' ? faq.qBn : faq.qEn}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-stone-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-stone-500 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs sm:text-sm text-stone-700 leading-relaxed border-t border-stone-200/60 pt-3 bg-white">
                      {language === 'bn' ? faq.aBn : faq.aEn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
