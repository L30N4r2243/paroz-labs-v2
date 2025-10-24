import { useEffect, useRef, useState } from "react"

export default function useAutoScroll<T extends HTMLElement>(
  containerRef: React.RefObject<T | null>,
  deps: any[]
) {
  const [showScrollButton, setShowScrollButton] = useState(false)
  const isUserNearBottom = useRef(true)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const handleScroll = () => {
      const distanceToBottom = el.scrollHeight - el.scrollTop - el.clientHeight
      const nearBottom = distanceToBottom < 100
      isUserNearBottom.current = nearBottom
      setShowScrollButton(!nearBottom)
    }

    el.addEventListener("scroll", handleScroll)
    return () => el.removeEventListener("scroll", handleScroll)
  }, [containerRef])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    if (isUserNearBottom.current) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
    }
  }, deps)

  return { showScrollButton }
}
