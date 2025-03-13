import type { PageServerLoad } from './$types';
import type { RequestEvent } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch }: RequestEvent) => {
    // Make API requests here
    const response = await fetch('https://api.github.com/repos/kolown2007/Notes/contents/Projects?ref=main');
    const data = await response.json();
    
    return {
      data
    };
  };