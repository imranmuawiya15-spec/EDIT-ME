import { VideoItem, CommentItem, HireMessage, UserSession } from '../types';
import { INITIAL_VIDEOS } from '../data/defaultVideos';

const VIDEOS_STORAGE_KEY = 'muawiya_portfolio_videos_v1';
const HIRE_MESSAGES_STORAGE_KEY = 'muawiya_hire_messages_v1';
const SESSION_STORAGE_KEY = 'muawiya_user_session_v1';
const INDEXED_DB_NAME = 'MuawiyaVideoFilesDB';
const DB_VERSION = 1;
const STORE_NAME = 'uploaded_video_blobs';

export const ADMIN_EMAIL = 'imranmuawiya15@gmail.com';
export const ADMIN_PASSWORD = 'smoke000';

// IndexedDB Helper for Desktop Video Blobs
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return reject(new Error('IndexedDB not supported'));
    }
    const request = indexedDB.open(INDEXED_DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveVideoBlobToDB(id: string, blob: Blob): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(blob, id);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Could not store blob in IndexedDB:', err);
  }
}

export async function getVideoBlobFromDB(id: string): Promise<Blob | null> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(id);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    return null;
  }
}

export async function deleteVideoBlobFromDB(id: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(id);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Could not delete blob from IndexedDB:', err);
  }
}

// Load Videos
export function getSavedVideos(): VideoItem[] {
  if (typeof window === 'undefined') return INITIAL_VIDEOS;
  try {
    const stored = localStorage.getItem(VIDEOS_STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(VIDEOS_STORAGE_KEY, JSON.stringify(INITIAL_VIDEOS));
      return INITIAL_VIDEOS;
    }
    const parsed: VideoItem[] = JSON.parse(stored);
    return parsed.length > 0 ? parsed : INITIAL_VIDEOS;
  } catch (e) {
    return INITIAL_VIDEOS;
  }
}

export function saveVideos(videos: VideoItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(VIDEOS_STORAGE_KEY, JSON.stringify(videos));
  } catch (e) {
    console.error('Error saving videos to storage', e);
  }
}

export async function addVideo(video: VideoItem, fileBlob?: Blob): Promise<VideoItem[]> {
  if (fileBlob) {
    await saveVideoBlobToDB(video.id, fileBlob);
  }
  const current = getSavedVideos();
  const updated = [video, ...current];
  saveVideos(updated);
  return updated;
}

export async function deleteVideo(id: string): Promise<VideoItem[]> {
  await deleteVideoBlobFromDB(id);
  const current = getSavedVideos();
  const updated = current.filter((v) => v.id !== id);
  saveVideos(updated);
  return updated;
}

export function addCommentToVideo(videoId: string, comment: CommentItem): VideoItem[] {
  const current = getSavedVideos();
  const updated = current.map((v) => {
    if (v.id === videoId) {
      return {
        ...v,
        comments: [comment, ...(v.comments || [])]
      };
    }
    return v;
  });
  saveVideos(updated);
  return updated;
}

export function deleteCommentFromVideo(videoId: string, commentId: string): VideoItem[] {
  const current = getSavedVideos();
  const updated = current.map((v) => {
    if (v.id === videoId) {
      return {
        ...v,
        comments: (v.comments || []).filter((c) => c.id !== commentId)
      };
    }
    return v;
  });
  saveVideos(updated);
  return updated;
}

export function likeVideoItem(videoId: string): VideoItem[] {
  const current = getSavedVideos();
  const updated = current.map((v) => {
    if (v.id === videoId) {
      return {
        ...v,
        likes: (v.likes || 0) + 1
      };
    }
    return v;
  });
  saveVideos(updated);
  return updated;
}

// Hire Messages
const INITIAL_MESSAGES: HireMessage[] = [
  {
    id: 'msg-01',
    clientName: 'Julian Croft',
    clientEmail: 'julian.croft@creatorhub.io',
    projectType: 'Reels / TikTok Series',
    budget: 65,
    deadline: 'Within 3 days',
    description: 'Need 5 vertical TikTok clips edited with captions, sound effects, and fast zooms in Premiere Pro. Raw footage in Google Drive.',
    rawFootageLink: 'https://drive.google.com/drive/folders/sample',
    createdAt: 'Today, 2 hours ago',
    status: 'new'
  },
  {
    id: 'msg-02',
    clientName: 'Nadia Thorne',
    clientEmail: 'nadia.thorne@apexstudios.com',
    projectType: 'Commercial Product Ad',
    budget: 350,
    deadline: '1 week',
    description: '30-second high-energy fitness apparel promo video. High resolution 4K Lumetri color grading needed.',
    rawFootageLink: 'https://wetransfer.com/downloads/sample',
    createdAt: 'Yesterday',
    status: 'reviewed'
  }
];

export function getHireMessages(): HireMessage[] {
  if (typeof window === 'undefined') return INITIAL_MESSAGES;
  try {
    const stored = localStorage.getItem(HIRE_MESSAGES_STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(HIRE_MESSAGES_STORAGE_KEY, JSON.stringify(INITIAL_MESSAGES));
      return INITIAL_MESSAGES;
    }
    return JSON.parse(stored);
  } catch (e) {
    return INITIAL_MESSAGES;
  }
}

export function saveHireMessage(message: HireMessage): HireMessage[] {
  const current = getHireMessages();
  const updated = [message, ...current];
  if (typeof window !== 'undefined') {
    localStorage.setItem(HIRE_MESSAGES_STORAGE_KEY, JSON.stringify(updated));
  }
  return updated;
}

export function updateHireMessageStatus(id: string, status: HireMessage['status']): HireMessage[] {
  const current = getHireMessages();
  const updated = current.map((m) => (m.id === id ? { ...m, status } : m));
  if (typeof window !== 'undefined') {
    localStorage.setItem(HIRE_MESSAGES_STORAGE_KEY, JSON.stringify(updated));
  }
  return updated;
}

// User Session
export function getStoredSession(): UserSession {
  if (typeof window === 'undefined') return { role: 'guest', isAuthenticatedAdmin: false };
  try {
    const stored = localStorage.getItem(SESSION_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    // fallback
  }
  return { role: 'guest', isAuthenticatedAdmin: false };
}

export function setStoredSession(session: UserSession): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  } catch (e) {
    console.error('Error saving session', e);
  }
}
