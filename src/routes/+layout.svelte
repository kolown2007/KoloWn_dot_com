<!-- <script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

{@render children()} -->



<script lang="ts">
    import "../app.css";
    import { inject } from '@vercel/analytics'
     import { onNavigate } from '$app/navigation';
  /** @type {{children?: import('svelte').Snippet}} */
  let { children } = $props();

inject();

   //view transition
onNavigate((navigation) => {
	// @ts-ignore
	if (!document.startViewTransition) return;

	return new Promise((resolve) => {
		// @ts-ignore
		document.startViewTransition(async () => {
			resolve();
			await navigation.complete;
		});
	});
});
  </script>

  <header class="flex justify-center  w-full bg-black ">
    <nav class="flex justify-center max-w-2xl items-center p-6 font-mono">
      <a href="/" class="text-red-800 mx-2">Home</a>
      <a href="https://kolown.net/" class="text-red-800 mx-2">KoloWn_app</a>
      <a href="/shows" class="text-red-800 mx-2">Shows</a>
      <!-- <a href="https://www.instagram.com/kolown/" class="text-red-800 mx-2">Instagram</a> -->
    </nav>
  </header>



<style>
header {
	display: flex;
  transition: background-color 0.5s ease-in-out, color 0.5s ease-in-out;
	view-transition-name: header;
}

:global(body) {
  background-color: black;
}

</style>


  {@render children?.()}

