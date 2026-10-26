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
  Droplet,
  Loader2,
  AlertTriangle
} from 'lucide-react';
import { ORG_DETAILS, FAQS } from '../data/organizationData';
import { Language } from '../types';
import { sendBloodRequestNotification, sendGeneralContactNotification } from '../services/notificationService';

interface ContactSectionProps {
  language: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ language }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeFormTab, setActiveFormTab] = useState<'blood' | 'general'>('blood');

  // Blood Request State
  const [patientName, setPatientName] = useState('');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [bagsCount, setBagsCount] = useState('১');
  const [hospitalName, setHospitalName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [urgencyTime, setUrgencyTime] = useState('জরুরি (আজই প্রয়োজন)');
  const [notes, setNotes] = useState('');

  // General Contact State
  const [senderName, setSenderName] = useState('');
  const [senderContact, setSenderContact] = useState('');
  const [subject, setSubject] = useState('সাধারণ অনুসন্ধান');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sentSuccessType, setSentSuccessType] = useState<'blood' | 'general' | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleBloodSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !contactNumber || !hospitalName) return;

    setIsSubmitting(true);
    await sendBloodRequestNotification({
      patientName,
      bloodGroup,
      bagsCount,
      hospitalName,
      contactNumber,
      urgencyTime,
      notes,
    });

    setIsSubmitting(false);
    setSentSuccessType('blood');
    setPatientName('');
    setHospitalName('');
    setContactNumber('');
    setNotes('');
  };

  const handleGeneralSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderContact || !message) return;

    setIsSubmitting(true);
    await sendGeneralContactNotification({
      senderName,
      senderContact,
      subject,
      message,
    });

    setIsSubmitting(false);
    setSentSuccessType('general');
    setSenderName('');
    setSenderContact('');
    setMessage('');
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
            {/* Form Mode Selector Tabs */}
            <div className="flex items-center gap-2 p-1 bg-stone-100 rounded-xl mb-6">
              <button
                type="button"
                onClick={() => setActiveFormTab('blood')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeFormTab === 'blood'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'text-stone-700 hover:text-rose-700 hover:bg-stone-200/60'
                }`}
              >
                <Droplet className={`w-4 h-4 ${activeFormTab === 'blood' ? 'text-white' : 'text-rose-500'}`} />
                <span>{language === 'bn' ? 'জরুরি রক্তের আবেদন' : 'Urgent Blood Request'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveFormTab('general')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeFormTab === 'general'
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'text-stone-700 hover:text-blue-950 hover:bg-stone-200/60'
                }`}
              >
                <Mail className={`w-4 h-4 ${activeFormTab === 'general' ? 'text-white' : 'text-blue-600'}`} />
                <span>{language === 'bn' ? 'সাধারণ জিজ্ঞাসা ও বার্তা' : 'General Inquiry'}</span>
              </button>
            </div>

            {/* Success notification banner */}
            {sentSuccessType && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-950 space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-900">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>
                    {sentSuccessType === 'blood'
                      ? (language === 'bn' ? 'রক্তের আবেদন সফলভাবে গৃহীত হয়েছে!' : 'Blood request received successfully!')
                      : (language === 'bn' ? 'বার্তা সফলভাবে প্রেরিত হয়েছে!' : 'Message dispatched successfully!')}
                  </span>
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed font-medium">
                  {language === 'bn' ? (
                    <>
                      ✅ আপনার আবেদনটি সরাসরি সংগঠনের অফিশিয়াল ইমেইল (<strong>{ORG_DETAILS.email}</strong>) এবং হোয়াটসঅ্যাপ নম্বরে (<strong>{ORG_DETAILS.whatsapp}</strong>) স্বয়ংক্রিয়ভাবে চলে এসেছে। আপনাকে অতিরিক্ত কোনো বাটনে চাপ দিতে হবে না। আমাদের টিম দ্রুত আপনার সাথে যোগাযোগ করছে।
                    </>
                  ) : (
                    <>
                      ✅ Dispatched automatically to official email (<strong>{ORG_DETAILS.email}</strong>) and WhatsApp (<strong>{ORG_DETAILS.whatsapp}</strong>). No extra clicks needed.
                    </>
                  )}
                </p>
              </div>
            )}

            {/* TAB 1: Blood Request Form */}
            {activeFormTab === 'blood' ? (
              <div>
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
                    {language === 'bn' ? 'জরুরি রক্তের চাহিদা ফর্ম' : 'Emergency Blood Squad Request Form'}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1">
                    {language === 'bn'
                      ? 'ফর্মটি সাবমিট করলেই তথ্য সরাসরি সংগঠনের ইমেইল এবং হটলাইন হোয়াটসঅ্যাপে চলে যাবে।'
                      : 'Submitting automatically dispatches to email and WhatsApp squad.'}
                  </p>
                </div>

                <form onSubmit={handleBloodSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Patient Name */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-800 mb-1">
                        {language === 'bn' ? 'রোগীর নাম *' : 'Patient Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        placeholder={language === 'bn' ? 'উদা: মো: রফিকুল ইসলাম' : 'e.g. Md. Rafiqul Islam'}
                        className="w-full px-3.5 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                    </div>

                    {/* Blood Group */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-800 mb-1">
                        {language === 'bn' ? 'প্রয়োজনীয় রক্তের গ্রুপ *' : 'Blood Group Needed *'}
                      </label>
                      <select
                        value={bloodGroup}
                        onChange={(e) => setBloodGroup(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs sm:text-sm font-bold text-rose-700 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                      >
                        {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((bg) => (
                          <option key={bg} value={bg}>
                            {bg}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Quantity */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-800 mb-1">
                        {language === 'bn' ? 'রক্তের পরিমাণ (ব্যাগ) *' : 'Units / Bags Needed *'}
                      </label>
                      <select
                        value={bagsCount}
                        onChange={(e) => setBagsCount(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                      >
                        <option value="১">১ ব্যাগ</option>
                        <option value="২">২ ব্যাগ</option>
                        <option value="৩">৩ ব্যাগ</option>
                        <option value="৪">৪ ব্যাগ</option>
                        <option value="৫+">৫+ ব্যাগ (জরুরি প্রয়োজন)</option>
                      </select>
                    </div>

                    {/* Urgency */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-800 mb-1">
                        {language === 'bn' ? 'কখন প্রয়োজন? *' : 'When is it Required? *'}
                      </label>
                      <select
                        value={urgencyTime}
                        onChange={(e) => setUrgencyTime(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                      >
                        <option value="জরুরি এখনই (অতি জরুরি)">জরুরি এখনই (অতি জরুরি)</option>
                        <option value="আজ বিকেল/সন্ধ্যার মধ্যে">আজ বিকেল/সন্ধ্যার মধ্যে</option>
                        <option value="আজ রাতের মধ্যে">আজ রাতের মধ্যে</option>
                        <option value="আগামীকাল সকালে">আগামীকাল সকালে</option>
                        <option value="আগামী ২৪ ঘণ্টার মধ্যে">আগামী ২৪ ঘণ্টার মধ্যে</option>
                        <option value="পরবর্তী নির্দিষ্ট তারিখে">পরবর্তী নির্দিষ্ট তারিখে</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Hospital Name & Address */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-800 mb-1">
                        {language === 'bn' ? 'হাসপাতালের নাম ও এলাকা *' : 'Hospital & Ward/Location *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={hospitalName}
                        onChange={(e) => setHospitalName(e.target.value)}
                        placeholder={language === 'bn' ? 'উদা: ভূরুঙ্গামারী স্বাস্থ্য কমপ্লেক্স / কুড়িগ্রাম সদর' : 'Hospital name & city'}
                        className="w-full px-3.5 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                    </div>

                    {/* Contact Number */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-800 mb-1">
                        {language === 'bn' ? 'যোগাযোগের মোবাইল / হোয়াটসঅ্যাপ নম্বর *' : 'Contact Mobile / WhatsApp *'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        placeholder="017XXXXXXXX"
                        className="w-full px-3.5 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                    </div>
                  </div>

                  {/* Notes / Patient Condition */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1">
                      {language === 'bn' ? 'রোগীর সমস্যা বা অতিরিক্ত নির্দেশনা (ঐচ্ছিক)' : 'Patient Condition / Additional Remarks'}
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={language === 'bn' ? 'উদা: সিজারিয়ান অপারেশন / দুর্ঘটনা / হিমোগ্লোবিন কমে গেছে...' : 'Write brief remarks...'}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <span className="text-[11px] text-stone-500 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      {language === 'bn' ? 'স্বয়ংক্রিয়ভাবে ইমেইল ও হোয়াটসঅ্যাপে পৌঁছাবে' : 'Dispatches directly to Email & WhatsApp'}
                    </span>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 disabled:opacity-75 rounded-lg shadow-sm transition-all cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span>{language === 'bn' ? 'পাঠানো হচ্ছে...' : 'Sending...'}</span>
                        </>
                      ) : (
                        <>
                          <Droplet className="w-4 h-4 fill-white text-white" />
                          <span>{language === 'bn' ? 'রক্তের আবেদন পাঠান' : 'Submit Blood Request'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              /* TAB 2: General Inquiry Form */
              <div>
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-slate-900">
                    {language === 'bn' ? 'সাধারণ বার্তা অথবা পরামর্শ' : 'Send General Inquiry'}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1">
                    {language === 'bn'
                      ? 'সংগঠন বিষয়ক যেকোনো প্রশ্ন, সামাজিক অভিযোগ বা পরামর্শের বার্তা প্রেরণ করুন।'
                      : 'Send organizational inquiries, community feedback, or collaboration proposals.'}
                  </p>
                </div>

                <form onSubmit={handleGeneralSubmit} className="space-y-4">
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
                      <option value="সাধারণ অনুসন্ধান">{language === 'bn' ? 'সাধারণ অনুসন্ধান (General Inquiry)' : 'General Inquiry'}</option>
                      <option value="ত্রাণ ও সহায়তা আবেদন">{language === 'bn' ? 'ত্রাণ ও সহায়তা আবেদন (Relief / Welfare Aid)' : 'Relief Aid Request'}</option>
                      <option value="বৃক্ষরোপণ কর্মসূচি">{language === 'bn' ? 'বৃক্ষরোপণ কর্মসূচি সংক্রান্ত (Tree Plantation Drive)' : 'Tree Plantation'}</option>
                      <option value="মাদক ও সামাজিক অভিযোগ">{language === 'bn' ? 'মাদক ও সামাজিক অভিযোগ (Social Grievance)' : 'Social Grievance'}</option>
                      <option value="অন্যান্য পরামর্শ">{language === 'bn' ? 'অন্যান্য পরামর্শ বা প্রস্তাব' : 'Other Suggestion'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1">
                      {language === 'bn' ? 'বিস্তারিত বার্তা বা বিবরণ *' : 'Message or Details *'}
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={language === 'bn' ? 'আপনার বার্তা বিস্তারিত লিখুন...' : 'Write message details...'}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <span className="text-[11px] text-stone-500">
                      {language === 'bn' ? 'সরাসরি ইমেইল ও হোয়াটসঅ্যাপে পাঠানো হবে' : 'Dispatches directly to Email & WhatsApp'}
                    </span>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-900 hover:bg-blue-800 disabled:opacity-75 rounded-lg shadow-sm transition-all cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                          <span>{language === 'bn' ? 'প্রেরণ করা হচ্ছে...' : 'Sending...'}</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-amber-300" />
                          <span>{language === 'bn' ? 'বার্তা প্রেরণ করুন' : 'Send Message'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
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
