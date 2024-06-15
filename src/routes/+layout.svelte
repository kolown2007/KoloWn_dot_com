<script>
    import "../app.css";
    import { inject } from '@vercel/analytics'

    
  let bookmarks = false;
  let fullUrls = true;
 
  const profileRadioValue = "benoit";

    inject();
   




  </script>
<body class="bg-black">

<nav> 

  <div class="flex justify-center text-red-700 font-mono py-6 ">
    <a class ="px-5" href="/">Shows</a>
    <a class ="px-5" href="/docs">Docs</a>
    <a class ="px-5" href="/projects">Projects</a>

  </div>
</nav>

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




</body>

  <slot />

