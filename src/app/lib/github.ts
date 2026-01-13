// lib/github.ts
// GitHub API integration for fetching user stats, repos, and activity

export interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  updated_at: string;
  pushed_at: string;
  created_at:string |number
}

export interface GitHubStats {
  totalCommits: number;
  totalStars: number;
  topLanguages: { [key: string]: number };
  activeRepos: number;
  contributionYears: number;
}

export interface GitHubActivity {
  commits: CommitActivity[];
  contributionGraph: number[];
}

export interface CommitActivity {
  date: string;
  count: number;
}

const GITHUB_API = 'https://api.github.com';
const USERNAME = 'ANSHSINGH050404'; // Replace with actual username

// Cache duration: 1 hour
const CACHE_DURATION = 3600;

/**
 * Fetches GitHub user data
 */
export async function getGitHubUser(): Promise<GitHubUser> {
  const res = await fetch(`${GITHUB_API}/users/${USERNAME}`, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
    },
    next: { revalidate: CACHE_DURATION }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch GitHub user');
  }

  return res.json();
}

/**
 * Fetches user's repositories sorted by stars
 */
export async function getGitHubRepos(limit = 6): Promise<GitHubRepo[]> {
  const res = await fetch(
    `${GITHUB_API}/users/${USERNAME}/repos?sort=stars&per_page=${limit}&type=owner`,
    {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
      next: { revalidate: CACHE_DURATION }
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch GitHub repos');
  }

  return res.json();
}

/**
 * Calculates GitHub statistics from user data and repos
 */
export async function getGitHubStats(): Promise<GitHubStats> {
  const repos = await fetch(
    `${GITHUB_API}/users/${USERNAME}/repos?per_page=100&type=owner`,
    {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
      next: { revalidate: CACHE_DURATION }
    }
  ).then(r => r.json());

  // Calculate total stars
  const totalStars = repos.reduce(
    (acc: number, repo: GitHubRepo) => acc + repo.stargazers_count,
    0
  );

  // Calculate language distribution
  const languages: { [key: string]: number } = {};
  repos.forEach((repo: GitHubRepo) => {
    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1;
    }
  });

  // Sort languages by count
  const topLanguages = Object.entries(languages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .reduce((acc, [lang, count]) => ({ ...acc, [lang]: count }), {});

  // Count active repos (updated in last 6 months)
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const activeRepos = repos.filter(
    (repo: GitHubRepo) => new Date(repo.updated_at) > sixMonthsAgo
  ).length;

  // Estimate total commits (simplified - would need GraphQL for exact count)
  const totalCommits = repos.length * 50; // Rough estimate

  // Calculate years of contribution
  const oldestRepo = repos.reduce((oldest: GitHubRepo, repo: GitHubRepo) => {
    return new Date(repo.created_at) < new Date(oldest.created_at) ? repo : oldest;
  }, repos[0]);
  
  const contributionYears = oldestRepo 
    ? new Date().getFullYear() - new Date(oldestRepo.created_at).getFullYear()
    : 1;

  return {
    totalCommits,
    totalStars,
    topLanguages,
    activeRepos,
    contributionYears,
  };
}

/**
 * Generates mock contribution data for visualization
 * In production, use GitHub GraphQL API for real contribution graph
 */
export function getMockContributions(days = 365): number[] {
  const contributions: number[] = [];
  for (let i = 0; i < days; i++) {
    // Create realistic contribution pattern with peaks and valleys
    const baseActivity = Math.random() > 0.3 ? Math.floor(Math.random() * 15) : 0;
    contributions.push(baseActivity);
  }
  return contributions;
}
