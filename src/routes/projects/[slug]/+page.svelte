<script lang="ts">
    import type { PageData } from './$types';
 
    
   export let data: PageData;
</script>

<svelte:head>
    <title>KoloWn : Project:  {data.project.title}</title>
</svelte:head>

<main class="mx-auto px-4 py-5 max-w-2xl text-white text-lg leading-relaxed ">


	<p > {@html data.project.content}</p> 

</main> 
