import { ReactElement } from 'react'
import { UserCar } from 'types'

type CarListItemProps = {
  data: UserCar
  onDeletePress: () => void
}

export type CarListItemFC = (props: CarListItemProps) => ReactElement
