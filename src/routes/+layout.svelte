<script>
    import "../app.css";
    import { inject } from '@vercel/analytics'

    inject();



  </script>

<header class="bg-black text-white">
  <div class="flex justify-center">
    <nav class="flex max-w-2xl  items-center p-6 font-mono">
      <a href="/" class="text-red-800 mx-2">Shows</a>
      <a href="/docs" class="text-red-800 mx-2">Docs</a>
      <a href="/projects" class="text-red-800 mx-2">Projects</a>
    </nav>
  </div>
</header>
<body class="bg-black"> 

  



</body>



  <slot />

