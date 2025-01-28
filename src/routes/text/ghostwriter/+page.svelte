<script lang="ts">
    import { onMount } from 'svelte';
   
  
    let titles: any[] = [];
    let selectedStory: { StoryTitle: any; StorySummary: any; StoryText: any; } | null = null;
    let isDialogOpen = false;
  
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
      isDialogOpen = true;
    };


   

    const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      timeZone: 'Asia/Manila', 
      hour: '2-digit',
      month: 'short', 
      day: 'numeric' ,
      minute: '2-digit',
      hour12: true
    });
  };

  
    onMount(() => {
      fetchTitles();
    });
  </script>
  
  <main >
    <div class="px-5 font-mono">
<!-- 
      <a href="https://www.instagram.com/kolown" target="_blank" class="bg-red-600 text-white py-2 px-2 rounded ">
        Instagram
        </a> -->
      
    <h1 class ="text-3xl py-4 text-red-300">GhostWriter Archive</h1>
 
   
    <div class ="py-2">
    <ul>
      {#each titles as title}
     
        <li class ="py-2">
          <a href={`./ghostwriter/${title.id}`} class="text-red-600 py-5">
            <span class='text-2xl text-slate-600'> #{title.id}</span>
            <br> 
            {title.StoryTitle}
            <br> 
          <span class ="text-slate-700">{formatDate(title.created_at)}</span>
        
        </li>
      {/each}
    </ul>
  </div>


</div>


  </main>