import type { MutableRefObject } from 'react'
import { useEffect, useRef, useState } from 'react'
type Direction = 'left' | 'right' | ''
export const useSwiper = (dom: MutableRefObject<HTMLElement | null>): { direction: Direction; dx: number } => {
  const last = useRef(0)
  const origin = useRef(0)
  
  const [direction, setDirection] = useState<Direction>('')
  const [dx, setDx] = useState(0)
  const [aaa, setAaa] = useState(0)

  const touchStart = (e: HTMLElementEventMap['touchstart']) => {
    origin.current = e?.targetTouches[0]?.clientX
    last.current = e?.targetTouches[0]?.clientX 
  }
  const touchMove = (e: HTMLElementEventMap['touchmove']) => {
    setAaa(e?.targetTouches[0]?.clientX - last.current)
    const distanceX = e?.targetTouches[0]?.clientX - origin.current
    setDx(distanceX)
    last.current = e?.targetTouches[0]?.clientX
  }
  const touchEnd = () => { 
    setAaa(0)
  }
  useEffect(() => {
    dom.current?.addEventListener('touchstart', touchStart)
    dom.current?.addEventListener('touchmove', touchMove)
    dom.current?.addEventListener('touchend', touchEnd)
    return () => {
      dom.current?.removeEventListener('touchstart', () => {})
      dom.current?.removeEventListener('touchmove', () => {})
      dom.current?.removeEventListener('touchend', () => {})
    }
  }, [])

  return { direction, dx, aaa }
}
