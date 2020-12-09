import {
  ImageSourcePropType,
  TextInputProps,
  ImageStyle,
} from 'react-native'

export interface BaseInputProps extends TextInputProps {
  title: string
  errorText?: string | null
  image?: ImageSourcePropType
  paddingLeft?: number
  required?: boolean
  secure?: boolean
  imageStyle?: ImageStyle
  onSubmit: () => void
}
