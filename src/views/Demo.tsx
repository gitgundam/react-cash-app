import React, { useEffect, useRef, useState } from 'react'
import styles from './index.css'

const Carousel = ({ children, selectedIndex = 1 }) => {
  // 当切换的时候，改变的就是当前位置状态
  // 所以定义当前位置,可以通过传入的selectedIndex来控制最开始显示第几个轮播图,默认从1开始
  const [active, setActive] = useState(selectedIndex)
  // 获取包裹容器
  const container = useRef(null)
  // 获取当前可视区容器宽度
  const SCREEN_WIDTH = window.screen.width
    
  // 统一处理，当active发生变化的时候，我们需要做的就是切换轮播图到某个位置,转场通过控制包裹容器的transform来进行切换，对transform的控制封装成setTransition函数
  useEffect(() => {
    setTransition()
  }, [active])
    
  const setTransition = () => {
    // 计算需要移动的距离并进行修改，这是切换的核心
    const distance = (1 - active) * SCREEN_WIDTH
    container.current.style.transform = `translate3d(${distance}px, 0, 0)`
  }
    
  // 为了演示是否成功，添加两个按钮来切换
  // 上一页
  const handlePrev = () => {
    // 对临界值进行处理
    setActive(active === 1 ? children.length : active - 1)
  }
    
  // 下一页
  const handleNext = () => {
    // 对临界值进行处理
    setActive(active === children.length ? 1 : active + 1)
  }
    
  return (
        <div className={style.carousel}>
            <div 
                ref={container}
                className={styles.container}>
                {
                    React.Children.map(children, (child, index) => {
                      return (
                            <div 
                                style={{ left: index * SCREEN_WIDTH }}
                                className={styles.items}>{child}</div>
                      )
                    })
                }
            </div>
            <div>
                <div onClick={handlePrev} className={styles.buttonLeft}>Left</div>
                <div onClick={handleNext} className={styles.buttonRight}>Right</div>
            </div>
        </div>
  )
}
export default Carousel
