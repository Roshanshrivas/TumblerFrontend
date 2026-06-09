import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FiHeart, FiMessageCircle, FiShare2, FiVolume2, FiVolumeX, FiPlay, FiPause, FiLoader } from "react-icons/fi";

// Sample reel data – replace with actual video URLs from your customers or brand
const reels = [
  {
    id: 1,
    username: "@roshan_custom",
    videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
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
    username: "@amit_wanders",
    videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_3mb.mp4",
    thumbnail: "https://images.unsplash.com/photo-1610824352934-c10d87b700cc?w=400",
    likes: 2056,
    comments: 123,
    caption: "Stay hydrated in style.",
    music: "Lo-fi beat",
  },
  {
    id: 4,
    username: "@sneha_arts",
    videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    thumbnail: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400",
    likes: 1578,
    comments: 67,
    caption: "My morning companion ☕",
    music: "Jazz vibes",
  },
  {
    id: 5,
    username: "@kunal_tumbler",
    videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_2mb.mp4",
    thumbnail: "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=400",
    likes: 2341,
    comments: 198,
    caption: "Customized for dad ❤️",
    music: "Acoustic",
  },
];

// Single Reel Card Component with animations
const ReelCard = ({ reel, index }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(reel.likes);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const videoRef = useRef(null);
  const cardRef = useRef(null);

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
    setLiked(!liked);
    setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleVideoLoaded = () => setIsVideoLoading(false);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, delay: index * 0.05 } },
  };

  const likeHeartVariants = {
    tapped: { scale: [1, 1.4, 1], transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      whileHover={{ y: -5 }}
      className="relative bg-black rounded-2xl overflow-hidden shadow-xl group aspect-[9/16] w-full"
    >
      {/* Video element */}
      <video
        ref={videoRef}
        src={reel.videoUrl}
        poster={reel.thumbnail}
        className="w-full h-full object-cover"
        loop
        muted={isMuted}
        playsInline
        onLoadedData={handleVideoLoaded}
        onMouseEnter={() => videoRef.current?.play()}
        onMouseLeave={() => {
          videoRef.current?.pause();
          setIsPlaying(false);
        }}
      />

      {/* Loading overlay */}
      {isVideoLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <FiLoader className="text-white text-2xl animate-spin" />
        </div>
      )}

      {/* Overlay controls – appear on hover */}
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
          className="absolute bottom-20 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur flex items-center justify-center text-white hover:bg-black/70 transition"
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
        <motion.button
          onClick={handleLike}
          whileTap="tapped"
          variants={likeHeartVariants}
          className="flex flex-col items-center"
        >
          <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur flex items-center justify-center text-white hover:scale-110 transition">
            <FiHeart className={liked ? "fill-red-500 text-red-500" : ""} size={20} />
          </div>
          <span className="text-white text-xs mt-1">{likesCount}</span>
        </motion.button>
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
    </motion.div>
  );
};

const UGCReels = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 },
    },
  };
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section ref={sectionRef} className="w-full py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-pink-100 text-orange-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            📱 Instagram Reels
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Real People, Real Style
          </h2>
          <p className="text-gray-600 text-lg">
            Watch how our customers customized their tumblers. Hover to play, tap to like.
          </p>
        </motion.div>

        {/* Desktop: Grid */}
        <motion.div
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-5 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {reels.map((reel, idx) => (
            <ReelCard key={reel.id} reel={reel} index={idx} />
          ))}
        </motion.div>

        {/* Mobile: Horizontal scroll carousel (snap) */}
        <div className="block md:hidden">
          <motion.div
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {reels.map((reel, idx) => (
              <div key={reel.id} className="w-[280px] flex-shrink-0 snap-start">
                <ReelCard reel={reel} index={idx} />
              </div>
            ))}
          </motion.div>
          {/* Scroll hint */}
          <motion.div
            className="flex justify-center mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.8 }}
          >
            <span className="text-[10px] text-gray-400">← Swipe to see more →</span>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          <a
            href="https://instagram.com/tumblerco"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105"
          >
            📸 Follow @tumblerco on Instagram
          </a>
          <p className="text-gray-500 text-sm mt-4">
            Tag <span className="font-semibold">#MyTumblerStyle</span> to get featured.
          </p>
        </motion.div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default UGCReels;