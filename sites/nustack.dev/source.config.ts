import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import { z } from 'zod';

export const blog = defineDocs({
  dir: 'content/blog',
  docs: {
    schema: pageSchema.extend({
      date: z.string().refine((s) => !Number.isNaN(Date.parse(s)), {
        message: 'date must be ISO-parseable (e.g. 2026-08-10)',
      }),
      author: z.string().default('nustack'),
      tags: z.array(z.string()).default([]),
    }),
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    // MDX options
  },
});
