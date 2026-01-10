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
      <div className="card bg-base-200 border border-base-300 animate-pulse">
        <div className="card-body p-4">
          <div className="flex space-x-3">
            <div className="w-16 h-16 bg-base-300 rounded-lg"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-base-300 rounded w-3/4"></div>
              <div className="h-3 bg-base-300 rounded w-full"></div>
              <div className="h-3 bg-base-300 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !metadata) {
    return (
      <div className="text-2xl">
        <a className="link link-primary font-bold" href={url} target="_blank" rel="noopener noreferrer">
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
      className="block group"
    >
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-white/10 hover:border-blue-500/30 rounded-xl p-6 transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]">
        <div className="flex items-center gap-4">
          {/* Blog Icon */}
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="text-sm text-gray-400 mb-1">
              {metadata.siteName}
            </div>
            <div className="font-semibold text-gray-200 group-hover:text-blue-300 transition-colors line-clamp-1">
              {metadata.title}
            </div>
          </div>
          
          {/* Read button */}
          <div className="flex-shrink-0">
            <div className="px-4 py-2 bg-blue-500/20 group-hover:bg-blue-500/30 border border-blue-500/30 group-hover:border-blue-400/50 text-blue-300 group-hover:text-blue-200 rounded-lg text-sm font-medium transition-all">
              Read
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default BlogCard;