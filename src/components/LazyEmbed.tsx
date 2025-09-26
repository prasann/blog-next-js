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

  // Show thumbnail with play button
  return (
    <div className="relative">
      {/* Skeleton loader while thumbnail loads */}
      {!thumbnailLoaded && (
        <div className="w-full bg-gray-700 rounded-lg animate-pulse flex items-center justify-center py-6">
          <div className="text-gray-400">Loading preview...</div>
        </div>
      )}
      
      {/* Thumbnail or fallback */}
      <div 
        className={`relative cursor-pointer group transition-opacity ${!thumbnailLoaded ? 'opacity-0 absolute inset-0' : 'opacity-100'}`}
        onClick={handleLoadEmbed}
      >
        {embedInfo.thumbnail ? (
          <div className="relative w-full bg-gray-800 rounded-lg overflow-hidden" style={{minHeight: '200px'}}>
            <img
              src={embedInfo.thumbnail}
              alt={`${name} preview`}
              className="w-full h-full object-cover"
              onLoad={() => setThumbnailLoaded(true)}
              onError={() => {
                setThumbnailLoaded(true);
                // Fallback to generic preview
              }}
            />
            
            {/* Play/Load overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-30 transition-all">
              <div className="bg-white bg-opacity-90 rounded-full p-4 group-hover:bg-opacity-100 transition-all transform group-hover:scale-110">
                {embedInfo.type === 'youtube' ? (
                  // YouTube play icon
                  <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                ) : (
                  // Slides presentation icon
                  <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12H4.5L7 9.5 9 12zm11-11H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zM4 19V5h16v14H4z"/>
                    <path d="M10.5 13.5L12 12l1.5 1.5L16 10v7H8v-3.5z"/>
                  </svg>
                )}
              </div>
            </div>
            
            {/* Load button text */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-black bg-opacity-70 text-white px-3 py-2 rounded text-sm text-center">
                Preview content
              </div>
            </div>
          </div>
        ) : (
          // Fallback design for all embed types - clean and consistent
          <div 
            className="w-full bg-gray-700 rounded-lg flex items-center justify-center relative group py-6"
            onClick={handleLoadEmbed}
          >
            {/* Set thumbnail loaded when fallback is shown */}
            {(() => { if (!thumbnailLoaded) setThumbnailLoaded(true); return null; })()}
            
            <div className="text-center text-gray-300">
              <div className="mb-3">
                {embedInfo.type === 'slides' ? (
                  // Google Slides icon - using the simple document icon you like
                  <div className="w-12 h-12 mx-auto bg-gray-600 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 2h8l6 6v12c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2zm7 7V3.5L18.5 9H13z"/>
                      <path d="M7 11h10v1H7v-1zm0 2h8v1H7v-1zm0 2h6v1H7v-1z"/>
                    </svg>
                  </div>
                ) : embedInfo.type === 'youtube' ? (
                  // YouTube icon
                  <div className="w-12 h-12 mx-auto bg-red-600 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                ) : (
                  // Generic presentation icon
                  <div className="w-12 h-12 mx-auto bg-gray-600 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 2h8l6 6v12c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2zm7 7V3.5L18.5 9H13z"/>
                    </svg>
                  </div>
                )}
              </div>
              <div className="text-base font-semibold mb-3">{name}</div>
              <div className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg group-hover:bg-blue-500 transition-colors">
                Preview content
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LazyEmbed;