<script>
    import { onMount } from 'svelte';
    import { GraphQLClient, gql } from 'graphql-request';

    const client = new GraphQLClient('https://kolown.net/server3/api');

    /**
   * @type {{ title: any; content: any; }}
   */
    let doc;

    onMount(async () => {
        const query = gql`
            query NewQuery {
                doc(id: "cG9zdDoyMzU=") {
                    title
                    content(format: RENDERED)
                }
            }
        `;

        const response = await client.request(query);
        doc = response.doc;
    });
</script>
<main class="flex  flex-col h-screen font-mono text-white bg-black py-4 px-4">
   
{#if doc}
 <h1 class="text-3xl py-5">{doc.title}</h1>
    <div>{@html doc.content}</div>
{/if}



</main>

