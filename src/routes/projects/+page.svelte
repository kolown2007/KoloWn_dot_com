<script lang="ts">
  import type { PageData } from './$types';

  type ProjectItem = {
    title: string;
    url: string;
    name?: string;
  };

  let { data }: { data: PageData } = $props();
  const projects = $derived((data.projects ?? []) as ProjectItem[]);
</script>

<svelte:head>
  <title>Projects | Kolown</title>
  <meta name="description" content="Index of project entries and documents." />
</svelte:head>

<main class="min-h-screen w-full bg-black font-mono text-red-300">
  <div class="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
    <header class="mb-6">
      <h1 class="text-2xl font-bold text-red-200 sm:text-3xl">Projects</h1>
    </header>

    {#if projects.length}
      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {#each projects as project}
          <a
            href={project.url}
            class="group flex h-full flex-col rounded-lg border border-red-900/60 bg-neutral-900 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-red-700 hover:shadow-lg hover:shadow-red-950/40"
          >
            <div class="mb-3 flex items-center justify-between gap-3">
              <span class="text-xs uppercase tracking-[0.2em] text-red-500">Project</span>
            </div>

            <div class="mb-3">
              <h2 class="text-lg font-medium text-red-100 transition-colors group-hover:text-red-300">
                {project.title}
              </h2>
            </div>
          </a>
        {/each}
      </div>
    {:else}
      <p class="text-neutral-400">No projects found.</p>
    {/if}
  </div>
</main>
