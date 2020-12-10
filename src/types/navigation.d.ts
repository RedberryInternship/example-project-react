import { ReactElement } from 'react'
import {
  NavigationScreenProp,
  NavigationParams,
  NavigationState,
} from 'react-navigation'

export type Navigation = NavigationScreenProp<NavigationState, NavigationParams>

export type ScreenPropsWithNavigation = { navigation: Navigation }

export type FCWithNavigation = (params: ScreenPropsWithNavigation) => ReactElement
