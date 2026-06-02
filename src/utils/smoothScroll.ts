/** Ease-in-out quint — smooth full-page transitions */
function easeInOutQuint(t: number): number {
  return t < 0.5 ? 16 * t ** 5 : 1 - (-2 * t + 2) ** 5 / 2
}

export function smoothScrollElement(
  el: HTMLElement,
  targetTop: number,
  duration = 720,
  onComplete?: () => void,
): () => void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.scrollTop = targetTop
    onComplete?.()
    return () => {}
  }

  const start = el.scrollTop
  const delta = targetTop - start
  if (Math.abs(delta) < 2) {
    el.scrollTop = targetTop
    onComplete?.()
    return () => {}
  }

  const startTime = performance.now()
  let frame = 0

  const tick = (now: number) => {
    const t = Math.min((now - startTime) / duration, 1)
    el.scrollTop = start + delta * easeInOutQuint(t)
    if (t < 1) {
      frame = requestAnimationFrame(tick)
    } else {
      onComplete?.()
    }
  }

  frame = requestAnimationFrame(tick)
  return () => cancelAnimationFrame(frame)
}
