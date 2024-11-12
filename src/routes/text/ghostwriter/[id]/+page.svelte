<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<main>
    <div class="mx-auto max-w-[700px]">
    {#if data.selectedStory}
    <div class="px-5 text-white font-mono ">
        <h1 class="text-3xl py-4">{data.selectedStory.StoryTitle}</h1>
        <p class ="text-slate-500">{data.selectedStory.StoryText}</p>
        </div>
    {:else}
        <p>Loading...</p>
    {/if}
</div>
</main>