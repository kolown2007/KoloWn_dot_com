<script lang="ts">
    import type { PageData } from './$types';
    import { marked } from 'marked';

    let { data }: { data: PageData } = $props();
    const file = data.file;

  
    marked.setOptions({
        breaks: true,      // Convert line breaks to <br>
        gfm: true         // GitHub Flavored Markdown
    });

    // Process the markdown when file content changes
    const renderedContent = $derived(file?.content ? marked.parse(file.content) : '');
</script>

<div class="p-4 max-w-[900px] mx-auto">
    <h1 class="text-2xl font-bold mb-4 text-orange-800">{file.name.replace(/\.md$|\.markdown$/i, '')}</h1>
    
    {#if file.error}
        <div class="text-red-500">{file.error}</div>
    {:else if file.type === "file"}
        {#if file.name.endsWith('.md') || file.name.endsWith('.markdown')}
            <!-- Added the 'prose' class here -->
            <div class="text-gray-300 leading-relaxed prose">
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
    :global(.prose) {
        white-space: pre-wrap;  /* Preserve spaces and line breaks */
        word-wrap: break-word;
    }
    :global(.prose h1) { font-size: 2em; font-weight: bold; margin-top: 0.67em; margin-bottom: 0.67em; }
    :global(.prose h2) { font-size: 1.5em; font-weight: bold; margin-top: 0.83em; margin-bottom: 0.83em; }
    :global(.prose) { font-family: 'Google Sans Code', 'Space Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono", "Courier New", monospace; }
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
    }
    :global(.prose li) { margin-bottom: 0; }
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