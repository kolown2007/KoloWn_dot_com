
<script lang="ts">
export let data;

</script>


<svelte:head>
    <title>KoloWn Archive </title>
    <meta name="description" content="KoloWn Archive Page. This is a site that archives the works and art practice of KoloWn. You can view the past works here. KoloWn is a 2018 Ateneo Arts Awardee and 2021 recipient of the Thirteen Artists Awards. They work on the public physical space and of the internet.">
    <meta name="keywords" content="KoloWn, Archive, Art, Public Space, Internet, Ateneo Arts Awardee, Thirteen Artists Awards">
    <meta property="og:title" content="KoloWn Archive Page">
    <meta property="og:description" content="This is a site that archives the works and art practice of KoloWn. You can view the past works here.">
    <meta property="og:image" content="https://archive.kolown.net/wp-content/uploads/2024/02/p1sonet-1.png">
    <meta property="og:url" content="URL_TO_PAGE">
    <meta name="twitter:card" content="https://kolown.com">
</svelte:head>

<main class=" bg-black w-full h-full min-h-screen font-mono">


      <div class=" mx-auto max-w-2xl py-5 px-5 font-bold text-red-300"> 
        <h2 class="text-red-900">Year / Show / Type</h2>
        <ul>
          {#each data.exhibitions as exhibition}
            <li class="py-.7">  
              {#if exhibition.render}  
              <span class="text-red-950">{exhibition.year}/</span>
                <a href={exhibition.URL} class ="hover:text-red-700">{exhibition.exhibition_name}</a>
                <!-- <span class="text-red-900">/ {exhibition.series}</span>   -->
                <span class="text-red-950">/ {exhibition.exhibition_type}</span>
              {/if}
            </li>
          {/each}
        </ul>
      </div> 

   

      
    
    </main>




  

  