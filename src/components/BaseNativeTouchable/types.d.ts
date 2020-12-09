import { ReactElement } from 'react'
import {
  BorderlessButtonProperties,
} from 'react-native-gesture-handler'

type BaseNativeTouchableProps = {
  children: Element
} & BorderlessButtonProperties

export type BaseNativeTouchableFC = (props: BaseNativeTouchableProps) => ReactElement
