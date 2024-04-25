<script lang ="ts">
export let data;


let exhibitions = typeof data === 'string' ? JSON.parse(data) : data;

</script>

<main class="px-10 py-10 font-red bg-black w-full h-full min-h-screen font-mono">




  
      <div class="py-10 px-10 font-bold text-red-300"> 
        <h2 class="text-red-900">Show / Series / Type</h2>
        <ul>
          {#each data.exhibitions as exhibition}
            <li class="py-2">  
              {exhibition.exhibition_name}  
              <span class ="text-red-900">/ {exhibition.series} / {exhibition.exhibition_type}
              </span>
            </li>
          {/each}
        </ul>
      </div>

      
    
    </main>




  

  