export function useFormatSlides(
  key: string,
  text: string) {
  // slideSize: { fontSize: number, slideHeight: number, aspect: number, viewportHeight: number, viewportWidth: number } | undefined) {
  // if (!slideSize) return []

  // const { fontSize, slideHeight, aspect, viewportHeight } = slideSize
  return [
    ['h2', { id: key, class: 'h-10' }, key],
    ['div', {
      // style: `height: ${viewportHeight}px;`,
      class: 'w-full h-dvh flex items-center justify-center'
    },
    ['div', {
      // style: `height: ${slideHeight}px;`,
      class: `flex items-center justify-center p-4 aspect-video object-cover`

    },
    [
      'p', {
        // style: `font-size: ${fontSize}px; line-height: 160%`,
        class: 'text-center whitespace-pre'
      },
      text
    ]
    ]
    ]
  ]
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
