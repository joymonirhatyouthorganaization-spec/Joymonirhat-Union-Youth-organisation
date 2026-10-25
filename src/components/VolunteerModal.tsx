import React, { useState } from 'react';
import { X, HeartHandshake, CheckCircle, Send, MessageCircle, AlertCircle } from 'lucide-react';
import { ORG_DETAILS } from '../data/organizationData';
import { Language, VolunteerFormData } from '../types';

interface VolunteerModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  defaultWard?: string;
}

export const VolunteerModal: React.FC<VolunteerModalProps> = ({ 
  isOpen, 
  onClose, 
  language,
  defaultWard 
}) => {
  const [formData, setFormData] = useState<VolunteerFormData>({
    fullName: '',
    mobile: '',
    email: '',
    bloodGroup: 'O+',
    village: defaultWard || '১ নং ওয়ার্ড (অষ্টমীর ঘাট, বকুলতলী, চৌরাস্তা মোড় এবং ছোটখাটামারী উত্তর)',
    occupation: '',
    interests: ['মাদক ও বাল্যবিবাহ প্রতিরোধ সচেতনতা', 'জরুরি রক্তদান'],
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [appId, setAppId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  React.useEffect(() => {
    if (defaultWard) {
      setFormData((prev) => ({ ...prev, village: defaultWard }));
    }
  }, [defaultWard]);

  if (!isOpen) return null;

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  const villages = [
    '১ নং ওয়ার্ড (অষ্টমীর ঘাট, বকুলতলী, চৌরাস্তা মোড় এবং ছোটখাটামারী উত্তর)',
    '২ নং ওয়ার্ড (জয়মনিরহাট সদর, ছোটখাটামারী দক্ষিণ)',
    '৩ নং ওয়ার্ড (ছোটখাটামারী পূর্ব, রইয়া বিলের পাড়)',
    '৪ নং ওয়ার্ড (জয়মনিরহাট বটতলা ক্লাব, বড় খাটামারী পূর্ব)',
    '৫ নং ওয়ার্ড (ভোলা মোড়, বাউসমারী, দলবাড়ী)',
    '৬ নং ওয়ার্ড (বড় খাটামারী পশ্চিম, পাঁচমাথা মোড়)',
    '৭ নং ওয়ার্ড (পাঁচমাথা একাংশ, বড়খাটামারী উত্তর)',
    '৮ নং ওয়ার্ড (শিংঝাড় ক্যাম্পের বাজার, শিংঝাড় বকনির পাড়)',
    '৯ নং ওয়ার্ড (পাঁচমাথা মোড় একাংশ, বল্লার ভিটা)',
    'অন্যান্য গ্রাম / প্রবাসী শুভাকাঙ্ক্ষী',
  ];


  const interestOptions = [
    { id: 'env', labelBn: 'বৃক্ষরোপণ ও পরিবেশ রক্ষা', labelEn: 'Tree Plantation & Green Drives' },
    { id: 'blood', labelBn: 'জরুরি রক্তদান ও স্কোয়াড', labelEn: 'Emergency Blood Squad' },
    { id: 'relief', labelBn: 'শীতবস্ত্র ও বন্যা ত্রাণ বিতরণ', labelEn: 'Winter & Flood Relief Aid' },
    { id: 'drugs', labelBn: 'মাদক ও বাল্যবিবাহ প্রতিরোধ সচেতনতা', labelEn: 'Anti-Drug & Child Marriage Campaigns' },
    { id: 'youth', labelBn: 'যুব উন্নয়ন ও ক্রীড়া পরিচালনা', labelEn: 'Youth Skills & Sports Organizing' },
    { id: 'media', labelBn: 'দপ্তর, প্রচার ও ফটোগ্রাফি', labelEn: 'Secretariat, Media & Photography' },
  ];

  const handleInterestToggle = (labelBn: string) => {
    if (formData.interests.includes(labelBn)) {
      setFormData({
        ...formData,
        interests: formData.interests.filter((i) => i !== labelBn),
      });
    } else {
      setFormData({
        ...formData,
        interests: [...formData.interests, labelBn],
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.mobile.trim()) {
      setErrorMsg(
        language === 'bn'
          ? 'অনুগ্রহ করে আপনার পুরো নাম এবং মোবাইল নম্বর প্রদান করুন।'
          : 'Please provide your full name and mobile number.'
      );
      return;
    }

    const generatedId = `JUYO-VOL-${Math.floor(1000 + Math.random() * 9000)}`;
    setAppId(generatedId);

    // Save to localStorage for demo persistence
    try {
      const existing = JSON.parse(localStorage.getItem('juyo_volunteers') || '[]');
      existing.push({
        id: generatedId,
        ...formData,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('juyo_volunteers', JSON.stringify(existing));
    } catch {
      // ignore
    }

    setErrorMsg('');
    setSubmitted(true);
  };

  const sendWhatsAppNotification = () => {
    const text = encodeURIComponent(
      `*নতুন স্বেচ্ছাসেবক নিবন্ধন (${appId})*\n` +
      `নাম: ${formData.fullName}\n` +
      `মোবাইল: ${formData.mobile}\n` +
      `রক্তের গ্রুপ: ${formData.bloodGroup}\n` +
      `এলাকা: ${formData.village}\n` +
      `আগ্রহ: ${formData.interests.join(', ')}\n` +
      `বার্তা: ${formData.message || 'সেবায় অংশ নিতে আগ্রহী'}`
    );
    window.open(`https://wa.me/8801705929049?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-stone-200 shadow-2xl p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-900 shrink-0">
                <HeartHandshake className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {language === 'bn' ? 'স্বেচ্ছাসেবক হিসেবে আবেদন ফর্ম' : 'Volunteer Application Form'}
                </h3>
                <p className="text-xs text-stone-500">
                  {language === 'bn'
                    ? 'জয়মনিরহাট ইউনিয়ন যুব সংগঠন · সম্পূর্ণ অরাজনৈতিক ও জনকল্যাণমূলক'
                    : 'Joymonirhat Union Youth Organization · Non-Political Community Force'}
                </p>
              </div>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    {language === 'bn' ? 'পূর্ণ নাম *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder={language === 'bn' ? 'উদা: মো: নাজমুল হুদা' : 'e.g. Md. Nazmul Huda'}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    {language === 'bn' ? 'মোবাইল / হোয়াটসঅ্যাপ নম্বর *' : 'Mobile / WhatsApp Number *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    placeholder="017XXXXXXXX"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Blood Group */}
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    {language === 'bn' ? 'রক্তের গ্রুপ (জরুরি তালিকার জন্য)' : 'Blood Group (For Emergency Squad)'}
                  </label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
                  >
                    {bloodGroups.map((bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Village / Area */}
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    {language === 'bn' ? 'গ্রাম / এলাকা (জয়মনিরহাট)' : 'Village / Ward Area'}
                  </label>
                  <select
                    value={formData.village}
                    onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
                  >
                    {villages.map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email (Optional) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    {language === 'bn' ? 'ইমেইল ঠিকানা (ঐচ্ছিক)' : 'Email Address (Optional)'}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="example@mail.com"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
                  />
                </div>

                {/* Occupation */}
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    {language === 'bn' ? 'পেশা / শিক্ষাগত যোগ্যতা' : 'Profession / Education'}
                  </label>
                  <input
                    type="text"
                    value={formData.occupation}
                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                    placeholder={language === 'bn' ? 'উদা: শিক্ষার্থী / চাকরিজীবী / ব্যবসায়ী' : 'e.g. Student / Business'}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
                  />
                </div>
              </div>

              {/* Interests Multi-Select */}
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                  {language === 'bn' ? 'যেসব সেবামূলক কাজে অংশ নিতে আগ্রহী:' : 'Preferred Areas of Engagement:'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {interestOptions.map((opt) => {
                    const isChecked = formData.interests.includes(opt.labelBn);
                    return (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => handleInterestToggle(opt.labelBn)}
                        className={`flex items-center gap-2 p-2 rounded-lg border text-left text-xs transition-colors cursor-pointer ${
                          isChecked
                            ? 'bg-blue-50/80 border-blue-400 text-blue-950 font-semibold'
                            : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] ${
                            isChecked
                              ? 'bg-blue-900 border-blue-900 text-white'
                              : 'border-stone-300 bg-white'
                          }`}
                        >
                          {isChecked && '✓'}
                        </div>
                        <span>{language === 'bn' ? opt.labelBn : opt.labelEn}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  {language === 'bn' ? 'সংগঠন সম্পর্কে আপনার মতামত বা ভাবনা' : 'Your Vision or Remarks'}
                </label>
                <textarea
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={language === 'bn' ? 'সংক্ষিপ্ত মতামত লিখুন...' : 'Write brief comments...'}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>

              {/* Form Disclaimer */}
              <p className="text-[11px] text-stone-500 leading-tight">
                {language === 'bn'
                  ? 'আমি অঙ্গীকার করছি যে, জয়মনিরহাট ইউনিয়ন যুব সংগঠনের অরাজনৈতিক নীতিমালা মেনে এলাকার আত্ম-মানবতার সেবায় নিঃস্বার্থভাবে যুক্ত থাকতে আগ্রহী।'
                  : 'I pledge to abide by the non-political principles of JUYO and render selfless volunteer services to the community.'}
              </p>

              {/* Submit Button */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  {language === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-lg shadow-sm transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4 text-amber-300" />
                  <span>{language === 'bn' ? 'আবেদন জমা দিন' : 'Submit Application'}</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-bold text-slate-900">
              {language === 'bn' ? 'আবেদন সফলভাবে গৃহীত হয়েছে!' : 'Application Successfully Received!'}
            </h3>

            <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
              {language === 'bn' ? (
                <>
                  অভিনন্দন, <strong>{formData.fullName}</strong>! জয়মনিরহাট ইউনিয়ন যুব সংগঠনে আপনার নিবন্ধন নম্বর:{' '}
                  <span className="font-mono font-bold text-blue-900">{appId}</span>। আমাদের স্বেচ্ছাসেবী পরিষদ
                  শীঘ্রই আপনার সাথে যোগাযোগ করবে।
                </>
              ) : (
                <>
                  Congratulations, <strong>{formData.fullName}</strong>! Your registration ID is{' '}
                  <span className="font-mono font-bold text-blue-900">{appId}</span>. Our organizing wing will connect
                  with you soon.
                </>
              )}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={sendWhatsAppNotification}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-emerald-950 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 rounded-lg transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-700" />
                <span>{language === 'bn' ? 'হোয়াটসঅ্যাপে নিশ্চিত বার্তা পাঠান' : 'Send via WhatsApp'}</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 text-xs sm:text-sm font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
              >
                {language === 'bn' ? 'সম্পন্ন' : 'Done'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
