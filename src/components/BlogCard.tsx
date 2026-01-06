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
      className="block"
    >
      <div className="card bg-base-200 border border-base-300 hover:bg-base-300 transition-colors">
        <div className="card-body p-4">
          <div className="flex space-x-3">
            {/* Blog icon or image */}
            <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-8 h-8 text-primary-content" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="text-base-content font-semibold text-sm mb-1">
                {metadata.siteName}
              </div>
              
              <div className="card-title text-primary text-base mb-2 line-clamp-2">
                {metadata.title}
              </div>
              
              <div className="text-base-content/70 text-sm line-clamp-2">
                {metadata.description}
              </div>
              
              <div className="text-base-content/50 text-xs mt-2 flex items-center">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                Read full post
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default BlogCard;