import type { PageLoad } from './$types';
import { GraphQLClient, gql } from 'graphql-request';
import { PUBLIC_WPGQL} from "$env/static/public";
import { error } from '@sveltejs/kit';

const client = new GraphQLClient(PUBLIC_WPGQL);

let project:any;

export const load:PageLoad = (async ({ params }) => {
    const { slug } = params;

   const query = gql`
query NewQuery {
  projects(idType: SLUG, id:"${slug}") {
    title
    content(format: RENDERED)
  }
}
`;

const response: { projects: any } = await client.request(query);
project = response.projects;

return {
    project: {
        title: `${project.title} `,
        content: ` ${project.content} `,
    },

    
};



}) 

error(404, 'Not found');