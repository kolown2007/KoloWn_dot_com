<script lang="ts">
    import {request, gql} from 'graphql-request'
    import { PUBLIC_WPGQL} from "$env/static/public";
    let posts:any = []
    let titles:any = []
    
    const fetchPosts = async () => {
      const query = gql`
      query NewQuery {
      posts {
        nodes {
          title(format: RENDERED)
          content(format: RENDERED)
        }
      }
    }
      `
    
      const endpoint = PUBLIC_WPGQL
    
      const data = await request(endpoint, query)
    posts = (data as any).posts
    

  titles = posts.nodes.map((node: { title: any; }) => node.title);
  console.log(titles);
   
    }
    
    fetchPosts()
    </script>


<main class="bg-black w-full h-full min-h-screen font-mono text-red-400 px-5 py-5">
   


    {#each titles as title}

    <h2 class="font-bold text-xl text-red-300 mb-4">{title}</h2>
    {/each}
</main>
