<script lang="ts">

    import { onMount } from 'svelte';
    import { GraphQLClient, gql } from 'graphql-request';
    import { PUBLIC_WPGQL} from "$env/static/public";
   
    
    const client = new GraphQLClient(PUBLIC_WPGQL);
    
    interface ImageObject {
      sourceUrl: string;
    }
    
    interface DataObject {
      title: string;
      image: ImageObject;
    }
    
    interface Node {
      dataobject: DataObject;
    }
    
    interface SeriesResponse {
      objects: {
        nodes: Node[];
      };
    }
    
    let images: string[] = [];
    
    onMount(async () => {
      const query = gql`
        query MyQuery {
          series(id: "signals", idType: NAME) {
            objects(first:4 ){
              nodes {
                dataobject {
                  title
                  image {  fileSize(size: THUMBNAIL)
                    sourceUrl
                  }
                }
              }
            }
          }
        }
      `;
    
      try {
        const data = await client.request<{ series: SeriesResponse }>(query);
    
        const { series: { objects: { nodes } } } = data;
    
        if (nodes.length > 0) {
          images = nodes.map((node) => node.dataobject.image.sourceUrl);
        } else {
          console.log('No data available for the specified category slug.');
        }
      } catch (error) {
        console.error('Error fetching images:', error);
        images = [];
      }
    });
    </script>
    
    <main>
      {#if images.length > 0}
        <div class="image-grid">
          {#each images as image}
            <img loading="lazy" src={image} alt="Art" />
          {/each}
        </div>
      {:else}
        <!-- <p class ="justify-center">Please wait. Patience is a virtue.</p> -->
        <img src="https://kolown.net/server2/kolowntext.svg" alt="Banner" class="flex items-center justify-center h-screen ">
      {/if}
    </main>
    
    <style>
      main {
        max-width: 100%;
        margin: 0 auto;
        padding: 4rem;
      }
    
      .image-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        grid-gap: 2.5rem;
      }
    
      @media (min-width: 1024px) {
        .image-grid {
          grid-template-columns: repeat(4, 1fr);
        }
      }
    
      .image-grid img {
        max-width: 100%;
        height: auto;
      }
    </style>