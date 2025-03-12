import type { PageLoad } from './$types';
import { GraphQLClient, gql } from 'graphql-request';
import { PUBLIC_WPGQL} from "$env/static/public";
import { error } from '@sveltejs/kit';

const client = new GraphQLClient(PUBLIC_WPGQL);

export const load: PageLoad = async ({ params }) => {
    const { slug } = params;

    const query = gql`
    query NewQuery {
      projects(idType: SLUG, id:"${slug}") {
        title
        content(format: RENDERED)
      }
    }
    `;

    try {
        const response: { projects: any } = await client.request(query);
        const project = response.projects;
        
        if (!project) {
            throw error(404, 'Project not found');
        }

        return {
            project: {
                title: `${project.title} `,
                content: ` ${project.content} `,
            }
        };
    } catch (err) {
        console.error('Error fetching project:', err);
        throw error(404, 'Project not found');
    }
};