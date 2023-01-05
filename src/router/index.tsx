import type { RouteObject } from 'react-router-dom'
import { Outlet, createHashRouter } from 'react-router-dom'
import Welcome from '@/views/welcome'

const RouteObjectList: RouteObject[] = [
  {
    path: '/',
    element: <Outlet/>,
    errorElement: <div>errorerror</div>,
    children: [
      {
        index: true,
        // element: <Welcome/>,
        element: <div>123</div>,
      },
      {
        path: '/xx',
        element: <Welcome/>,
      },
    ]
    
  },
  {
    path: '/a',
    element: <div>123</div>,
  },
]
export const routeList = createHashRouter(RouteObjectList)
