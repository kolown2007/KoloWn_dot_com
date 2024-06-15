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



</body>

  <slot />

