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
  &nbsp;
  &nbsp;
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {#if data.files && data.files.length > 0}
          {#each data.files as project}
              <Card.Root class="bg-neutral-900 text-teal-700 border-2 border-red-950">
                  <Card.Header>
                      <Card.Title>{project.title}</Card.Title>
                  </Card.Header>
                  <Card.Content>
                      {#if project.featuredImage}
                          <a href=/projects/{project.url}  rel="noopener noreferrer">
                              <img src={project.featuredImage} alt={project.title} class="mx-auto block w-72 h-72 sm:w-72 sm:h-72 object-cover" />
                          </a>
                      {:else}
                          <a href=/projects/{project.url}  rel="noopener noreferrer">
                              <div class="mx-auto w-72 h-72 sm:w-72 sm:h-72 bg-neutral-800 flex items-center justify-center">
                                  <span class="text-gray-500">No image</span>
                              </div>
                          </a>
                      {/if}
                  </Card.Content>
              </Card.Root>
          {/each}
      {:else}
          <div class="col-span-full text-center py-10">
              <p>Loading projects...</p>
          </div>
      {/if}
  </div>
</main>