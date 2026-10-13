export type AspectRatioType = '16:9' | '9:16';

export type VideoCategory = 
  | 'all' 
  | 'shorts' 
  | 'youtube' 
  | 'cinematic' 
  | 'gaming' 
  | 'commercial'
  | 'desktop_upload';

export interface CommentItem {
  id: string;
  authorName: string;
  rating: number; // 1-5
  text: string;
  createdAt: string;
  isVerifiedClient?: boolean;
  adminReply?: string;
}

export interface VideoItem {
  id: string;
  title: string;
  category: VideoCategory;
  categoryLabel: string;
  description: string;
  duration: string;
  aspectRatio: AspectRatioType;
  videoUrl: string; // Blob URL or CDN video stream
  posterUrl: string;
  premiereEffects: string[];
  tags: string[];
  views: number;
  likes: number;
  comments: CommentItem[];
  isDesktopUpload?: boolean;
  uploadedAt: string;
}

export interface HireMessage {
  id: string;
  clientName: string;
  clientEmail: string;
  projectType: string;
  budget: number; // 3 to 1000
  deadline: string;
  description: string;
  rawFootageLink?: string;
  createdAt: string;
  status: 'new' | 'reviewed' | 'contacted' | 'booked';
}

export interface UserSession {
  role: 'guest' | 'admin';
  email?: string;
  isAuthenticatedAdmin: boolean;
}
