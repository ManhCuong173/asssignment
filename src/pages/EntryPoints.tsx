import { Routes } from 'constants/routes'
import { lazy } from 'react'
import { AppRouteConfigType } from './types'

const LazyHome = lazy(() => import('./Home'))
const LazyStaking = lazy(() => import('./Staking'))

export const AppRoutes: AppRouteConfigType[] = [
    {
        name: 'Home',
        path: Routes.home,
        component: LazyHome,
    },
    {
        name: 'Staking',
        path: Routes.staking,
        component: LazyStaking,
    }
]