import { ReactElement } from 'react'

export type Navigation = any

export type ScreenPropsWithNavigation = { navigation: Navigation }

export type FCWithNavigation = (params: ScreenPropsWithNavigation) => ReactElement
