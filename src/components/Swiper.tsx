import type { FC, ReactElement } from 'react'
import React, { useEffect, useRef, useState } from 'react'
import { useResizeObserver } from '@/hooks/useResizeObserver'
import { useSwiper } from '@/views/welcome/hooks/useSwiper'

interface Props {
  children: ReactElement[]
  selectedIndex?: number
}
const Swiper: FC<Props> = ({ children, selectedIndex = 0 }) => {
  const dom = useRef<HTMLElement | null>(null)
  const [active, setActive] = useState(selectedIndex)
  const [width, setWidth] = useState(0)
  const [isAnimation, setIsAnimation] = useState(false)

  const { direction, mx, type } = useSwiper(dom)

  useResizeObserver(
    dom,
    () => { 
      setDomWidth() 
    })
    
  useEffect(() => {
    setTransition()
  }, [active])
  
  useEffect(() => {
    setDomWidth()
  }, [])

  useEffect(() => {
    if (type === 'end') setIsAnimation(false)
    const isTurn = Math.abs(mx) > width / 3
    if (isAnimation) return 
    if (type === 'end' && !isTurn) {
      dom.current!.style.transitionProperty = 'all'
      setTransition(0)
      return
    }
    
    setTransition(mx)
    if (direction === 'left' && isTurn) next()
    else if (direction === 'right' && isTurn) pre()
  }, [mx, direction, type])

  const setDomWidth = () => { 
    setWidth(dom.current ? dom.current?.clientWidth : 0)
  }

  const setTransition = (offset = 0) => {
    const distance = active * width
    if (!dom.current) return 
    const transitionend = () => {
      dom.current!.style.transitionProperty = 'none'
      // setIsAnimation(false)
      if (active === children.length) setTimeout(() => setActive(0), 0)
      dom.current?.removeEventListener('transitionend', transitionend)
    }
    dom.current?.addEventListener('transitionend', transitionend) 
    dom.current.style.transform = `translate3d(${-distance + offset}px, 0, 0)`
  }
  
  const hangdleActive = (index: number) => {
    if (isAnimation === true) return 
    dom.current!.style.transitionProperty = 'all'
    setIsAnimation(true) 
    setActive(index)
  }

  const next = () => hangdleActive(active === children.length ? 0 : active + 1)
  
  const pre = () => hangdleActive(active === 0 ? children.length - 1 : active - 1)

  const isFirst = () => children.map((item, index) => {
    if (active === children.length && index === 0)
      return <div absolute h="100%" style={{ left: children.length * width, width }} key={index} >{item}</div>
    return <div flex-shrink-0 style={{ width }} key={index}>{item}{isAnimation.toString()}</div>
  })

  return (
    <main ref={dom} flex-1 transition-all-300 border border-red flex >
        {isFirst()}
    </main>
  )
}

export default Swiper
