import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { animated, useSpring } from '@react-spring/web'
import { introduce } from './config'
import Swiper from '@/components/Swiper'

const Welcome = () => {
  const [show, setShow] = useState(false)
  const navigate = useNavigate()
  const onSwiper = (e: { isEnd: boolean; index: number }) => {
    if (e.isEnd) setShow(true)
    else setShow(false)
  }
  
  useEffect(() => {
    navigate('/welcome')
  }, [])
  
  return (
    <div h-100vh flex flex-col bg-blue-2 bg="#3B4054" color="#C8D2DE" className='safari-100vh'
    >
      <div>
        
      </div>
      <div flex-1>
        <Outlet />
      </div>
      <main>
        <Swiper onSwiper={onSwiper}>
          {
            introduce.map((item, index) =>
            <div h-180px flex flex-col items-center color-white px-10 pt-5 key={index}>
              <div text-32px>{item.title}</div>
              <p mb-60px text-16px>{item.text}</p>
            </div>)
          }
        </Swiper>
      </main>
      <Footer show={show}/>
    </div>
  )
}

export default Welcome

const Footer = ({ show }: { show: boolean }) => {
  const [springs, api] = useSpring(() => ({
    from: { opacity: 0 },
    to: { opacity: 1 },
  }))
  
  useEffect(() => {
    api({
      from: { opacity: 0 },
      to: { opacity: 1 },
    })
  }, [show])
  
  return (
  <footer h-100px flex items-center justify-center >
   {show
     ? <animated.div
        absolute
        right-15px
        rd-36
        w-50px
        h-50px
        flex
        items-center
        justify-center
        bg-blue-6
        style={{ ...springs }}>
              <div className="i-material-symbols:arrow-right-alt" text-30px ></div>
       </animated.div>
     : <animated.div text-14px style={{ ...springs }}>向左滑动以继续浏览</animated.div>}
  </footer>)
}

