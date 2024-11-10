import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
    const { id } = params;
    console.log(`Fetching story with id: ${id}`);
    
    const response = await fetch(`https://kolown.net/api/ghostwriter/story/${id}`);
    console.log(`Response status: ${response.status}`);
    
    if (!response.ok) {
        console.error('Error fetching story:', response.statusText);
        throw error(404, 'Not found');
    }
    
    const selectedStory = await response.json();
    console.log('Fetched story:', selectedStory);
    
    return { selectedStory };
};