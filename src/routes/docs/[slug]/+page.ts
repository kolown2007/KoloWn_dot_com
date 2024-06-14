import type { PageLoad } from './$types';
import { GraphQLClient, gql } from 'graphql-request';
import { PUBLIC_WPGQL} from "$env/static/public";
import { error } from '@sveltejs/kit';

const client = new GraphQLClient(PUBLIC_WPGQL);

let doc:any;

export const load:PageLoad = (async ({ params }) => {
    const { slug } = params;

   const query = gql`
query NewQuery {
  doc(idType: SLUG, id:"${slug}") {
    title
    content(format: RENDERED)
  }
}
`;

const response: { doc: any } = await client.request(query);
doc = response.doc;

return {
    doc: {
        title: `${doc.title} `,
        content: ` ${doc.content} `,
    },

    
};



}) 

error(404, 'Not found');