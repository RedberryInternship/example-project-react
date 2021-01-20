export type State = {
  visible: boolean
}

export type Props = {
  title: string
  data: string[]
  onChange: (text: string) => void
  selectedValue: string | undefined
  disabled?: boolean
  onPress?: () => void
}
