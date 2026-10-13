import React, { useState, useRef } from 'react';
import { VideoItem, VideoCategory, AspectRatioType } from '../types';
import { Upload, X, Film, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (newVideo: VideoItem, fileBlob?: Blob) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onUpload,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<VideoCategory>('shorts');
  const [aspectRatio, setAspectRatio] = useState<AspectRatioType>('9:16');
  const [description, setDescription] = useState('');
  const [effectsInput, setEffectsInput] = useState('Lumetri Color, Dynamic Cuts, Sound Keyframes');
  const [tagsInput, setTagsInput] = useState('Reels, Viral, Premiere Pro');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [durationStr, setDurationStr] = useState<string>('0:30');
  const [errorMsg, setErrorMsg] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      setErrorMsg('Please select a valid video file (.mp4, .mov, .webm, etc.)');
      return;
    }

    setErrorMsg('');
    setVideoFile(file);
    const objUrl = URL.createObjectURL(file);
    setPreviewUrl(objUrl);

    // Auto-detect title from filename
    if (!title) {
      const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      setTitle(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const dur = Math.round(videoRef.current.duration);
      const minutes = Math.floor(dur / 60);
      const seconds = dur % 60;
      setDurationStr(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);

      // Auto detect aspect ratio
      const width = videoRef.current.videoWidth;
      const height = videoRef.current.videoHeight;
      if (height > width) {
        setAspectRatio('9:16');
        setCategory('shorts');
      } else {
        setAspectRatio('16:9');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile && !previewUrl) {
      setErrorMsg('Please select a video file from your desktop.');
      return;
    }
    if (!title.trim()) {
      setErrorMsg('Please enter a project title.');
      return;
    }

    setIsProcessing(true);
    setErrorMsg('');

    try {
      const categoryLabels: Record<VideoCategory, string> = {
        all: 'All',
        shorts: 'Shorts & Reels',
        youtube: 'YouTube Longform',
        cinematic: 'Lumetri Color & Cinematic',
        gaming: 'Gaming & Montages',
        commercial: 'Commercial & Ads',
        desktop_upload: 'Desktop Uploads',
      };

      const effects = effectsInput
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const tags = tagsInput
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const newVideoItem: VideoItem = {
        id: `desktop-vid-${Date.now()}`,
        title: title.trim(),
        category,
        categoryLabel: categoryLabels[category] || 'Custom Upload',
        description: description.trim() || 'Custom video preview cut in Adobe Premiere Pro by Muawiya.',
        duration: durationStr,
        aspectRatio,
        videoUrl: previewUrl,
        posterUrl: '/src/assets/images/hero_editor_workspace_1791926265317.jpg',
        premiereEffects: effects.length > 0 ? effects : ['Premiere Pro Timeline', 'Audio Mastering'],
        tags: tags.length > 0 ? tags : ['Portfolio', 'Desktop Upload'],
        views: 1,
        likes: 0,
        comments: [],
        isDesktopUpload: true,
        uploadedAt: new Date().toISOString().split('T')[0],
      };

      onUpload(newVideoItem, videoFile || undefined);
      setIsProcessing(false);
      onClose();
    } catch (err) {
      setErrorMsg('Failed to process video upload. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0e111a] border border-[#23293d] rounded-2xl shadow-2xl p-6 sm:p-8 my-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-8 h-8 rounded-lg bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
            <Upload className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Upload Preview from Desktop</h2>
            <p className="text-xs text-zinc-400">
              Muawiya Admin Studio · Add your own Premiere Pro project preview
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* File Picker Zone */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-2">
              Select Video File (.mp4, .mov, .webm)
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="hidden"
            />
            
            {previewUrl ? (
              <div className="p-4 bg-[#141825] border border-purple-500/40 rounded-xl">
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="text-zinc-300 font-medium truncate max-w-xs">
                    {videoFile?.name || 'Selected video preview'}
                  </span>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-purple-400 hover:text-purple-300 font-semibold"
                  >
                    Change File
                  </button>
                </div>
                <div className="aspect-video max-h-48 rounded-lg overflow-hidden bg-black flex items-center justify-center">
                  <video
                    ref={videoRef}
                    src={previewUrl}
                    controls
                    onLoadedMetadata={handleLoadedMetadata}
                    className="max-h-48 w-full object-contain"
                  />
                </div>
                <div className="mt-2 text-[11px] text-zinc-400 flex items-center justify-between">
                  <span>Detected Duration: {durationStr}</span>
                  <span>Format: {aspectRatio}</span>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#262e45] hover:border-purple-500/60 rounded-xl p-8 text-center cursor-pointer bg-[#121623] hover:bg-[#161c2d] transition-all"
              >
                <Film className="w-10 h-10 mx-auto text-purple-400 mb-3" />
                <p className="text-sm font-semibold text-white">Click to browse desktop files</p>
                <p className="text-xs text-zinc-400 mt-1">
                  Upload MP4, MOV, or WEBM clips directly from your computer
                </p>
              </div>
            )}
          </div>

          {/* Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Preview Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Cinematic Travel Vlog Grade"
                required
                className="w-full bg-[#141824] border border-[#262d42] rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Gallery Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as VideoCategory)}
                className="w-full bg-[#141824] border border-[#262d42] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
              >
                <option value="shorts">Shorts & Reels (9:16)</option>
                <option value="youtube">YouTube Longform (16:9)</option>
                <option value="cinematic">Lumetri Color & Cinematic</option>
                <option value="gaming">Gaming & Montages</option>
                <option value="commercial">Commercial & Ads</option>
              </select>
            </div>
          </div>

          {/* Aspect Ratio and Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Aspect Ratio
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setAspectRatio('16:9')}
                  className={`py-2 text-xs font-medium rounded-lg border transition-all ${
                    aspectRatio === '16:9'
                      ? 'bg-purple-600 border-purple-500 text-white'
                      : 'bg-[#141824] border-[#262d42] text-zinc-400'
                  }`}
                >
                  16:9 (Horizontal)
                </button>
                <button
                  type="button"
                  onClick={() => setAspectRatio('9:16')}
                  className={`py-2 text-xs font-medium rounded-lg border transition-all ${
                    aspectRatio === '9:16'
                      ? 'bg-purple-600 border-purple-500 text-white'
                      : 'bg-[#141824] border-[#262d42] text-zinc-400'
                  }`}
                >
                  9:16 (Vertical)
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Duration Display
              </label>
              <input
                type="text"
                value={durationStr}
                onChange={(e) => setDurationStr(e.target.value)}
                placeholder="0:45"
                className="w-full bg-[#141824] border border-[#262d42] rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Premiere Pro Effects tags */}
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Premiere Pro Effects / Techniques (comma separated)
            </label>
            <input
              type="text"
              value={effectsInput}
              onChange={(e) => setEffectsInput(e.target.value)}
              placeholder="Lumetri Color, Warp Stabilizer, Speed Ramping, Audio Ducking"
              className="w-full bg-[#141824] border border-[#262d42] rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Project Description & Highlights
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief explanation of the project, cutting pacing, client brief, or Premiere techniques used..."
              className="w-full bg-[#141824] border border-[#262d42] rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1e2538]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="px-5 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg shadow-md shadow-purple-900/40 transition-colors disabled:opacity-50"
            >
              {isProcessing ? 'Processing Preview...' : 'Publish to Portfolio'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
