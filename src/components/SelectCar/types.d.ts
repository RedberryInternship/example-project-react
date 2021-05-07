import { TFunction } from 'react-i18next'

export type State = {
  visible: boolean
}

export type Props = {
  title: string
  t: TFunction
  image: any
  dropdownIcon: any
  data: string[]
  onChange: (text: string) => void
  value: any
  selectedValue: string | undefined
  disabled?: boolean
  testID?: string
  onPress?: () => void
}
