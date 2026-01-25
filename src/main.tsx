import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter, createRootRoute, createRoute, createHashHistory } from '@tanstack/react-router'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Login } from './pages/Login'

import { Team } from './pages/Team'
import { SubsystemsIndex } from './pages/SubsystemsIndex'
import { SubsystemDetail } from './pages/SubsystemDetail'
import Timeline from './features/timeline/components/Timeline'
import './index.css'

// Create root route with Layout
const rootRoute = createRootRoute({
  component: Layout,
})

// Home Route
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

// Timeline Route
const timelineRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/timeline',
  component: Timeline
})

// Team Route
const teamRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/team',
  component: Team
})

// Subsystems Index Route
const subsystemsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/subsystems',
  component: SubsystemsIndex
})

// Subsystem Detail Route
const subsystemDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/subsystems/$id',
  component: SubsystemDetail
})

// Login Route
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: Login
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  timelineRoute,
  teamRoute,
  subsystemsRoute,
  subsystemDetailRoute,
  loginRoute
])

// Create hash history for GitHub Pages compatibility
const hashHistory = createHashHistory()

const router = createRouter({
  routeTree,
  history: hashHistory
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  console.log('Mounting App... Version: HashRouter Fix')
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
}
