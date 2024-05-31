<script lang ="ts">
export let data;

</script>


<svelte:head>
    <title>KoloWn</title>
    <meta name="description" content="KoloWn Homepage">
</svelte:head>

<main class=" bg-black w-full h-full min-h-screen font-mono">


  

      <!-- <div class="py-5 px-5 font-bold text-red-300"> 
        <h2 class="text-red-900">Show / Series / Type</h2>
        <ul>
          {#each data.exhibitions as exhibition}
            <li class="py-.7">  
             
              {#if exhibition.render}  
              {exhibition.exhibition_name}
                <span class="text-red-900">/ {exhibition.series}</span>  
                <span class="text-red-950">/ {exhibition.exhibition_type}</span>
              {/if}
            </li>
          {/each}
        </ul>
      </div> -->

      <div class="py-5 px-5 font-bold text-red-300"> 
        <h2 class="text-red-900">Show / Series / Type</h2>
        <ul>
          {#each data.exhibitions as exhibition}
            <li class="py-.7">  
              {#if exhibition.render}  
                <a href={exhibition.URL} class ="hover:text-red-700">{exhibition.exhibition_name}</a>
                <span class="text-red-900">/ {exhibition.series}</span>  
                <span class="text-red-950">/ {exhibition.exhibition_type}</span>
              {/if}
            </li>
          {/each}
        </ul>
      </div> 

   

      
    
    </main>




  

  