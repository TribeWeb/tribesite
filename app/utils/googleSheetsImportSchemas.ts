import { z } from 'zod'

const bibleBooks = z.object({
  slug: z.string(),
  pageOrder: z.coerce.number().int().gte(101).lte(227),
  name: z.string(),
  shortName: z.string().optional(),
  abbr2: z.string().min(2).max(3),
  abbr3: z.string().min(3).max(3),
  abbrFull: z.string(),
  author: z.string(),
  authoredDateOrder: z.coerce.number().int().gte(-2000).lte(100),
  authoredDateDisplay: z.string(),
  chapterCount: z.coerce.number().gte(1).lte(150),
  wordCount: z.coerce.number().gte(1).lt(35000),
  wordCountRank: z.coerce.number().int().gte(1).lte(66),
  oldTestament: z.coerce.boolean(),
  newTestament: z.coerce.boolean(),
  testament: z.enum(['old', 'new']),
  category: z.enum(['history-entry', 'history', 'experience-entry', 'experience', 'prophecy-entry', 'prophecy']),
  designation: z.string().optional(),
  geography: z.string().optional(),
  mapSlug: z.string().optional()
})

const bibleIndexLayers = z.object({
  layerId: z.string(),
  title: z.string(),
  description: z.string(),
  icons: z.record(z.string(), z.array(z.string())),
  defaultIcons: z.array(z.string()).optional(),
  bringToFront: z.array(z.string()).optional(),
  emphasise: z.array(z.string()).optional(),
  nudge: z.array(z.tuple([z.string(), z.string()])).optional()
})

export const googleSheetsImportSchemas = {
  bibleBooks,
  bibleIndexLayers

}
