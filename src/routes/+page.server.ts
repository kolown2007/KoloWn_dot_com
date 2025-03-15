import type { PageServerLoad } from './$types';
import { GITHUB_TOKEN } from '$env/static/private';

interface Project {
  title: string;
  featureimage: string;
  url: string;
}

export const load: PageServerLoad = async ({ fetch }) => {
  try {
    const response = await fetch('https://api.github.com/repos/kolown2007/Notes/contents/Projects/projects.json?ref=main', {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'SvelteApp'
      }
    });
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const fileData = await response.json();
    const projects: { projects: Project[] } = JSON.parse(atob(fileData.content));
    
    // Transform data to match frontend expectations
    const transformedProjects = projects.projects.map(project => ({
      title: project.title,
      featuredImage: project.featureimage,
      url: project.url
    }));
    
    return { files: transformedProjects };

  } catch (error) {
    console.error('Error fetching project data:', error);
    return {
      files: [],
      error: 'Failed to load project data.'
    };
  }
};