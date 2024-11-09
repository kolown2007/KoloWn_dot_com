<script lang="ts">
    import { onMount } from 'svelte';
  
    let titles: any[] = [];
    let selectedStory: { StoryTitle: any; StorySummary: any; StoryText: any; } | null = null;
    console.log('test');
  
    const fetchTitles = async () => {
      try {
        const response = await fetch('https://kolown.net/api/ghostwriter/allTitles');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        titles = await response.json();
      } catch (error) {
        console.error('Error fetching story titles:', error);
      }
    };
  
    const fetchStoryContent = async (id: any) => {
      try {
        const response = await fetch(`https://kolown.net/api/ghostwriter/story/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        selectedStory = await response.json();
      } catch (error) {
        console.error('Error fetching story content:', error);
      }
    };
  
    onMount(() => {
      fetchTitles();
    });
  </script>
  
  <main >
    <div class="px-5 font-mono">
    <h1 class ="text-3xl py-4 text-red-300">GhostWriter</h1>
    <ul>
      {#each titles as title}
        <li class ="py-2">
          <button on:click={() => fetchStoryContent(title.id)} class ="text-red-600">
            {title.StoryTitle}
          </button>
        </li>
      {/each}
    </ul>
  
    {#if selectedStory}
      <h2 class="text-xl text-red-100">{selectedStory.StoryTitle}</h2>
      <p>{selectedStory.StorySummary}</p>
      <div class ="text-red-200">{selectedStory.StoryText}</div>
    {/if}
</div>
  </main>