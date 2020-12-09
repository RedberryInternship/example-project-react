import { ReactElement, RefObject } from 'react'
import { TextInput } from 'react-native'

type BottomSearchPanelProps = {
  onFilterClick: (index: number) => void
  selectedFilters: boolean[]
  onTextChange: (text: string) => void,
  closeClick: () => void,
  inputRef: RefObject<TextInput>
}

export type BottomSearchPanelFC = (params: BottomSearchPanelProps) => ReactElement
