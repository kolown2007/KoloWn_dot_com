<script lang="ts">
    import type { PageData } from './$types';
    export let data: PageData;
 

  
</script>

<svelte:head>
    <title>KoloWn : Projects</title>
</svelte:head>

<main class=" font-mono mx-auto px-4 py-5 max-w-2xl text-white text-lg leading-relaxed bg-black ">
<h1 class="text-xl text-red-600">Projects</h1>
    &nbsp;
<p class ="text-red-800">past and ongoing projects. this list is a work in progress</p>

&nbsp;
{#each data.slugs as slug (slug)}
<li><a href={"/projects/" + slug}>{slug}</a></li>
{/each}

</main> 
