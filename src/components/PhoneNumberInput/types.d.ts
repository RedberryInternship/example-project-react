import { Ref } from 'react'
import {
  TextInputProps,
  StyleProp,
  TextInput,
} from 'react-native'

export type PhoneNumberInputProps = {
  onSubmit: () => void
  onBlur?: () => void
  onFocus?: () => void
  onChangeText: (text: string) => void
  style?: StyleProp<TextInputProps>
  errorText?: string
  codeRef?: any
  value?: string
}

export interface BaseInputRefProp {
  errorText: (text: string) => void
}

export type Reference = Ref<TextInput & BaseInputRefProp>
