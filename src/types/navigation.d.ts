import { ReactElement } from 'react'

export type ScreenPropsWithNavigation = {
  navigation: any
  routes: any
}

export type FCWithNavigation = (params: ScreenPropsWithNavigation) => ReactElement
