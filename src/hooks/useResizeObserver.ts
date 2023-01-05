import type { MutableRefObject } from 'react'
import { useLayoutEffect } from 'react'
export const useResizeObserver = (dom: MutableRefObject<HTMLElement | null>, callback: () => void) => {
  useLayoutEffect(() => {
    if (!dom.current) return 
    const resizeObserver = new ResizeObserver(() => {
      callback()
    })
    resizeObserver.observe(dom.current)
    return () => {
      if (dom.current) resizeObserver.unobserve(dom.current) 
    }
  }, [])
}
