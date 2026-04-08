import { useEffect, useRef, useState } from 'react'

export function useInViewOnce(options = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || visible) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      {
        threshold: options.threshold ?? 0.15,
        rootMargin: options.rootMargin ?? '0px',
      },
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [visible, options.threshold, options.rootMargin])

  return { ref, visible }
}
