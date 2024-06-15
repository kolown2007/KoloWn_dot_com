<script>
    import "../app.css";
    import { inject } from '@vercel/analytics'
    import { onNavigate } from '$app/navigation';

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
<body class="bg-black">


  <header class="flex justify-center  w-full ">
    <nav class="flex justify-center max-w-2xl items-center p-6 font-mono">
      <a href="/" class="text-red-800 mx-2">Shows</a>
      <a href="/docs" class="text-red-800 mx-2">Docs</a>
      <a href="/projects" class="text-red-800 mx-2">Projects</a>
    </nav>
  </header>

</body>

<style>
header {
	display: flex;
  transition: background-color 0.5s ease-in-out, color 0.5s ease-in-out;
	view-transition-name: header;
}

</style>


  <slot />

