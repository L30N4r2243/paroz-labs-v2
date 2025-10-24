import { useEffect } from "react"

export default function useAutosize(
  ref: React.RefObject<HTMLTextAreaElement | null>,
  value: string
) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.height = "auto"
    el.style.height = `${el.scrollHeight}px`
  }, [value, ref])
}
