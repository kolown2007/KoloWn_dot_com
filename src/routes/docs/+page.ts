import type { PageLoad } from './$types';
import { GraphQLClient, gql } from 'graphql-request';
import { PUBLIC_WPGQL} from "$env/static/public";


const client = new GraphQLClient(PUBLIC_WPGQL);

export const load: PageLoad = async () => {
    const query = gql`
 query NewQuery {
  docs(last: 10) {
    nodes {
      slug
    }
  }
}
    `;

    const response: { docs: any } = await client.request(query);
    const slugs = response.docs.nodes.map((node: { slug: string }) => node.slug);
    console.log(slugs);

    return {
      slugs
    };


    
}




