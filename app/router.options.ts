import type { RouterOptions } from '@nuxt/schema'

// function easeInOutCubic(t: number) {
//   return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2
// }

// function easeInOutQuad(t: number) {
//   return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2
// }

// function easeInOutLinear(t: number) {
//   return t
// }

function easeInOutQuart(t: number) {
  return t < 0.5 ? 8 * t * t * t * t : 1 - (-2 * t + 2) ** 4 / 2
}

export default <RouterOptions>{
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (!to.hash) return { top: 0 }

    return new Promise((resolve) => {
      const el = document.querySelector(decodeURIComponent(to.hash))
      if (!el) return resolve({ top: 0 })

      const start = window.scrollY
      const target = el.getBoundingClientRect().top + start
      const duration = 500 // ← ms
      let startTime: number | null = null

      function step(timestamp: number) {
        if (!startTime) startTime = timestamp
        const elapsed = timestamp - startTime
        const progress = Math.min(elapsed / duration, 1)
        window.scrollTo(0, start + (target - start) * easeInOutQuart(progress))
        if (progress < 1) requestAnimationFrame(step)
        else resolve(false) // false = don't let router also scroll
      }

      requestAnimationFrame(step)
    })
  }
}
