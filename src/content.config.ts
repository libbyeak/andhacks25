import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
    // Load Markdown and MDX files in the `src/content/blog/` directory.
    loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
    // Type-check frontmatter using a schema
    schema: z.object({
        icon: z.string(),
        title: z.string(),
        description: z.string(),
        // Transform string to Date object
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        heroImage: z.string().optional(),
        tags: z.array(z.string()).optional(),
    }),
});

const sponsors = defineCollection({
    loader: glob({ base: './src/content/sponsors', pattern: '**/*{.md,mdx}'}),
    schema: z.object({
        tier: z.string(),
        name: z.string(),
        logo: z.string(),
        logoAlt: z.string()
    })
});

export const collections = { blog, sponsors };