import { ReactElement } from 'react'
import { StatusBarStyle } from 'react-native'

type CustomDropDownProps = {
  dropDownInactiveBarColor: () => StatusBarStyle
}

export type CustomDropDownFC = (props: CustomDropDownProps) => ReactElement
