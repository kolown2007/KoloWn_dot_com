<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>




<main class="min-h-screen bg-black px-5 py-5 text-white font-mono flex flex-col items-center justify-center">
	
	<p > {@html data.project.content}</p> 
	
</main>

