export function useBibleLayers(layer: Ref<string>) {
  const { data: layers } = useAsyncData('bible-index-layers', () => {
    return queryCollection('bibleIndexLayers').all()
  })

  const layerDetails = computed(() => {
    return layers.value?.find(l => l.layerId === layer.value)
  })

  const openBookSlugSet = computed(() => {
    return new Set(Object.keys(layerDetails.value?.icons ?? {}))
  })

  function isPopoverOpen(bookSlug: string) {
    return openBookSlugSet.value.has(bookSlug)
  }

  function getLayerIcons(bookSlug: string) {
    const iconsForBook = layerDetails.value?.icons?.[bookSlug]
    if (iconsForBook && iconsForBook.length > 0) {
      return iconsForBook
    }

    return layerDetails.value?.defaultIcons ?? []
  }

  function getPopoverAlign(bookSlug: string) {
    const nudges = layerDetails.value?.nudge ?? []

    for (const nudge of nudges) {
      const [leftBook, rightBook] = nudge

      if (bookSlug === leftBook) {
        return 'end'
      }

      if (bookSlug === rightBook) {
        return 'start'
      }
    }

    return 'center'
  }

  return {
    layers,
    layerDetails,
    isPopoverOpen,
    getLayerIcons,
    getPopoverAlign
  }
}
