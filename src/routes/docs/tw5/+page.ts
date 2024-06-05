import type { PageLoad } from './$types';
import { GraphQLClient, gql } from 'graphql-request';
import { PUBLIC_WPGQL} from "$env/static/public";

const client = new GraphQLClient(PUBLIC_WPGQL);

let doc:any;

export const load:PageLoad = (async () => {

    const query = gql`
    query NewQuery {
        doc(id: "cG9zdDoyMjU=") {
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