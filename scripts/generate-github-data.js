// Script to fetch GitHub repository data and save to JSON
// Run this script when you add new repositories to your talks

const fs = require('fs');
const path = require('path');

// Read the talks entries
const entriesPath = path.join(__dirname, '../content/_talks/entries.json');
const entries = JSON.parse(fs.readFileSync(entriesPath, 'utf8'));

// Function to extract GitHub repo info from URL
const extractGitHubInfo = (url) => {
  const match = url.match(/^https:\/\/github\.com\/([^\/]+)\/([^\/]+)\/?$/);
  if (match) {
    return { owner: match[1], repo: match[2] };
  }
  return null;
};

// Function to check if URL is a GitHub repo
const isGitHubRepo = (url) => {
  const githubPattern = /^https:\/\/github\.com\/[^\/]+\/[^\/]+\/?$/;
  return githubPattern.test(url);
};

// Function to fetch GitHub data with delay to avoid rate limiting
const fetchGitHubData = async (owner, repo) => {
  try {
    console.log(`Fetching data for ${owner}/${repo}...`);
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
    
    if (!response.ok) {
      console.error(`Failed to fetch ${owner}/${repo}: ${response.status} ${response.statusText}`);
      return null;
    }
    
    const data = await response.json();
    
    // Return only the data we need
    return {
      name: data.name,
      full_name: data.full_name,
      description: data.description,
      html_url: data.html_url,
      stargazers_count: data.stargazers_count,
      forks_count: data.forks_count,
      language: data.language,
      owner: {
        login: data.owner.login,
        avatar_url: data.owner.avatar_url,
      },
      updated_at: data.updated_at,
      created_at: data.created_at
    };
  } catch (error) {
    console.error(`Error fetching ${owner}/${repo}:`, error);
    return null;
  }
};

// Main function to generate GitHub data
const generateGitHubData = async () => {
  const githubData = {};
  const githubUrls = new Set();
  
  // Extract all GitHub URLs from entries
  entries.forEach(entry => {
    entry.externalLinks.forEach(link => {
      if (isGitHubRepo(link.link)) {
        githubUrls.add(link.link);
      }
    });
  });
  
  console.log(`Found ${githubUrls.size} unique GitHub repositories`);
  
  // Fetch data for each repository
  for (const url of githubUrls) {
    const githubInfo = extractGitHubInfo(url);
    if (githubInfo) {
      const data = await fetchGitHubData(githubInfo.owner, githubInfo.repo);
      if (data) {
        githubData[url] = data;
      }
      
      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  // Save to JSON file
  const outputPath = path.join(__dirname, '../content/_talks/github-data.json');
  fs.writeFileSync(outputPath, JSON.stringify(githubData, null, 2));
  
  console.log(`✅ GitHub data saved to ${outputPath}`);
  console.log(`✅ Generated data for ${Object.keys(githubData).length} repositories`);
};

// Run the script
generateGitHubData().catch(console.error);