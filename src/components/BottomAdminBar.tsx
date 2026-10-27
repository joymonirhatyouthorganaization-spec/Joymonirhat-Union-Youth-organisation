/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Unlock, 
  Eye, 
  EyeOff, 
  KeyRound, 
  BarChart3, 
  FileText, 
  Camera, 
  Newspaper, 
  Sparkles, 
  RefreshCw, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  LogOut 
} from 'lucide-react';
import { clearWebsiteCache, getCacheReport, CacheReport } from '../utils/cacheManager';
import { Language } from '../types';

interface BottomAdminBarProps {
  language: Language;
  onOpenAdminTab: (tab: 'analytics' | 'notice' | 'gallery' | 'press' | 'video' | 'member' | 'backup' | 'security' | 'cache') => void;
}

const STORAGE_KEYS = {
  MASTER_PASSWORD: 'juyo_admin_master_password_v1',
  AUTH_SESSION: 'juyo_admin_authenticated_session_v1',
};

const DEFAULT_PASSWORD = 'juyo@2026';

export const BottomAdminBar: React.FC<BottomAdminBarProps> = ({ language, onOpenAdminTab }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isClearingCache, setIsClearingCache] = useState(false);
  const [cacheReport, setCacheReport] = useState<CacheReport | null>(null);

  useEffect(() => {
    try {
      const isAuth = sessionStorage.getItem(STORAGE_KEYS.AUTH_SESSION) === 'true';
      setIsAuthenticated(isAuth);
      getCacheReport().then(setCacheReport);
    } catch {}
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPass = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEYS.MASTER_PASSWORD) : null;
    const trimmed = passwordInput.trim();

    // Check if matches stored custom password OR default master password
    if (trimmed === DEFAULT_PASSWORD || (storedPass && trimmed === storedPass)) {
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem(STORAGE_KEYS.AUTH_SESSION, 'true');
      } catch {}
      setPasswordInput('');
      setErrorMessage(null);
      setSuccessMessage('অ্যাডমিন লগইন সফল! নিচে থেকে যেকোনো অপশন সরাসরি পরিচালনা করুন।');
      setTimeout(() => setSuccessMessage(null), 4000);
    } else {
      setErrorMessage('ভুল পাসওয়ার্ড! অনুগ্রহ করে সঠিক পাসওয়ার্ড লিখুন (মাস্টার পাসওয়ার্ড: juyo@2026)');
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
    } catch {}
    setSuccessMessage('অ্যাডমিন সেশন সফলভাবে লগআউট করা হয়েছে।');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleClearCache = async () => {
    setIsClearingCache(true);
    const res = await clearWebsiteCache(true);
    setIsClearingCache(false);
    if (res.success) {
      setSuccessMessage('ক্যাশ মেমোরি ক্লিয়ার হয়েছে! ওয়েবসাইট দ্রুত ফ্রেশ রিলোড হবে...');
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    } else {
      setErrorMessage(res.message);
    }
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-6 text-stone-200 shadow-xl my-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center font-bold shadow-md shrink-0">
            {isAuthenticated ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-extrabold text-sm sm:text-base text-white">
                {language === 'bn' ? 'অ্যাডমিন দ্রুত প্রবেশ ও ট্রাফিক নিয়ন্ত্রণ' : 'Admin Quick Access & Traffic Control'}
              </h4>
              {isAuthenticated && (
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>লগইন সক্রিয়</span>
                </span>
              )}
            </div>
            <p className="text-xs text-stone-400 mt-0.5">
              {language === 'bn' 
                ? 'ওয়েবসাইটের নিচ থেকেই সরাসরি পাসওয়ার্ড দিয়ে ঢুকুন, ভিজিটর ও এলাকা ট্রাফিক দেখুন এবং ক্যাশ পরিষ্কার করুন।' 
                : 'Directly login from bottom of page, inspect visitors, and manage website cache.'}
            </p>
          </div>
        </div>

        {/* Cache status badge & fast clean */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleClearCache}
            disabled={isClearingCache}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-stone-300 hover:text-white rounded-lg text-xs font-semibold border border-slate-700 transition-all cursor-pointer disabled:opacity-50"
            title="ব্রাউজার ক্যাশ ক্লিয়ার করুন ও দ্রুত লোড নিশ্চিত করুন"
          >
            {isClearingCache ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
            ) : (
              <Trash2 className="w-3.5 h-3.5 text-rose-400" />
            )}
            <span>{language === 'bn' ? 'ক্যাশ ক্লিয়ার' : 'Clear Cache'}</span>
          </button>

          {isAuthenticated && (
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-950/60 hover:bg-rose-900 text-rose-300 hover:text-white rounded-lg text-xs font-semibold border border-rose-800/50 transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'লগআউট' : 'Logout'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div className="mt-3 p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="mt-3 p-3 bg-rose-950/60 border border-rose-500/40 rounded-xl text-xs text-rose-300 flex items-center gap-2 animate-in fade-in duration-200">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* VIEW A: IF NOT AUTHENTICATED -> DIRECT LOGIN FORM RIGHT HERE */}
      {!isAuthenticated ? (
        <div className="mt-4 pt-1">
          <form onSubmit={handleLogin} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <div className="relative flex-1">
              <input
                type={showPassword ? 'text' : 'password'}
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                placeholder={language === 'bn' ? 'অ্যাডমিন পাসওয়ার্ড লিখুন (যেমন: juyo@2026)...' : 'Enter admin password...'}
                className="w-full pl-9 pr-10 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-400 transition-all"
                required
              />
              <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white p-1 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-98 cursor-pointer shrink-0"
            >
              <Unlock className="w-4 h-4" />
              <span>{language === 'bn' ? 'লগইন করুন / আনলক' : 'Unlock Admin'}</span>
            </button>
          </form>

          {/* Quick tips & password compatibility notice */}
          <div className="mt-3 flex flex-wrap items-center justify-between text-[11px] text-stone-400 gap-2">
            <div className="flex items-center gap-1.5 text-amber-300/90">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>
                {language === 'bn' 
                  ? 'প্রাথমিক মাস্টার পাসওয়ার্ড: ' 
                  : 'Master Password: '}
                <code className="bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded font-mono font-bold">juyo@2026</code>
              </span>
            </div>
            <div className="text-stone-400">
              {language === 'bn'
                ? '(Chrome, Brave যেকোনো ব্রাউজার থেকেই juyo@2026 দিয়ে লগইন করা যাবে)'
                : '(Universal access via master password across all browsers)'}
            </div>
          </div>
        </div>
      ) : (
        /* VIEW B: IF AUTHENTICATED -> INSTANT DIRECT ACTION BUTTONS */
        <div className="mt-4 pt-1 space-y-3">
          <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl flex items-center justify-between flex-wrap gap-2 text-xs">
            <span className="text-emerald-300 font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>সংগঠনের অ্যাডমিন প্যানেল সক্রিয়। নিচে থেকে সরাসরি যে অংশে যেতে চান ক্লিক করুন:</span>
            </span>
            <span className="text-stone-400 text-[11px]">
              ক্যাশ সাইজ: <strong className="text-white font-mono">{cacheReport?.localStorageSizeKb || 0} KB</strong>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {/* 1. VISITOR & TRAFFIC ANALYTICS BUTTON (PRIMARY) */}
            <button
              type="button"
              onClick={() => onOpenAdminTab('analytics')}
              className="p-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold text-xs sm:text-sm flex flex-col items-center justify-center gap-1.5 shadow-lg border border-teal-400/40 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <div className="flex items-center gap-1">
                <BarChart3 className="w-4 h-4" />
                <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping"></span>
              </div>
              <span className="text-center">{language === 'bn' ? 'ভিজিটর ও এলাকা ট্রাফিক' : 'Visitor Analytics'}</span>
              <span className="text-[10px] text-teal-100 font-normal">৯টি ওয়ার্ড ও জেলা/দেশ</span>
            </button>

            {/* 2. Notice Publisher */}
            <button
              type="button"
              onClick={() => onOpenAdminTab('notice')}
              className="p-3 rounded-xl bg-blue-900/80 hover:bg-blue-800 text-white font-semibold text-xs sm:text-sm flex flex-col items-center justify-center gap-1.5 border border-blue-700 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <FileText className="w-4 h-4 text-blue-300" />
              <span className="text-center">{language === 'bn' ? 'বিজ্ঞপ্তি প্রকাশ করুন' : 'Post Notice'}</span>
              <span className="text-[10px] text-blue-300 font-normal">নোটিশ বোর্ড লাইভ</span>
            </button>

            {/* 3. Program Photo Upload */}
            <button
              type="button"
              onClick={() => onOpenAdminTab('gallery')}
              className="p-3 rounded-xl bg-emerald-900/80 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm flex flex-col items-center justify-center gap-1.5 border border-emerald-700 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Camera className="w-4 h-4 text-emerald-300" />
              <span className="text-center">{language === 'bn' ? 'প্রোগ্রামের ছবি' : 'Upload Photos'}</span>
              <span className="text-[10px] text-emerald-300 font-normal">গ্যালারি আপডেট</span>
            </button>

            {/* 4. Press / Newspaper Clippings */}
            <button
              type="button"
              onClick={() => onOpenAdminTab('press')}
              className="p-3 rounded-xl bg-rose-900/80 hover:bg-rose-800 text-white font-semibold text-xs sm:text-sm flex flex-col items-center justify-center gap-1.5 border border-rose-700 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Newspaper className="w-4 h-4 text-rose-300" />
              <span className="text-center">{language === 'bn' ? 'পেপার কাটিং' : 'Press Clippings'}</span>
              <span className="text-[10px] text-rose-300 font-normal">পত্রিকার খবর</span>
            </button>
          </div>

          {/* Secondary Admin tools row */}
          <div className="flex flex-wrap items-center justify-between pt-2 border-t border-slate-800/60 text-xs text-stone-400 gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => onOpenAdminTab('cache')}
                className="hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800"
              >
                <RefreshCw className="w-3 h-3 text-amber-400" />
                <span>ক্যাশ ও স্পিড ম্যানেজার</span>
              </button>

              <button
                type="button"
                onClick={() => onOpenAdminTab('security')}
                className="hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800"
              >
                <KeyRound className="w-3 h-3 text-stone-300" />
                <span>পাসওয়ার্ড পরিবর্তন</span>
              </button>

              <button
                type="button"
                onClick={() => onOpenAdminTab('backup')}
                className="hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800"
              >
                <span>ডাটা ব্যাকআপ</span>
              </button>
            </div>

            <div className="text-[11px] text-stone-500">
              জয়মনিরহাট ইউনিয়ন যুব সংগঠন · অ্যাডমিন পোর্টাল
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
