import React, { useState, useEffect } from 'react';
import { 
  Image as ImageIcon, 
  ZoomIn, 
  X, 
  Calendar, 
  Tag, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { GALLERY_ITEMS, ORG_DETAILS } from '../data/organizationData';
import { GalleryItem, Language } from '../types';

interface GalleryProps {
  language: Language;
}

export const Gallery: React.FC<GalleryProps> = ({ language }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const getCategoryCount = (categoryKey: string) => {
    if (categoryKey === 'all') return GALLERY_ITEMS.length;
    return GALLERY_ITEMS.filter((item) => item.categoryBn === categoryKey).length;
  };

  const filterTabs = [
    { key: 'all', labelBn: `সকল স্থিরচিত্র (${GALLERY_ITEMS.length})`, labelEn: `All Photos (${GALLERY_ITEMS.length})` },
    { key: 'মাদক প্রতিরোধ', labelBn: `মাদক প্রতিরোধ ও পাহারা (${getCategoryCount('মাদক প্রতিরোধ')})`, labelEn: `Anti-Drug & Vigilance (${getCategoryCount('মাদক প্রতিরোধ')})` },
    { key: 'বাল্যবিবাহ প্রতিরোধ', labelBn: `বাল্যবিবাহ ও কন্যাশিশু (${getCategoryCount('বাল্যবিবাহ প্রতিরোধ')})`, labelEn: `Child Protection (${getCategoryCount('বাল্যবিবাহ প্রতিরোধ')})` },
    { key: 'গ্রামীণ উন্নয়ন', labelBn: `রাস্তা ও অবকাঠামো সংস্কার (${getCategoryCount('গ্রামীণ উন্নয়ন')})`, labelEn: `Rural Development (${getCategoryCount('গ্রামীণ উন্নয়ন')})` },
    { key: 'পরিবেশ ও বৃক্ষরোপণ', labelBn: `বৃক্ষরোপণ ও সবুজায়ন (${getCategoryCount('পরিবেশ ও বৃক্ষরোপণ')})`, labelEn: `Afforestation (${getCategoryCount('পরিবেশ ও বৃক্ষরোপণ')})` },
    { key: 'যুব উন্নয়ন ও প্রশিক্ষণ', labelBn: `যুব প্রশিক্ষণ ও যুব দিবস (${getCategoryCount('যুব উন্নয়ন ও প্রশিক্ষণ')})`, labelEn: `Youth TVET (${getCategoryCount('যুব উন্নয়ন ও প্রশিক্ষণ')})` },
    { key: 'খেলাধুলা ও শিক্ষা', labelBn: `ক্রীড়া, সাইকেল র‍্যালি ও শিক্ষা (${getCategoryCount('খেলাধুলা ও শিক্ষা')})`, labelEn: `Sports & Education (${getCategoryCount('খেলাধুলা ও শিক্ষা')})` },
    { key: 'প্রাতিষ্ঠানিক ও সাংগঠনিক', labelBn: `নেতৃত্ব ও প্রাতিষ্ঠানিক (${getCategoryCount('প্রাতিষ্ঠানিক ও সাংগঠনিক')})`, labelEn: `Leadership & Official (${getCategoryCount('প্রাতিষ্ঠানিক ও সাংগঠনিক')})` },
  ];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.categoryBn === selectedCategory;
  });

  const activePhoto = activePhotoIndex !== null ? filteredItems[activePhotoIndex] : null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((prev) => (prev! > 0 ? prev! - 1 : filteredItems.length - 1));
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((prev) => (prev! < filteredItems.length - 1 ? prev! + 1 : 0));
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'ArrowRight') {
        setActivePhotoIndex((prev) => (prev! < filteredItems.length - 1 ? prev! + 1 : 0));
      } else if (e.key === 'ArrowLeft') {
        setActivePhotoIndex((prev) => (prev! > 0 ? prev! - 1 : filteredItems.length - 1));
      } else if (e.key === 'Escape') {
        setActivePhotoIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex, filteredItems.length]);

  return (
    <section id="gallery" className="py-16 lg:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-900 uppercase tracking-widest mb-2 bg-blue-100/60 px-3 py-1 rounded-full border border-blue-200">
              <ImageIcon className="w-4 h-4 text-emerald-600" />
              <span>{language === 'bn' ? 'বাস্তব মাঠপর্যায়ের সচিত্র দলিল' : 'Verified Field Photo Archives'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {language === 'bn' ? 'কার্যক্রম ও সেবামূলক চিত্রশালা' : 'Authentic Documentary Gallery & Field Archives'}
            </h2>
            <p className="mt-3 text-base text-stone-600 leading-relaxed">
              {language === 'bn'
                ? `জয়মনিরহাট ইউনিয়নের প্রত্যন্ত অঞ্চলে মাদক প্রতিরোধ, বাল্যবিবাহ নিরোধ, বৃক্ষরোপণ, রাস্তা মেরামত ও যুব প্রশিক্ষণে আমাদের তরুণদের সরাসরি অংশগ্রহণের ${GALLERY_ITEMS.length}টি বাস্তব আলোকচিত্র ও দলিল।`
                : `Photographic documentation of grassroots vigilance, road rehabilitation, adolescent girl forums, sports festivals, and government collaborations across Joymonirhat (${GALLERY_ITEMS.length} authentic photos).`}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-blue-950 bg-white border border-blue-200 rounded-lg shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{language === 'bn' ? `${GALLERY_ITEMS.length}টি বাস্তব চিত্র` : `${GALLERY_ITEMS.length} Authentic Photos`}</span>
            </span>
            <a
              href={ORG_DETAILS.facebookPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-2xs"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'ফেসবুক পেজ' : 'Facebook Page'}</span>
            </a>
          </div>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setSelectedCategory(tab.key);
                setActivePhotoIndex(null);
              }}
              type="button"
              className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === tab.key
                  ? 'bg-blue-900 text-white shadow-xs font-semibold scale-100 ring-2 ring-blue-900 ring-offset-1'
                  : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {language === 'bn' ? tab.labelBn : tab.labelEn}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActivePhotoIndex(index)}
              className="group bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-blue-400 hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col transform hover:-translate-y-1"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                <img
                  src={item.imageSrc}
                  alt={language === 'bn' ? item.titleBn : item.titleEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                  <div className="p-2.5 bg-white/95 rounded-full text-blue-900 shadow-lg transform group-hover:scale-110 transition-transform">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>

                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2.5 py-1 text-[11px] font-bold text-white bg-blue-950/85 backdrop-blur-xs rounded-md shadow-xs">
                    {language === 'bn' ? item.categoryBn : item.categoryEn}
                  </span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-400 mb-1.5">
                    <span className="flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
                      <Calendar className="w-3 h-3" />
                      {language === 'bn' ? item.dateBn : item.dateEn}
                    </span>
                    <span className="font-mono text-[11px] text-stone-400">
                      #{item.id.replace('g-', '')}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-900 transition-colors line-clamp-2 leading-snug">
                    {language === 'bn' ? item.titleBn : item.titleEn}
                  </h3>
                </div>

                <p className="mt-2.5 text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {language === 'bn' ? item.descriptionBn : item.descriptionEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal with Next / Prev Controls */}
      {activePhoto !== null && activePhotoIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActivePhotoIndex(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden border border-stone-200 shadow-2xl relative flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/80">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="px-2.5 py-1 text-xs font-bold text-blue-900 bg-blue-100/80 rounded-md">
                  {language === 'bn' ? activePhoto.categoryBn : activePhoto.categoryEn}
                </span>
                <span className="text-xs text-stone-500 font-medium">
                  {language === 'bn' 
                    ? `ছবি ${activePhotoIndex + 1} / ${filteredItems.length}` 
                    : `Photo ${activePhotoIndex + 1} of ${filteredItems.length}`}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={activePhoto.imageSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200 rounded-full transition-colors text-xs flex items-center gap-1"
                  title="পূর্ণ রেজল্যুশনে দেখুন"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setActivePhotoIndex(null)}
                  type="button"
                  className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200 rounded-full transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Image Stage with navigation buttons */}
            <div className="relative flex-1 bg-stone-950 flex items-center justify-center overflow-hidden min-h-[300px] sm:min-h-[420px] max-h-[62vh]">
              <img
                src={activePhoto.imageSrc}
                alt={language === 'bn' ? activePhoto.titleBn : activePhoto.titleEn}
                className="max-h-[60vh] w-auto max-w-full object-contain p-2"
              />

              {/* Prev Button */}
              {filteredItems.length > 1 && (
                <button
                  onClick={handlePrev}
                  type="button"
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/60 hover:bg-black/90 text-white rounded-full transition-all cursor-pointer backdrop-blur-xs"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              {/* Next Button */}
              {filteredItems.length > 1 && (
                <button
                  onClick={handleNext}
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/60 hover:bg-black/90 text-white rounded-full transition-all cursor-pointer backdrop-blur-xs"
                  aria-label="Next"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Bottom Caption & Details */}
            <div className="p-5 sm:p-6 bg-white overflow-y-auto">
              <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 mb-2">
                <span className="flex items-center gap-1 font-semibold text-blue-900">
                  <Tag className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? activePhoto.categoryBn : activePhoto.categoryEn}</span>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1 font-medium text-emerald-800">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? activePhoto.dateBn : activePhoto.dateEn}</span>
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                {language === 'bn' ? activePhoto.titleBn : activePhoto.titleEn}
              </h3>

              <p className="mt-2 text-sm text-stone-700 leading-relaxed bg-stone-50 p-3 rounded-xl border border-stone-200">
                {language === 'bn' ? activePhoto.descriptionBn : activePhoto.descriptionEn}
              </p>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span>জয়মনিরহাট ইউনিয়ন যুব সংগঠন • ভূরুঙ্গামারী, কুড়িগ্রাম</span>
                <a
                  href={ORG_DETAILS.facebookPageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-700 hover:underline flex items-center gap-1"
                >
                  <span>{language === 'bn' ? 'ফেসবুকে আরো আপডেট' : 'Facebook Page'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
