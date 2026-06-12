<script lang="ts">
    import { page } from '$app/state';
    import type { PageData } from './$types';
    import { marked } from 'marked';

    let { data }: { data: PageData } = $props();
    const file = data.file;

    const isMarkdown = $derived(file?.name.endsWith('.md') || file?.name.endsWith('.markdown'));
    const renderedContent = $derived(file?.content ? marked.parse(file.content, { breaks: true, gfm: true }) : '');
    const title = $derived(file?.name ? file.name.replace(/\.md$|\.markdown$/i, '') : 'Project');

    const jsonLd = $derived({
        "@context": "https://schema.org",
        "@type": "SoftwareSourceCode",
        "name": title,
        "description": `Documentation and details for project ${title}`,
        "url": `${page.url.origin}${page.url.pathname}`,
        "programmingLanguage": isMarkdown ? "Markdown" : "Text"
    });
</script>

<svelte:head>
    <title>{title} | Kolown Projects</title>
    <meta name="description" content="View documentation and notes for {title}. Content retrieved dynamically from GitHub." />
    <link rel="canonical" href="{page.url.origin}{page.url.pathname}" />
    <meta property="og:title" content="{title}" />
    <meta property="og:description" content="Documentation and project details for {title}." />
    <meta property="og:type" content="article" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="{title}" />
    <meta name="twitter:description" content="Documentation for {title}." />
    {@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

<article class="p-4 max-w-[900px] mx-auto">
    <h1 class="text-2xl font-bold mb-4 text-orange-800">{title}</h1>
    
    {#if file.error}
        <div class="text-red-500">{file.error}</div>
    {:else if file.type === "file"}
        {#if isMarkdown}
            <div class="text-gray-300 leading-relaxed prose" itemprop="articleBody">
                {@html renderedContent}
            </div>
        {:else}
            <div class="text-gray-300">
                <pre class="whitespace-pre-wrap">{file.content}</pre>
            </div>
        {/if}
    {:else}
        <p>This is a directory. Please select a file.</p>
    {/if}
</article>

<style>
    /* Add basic styling for the rendered markdown */
    :global(.prose) {
        white-space: pre-wrap;
        word-wrap: break-word;
        font-family: 'Google Sans Code', 'Space Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono", "Courier New", monospace;
    }
    :global(.prose h1) { font-size: 2em; font-weight: bold; margin-top: 0.67em; margin-bottom: 0.67em; }
    :global(.prose h2) { font-size: 1.5em; font-weight: bold; margin-top: 0.83em; margin-bottom: 0.83em; }
    :global(.prose h3) { font-size: 1.17em; font-weight: bold; margin-top: 1em; margin-bottom: 1em; }
    :global(.prose p) { 
        margin-top: 0.2em; 
        margin-bottom: 0.4em;
        line-height: 1.4;
        white-space: pre-wrap;  /* Ensure paragraph spaces are preserved */
    }
    :global(.prose ul), :global(.prose ol) { 
        margin-top: 0.3em; 
        margin-bottom: 0.6em; 
        padding-left: 2em; 
        line-height: 1.2;
    }
    :global(.prose li) { 
        margin-bottom: 0;
        margin-top: 0;
        padding-bottom: 0;
        padding-top: 0;
        line-height: 1;
    }
    :global(.prose li p) {
        margin: 0;
        padding: 0;
        line-height: 1.2;
        display: inline;
    }
    :global(.prose code) { 
        background-color: #f0f0f0; 
        padding: 0.2em 0.4em; 
        border-radius: 3px; 
        font-family: monospace;
        white-space: pre;  /* Preserve exact spacing in code blocks */
    }
    :global(.prose pre) {
        white-space: pre;
        overflow-x: auto;
        padding: 1em;
        background-color: #1e1e1e;
        border-radius: 4px;
    }
    :global(.prose pre code) {
        background-color: transparent;
        padding: 0;
        white-space: pre;
    }
</style>