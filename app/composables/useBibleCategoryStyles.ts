type BaseCategory = 'history' | 'experience' | 'prophecy'

const categoryPalette: Record<BaseCategory, { solid: string, gradient: string }> = {
  history: {
    solid: 'bg-history-700',
    gradient: 'bg-gradient-to-b from-history-700 from-10% to-history-500'
  },
  experience: {
    solid: 'bg-experience-700',
    gradient: 'bg-gradient-to-b from-experience-700 from-10% to-experience-500'
  },
  prophecy: {
    solid: 'bg-prophecy-700',
    gradient: 'bg-gradient-to-b from-prophecy-700 from-10% to-prophecy-500'
  }
}

function getBaseCategory(category: string): BaseCategory {
  const [base] = category.split('-')
  if (base === 'history' || base === 'experience' || base === 'prophecy') {
    return base
  }

  return 'history'
}

export function useBibleCategoryStyles() {
  function getCategoryColourClass(category: string, useGradient: boolean) {
    const base = getBaseCategory(category)
    const shouldUseGradient = useGradient && !category.endsWith('-entry')

    return shouldUseGradient ? categoryPalette[base].gradient : categoryPalette[base].solid
  }

  return {
    getCategoryColourClass
  }
}
