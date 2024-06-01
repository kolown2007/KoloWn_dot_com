import { request, gql } from 'graphql-request';

interface Post {
  title: string;
  content: string;
}

let posts: Post[] = [];
let titles: string[] = [];

export let  fetchPosts = async () => {
  const query = gql`
    query NewQuery {
      posts {
        nodes {
          title(format: RENDERED)
          content(format: RENDERED)
        }
      }
    }
  `;

const endpoint = 'https://kolown.net/server3/api';

try {
    const data: { posts: { nodes: Post[] } } = await request(endpoint, query);
    posts = data.posts.nodes;
    titles = posts.map((node: Post) => node.title);
    console.log(titles);
    return titles;
    
} catch (error) {
    console.error('Failed to fetch posts:', error);
}
};

