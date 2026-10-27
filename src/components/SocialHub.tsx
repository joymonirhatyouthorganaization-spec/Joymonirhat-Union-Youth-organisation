import React, { useState } from 'react';
import { MessageCircle, ExternalLink, Share2, Users, Check, Globe, ShieldAlert } from 'lucide-react';
import { ORG_DETAILS, DRUG_PREVENTION_POSTS } from '../data/organizationData';
import { Language } from '../types';

interface SocialHubProps {
  language: Language;
}

export const SocialHub: React.FC<SocialHubProps> = ({ language }) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: language === 'bn' ? ORG_DETAILS.nameBn : ORG_DETAILS.nameEn,
        text: language === 'bn' ? `${ORG_DETAILS.nameBn} - ${ORG_DETAILS.mottoBn}` : `${ORG_DETAILS.nameEn} - ${ORG_DETAILS.mottoEn}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <section className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-300 uppercase tracking-widest mb-2">
              <Globe className="w-4 h-4" />
              <span>{language === 'bn' ? 'সামাজিক যোগাযোগ ও কমিউনিটি' : 'Community & Social Networks'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              {language === 'bn'
                ? 'অনলাইন ও সোশ্যাল মিডিয়ায় আমাদের সাথে যুক্ত থাকুন'
                : 'Connect With JUYO Across Social Media & Channels'}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-blue-100 leading-relaxed">
              {language === 'bn'
                ? 'জয়মনিরহাট ইউনিয়ন যুব সংগঠনের অফিশিয়াল ফেসবুক পেজ লাইক দিয়ে নিয়মিত কার্যক্রমের ভিডিও ও ছবি দেখুন এবং ফেসবুক গ্রুপে যোগ দিয়ে এলাকার যেকোনো উন্নয়ন প্রস্তাবনায় অংশ নিন।'
                : 'Follow our official Facebook page for real-time field reports, join our Facebook group for community dialogues, or message our WhatsApp helpline.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Facebook Page Card */}
            <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-6 border border-white/15 flex flex-col justify-between hover:bg-white/15 transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white mb-4 shadow-sm">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white">
                  {language === 'bn' ? 'অফিশিয়াল ফেসবুক পেজ' : 'Official Facebook Page'}
                </h3>
                <p className="mt-1.5 text-xs text-blue-200 leading-relaxed">
                  {language === 'bn'
                    ? 'ভিডিও রিপোর্ট, সংবাদ বিজ্ঞপ্তি ও লাইভ সমাজসেবা প্রচার।'
                    : 'Official announcements, field photo albums, and video coverage.'}
                </p>
              </div>

              <a
                href={ORG_DETAILS.facebookPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-slate-900 bg-white hover:bg-amber-300 rounded-lg transition-colors group"
              >
                <span>{language === 'bn' ? 'পেজ ভিজিট করুন' : 'Visit Page'}</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* Facebook Group Card */}
            <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-6 border border-white/15 flex flex-col justify-between hover:bg-white/15 transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-700 flex items-center justify-center text-white mb-4 shadow-sm">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  {language === 'bn' ? 'অফিশিয়াল ফেসবুক গ্রুপ' : 'Official Facebook Group'}
                </h3>
                <p className="mt-1.5 text-xs text-blue-200 leading-relaxed">
                  {language === 'bn'
                    ? 'জয়মনিরহাটের তরুণ ও এলাকাবাসীর উন্মুক্ত আলোচনা এবং মতবিনিময়।'
                    : 'Community discussion forum for local citizens and active youth members.'}
                </p>
              </div>

              <a
                href={ORG_DETAILS.facebookGroupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-slate-900 bg-white hover:bg-amber-300 rounded-lg transition-colors group"
              >
                <span>{language === 'bn' ? 'গ্রুপে যুক্ত হোন' : 'Join Group'}</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* WhatsApp Hotline Card */}
            <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-6 border border-white/15 flex flex-col justify-between hover:bg-white/15 transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center text-white mb-4 shadow-sm">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  {language === 'bn' ? 'জরুরি হোয়াটসঅ্যাপ হেল্পলাইন' : '24/7 WhatsApp Hotline'}
                </h3>
                <p className="mt-1.5 text-xs text-blue-200 leading-relaxed">
                  {language === 'bn'
                    ? 'রক্তদান প্রয়োজন বা জরুরি মানবিক সহায়তায় সরাসরি মেসেজ পাঠান।'
                    : 'Instant messaging for emergency blood requests and direct aid coordination.'}
                </p>
                <div className="mt-2 text-xs font-mono font-bold text-amber-300">
                  {ORG_DETAILS.phoneFormatted}
                </div>
              </div>

              <a
                href={ORG_DETAILS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors group"
              >
                <span>{language === 'bn' ? 'হোয়াটসঅ্যাপে মেসেজ দিন' : 'Chat on WhatsApp'}</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Dedicated Field-level Anti-Drug Facebook Posts section */}
          <div className="mt-10 pt-8 border-t border-white/15">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-300 uppercase tracking-widest mb-1">
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  <span>{language === 'bn' ? 'মাঠপর্যায়ের মাদকবিরোধী কার্যক্রম' : 'Field Anti-Drug Action'}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {language === 'bn'
                    ? 'অফিসিয়াল ফেসবুক পেজের ৫টি বিশেষ মাঠপর্যায়ের প্রতিবেদন'
                    : '5 Key Anti-Drug Movement Reports from Our Official Facebook Page'}
                </h3>
                <p className="text-xs sm:text-sm text-blue-200 mt-1">
                  {language === 'bn'
                    ? 'জয়মনিরহাটের তরুণ সমাজকে রক্ষায় আমাদের সচেতনতামূলক কর্মসূচি, শপথ ও রাজপথের র‍্যালির সরাসরি ফেসবুক লিংক:'
                    : 'Direct links to our youth rallies, anti-drug pledges, and community campaigns on Facebook:'}
                </p>
              </div>
              <a
                href={ORG_DETAILS.facebookPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-blue-950 bg-amber-300 hover:bg-amber-400 rounded-lg transition-colors"
              >
                <span>{language === 'bn' ? 'সকল ফেসবুক আপডেট দেখুন' : 'All Updates'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {DRUG_PREVENTION_POSTS.map((post) => (
                <a
                  key={post.id}
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/15 border border-white/15 hover:border-amber-300/60 rounded-xl p-4 flex flex-col justify-between transition-all group backdrop-blur-xs"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/30 text-amber-300 border border-amber-300/30">
                        {language === 'bn' ? post.highlightBn : post.highlightEn}
                      </span>
                      <span className="text-[11px] text-blue-200">
                        {language === 'bn' ? post.dateBn : post.dateEn}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                      {language === 'bn' ? post.titleBn : post.titleEn}
                    </h4>

                    <p className="mt-2 text-xs text-blue-100 line-clamp-2 leading-relaxed">
                      {language === 'bn' ? post.summaryBn : post.summaryEn}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-amber-300 font-semibold group-hover:text-amber-200">
                    <span>{language === 'bn' ? 'ফেসবুকে সচিত্র প্রতিবেদন দেখুন' : 'View on Facebook'}</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Bottom Share Row */}
          <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-4 text-xs text-blue-200">
            <span>
              {language === 'bn'
                ? 'আমাদের এই মানবিক বার্তা আপনার বন্ধুবান্ধব ও সামাজিক মাধ্যমে ছড়িয়ে দিন।'
                : 'Help spread the noble cause of youth volunteerism in Kurigram.'}
            </span>

            <button
              onClick={handleShare}
              type="button"
              className="flex items-center gap-2 px-3.5 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-md text-white font-medium transition-colors cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? (language === 'bn' ? 'লিংক কপি হয়েছে!' : 'Link Copied!') : (language === 'bn' ? 'ওয়েবসাইট শেয়ার করুন' : 'Share Website')}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
