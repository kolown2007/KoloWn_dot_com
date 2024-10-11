
<script lang="ts">

import type { PageData } from './$types';
    import * as Card from "$lib/components/ui/card";
    export let data: PageData;
    console.log(data);

</script>


<svelte:head>
    <title>KoloWn Archive </title>
    <meta name="description" content="KoloWn Archive Page. KoloWn is a 2018 Ateneo Arts Awardee and 2021 recipient of the Thirteen Artists Awards. They work on the public physical space and of the internet.">
    <meta name="keywords" content="KoloWn, Archive, Art, Public Space, Internet, Ateneo Arts Awardee, Thirteen Artists Awards">
    <meta property="og:title" content="KoloWn Archive Page">
    <meta property="og:description" content="This is a site that archives the works and art practice of KoloWn. You can view the past works here.">
    <meta property="og:image" content="https://archive.kolown.net/wp-content/uploads/2024/02/p1sonet-1.png">
    <meta property="og:url" content="URL_TO_PAGE">
    <meta name="twitter:card" content="https://kolown.com">
</svelte:head>

<main class="font-mono mx-auto px-4 py-5 text-white text-lg leading-relaxed bg-black">
  &nbsp;
  &nbsp;
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {#each data.projects as project (project.slug)}
          <Card.Root class="bg-black text-teal-700 border-2 border-red-950">
              <Card.Header>
                  <Card.Title>{project.title}</Card.Title>
              </Card.Header>
              <Card.Content>
                  {#if project.featureImage}
                      <a href={"/projects/" + project.slug}>
                          <img src={project.featureImage} alt={project.title} class="mx-auto block w-72 h-72 sm:w-72 sm:h-72 object-cover" />
                      </a>
                  {/if}
                 
              </Card.Content>
              <!-- <Card.Footer>
            
              </Card.Footer> -->
          </Card.Root>
      {/each}
  </div>
</main>



  

  