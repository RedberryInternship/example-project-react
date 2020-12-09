import { ReactElement } from 'react'

type FavoriteChargerItemProps = {
  title: string
  address: string
  turnon: () => void | undefined
  deleteItem: () => void | undefined
}

export type FavoriteChargerItemFC = (params: FavoriteChargerItemProps) => ReactElement
