<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<main >
    {#if data.selectedStory}
    <div class="px-5 text-white font-mono ">
        <h1 class="text-3xl py-4">{data.selectedStory.StoryTitle}</h1>
        <p>{data.selectedStory.StoryText}</p>
        </div>
    {:else}
        <p>Loading...</p>
    {/if}
</main>