<script>
  let sections = [
    { id: "Introduction", title: "Introduction"},
    { id: "Components", title: "Components"},
    { id: "Installation", title: "Installation"},
  
  ];
</script>

<main class="flex h-screen font-mono text-white bg-black">
    <!-- sidebar -->
    <div class="hidden md:flex flex-col w-64">
        <div class="flex flex-col flex-1 overflow-y-auto">
            <nav class="flex-1 px-2 py-4">
                {#each sections as section}
                    <a href="#{section.id}" class="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700">
                        {section.title}
                    </a>
                {/each}
            </nav>
        </div>
    </div>

    <!-- Main content -->
    <div class="flex flex-col flex-1 overflow-y-auto">
        <div class="p-4">
            <section id="Introduction">
                <h2 class="text-xl font-bold mt-4">Introduction</h2>
                <div class ="text-slate-500">
                <p>Hello Welcome to the docs for TradeWinds5: The NeverEnding Story</p>
                <p>For this project, We need an internet connection, a computer, and a projector</p>
                <p>We also need a QR code and instruction on the space.</p>
                </div>
            </section>


            <section id="Components">
                <h2 class="text-xl font-bold mt-4">Components</h2>
                <div class ="text-slate-500">
                <p>The work is composed of two components:</p>

                    <ul> 
                        <li>- Browser Based Application</li>
                        <p>this is the main application that runs on the browser</p>
                        <p>this will be projected on the wall of the gallery</p>
                        <p>we made it into an app so that the gallery sitter will just click the app and no need to input the url</p>
                        <li>- Mobile Web Application</li>
                        this is the mobile application that runs on the mobile browser
                    </ul>
                </div>
            </section>



            <section id="Installation">
                <h2 class="text-xl font-bold mt-4">Installation</h2>
                <div class ="text-slate-500">
                <p>The browser-based applications runs on google chrome browser</p>
                <p>Go to this site <a class ="text-slate-200" href="https://www.tradewinds.kolown.net">tradewinds5</a></p>
                <p> On the url bar click install</p>
                </div>
            </section>

         
        </div>
    </div>
</main>