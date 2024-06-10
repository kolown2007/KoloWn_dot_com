<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<main class ="h-screen bg-black px-5 py-5 text-white font-mono ">
	<h1 class ="text-xl">{data.project.title}</h1>
	&nbsp;
	<p > {@html data.project.content}</p> 
	
</main>
