<script>
    import { onMount } from 'svelte';
    import { GraphQLClient, gql } from 'graphql-request';
    import { PUBLIC_WPGQL} from "$env/static/public";

    const client = new GraphQLClient( PUBLIC_WPGQL);

    /**
   * @type {{ title: any; content: any; }}
   */
    let doc;

    onMount(async () => {
        const query = gql`
            query NewQuery {
                doc(id: "cG9zdDoyMjU=") {
                    title
                    content(format: RENDERED)
                }
            }
        `;

        const response = await client.request(query);
        doc = response.doc;
    });
</script>
<main class="flex h-screen font-mono text-white bg-black py-4 px-4">
{#if doc}
 
    <div>{@html doc.content}</div>
{/if}



</main>

