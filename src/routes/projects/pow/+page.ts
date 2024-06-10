import type { PageLoad } from './$types';
import { GraphQLClient, gql } from 'graphql-request';
import { PUBLIC_WPGQL} from "$env/static/public";

const client = new GraphQLClient(PUBLIC_WPGQL);

let project:any;

export const load:PageLoad = (async () => {

    const query = gql`
   query NewQuery {
  projects(id: "cG9zdDoxMzU=") {
    content(format: RENDERED)
    title
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