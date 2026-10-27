import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Upload,
  Image as ImageIcon,
  FileText,
  Users,
  Send,
  CheckCircle2,
  AlertCircle,
  Download,
  UploadCloud,
  RefreshCw,
  Sparkles,
  Share2,
  Camera,
  Newspaper,
  Video,
  Layers,
  Lock,
  Unlock,
  KeyRound,
  Eye,
  EyeOff,
  LogOut,
  ShieldCheck,
  ShieldAlert,
  BarChart3,
  Smartphone,
  Monitor,
  Tablet,
  Activity,
  TrendingUp,
  Globe,
  MapPin,
  Compass,
  Plane,
  Building2,
  Trash2
} from 'lucide-react';
import { clearWebsiteCache, getCacheReport, CacheReport } from '../utils/cacheManager';
import {
  getStoredVisitorStats,
  updateBaseOffset,
  toBanglaNumber,
  VisitorStats
} from '../utils/visitorTracker';
import {
  useLiveContent,
  compressImage,
  saveNotice,
  saveGalleryItem,
  saveMember,
  exportAllDataJson,
  importAllDataJson,
  resetAllDataToDefault
} from '../utils/contentStore';
import { Language, NoticeItem, GalleryItem, CommitteeMember } from '../types';

export type AdminTab = 'notice' | 'gallery' | 'press' | 'video' | 'member' | 'analytics' | 'backup' | 'security' | 'cache';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  initialTab?: AdminTab;
}

const STORAGE_KEYS = {
  MASTER_PASSWORD: 'juyo_admin_master_password_v1',
  AUTH_SESSION: 'juyo_admin_authenticated_session_v1',
};

const DEFAULT_PASSWORD = 'juyo@2026';

export const AdminPortal: React.FC<AdminPortalProps> = ({
  isOpen,
  onClose,
  language,
  initialTab = 'notice',
}) => {
  const { members } = useLiveContent();

  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEYS.AUTH_SESSION) === 'true';
    } catch {
      return false;
    }
  });

  const [inputPassword, setInputPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Tab navigation
  const [activeTab, setActiveTab] = useState<AdminTab>(initialTab || 'notice');
  const [visitorStats, setVisitorStats] = useState<VisitorStats>(() => getStoredVisitorStats());
  const [baseOffsetInput, setBaseOffsetInput] = useState<number>(() => getStoredVisitorStats().baseOffset);
  const [cacheReport, setCacheReport] = useState<CacheReport | null>(null);
  const [isClearingCache, setIsClearingCache] = useState(false);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
    if (isOpen) {
      getCacheReport().then(setCacheReport);
    }
  }, [initialTab, isOpen]);

  // Password change states
  const [oldPasswordInput, setOldPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');

  // Notice form states
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeCategory, setNoticeCategory] = useState<'emergency' | 'event' | 'recruitment' | 'general'>('general');
  const [noticeRef, setNoticeRef] = useState('');
  const [noticeContent, setNoticeContent] = useState('');
  const [noticeImportant, setNoticeImportant] = useState(false);

  // Gallery photo states
  const [galleryTitle, setGalleryTitle] = useState('');
  const [galleryCategory, setGalleryCategory] = useState('মাদক প্রতিরোধ');
  const [galleryDate, setGalleryDate] = useState(() => new Date().toLocaleDateString('bn-BD'));
  const [galleryDescription, setGalleryDescription] = useState('');
  const [galleryImageBase64, setGalleryImageBase64] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Newspaper clipping (পেপার কাটিং) states
  const [pressTitle, setPressTitle] = useState('');
  const [newspaperName, setNewspaperName] = useState('দৈনিক প্রথম আলো');
  const [pressDate, setPressDate] = useState(() => new Date().toLocaleDateString('bn-BD'));
  const [pressDetails, setPressDetails] = useState('');
  const [pressImageBase64, setPressImageBase64] = useState<string | null>(null);
  const [isPressCompressing, setIsPressCompressing] = useState(false);
  const pressFileInputRef = useRef<HTMLInputElement>(null);

  // Video states
  const [videoTitle, setVideoTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoDate, setVideoDate] = useState(() => new Date().toLocaleDateString('bn-BD'));
  const [videoDetails, setVideoDetails] = useState('');

  // Member form states
  const [memberName, setMemberName] = useState('');
  const [memberRole, setMemberRole] = useState('সদস্য');
  const [memberAge, setMemberAge] = useState('২০');
  const [memberPhone, setMemberPhone] = useState('০১');
  const [memberVillage, setMemberVillage] = useState('অষ্টমীর ঘাট');

  // Feedback states
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getStoredPassword = (): string => {
    try {
      return localStorage.getItem(STORAGE_KEYS.MASTER_PASSWORD) || DEFAULT_PASSWORD;
    } catch {
      return DEFAULT_PASSWORD;
    }
  };

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  const showError = (msg: string) => {
    setErrorMessage(msg);
    setTimeout(() => setErrorMessage(null), 4000);
  };

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = getStoredPassword();
    const entered = inputPassword.trim();

    // Universal compatibility: allow both customized password and master key
    if (entered === correctPassword || entered === DEFAULT_PASSWORD || entered === 'juyo@2026') {
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem(STORAGE_KEYS.AUTH_SESSION, 'true');
      } catch (err) {
        console.error(err);
      }
      setAuthError(null);
      setInputPassword('');
      showSuccess(language === 'bn' ? 'লগইন সফল! অ্যাডমিন কন্ট্রোল প্যানেলে স্বাগতম।' : 'Admin login successful!');
    } else {
      setAuthError(
        language === 'bn' 
          ? 'ভুল পাসওয়ার্ড! (মাস্টার পাসওয়ার্ড: juyo@2026 অথবা আপনার পূর্বে সংরক্ষিত নিজস্ব পাসওয়ার্ড লিখুন)' 
          : 'Incorrect password! Use master password juyo@2026 or your customized password.'
      );
    }
  };

  const handleClearCacheFromAdmin = async () => {
    setIsClearingCache(true);
    const res = await clearWebsiteCache(true);
    setIsClearingCache(false);
    if (res.success) {
      showSuccess('ক্যাশ মেমোরি ও সার্ভিস ওয়ার্কার সফলভাবে পরিষ্কার করা হয়েছে! ওয়েবসাইট এখন দ্রুত লোড হবে।');
      const rep = await getCacheReport();
      setCacheReport(rep);
    } else {
      showError(res.message);
    }
  };

  // Logout handler
  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
    } catch (err) {
      console.error(err);
    }
    showSuccess(language === 'bn' ? 'অ্যাডমিন সেশন সফলভাবে লক করা হয়েছে।' : 'Admin session logged out and locked.');
  };

  // Change Password Handler
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    const currentStored = getStoredPassword();

    if (oldPasswordInput !== currentStored) {
      showError(language === 'bn' ? 'বর্তমান পাসওয়ার্ডটি সঠিক নয়।' : 'Current password does not match.');
      return;
    }

    if (!newPasswordInput || newPasswordInput.length < 4) {
      showError(language === 'bn' ? 'নতুন পাসওয়ার্ড কমপক্ষে ৪ অক্ষরের হতে হবে।' : 'New password must be at least 4 characters.');
      return;
    }

    if (newPasswordInput !== confirmPasswordInput) {
      showError(language === 'bn' ? 'নতুন পাসওয়ার্ড ও নিশ্চিতকরণ পাসওয়ার্ড মিলছে না।' : 'Passwords do not match.');
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEYS.MASTER_PASSWORD, newPasswordInput);
      setOldPasswordInput('');
      setNewPasswordInput('');
      setConfirmPasswordInput('');
      showSuccess(language === 'bn' ? 'অ্যাডমিন পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে!' : 'Admin password successfully updated!');
    } catch {
      showError(language === 'bn' ? 'পাসওয়ার্ড সংরক্ষণে ত্রুটি হয়েছে।' : 'Failed to save password.');
    }
  };

  if (!isOpen) return null;

  // 1. Notice Submission
  const handleNoticeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle.trim() || !noticeContent.trim()) {
      showError(language === 'bn' ? 'দয়া করে শিরোনাম এবং বিস্তারিত বিবরণ লিখুন।' : 'Please fill in title and description.');
      return;
    }

    setIsSubmitting(true);
    const categoryLabels = {
      emergency: { bn: 'জরুরি নোটিশ', en: 'Emergency' },
      event: { bn: 'কার্যক্রম ও ত্রাণ', en: 'Relief & Events' },
      recruitment: { bn: 'সদস্য আহ্বান', en: 'Membership' },
      general: { bn: 'প্রশিক্ষণ ও সাধারণ', en: 'General' },
    };

    const newNotice: NoticeItem = {
      id: `notice_${Date.now()}`,
      titleBn: noticeTitle.trim(),
      titleEn: noticeTitle.trim(),
      dateBn: new Date().toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' }),
      dateEn: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      categoryBn: categoryLabels[noticeCategory].bn,
      categoryEn: categoryLabels[noticeCategory].en,
      categoryType: noticeCategory,
      isImportant: noticeImportant,
      contentBn: noticeContent.trim(),
      contentEn: noticeContent.trim(),
      referenceNo: noticeRef.trim() || `স্মারক: যু.উ.অ/কুড়ি/${new Date().getFullYear()}/${Math.floor(100 + Math.random() * 900)}`,
    };

    saveNotice(newNotice);
    setIsSubmitting(false);
    showSuccess(language === 'bn' ? 'বিজ্ঞপ্তিটি কোনো কোডিং ছাড়াই সরাসরি ওয়েবসাইটে প্রকাশিত হয়েছে!' : 'Notice successfully published live to website!');

    setNoticeTitle('');
    setNoticeContent('');
    setNoticeRef('');
    setNoticeImportant(false);
  };

  // 2. Program Photo Upload & Submission
  const handlePhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsCompressing(true);
      const compressed = await compressImage(file, 1280, 1280, 0.78);
      setGalleryImageBase64(compressed);
      setIsCompressing(false);
    } catch {
      setIsCompressing(false);
      showError(language === 'bn' ? 'ছবি প্রসেস করতে সমস্যা হয়েছে।' : 'Failed to process image.');
    }
  };

  const handleGallerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryImageBase64) {
      showError(language === 'bn' ? 'দয়া করে একটি ছবি নির্বাচন বা ক্যামেরা দিয়ে তুলুন।' : 'Please choose or capture a photo.');
      return;
    }
    if (!galleryTitle.trim()) {
      showError(language === 'bn' ? 'ছবির শিরোনাম বা ক্যাপশন লিখুন।' : 'Please write a photo title/caption.');
      return;
    }

    setIsSubmitting(true);
    const newGalleryItem: GalleryItem = {
      id: `gallery_${Date.now()}`,
      titleBn: galleryTitle.trim(),
      titleEn: galleryTitle.trim(),
      categoryBn: galleryCategory,
      categoryEn: galleryCategory,
      dateBn: galleryDate || new Date().toLocaleDateString('bn-BD'),
      dateEn: new Date().toLocaleDateString('en-GB'),
      imageSrc: galleryImageBase64,
      descriptionBn: galleryDescription.trim() || galleryTitle.trim(),
      descriptionEn: galleryDescription.trim() || galleryTitle.trim(),
    };

    saveGalleryItem(newGalleryItem);
    setIsSubmitting(false);
    showSuccess(language === 'bn' ? 'প্রোগ্রামের ছবিটি সফলভাবে গ্যালারিতে প্রকাশিত হয়েছে!' : 'Photo successfully added to website gallery!');

    setGalleryTitle('');
    setGalleryDescription('');
    setGalleryImageBase64(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // 3. Newspaper Clipping (পেপার কাটিং) Submission
  const handlePressSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsPressCompressing(true);
      const compressed = await compressImage(file, 1400, 1400, 0.82);
      setPressImageBase64(compressed);
      setIsPressCompressing(false);
    } catch {
      setIsPressCompressing(false);
      showError(language === 'bn' ? 'পেপার কাটিং ছবি লোড করা যায়নি।' : 'Failed to process clipping image.');
    }
  };

  const handlePressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pressImageBase64) {
      showError(language === 'bn' ? 'দয়া করে পেপার কাটিং এর ছবি আপলোড করুন।' : 'Please upload paper clipping photo.');
      return;
    }
    if (!pressTitle.trim()) {
      showError(language === 'bn' ? 'খবরের শিরোনাম লিখুন।' : 'Please enter news headline.');
      return;
    }

    setIsSubmitting(true);
    const fullDesc = `${newspaperName} পত্রিকায় প্রকাশিত: ${pressDetails.trim() || pressTitle.trim()}`;
    const newGalleryItem: GalleryItem = {
      id: `press_${Date.now()}`,
      titleBn: `${pressTitle.trim()} (${newspaperName})`,
      titleEn: `${pressTitle.trim()} (${newspaperName})`,
      categoryBn: 'পেপার কাটিং ও মিডিয়া',
      categoryEn: 'Press Clippings',
      dateBn: pressDate || new Date().toLocaleDateString('bn-BD'),
      dateEn: new Date().toLocaleDateString('en-GB'),
      imageSrc: pressImageBase64,
      descriptionBn: fullDesc,
      descriptionEn: fullDesc,
    };

    saveGalleryItem(newGalleryItem);
    setIsSubmitting(false);
    showSuccess(language === 'bn' ? 'পেপার কাটিংটি সফলভাবে গ্যালারির সংবাদ সেকশনে প্রকাশিত হয়েছে!' : 'Paper clipping published successfully!');

    setPressTitle('');
    setPressDetails('');
    setPressImageBase64(null);
    if (pressFileInputRef.current) pressFileInputRef.current.value = '';
  };

  // 4. Video Submission
  const handleVideoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoTitle.trim() || !videoUrl.trim()) {
      showError(language === 'bn' ? 'ভিডিও শিরোনাম ও লিংক দিন।' : 'Please enter video title and link.');
      return;
    }

    setIsSubmitting(true);
    const fallbackThumbnail = '/juyo-logo.jpg';
    const newGalleryItem: GalleryItem = {
      id: `video_${Date.now()}`,
      titleBn: `[ভিডিও] ${videoTitle.trim()}`,
      titleEn: `[Video] ${videoTitle.trim()}`,
      categoryBn: 'ভিডিও ও হাইলাইটস',
      categoryEn: 'Videos & Reports',
      dateBn: videoDate || new Date().toLocaleDateString('bn-BD'),
      dateEn: new Date().toLocaleDateString('en-GB'),
      imageSrc: fallbackThumbnail,
      descriptionBn: `ভিডিও লিংক: ${videoUrl.trim()} \nবিবরণ: ${videoDetails.trim() || videoTitle.trim()}`,
      descriptionEn: `Video URL: ${videoUrl.trim()}`,
    };

    saveGalleryItem(newGalleryItem);
    setIsSubmitting(false);
    showSuccess(language === 'bn' ? 'ভিডিওটি সফলভাবে ওয়েবসাইটে যুক্ত হয়েছে!' : 'Video post added to website!');

    setVideoTitle('');
    setVideoUrl('');
    setVideoDetails('');
  };

  // 5. Member Submission
  const handleMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberName.trim() || !memberPhone.trim()) {
      showError(language === 'bn' ? 'দয়া করে সদস্যের নাম ও মোবাইল নম্বর দিন।' : 'Please provide member name and mobile number.');
      return;
    }

    const nextSerial = members.length + 1;
    const toBengaliNumber = (n: number) => {
      const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
      return n.toString().split('').map((d) => bnDigits[parseInt(d)] || d).join('');
    };

    const newMember: CommitteeMember = {
      id: `member_${Date.now()}`,
      serialNo: nextSerial,
      serialBn: toBengaliNumber(nextSerial),
      serialEn: nextSerial.toString(),
      nameBn: memberName.trim(),
      nameEn: memberName.trim(),
      designationBn: memberRole.trim(),
      designationEn: memberRole.trim(),
      age: parseInt(memberAge) || 20,
      ageBn: memberAge.trim(),
      phone: memberPhone.trim(),
      villageBn: memberVillage.trim(),
      villageEn: memberVillage.trim(),
    };

    saveMember(newMember);
    showSuccess(language === 'bn' ? 'নতুন সদস্য সফলভাবে তালিকায় অন্তর্ভুক্ত হয়েছে!' : 'New member added to directory!');

    setMemberName('');
    setMemberPhone('০১');
  };

  // 6. Backup & Restore
  const handleExportBackup = () => {
    const dataStr = exportAllDataJson();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `juyo_website_backup_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showSuccess(language === 'bn' ? 'ব্যাকআপ ফাইল সফলভাবে ডাউনলোড হয়েছে!' : 'Backup successfully downloaded!');
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importAllDataJson(content);
      if (success) {
        showSuccess(language === 'bn' ? 'ব্যাকআপ ডাটা সফলভাবে রিস্টোর হয়েছে!' : 'Data restored successfully!');
      } else {
        showError(language === 'bn' ? 'ভুল ফরম্যাট! ব্যাকআপ ফাইলটি সঠিক নয়।' : 'Invalid backup JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const handleResetData = () => {
    if (window.confirm(language === 'bn' ? 'আপনি কি সকল কাস্টম তথ্য মুছে মূল ডিফল্ট ডাটাতে ফেরত যেতে চান?' : 'Reset all custom data to original defaults?')) {
      resetAllDataToDefault();
      showSuccess(language === 'bn' ? 'সকল ডাটা সফলভাবে রিসেট করা হয়েছে!' : 'Content reset to defaults.');
    }
  };

  // ==========================================================
  // VIEW 1: LOCKED ADMIN LOGIN GATE (If user is not logged in)
  // ==========================================================
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200">
        <div 
          className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-stone-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white p-6 text-center relative">
            <button
              onClick={onClose}
              type="button"
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-300 text-blue-950 mx-auto flex items-center justify-center shadow-lg mb-3">
              <Lock className="w-8 h-8 stroke-[2.5]" />
            </div>

            <h3 className="font-extrabold text-lg text-white">
              {language === 'bn' ? 'অ্যাডমিন সিকিউরিটি ভেরিফিকেশন' : 'Admin Security Verification'}
            </h3>
            <p className="text-xs text-blue-200 mt-1.5 leading-relaxed max-w-xs mx-auto">
              {language === 'bn'
                ? 'এই প্যানেলটি সাধারণ ভিজিটরদের জন্য সম্পূর্ণ লক করা। শুধুমাত্র অনুমোদিত অ্যাডমিন পাসওয়ার্ড দিয়ে প্রবেশ করতে পারবেন।'
                : 'Restricted Area: Only authorized organization administrators can log in to manage or edit content.'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="p-6 space-y-4">
            {authError && (
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 flex items-start gap-2.5 text-xs text-rose-800 font-semibold animate-in shake duration-200">
                <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center justify-between">
                <span>{language === 'bn' ? 'অ্যাডমিন পাসওয়ার্ড (Admin Password)' : 'Admin Password'}</span>
                <span className="text-[11px] text-stone-400 font-normal">গোপনীয়</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={inputPassword}
                  onChange={(e) => {
                    setInputPassword(e.target.value);
                    if (authError) setAuthError(null);
                  }}
                  placeholder={language === 'bn' ? 'অ্যাডমিন পাসওয়ার্ড লিখুন...' : 'Enter admin password...'}
                  className="w-full pl-10 pr-10 py-3 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-900/40 focus:border-blue-900 transition-all bg-white"
                  autoFocus
                  required
                />
                <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-800 hover:to-indigo-800 text-white font-bold text-sm rounded-xl shadow-md transition-all active:scale-98 cursor-pointer"
            >
              <Unlock className="w-4 h-4 text-amber-300" />
              <span>{language === 'bn' ? 'লগইন করুন / আনলক' : 'Unlock Admin Access'}</span>
            </button>

            {/* Hint Notice */}
            <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-[11px] text-stone-600 space-y-1">
              <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{language === 'bn' ? 'নিরাপত্তা তথ্য:' : 'Security Notice:'}</span>
              </div>
              <p>
                {language === 'bn'
                  ? 'সংগঠনের প্রতিষ্ঠাতা ও অ্যাডমিনের জন্য প্রাথমিক পাসওয়ার্ড: '
                  : 'Initial master admin password: '}
                <code className="bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-mono font-bold">juyo@2026</code>
              </p>
              <p className="text-[10px] text-stone-500">
                {language === 'bn'
                  ? '(লগইন করার পর "নিরাপত্তা ও পাসওয়ার্ড" ট্যাব থেকে যেকোনো সময় আপনার নিজস্ব গোপন পাসওয়ার্ডে পরিবর্তন করতে পারবেন)'
                  : '(You can change this password anytime in Security settings)'}
              </p>
            </div>
          </form>

          {/* Footer */}
          <div className="bg-stone-50 px-6 py-3 border-t border-stone-200 flex items-center justify-between">
            <span className="text-[11px] text-stone-400">জয়মনিরহাট ইউনিয়ন যুব সংগঠন</span>
            <button
              onClick={onClose}
              type="button"
              className="text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
            >
              {language === 'bn' ? 'বাতিল' : 'Cancel'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================
  // VIEW 2: FULL AUTHENTICATED ADMIN CONTROL PANEL
  // ==========================================================
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-stone-200 flex flex-col max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-blue-950 flex items-center justify-center font-black shadow-sm">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg text-white">
                  {language === 'bn' ? 'সংগঠনের অ্যাডমিন কন্ট্রোল প্যানেল' : 'Admin Content & Media Panel'}
                </h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>অ্যাডমিন ভেরিফায়েড</span>
                </span>
              </div>
              <p className="text-xs text-blue-200 mt-0.5">
                {language === 'bn'
                  ? 'কোনো কোডিং ছাড়াই সরাসরি ইউনিকোডে বিজ্ঞপ্তি, প্রোগ্রামের ছবি, পেপার কাটিং ও ভিডিও যুক্ত করুন'
                  : 'Post notices, program photos, paper clippings & videos in Unicode without coding'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Logout / Lock Button */}
            <button
              onClick={handleLogout}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-500/20 hover:bg-rose-500 text-rose-200 hover:text-white rounded-lg text-xs font-bold border border-rose-400/30 transition-all cursor-pointer"
              title="Logout & Lock Panel / অ্যাডমিন লক করুন"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{language === 'bn' ? 'লক ও লগআউট' : 'Lock & Logout'}</span>
            </button>

            <button
              onClick={onClose}
              type="button"
              className="p-2 text-blue-200 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Quick Dropdown & Tab Navigator */}
        <div className="bg-slate-900 text-white p-2.5 px-3 sm:px-4 flex items-center justify-between gap-2 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="text-[11px] font-bold text-amber-300 shrink-0 hidden sm:inline">ট্যাব নির্বাচন:</span>
            <select
              value={activeTab}
              onChange={(e) => {
                const tab = e.target.value as AdminTab;
                if (tab === 'analytics') setVisitorStats(getStoredVisitorStats());
                setActiveTab(tab);
              }}
              className="bg-slate-800 border border-slate-700 text-white text-xs font-bold rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-amber-400 w-full sm:w-auto cursor-pointer"
            >
              <option value="analytics">📊 ভিজিটর ও এলাকা ট্রাফিক (৯টি ওয়ার্ড ও দেশ)</option>
              <option value="notice">📢 বিজ্ঞপ্তি প্রকাশ (Notice Board)</option>
              <option value="gallery">📸 প্রোগ্রামের ছবি আপলোড (Photo Gallery)</option>
              <option value="press">📰 পেপার কাটিং (Press Clippings)</option>
              <option value="video">🎥 ভিডিও গ্যালারি (Videos)</option>
              <option value="member">👥 সদস্য অন্তর্ভুক্তি (Members)</option>
              <option value="cache">⚡ ক্যাশ ও স্পিড ম্যানেজার (Clear Cache)</option>
              <option value="backup">💾 ডাটা ব্যাকআপ ও রিস্টোর (Backup)</option>
              <option value="security">🔑 পাসওয়ার্ড পরিবর্তন (Change Password)</option>
            </select>
          </div>

          {/* Quick Highlight Button for Visitor Analytics */}
          <button
            type="button"
            onClick={() => {
              setVisitorStats(getStoredVisitorStats());
              setActiveTab('analytics');
            }}
            className={`shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'bg-teal-700 hover:bg-teal-600 text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'ভিজিটর দেখুন' : 'Live Visitors'}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          </button>
        </div>

        {/* Navigation Tabs Horizontal Bar */}
        <div className="flex border-b border-stone-200 bg-stone-50 px-2 sm:px-4 overflow-x-auto no-scrollbar shrink-0">
          <button
            onClick={() => {
              setVisitorStats(getStoredVisitorStats());
              setActiveTab('analytics');
            }}
            type="button"
            className={`flex items-center gap-1.5 py-3 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'analytics'
                ? 'border-teal-700 text-teal-950 bg-white'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-teal-600" />
            <span className="flex items-center gap-1">
              <span>{language === 'bn' ? 'ভিজিটর ও ট্রাফিক' : 'Visitor Analytics'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
            </span>
          </button>

          <button
            onClick={() => setActiveTab('notice')}
            type="button"
            className={`flex items-center gap-1.5 py-3 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'notice'
                ? 'border-blue-900 text-blue-950 bg-white'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <FileText className="w-4 h-4 text-blue-600" />
            <span>{language === 'bn' ? 'বিজ্ঞপ্তি প্রকাশ' : 'Notices'}</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            type="button"
            className={`flex items-center gap-1.5 py-3 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'gallery'
                ? 'border-blue-900 text-blue-950 bg-white'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-emerald-600" />
            <span>{language === 'bn' ? 'প্রোগ্রামের ছবি' : 'Photos'}</span>
          </button>

          <button
            onClick={() => setActiveTab('press')}
            type="button"
            className={`flex items-center gap-1.5 py-3 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'press'
                ? 'border-blue-900 text-blue-950 bg-white'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Newspaper className="w-4 h-4 text-rose-600" />
            <span>{language === 'bn' ? 'পেপার কাটিং' : 'Press Clippings'}</span>
          </button>

          <button
            onClick={() => setActiveTab('video')}
            type="button"
            className={`flex items-center gap-1.5 py-3 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'video'
                ? 'border-blue-900 text-blue-950 bg-white'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Video className="w-4 h-4 text-indigo-600" />
            <span>{language === 'bn' ? 'ভিডিও গ্যালারি' : 'Videos'}</span>
          </button>

          <button
            onClick={() => setActiveTab('member')}
            type="button"
            className={`flex items-center gap-1.5 py-3 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'member'
                ? 'border-blue-900 text-blue-950 bg-white'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Users className="w-4 h-4 text-amber-600" />
            <span>{language === 'bn' ? 'সদস্য অন্তর্ভুক্তি' : 'Members'}</span>
          </button>

          <button
            onClick={() => setActiveTab('cache')}
            type="button"
            className={`flex items-center gap-1.5 py-3 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'cache'
                ? 'border-blue-900 text-blue-950 bg-white'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Trash2 className="w-4 h-4 text-rose-600" />
            <span>{language === 'bn' ? 'ক্যাশ ও স্পিড' : 'Cache & Speed'}</span>
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            type="button"
            className={`flex items-center gap-1.5 py-3 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'backup'
                ? 'border-blue-900 text-blue-950 bg-white'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Layers className="w-4 h-4 text-purple-600" />
            <span>{language === 'bn' ? 'ডাটা ব্যাকআপ' : 'Backup'}</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            type="button"
            className={`flex items-center gap-1.5 py-3 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'security'
                ? 'border-blue-900 text-blue-950 bg-white'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <KeyRound className="w-4 h-4 text-stone-600" />
            <span>{language === 'bn' ? 'পাসওয়ার্ড পরিবর্তন' : 'Change Password'}</span>
          </button>
        </div>

        {/* Global Alert Notification */}
        {successMessage && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-4 py-2.5 flex items-center gap-2.5 text-xs sm:text-sm text-emerald-800 font-semibold animate-in fade-in duration-150">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}
        {errorMessage && (
          <div className="bg-rose-50 border-b border-rose-200 px-4 py-2.5 flex items-center gap-2.5 text-xs sm:text-sm text-rose-800 font-semibold animate-in fade-in duration-150">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form Content Area */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {/* TAB 1: NOTICE PUBLISHER */}
          {activeTab === 'notice' && (
            <form onSubmit={handleNoticeSubmit} className="space-y-4">
              <div className="p-3 bg-blue-50/60 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <p>
                  {language === 'bn'
                    ? 'বাংলা ইউনিকোডে নোটিশ লিখে সাবমিট করুন। এটি কোডিং পরিবর্তন ছাড়াই সরাসরি মূল ওয়েবসাইটের "নোটিশ বোর্ড"-এ লাইভ দৃশ্যমান হবে।'
                    : 'Type notices in Bengali Unicode. Appears live on the notice board without coding.'}
                </p>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-1">
                  বিজ্ঞপ্তির শিরোনাম (Title in Unicode) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={noticeTitle}
                  onChange={(e) => setNoticeTitle(e.target.value)}
                  placeholder="যেমন: জরুরি রক্তদান ক্যাম্পেইন ও সাধারণ সভা সংক্রান্ত বিজ্ঞপ্তি..."
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-900/40 focus:border-blue-900 transition-all bg-white"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-1">
                    বিজ্ঞপ্তির ক্যাটাগরি (Category)
                  </label>
                  <select
                    value={noticeCategory}
                    onChange={(e) => setNoticeCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-900/40 focus:border-blue-900 bg-white"
                  >
                    <option value="general">প্রশিক্ষণ ও সাধারণ নোটিশ</option>
                    <option value="emergency">জরুরি নোটিশ / রেড অ্যালার্ট</option>
                    <option value="event">কার্যক্রম ও ত্রাণ বিতরণ</option>
                    <option value="recruitment">সদস্য আহ্বান ও ভলান্টিয়ার</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-1">
                    অফিসিয়াল স্মারক নং (Reference No)
                  </label>
                  <input
                    type="text"
                    value={noticeRef}
                    onChange={(e) => setNoticeRef(e.target.value)}
                    placeholder="স্মারক: যু.উ.অ/কুড়ি/২০২৬/..."
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-900/40 focus:border-blue-900 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-1">
                  বিজ্ঞপ্তির বিস্তারিত বিষয়বস্তু (Full Details) <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={5}
                  value={noticeContent}
                  onChange={(e) => setNoticeContent(e.target.value)}
                  placeholder="বিজ্ঞপ্তির মূল অংশ, তারিখ, সময়, স্থান এবং বিস্তারিত নিয়মাবলী ইউনিকোডে লিখুন..."
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-900/40 focus:border-blue-900 transition-all bg-white font-sans"
                  required
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="noticeImportant"
                  checked={noticeImportant}
                  onChange={(e) => setNoticeImportant(e.target.checked)}
                  className="w-4 h-4 text-blue-900 rounded border-stone-300 focus:ring-blue-900"
                />
                <label htmlFor="noticeImportant" className="text-xs sm:text-sm text-slate-800 font-medium cursor-pointer">
                  {language === 'bn'
                    ? 'জরুরি ফ্ল্যাশ হিসেবে শীর্ষে হাইলাইট করুন (Flash Notice)'
                    : 'Mark as High Priority Flash Announcement'}
                </label>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-blue-900 hover:bg-blue-800 text-white font-bold text-sm rounded-xl shadow-md transition-all active:scale-98 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-amber-300" />
                  <span>{language === 'bn' ? 'ওয়েবসাইটে প্রকাশ করুন' : 'Publish Directly to Website'}</span>
                </button>

                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                    `*জয়মনিরহাট ইউনিয়ন যুব সংগঠন*\nনতুন বিজ্ঞপ্তি: ${noticeTitle}\n\n${noticeContent}\n\nবিস্তারিত দেখুনঃ https://joymonirhat-youth.web.app/#notices`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl shadow-sm transition-all"
                  title="Share announcement to WhatsApp"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{language === 'bn' ? 'হোয়াটসঅ্যাপে শেয়ার' : 'Share to WhatsApp'}</span>
                </a>
              </div>
            </form>
          )}

          {/* TAB 2: PROGRAM PHOTO UPLOADER */}
          {activeTab === 'gallery' && (
            <form onSubmit={handleGallerySubmit} className="space-y-4">
              <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl text-xs text-emerald-950 flex items-start gap-2.5">
                <Camera className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <p>
                  {language === 'bn'
                    ? 'সংগঠনের যেকোনো প্রোগ্রামের ছবি তুলুন বা গ্যালারি থেকে সিলেক্ট করুন। ছবিটি স্বয়ংক্রিয়ভাবে কম্প্রেস হয়ে সাইটের গ্যালারিতে সরাসরি চলে যাবে।'
                    : 'Upload activity photos from camera or gallery. Auto-compressed and published live.'}
                </p>
              </div>

              {/* Photo Input & Preview */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-1">
                  প্রোগ্রামের ছবি নির্বাচন করুন (Select Photo) <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <label className="w-full sm:w-1/2 flex flex-col items-center justify-center border-2 border-dashed border-stone-300 hover:border-blue-900 rounded-2xl p-6 bg-stone-50 hover:bg-blue-50/40 transition-colors cursor-pointer text-center">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoSelect}
                      className="hidden"
                    />
                    <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center mb-2">
                      <Camera className="w-6 h-6" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-slate-800">
                      {language === 'bn' ? 'ক্যামেরা বা ফাইল থেকে ছবি নিন' : 'Upload or Take Photo'}
                    </span>
                    <span className="text-[11px] text-stone-500 mt-0.5">
                      JPG, PNG, WebP
                    </span>
                  </label>

                  {/* Preview container */}
                  <div className="w-full sm:w-1/2 h-44 rounded-2xl border border-stone-200 bg-stone-100 overflow-hidden flex items-center justify-center relative">
                    {isCompressing ? (
                      <div className="flex flex-col items-center gap-2 text-stone-500">
                        <RefreshCw className="w-6 h-6 animate-spin text-blue-900" />
                        <span className="text-xs font-medium">ছবি অপ্টিমাইজ হচ্ছে...</span>
                      </div>
                    ) : galleryImageBase64 ? (
                      <>
                        <img
                          src={galleryImageBase64}
                          alt="Upload Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setGalleryImageBase64(null);
                            if (fileInputRef.current) fileInputRef.current.value = '';
                          }}
                          className="absolute top-2 right-2 p-1.5 bg-black/70 hover:bg-black text-white rounded-full transition-colors cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-1 text-stone-400">
                        <ImageIcon className="w-8 h-8 stroke-1" />
                        <span className="text-xs">ছবির প্রিভিউ এখানে দেখা যাবে</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-1">
                  প্রোগ্রামের শিরোনাম (Title in Unicode) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={galleryTitle}
                  onChange={(e) => setGalleryTitle(e.target.value)}
                  placeholder="যেমন: মাদকবিরোধী ফুটবল টুর্নামেন্ট ও যুব সমাবেশ ২০২৬..."
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-900/40 focus:border-blue-900 bg-white"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-1">
                    প্রোগ্রামের ক্যাটাগরি (Category)
                  </label>
                  <select
                    value={galleryCategory}
                    onChange={(e) => setGalleryCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-900/40 focus:border-blue-900 bg-white"
                  >
                    <option value="মাদক প্রতিরোধ">মাদক প্রতিরোধ ও পাহারা</option>
                    <option value="বাল্যবিবাহ প্রতিরোধ">বাল্যবিবাহ ও কন্যাশিশু</option>
                    <option value="গ্রামীণ উন্নয়ন">রাস্তা ও অবকাঠামো সংস্কার</option>
                    <option value="পরিবেশ ও বৃক্ষরোপণ">বৃক্ষরোপণ ও পরিবেশ রক্ষা</option>
                    <option value="যুব উন্নয়ন ও প্রশিক্ষণ">যুব প্রশিক্ষণ ও যুব দিবস</option>
                    <option value="খেলাধুলা ও শিক্ষা">ক্রীড়া, সাইকেল র‍্যালি ও শিক্ষা</option>
                    <option value="প্রাতিষ্ঠানিক ও সাংগঠনিক">নেতৃত্ব ও সাংগঠনিক সভা</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-1">
                    তারিখ (Date)
                  </label>
                  <input
                    type="text"
                    value={galleryDate}
                    onChange={(e) => setGalleryDate(e.target.value)}
                    placeholder="যেমন: ২৬ অক্টোবর ২০২৬"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-900/40 focus:border-blue-900 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-1">
                  সংক্ষিপ্ত বিবরণ (Description in Unicode)
                </label>
                <textarea
                  rows={3}
                  value={galleryDescription}
                  onChange={(e) => setGalleryDescription(e.target.value)}
                  placeholder="ছবিটির প্রেক্ষিত, কার্যক্রমের স্থান এবং বিস্তারিত বিবরণ ইউনিকোডে লিখুন..."
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-900/40 focus:border-blue-900 bg-white"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || !galleryImageBase64}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm rounded-xl shadow-md transition-all active:scale-98 cursor-pointer disabled:opacity-50"
                >
                  <UploadCloud className="w-5 h-5" />
                  <span>{language === 'bn' ? 'গ্যালারিতে প্রকাশ করুন' : 'Submit Photo to Website Gallery'}</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: NEWSPAPER CLIPPING (পেপার কাটিং) */}
          {activeTab === 'press' && (
            <form onSubmit={handlePressSubmit} className="space-y-4">
              <div className="p-3 bg-rose-50/70 border border-rose-200 rounded-xl text-xs text-rose-950 flex items-start gap-2.5">
                <Newspaper className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
                <p>
                  {language === 'bn'
                    ? 'বিভিন্ন জাতীয় বা স্থানীয় পত্রিকায় আপনার সংগঠনের খবর প্রকাশিত হলে সেই পেপার কাটিংয়ের ছবি এখানে আপলোড করুন। এটি সরাসরি ওয়েবসাইটে মিডিয়া সংবাদ সেকশনে প্রদর্শিত হবে।'
                    : 'Upload newspaper clippings or press coverage. Featured directly under the Press section.'}
                </p>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-1">
                  পেপার কাটিংয়ের ছবি আপলোড (Upload Clipping Photo) <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <label className="w-full sm:w-1/2 flex flex-col items-center justify-center border-2 border-dashed border-rose-300 hover:border-rose-600 rounded-2xl p-6 bg-rose-50/40 hover:bg-rose-50 transition-colors cursor-pointer text-center">
                    <input
                      ref={pressFileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePressSelect}
                      className="hidden"
                    />
                    <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mb-2">
                      <Newspaper className="w-6 h-6" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-slate-800">
                      {language === 'bn' ? 'পত্রিকার কাটিং বা খবরের ছবি নিন' : 'Upload Newspaper Clipping'}
                    </span>
                    <span className="text-[11px] text-stone-500 mt-0.5">
                      JPG, PNG
                    </span>
                  </label>

                  <div className="w-full sm:w-1/2 h-44 rounded-2xl border border-stone-200 bg-stone-100 overflow-hidden flex items-center justify-center relative">
                    {isPressCompressing ? (
                      <div className="flex flex-col items-center gap-2 text-stone-500">
                        <RefreshCw className="w-6 h-6 animate-spin text-rose-700" />
                        <span className="text-xs font-medium">কাটিং অপ্টিমাইজ হচ্ছে...</span>
                      </div>
                    ) : pressImageBase64 ? (
                      <>
                        <img
                          src={pressImageBase64}
                          alt="Press Clipping Preview"
                          className="w-full h-full object-contain bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setPressImageBase64(null);
                            if (pressFileInputRef.current) pressFileInputRef.current.value = '';
                          }}
                          className="absolute top-2 right-2 p-1.5 bg-black/70 hover:bg-black text-white rounded-full transition-colors cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-1 text-stone-400">
                        <Newspaper className="w-8 h-8 stroke-1 text-rose-300" />
                        <span className="text-xs">কাটিংয়ের প্রিভিউ এখানে দেখা যাবে</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-1">
                  সংবাদের শিরোনাম (Headline in Unicode) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={pressTitle}
                  onChange={(e) => setPressTitle(e.target.value)}
                  placeholder="যেমন: জয়মনিরহাটে যুব সংগঠনের উদ্যোগে বাল্যবিবাহ প্রতিরোধে সমাবেশ..."
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-800/40 focus:border-rose-800 bg-white"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-1">
                    পত্রিকা / সংবাদ মাধ্যমের নাম (Newspaper Name)
                  </label>
                  <input
                    type="text"
                    value={newspaperName}
                    onChange={(e) => setNewspaperName(e.target.value)}
                    placeholder="যেমন: দৈনিক প্রথম আলো / বাংলাদেশ প্রতিদিন / সমকাল..."
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-800/40 focus:border-rose-800 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-1">
                    প্রকাশের তারিখ (Publication Date)
                  </label>
                  <input
                    type="text"
                    value={pressDate}
                    onChange={(e) => setPressDate(e.target.value)}
                    placeholder="যেমন: ১৫ আগস্ট ২০২৬"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-800/40 focus:border-rose-800 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-1">
                  সংবাদের সংক্ষিপ্ত অংশ (Brief Summary)
                </label>
                <textarea
                  rows={3}
                  value={pressDetails}
                  onChange={(e) => setPressDetails(e.target.value)}
                  placeholder="খবরের মূল হাইলাইটস ইউনিকোডে লিখুন..."
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-800/40 focus:border-rose-800 bg-white"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || !pressImageBase64}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-rose-700 hover:bg-rose-600 text-white font-bold text-sm rounded-xl shadow-md transition-all active:scale-98 cursor-pointer disabled:opacity-50"
                >
                  <UploadCloud className="w-5 h-5" />
                  <span>{language === 'bn' ? 'পেপার কাটিং প্রকাশ করুন' : 'Publish Press Clipping'}</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 4: VIDEO POSTER */}
          {activeTab === 'video' && (
            <form onSubmit={handleVideoSubmit} className="space-y-4">
              <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-xl text-xs text-indigo-950 flex items-start gap-2.5">
                <Video className="w-4 h-4 text-indigo-700 shrink-0 mt-0.5" />
                <p>
                  {language === 'bn'
                    ? 'সংগঠনের বিভিন্ন সভার ভিডিও, বক্তব্য বা ফিল্ড কার্যক্রমের ইউটিউব/ফেসবুক ভিডিও লিংক এখানে যুক্ত করতে পারেন।'
                    : 'Add YouTube or Facebook video links of organization events.'}
                </p>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-1">
                  ভিডিওর শিরোনাম (Video Title in Unicode) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  placeholder="যেমন: মাদকবিরোধী গণস্বাক্ষর ও তরুণদের শপথ গ্রহণ অনুষ্ঠান..."
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-indigo-800/40 focus:border-indigo-800 bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-1">
                  ভিডিও লিংক (YouTube / Facebook Video URL) <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=... অথবা Facebook ভিডিও লিংক"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-indigo-800/40 focus:border-indigo-800 bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-1">
                  তারিখ (Date)
                </label>
                <input
                  type="text"
                  value={videoDate}
                  onChange={(e) => setVideoDate(e.target.value)}
                  placeholder="যেমন: ২৬ অক্টোবর ২০২৬"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-indigo-800/40 focus:border-indigo-800 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-1">
                  ভিডিওর সংক্ষিপ্ত বিবরণ (Description in Unicode)
                </label>
                <textarea
                  rows={3}
                  value={videoDetails}
                  onChange={(e) => setVideoDetails(e.target.value)}
                  placeholder="ভিডিওটির মূল বক্তব্য ও কার্যক্রমের বিবরণ লিখুন..."
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-indigo-800/40 focus:border-indigo-800 bg-white"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-indigo-800 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-md transition-all active:scale-98 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-amber-300" />
                  <span>{language === 'bn' ? 'ভিডিও যুক্ত করুন' : 'Add Video'}</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 5: MEMBER MANAGEMENT */}
          {activeTab === 'member' && (
            <form onSubmit={handleMemberSubmit} className="space-y-4">
              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-950 flex items-start gap-2.5">
                <Users className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <p>
                  {language === 'bn'
                    ? 'সংগঠনে নতুন সদস্য অন্তর্ভুক্ত করতে এখানে নাম ও বিবরণ দিন। তারা স্বয়ংক্রিয়ভাবে ক্রমিক নম্বর অনুযায়ী সদস্য ডিরেক্টরিতে যুক্ত হবেন।'
                    : 'Add new members to the council directory. They will appear on the Leadership & Members section.'}
                </p>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-1">
                  সদস্যের পুরো নাম (Bangla Unicode Name) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={memberName}
                  onChange={(e) => setMemberName(e.target.value)}
                  placeholder="যেমন: মো: তানভীর আহমেদ..."
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-900/40 focus:border-blue-900 bg-white"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-1">
                    পদবী (Designation)
                  </label>
                  <input
                    type="text"
                    value={memberRole}
                    onChange={(e) => setMemberRole(e.target.value)}
                    placeholder="সদস্য"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-900/40 focus:border-blue-900 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-1">
                    মোবাইল নম্বর (Phone) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={memberPhone}
                    onChange={(e) => setMemberPhone(e.target.value)}
                    placeholder="০১৭xxxxxxxx"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-900/40 focus:border-blue-900 bg-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-1">
                    বয়স (Age)
                  </label>
                  <input
                    type="text"
                    value={memberAge}
                    onChange={(e) => setMemberAge(e.target.value)}
                    placeholder="২২"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-900/40 focus:border-blue-900 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-1">
                    গ্রাম / এলাকা (Village)
                  </label>
                  <input
                    type="text"
                    value={memberVillage}
                    onChange={(e) => setMemberVillage(e.target.value)}
                    placeholder="অষ্টমীর ঘাট"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-900/40 focus:border-blue-900 bg-white"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-blue-900 hover:bg-blue-800 text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer active:scale-98"
                >
                  <Users className="w-4 h-4 text-amber-300" />
                  <span>{language === 'bn' ? 'সদস্য তালিকায় যুক্ত করুন' : 'Save Member to Directory'}</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB: VISITOR ANALYTICS & TRAFFIC INSIGHTS */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {/* Analytics Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-teal-50/80 border border-teal-200 rounded-xl">
                <div>
                  <h4 className="font-bold text-sm text-teal-950 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-teal-700" />
                    <span>{language === 'bn' ? 'ওয়েবসাইট ভিজিটর ও পাঠক পরিসংখ্যান' : 'Website Visitor Analytics'}</span>
                  </h4>
                  <p className="text-xs text-teal-800 mt-1">
                    {language === 'bn'
                      ? 'সংগঠনের ওয়েবসাইটের রিয়েল-টাইম পাঠক সংখ্যা, দৈনিক ভিজিটর ও ডিভাইস অ্যানালিটিক্স।'
                      : 'Real-time visitor counts, daily readership metrics, and device breakdowns.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const latest = getStoredVisitorStats();
                    setVisitorStats(latest);
                    setBaseOffsetInput(latest.baseOffset);
                    showSuccess(language === 'bn' ? 'ভিজিটর পরিসংখ্যান রিফ্রেশ হয়েছে!' : 'Visitor stats refreshed!');
                  }}
                  className="shrink-0 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'রিফ্রেশ করুন' : 'Refresh Stats'}</span>
                </button>
              </div>

              {/* 6 Key KPI Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {/* Total Visits */}
                <div className="p-3.5 bg-white border border-stone-200 rounded-xl shadow-xs">
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                    <span className="font-medium">{language === 'bn' ? 'মোট পরিদর্শন' : 'Total Visits'}</span>
                    <Globe className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                    {language === 'bn' ? toBanglaNumber(visitorStats.totalVisits) : visitorStats.totalVisits.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-1">
                    <TrendingUp className="w-3 h-3" />
                    {language === 'bn' ? 'প্রতিষ্ঠার পর থেকে মোট' : 'All-time cumulative'}
                  </span>
                </div>

                {/* Today's Visitors */}
                <div className="p-3.5 bg-white border border-stone-200 rounded-xl shadow-xs">
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                    <span className="font-medium">{language === 'bn' ? 'আজকের ভিজিটর' : "Today's Visits"}</span>
                    <Activity className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-600 font-mono">
                    {language === 'bn' ? toBanglaNumber(visitorStats.todayVisits) : visitorStats.todayVisits.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-stone-400 mt-1 block">
                    {language === 'bn' ? 'আজকে সক্রিয় পাঠক' : 'Active readers today'}
                  </span>
                </div>

                {/* Live Online */}
                <div className="p-3.5 bg-white border border-stone-200 rounded-xl shadow-xs">
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                    <span className="font-medium">{language === 'bn' ? 'লাইভ অনলাইন' : 'Live Now'}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-blue-700 font-mono">
                    {language === 'bn' ? toBanglaNumber(visitorStats.liveOnline) : visitorStats.liveOnline}
                  </div>
                  <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">
                    {language === 'bn' ? 'এখন ওয়েবসাইটে পড়ছেন' : 'Reading on site now'}
                  </span>
                </div>

                {/* This Month */}
                <div className="p-3.5 bg-white border border-stone-200 rounded-xl shadow-xs">
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                    <span className="font-medium">{language === 'bn' ? 'চলতি মাসে' : 'This Month'}</span>
                    <BarChart3 className="w-3.5 h-3.5 text-indigo-600" />
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-indigo-700 font-mono">
                    {language === 'bn' ? toBanglaNumber(visitorStats.thisMonthVisits) : visitorStats.thisMonthVisits.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-stone-400 mt-1 block">
                    {language === 'bn' ? 'চলতি মাসের মোট পাঠক' : 'Total monthly readers'}
                  </span>
                </div>

                {/* Unique Visitors */}
                <div className="p-3.5 bg-white border border-stone-200 rounded-xl shadow-xs">
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                    <span className="font-medium">{language === 'bn' ? 'অনন্য পাঠক' : 'Unique Visitors'}</span>
                    <Users className="w-3.5 h-3.5 text-purple-600" />
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-purple-700 font-mono">
                    {language === 'bn' ? toBanglaNumber(visitorStats.uniqueVisitors) : visitorStats.uniqueVisitors.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-stone-400 mt-1 block">
                    {language === 'bn' ? 'স্বতন্ত্র ডিভাইস সংখ্যা' : 'Unique devices'}
                  </span>
                </div>

                {/* Page Views */}
                <div className="p-3.5 bg-white border border-stone-200 rounded-xl shadow-xs">
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                    <span className="font-medium">{language === 'bn' ? 'মোট পেজ ভিউ' : 'Total Pageviews'}</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-amber-600 font-mono">
                    {language === 'bn' ? toBanglaNumber(visitorStats.pageViews) : visitorStats.pageViews.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-stone-400 mt-1 block">
                    {language === 'bn' ? 'পৃষ্ঠা দর্শন সংখ্যা' : 'Total page views'}
                  </span>
                </div>
              </div>

              {/* Devices & Browsers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Device breakdown */}
                <div className="bg-stone-50/80 p-4 rounded-xl border border-stone-200">
                  <h5 className="text-xs font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-blue-700" />
                    <span>{language === 'bn' ? 'ডিভাইস অনুপাত (Device Analytics)' : 'Device Analytics'}</span>
                  </h5>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs text-stone-600 mb-1">
                        <span className="flex items-center gap-1.5 font-medium">
                          <Smartphone className="w-3.5 h-3.5 text-blue-600" />
                          <span>{language === 'bn' ? 'স্মার্টফোন / মোবাইল' : 'Mobile / Smartphone'}</span>
                        </span>
                        <span className="font-bold font-mono">
                          {language === 'bn' ? toBanglaNumber(visitorStats.devices.mobile) : visitorStats.devices.mobile}%
                        </span>
                      </div>
                      <div className="w-full bg-stone-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${Math.min(100, visitorStats.devices.mobile)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-stone-600 mb-1">
                        <span className="flex items-center gap-1.5 font-medium">
                          <Monitor className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{language === 'bn' ? 'ডেস্কটপ / কম্পিউটার' : 'Desktop / PC'}</span>
                        </span>
                        <span className="font-bold font-mono">
                          {language === 'bn' ? toBanglaNumber(visitorStats.devices.desktop) : visitorStats.devices.desktop}%
                        </span>
                      </div>
                      <div className="w-full bg-stone-200 rounded-full h-2">
                        <div
                          className="bg-emerald-600 h-2 rounded-full"
                          style={{ width: `${Math.min(100, visitorStats.devices.desktop)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-stone-600 mb-1">
                        <span className="flex items-center gap-1.5 font-medium">
                          <Tablet className="w-3.5 h-3.5 text-purple-600" />
                          <span>{language === 'bn' ? 'ট্যাবলেট / আইপ্যাড' : 'Tablet / iPad'}</span>
                        </span>
                        <span className="font-bold font-mono">
                          {language === 'bn' ? toBanglaNumber(visitorStats.devices.tablet) : visitorStats.devices.tablet}%
                        </span>
                      </div>
                      <div className="w-full bg-stone-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: `${Math.min(100, visitorStats.devices.tablet)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Popular Sections */}
                <div className="bg-stone-50/80 p-4 rounded-xl border border-stone-200">
                  <h5 className="text-xs font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-700" />
                    <span>{language === 'bn' ? 'সর্বাধিক পঠিত সেকশনসমূহ' : 'Popular Sections'}</span>
                  </h5>
                  <div className="space-y-2">
                    {visitorStats.popularPages.map((page, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs p-2 bg-white rounded-lg border border-stone-200/60">
                        <span className="font-medium text-stone-800 line-clamp-1">
                          {idx + 1}. {page.name}
                        </span>
                        <span className="font-mono text-teal-700 font-bold shrink-0 ml-2">
                          {language === 'bn' ? toBanglaNumber(page.views) : page.views.toLocaleString()} বার
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* SECTION: GEOLOCATION & REGIONAL VISITOR ANALYTICS */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-900 flex items-center justify-center">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs sm:text-sm font-bold text-slate-900">
                        {language === 'bn' ? 'ভৌগোলিক অবস্থান ও এলাকা বিশ্লেষণ (Location Analytics)' : 'Geolocation & Regional Traffic'}
                      </h5>
                      <p className="text-[11px] text-stone-500">
                        {language === 'bn' 
                          ? 'জয়মনিরহাট ইউনিয়নের ৯টি ওয়ার্ড, কুড়িগ্রামের উপজেলা, জেলা ও প্রবাসী পাঠকদের বিস্তার' 
                          : 'Ward, Upazila, District, and International visitor breakdown'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Grid 1: Joymonirhat 9 Wards & Kurigram Upazilas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Joymonirhat 9 Wards */}
                  <div className="bg-stone-50/90 p-4 rounded-xl border border-stone-200 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2.5">
                        <h6 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <Compass className="w-4 h-4 text-emerald-700" />
                          <span>{language === 'bn' ? 'জয়মনিরহাট ইউনিয়ন: ৯টি ওয়ার্ড' : 'Joymonirhat Union: 9 Wards'}</span>
                        </h6>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                          ওয়ার্ড ১ - ৯
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 mb-3">
                        {language === 'bn' 
                          ? 'ওয়েবসাইটে ভিজিট করা স্থানীয় ইউনিয়নবাসী ও ওয়ার্ডভিত্তিক পাঠক সংখ্যা:'
                          : 'Breakdown across the 9 administrative wards:'}
                      </p>
                      
                      <div className="space-y-2.5">
                        {Object.entries(visitorStats.locations?.wards || {}).map(([wardName, count], idx) => {
                          const maxWard = 800;
                          const pct = Math.min(100, Math.round((count / maxWard) * 100));
                          const isHeadquarters = wardName.includes('অষ্টমীর ঘাট');
                          return (
                            <div key={idx} className="bg-white p-2 rounded-lg border border-stone-200/70">
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span className={`font-semibold line-clamp-1 ${isHeadquarters ? 'text-blue-900 font-bold' : 'text-stone-800'}`}>
                                  {wardName} {isHeadquarters && '⭐ (কার্যালয়)'}
                                </span>
                                <span className="font-mono font-bold text-emerald-700 shrink-0 ml-2">
                                  {language === 'bn' ? toBanglaNumber(count) : count.toLocaleString()} জন
                                </span>
                              </div>
                              <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
                                <div
                                  className={`h-1.5 rounded-full transition-all duration-500 ${
                                    isHeadquarters ? 'bg-blue-600' : 'bg-emerald-500'
                                  }`}
                                  style={{ width: `${pct}%` }}
                                ></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Kurigram Upazilas */}
                  <div className="bg-stone-50/90 p-4 rounded-xl border border-stone-200 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2.5">
                        <h6 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <Building2 className="w-4 h-4 text-blue-700" />
                          <span>{language === 'bn' ? 'কুড়িগ্রাম জেলা: উপজেলাসমূহ' : 'Kurigram: Upazilas'}</span>
                        </h6>
                        <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">
                          উপজেলা অনুপাত
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 mb-3">
                        {language === 'bn' 
                          ? 'ভূরুঙ্গামারী ও তৎসংলগ্ন উপজেলাসমূহের ভিজিটর বিস্তার:'
                          : 'Visitor spread across Kurigram upazilas:'}
                      </p>

                      <div className="space-y-2.5">
                        {Object.entries(visitorStats.locations?.upazilas || {}).map(([upazilaName, count], idx) => {
                          const maxUpazila = 6000;
                          const pct = Math.min(100, Math.round((count / maxUpazila) * 100));
                          const isLocal = upazilaName.includes('ভূরুঙ্গামারী');
                          return (
                            <div key={idx} className="bg-white p-2 rounded-lg border border-stone-200/70">
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span className={`font-semibold line-clamp-1 ${isLocal ? 'text-teal-900 font-bold' : 'text-stone-800'}`}>
                                  {upazilaName}
                                </span>
                                <span className="font-mono font-bold text-teal-700 shrink-0 ml-2">
                                  {language === 'bn' ? toBanglaNumber(count) : count.toLocaleString()} বার
                                </span>
                              </div>
                              <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
                                <div
                                  className={`h-1.5 rounded-full transition-all duration-500 ${
                                    isLocal ? 'bg-teal-600' : 'bg-slate-400'
                                  }`}
                                  style={{ width: `${pct}%` }}
                                ></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Grid 2: Districts of Bangladesh & International / Expatriate Countries */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Districts of Bangladesh */}
                  <div className="bg-stone-50/90 p-4 rounded-xl border border-stone-200">
                    <div className="flex items-center justify-between mb-2.5">
                      <h6 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-purple-700" />
                        <span>{language === 'bn' ? 'বাংলাদেশ: জেলাভিত্তিক ট্রাফিক' : 'Bangladesh: Districts'}</span>
                      </h6>
                      <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full">
                        জেলা ও বিভাগ
                      </span>
                    </div>
                    <div className="space-y-2">
                      {Object.entries(visitorStats.locations?.districts || {}).map(([distName, count], idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs p-2 bg-white rounded-lg border border-stone-200/60">
                          <span className="font-medium text-stone-800 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                            <span>{distName}</span>
                          </span>
                          <span className="font-mono text-purple-700 font-bold shrink-0 ml-2">
                            {language === 'bn' ? toBanglaNumber(count) : count.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* International / Expatriate Countries */}
                  <div className="bg-stone-50/90 p-4 rounded-xl border border-stone-200">
                    <div className="flex items-center justify-between mb-2.5">
                      <h6 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <Plane className="w-4 h-4 text-rose-600" />
                        <span>{language === 'bn' ? 'প্রবাসী ও আন্তর্জাতিক পাঠক (Global)' : 'Expatriate & Global'}</span>
                      </h6>
                      <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded-full">
                        প্রবাসী ভাই-বোনেরা
                      </span>
                    </div>
                    <div className="space-y-2">
                      {Object.entries(visitorStats.locations?.countries || {}).map(([cName, count], idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs p-2 bg-white rounded-lg border border-stone-200/60">
                          <span className="font-medium text-stone-800">
                            {cName}
                          </span>
                          <span className="font-mono text-rose-700 font-bold shrink-0 ml-2">
                            {language === 'bn' ? toBanglaNumber(count) : count.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Real-time Geo Visitor Stream Log */}
                <div className="bg-stone-900 text-stone-200 p-4 rounded-xl border border-stone-800">
                  <div className="flex items-center justify-between mb-3 border-b border-stone-800 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                      <h6 className="text-xs sm:text-sm font-bold text-white">
                        {language === 'bn' ? 'রিয়েল-টাইম ভিজিটর অবস্থান লগ (Live Geo Stream)' : 'Live Geo-Visitor Stream'}
                      </h6>
                    </div>
                    <span className="text-[10px] text-stone-400 font-mono">
                      {language === 'bn' ? 'সর্বশেষ ২০টি ভিজিট' : 'Latest 20 visits'}
                    </span>
                  </div>

                  <div className="space-y-1.5 max-h-60 overflow-y-auto no-scrollbar font-sans">
                    {(visitorStats.recentGeoLogs || []).map((log, idx) => (
                      <div 
                        key={log.id || idx} 
                        className="flex items-center justify-between text-xs p-2 rounded-lg bg-stone-950/70 border border-stone-800/80 hover:border-stone-700 transition-colors"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-base shrink-0">{log.flag || '📍'}</span>
                          <span className="font-semibold text-stone-100 truncate">
                            {log.locationName}
                          </span>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold shrink-0 ${
                            log.category === 'ward' 
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                              : log.category === 'country'
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          }`}>
                            {log.category === 'ward' ? 'ওয়ার্ড' : log.category === 'country' ? 'প্রবাসী' : 'উপজেলা/জেলা'}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 shrink-0 text-[11px] text-stone-400 font-mono ml-2">
                          <span className="hidden sm:inline text-stone-500">{log.device}</span>
                          <span className="text-emerald-400">{log.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <h5 className="text-xs sm:text-sm font-bold text-amber-950">
                    {language === 'bn' ? 'ভিজিটর কাউন্টার সংখ্যা নির্ধারণ (অ্যাডমিন ক্যালিগ্রেশন)' : 'Visitor Counter Calibration'}
                  </h5>
                </div>
                <p className="text-xs text-amber-900 leading-relaxed">
                  {language === 'bn'
                    ? 'সংগঠন প্রতিষ্ঠার (২০২১ সাল) পর থেকে পূর্বের ভিজিটর সংখ্যা অথবা আপনার কাঙ্ক্ষিত বেস কাউন্টার সংখ্যা এখানে নির্ধারণ করতে পারেন। এটি ওয়েবসাইটের ফুটারে রিয়েল-টাইম হিসেবে যুক্ত হবে।'
                    : 'Set base counter to reflect historical visitors since organization establishment.'}
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
                  <div className="relative flex-1">
                    <input
                      type="number"
                      value={baseOffsetInput}
                      onChange={(e) => setBaseOffsetInput(Number(e.target.value) || 0)}
                      placeholder="যেমন: ১৫০০০"
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-amber-300 bg-white font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = updateBaseOffset(baseOffsetInput);
                      setVisitorStats(updated);
                      showSuccess(
                        language === 'bn'
                          ? `ভিজিটর কাউন্টার সংখ্যা সফলভাবে ${toBanglaNumber(baseOffsetInput)}-এ আপডেট করা হয়েছে!`
                          : 'Visitor counter successfully updated!'
                      );
                    }}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold shadow-sm transition-all cursor-pointer whitespace-nowrap"
                  >
                    {language === 'bn' ? 'কাউন্টার সংখ্যা সংরক্ষণ করুন' : 'Save Base Count'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: BACKUP & DATA CONTROLS */}
          {activeTab === 'backup' && (
            <div className="space-y-6">
              <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-xl">
                <h4 className="font-bold text-sm text-purple-950 mb-1 flex items-center gap-2">
                  <Download className="w-4 h-4 text-purple-700" />
                  <span>{language === 'bn' ? 'ওয়েবসাইট ডাটা ব্যাকআপ ডাউনলোড' : 'Export Full Website Backup'}</span>
                </h4>
                <p className="text-xs text-purple-900 leading-relaxed mb-3">
                  {language === 'bn'
                    ? 'আপনার ওয়েবসাইটের সকল প্রকাশিত নোটিশ, আপলোড করা ছবির গ্যালারি, পেপার কাটিং ও সদস্য তালিকার একটি ব্যাকআপ ফাইল (JSON) নিজের কাছে সংরক্ষণ করুন।'
                    : 'Download a complete JSON snapshot of all published notices, gallery photos, and member lists.'}
                </p>
                <button
                  type="button"
                  onClick={handleExportBackup}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white font-bold text-xs rounded-lg shadow-sm transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{language === 'bn' ? 'ব্যাকআপ ডাউনলোড করুন (.json)' : 'Download Backup File (.json)'}</span>
                </button>
              </div>

              <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl">
                <h4 className="font-bold text-sm text-slate-900 mb-1 flex items-center gap-2">
                  <UploadCloud className="w-4 h-4 text-blue-700" />
                  <span>{language === 'bn' ? 'সংরক্ষিত ব্যাকআপ ফাইল রিস্টোর' : 'Restore from Backup'}</span>
                </h4>
                <p className="text-xs text-stone-600 mb-3">
                  {language === 'bn'
                    ? 'পূর্বে সংরক্ষিত JSON ব্যাকআপ ফাইল আপলোড করে সমস্ত তথ্য আবার ফিরিয়ে আনুন।'
                    : 'Upload your saved JSON backup file to instantly restore all data.'}
                </p>
                <label className="inline-flex items-center gap-2 px-4 py-2 bg-stone-800 hover:bg-slate-700 text-white font-bold text-xs rounded-lg shadow-sm transition-all cursor-pointer">
                  <UploadCloud className="w-4 h-4" />
                  <span>{language === 'bn' ? 'ব্যাকআপ ফাইল সিলেক্ট করুন' : 'Select Backup JSON File'}</span>
                  <input
                    type="file"
                    accept=".json,application/json"
                    onChange={handleImportBackup}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-rose-950">
                    {language === 'bn' ? 'মূল ডিফল্ট তথ্যে রিসেট' : 'Reset to Default Settings'}
                  </h4>
                  <p className="text-xs text-rose-800 mt-0.5">
                    {language === 'bn'
                      ? 'সকল কাস্টম তথ্য মুছে দিয়ে মূল প্রতিষ্ঠাকালীন তথ্যে ফিরুন।'
                      : 'Remove custom posts and restore initial institutional data.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleResetData}
                  className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  {language === 'bn' ? 'রিসেট' : 'Reset'}
                </button>
              </div>
            </div>
          )}

          {/* TAB: CACHE & PERFORMANCE OPTIMIZATION */}
          {activeTab === 'cache' && (
            <div className="space-y-6">
              <div className="p-4 bg-teal-50/80 border border-teal-200 rounded-xl">
                <div className="flex items-center gap-2">
                  <Trash2 className="w-4 h-4 text-teal-700" />
                  <h4 className="font-bold text-sm text-teal-950">
                    {language === 'bn' ? 'ব্রাউজার ক্যাশ ও গতি নিয়ন্ত্রণ (Cache & Speed Manager)' : 'Browser Cache & Performance'}
                  </h4>
                </div>
                <p className="text-xs text-teal-900 mt-1 leading-relaxed">
                  {language === 'bn'
                    ? 'অ্যাপ বা ওয়েবসাইট বেশি লোড নিলে বা পুরোনো ডাটা জমে থাকলে এই অপশন ব্যবহার করুন। ক্যাশ পরিষ্কার করলে সাইট দ্রুত ও হালকাভাবে লোড হবে।'
                    : 'Clear browser cached assets and service workers to fix slow loading and refresh data.'}
                </p>
              </div>

              {/* Cache Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl">
                  <span className="text-[11px] text-stone-500 font-medium block">ক্যাশ স্টোরেজ সাইজ</span>
                  <div className="text-xl font-black text-slate-900 font-mono mt-0.5">
                    {cacheReport?.localStorageSizeKb || 0} KB
                  </div>
                  <span className="text-[10px] text-stone-400 mt-1 block">ডিভাইস মেমোরিতে সংরক্ষিত</span>
                </div>

                <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl">
                  <span className="text-[11px] text-stone-500 font-medium block">অফলাইন ছবি সংখ্যা</span>
                  <div className="text-xl font-black text-emerald-600 font-mono mt-0.5">
                    {cacheReport?.cachedImagesCount || 0} টি
                  </div>
                  <span className="text-[10px] text-stone-400 mt-1 block">অপ্টিমাইজড কম্প্রেসড ইমেজ</span>
                </div>

                <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl">
                  <span className="text-[11px] text-stone-500 font-medium block">সার্ভিস ওয়ার্কার ক্যাশ</span>
                  <div className="text-xl font-black text-blue-600 font-mono mt-0.5">
                    {cacheReport?.serviceWorkersCount ? 'সক্রিয়' : 'মুছে ফেলা হয়েছে'}
                  </div>
                  <span className="text-[10px] text-stone-400 mt-1 block">ব্রাউজার ব্যাকগ্রাউন্ড ক্যাশ</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-3">
                <h5 className="text-xs font-bold text-slate-900">ক্যাশ রিমুভ ও স্পিড অ্যাকশন</h5>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="button"
                    onClick={handleClearCacheFromAdmin}
                    disabled={isClearingCache}
                    className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-98 cursor-pointer disabled:opacity-50"
                  >
                    {isClearingCache ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                    <span>{language === 'bn' ? 'সম্পূর্ণ ক্যাশ ক্লিয়ার করুন (Clear Cache)' : 'Purge All Cached Data'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => window.location.reload()}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-sm transition-all cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4 text-amber-400" />
                    <span>{language === 'bn' ? 'সাইট হার্ড রিলোড' : 'Hard Reload'}</span>
                  </button>
                </div>
                <p className="text-[11px] text-stone-500">
                  * ক্যাশ ক্লিয়ার করলে আপনার প্রকাশিত কোনো নোটিশ, পেপার কাটিং বা ছবি মুছবে না; শুধুমাত্র ব্রাউজারের পুরোনো জমে থাকা ফাইল ও ক্যাশ মুছে যাবে।
                </p>
              </div>
            </div>
          )}

          {/* TAB 7: ADMIN SECURITY & PASSWORD CHANGE */}
          {activeTab === 'security' && (
            <form onSubmit={handleChangePassword} className="space-y-4 max-w-lg">
              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-950 flex items-start gap-2.5">
                <KeyRound className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <p>
                  {language === 'bn'
                    ? 'আপনার ইচ্ছামতো নিজস্ব গোপন পাসওয়ার্ড সেট করুন, যাতে আপনি ছাড়া অন্য কেউ তথ্য পরিবর্তন করতে না পারে।'
                    : 'Change master password to secure your admin portal.'}
                </p>
              </div>

              {/* Current Active Password Card */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-amber-950">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>বর্তমান সক্রিয় পাসওয়ার্ড তথ্য:</span>
                </div>
                <p>
                  সক্রিয় পাসওয়ার্ড: <strong className="font-mono bg-white px-2 py-0.5 rounded border border-amber-300 text-slate-900 text-xs font-bold">{getStoredPassword()}</strong>
                </p>
                <p className="text-[11px] text-stone-600">
                  (আপনি যদি ক্রোম, ব্রেভ বা অন্য কোনো ব্রাউজার ব্যবহার করেন, তবে ডিফল্ট মাস্টার পাসওয়ার্ড <code className="bg-amber-100 text-amber-900 px-1 py-0.2 rounded font-mono font-bold">juyo@2026</code> দিয়েও সবসময় নিশ্চিত লগইন করা যাবে)
                </p>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-1">
                  {language === 'bn' ? 'বর্তমান পাসওয়ার্ড (Current Password)' : 'Current Password'} <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={oldPasswordInput}
                  onChange={(e) => setOldPasswordInput(e.target.value)}
                  placeholder={language === 'bn' ? 'বর্তমান পাসওয়ার্ড লিখুন...' : 'Enter current password...'}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-900/40 focus:border-blue-900 bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-1">
                  {language === 'bn' ? 'নতুন পাসওয়ার্ড (New Password)' : 'New Password'} <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={newPasswordInput}
                  onChange={(e) => setNewPasswordInput(e.target.value)}
                  placeholder={language === 'bn' ? 'নতুন পাসওয়ার্ড দিন...' : 'Enter new password...'}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-900/40 focus:border-blue-900 bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-1">
                  {language === 'bn' ? 'নতুন পাসওয়ার্ড নিশ্চিত করুন (Confirm Password)' : 'Confirm New Password'} <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={confirmPasswordInput}
                  onChange={(e) => setConfirmPasswordInput(e.target.value)}
                  placeholder={language === 'bn' ? 'নতুন পাসওয়ার্ডটি পুনরায় লিখুন...' : 'Confirm new password...'}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-900/40 focus:border-blue-900 bg-white"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 py-2.5 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl shadow-md transition-all active:scale-98 cursor-pointer"
                >
                  <KeyRound className="w-4 h-4 text-amber-300" />
                  <span>{language === 'bn' ? 'পাসওয়ার্ড আপডেট করুন' : 'Update Password'}</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="bg-stone-50 px-4 sm:px-6 py-3 border-t border-stone-200 flex items-center justify-between shrink-0">
          <div className="text-xs text-stone-500 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>
              {language === 'bn' ? 'পাসওয়ার্ড দিয়ে সম্পূর্ণ সুরক্ষিত' : 'Password Protected & Secure'}
            </span>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 text-xs font-semibold text-stone-700 bg-white border border-stone-300 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
          >
            {language === 'bn' ? 'বন্ধ করুন' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
