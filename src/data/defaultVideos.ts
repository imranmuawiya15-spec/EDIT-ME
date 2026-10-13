import { VideoItem } from '../types';

export const INITIAL_VIDEOS: VideoItem[] = [
  {
    id: 'vid-01',
    title: 'Neon Drift - Hyper Pacing & Sound Design',
    category: 'shorts',
    categoryLabel: 'Shorts & Reels',
    description: 'High-energy vertical reel edit featuring micro-cuts, custom sound effects keyframing, and speed ramping cut entirely inside Adobe Premiere Pro.',
    duration: '0:32',
    aspectRatio: '9:16',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    posterUrl: '/src/assets/images/hero_editor_workspace_1791926265317.jpg',
    premiereEffects: ['Speed Ramping', 'Sound FX Keyframing', 'Dynamic Text Anim', 'Lumetri LUT'],
    tags: ['Reels', 'TikTok', 'Viral Pacing', '9:16'],
    views: 14200,
    likes: 890,
    isDesktopUpload: false,
    uploadedAt: '2026-10-01',
    comments: [
      {
        id: 'c-101',
        authorName: 'Alex Rivera (YouTuber)',
        rating: 5,
        text: 'Muawiya edited this reel and my retention jumped from 48% to 82%! Pacing in Premiere Pro was unreal.',
        createdAt: '3 days ago',
        isVerifiedClient: true,
        adminReply: 'Thanks Alex! Tuned the audio hitpoints to match each cut precisely.'
      },
      {
        id: 'c-102',
        authorName: 'Samantha Wu',
        rating: 5,
        text: 'The sound design sync in the drop is so satisfying. Amazing work!',
        createdAt: '1 week ago',
        isVerifiedClient: true
      }
    ]
  },
  {
    id: 'vid-02',
    title: 'The Coastal Horizon - Cinematic 4K Documentary',
    category: 'cinematic',
    categoryLabel: 'Lumetri Color & Cinematic',
    description: 'Cinematic documentary scene graded with custom Lumetri Color curves, subtle grain overlays, multi-mic dialogue cleaning, and slow cinematic pacing.',
    duration: '1:45',
    aspectRatio: '16:9',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    posterUrl: '/src/assets/images/premiere_timeline_scopes_1791926265587.jpg',
    premiereEffects: ['Lumetri Scopes', 'RGB Curves', 'Audio Spectral Denoise', 'Letterbox Mask'],
    tags: ['Cinematic', 'Color Grading', 'Documentary', '16:9'],
    views: 8940,
    likes: 620,
    isDesktopUpload: false,
    uploadedAt: '2026-09-28',
    comments: [
      {
        id: 'c-201',
        authorName: 'Marcus Vance',
        rating: 5,
        text: 'The skin tones and teal-orange contrast look like an IMAX feature film. Hard to believe 1 year of experience—Muawiya is a natural.',
        createdAt: '5 days ago',
        isVerifiedClient: true
      }
    ]
  },
  {
    id: 'vid-03',
    title: 'Apex Predator - Esports Montage & Beat Sync',
    category: 'gaming',
    categoryLabel: 'Gaming & Fast Montages',
    description: 'Frame-by-frame beat sync montage with motion blur, time-remapping, audio bass drops, and chromatic aberration transitions.',
    duration: '1:12',
    aspectRatio: '16:9',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    posterUrl: '/src/assets/images/hero_editor_workspace_1791926265317.jpg',
    premiereEffects: ['Time Remapping', 'Impact Shake', 'Audio Ducking', 'RGB Split'],
    tags: ['Gaming', 'Beat Sync', 'Montage', 'Premiere Pro'],
    views: 22100,
    likes: 1450,
    isDesktopUpload: false,
    uploadedAt: '2026-09-20',
    comments: [
      {
        id: 'c-301',
        authorName: 'GhostSniper (Streamer)',
        rating: 5,
        text: 'Best $25 I ever spent on video editing. Cut every kill directly on the snare drum beats.',
        createdAt: '2 weeks ago',
        isVerifiedClient: true,
        adminReply: 'Appreciate it brother! Premieres track automation made this punchy.'
      }
    ]
  },
  {
    id: 'vid-04',
    title: 'Aura Studio - Commercial Product Launch',
    category: 'commercial',
    categoryLabel: 'Commercial & Ads',
    description: 'Commercial promo cut for an e-commerce brand. Features Premiere Essential Graphics, smooth whip pans, typography keyframes, and punchy brand pacing.',
    duration: '0:45',
    aspectRatio: '16:9',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    posterUrl: '/src/assets/images/premiere_timeline_scopes_1791926265587.jpg',
    premiereEffects: ['Essential Graphics', 'Whip Transitions', 'Audio Mastering', 'Brand Color Match'],
    tags: ['Commercial', 'Ads', 'Product Launch', 'Brand Video'],
    views: 11400,
    likes: 710,
    isDesktopUpload: false,
    uploadedAt: '2026-09-15',
    comments: [
      {
        id: 'c-401',
        authorName: 'Elena Rostova (Brand Founder)',
        rating: 5,
        text: 'Our ad conversions were 3.4x higher with Muawiya’s cut compared to our previous agency. Fast delivery, polite, highly skilled in Premiere.',
        createdAt: '2 weeks ago',
        isVerifiedClient: true
      }
    ]
  },
  {
    id: 'vid-05',
    title: 'The Creator Blueprint - YouTube Deep Dive',
    category: 'youtube',
    categoryLabel: 'YouTube Longform',
    description: 'Long-form narrative pacing with dynamic zooms, chapter title cards, graphic callouts, B-roll timing, and speech leveling in Premiere Pro.',
    duration: '2:15',
    aspectRatio: '16:9',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    posterUrl: '/src/assets/images/muawiya_editor_portrait_1791926265537.jpg',
    premiereEffects: ['Dynamic Zooms', 'Dialogue Leveler', 'B-Roll Ripple Cuts', 'Lower Thirds'],
    tags: ['YouTube', 'Storytelling', 'Vlog', 'Educational'],
    views: 31000,
    likes: 1980,
    isDesktopUpload: false,
    uploadedAt: '2026-09-08',
    comments: [
      {
        id: 'c-501',
        authorName: 'David K.',
        rating: 5,
        text: 'The pacing never drops for a second. Every visual change has a purpose. Hired Muawiya for all my weekly uploads now.',
        createdAt: '1 month ago',
        isVerifiedClient: true
      }
    ]
  },
  {
    id: 'vid-06',
    title: 'Speed Hook - Viral TikTok Retention Cut',
    category: 'shorts',
    categoryLabel: 'Shorts & Reels',
    description: 'Ultra-fast 15-second opening hook with auto-reframe to 9:16 vertical, subtitle pop animations, and sound effects layering.',
    duration: '0:18',
    aspectRatio: '9:16',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    posterUrl: '/src/assets/images/hero_editor_workspace_1791926265317.jpg',
    premiereEffects: ['Auto Reframe', 'Caption Keyframes', 'Bass Drop SFX', 'Color Pop'],
    tags: ['Viral Hook', 'TikTok', 'Shorts', 'Pacing'],
    views: 45200,
    likes: 3120,
    isDesktopUpload: false,
    uploadedAt: '2026-09-01',
    comments: [
      {
        id: 'c-601',
        authorName: 'Tariq M.',
        rating: 5,
        text: 'Muawiya did this $3 test cut for my TikTok and it immediately gained 60k views. Worth every penny.',
        createdAt: '1 month ago',
        isVerifiedClient: true
      }
    ]
  }
];
