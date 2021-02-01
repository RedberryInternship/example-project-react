import { ImageSourcePropType } from 'react-native'
import { LocationPermissionStatus } from 'react-native-location'
import { ChargerState } from 'types/chargingProcess'
import { UserState } from 'types/user'
import { Charger } from 'types/chargers'

export type ApplicationState = {
  user: UserState
  chargingProcess: ChargerState
  app: AppState
}

export type AppState = {
  ready: boolean
}

export type LanguageType = {
  en: string
  ka: string
  ru: string
}

export type PhoneCountryCode = {
  id: number
  country_code: string
  phone_code: string
}

export type PhoneCountryCodesData = {
  data: PhoneCountryCode[]
}

export type LocaleStringObject = LanguageType | undefined

export type HomeState = {
  PermissionStatus: LocationPermissionStatus | null
  loading: boolean
  locationImageType: ImageSourcePropType
  filteredChargers: Charger[] | null
  LocationRequestFunc: () => void
}

export type FAQ = {
  id: number
  question: LocaleStringObject
  answer: LocaleStringObject
}

export type Partner = {
  id: number
  name: string
  image: string | null
}

export type EasyAlert = Partial<{
  title: string
  text: string
  rightText: string
  leftText: string
  onRightClick: () => void
  onLeftClick: () => void
}>

export type Locale = 'en' | 'ka' | 'ru' | '' | null
