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
      <a href="/" class="text-red-800 mx-2 text-lg">Home</a>
      <!-- <a href="https://kolown.net/" class="text-red-800 mx-2">KoloWn_app</a> -->
      <a href="/shows" class="text-red-800 mx-2 text-lg">Shows</a>
      <a href="https://www.instagram.com/kolown/" class="text-red-800 mx-2 text-lg">IG</a>
      
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

