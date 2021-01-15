import { ReactChildren, JSX, ReactChild } from 'react'
import { State } from 'react-native-gesture-handler'

type Props = {
  children: ReactChildren | ReactChild
  left: (...params: any) => any
}

export type SwipeFC = (props: Props) => JSX.Element

export type SwipeDetails = {
  currentState: State
  x: number
  swipeLeftAction: null | ((...params: any) => any)
}
