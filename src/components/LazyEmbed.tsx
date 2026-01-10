import { useState } from "react";

interface LazyEmbedProps {
  src: string;
  name: string;
}

// Helper function to get YouTube thumbnail
const getYouTubeThumbnail = (url: string): string | null => {
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(youtubeRegex);
  if (match) {
    return `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
  }
  return null;
};

// Helper function to get Google Slides thumbnail
const getGoogleSlidesThumbnail = (url: string): string | null => {
  // For now, let's skip thumbnails for Google Slides and use the fallback design
  // The fallback looks great and is more reliable
  return null;
};

// Helper function to determine embed type and get thumbnail
const getEmbedInfo = (url: string) => {
  const youtubeThumbnail = getYouTubeThumbnail(url);
  if (youtubeThumbnail) {
    return { type: 'youtube', thumbnail: youtubeThumbnail };
  }
  
  const slidesThumbnail = getGoogleSlidesThumbnail(url);
  if (slidesThumbnail) {
    return { type: 'slides', thumbnail: slidesThumbnail };
  }
  
  return { type: 'generic', thumbnail: null };
};

const LazyEmbed = ({ src, name }: LazyEmbedProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
  const embedInfo = getEmbedInfo(src);

  const handleLoadEmbed = () => {
    setIsLoaded(true);
  };

  // If user clicked to load, show the iframe
  if (isLoaded) {
    return (
      <div className="iframe-container">
        <iframe
          src={src}
          frameBorder="0"
          loading="lazy"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  // Show clean preview card
  return (
    <div 
      className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-white/10 hover:border-blue-500/30 rounded-xl p-6 cursor-pointer group transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]"
      onClick={handleLoadEmbed}
    >
      <div className="flex items-center gap-4">
        {/* Icon based on type */}
        <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
          embedInfo.type === 'youtube' 
            ? 'bg-gradient-to-br from-red-600 to-red-700' 
            : embedInfo.type === 'slides'
            ? 'bg-gradient-to-br from-orange-500 to-orange-600'
            : 'bg-gradient-to-br from-blue-500 to-blue-600'
        }`}>
          {embedInfo.type === 'youtube' ? (
            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          ) : embedInfo.type === 'slides' ? (
            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
          ) : (
            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>
            </svg>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="text-sm text-gray-400 mb-1">
            {embedInfo.type === 'youtube' ? 'Video' : embedInfo.type === 'slides' ? 'Presentation' : 'Content'}
          </div>
          <div className="font-semibold text-gray-200 group-hover:text-blue-300 transition-colors line-clamp-1">
            {name}
          </div>
        </div>
        
        {/* Preview button */}
        <div className="flex-shrink-0">
          <div className="px-4 py-2 bg-blue-500/20 group-hover:bg-blue-500/30 border border-blue-500/30 group-hover:border-blue-400/50 text-blue-300 group-hover:text-blue-200 rounded-lg text-sm font-medium transition-all">
            Preview
          </div>
        </div>
      </div>
    </div>
  );
};

export default LazyEmbed;