import type { PageServerLoad } from './$types';
import { GITHUB_TOKEN } from '$env/static/private';
import { parse as parseYaml } from 'yaml';

function decodeGithubContent(content: string): string {
  const binaryString = atob(content);
  const bytes = new Uint8Array(binaryString.length);

  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return new TextDecoder('utf-8').decode(bytes);
}

function parseFrontmatter(content: string) {
  const match = content.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n)?/);

  if (!match) return {} as Record<string, any>;

  const block = match[1];

  try {
    const parsed = parseYaml(block);
    if (parsed && typeof parsed === 'object') {
      return parsed as Record<string, any>;
    }
  } catch {
    // ignore parse issues and fall back to the filename title
  }

  return {} as Record<string, any>;
}

export const load: PageServerLoad = async ({ fetch }) => {
  const repoPath = 'Projects';

  try {
    const response = await fetch(`https://api.github.com/repos/kolown2007/Notes/contents/${repoPath}?ref=main`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'SvelteApp'
      }
    });

    if (!response.ok) {
      return { projects: [] };
    }

    const entries = await response.json();
    const files = Array.isArray(entries) ? entries.filter((item: any) => item.type === 'file') : [];

    const projects = await Promise.all(
      files
        .filter((item: any) => /\.(md|markdown)$/i.test(item.name))
        .map(async (item: any) => {
          try {
            const fileResponse = await fetch(item.url, {
              headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
                Accept: 'application/vnd.github.v3+json',
                'User-Agent': 'SvelteApp'
              }
            });

            if (!fileResponse.ok) return null;

            const fileData = await fileResponse.json();
            const markdown = decodeGithubContent(fileData.content || '');
            const frontmatter = parseFrontmatter(markdown);
            const title = frontmatter.title || item.name.replace(/\.(md|markdown)$/i, '');

            return {
              title,
              url: `/projects/${encodeURIComponent(item.name.replace(/\.(md|markdown)$/i, ''))}`,
              name: item.name
            };
          } catch {
            return null;
          }
        })
    );

    return {
      projects: projects.filter((project): project is { title: string; url: string; name: string } => Boolean(project))
        .sort((a, b) => a.title.localeCompare(b.title))
    };
  } catch (error) {
    console.error('Error loading projects index:', error);
    return { projects: [] };
  }
};
