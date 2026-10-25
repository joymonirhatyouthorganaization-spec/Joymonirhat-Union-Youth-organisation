import React, { useState } from 'react';
import { Bell, Search, Calendar, FileText, Share2, Printer, Check, X, AlertCircle } from 'lucide-react';
import { NOTICES, ORG_DETAILS } from '../data/organizationData';
import { NoticeItem, Language } from '../types';

interface NoticeBoardProps {
  language: Language;
}

export const NoticeBoard: React.FC<NoticeBoardProps> = ({ language }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);
  const [copied, setCopied] = useState(false);

  const categories = [
    { key: 'all', labelBn: 'সকল নোটিশ', labelEn: 'All Notices' },
    { key: 'emergency', labelBn: 'জরুরি নোটিশ', labelEn: 'Emergency' },
    { key: 'event', labelBn: 'কার্যক্রম ও ত্রাণ', labelEn: 'Relief & Events' },
    { key: 'recruitment', labelBn: 'সদস্য আহ্বান', labelEn: 'Membership' },
    { key: 'general', labelBn: 'প্রশিক্ষণ ও সাধারণ', labelEn: 'Training & General' },
  ];

  const filteredNotices = NOTICES.filter((notice) => {
    const matchesCategory = selectedCategory === 'all' || notice.categoryType === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      notice.titleBn.toLowerCase().includes(q) ||
      notice.titleEn.toLowerCase().includes(q) ||
      notice.contentBn.toLowerCase().includes(q) ||
      notice.contentEn.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="notices" className="py-16 lg:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-900 uppercase tracking-widest mb-2">
              <Bell className="w-4 h-4 text-amber-500" />
              <span>{language === 'bn' ? 'দাপ্তরিক ও জনস্বার্থ বিজ্ঞপ্তি' : 'Official Bulletins'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {language === 'bn' ? 'নোটিশ বোর্ড ও সাম্প্রতিক আপডেট' : 'Notice Board & Official Updates'}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-stone-600">
              {language === 'bn'
                ? 'সংগঠনের সকল কার্যক্রম, সভা, সদস্য সংগ্রহ ও জনস্বার্থমূলক ঘোষণার সর্বশেষ তথ্য।'
                : 'Stay informed on all general meetings, blood campaigns, and relief announcements.'}
            </p>
          </div>

          {/* Quick Notice Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'bn' ? 'নোটিশ খুঁজুন...' : 'Search notices...'}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
            />
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              type="button"
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.key
                  ? 'bg-slate-900 text-white'
                  : 'bg-stone-100 text-stone-600 hover:text-stone-900'
              }`}
            >
              {language === 'bn' ? cat.labelBn : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Notice List */}
        {filteredNotices.length === 0 ? (
          <div className="text-center py-12 bg-stone-50 rounded-xl border border-stone-200">
            <p className="text-sm text-stone-500">
              {language === 'bn' ? 'কোনো নোটিশ পাওয়া যায়নি।' : 'No notices match your criteria.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotices.map((notice) => (
              <div
                key={notice.id}
                className="bg-white rounded-xl p-5 border border-stone-200 hover:border-blue-400 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
                    <span className="font-semibold text-blue-900">
                      {language === 'bn' ? notice.categoryBn : notice.categoryEn}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-stone-400" />
                      <span>{language === 'bn' ? notice.dateBn : notice.dateEn}</span>
                    </span>
                    {notice.referenceNo && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono text-stone-400">{notice.referenceNo}</span>
                      </>
                    )}
                    {notice.isImportant && (
                      <span className="inline-flex items-center gap-1 text-rose-600 font-semibold ml-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {language === 'bn' ? 'জরুরি' : 'Urgent'}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 hover:text-blue-900 transition-colors cursor-pointer"
                    onClick={() => setSelectedNotice(notice)}
                  >
                    {language === 'bn' ? notice.titleBn : notice.titleEn}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed">
                    {language === 'bn' ? notice.contentBn : notice.contentEn}
                  </p>
                </div>

                <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                  <button
                    onClick={() => setSelectedNotice(notice)}
                    type="button"
                    className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-blue-900 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{language === 'bn' ? 'সম্পূর্ণ নোটিশ পড়ুন' : 'Read Notice'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Notice Detail Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-stone-200 shadow-2xl p-6 sm:p-8 relative">
            <button
              onClick={() => setSelectedNotice(null)}
              type="button"
              className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Official Notice Header */}
            <div className="border-b border-stone-200 pb-5 text-center">
              <div className="w-14 h-14 mx-auto rounded-full p-1 bg-stone-100 mb-2">
                <img
                  src={ORG_DETAILS.logoUrl}
                  alt="JUYO"
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/juyo-logo.jpg';
                  }}
                />
              </div>
              <h4 className="text-base font-bold text-slate-900">
                {language === 'bn' ? ORG_DETAILS.nameBn : ORG_DETAILS.nameEn}
              </h4>
              <p className="text-xs text-stone-500">
                {language === 'bn'
                  ? `যুব উন্নয়ন অধিদপ্তর রেজি: ${ORG_DETAILS.regNumberBn} · অষ্টমীর ঘাট, জয়মনিরহাট, কুড়িগ্রাম`
                  : `DYD Reg: ${ORG_DETAILS.regNumberEn} · Joymonirhat, Kurigram`}
              </p>
            </div>

            {/* Notice Metadata */}
            <div className="py-4 border-b border-stone-100 flex flex-wrap items-center justify-between text-xs text-stone-600 gap-2">
              <div>
                <strong>{language === 'bn' ? 'স্মারক নম্বর:' : 'Ref No:'}</strong>{' '}
                <span className="font-mono">{selectedNotice.referenceNo || 'JUYO/2026/GEN'}</span>
              </div>
              <div>
                <strong>{language === 'bn' ? 'প্রকাশের তারিখ:' : 'Published Date:'}</strong>{' '}
                <span>{language === 'bn' ? selectedNotice.dateBn : selectedNotice.dateEn}</span>
              </div>
            </div>

            {/* Notice Title & Body */}
            <div className="py-5">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                {language === 'bn' ? selectedNotice.titleBn : selectedNotice.titleEn}
              </h3>
              <div className="mt-4 text-sm sm:text-base text-stone-700 whitespace-pre-line leading-relaxed bg-stone-50/70 p-4 rounded-xl border border-stone-200/60">
                {language === 'bn' ? selectedNotice.contentBn : selectedNotice.contentEn}
              </div>
            </div>

            {/* Signatory / Dispatch note */}
            <div className="pt-2 text-right text-xs text-stone-600 border-t border-stone-100">
              <p className="font-semibold text-slate-800">
                {language === 'bn' ? 'আদেশক্রমে,' : 'By Order,'}
              </p>
              <p>{language === 'bn' ? 'দপ্তর ও প্রচার সম্পাদক' : 'Secretariat & Communications'}</p>
              <p>{language === 'bn' ? ORG_DETAILS.nameBn : ORG_DETAILS.nameEn}</p>
            </div>

            {/* Modal Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(language === 'bn' ? selectedNotice.contentBn : selectedNotice.contentEn)}
                  type="button"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copied ? (language === 'bn' ? 'কপি হয়েছে' : 'Copied') : (language === 'bn' ? 'শেয়ার / কপি' : 'Share / Copy')}</span>
                </button>
                <button
                  onClick={() => window.print()}
                  type="button"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'প্রিন্ট' : 'Print'}</span>
                </button>
              </div>

              <button
                onClick={() => setSelectedNotice(null)}
                type="button"
                className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-md transition-colors cursor-pointer"
              >
                {language === 'bn' ? 'বন্ধ করুন' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
