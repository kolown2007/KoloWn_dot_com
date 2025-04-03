import type { PageServerLoad } from './$types';
import { GITHUB_TOKEN } from '$env/static/private';

export const load: PageServerLoad = async ({ params, fetch }) => {
  let filename = params.filename;
  
  // Add .md extension if not present
  if (!filename.endsWith('.md') && !filename.endsWith('.markdown')) {
    filename = `${filename}.md`;
  }
  
  try {
    // Get the specific file content from GitHub with authentication
    const response = await fetch(`https://api.github.com/repos/kolown2007/Notes/contents/Projects/${filename}?ref=main`, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'SvelteApp'
      }
    });
    
    if (!response.ok) {
      // If .md fails, try .markdown
      if (filename.endsWith('.md')) {
        const markdownFilename = filename.replace('.md', '.markdown');
        const markdownResponse = await fetch(`https://api.github.com/repos/kolown2007/Notes/contents/Projects/${markdownFilename}?ref=main`, {
          headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'SvelteApp'
          }
        });
        
        if (markdownResponse.ok) {
          const markdownData = await markdownResponse.json();
          let content = '';
          if (markdownData.content) {
            content = atob(markdownData.content);
          }
          
          return {
            file: {
              name: markdownData.name,
              path: markdownData.path,
              content: content,
              html_url: markdownData.html_url,
              type: markdownData.type
            }
          };
        }
      }
      
      console.error('GitHub API error:', response.status, await response.text());
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
        error: 'Failed to load file. GitHub API rate limit may have been exceeded.'
      }
    };
  }
};