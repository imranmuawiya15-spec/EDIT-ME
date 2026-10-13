import React, { useState } from 'react';
import { VideoItem, VideoCategory, UserSession } from '../types';
import { Play, MessageSquare, ThumbsUp, Trash2, Clock, Upload, Sparkles, Filter } from 'lucide-react';

interface VideoGalleryProps {
  videos: VideoItem[];
  session: UserSession;
  onSelectVideo: (video: VideoItem) => void;
  onLikeVideo: (id: string) => void;
  onDeleteVideo: (id: string) => void;
  onOpenUpload: () => void;
}

export const VideoGallery: React.FC<VideoGalleryProps> = ({
  videos,
  session,
  onSelectVideo,
  onLikeVideo,
  onDeleteVideo,
  onOpenUpload,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<VideoCategory>('all');

  const categories: { id: VideoCategory; label: string }[] = [
    { id: 'all', label: 'All Previews' },
    { id: 'shorts', label: 'Shorts & Reels (9:16)' },
    { id: 'youtube', label: 'YouTube Longform' },
    { id: 'cinematic', label: 'Lumetri Color & Cinematic' },
    { id: 'gaming', label: 'Gaming & Montages' },
    { id: 'commercial', label: 'Commercial & Ads' },
    { id: 'desktop_upload', label: 'Desktop Uploads' },
  ];

  const filteredVideos = videos.filter((v) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'desktop_upload') return v.isDesktopUpload === true;
    return v.category === selectedCategory;
  });

  return (
    <section id="galleries" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="text-xs font-semibold text-purple-400 mb-2">
            PORTFOLIO SHOWCASE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Curated Video Galleries & Project Previews
          </h2>
          <p className="text-sm text-zinc-400 mt-2 max-w-2xl">
            Browse through my best project cuts, vertical viral reels, commercial promos, and desktop uploaded works. Click any preview to watch in full theater mode and inspect client feedback.
          </p>
        </div>

        {session.isAuthenticatedAdmin && (
          <button
            type="button"
            onClick={onOpenUpload}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg shadow-md shadow-purple-900/40 transition-colors whitespace-nowrap self-start md:self-auto"
          >
            <Upload className="w-4 h-4" />
            <span>Upload New Preview From Desktop</span>
          </button>
        )}
      </div>

      {/* Filter Tabs (Interactive Segmented Control) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-[#121622] text-zinc-400 hover:text-zinc-200 hover:bg-[#181d2c]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      {filteredVideos.length === 0 ? (
        <div className="text-center py-20 px-4 rounded-2xl bg-[#0f121c] border border-[#1f2638]">
          <p className="text-base text-zinc-400">No previews found in this category.</p>
          {session.isAuthenticatedAdmin && (
            <button
              type="button"
              onClick={onOpenUpload}
              className="mt-4 px-4 py-2 bg-purple-600 text-white text-xs font-semibold rounded-lg"
            >
              Upload a preview from desktop
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="group bg-[#10131e] border border-[#21273a] hover:border-purple-500/50 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-purple-950/20"
            >
              {/* Media Thumbnail Container */}
              <div
                onClick={() => onSelectVideo(video)}
                className={`relative w-full overflow-hidden bg-black cursor-pointer ${
                  video.aspectRatio === '9:16' ? 'aspect-[9/12] sm:aspect-[9/14]' : 'aspect-video'
                }`}
              >
                {/* Poster or Video thumbnail */}
                <img
                  src={video.posterUrl || '/src/assets/images/hero_editor_workspace_1791926265317.jpg'}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:bg-black/30 transition-colors" />

                {/* Duration indicator */}
                <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm text-[11px] font-mono font-medium text-white flex items-center gap-1">
                  <Clock className="w-3 h-3 text-purple-400" />
                  <span>{video.duration}</span>
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-purple-600/90 text-white flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
                    <Play className="w-5 h-5 fill-white translate-x-0.5" />
                  </div>
                </div>

                {/* Aspect ratio & desktop upload badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded bg-black/75 text-[10px] font-mono text-zinc-300">
                    {video.aspectRatio}
                  </span>
                  {video.isDesktopUpload && (
                    <span className="px-2 py-0.5 rounded bg-purple-900/80 text-[10px] font-medium text-purple-200 border border-purple-500/40">
                      Desktop Upload
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Category and Date (Clean unboxed text) */}
                  <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
                    <span className="text-purple-400 font-medium">{video.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>Adobe Premiere Pro</span>
                  </div>

                  <h3
                    onClick={() => onSelectVideo(video)}
                    className="text-base font-bold text-white hover:text-purple-300 transition-colors cursor-pointer line-clamp-1 mb-2"
                  >
                    {video.title}
                  </h3>

                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                    {video.description}
                  </p>

                  {/* Premiere Pro Effects breakdown */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {video.premiereEffects.slice(0, 3).map((effect, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#161a27] text-zinc-300 border border-[#242b3e]"
                      >
                        {effect}
                      </span>
                    ))}
                    {video.premiereEffects.length > 3 && (
                      <span className="text-[11px] font-mono text-zinc-500 self-center">
                        +{video.premiereEffects.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer Controls: Comments, Likes, Delete */}
                <div className="pt-3 border-t border-[#1a2030] flex items-center justify-between text-xs text-zinc-400">
                  <button
                    type="button"
                    onClick={() => onSelectVideo(video)}
                    className="flex items-center gap-1.5 hover:text-purple-300 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{video.comments?.length || 0} Comments</span>
                  </button>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onLikeVideo(video.id)}
                      className="flex items-center gap-1 hover:text-purple-400 transition-colors"
                      title="Like this video"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span className="font-mono">{video.likes || 0}</span>
                    </button>

                    {session.isAuthenticatedAdmin && video.isDesktopUpload && (
                      <button
                        type="button"
                        onClick={() => onDeleteVideo(video.id)}
                        className="text-zinc-500 hover:text-rose-400 transition-colors"
                        title="Delete uploaded video"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
