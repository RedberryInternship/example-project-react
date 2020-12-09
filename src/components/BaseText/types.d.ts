import { ReactElement } from 'react'
import { TextProps } from 'react-native'

type BaseTextProps = {
  children: string | Element
} & TextProps

export type BaseTextFC = (props: BaseTextProps) => ReactElement

export type SetStyle = Record<string, string | number> | undefined
