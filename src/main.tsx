import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  RouterProvider,
} from 'react-router-dom'
import 'uno.css'
import { routeList } from './router'
import './theme/index.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
   <RouterProvider router={routeList} />
  </React.StrictMode>
)

window.addEventListener('touchstart', (e: TouchEvent) => {
  if (e.touches.length > 1) e.preventDefault()
}, { passive: false })
// window.addEventListener('touchmove', (e: TouchEvent) => {
//   e.preventDefault()
// }, { passive: false })
