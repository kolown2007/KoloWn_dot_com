<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;

    let storyText = data.selectedStory?.StoryText || '';
    let paragraphs = storyText.split('\n\n');
</script>

<main>
    <div class="mx-auto max-w-[700px]">
        {#if data.selectedStory}
            <div class="px-5 text-white font-mono">
                <h1 class="text-3xl py-4">{data.selectedStory.StoryTitle}</h1>
                {#each paragraphs as paragraph}
                    <p class="text-slate-500 mb-4">{paragraph}</p>
                {/each}
            </div>
        {:else}
            <p>Loading...</p>
        {/if}
    </div>
</main>