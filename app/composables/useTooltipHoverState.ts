export function useTooltipHoverState(leaveGraceMs = 80) {
  const tooltipIndex = ref<number | null>(null)
  let tooltipResetTimer: ReturnType<typeof setTimeout> | null = null

  function clearTooltipResetTimer() {
    if (tooltipResetTimer !== null) {
      clearTimeout(tooltipResetTimer)
      tooltipResetTimer = null
    }
  }

  function activateTooltip(index: number) {
    clearTooltipResetTimer()
    tooltipIndex.value = index
  }

  function scheduleTooltipReset() {
    clearTooltipResetTimer()
    tooltipResetTimer = setTimeout(() => {
      tooltipIndex.value = null
      tooltipResetTimer = null
    }, leaveGraceMs)
  }

  function handlePointerEnter(index: number) {
    activateTooltip(index)
  }

  function handlePointerLeave() {
    scheduleTooltipReset()
  }

  function isTooltipIdle(index: number | null): index is null {
    return index === null
  }

  onBeforeUnmount(() => {
    clearTooltipResetTimer()
  })

  return {
    tooltipIndex,
    handlePointerEnter,
    handlePointerLeave,
    isTooltipIdle
  }
}
