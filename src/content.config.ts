// Content collections: every markdown file under src/notes/ is one entry.
// The FOLDER decides the kind: src/notes/scribbles/ = regular notes,
// src/notes/tomes/ = book reviews. Frontmatter is validated against this
// schema at build time — a typo'd field fails the build instead of
// silently rendering wrong.
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/notes' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    // book-review fields (used by files in tomes/)
    author: z.string().optional(),
    rating: z.number().min(0).max(5).optional(), // potions, halves ok (3.5)
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(), // image path in public/
  }),
});

export const collections = { notes };
