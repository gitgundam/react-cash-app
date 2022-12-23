import React, { useEffect, useRef, useState } from 'react'
import { useSwiper } from './hooks/useSwiper'

const list = [1, 2, 3, 4]
const Welcome = () => {
  const welcome = useRef<HTMLElement | null>(null)
  const { direction, dx, aaa } = useSwiper(welcome)
  const [width, setWidth] = useState(0) 
  useEffect(() => {
    setWidth(welcome?.current?.clientWidth)
  }, [])
  const [x, setX] = useState(0)
  useEffect(() => { 
    if (!welcome.current) return
    console.log(aaa)
    setX(aaa + x)
    // console.log(x)
    welcome.current.style.transform = `translate3d(${x}px, 0, 0)`
  }, [dx])
  return (
    <div className='border  h-100vh flex flex-col' bg="#3B4054" >
      <header h-20px ml-10 mr-10></header>
      <main relative flex-1 ref={welcome}>
        {list.map((item, index: number) =>
        <div absolute border w-100vw h="100%" style={{ left: width * index }} key={index}>{item}</div>)}
      </main>
      <footer m-8px>
        {dx}/
      </footer>
    </div>
  )
}

export default Welcome
