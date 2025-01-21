import ErrorBoundary from 'components/ErrorBoundary'
import Layout from 'layout'
import LayoutContent from 'layout/components/LayoutContent'
import Topbar from 'layout/components/Topbar'
import { AppRoutes } from 'pages/EntryPoints'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import './App.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <Layout>
          <Topbar />
          <LayoutContent>
            <Outlet />
          </LayoutContent>
        </Layout>
      </ErrorBoundary>
    ),
    children: [
      ...AppRoutes.filter((route) => route.path && route.component).map((validRoute) => ({
        path: validRoute.path,
        element: <validRoute.component />,
      })),
    ],
  },
  ,
])
function App() {
  return <RouterProvider router={router} />
}

export default App

