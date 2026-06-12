import { supabase } from "$lib/supabaseClient";
import { GITHUB_TOKEN } from '$env/static/private';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
    // 1. Fetch exhibition links from Supabase
    const { data: exhibitions } = await supabase.from("homepage").select("link");
    const exhibitionLinks = exhibitions?.map(item => item.link).filter(Boolean) || [];

    // 2. Fetch all files from the GitHub "Projects" directory
    let githubProjects: string[] = [];
    try {
        const githubResponse = await fetch('https://api.github.com/repos/kolown2007/Notes/contents/Projects', {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'User-Agent': 'SvelteKit-App'
            }
        });

        if (githubResponse.ok) {
            const githubFiles = await githubResponse.json();
            githubProjects = Array.isArray(githubFiles) 
                ? githubFiles
                    .filter(file => file.name.toLowerCase().endsWith('.md') || file.name.toLowerCase().endsWith('.markdown'))
                    .map(file => file.name.replace(/\.md$|\.markdown$/i, ''))
                : [];
        } else {
            console.error(`Sitemap GitHub Error: ${githubResponse.status} ${githubResponse.statusText}`);
        }
    } catch (err) {
        console.error('Sitemap: Failed to fetch from GitHub', err);
    }

    // 3. Consolidate unique slugs from both sources
    const uniqueSlugs = new Set([
        ...exhibitionLinks.map(link => link.replace(/^\/?projects\//, '').replace(/^\//, '')),
        ...githubProjects
    ]);

    const sitemap = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xhtml="http://www.w3.org/1999/xhtml"
    xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
    xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
    xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
>
    <url>
        <loc>${url.origin}/</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    ${Array.from(uniqueSlugs).map(slug => `
    <url>
        <loc>${url.origin}/projects/${encodeURIComponent(slug)}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
    </url>`).join('')}
</urlset>`.trim();

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'max-age=0, s-maxage=3600'
        }
    });
};