import type { FC } from 'react'
import React, { useState } from 'react'

const Pager: FC = () => {
  const [state, setState] = useState()
  
  return (
    <div flex items-center justify-center>
      <div mr-12px w-32px h-4px rd-2 bg-red ></div>
      <div mr-12px w-32px h-4px rd-2 bg-bluegray ></div>
    </div>
  )
}

export default Pager
