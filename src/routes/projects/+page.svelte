<script lang="ts">
    import type { PageData } from './$types';
    export let data: PageData;
 

  
</script>

<svelte:head>
    <title>KoloWn : Projects</title>
</svelte:head>

<main class=" font-mono mx-auto px-4 py-5 max-w-2xl text-white text-lg leading-relaxed ">
<h1 class="text-2xl">Projects</h1>
&nbsp;
{#each data.slugs as slug (slug)}
<li><a href={"/projects/" + slug}>{slug}</a></li>
{/each}

</main> 
