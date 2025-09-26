import { useState, useEffect } from "react";

interface BlogCardProps {
  url: string;
  name: string;
}

interface BlogMetadata {
  title: string;
  description: string;
  image?: string;
  siteName?: string;
  url: string;
}

// Helper function to detect blog post URLs
export const isBlogPost = (url: string): boolean => {
  // You can customize this pattern to match your blog domain
  return url.includes('prasanna.dev/posts/') || url.includes('/posts/');
};

const BlogCard = ({ url, name }: BlogCardProps) => {
  const [metadata, setMetadata] = useState<BlogMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // For now, we'll create a mock metadata since fetching actual metadata 
    // would require a backend service to avoid CORS issues
    const fetchMetadata = async () => {
      try {
        // Extract post title from URL for better UX
        const urlParts = url.split('/');
        const slug = urlParts[urlParts.length - 1] || urlParts[urlParts.length - 2];
        const title = slug
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        // Mock metadata - in a real implementation, you'd fetch this from your blog's API
        const mockMetadata: BlogMetadata = {
          title: title || name,
          description: "Read the full blog post for detailed insights and technical deep-dive.",
          image: "/assets/blog-preview.png", // You can add a default blog image
          siteName: "Prasanna's Blog",
          url: url
        };

        setMetadata(mockMetadata);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, [url, name]);

  if (loading) {
    return (
      <div className="bg-gray-700 border border-gray-600 rounded-lg p-4 animate-pulse">
        <div className="flex space-x-3">
          <div className="w-16 h-16 bg-gray-600 rounded-lg"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-600 rounded w-3/4"></div>
            <div className="h-3 bg-gray-600 rounded w-full"></div>
            <div className="h-3 bg-gray-600 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !metadata) {
    return (
      <div className="text-2xl">
        <a className="no-underline font-bold text-blue-400" href={url} target="_blank" rel="noopener noreferrer">
          {name}
        </a>
      </div>
    );
  }

  return (
    <a 
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block no-underline hover:no-underline"
    >
      <div className="bg-gray-700 border border-gray-600 rounded-lg p-4 hover:bg-gray-650 transition-colors group">
        <div className="flex space-x-3">
          {/* Blog icon or image */}
          <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="text-white font-semibold text-sm mb-1 group-hover:text-blue-300 transition-colors">
              {metadata.siteName}
            </div>
            
            <div className="text-blue-400 font-bold text-base mb-2 group-hover:text-blue-300 transition-colors line-clamp-2">
              {metadata.title}
            </div>
            
            <div className="text-gray-300 text-sm line-clamp-2">
              {metadata.description}
            </div>
            
            <div className="text-gray-400 text-xs mt-2 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              Read full post
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default BlogCard;