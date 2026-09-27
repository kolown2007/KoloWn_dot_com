
<script lang="ts">
  export let data;
</script>

<svelte:head>
  <title>KoloWn Archive</title>
  <meta name="description" content="KoloWn Archive Page. KoloWn is a 2018 Ateneo Arts Awardee and 2021 recipient of the Thirteen Artists Awards. They work on the public physical space and of the internet.">
  <meta name="keywords" content="KoloWn, Archive, Art, Public Space, Internet, Ateneo Arts Awardee, Thirteen Artists Awards">
  <meta property="og:title" content="KoloWn Archive Page">
  <meta property="og:description" content="This is a site that archives the works and art practice of KoloWn. You can view the past works here.">
  <meta property="og:image" content="https://archive.kolown.net/wp-content/uploads/2024/02/p1sonet-1.png">
  <meta property="og:url" content="URL_TO_PAGE">
  <meta name="twitter:card" content="https://kolown.com">
</svelte:head>

<main class="min-h-screen w-full bg-black font-mono text-red-300">
  <div class="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
    <header class="mb-6">
      <h1 class="text-2xl font-bold text-red-200 sm:text-3xl">Shows</h1>
    </header>

    {#if data?.exhibitions?.length}
      <div class="overflow-hidden rounded-md border border-red-900/50 bg-black/40">
        <div class="hidden grid-cols-[90px_minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1.2fr)] border-b border-red-900/50 bg-red-950/20 px-4 py-3 text-xs uppercase tracking-[0.2em] text-red-400 sm:grid">
          <span>Year</span>
          <span>Show</span>
          <span>Type</span>
          <span>Location</span>
        </div>

        <div class="divide-y divide-red-900/40">
          {#each data.exhibitions as exhibition}
            {#if exhibition.render}
              <a
                href={exhibition.URL}
                class="group block px-4 py-3 transition-colors duration-150 hover:bg-red-950/20"
              >
                <div class="grid gap-2 sm:grid-cols-[90px_minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1.2fr)] sm:items-center">
                  <div class="text-sm font-bold text-red-500 sm:text-base">{exhibition.year}</div>

                  <div class="text-base font-medium text-red-100 group-hover:text-red-300 sm:text-lg">
                    {exhibition.exhibition_name}
                  </div>

                  <div class="text-sm text-red-200/90 sm:text-base">
                    {exhibition.exhibition_type}
                  </div>

                  <div class="text-sm text-red-200/80 sm:text-base">
                    {exhibition.location}
                  </div>
                </div>
              </a>
            {/if}
          {/each}
        </div>
      </div>
    {:else}
      <p class="text-red-300/80">No exhibitions found.</p>
    {/if}
  </div>
</main>

  