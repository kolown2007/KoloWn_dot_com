import type { PageLoad } from './$types';
import { GraphQLClient, gql } from 'graphql-request';
import { PUBLIC_WPGQL} from "$env/static/public";


const client = new GraphQLClient(PUBLIC_WPGQL);

export interface Project {
    title: string;
}

export interface PageData {
    slugs: string[];
}

export const load: PageLoad = async () => {
    const query = gql`
    query NewQuery {
      allProjects(last: 10) {
        edges {
          node {
            slug
          }
        }
      }
    }
    `;

    const response: { allProjects: any } = await client.request(query);
    const slugs = response.allProjects.edges.map((edge: { node: { slug: string } }) => edge.node.slug);
    console.log(slugs);

    return {
      slugs
    };


    
}




