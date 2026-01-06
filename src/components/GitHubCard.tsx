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
    <div key={name} className="my-4">
      <div className="card bg-base-200 border border-base-300 hover:bg-base-300 transition-colors">
        <div className="card-body p-4">
          <div className="flex items-start space-x-3">
            <img 
              src={repoData.owner.avatar_url} 
              alt={repoData.owner.login}
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
                <a 
                  href={repoData.html_url}
                  className="link link-primary font-semibold text-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repoData.full_name}
                </a>
              </div>
              
              {repoData.description && (
                <p className="text-base-content/80 text-sm mb-3">
                  {repoData.description}
                </p>
              )}
              
              <div className="flex items-center space-x-4 text-xs text-base-content/60">
                {repoData.language && (
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <span>{repoData.language}</span>
                  </div>
                )}
                
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>{repoData.stargazers_count}</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414L2.586 7a2 2 0 010-2.828l3.707-3.707a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{repoData.forks_count}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitHubCard;