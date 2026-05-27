import React, { useState, useRef } from "react";
import { FiHeart, FiMessageCircle, FiShare2, FiVolume2, FiVolumeX, FiPlay, FiPause } from "react-icons/fi";

// Sample reel data – replace with actual video URLs from your customers or brand
const reels = [
  {
    id: 1,
    username: "@roshan_custom",
    videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4", // replace with actual reel video
    thumbnail: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400",
    likes: 1243,
    comments: 87,
    caption: "Designed my own tumbler! 🔥 #MyTumblerStyle",
    music: "Original Audio",
  },
  {
    id: 2,
    username: "@priya_designs",
    videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_2mb.mp4",
    thumbnail: "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=400",
    likes: 892,
    comments: 45,
    caption: "Best gift ever! ✨",
    music: "Satisfying sounds",
  },
  {
    id: 3,
    username: "@priya_designs",
    videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_2mb.mp4",
    thumbnail: "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=400",
    likes: 892,
    comments: 45,
    caption: "Best gift ever! ✨",
    music: "Satisfying sounds",
  },
  {
    id: 4,
    username: "@amit_wanders",
    videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_3mb.mp4",
    thumbnail: "https://images.unsplash.com/photo-1610824352934-c10d87b700cc?w=400",
    likes: 2056,
    comments: 123,
    caption: "Stay hydrated in style.",
    music: "Lo-fi beat",
  },
  {
    id: 5,
    username: "@Amit_wanders",
    videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_3mb.mp4",
    thumbnail: "https://images.unsplash.com/photo-1610824352934-c10d87b700cc?w=400",
    likes: 2026,
    comments: 223,
    caption: "Stay hydrated in style.",
    music: "Lo-fi beat",
  },
];

const ReelCard = ({ reel }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(reel.likes);
  const videoRef = useRef(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="relative bg-black rounded-2xl overflow-hidden shadow-xl group aspect-[9/16]">
      {/* Video */}
      <video
        ref={videoRef}
        src={reel.videoUrl}
        poster={reel.thumbnail}
        className="w-full h-full object-cover"
        loop
        muted={isMuted}
        playsInline
        onMouseEnter={() => videoRef.current?.play()}
        onMouseLeave={() => {
          videoRef.current?.pause();
          setIsPlaying(false);
        }}
      />

      {/* Overlay controls */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {/* Play/Pause button */}
        <button
          onClick={handlePlayPause}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/40 transition"
        >
          {isPlaying ? <FiPause size={24} /> : <FiPlay size={24} />}
        </button>

        {/* Mute/Unmute */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute bottom-20 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur flex items-center justify-center text-white"
        >
          {isMuted ? <FiVolumeX size={14} /> : <FiVolume2 size={14} />}
        </button>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
        <p className="text-white text-sm font-semibold">{reel.username}</p>
        <p className="text-white text-xs line-clamp-2">{reel.caption}</p>
        <p className="text-white/70 text-xs mt-1">♬ {reel.music}</p>
      </div>

      {/* Right side engagement bar */}
      <div className="absolute right-2 bottom-20 flex flex-col items-center gap-4">
        <button onClick={handleLike} className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur flex items-center justify-center text-white hover:scale-110 transition">
            <FiHeart className={liked ? "fill-red-500 text-red-500" : ""} size={20} />
          </div>
          <span className="text-white text-xs mt-1">{likesCount}</span>
        </button>
        <button className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur flex items-center justify-center text-white">
            <FiMessageCircle size={20} />
          </div>
          <span className="text-white text-xs mt-1">{reel.comments}</span>
        </button>
        <button className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur flex items-center justify-center text-white">
            <FiShare2 size={20} />
          </div>
        </button>
      </div>
    </div>
  );
};

const UGCReels = () => {
  return (
    <section className="w-full py-16 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-pink-100 text-orange-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            📱 Instagram Reels
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Real People, Real Style
          </h2>
          <p className="text-gray-600 text-lg">
            Watch how our customers customized their tumblers. Hover to play, tap to like.
          </p>
        </div>

        {/* Reels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {reels.map((reel) => (
            <ReelCard key={reel.id} reel={reel} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <a
            href="https://instagram.com/tumblerco"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition"
          >
            📸 Follow @tumblerco on Instagram
          </a>
          <p className="text-gray-500 text-sm mt-4">
            Tag <span className="font-semibold">#MyTumblerStyle</span> to get featured.
          </p>
        </div>
      </div>
    </section>
  );
};

export default UGCReels;