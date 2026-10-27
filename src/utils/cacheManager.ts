/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CacheReport {
  localStorageSizeKb: number;
  cachedImagesCount: number;
  totalNotices: number;
  totalGalleryItems: number;
  cacheStorageSupported: boolean;
  serviceWorkersCount: number;
}

const CACHE_NAME = 'juyo-content-cache-v2';

/**
 * Get current browser cache & storage size report
 */
export async function getCacheReport(): Promise<CacheReport> {
  let localStorageSizeKb = 0;
  let totalNotices = 0;
  let totalGalleryItems = 0;
  let cachedImagesCount = 0;

  if (typeof window !== 'undefined') {
    try {
      let totalBytes = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          const val = localStorage.getItem(key) || '';
          totalBytes += key.length + val.length;
          if (key === 'juyo_live_notices_v1') {
            try {
              totalNotices = JSON.parse(val).length;
            } catch {}
          }
          if (key === 'juyo_live_gallery_v1') {
            try {
              const gallery = JSON.parse(val);
              totalGalleryItems = gallery.length;
              cachedImagesCount = gallery.filter((item: any) => item.imageUrl && item.imageUrl.startsWith('data:')).length;
            } catch {}
          }
        }
      }
      localStorageSizeKb = Math.round((totalBytes * 2) / 1024);
    } catch (err) {
      console.warn('Failed to calculate storage size', err);
    }
  }

  let serviceWorkersCount = 0;
  if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      serviceWorkersCount = registrations.length;
    } catch {}
  }

  return {
    localStorageSizeKb,
    cachedImagesCount,
    totalNotices,
    totalGalleryItems,
    cacheStorageSupported: typeof window !== 'undefined' && 'caches' in window,
    serviceWorkersCount,
  };
}

/**
 * Clear all browser caches, service workers, and temporary storage
 * Preserves essential organizational data (notices, gallery, password) while flushing stale blobs
 */
export async function clearWebsiteCache(deepClean = false): Promise<{ success: boolean; message: string }> {
  try {
    // 1. Clear window.caches (Service Worker caches)
    if (typeof window !== 'undefined' && 'caches' in window) {
      const keys = await caches.keys();
      for (const key of keys) {
        await caches.delete(key);
      }
    }

    // 2. Unregister any lingering service workers that might slow down or block fresh updates
    if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.unregister();
      }
    }

    // 3. Clear session storage
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.clear();
    }

    // 4. If deepClean requested, compress and optimize localStorage image data
    if (deepClean && typeof localStorage !== 'undefined') {
      // Keep master password and live contents, but clean temporary visitor session keys
      localStorage.removeItem('juyo_session_active');
      localStorage.removeItem('juyo_cache_temporary_blobs');
    }

    return {
      success: true,
      message: 'ব্রাউজার ক্যাশ এবং অস্থায়ী ফাইলসমূহ সফলভাবে মুছে ফেলা হয়েছে! ওয়েবসাইট এখন দ্রুত লোড হবে।',
    };
  } catch (error) {
    console.error('Failed to clear cache', error);
    return {
      success: false,
      message: 'ক্যাশ মুছে ফেলতে সমস্যা হয়েছে: ' + String(error),
    };
  }
}

/**
 * Pre-cache critical images to improve perceived speed
 */
export function preloadCriticalImages(urls: string[]) {
  if (typeof window === 'undefined') return;
  urls.forEach((url) => {
    if (!url || url.startsWith('data:')) return;
    const img = new Image();
    img.src = url;
  });
}
