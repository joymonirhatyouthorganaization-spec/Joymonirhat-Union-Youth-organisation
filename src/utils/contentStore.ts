import { NoticeItem, GalleryItem, CommitteeMember, ActivityItem } from '../types';
import { NOTICES, GALLERY_ITEMS, COMMITTEE_MEMBERS, ACTIVITIES } from '../data/organizationData';
import { useState, useEffect } from 'react';

const STORAGE_KEYS = {
  NOTICES: 'juyo_custom_notices_v1',
  GALLERY: 'juyo_custom_gallery_v1',
  MEMBERS: 'juyo_custom_members_v1',
  ACTIVITIES: 'juyo_custom_activities_v1',
};

const EVENT_NAME = 'juyo_content_updated';

// Helper to notify other components in the same tab
export const notifyContentChanged = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  }
};

// Canvas-based photo compressor for Android and mobile cameras
export function compressImage(
  file: File,
  maxWidth = 1280,
  maxHeight = 1280,
  quality = 0.75
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            maxHeight = height;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Image could not be loaded'));
      img.src = e.target?.result as string;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

// Data loaders
export function getSavedNotices(): NoticeItem[] {
  if (typeof window === 'undefined') return NOTICES;
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTICES);
    if (!saved) return NOTICES;
    const custom: NoticeItem[] = JSON.parse(saved);
    // Combine custom notices (at the top) with default ones
    const customIds = new Set(custom.map((n) => n.id));
    const defaults = NOTICES.filter((n) => !customIds.has(n.id));
    return [...custom, ...defaults];
  } catch {
    return NOTICES;
  }
}

export function saveNotice(newNotice: NoticeItem): void {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTICES);
    let custom: NoticeItem[] = saved ? JSON.parse(saved) : [];
    // Remove if already exists, then prepend
    custom = [newNotice, ...custom.filter((n) => n.id !== newNotice.id)];
    localStorage.setItem(STORAGE_KEYS.NOTICES, JSON.stringify(custom));
    notifyContentChanged();
  } catch (e) {
    console.error('Failed to save notice', e);
  }
}

export function deleteNotice(id: string): void {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTICES);
    if (saved) {
      const custom: NoticeItem[] = JSON.parse(saved);
      const filtered = custom.filter((n) => n.id !== id);
      localStorage.setItem(STORAGE_KEYS.NOTICES, JSON.stringify(filtered));
      notifyContentChanged();
    }
  } catch (e) {
    console.error('Failed to delete notice', e);
  }
}

export function getSavedGallery(): GalleryItem[] {
  if (typeof window === 'undefined') return GALLERY_ITEMS;
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.GALLERY);
    if (!saved) return GALLERY_ITEMS;
    const custom: GalleryItem[] = JSON.parse(saved);
    const customIds = new Set(custom.map((g) => g.id));
    const defaults = GALLERY_ITEMS.filter((g) => !customIds.has(g.id));
    return [...custom, ...defaults];
  } catch {
    return GALLERY_ITEMS;
  }
}

export function saveGalleryItem(newItem: GalleryItem): void {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.GALLERY);
    let custom: GalleryItem[] = saved ? JSON.parse(saved) : [];
    custom = [newItem, ...custom.filter((g) => g.id !== newItem.id)];
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(custom));
    notifyContentChanged();
  } catch (e) {
    console.error('Failed to save gallery item', e);
  }
}

export function deleteGalleryItem(id: string): void {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.GALLERY);
    if (saved) {
      const custom: GalleryItem[] = JSON.parse(saved);
      const filtered = custom.filter((g) => g.id !== id);
      localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(filtered));
      notifyContentChanged();
    }
  } catch (e) {
    console.error('Failed to delete gallery item', e);
  }
}

export function getSavedMembers(): CommitteeMember[] {
  if (typeof window === 'undefined') return COMMITTEE_MEMBERS;
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.MEMBERS);
    if (!saved) return COMMITTEE_MEMBERS;
    const custom: CommitteeMember[] = JSON.parse(saved);
    const customIds = new Set(custom.map((m) => m.id));
    const defaults = COMMITTEE_MEMBERS.filter((m) => !customIds.has(m.id));
    return [...defaults, ...custom];
  } catch {
    return COMMITTEE_MEMBERS;
  }
}

export function saveMember(newMember: CommitteeMember): void {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.MEMBERS);
    let custom: CommitteeMember[] = saved ? JSON.parse(saved) : [];
    custom = [...custom.filter((m) => m.id !== newMember.id), newMember];
    localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(custom));
    notifyContentChanged();
  } catch (e) {
    console.error('Failed to save member', e);
  }
}

export function getSavedActivities(): ActivityItem[] {
  if (typeof window === 'undefined') return ACTIVITIES;
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
    if (!saved) return ACTIVITIES;
    const custom: ActivityItem[] = JSON.parse(saved);
    const customIds = new Set(custom.map((a) => a.id));
    const defaults = ACTIVITIES.filter((a) => !customIds.has(a.id));
    return [...custom, ...defaults];
  } catch {
    return ACTIVITIES;
  }
}

export function saveActivity(newActivity: ActivityItem): void {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
    let custom: ActivityItem[] = saved ? JSON.parse(saved) : [];
    custom = [newActivity, ...custom.filter((a) => a.id !== newActivity.id)];
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(custom));
    notifyContentChanged();
  } catch (e) {
    console.error('Failed to save activity', e);
  }
}

// Export / Import / Reset features
export function exportAllDataJson(): string {
  const exportPayload = {
    exportedAt: new Date().toISOString(),
    organization: 'জয়মনিরহাট ইউনিয়ন যুব সংগঠন (JUYO)',
    version: '1.0',
    notices: getSavedNotices(),
    gallery: getSavedGallery(),
    members: getSavedMembers(),
    activities: getSavedActivities(),
  };
  return JSON.stringify(exportPayload, null, 2);
}

export function importAllDataJson(jsonText: string): boolean {
  try {
    const parsed = JSON.parse(jsonText);
    if (parsed.notices && Array.isArray(parsed.notices)) {
      localStorage.setItem(STORAGE_KEYS.NOTICES, JSON.stringify(parsed.notices));
    }
    if (parsed.gallery && Array.isArray(parsed.gallery)) {
      localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(parsed.gallery));
    }
    if (parsed.members && Array.isArray(parsed.members)) {
      localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(parsed.members));
    }
    if (parsed.activities && Array.isArray(parsed.activities)) {
      localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(parsed.activities));
    }
    notifyContentChanged();
    return true;
  } catch (e) {
    console.error('Import failed', e);
    return false;
  }
}

export function resetAllDataToDefault(): void {
  localStorage.removeItem(STORAGE_KEYS.NOTICES);
  localStorage.removeItem(STORAGE_KEYS.GALLERY);
  localStorage.removeItem(STORAGE_KEYS.MEMBERS);
  localStorage.removeItem(STORAGE_KEYS.ACTIVITIES);
  notifyContentChanged();
}

// Reactive Hook for React components
export function useLiveContent() {
  const [notices, setNotices] = useState<NoticeItem[]>(getSavedNotices);
  const [gallery, setGallery] = useState<GalleryItem[]>(getSavedGallery);
  const [members, setMembers] = useState<CommitteeMember[]>(getSavedMembers);
  const [activities, setActivities] = useState<ActivityItem[]>(getSavedActivities);

  useEffect(() => {
    const handleUpdate = () => {
      setNotices(getSavedNotices());
      setGallery(getSavedGallery());
      setMembers(getSavedMembers());
      setActivities(getSavedActivities());
    };

    window.addEventListener(EVENT_NAME, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener(EVENT_NAME, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return {
    notices,
    gallery,
    members,
    activities,
    saveNotice,
    deleteNotice,
    saveGalleryItem,
    deleteGalleryItem,
    saveMember,
    saveActivity,
    exportAllDataJson,
    importAllDataJson,
    resetAllDataToDefault,
  };
}
