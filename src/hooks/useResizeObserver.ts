import type { MutableRefObject } from 'react'
import { useEffect } from 'react'
export const useResizeObserver = (dom: MutableRefObject<HTMLElement | null>, callback: () => void) => {
  useEffect(() => {
    if (!dom.current) return 
    const resizeObserver = new ResizeObserver(() => {
      callback()
    // setTransition()
    })
    resizeObserver.observe(dom.current)
    // return () => resizeObserver.unobserve
  })
}
