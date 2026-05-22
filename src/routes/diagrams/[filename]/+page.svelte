<script lang="ts">
    import type { PageData } from './$types';
    import { onMount, tick } from 'svelte';
    import { marked } from 'marked';
    import mermaid from 'mermaid';

    let { data }: { data: PageData } = $props();
    const file = data.file;

    const isMarkdown = $derived(file?.name.endsWith('.md') || file?.name.endsWith('.markdown'));

    const renderer = new marked.Renderer();
    renderer.code = ({ text, lang }) => {
        if (lang === 'mermaid') {
            return `<pre class="mermaid">${text}</pre>`;
        }

        const languageClass = lang ? ` class="language-${lang}"` : '';
        return `<pre><code${languageClass}>${text}</code></pre>`;
    };

    const renderedContent = $derived(
        file?.content ? marked.parse(file.content, { breaks: true, gfm: true, renderer }) : ''
    );

    const renderMermaidDiagrams = async () => {
        await tick();
        const diagramNodes = Array.from(document.querySelectorAll<HTMLElement>('.prose pre.mermaid'));
        if (diagramNodes.length === 0) {
            return;
        }

        await mermaid.run({ nodes: diagramNodes });
    };

    onMount(() => {
        mermaid.initialize({
            startOnLoad: false,
            theme: 'base',
            themeVariables: {
                background: 'transparent',
                primaryTextColor: '#ffffff',
                secondaryTextColor: '#ffffff',
                tertiaryTextColor: '#ffffff',
                nodeTextColor: '#ffffff',
                lineColor: '#ffffff',
                textColor: '#ffffff'
            }
        });
        void renderMermaidDiagrams();
    });

    $effect(() => {
        renderedContent;
        void renderMermaidDiagrams();
    });
</script>

<div class="p-4 max-w-screen mx-auto">
    <h1 class="text-2xl font-bold mb-4 text-orange-800">{file.name.replace(/\.md$|\.markdown$/i, '')}</h1>
    
    {#if file.error}
        <div class="text-red-500">{file.error}</div>
    {:else if file.type === "file"}
        {#if isMarkdown}
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
    :global(.prose pre.mermaid),
    :global(.prose pre.mermaid svg) {
        background: transparent !important;
        color: #ffffff !important;
    }
    :global(.prose pre.mermaid svg text),
    :global(.prose pre.mermaid svg tspan),
    :global(.prose pre.mermaid svg .label),
    :global(.prose pre.mermaid svg .nodeLabel),
    :global(.prose pre.mermaid svg .edgeLabel) {
        fill: #ffffff !important;
        color: #ffffff !important;
    }
    :global(.prose pre.mermaid svg foreignObject),
    :global(.prose pre.mermaid svg foreignObject div),
    :global(.prose pre.mermaid svg foreignObject span),
    :global(.prose pre.mermaid svg foreignObject p) {
        color: #ffffff !important;
        fill: #ffffff !important;
    }
</style>