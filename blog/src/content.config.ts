import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Posts: one .md/.mdx file per post in content/, the file name is the slug. */
const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    /** Publish date, YYYY-MM-DD. */
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    author: z.string().default('nustack'),
    tags: z.array(z.string()).default([]),
    /** Drafts render in dev and stay out of the build. */
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
