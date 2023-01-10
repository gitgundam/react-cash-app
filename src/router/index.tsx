import type { RouteObject } from 'react-router-dom'
import { createHashRouter } from 'react-router-dom'

import { welcomeRoutes } from './welcomeRoutes'
import Welcome from '@/views/welcome'

const RouteObjectList: RouteObject[] = [
  {
    path: '/',
    element: <div>main</div>,
    errorElement: <div>errorerror</div>,
  },
  {
    path: '/welcome',
    element: <Welcome/>,
    children: welcomeRoutes
  },
]
export const routeList = createHashRouter(RouteObjectList)

