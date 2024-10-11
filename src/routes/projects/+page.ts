import type { PageLoad } from './$types';
import { GraphQLClient, gql } from 'graphql-request';
import { PUBLIC_WPGQL } from "$env/static/public";
import { error } from '@sveltejs/kit';

const client = new GraphQLClient(PUBLIC_WPGQL);

export const load: PageLoad = async () => {
  const query = gql`
    query NewQuery {
      allProjects(last: 10) {
        edges {
          node {
            slug
            title
            featuredImage {
              node {
                mediaItemUrl
              }
            }
          }
        }
      }
    }
  `;

  const response: { allProjects: any } = await client.request(query);
  const projects = response.allProjects.edges.map((edge: { node: { slug: string, title: string, featuredImage: { node: { mediaItemUrl: string } } | null } }) => ({
    slug: edge.node.slug,
    title: edge.node.title,
    featureImage: edge.node.featuredImage?.node?.mediaItemUrl || null
  }));

  if (!projects) {
    throw error(404, 'Projects not found');
  }

  return {
    projects
  };
};