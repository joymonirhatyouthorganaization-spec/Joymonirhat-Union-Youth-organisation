/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  Activity, 
  Eye, 
  ShieldCheck, 
  Sparkles, 
  MapPin, 
  Check, 
  Globe2, 
  ChevronDown 
} from 'lucide-react';
import { 
  recordVisit, 
  getStoredVisitorStats, 
  toBanglaNumber, 
  VisitorStats, 
  JOYMONIRHAT_WARDS, 
  recordWardSelection,
  detectClientLocation
} from '../utils/visitorTracker';
import { Language } from '../types';

interface VisitorCounterProps {
  language: Language;
}

export const VisitorCounter: React.FC<VisitorCounterProps> = ({ language }) => {
  const [stats, setStats] = useState<VisitorStats>(getStoredVisitorStats());
  const [selectedWard, setSelectedWard] = useState<string>(stats.userWard || '');
  const [showWardMenu, setShowWardMenu] = useState<boolean>(false);
  const [justSelected, setJustSelected] = useState<boolean>(false);

  useEffect(() => {
    // Record visit on mount
    const updated = recordVisit();
    setStats(updated);
    if (updated.userWard) {
      setSelectedWard(updated.userWard);
    }

    // Try detecting client location in background
    detectClientLocation().then((loc) => {
      if (loc) {
        setStats(getStoredVisitorStats());
      }
    });
  }, []);

  const handleSelectWard = (wardName: string) => {
    const updated = recordWardSelection(wardName);
    setSelectedWard(wardName);
    setStats(updated);
    setShowWardMenu(false);
    setJustSelected(true);
    setTimeout(() => setJustSelected(false), 3000);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 text-stone-300 shadow-inner">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between pb-3 mb-3 border-b border-slate-800/80 gap-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h5 className="text-xs font-bold text-white tracking-wide flex items-center gap-1.5">
              <span>{language === 'bn' ? 'ওয়েবসাইট ভিজিটর ও এলাকা ট্র্যাকার' : 'Visitor & Regional Tracker'}</span>
            </h5>
            <p className="text-[10px] text-stone-400">
              {language === 'bn' ? 'স্বয়ংক্রিয় রিয়েল-টাইম ভিজিটর ও অঞ্চল ভিত্তিক মনিটরিং' : 'Real-time Visitor & Geolocation Counter'}
            </p>
          </div>
        </div>

        {/* Live indicator badge */}
        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-[10px] text-emerald-300 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span>
            {language === 'bn' 
              ? `${toBanglaNumber(stats.liveOnline)} জন অনলাইন` 
              : `${stats.liveOnline} Online`}
          </span>
        </div>
      </div>

      {/* Counter Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {/* Total Visits */}
        <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/60 flex flex-col">
          <span className="text-[10px] text-stone-400 font-medium flex items-center gap-1">
            <Eye className="w-3 h-3 text-blue-400" />
            {language === 'bn' ? 'মোট ভিজিটর' : 'Total Visits'}
          </span>
          <span className="text-base sm:text-lg font-black text-amber-400 font-mono mt-0.5 tracking-wider">
            {language === 'bn' ? toBanglaNumber(stats.totalVisits) : stats.totalVisits.toLocaleString()}
          </span>
        </div>

        {/* Today's Visits */}
        <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/60 flex flex-col">
          <span className="text-[10px] text-stone-400 font-medium flex items-center gap-1">
            <Calendar className="w-3 h-3 text-emerald-400" />
            {language === 'bn' ? 'আজকের ভিজিটর' : "Today's Visits"}
          </span>
          <span className="text-base sm:text-lg font-black text-emerald-400 font-mono mt-0.5 tracking-wider">
            {language === 'bn' ? toBanglaNumber(stats.todayVisits) : stats.todayVisits.toLocaleString()}
          </span>
        </div>

        {/* This Month */}
        <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/60 flex flex-col">
          <span className="text-[10px] text-stone-400 font-medium flex items-center gap-1">
            <Activity className="w-3 h-3 text-indigo-400" />
            {language === 'bn' ? 'চলতি মাসে' : 'This Month'}
          </span>
          <span className="text-base sm:text-lg font-black text-indigo-300 font-mono mt-0.5 tracking-wider">
            {language === 'bn' ? toBanglaNumber(stats.thisMonthVisits) : stats.thisMonthVisits.toLocaleString()}
          </span>
        </div>

        {/* Unique Visitors */}
        <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/60 flex flex-col">
          <span className="text-[10px] text-stone-400 font-medium flex items-center gap-1">
            <Users className="w-3 h-3 text-rose-400" />
            {language === 'bn' ? 'অনন্য পাঠক' : 'Unique Readers'}
          </span>
          <span className="text-base sm:text-lg font-black text-rose-400 font-mono mt-0.5 tracking-wider">
            {language === 'bn' ? toBanglaNumber(stats.uniqueVisitors) : stats.uniqueVisitors.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Ward / Area Quick Tagger Bar for Visitors */}
      <div className="mt-3 p-2.5 bg-slate-950/80 border border-slate-800 rounded-lg relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-6 h-6 rounded-md bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-stone-300 font-medium">
                {selectedWard ? (
                  <span className="text-amber-300 font-bold flex items-center gap-1">
                    <span>আপনার ওয়ার্ড:</span>
                    <span>{selectedWard}</span>
                  </span>
                ) : (
                  <span>{language === 'bn' ? 'আপনি জয়মনিরহাটের বাসিন্দা? আপনার ওয়ার্ড সিলেক্ট করুন:' : 'From Joymonirhat? Select your ward:'}</span>
                )}
              </span>
              {stats.detectedLocation && (
                <span className="text-[10px] text-stone-400 block sm:inline sm:ml-2">
                  (শনাক্তকৃত এলাকা: {stats.detectedLocation.city}, {stats.detectedLocation.country})
                </span>
              )}
            </div>
          </div>

          {/* Ward Select Trigger Button */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setShowWardMenu(!showWardMenu)}
              className="flex items-center justify-between gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-stone-200 hover:text-white rounded-lg text-xs font-semibold border border-slate-700 transition-colors w-full sm:w-auto cursor-pointer"
            >
              <span>{selectedWard ? 'ওয়ার্ড পরিবর্তন' : 'ওয়ার্ড সিলেক্ট করুন (১-৯)'}</span>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
            </button>

            {/* Dropdown Menu */}
            {showWardMenu && (
              <div className="absolute right-0 bottom-full sm:bottom-auto sm:top-full mb-1 sm:mb-0 sm:mt-1 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-2 py-1 text-[11px] font-bold text-amber-400 border-b border-slate-800 mb-1 flex items-center justify-between">
                  <span>জয়মনিরহাট ইউনিয়নের ৯টি ওয়ার্ড</span>
                  <button
                    onClick={() => setShowWardMenu(false)}
                    className="text-stone-400 hover:text-white text-xs"
                  >
                    ✕
                  </button>
                </div>
                <div className="max-h-56 overflow-y-auto space-y-0.5 no-scrollbar">
                  {JOYMONIRHAT_WARDS.map((w) => {
                    const isCurrent = selectedWard.includes(`${w.id} নং`);
                    return (
                      <button
                        key={w.id}
                        type="button"
                        onClick={() => handleSelectWard(w.name)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer ${
                          isCurrent
                            ? 'bg-amber-500/20 text-amber-300 font-bold'
                            : 'text-stone-300 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <span className="line-clamp-1">{w.name}</span>
                        {isCurrent && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 ml-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {justSelected && (
          <div className="mt-2 text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-1 rounded flex items-center gap-1.5 animate-in fade-in duration-200">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>ধন্যবাদ! আপনার ওয়ার্ড ট্র্যাকিংয়ে সফলভাবে লিপিবদ্ধ হয়েছে।</span>
          </div>
        )}
      </div>

      {/* Subtext info */}
      <div className="mt-3 pt-2 border-t border-slate-800/50 flex flex-wrap items-center justify-between text-[10px] text-stone-500 gap-2">
        <div className="flex items-center gap-1 text-emerald-500">
          <ShieldCheck className="w-3 h-3" />
          <span>{language === 'bn' ? 'ভেরিফায়েড ভৌগোলিক ট্র্যাকার' : 'Verified Geo Tracker'}</span>
        </div>
        <div className="flex items-center gap-1 text-stone-400">
          <Globe2 className="w-3 h-3 text-teal-400" />
          <span>{language === 'bn' ? 'প্রধান ট্রাফিক: জয়মনিরহাট (ওয়ার্ড ১-৯), কুড়িগ্রাম ও প্রবাসী' : 'Traffic: Joymonirhat, Kurigram & Global'}</span>
        </div>
        <div className="flex items-center gap-1 text-stone-400">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>{language === 'bn' ? 'মোট পৃষ্ঠা দর্শন: ' : 'Total Pageviews: '}</span>
          <strong className="text-stone-300 font-mono">
            {language === 'bn' ? toBanglaNumber(stats.pageViews) : stats.pageViews.toLocaleString()}
          </strong>
        </div>
      </div>
    </div>
  );
};
