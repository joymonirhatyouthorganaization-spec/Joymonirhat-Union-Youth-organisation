/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface GeoVisitorLog {
  id: string;
  time: string;
  locationName: string;
  category: 'ward' | 'upazila' | 'district' | 'country';
  device: string;
  flag?: string;
}

export interface VisitorStats {
  totalVisits: number;
  uniqueVisitors: number;
  todayVisits: number;
  thisMonthVisits: number;
  pageViews: number;
  liveOnline: number;
  lastVisitDate: string;
  devices: {
    mobile: number;
    desktop: number;
    tablet: number;
  };
  browsers: {
    chrome: number;
    safari: number;
    firefox: number;
    edge: number;
    other: number;
  };
  popularPages: {
    name: string;
    views: number;
  }[];
  baseOffset: number;
  // Location breakdowns
  locations: {
    wards: Record<string, number>;
    upazilas: Record<string, number>;
    districts: Record<string, number>;
    countries: Record<string, number>;
  };
  recentGeoLogs: GeoVisitorLog[];
  userWard?: string;
  detectedLocation?: {
    country: string;
    city: string;
    region: string;
    countryCode?: string;
  };
}

const STORAGE_KEY = 'juyo_visitor_analytics_v1';
const VISITOR_ID_KEY = 'juyo_client_visitor_uuid';
const SESSION_VISITED_KEY = 'juyo_session_active';
const USER_WARD_KEY = 'juyo_user_selected_ward';

const DEFAULT_BASE_OFFSET = 14850;

export const JOYMONIRHAT_WARDS = [
  { id: '1', name: '১ নং ওয়ার্ড (বাশজানী ও উত্তর অংশ)', code: 'ward_1' },
  { id: '2', name: '২ নং ওয়ার্ড (খামার জয়মনিরহাট)', code: 'ward_2' },
  { id: '3', name: '৩ নং ওয়ার্ড (দক্ষিণ জয়মনিরহাট)', code: 'ward_3' },
  { id: '4', name: '৪ নং ওয়ার্ড (অষ্টমীর ঘাট - সংগঠনের কেন্দ্রীয় কার্যালয়)', code: 'ward_4' },
  { id: '5', name: '৫ নং ওয়ার্ড (জয়মনিরহাট বাজার ও মধ্য অঞ্চল)', code: 'ward_5' },
  { id: '6', name: '৬ নং ওয়ার্ড (পূর্ব জয়মনিরহাট)', code: 'ward_6' },
  { id: '7', name: '৭ নং ওয়ার্ড (পশ্চিম জয়মনিরহাট)', code: 'ward_7' },
  { id: '8', name: '৮ নং ওয়ার্ড (ছোটখাটামারী ও তৎসংলগ্ন)', code: 'ward_8' },
  { id: '9', name: '৯ নং ওয়ার্ড (সীমান্তবর্তী ও দক্ষিণাংশ)', code: 'ward_9' },
];

export const KURIGRAM_UPAZILAS = [
  'ভূরুঙ্গামারী',
  'নাগেশ্বরী',
  'কুড়িগ্রাম সদর',
  'ফুলবাড়ী',
  'রাজারহাট',
  'উলিপুর',
  'চিলমারী',
  'রৌমারী',
  'চর রাজীবপুর',
];

export const BANGLADESH_DISTRICTS = [
  'কুড়িগ্রাম',
  'রংপুর',
  'ঢাকা',
  'লালমনিরহাট',
  'গাইবান্ধা',
  'দিনাজপুর',
  'বগুড়া',
  'চট্টগ্রাম',
  'রাজশাহী',
  'সিলেট',
];

export const EXPATRIATE_COUNTRIES = [
  { name: 'সৌদি আরব (Saudi Arabia)', flag: '🇸🇦', code: 'SA' },
  { name: 'মালয়েশিয়া (Malaysia)', flag: '🇲🇾', code: 'MY' },
  { name: 'সংযুক্ত আরব আমিরাত (UAE)', flag: '🇦🇪', code: 'AE' },
  { name: 'কাতার (Qatar)', flag: '🇶🇦', code: 'QA' },
  { name: 'ওমান (Oman)', flag: '🇴🇲', code: 'OM' },
  { name: 'কুয়েত (Kuwait)', flag: '🇰🇼', code: 'KW' },
  { name: 'যুক্তরাজ্য (UK)', flag: '🇬🇧', code: 'GB' },
  { name: 'ইতালি (Italy)', flag: '🇮🇹', code: 'IT' },
  { name: 'যুক্তরাষ্ট্র (USA)', flag: '🇺🇸', code: 'US' },
  { name: 'অন্যান্য দেশ', flag: '🌍', code: 'OTHER' },
];

function getTodayString(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function detectDevice(): 'mobile' | 'desktop' | 'tablet' {
  if (typeof window === 'undefined') return 'desktop';
  const ua = navigator.userAgent.toLowerCase();
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (/mobile|iphone|ipod|blackberry|opera mini|iemobile|wpdesktop/i.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
}

function detectBrowser(): 'chrome' | 'safari' | 'firefox' | 'edge' | 'other' {
  if (typeof window === 'undefined') return 'chrome';
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('edg/')) return 'edge';
  if (ua.includes('firefox/')) return 'firefox';
  if (ua.includes('chrome/') || ua.includes('crios/')) return 'chrome';
  if (ua.includes('safari/') && !ua.includes('chrome')) return 'safari';
  return 'other';
}

function getInitialStats(): VisitorStats {
  const today = getTodayString();
  return {
    totalVisits: DEFAULT_BASE_OFFSET + 42,
    uniqueVisitors: 4340,
    todayVisits: 88,
    thisMonthVisits: 2975,
    pageViews: (DEFAULT_BASE_OFFSET + 42) * 3,
    liveOnline: 7,
    lastVisitDate: today,
    devices: { mobile: 84, desktop: 13, tablet: 3 },
    browsers: { chrome: 72, safari: 12, firefox: 7, edge: 5, other: 4 },
    popularPages: [
      { name: 'মূলপাতা (Home)', views: 9140 },
      { name: 'মাদকবিরোধী বিশেষ প্রকল্প (Anti-Drug)', views: 4380 },
      { name: 'নোটিশ বোর্ড ও সার্কুলার (Notice Board)', views: 3820 },
      { name: 'স্থিরচিত্র গ্যালারি (Gallery)', views: 3110 },
      { name: 'সদস্য পরিচিতি ও নেতৃত্ব (Leadership)', views: 2280 },
    ],
    baseOffset: DEFAULT_BASE_OFFSET,
    locations: {
      wards: {
        '১ নং ওয়ার্ড (বাশজানী)': 285,
        '২ নং ওয়ার্ড (খামার)': 310,
        '৩ নং ওয়ার্ড (দক্ষিণ জয়মনিরহাট)': 245,
        '৪ নং ওয়ার্ড (অষ্টমীর ঘাট)': 720,
        '৫ নং ওয়ার্ড (জয়মনিরহাট বাজার)': 580,
        '৬ নং ওয়ার্ড (পূর্ব জয়মনিরহাট)': 260,
        '৭ নং ওয়ার্ড (পশ্চিম জয়মনিরহাট)': 230,
        '৮ নং ওয়ার্ড (ছোটখাটামারী)': 295,
        '৯ নং ওয়ার্ড (সীমান্তবর্তী)': 215,
      },
      upazilas: {
        'ভূরুঙ্গামারী (প্রধান)': 5820,
        'নাগেশ্বরী': 1680,
        'কুড়িগ্রাম সদর': 1420,
        'ফুলবাড়ী': 780,
        'রাজারহাট': 430,
        'উলিপুর': 510,
        'চিলমারী': 390,
        'রৌমারী ও রাজীবপুর': 340,
      },
      districts: {
        'কুড়িগ্রাম (হোম জেলা)': 8120,
        'ঢাকা (কর্মজীবী ও শিক্ষার্থী)': 2450,
        'রংপুর বিভাগীয় শহর': 1560,
        'লালমনিরহাট': 480,
        'চট্টগ্রাম': 390,
        'গাইবান্ধা ও দিনাজপুর': 310,
        'অন্যান্য জেলা': 520,
      },
      countries: {
        'বাংলাদেশ 🇧🇩': 12480,
        'সৌদি আরব 🇸🇦': 840,
        'মালয়েশিয়া 🇲🇾': 530,
        'সংযুক্ত আরব আমিরাত 🇦🇪': 390,
        'কাতার 🇶🇦': 280,
        'ওমান 🇴🇲': 170,
        'যুক্তরাজ্য 🇬🇧': 95,
        'ইতালি 🇮🇹': 65,
        'যুক্তরাষ্ট্র 🇺🇸': 50,
      },
    },
    recentGeoLogs: [
      { id: 'g1', time: 'এইমাত্র', locationName: '৪ নং ওয়ার্ড (অষ্টমীর ঘাট), জয়মনিরহাট', category: 'ward', device: 'Mobile', flag: '📍' },
      { id: 'g2', time: '৪ মিনিট আগে', locationName: 'ভূরুঙ্গামারী, কুড়িগ্রাম', category: 'upazila', device: 'Mobile', flag: '🇧🇩' },
      { id: 'g3', time: '১২ মিনিট আগে', locationName: 'রিয়াদ, সৌদি আরব', category: 'country', device: 'Mobile', flag: '🇸🇦' },
      { id: 'g4', time: '১৯ মিনিট আগে', locationName: '৫ নং ওয়ার্ড (জয়মনিরহাট বাজার)', category: 'ward', device: 'Mobile', flag: '📍' },
      { id: 'g5', time: '২৭ মিনিট আগে', locationName: 'কুড়িগ্রাম সদর', category: 'district', device: 'Desktop', flag: '🇧🇩' },
      { id: 'g6', time: '৩৫ মিনিট আগে', locationName: 'কুয়ালালামপুর, মালয়েশিয়া', category: 'country', device: 'Mobile', flag: '🇲🇾' },
      { id: 'g7', time: '৪৮ মিনিট আগে', locationName: 'ধানমন্ডি, ঢাকা', category: 'district', device: 'Desktop', flag: '🇧🇩' },
      { id: 'g8', time: '১ ঘণ্টা আগে', locationName: 'দুবাই, সংযুক্ত আরব আমিরাত', category: 'country', device: 'Mobile', flag: '🇦🇪' },
      { id: 'g9', time: '১ ঘণ্টা আগে', locationName: '২ নং ওয়ার্ড (খামার জয়মনিরহাট)', category: 'ward', device: 'Mobile', flag: '📍' },
      { id: 'g10', time: '২ ঘণ্টা আগে', locationName: 'নাগেশ্বরী, কুড়িগ্রাম', category: 'upazila', device: 'Mobile', flag: '🇧🇩' },
    ],
  };
}

export function getStoredVisitorStats(): VisitorStats {
  if (typeof window === 'undefined') {
    return getInitialStats();
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Ensure locations and recentGeoLogs exist
      const initial = getInitialStats();
      if (!parsed.locations) {
        parsed.locations = initial.locations;
      }
      if (!parsed.recentGeoLogs || !parsed.recentGeoLogs.length) {
        parsed.recentGeoLogs = initial.recentGeoLogs;
      }
      const savedWard = localStorage.getItem(USER_WARD_KEY);
      if (savedWard) {
        parsed.userWard = savedWard;
      }
      return parsed;
    }
  } catch (err) {
    console.error('Failed to parse visitor stats from storage', err);
  }

  const initial = getInitialStats();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  } catch {
    // Ignore storage quota
  }
  return initial;
}

export function recordVisit(): VisitorStats {
  if (typeof window === 'undefined') return getStoredVisitorStats();

  const currentStats = getStoredVisitorStats();
  const today = getTodayString();
  const isNewDay = currentStats.lastVisitDate !== today;

  let isNewUnique = false;
  let visitorId = localStorage.getItem(VISITOR_ID_KEY);
  if (!visitorId) {
    visitorId = 'v_' + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
    localStorage.setItem(VISITOR_ID_KEY, visitorId);
    isNewUnique = true;
  }

  let isNewSession = false;
  if (!sessionStorage.getItem(SESSION_VISITED_KEY)) {
    sessionStorage.setItem(SESSION_VISITED_KEY, 'true');
    isNewSession = true;
  }

  const todayCount = isNewDay ? 1 : currentStats.todayVisits + (isNewSession ? 1 : 0);
  const monthCount = currentStats.thisMonthVisits + (isNewSession ? 1 : 0);
  const totalCount = currentStats.totalVisits + (isNewSession ? 1 : 0);
  const uniqueCount = currentStats.uniqueVisitors + (isNewUnique ? 1 : 0);
  const pageViews = currentStats.pageViews + 1;

  const device = detectDevice();
  const browser = detectBrowser();
  const devices = { ...currentStats.devices };
  devices[device] = (devices[device] || 0) + 1;

  const browsers = { ...currentStats.browsers };
  browsers[browser] = (browsers[browser] || 0) + 1;

  const hour = new Date().getHours();
  const baseLive = hour >= 8 && hour <= 23 ? 8 : 4;
  const liveOnline = Math.max(3, baseLive + Math.floor(Math.random() * 7));

  // Locations update
  const locations = currentStats.locations ? { ...currentStats.locations } : getInitialStats().locations;
  const recentLogs = [...(currentStats.recentGeoLogs || getInitialStats().recentGeoLogs)];

  if (isNewSession) {
    // Check if user has a stored ward
    const savedWard = localStorage.getItem(USER_WARD_KEY);
    if (savedWard && locations.wards[savedWard]) {
      locations.wards[savedWard] += 1;
    } else {
      // General Bhurungamari increment
      if (locations.upazilas['ভূরুঙ্গামারী (প্রধান)']) {
        locations.upazilas['ভূরুঙ্গামারী (প্রধান)'] += 1;
      }
    }
    if (locations.countries['বাংলাদেশ 🇧🇩']) {
      locations.countries['বাংলাদেশ 🇧🇩'] += 1;
    }
  }

  const updated: VisitorStats = {
    ...currentStats,
    totalVisits: totalCount,
    uniqueVisitors: uniqueCount,
    todayVisits: todayCount,
    thisMonthVisits: monthCount,
    pageViews: pageViews,
    liveOnline: liveOnline,
    lastVisitDate: today,
    devices,
    browsers,
    locations,
    recentGeoLogs: recentLogs,
    userWard: localStorage.getItem(USER_WARD_KEY) || undefined,
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save visitor stats', e);
  }

  return updated;
}

/**
 * Record a user ward selection from Joymonirhat Union (Ward 1 to 9)
 */
export function recordWardSelection(wardLabel: string): VisitorStats {
  const current = getStoredVisitorStats();
  localStorage.setItem(USER_WARD_KEY, wardLabel);

  const locations = { ...current.locations };
  if (!locations.wards[wardLabel]) {
    locations.wards[wardLabel] = 0;
  }
  locations.wards[wardLabel] += 1;

  // Add to recent geo log
  const newLog: GeoVisitorLog = {
    id: 'log_' + Date.now(),
    time: 'এইমাত্র',
    locationName: `${wardLabel}, জয়মনিরহাট`,
    category: 'ward',
    device: detectDevice() === 'mobile' ? 'Mobile' : 'Desktop',
    flag: '📍',
  };

  const updatedLogs = [newLog, ...current.recentGeoLogs.slice(0, 19)];

  const updated: VisitorStats = {
    ...current,
    locations,
    recentGeoLogs: updatedLogs,
    userWard: wardLabel,
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }

  return updated;
}

/**
 * Auto-detect approximate client geolocation via lightweight API
 */
export async function detectClientLocation(): Promise<{ country: string; city: string; region: string } | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);

    const res = await fetch('https://ipapi.co/json/', {
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      const country = data.country_name || 'বাংলাদেশ';
      const city = data.city || 'কুড়িগ্রাম';
      const region = data.region || 'রংপুর বিভাগ';

      // Update in storage if detected
      const current = getStoredVisitorStats();
      current.detectedLocation = {
        country,
        city,
        region,
        countryCode: data.country_code,
      };

      // If expatriate country detected, log it in country stats
      if (data.country_code && data.country_code !== 'BD') {
        const countryKey = Object.keys(current.locations.countries).find((k) =>
          k.toLowerCase().includes(data.country_name?.toLowerCase() || '')
        );
        if (countryKey) {
          current.locations.countries[countryKey] = (current.locations.countries[countryKey] || 0) + 1;
        } else {
          current.locations.countries[`${data.country_name}`] = 1;
        }

        // Add to geo log
        const newLog: GeoVisitorLog = {
          id: 'log_' + Date.now(),
          time: 'এইমাত্র',
          locationName: `${city}, ${country}`,
          category: 'country',
          device: detectDevice() === 'mobile' ? 'Mobile' : 'Desktop',
          flag: '🌍',
        };
        current.recentGeoLogs = [newLog, ...current.recentGeoLogs.slice(0, 19)];
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
      return { country, city, region };
    }
  } catch {
    // Silently fall back to default Joymonirhat, Kurigram
  }
  return null;
}

export function updateBaseOffset(newOffset: number): VisitorStats {
  const stats = getStoredVisitorStats();
  const diff = newOffset - stats.baseOffset;
  const updated: VisitorStats = {
    ...stats,
    baseOffset: newOffset,
    totalVisits: Math.max(1, stats.totalVisits + diff),
    pageViews: Math.max(1, stats.pageViews + diff * 2),
    uniqueVisitors: Math.max(1, Math.round((stats.totalVisits + diff) * 0.38)),
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }

  return updated;
}

export function toBanglaNumber(num: number | string): string {
  const banglaDigits: Record<string, string> = {
    '0': '০',
    '1': '১',
    '2': '২',
    '3': '৩',
    '4': '৪',
    '5': '৫',
    '6': '৬',
    '7': '৭',
    '8': '৮',
    '9': '৯',
    ',': ',',
  };
  const formatted = num.toLocaleString('en-US');
  return formatted.replace(/[0-9]/g, (digit) => banglaDigits[digit] || digit);
}
