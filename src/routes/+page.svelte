<script lang ="ts">
import { AccordionItem, Accordion } from 'flowbite-svelte';  
export let data;


let exhibitions = typeof data === 'string' ? JSON.parse(data) : data;


console.log(exhibitions);
</script>

<main class="px-10 py-10 font-red bg-black w-full h-full min-h-screen font-mono">




  
        <div class = "py-10 px-10 font-bold text-red-500"> 
          <h2 class ="text-red-900">Solo</h2>
       <ul >
          {#each data.exhibitions as exhibition }
          {#if exhibition.exhibition_type === 'Solo'}
          <li class="py-2">{exhibition.exhibition_name}</li>
      {/if}
          {/each}
        </ul>
      </div>

      <div class = "py-10 px-10 font-bold text-red-500"> 
        <h2 class ="text-red-900">Group</h2>
        <ul >
          {#each data.exhibitions as exhibition }
          {#if exhibition.exhibition_type === 'Group'}
          <li class="py-2">{exhibition.exhibition_name}</li>
      {/if}
          {/each}
        </ul>
      </div>
    
    </main>




  

  