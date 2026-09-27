
<script lang="ts">
  type ShowType = 'All' | 'Solo' | 'Group' | 'Biennale';

  let { data } = $props();

  const showTypes: ShowType[] = ['All', 'Solo', 'Group', 'Biennale'];
  let selectedType = $state<ShowType>('All');
  let viewMode = $state<'card' | 'list'>('card');

  const filteredExhibitions = $derived(() => {
    const exhibitions = data?.exhibitions ?? [];

    if (selectedType === 'All') {
      return exhibitions.filter((exhibition) => exhibition.render);
    }

    return exhibitions.filter(
      (exhibition) =>
        exhibition.render &&
        exhibition.exhibition_type &&
        exhibition.exhibition_type.toLowerCase() === selectedType.toLowerCase()
    );
  });
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
  <div class="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
    <header class="mb-6">
      <h1 class="text-2xl font-bold text-red-200 sm:text-3xl">Shows</h1>
    </header>

    <div class="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div class="flex flex-wrap gap-2">
        {#each showTypes as type}
          <button
            type="button"
            class={`rounded-full border px-3 py-1.5 text-xs uppercase tracking-[0.2em] transition-colors ${selectedType === type ? 'border-red-500 bg-red-500/10 text-red-200' : 'border-red-900/60 bg-neutral-900 text-red-400 hover:border-red-700 hover:text-red-300'}`}
            onclick={() => (selectedType = type)}
          >
            {type}
          </button>
        {/each}
      </div>

      <div class="flex items-center gap-2 rounded-full border border-red-900/60 bg-neutral-900 p-1">
        <button
          type="button"
          class={`rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] transition-colors ${viewMode === 'card' ? 'bg-red-500/10 text-red-200' : 'text-red-400 hover:text-red-300'}`}
          onclick={() => (viewMode = 'card')}
        >
          Cards
        </button>
        <button
          type="button"
          class={`rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] transition-colors ${viewMode === 'list' ? 'bg-red-500/10 text-red-200' : 'text-red-400 hover:text-red-300'}`}
          onclick={() => (viewMode = 'list')}
        >
          List
        </button>
      </div>
    </div>

    {#if filteredExhibitions().length}
      {#if viewMode === 'card'}
        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {#each filteredExhibitions() as exhibition}
            <a
              href={exhibition.URL}
              class="group flex h-full flex-col rounded-lg border border-red-900/60 bg-neutral-900 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-red-700 hover:shadow-lg hover:shadow-red-950/40"
            >
              <div class="mb-3 flex items-center justify-between gap-3">
                <span class="text-xs uppercase tracking-[0.2em] text-red-500">{exhibition.year}</span>
                <span class="rounded-full border border-red-900/70 bg-red-950/20 px-2 py-1 text-[10px] uppercase tracking-[0.15em] text-red-300">
                  {exhibition.exhibition_type}
                </span>
              </div>

              <div class="mb-3">
                <h2 class="text-lg font-medium text-red-100 transition-colors group-hover:text-red-300">
                  {exhibition.exhibition_name}
                </h2>
              </div>

              <div class="mt-auto text-sm text-red-200/85">
                {exhibition.location}
              </div>
            </a>
          {/each}
        </div>
      {:else}
        <div class="overflow-hidden rounded-lg border border-red-900/60 bg-neutral-900">
          <div class="hidden grid-cols-[90px_minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1.2fr)] border-b border-red-900/50 bg-red-950/20 px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-red-400 sm:grid">
            <span>Year</span>
            <span>Show</span>
            <span>Type</span>
            <span>Location</span>
          </div>

          <div class="divide-y divide-red-900/40">
            {#each filteredExhibitions() as exhibition}
              <a href={exhibition.URL} class="block px-4 py-3 transition-colors hover:bg-red-950/20">
                <div class="grid gap-2 sm:grid-cols-[90px_minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1.2fr)] sm:items-center">
                  <div class="text-sm font-bold text-red-500">{exhibition.year}</div>
                  <div class="text-base font-medium text-red-100">{exhibition.exhibition_name}</div>
                  <div class="text-sm text-red-200/90">{exhibition.exhibition_type}</div>
                  <div class="text-sm text-red-200/85">{exhibition.location}</div>
                </div>
              </a>
            {/each}
          </div>
        </div>
      {/if}
    {:else}
      <p class="text-red-300/80">No exhibitions found for this type.</p>
    {/if}
  </div>
</main>

  