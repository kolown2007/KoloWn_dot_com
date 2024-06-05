<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<main class ="h-screen bg-black px-5 py-5 text-white font-mono ">
	<h1 class ="text-xl">{data.doc.title}</h1>
	<p class ="text-slate-500"> {@html data.doc.content}</p> 
	
</main>

