import type { PageServerLoad } from './$types';
import { GITHUB_TOKEN } from '$env/static/private';

export const load: PageServerLoad = async ({ fetch }) => {
  try {
    // Make API requests with authentication
    const response = await fetch('https://api.github.com/repos/kolown2007/Notes/contents/Projects?ref=main', {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'YourAppName'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GitHub API error:', response.status, errorText);
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      data
    };
  } catch (error) {
    console.error('Error fetching repository data:', error);
    return {
      data: [],
      error: 'Failed to load repository data. Please try again later.'
    };
  }
};