import { ReactElement } from 'react'

export type ScreenPropsWithNavigation = {
  navigation: any
  route: any
}

export type FCWithNavigation = (params: ScreenPropsWithNavigation) => ReactElement
