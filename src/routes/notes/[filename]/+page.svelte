<script lang="ts">
  import { page } from '$app/state';
  import type { PageData } from './$types';
  import { marked } from 'marked';

  let { data }: { data: PageData } = $props();
  const file = data.file;

  const isMarkdown = $derived(file?.name?.endsWith('.md') || file?.name?.endsWith('.markdown'));
  const frontmatter = $derived(file?.frontmatter ?? {});
  const renderedContent = $derived(file?.body ? marked.parse(file.body, { breaks: true, gfm: true }) : '');
  const title = $derived(
    frontmatter.title ||
    (file?.name ? file.name.replace(/\.md$|\.markdown$/i, '') : 'Note')
  );

  const metaDescription = $derived(
    frontmatter.description ||
    `Notes and observations for ${title}.`
  );

  const jsonLd = $derived({
    '@context': 'https://schema.org',
    '@type': 'Article',
    name: title,
    description: metaDescription,
    url: `${page.url.origin}${page.url.pathname}`,
    datePublished: frontmatter.date || undefined,
    dateModified: frontmatter.lastmod || frontmatter.date || undefined,
    keywords: Array.isArray(frontmatter.tags) ? frontmatter.tags.join(', ') : undefined
  });
</script>

<svelte:head>
  <title>{title} | Notes</title>
  <meta name="description" content={metaDescription} />
  <link rel="canonical" href="{page.url.origin}{page.url.pathname}" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={metaDescription} />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={metaDescription} />
  {@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

<article class="mx-auto max-w-[900px] p-4 text-white">
  {#if file.error}
    <div class="text-red-500">{file.error}</div>
  {:else if file.type === 'file'}
    <header class="mb-8 border-b border-neutral-800 pb-6">
      <p class="mb-2 text-xs uppercase tracking-[0.2em] text-orange-400">Note</p>
      <h1 class="text-3xl font-bold text-orange-300">{title}</h1>

      {#if frontmatter.date || frontmatter.lastmod}
        <p class="mt-3 text-sm text-neutral-400">
          {frontmatter.date ? `Published ${frontmatter.date}` : ''}
          {frontmatter.lastmod && frontmatter.date !== frontmatter.lastmod ? ` · Updated ${frontmatter.lastmod}` : ''}
        </p>
      {/if}

      {#if Array.isArray(frontmatter.topics) && frontmatter.topics.length}
        <div class="mt-4 flex flex-wrap gap-2">
          {#each frontmatter.topics as topic}
            <span class="rounded-full border border-neutral-700 bg-neutral-900 px-2 py-1 text-xs uppercase tracking-wide text-neutral-300">
              {topic}
            </span>
          {/each}
        </div>
      {/if}
    </header>

    {#if isMarkdown}
      <div class="prose max-w-none text-neutral-200">
        {@html renderedContent}
      </div>
    {:else}
      <pre class="overflow-x-auto whitespace-pre-wrap text-sm text-neutral-300">{file.content}</pre>
    {/if}
  {:else}
    <p>This is a directory. Please select a note.</p>
  {/if}
</article>

<style>
  :global(.prose) {
    white-space: pre-wrap;
    word-wrap: break-word;
    font-family: 'Google Sans Code', 'Space Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, 'Roboto Mono', 'Courier New', monospace;
  }

  :global(.prose h1),
  :global(.prose h2),
  :global(.prose h3),
  :global(.prose h4) {
    color: #fbbf24;
    margin-top: 1.5em;
    margin-bottom: 0.75em;
    font-weight: 700;
  }

  :global(.prose p),
  :global(.prose li),
  :global(.prose blockquote) {
    color: #e5e5e5;
    line-height: 1.7;
  }

  :global(.prose a) {
    color: #fca5a5;
    text-decoration: underline;
  }

  :global(.prose code) {
    background: rgba(255, 255, 255, 0.06);
    padding: 0.15em 0.4em;
    border-radius: 0.25rem;
    color: #fef3c7;
  }

  :global(.prose pre) {
    background: #111827;
    border: 1px solid #374151;
    border-radius: 0.5rem;
    overflow-x: auto;
    padding: 1rem;
  }
</style>
