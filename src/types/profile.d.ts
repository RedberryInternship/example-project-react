import { ImageSourcePropType } from 'react-native'
import { UserSettingEnum } from 'types/enums'

export type SettingsListFieldType = {
  image: ImageSourcePropType
  name: string
  type: UserSettingEnum
  editableComponentName: string
  onEmptyText?: string
  color?: string
  testID?: string
}

export type ProfileFieldChange = {
  value?: string | undefined
  inputName?: string | undefined
  errors?: any
  control?: any
  type?: UserSettingEnum
  validator?: Record<string, any>
  register?: any
  watch?: any
  setValue?: any
}

export type UserSettingsInfoType = {
  first_name: string
  last_name: string
  email: string
  phone_number: string
  activeCard: string
  password: string
  mapMode: string
  user_cars: string
}

export type CarMarkAndModelTypes = {
  id: number
  name: string
  models: CarModelTypes[]
}

type CarModelTypes = {
  id: number
  mark_id: number
  name: string
}

export type GetCardAddUrl = {
  save_card_url
  success_url
  failed_url
}
