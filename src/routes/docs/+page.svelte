<script lang="ts">
    import type { PageData } from './$types';
    export let data: PageData;
 

  
</script>

<svelte:head>
    <title>KoloWn : Docs</title>
</svelte:head>

<main class=" font-mono mx-auto px-4 py-5 max-w-2xl text-white text-lg leading-relaxed ">
<h1 class="text-xl text-red-600">Docs</h1>
&nbsp;
<p class ="text-red-800"> installation instructions for works listed below:</p>
&nbsp;
{#each data.slugs as slug (slug)}
<li><a href={"/docs/" + slug}>{slug}</a></li>
{/each}

</main> 
