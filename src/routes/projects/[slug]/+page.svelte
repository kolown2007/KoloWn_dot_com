<script lang="ts">
    import type { PageData } from './$types';
    import { page } from '$app/stores';
    
   export let data: PageData;
</script>


<main class="mx-auto px-4 py-5 max-w-2xl text-white text-lg leading-relaxed ">


	<p > {@html data.project.content}</p> 

</main> 
