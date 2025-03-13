import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
  const filename = params.filename;
  
  try {
    // Get the specific file content from GitHub
    const response = await fetch(`https://api.github.com/repos/kolown2007/Notes/contents/Projects/${filename}?ref=main`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }
    
    const fileData = await response.json();
    
    // GitHub API returns base64 encoded content for files
    let content = '';
    if (fileData.content) {
      content = atob(fileData.content);
    }
    
    return {
      file: {
        name: fileData.name,
        path: fileData.path,
        content: content,
        html_url: fileData.html_url,
        type: fileData.type
      }
    };
  } catch (error) {
    console.error('Error loading file:', error);
    return {
      file: {
        name: filename,
        error: 'Failed to load file'
      }
    };
  }
};