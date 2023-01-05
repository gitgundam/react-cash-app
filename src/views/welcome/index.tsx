import { useEffect, useRef, useState } from 'react'
import { useSwiper } from './hooks/useSwiper'
import { useResizeObserver } from '@/hooks/useResizeObserver'

const list = [1, 2, 3, 4, 5]
const Welcome = () => {
  const welcome = useRef<HTMLElement | null>(null)
  const [active, setActive] = useState(0)
  const [width, setWidth] = useState(0)
  const [isAnimation, setIsAnimation] = useState(false)
  const { direction, mx, type } = useSwiper(welcome)

  useEffect(() => {
    setTransition()
  }, [active])
  
  useEffect(() => {
    setDomWidth()
  }, [])

  useEffect(() => {
    const isTurn = Math.abs(mx) > width / 3
    if (isAnimation) return 
    if (type === 'end' && !isTurn) {
      welcome.current!.style.transitionProperty = 'all'
      setTransition(0)
      return
    }
    setTransition(mx)
    if (direction === 'left' && isTurn) next()
    else if (direction === 'right' && isTurn) pre()
  }, [mx, direction, type])

  useResizeObserver(
    welcome,
    () => { 
      setDomWidth() 
    })
    
  const setDomWidth = () => { 
    setWidth(welcome.current ? welcome.current?.clientWidth : 0)
  }

  const setTransition = (offset = 0) => {
    const distance = active * width
    if (!welcome.current) return 
    const transitionend = () => {
      welcome.current!.style.transitionProperty = 'none'
      setIsAnimation(false)
      if (active === list.length) setTimeout(() => setActive(0), 0)
      welcome.current?.removeEventListener('transitionend', transitionend)
    }
    welcome.current?.addEventListener('transitionend', transitionend) 
    welcome.current.style.transform = `translate3d(${-distance + offset}px, 0, 0)`
  }

  const hangdleActive = (index: number) => {
    if (isAnimation === true) return 
    welcome.current!.style.transitionProperty = 'all'
    setIsAnimation(true) 
    setActive(index)
  }
  const next = () => { 
    hangdleActive(active === list.length ? 0 : active + 1)
  }
  
  const pre = () => {
    hangdleActive(active === 0 ? list.length - 1 : active - 1)
  }

  const isFirst = () => list.map((item, index) => {
    if (active === list.length && index === 0) return <div border absolute h="100%" style={{ left: list.length * width, width }} key={index} >{index}</div>
    // return <div absolute style={{ left: index * width, width }} key={index}>{item}</div>
    return <div border flex-shrink-0 style={{ width }} key={index}>{item}</div>
  })

  return (
    <div h-100vh flex flex-col bg-blue-2>
      <header h-20px ></header>
      <main ref={welcome} flex-1 transition-all-300 border border-red flex>
        {isFirst()}
      </main>
       <div flex justify-between>
        <button onClick={pre}>-</button>
      <button onClick={next}>+</button>
      </div>
      <footer m-8px>{direction}</footer>

    </div>
  )
}

export default Welcome

