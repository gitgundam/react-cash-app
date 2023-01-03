import type { MutableRefObject } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
type Direction = 'left' | 'right' | ''
type UseSwiper = (dom: MutableRefObject<HTMLElement | null>) => { direction: Direction } 

export const useSwiper: UseSwiper = (dom) => {
  const origin = useRef(0)
  const last = useRef(0)
  const [mx, setMx] = useState(0)
  const [dx, setDx] = useState(0)
  
  const direction = useMemo<Direction>(() => {
    if (!dom?.current?.clientWidth) return ''
    const turnWidth = dom?.current?.clientWidth / 3
    if (mx > turnWidth && dx > 0) return 'right'
    else if (mx < turnWidth && dx < 0) return 'left'
    else return ''
  }, [mx])

  const touchStart = (e: HTMLElementEventMap['touchstart']) => {
    origin.current = e?.targetTouches[0].clientX
    last.current = e?.targetTouches[0].clientX
  }

  const touchMove = (e: HTMLElementEventMap['touchmove']) => {
    setDx(e?.targetTouches[0].clientX - last.current)
    setMx(e?.targetTouches[0].clientX - origin.current)
    last.current = e?.targetTouches[0].clientX 
  }

  const touchEnd = () => {
  }
  
  useEffect(() => {
    dom.current?.addEventListener('touchstart', touchStart)
    dom.current?.addEventListener('touchmove', touchMove)
    dom.current?.addEventListener('touchend', touchEnd)
    return () => {
      dom.current?.removeEventListener('touchstart', touchStart)
      dom.current?.removeEventListener('touchmove', touchMove)
      dom.current?.removeEventListener('touchend', touchEnd)
    }
  }, [])

  return { direction, mx, dx }
}
