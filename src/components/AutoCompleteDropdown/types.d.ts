import { ReactElement } from 'react'
import { ImageSourcePropType } from 'react-native'

type AutoCompleteDropdownProps = {
  title: string
  data: string[]
  defaultValue: string
  errorText: string
  onChange: (text: string) => void
  image: ImageSourcePropType,
  dropdownIcon: ImageSourcePropType
  zIndex: number
  value: any
}

export type AutoCompleteDropdownFC = (props: AutoCompleteDropdownProps) => ReactElement
