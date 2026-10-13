import React, { useState, useRef, useEffect } from 'react';
import { VideoItem, CommentItem, UserSession } from '../types';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Star, 
  Send, 
  MessageSquare, 
  Trash2, 
  Reply, 
  CheckCircle,
  ThumbsUp,
  Sliders,
  Sparkles,
  Share2
} from 'lucide-react';

interface VideoTheaterModalProps {
  video: VideoItem | null;
  session: UserSession;
  onClose: () => void;
  onAddComment: (videoId: string, comment: CommentItem) => void;
  onDeleteComment: (videoId: string, commentId: string) => void;
  onLikeVideo: (videoId: string) => void;
}

export const VideoTheaterModal: React.FC<VideoTheaterModalProps> = ({
  video,
  session,
  onClose,
  onAddComment,
  onDeleteComment,
  onLikeVideo,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [colorGradeFilter, setColorGradeFilter] = useState<'normal' | 'lumetri_cinematic'>('lumetri_cinematic');

  // Comment form state
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [commentText, setCommentText] = useState('');
  const [replyInput, setReplyInput] = useState<{ [commentId: string]: string }>({});
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Reset state on new video
    setIsPlaying(true);
    setCurrentTime(0);
  }, [video?.id]);

  if (!video) return null;

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackRate(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  // Format time into Premiere Pro Timecode 00:00:SS:FF
  const formatTimecode = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    const frames = Math.floor((secs % 1) * 30);
    return `${mins < 10 ? '0' : ''}${mins}:${s < 10 ? '0' : ''}${s}:${frames < 10 ? '0' : ''}${frames}`;
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: CommentItem = {
      id: `comm-${Date.now()}`,
      authorName: authorName.trim() || 'Creative Client',
      rating,
      text: commentText.trim(),
      createdAt: 'Just now',
      isVerifiedClient: true,
    };

    onAddComment(video.id, newComment);
    setCommentText('');
    setAuthorName('');
  };

  const handlePostAdminReply = (commentId: string) => {
    const text = replyInput[commentId];
    if (!text?.trim()) return;

    // Find and update comment
    const target = video.comments.find((c) => c.id === commentId);
    if (target) {
      const updated: CommentItem = {
        ...target,
        adminReply: text.trim(),
      };
      onDeleteComment(video.id, commentId);
      onAddComment(video.id, updated);
      setActiveReplyId(null);
      setReplyInput({ ...replyInput, [commentId]: '' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-lg overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#0c0f17] border border-[#20273a] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="px-5 py-3.5 bg-[#090b12] border-b border-[#1b2133] flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3 truncate">
            <div className="w-7 h-7 rounded bg-[#5d2e8c] text-purple-200 font-bold flex items-center justify-center text-xs shrink-0 border border-purple-400/40">
              Pr
            </div>
            <div className="truncate">
              <h2 className="text-sm font-bold text-white truncate">{video.title}</h2>
              <span className="text-[11px] text-zinc-400">
                {video.categoryLabel} · Sequence: {video.aspectRatio} · Premiere Pro Master
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onLikeVideo(video.id)}
              className="px-2.5 py-1 rounded-lg bg-[#161a26] hover:bg-[#1e2335] text-xs text-zinc-300 hover:text-purple-300 flex items-center gap-1.5 transition-colors"
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span className="font-mono">{video.likes}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-6">
          {/* Video Player Box */}
          <div className="relative rounded-xl overflow-hidden bg-black border border-[#1d2334] group">
            <div
              className={`w-full flex items-center justify-center bg-black ${
                video.aspectRatio === '9:16' ? 'max-h-[500px]' : 'aspect-video max-h-[460px]'
              }`}
            >
              <video
                ref={videoRef}
                src={video.videoUrl}
                poster={video.posterUrl}
                autoPlay
                playsInline
                loop
                muted={isMuted}
                onTimeUpdate={handleTimeUpdate}
                onClick={togglePlay}
                style={{
                  filter:
                    colorGradeFilter === 'lumetri_cinematic'
                      ? 'contrast(1.08) saturate(1.15)'
                      : 'none',
                }}
                className={`w-full h-full cursor-pointer ${
                  video.aspectRatio === '9:16' ? 'max-h-[500px] object-contain' : 'object-contain'
                }`}
              />
            </div>

            {/* Premiere Pro Style Overlay Controls */}
            <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col gap-2">
              {/* Scrub Bar */}
              <input
                type="range"
                min="0"
                max={duration || 100}
                step="0.05"
                value={currentTime}
                onChange={handleSeek}
                className="w-full accent-purple-500 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
              />

              <div className="flex items-center justify-between text-xs text-white">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="p-1 hover:text-purple-400 transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>

                  <button
                    type="button"
                    onClick={toggleMute}
                    className="p-1 hover:text-purple-400 transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <div className="font-mono text-[11px] text-purple-300 bg-black/60 px-2 py-0.5 rounded border border-[#2b334a]">
                    TC: {formatTimecode(currentTime)}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Lumetri grade filter toggle */}
                  <button
                    type="button"
                    onClick={() =>
                      setColorGradeFilter((prev) =>
                        prev === 'lumetri_cinematic' ? 'normal' : 'lumetri_cinematic'
                      )
                    }
                    className={`px-2 py-0.5 text-[10px] font-mono rounded border transition-colors ${
                      colorGradeFilter === 'lumetri_cinematic'
                        ? 'bg-purple-900/60 border-purple-500 text-purple-200'
                        : 'bg-black/60 border-zinc-700 text-zinc-400'
                    }`}
                  >
                    {colorGradeFilter === 'lumetri_cinematic' ? 'Lumetri Grade: ON' : 'Raw: Flat'}
                  </button>

                  {/* Playback speed */}
                  <div className="flex items-center gap-1 text-[11px] font-mono">
                    {[0.5, 1, 1.5, 2].map((speed) => (
                      <button
                        key={speed}
                        type="button"
                        onClick={() => handleSpeedChange(speed)}
                        className={`px-1.5 py-0.5 rounded text-[10px] ${
                          playbackRate === speed ? 'bg-purple-600 text-white' : 'text-zinc-400'
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project Details & Premiere Pro Techniques */}
          <div className="p-4 bg-[#101420] border border-[#212739] rounded-xl space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-semibold text-purple-400">
                PREMIERE PRO TIMELINE BLUEPRINT
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                Duration: {video.duration} · Added {video.uploadedAt}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {video.description}
            </p>

            <div className="pt-2 flex flex-wrap gap-1.5">
              {video.premiereEffects.map((effect, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded bg-[#161b2a] text-purple-200 border border-[#262e45] text-xs font-mono"
                >
                  {effect}
                </span>
              ))}
            </div>
          </div>

          {/* Comment & Feedback Section */}
          <div className="pt-4 border-t border-[#1c2233]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-purple-400" />
                <h3 className="text-base font-bold text-white">
                  Client Reviews & Live Comments ({video.comments?.length || 0})
                </h3>
              </div>
              <span className="text-xs text-zinc-400">
                Share your reaction or project feedback
              </span>
            </div>

            {/* Post Comment Form */}
            <form onSubmit={handlePostComment} className="p-4 bg-[#101320] border border-[#21283d] rounded-xl mb-6 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-zinc-400 mb-1">
                    Your Name or Channel
                  </label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g. Liam / YouTube Creator"
                    className="w-full bg-[#151928] border border-[#252d43] rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-zinc-400 mb-1">
                    Rating
                  </label>
                  <div className="flex items-center gap-1 py-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-0.5 text-zinc-500 hover:text-amber-400 transition-colors"
                      >
                        <Star
                          className={`w-4 h-4 ${
                            star <= rating ? 'text-amber-400 fill-amber-400' : 'text-zinc-600'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-mono text-amber-400 ml-1.5">{rating} / 5</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-400 mb-1">
                  Comment / Review
                </label>
                <textarea
                  rows={2}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Share feedback on pacing, color grading, sound design, or overall impact..."
                  required
                  className="w-full bg-[#151928] border border-[#252d43] rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post Review</span>
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-3">
              {video.comments && video.comments.length > 0 ? (
                video.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="p-3.5 bg-[#0e121d] border border-[#1e2436] rounded-xl space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">{comment.authorName}</span>
                        {comment.isVerifiedClient && (
                          <span className="text-[10px] text-emerald-400 flex items-center gap-0.5">
                            <CheckCircle className="w-3 h-3" />
                            <span>Verified</span>
                          </span>
                        )}
                        <span aria-hidden="true" className="text-zinc-600">·</span>
                        <span className="text-zinc-400 text-[11px]">{comment.createdAt}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center text-amber-400">
                          {Array.from({ length: comment.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400" />
                          ))}
                        </div>

                        {session.isAuthenticatedAdmin && (
                          <button
                            type="button"
                            onClick={() => onDeleteComment(video.id, comment.id)}
                            className="text-zinc-600 hover:text-rose-400 transition-colors p-1"
                            title="Delete comment"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-zinc-300 leading-relaxed pl-0.5">
                      {comment.text}
                    </p>

                    {/* Admin Reply */}
                    {comment.adminReply ? (
                      <div className="mt-2 p-2.5 bg-[#141825] border-l-2 border-purple-500 rounded-r-lg text-xs text-zinc-300">
                        <div className="flex items-center gap-1.5 font-semibold text-purple-300 mb-0.5">
                          <span className="text-[10px] bg-purple-900/60 px-1.5 py-0.5 rounded text-purple-200">
                            Editor Reply
                          </span>
                          <span>Muawiya:</span>
                        </div>
                        <p className="text-[11px] text-zinc-300">{comment.adminReply}</p>
                      </div>
                    ) : session.isAuthenticatedAdmin ? (
                      <div className="pt-1">
                        {activeReplyId === comment.id ? (
                          <div className="flex items-center gap-2 mt-2">
                            <input
                              type="text"
                              value={replyInput[comment.id] || ''}
                              onChange={(e) =>
                                setReplyInput({ ...replyInput, [comment.id]: e.target.value })
                              }
                              placeholder="Type reply as Muawiya..."
                              className="flex-1 bg-[#151928] border border-[#252d43] rounded px-2.5 py-1 text-xs text-white"
                            />
                            <button
                              type="button"
                              onClick={() => handlePostAdminReply(comment.id)}
                              className="px-2.5 py-1 bg-purple-600 text-white rounded text-xs"
                            >
                              Reply
                            </button>
                            <button
                              type="button"
                              onClick={() => setActiveReplyId(null)}
                              className="text-xs text-zinc-400"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setActiveReplyId(comment.id)}
                            className="inline-flex items-center gap-1 text-[11px] text-purple-400 hover:text-purple-300 font-medium"
                          >
                            <Reply className="w-3 h-3" />
                            <span>Reply as Muawiya</span>
                          </button>
                        )}
                      </div>
                    ) : null}
                  </div>
                ))
              ) : (
                <p className="text-xs text-zinc-500 italic py-2">
                  No comments yet. Be the first to share your thoughts on this preview!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
