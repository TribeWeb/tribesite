import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    home: defineCollection({
      type: 'page',
      source: 'index.md'
    }),
    projectLanding: defineCollection({
      type: 'page',
      source: 'projects/index.md'
    }),
    projects: defineCollection({
      type: 'page',
      source: { include: 'projects/*.md', exclude: ['projects/index.md'] },
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
        category: z.enum(['development', 'product']).optional(),
        date: z.date(),
        image: z.object({
          src: z.string(),
          alt: z.string()
        }),
        badge: z.object({
          label: z.string(),
          color: z.string(),
          variant: z.string()
        }).optional()
      })
    })
  }
})
