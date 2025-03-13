<script lang="ts">
    import type { PageData } from './$types';
    import { marked } from 'marked'; // You'll need to install this: npm install marked

    let { data }: { data: PageData } = $props();
    const file = data.file;

    // Process the markdown when file content changes
    const renderedContent = $derived(file?.content ? marked.parse(file.content) : '');
</script>

<div class="p-4 max-w-[900px] mx-auto">
    <!-- <a href="/notes" class="text-blue-500 hover:text-blue-700 mb-4 inline-block">← Back to files</a> -->
    
    <h1 class="text-2xl font-bold mb-4 text-orange-800">{file.name.replace(/\.md$|\.markdown$/i, '')}</h1>
    
    {#if file.error}
        <div class="text-red-500">{file.error}</div>
    {:else if file.type === "file"}
        {#if file.name.endsWith('.md') || file.name.endsWith('.markdown')}
            <div class="text-gray-300 leading-relaxed ">
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
</div>

<style>
    /* Add basic styling for the rendered markdown */
    :global(.prose h1) { font-size: 2em; font-weight: bold; margin-top: 0.67em; margin-bottom: 0.67em; }
    :global(.prose h2) { font-size: 1.5em; font-weight: bold; margin-top: 0.83em; margin-bottom: 0.83em; }
    :global(.prose h3) { font-size: 1.17em; font-weight: bold; margin-top: 1em; margin-bottom: 1em; }
    :global(.prose p) { margin-top: 1em; margin-bottom: 1em; }
    :global(.prose ul, .prose ol) { margin-top: 1em; margin-bottom: 1em; padding-left: 2em; }
    :global(.prose li) { margin-bottom: 0.5em; }
    :global(.prose code) { background-color: #f0f0f0; padding: 0.2em 0.4em; border-radius: 3px; font-family: monospace; }
</style>