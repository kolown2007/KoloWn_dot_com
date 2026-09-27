<script lang="ts">
  import type { PageData } from './$types';

  type NoteItem = {
    title: string;
    url: string;
    slug?: string;
    path?: string;
    name?: string;
  };

  let { data }: { data: PageData } = $props();
  const notes = $derived((data.notes ?? []) as NoteItem[]);
</script>

<svelte:head>
  <title>Notes | Kolown</title>
  <meta name="description" content="Index of notes and research writing." />
</svelte:head>

<main class="mx-auto max-w-4xl p-6 text-white">
  <header class="mb-8">
    <h1 class="text-3xl font-bold text-orange-300">Notes</h1>
  </header>

  {#if notes.length}
    <ul class="space-y-3">
      {#each notes as note}
        <li class="border-b border-neutral-800 pb-3">
          <a href={note.url} class="text-lg text-orange-200 underline-offset-4 hover:underline">
            {note.title}
          </a>
        </li>
      {/each}
    </ul>
  {:else}
    <p class="text-neutral-400">No notes found.</p>
  {/if}
</main>
