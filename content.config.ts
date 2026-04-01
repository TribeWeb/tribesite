import { defineContentConfig, defineCollection, property, z } from '@nuxt/content'
import { schemaPreset } from './app/utils/schemas'
import { googleSheetsImportSchemas } from './app/utils/googleSheetsImportSchemas'

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
        badge: z.union([property(z.object({})).inherit('@nuxt/ui/components/Badge.vue'), z.string()]).optional()
      })
    }),
    thrPresets: defineCollection({
      type: 'data',
      source: 'data/presets/*.json',
      schema: schemaPreset
    }),
    bibleBooks: defineCollection({
      type: 'data',
      source: 'data/bible-books/*.json',
      schema: googleSheetsImportSchemas.bibleBooks
    }),
    bibleIndexLayers: defineCollection({
      type: 'data',
      source: 'data/bible-index-layers/*.json',
      schema: googleSheetsImportSchemas.bibleIndexLayers
    })

  }
})
