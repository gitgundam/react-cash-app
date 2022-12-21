import type { RouteObject } from 'react-router-dom'
import { Outlet, createBrowserRouter } from 'react-router-dom'
import Welcome from '@/views/welcome'

const RouteObjectList: RouteObject[] = [
  {
    path: '/',
    element: <Outlet/>,
    errorElement: <div>error</div>,
    children: [
      {
        index: true,
        element: <Welcome/>,
      },
      {
        path: '/b2',
        element: <div className=''>321</div>,
      },
    ]
    
  },
  {
    path: '/a',
    element: <div>123</div>,
  },
]
export const routeList = createBrowserRouter(RouteObjectList)
