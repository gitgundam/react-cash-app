import React, { useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { useSwiper } from './hooks/useSwiper'
import { useResizeObserver } from '@/hooks/useResizeObserver'

const list = [1, 2, 3, 4, 5]
const Welcome = () => {
  const welcome = useRef<HTMLElement | null>(null)
  const [active, setActive] = useState(0)
  const [width, setWidth] = useState(0)
  const [isAnimation, setIsAnimation] = useState(false)
  const { direction, dx, mx } = useSwiper(welcome)
  
  useEffect(() => {
    setTransition()
  }, [active])
  
  useEffect(() => {
    setDomWidth()
  }, [])

  useResizeObserver(
    welcome,
    () => { setDomWidth() })
    
  const setDomWidth = () => { 
    setWidth(welcome.current ? welcome.current?.clientWidth : 0)
  }

  const setTransition = () => {
    const distance = active * width
    if (welcome.current) welcome.current.style.transform = `translate3d(${-distance}px, 0, 0)`
  }

  const hangdleActive = (index: number) => {
    if (isAnimation === true) return 
    // setIsAnimation(true)
    setActive(index)
  }
  const next = () => { 
    hangdleActive(active === list.length - 1 ? 0 : active + 1)
  }
  
  const pre = () => {
    hangdleActive(active === 0 ? list.length - 1 : active - 1)
  }

  return (
    <div h-100vh flex flex-col bg-blue>
      {active}
      <header h-20px ></header>
      <main ref={welcome} flex-1 transition-all-300 border>
        {list.map((item, index) =>
         <div absolute h="100%" style={{ left: index * width, width }} key={index}>{item}</div>)}
      </main>
       <div flex justify-between>
        <button onClick={pre}>-</button>
      <button onClick={next}>+</button>
      </div>
      <footer m-8px>{mx}{direction}</footer>

    </div>
  )
}

export default Welcome

