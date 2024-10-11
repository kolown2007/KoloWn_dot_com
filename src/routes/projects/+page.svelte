<script lang="ts">
    import type { PageData } from './$types';
    import * as Card from "$lib/components/ui/card";
    export let data: PageData;
    console.log(data);

  
</script>

<svelte:head>
    <title>KoloWn : Projects</title>
</svelte:head>

<main class="font-mono mx-auto px-4 py-5 text-white text-lg leading-relaxed bg-black">
    &nbsp;
    &nbsp;
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {#each data.projects as project (project.slug)}
            <Card.Root class="bg-black text-orange-400 border-2 border-red-900">
                <Card.Header>
                    <Card.Title>{project.title}</Card.Title>
                </Card.Header>
                <Card.Content>
                    {#if project.featureImage}
                        <a href={"/projects/" + project.slug}>
                            <img src={project.featureImage} alt={project.title} class="mx-auto block w-32 h-32 sm:w-72 sm:h-72 object-cover" />
                        </a>
                    {/if}
                   
                </Card.Content>
                <!-- <Card.Footer>
              
                </Card.Footer> -->
            </Card.Root>
        {/each}
    </div>
</main>