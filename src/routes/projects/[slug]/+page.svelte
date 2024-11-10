<script lang="ts">
    import type { PageData } from './$types';
 
    
   export let data: PageData;
   console.log(data);
</script>

<svelte:head>
    <title>KoloWn : Project:  {data.project.title}</title>
</svelte:head>

<main class="mx-auto px-4 py-5 max-w-2xl text-white text-lg leading-relaxed  ">

<div class="text-3xl font-bold text-teal-200 py-8"> {data.project.title} </div>

    <div class=" text-orange-300"> {@html data.project.content} </div>

</main> 

