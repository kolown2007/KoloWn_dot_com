<script lang="ts">
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
    
    // Clean up your console logging
    console.log('Repository items:', data.data.length);
</script>



<div class = "p-4 max-w-[900px] mx-auto">
    {#if data.data && data.data.length > 0}
        <ul>
            {#each data.data as item}
                <li class="ml-1">
                    <!-- Link to dynamic route -->
                    <a href={`/notes/${item.name}`} class="text-blue-500 hover:text-blue-700">
                        {item.name.replace(/\.md$|\.markdown$/i, '')}
                    </a>
                   
                </li>
            {/each}
        </ul>
    {:else}
        <p>Loading repository data...</p>
    {/if}
</div>