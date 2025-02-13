import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    home: defineCollection({
      type: 'page',
      source: 'index.md'
    }),
    blog: defineCollection({
      type: 'page',
      source: 'blog/index.md'
    }),
    posts: defineCollection({
      type: 'page',
      source: { include: 'blog/*.md', exclude: ['blog/index.md'] },
      schema: z.object({
        draft: z.boolean().default(false),
        authors: z.array(z.object({
          slug: z.string(),
          username: z.string(),
          name: z.string(),
          to: z.string(),
          avatar: z.object({
            src: z.string(),
            alt: z.string()
          })
        })),
        category: z.enum(['studio', 'content']).optional(),
        date: z.date(),
        image: z.object({
          src: z.string(),
          alt: z.string()
        })
      })
    })
  }
})
