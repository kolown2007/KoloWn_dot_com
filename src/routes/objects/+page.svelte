<script lang="ts">
    import { onMount } from 'svelte';
    import { GraphQLClient, gql } from 'graphql-request';
  
    const client = new GraphQLClient('https://kolown.net/server3/api');
  
    interface ImageObject {
      sourceUrl: string;
    }
  
    interface DataObject {
      image: ImageObject;
    }
  
    interface Node {
      dataobject: DataObject;
    }
  
    interface ObjectsResponse {
      nodes: Node[];
    }
  
    let images: string[] = [];
  
    onMount(async () => {
      const query = gql`
        query NewQuery {
          objects {
            nodes {
              dataobject {
                image {
                  sourceUrl
                }
              }
            }
          }
        }
      `;
  
  try {
        const { objects }: { objects: ObjectsResponse } = await client.request(query);
        images = objects.nodes.map((node: Node) => node.dataobject.image.sourceUrl);
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
          <img src={image} alt="Art" />
        {/each}
      </div>
    {:else}
      <p>Loading images...</p>
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