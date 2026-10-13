import React, { useState, useEffect } from 'react';
import { VideoItem, CommentItem, HireMessage, UserSession } from './types';
import { 
  getSavedVideos, 
  addVideo, 
  deleteVideo, 
  addCommentToVideo, 
  deleteCommentFromVideo, 
  likeVideoItem,
  getHireMessages, 
  saveHireMessage, 
  updateHireMessageStatus,
  getStoredSession,
  setStoredSession,
  getVideoBlobFromDB,
  ADMIN_EMAIL
} from './utils/storage';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PremiereSpecs } from './components/PremiereSpecs';
import { VideoGallery } from './components/VideoGallery';
import { PricingHireSection } from './components/PricingHireSection';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { UploadModal } from './components/UploadModal';
import { VideoTheaterModal } from './components/VideoTheaterModal';
import { HireModal } from './components/HireModal';
import { AdminInboxModal } from './components/AdminInboxModal';

export default function App() {
  const [session, setSession] = useState<UserSession>(() => getStoredSession());
  const [videos, setVideos] = useState<VideoItem[]>(() => getSavedVideos());
  const [hireMessages, setHireMessages] = useState<HireMessage[]>(() => getHireMessages());

  // Modals state
  // If user has not logged in or chosen guest, show sign in modal immediately on open
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('muawiya_user_session_v1');
      return !stored; // open by default if first visit
    }
    return true;
  });
  const [authInitialMode, setAuthInitialMode] = useState<'admin' | 'guest'>('admin');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isHireOpen, setIsHireOpen] = useState(false);
  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  
  // Prefilled hire parameters
  const [hireBudget, setHireBudget] = useState<number>(50);
  const [hirePackageName, setHirePackageName] = useState<string>('');

  // Hydrate desktop uploaded video blobs from IndexedDB
  useEffect(() => {
    async function hydrateBlobs() {
      const currentVideos = getSavedVideos();
      let hasChanges = false;
      const updated = await Promise.all(
        currentVideos.map(async (v) => {
          if (v.isDesktopUpload) {
            const blob = await getVideoBlobFromDB(v.id);
            if (blob) {
              const freshUrl = URL.createObjectURL(blob);
              hasChanges = true;
              return { ...v, videoUrl: freshUrl };
            }
          }
          return v;
        })
      );
      if (hasChanges) {
        setVideos(updated);
      }
    }
    hydrateBlobs();
  }, []);

  const handleSessionChange = (newSession: UserSession) => {
    setSession(newSession);
    setStoredSession(newSession);
  };

  const handleLogout = () => {
    const guestSession: UserSession = { role: 'guest', isAuthenticatedAdmin: false };
    setSession(guestSession);
    setStoredSession(guestSession);
  };

  const handleOpenAuth = (mode: 'admin' | 'guest' = 'admin') => {
    setAuthInitialMode(mode);
    setIsAuthOpen(true);
  };

  const handleUploadVideo = async (newVideo: VideoItem, fileBlob?: Blob) => {
    const updated = await addVideo(newVideo, fileBlob);
    setVideos(updated);
  };

  const handleDeleteVideo = async (id: string) => {
    const updated = await deleteVideo(id);
    setVideos(updated);
    if (selectedVideo?.id === id) {
      setSelectedVideo(null);
    }
  };

  const handleAddComment = (videoId: string, comment: CommentItem) => {
    const updated = addCommentToVideo(videoId, comment);
    setVideos(updated);
    if (selectedVideo?.id === videoId) {
      const refreshed = updated.find((v) => v.id === videoId);
      if (refreshed) setSelectedVideo(refreshed);
    }
  };

  const handleDeleteComment = (videoId: string, commentId: string) => {
    const updated = deleteCommentFromVideo(videoId, commentId);
    setVideos(updated);
    if (selectedVideo?.id === videoId) {
      const refreshed = updated.find((v) => v.id === videoId);
      if (refreshed) setSelectedVideo(refreshed);
    }
  };

  const handleLikeVideo = (videoId: string) => {
    const updated = likeVideoItem(videoId);
    setVideos(updated);
    if (selectedVideo?.id === videoId) {
      const refreshed = updated.find((v) => v.id === videoId);
      if (refreshed) setSelectedVideo(refreshed);
    }
  };

  const handleSubmitHireMessage = (message: HireMessage) => {
    const updated = saveHireMessage(message);
    setHireMessages(updated);
  };

  const handleUpdateMessageStatus = (id: string, status: HireMessage['status']) => {
    const updated = updateHireMessageStatus(id, status);
    setHireMessages(updated);
  };

  const handleSelectBudgetForHire = (amount: number, packageName: string) => {
    setHireBudget(amount);
    setHirePackageName(packageName);
    setIsHireOpen(true);
  };

  const unreadCount = hireMessages.filter((m) => m.status === 'new').length;

  return (
    <div className="min-h-screen bg-[#080a0f] text-slate-100 selection:bg-purple-600 selection:text-white">
      {/* Top Bar Navigation */}
      <Navbar
        session={session}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        onOpenUpload={() => setIsUploadOpen(true)}
        onOpenInbox={() => setIsInboxOpen(true)}
        onOpenHire={() => {
          setHireBudget(50);
          setIsHireOpen(true);
        }}
        unreadCount={unreadCount}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero
          session={session}
          onOpenHire={() => {
            setHireBudget(50);
            setIsHireOpen(true);
          }}
          onOpenUpload={() => setIsUploadOpen(true)}
          onExploreWork={() => {
            const el = document.getElementById('galleries');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Video Galleries */}
        <VideoGallery
          videos={videos}
          session={session}
          onSelectVideo={(video) => setSelectedVideo(video)}
          onLikeVideo={handleLikeVideo}
          onDeleteVideo={handleDeleteVideo}
          onOpenUpload={() => setIsUploadOpen(true)}
        />

        {/* Premiere Pro Specialization Specs */}
        <PremiereSpecs />

        {/* Pricing & Hire Section ($3 to $1000) */}
        <PricingHireSection onSelectBudget={handleSelectBudgetForHire} />
      </main>

      {/* Footer */}
      <Footer
        session={session}
        onOpenAuth={handleOpenAuth}
        onOpenHire={() => setIsHireOpen(true)}
      />

      {/* Auth & Access Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSessionChange={handleSessionChange}
        currentSession={session}
        initialMode={authInitialMode}
      />

      {/* Video Theater & Live Comments Modal */}
      <VideoTheaterModal
        video={selectedVideo}
        session={session}
        onClose={() => setSelectedVideo(null)}
        onAddComment={handleAddComment}
        onDeleteComment={handleDeleteComment}
        onLikeVideo={handleLikeVideo}
      />

      {/* Desktop Video Upload Modal (Admin only) */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUpload={handleUploadVideo}
      />

      {/* Client Hire Modal ($3 - $1000) */}
      <HireModal
        isOpen={isHireOpen}
        onClose={() => setIsHireOpen(false)}
        onSubmitMessage={handleSubmitHireMessage}
        initialBudget={hireBudget}
        initialProjectTitle={hirePackageName}
      />

      {/* Admin Message Center */}
      <AdminInboxModal
        isOpen={isInboxOpen}
        onClose={() => setIsInboxOpen(false)}
        messages={hireMessages}
        onUpdateStatus={handleUpdateMessageStatus}
      />
    </div>
  );
}
