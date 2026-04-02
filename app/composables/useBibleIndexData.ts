type TestamentOption = 'old' | 'new' | 'both'

type BookEnd = 'start' | 'end' | 'center' | undefined

export function useBibleIndexData(
  testamentOptions: Ref<TestamentOption>,
  optionSet: ComputedRef<Set<string>>,
  tooltipUpperSideOffset: number,
  tooltipLowerSideOffset: number
) {
  const { data: books } = useAsyncData('bible-books', () => {
    return queryCollection('bibleBooks').all()
  })

  const filteredBooks = computed(() => {
    return (books.value || []).filter((book) => {
      return testamentOptions.value === book.testament || testamentOptions.value === 'both'
    })
  })

  const bookWidth = computed(() => {
    return filteredBooks.value ? 100 / filteredBooks.value.length : 0
  })

  function getBookEnds(bookCategory: string, thisBookCategory: string) {
    if (optionSet.value.has('categories')) {
      return bookCategory !== thisBookCategory
    }

    return bookCategory?.split('-')[0] !== thisBookCategory.split('-')[0]
  }

  const booksWithBookEnd = computed(() => {
    return (filteredBooks.value || []).map((book, index, allBooks) => {
      const previousBook = allBooks[index - 1]
      const nextBook = allBooks[index + 1]
      const isCategoryStart = previousBook ? getBookEnds(previousBook?.category, book.category) : true
      const isCategoryEnd = nextBook ? getBookEnds(nextBook?.category, book.category) : true
      const isLastBook = index === allBooks.length - 1

      let bookEnd: BookEnd = 'center'
      let bookAlign: number = tooltipUpperSideOffset

      if (isCategoryEnd) {
        bookEnd = 'end'
        bookAlign = isLastBook ? tooltipUpperSideOffset : tooltipLowerSideOffset
      } else if (isCategoryStart) {
        bookEnd = 'start'
      }

      return {
        ...book,
        bookEnd,
        bookAlign
      }
    })
  })

  return {
    books,
    booksWithBookEnd,
    bookWidth
  }
}
