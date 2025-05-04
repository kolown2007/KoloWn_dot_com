<script lang="ts">
    import type { PageData } from './$types';
    import * as Card from "$lib/components/ui/card";
    export let data: PageData;
    console.log('Page data received:', data);
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
  <!-- Debug display -->
  <div class="mb-4 hidden">
    <pre class="text-xs">{JSON.stringify(data, null, 2)}</pre>
  </div>
  
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {#if data.files && data.files.length > 0}
          {#each data.files as project}
              <Card.Root class="bg-neutral-900 overflow-hidden border-2 border-red-950 transition-all duration-300 hover:shadow-lg hover:shadow-teal-900/20">
                  <div class="relative h-72">
                      <a href=/projects/{project.url} rel="noopener noreferrer" class="block w-full h-full">
                          {#if project.featuredImage}
                              <img src={project.featuredImage} alt={project.title} class="w-full h-full object-cover" />
                          {:else}
                              <div class="w-full h-full bg-neutral-800 flex items-center justify-center">
                                  <span class="text-gray-500">No image</span>
                              </div>
                          {/if}
                          <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent h-1/4 flex items-end">
                              <div class="p-3 w-full">
                                  <h3 class="text-teal-500 font-medium truncate">{project.title}</h3>
                              </div>
                          </div>
                      </a>
                  </div>
              </Card.Root>
          {/each}
      {:else}
          <div class="col-span-full text-center py-10">
              <p>Loading projects...</p>
          </div>
      {/if}
  </div>
</main>