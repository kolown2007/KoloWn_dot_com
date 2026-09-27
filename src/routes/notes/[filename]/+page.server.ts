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

function coerceValue(value: string) {
  const trimmed = value.trim();

  if (trimmed === '') return '';
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  if (!Number.isNaN(Number(trimmed)) && trimmed !== '') return Number(trimmed);

  return trimmed;
}

function parseFrontmatter(content: string) {
  const match = content.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n)?/);

  if (!match) {
    return { body: content, frontmatter: {} as Record<string, any> };
  }

  const block = match[1];
  const body = content.slice(match[0].length);

  try {
    const parsedYaml = parseYaml(block);
    if (parsedYaml && typeof parsedYaml === 'object') {
      return { body, frontmatter: parsedYaml as Record<string, any> };
    }
  } catch {
    // Fall back to a forgiving parser for tab-delimited or list-style frontmatter.
  }

  const frontmatter: Record<string, any> = {};
  const lines = block.split(/\r?\n/);
  let currentKey: string | null = null;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    const keySeparatorIndex = line.indexOf(':');
    const tabSeparatorIndex = line.indexOf('\t');

    if (keySeparatorIndex !== -1 || tabSeparatorIndex !== -1) {
      const separatorIndex = keySeparatorIndex === -1 ? tabSeparatorIndex : keySeparatorIndex;
      const key = line.slice(0, separatorIndex).trim();
      const value = line.slice(separatorIndex + 1).trim();

      currentKey = key;

      if (key === 'topics' || key === 'tags') {
        frontmatter[key] = value ? [coerceValue(value)] : [];
      } else {
        frontmatter[key] = value ? coerceValue(value) : '';
      }

      continue;
    }

    if (currentKey) {
      const key = currentKey;
      if (!Array.isArray(frontmatter[key])) {
        frontmatter[key] = [];
      }
      frontmatter[key].push(line.trim());
      continue;
    }

    const fallbackMatch = line.match(/^([A-Za-z0-9_\-]+)\s*(?:\t|\s+)\s*(.*)$/);
    if (fallbackMatch) {
      const [, key, value] = fallbackMatch;
      currentKey = key;
      frontmatter[key] = value ? coerceValue(value) : '';
    }
  }

  return { body, frontmatter };
}

export const load: PageServerLoad = async ({ params, fetch }) => {
  let filename = params.filename;

  if (!filename.endsWith('.md') && !filename.endsWith('.markdown')) {
    filename = `${filename}.md`;
  }

  const candidatePaths = [
    `notes/${filename}`,
    `Notes/${filename}`,
    `notes/${filename.replace(/\.md$/i, '.markdown')}`,
    `Notes/${filename.replace(/\.md$/i, '.markdown')}`
  ];

  for (const repoPath of candidatePaths) {
    try {
      const response = await fetch(`https://api.github.com/repos/kolown2007/Notes/contents/${repoPath}?ref=main`, {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
          'User-Agent': 'SvelteApp'
        }
      });

      if (!response.ok) continue;

      const fileData = await response.json();

      if (!fileData || fileData.type !== 'file' || !fileData.content) {
        continue;
      }

      const content = decodeGithubContent(fileData.content);
      const { body, frontmatter } = parseFrontmatter(content);

      return {
        file: {
          name: fileData.name,
          path: fileData.path,
          content,
          body,
          frontmatter,
          html_url: fileData.html_url,
          type: fileData.type
        }
      };
    } catch (error) {
      console.error('Error fetching note from GitHub:', error);
    }
  }

  return {
    file: {
      name: filename,
      error: 'Failed to load note. GitHub API rate limit may have been exceeded.'
    }
  };
};
