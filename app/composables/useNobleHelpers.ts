type MinimarkTuple = [tag: string, props: Record<string, string>, text: string]

export interface LyricSection {
  sectionTitle: string
  label: string
  shortcut: string
}

export const lyricSections: Record<string, LyricSection> = {
  'verse-1': { sectionTitle: 'Verse 1', label: 'V1', shortcut: '1' },
  'verse-2': { sectionTitle: 'Verse 2', label: 'V2', shortcut: '2' },
  'verse-3': { sectionTitle: 'Verse 3', label: 'V3', shortcut: '3' },
  'verse-4': { sectionTitle: 'Verse 4', label: 'V4', shortcut: '4' },
  'verse-5': { sectionTitle: 'Verse 5', label: 'V5', shortcut: '5' },
  'prechorus-1': { sectionTitle: 'Prechorus 1', label: 'PCh', shortcut: '6' },
  'prechorus-2': { sectionTitle: 'Prechorus 2', label: 'PCh2', shortcut: '7' },
  'chorus-1': { sectionTitle: 'Chorus 1', label: 'Ch', shortcut: '8' },
  'chorus-2': { sectionTitle: 'Chorus 2', label: 'Ch2', shortcut: '9' },
  'chorus-3': { sectionTitle: 'Chorus 3', label: 'Ch3', shortcut: '0' },
  'chorus-4': { sectionTitle: 'Chorus 4', label: 'Ch4', shortcut: '-' },
  'bridge-1': { sectionTitle: 'Bridge 1', label: 'Br1', shortcut: '=' },
  'bridge-2': { sectionTitle: 'Bridge 2', label: 'Br2', shortcut: '[' }
}

export function useMaxLineLength(text: string) {
  return Math.max(...text.split('\n').map(line => line.length))
}

export function useTotalLineCount(text: string) {
  return text.split('\n').length
}

export function useMaxSectionLineCount(sectionTexts: string[]) {
  if (!sectionTexts.length) return 0
  return Math.max(...sectionTexts.map(t => useTotalLineCount(t)))
}

export function useMaxLineLengthAcrossSong(sectionTexts: string[]) {
  if (!sectionTexts.length) return 0
  return Math.max(...sectionTexts.map(t => useMaxLineLength(t)))
}

/**
 * Given a parsed song body (minimark format) and a section id (e.g. 'verse-1'),
 * returns the first `lineCount` lines of that section's paragraph text joined by '\n'.
 * Returns an empty string if the section is not found.
 * @example
 * useSectionPreviewLines(song.body, link.id)
 */
export function useSectionPreviewLines(
  body: { value?: MinimarkTuple[] } | null | undefined,
  sectionId: string,
  lineCount = 2
): string {
  const nodes = body?.value ?? []

  const headingIndex = nodes.findIndex(
    ([tag, props]) => /^h[1-6]$/.test(tag) && props?.id === sectionId
  )
  if (headingIndex === -1) return ''

  const para = nodes.slice(headingIndex + 1).find(([tag]) => tag === 'p')
  if (!para) return ''

  return para[2].split('\n').filter(Boolean).slice(0, lineCount).join('\n')
}
