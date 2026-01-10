// Import the cached GitHub data directly (same pattern as entries.json)
import githubData from "../../content/_talks/github-data.json";

// Helper function to extract owner and repo from GitHub URL
const extractGitHubInfo = (url: string): { owner: string; repo: string } | null => {
  const match = url.match(/^https:\/\/github\.com\/([^\/]+)\/([^\/]+)\/?$/);
  if (match) {
    return { owner: match[1], repo: match[2] };
  }
  return null;
};

// Interface for GitHub repository data
interface GitHubRepoData {
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface GitHubCardProps {
  url: string;
  name: string;
}

// Component for rendering GitHub repository cards
const GitHubCard = ({ url, name }: GitHubCardProps) => {
  const githubInfo = extractGitHubInfo(url);
  
  // Get repository data from statically imported JSON
  const repoData = githubData[url as keyof typeof githubData] as GitHubRepoData | undefined;

  if (!githubInfo || !repoData) {
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
      href={repoData.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-white/10 hover:border-blue-500/30 rounded-xl p-4 transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]">
        <div className="flex items-start gap-3">
          {/* GitHub Icon */}
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 border border-white/10 flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </div>
          
          <div className="flex-1 min-w-0">
            {/* Repository name with hover effect */}
            <div className="font-semibold text-blue-300 group-hover:text-blue-200 mb-1 transition-colors">
              {repoData.full_name}
            </div>
            
            {/* Description */}
            {repoData.description && (
              <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                {repoData.description}
              </p>
            )}
            
            {/* Stats row */}
            <div className="flex items-center gap-4 text-xs text-gray-500">
              {repoData.language && (
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-400"></div>
                  <span>{repoData.language}</span>
                </div>
              )}
              
              <div className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>{repoData.stargazers_count}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414L2.586 7a2 2 0 010-2.828l3.707-3.707a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>{repoData.forks_count}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default GitHubCard;