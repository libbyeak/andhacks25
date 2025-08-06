import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
    // Load Markdown and MDX files in the `src/content/blog/` directory.
    loader: glob({ base: './src/content/blog', pattern: '**/*' }),
    // Type-check frontmatter using a schema
    schema: z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string().optional(),
        // Transform string to Date object
        pubDate: z.coerce.date().optional(),
        updatedDate: z.coerce.date().optional(),
        heroImage: z.string().optional(),
        tags: z.array(z.string()).optional(),
    }),
});

const sponsors = defineCollection({
    loader: glob({ base: './src/content/sponsors', pattern: '**/*'}),
    schema: ({image}) => z.object({
        tier: z.string(),
        name: z.string(),
        logo: image(),
        logoAlt: z.string(),
        website: z.string(),
    })
});

export const collections = { blog, sponsors };