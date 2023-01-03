import type { FC } from 'react'
import React, { useState } from 'react'
import Carousel from './Demo'

const a = [1, 2, 3, 4]
const index: FC = () => {
  return (
   <Carousel>
    {a.map((item, index) => <div h-100px border key={index}>{index}</div>)}
   </Carousel>
  )
}

export default index
