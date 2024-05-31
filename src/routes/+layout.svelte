<script>
    import "../app.css";
    import { inject } from '@vercel/analytics'

    inject();
    import { onMount } from 'svelte';

onMount(() => {
  document.body.classList.add('bg-black');
});
  </script>



  <slot />

