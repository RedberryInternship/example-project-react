/* eslint-disable no-unused-vars */
// declare module 'react-native-hooks'
import {
  TextInputProps,
  ImageSourcePropType,
  StyleProp,
  ImageStyle,
  ViewStyle,
} from 'react-native'
import {RefObject, Ref} from 'react'
import {Item} from 'react-native-picker-select'
import {LocationPermissionStatus} from 'react-native-location'
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation'
import {MapViewProps} from 'react-native-maps'

type LanguageType = {
  en: string
  ka: string
  ru: string
}

export type Charger = {
  id: number
  old_id: number
  name: LanguageType
  charger_id: number
  code: number | string
  description: string
  user_id: number
  location: LanguageType
  public: number
  active: number
  lat: string
  lng: string
  iban: string
  charger_group_id: number
  last_update: string
  created_at: string
  updated_at: string
  tags: string[]
  connector_types: ChargerConnectorTypes[]
  charger_types: ChargerChargerTypes[]
  charging_prices: ChargerChargingPrices[]
  fast_charging_prices: ChargerFastChargingPrices[]
}

type ChargerConnectorTypes = {
  id: number
  old_id: number
  name: string
  created_at: string
  updated_at: string
}
type ChargerChargerTypes = {
  id: number
  name: string
  created_at: string
  updated_at: string
}

type ChargerChargingPrices = {
  id: number
  charger_id: number
  min_kwt: number
  max_kwt: number
  start_time: number
  end_time: number
  price: number
  created_at: string
  updated_at: string
}
type ChargerFastChargingPrices = {
  id: number
  charger_id: number
  min_kwt: number
  max_kwt: number
  start_time: number
  end_time: number
  price: number
  created_at: string
  updated_at: string
}

export type AppState = {
  user: string | null
  loading: boolean
  AllChargers: Charger[] | null
  authStatus: 'failed' | 'success' | null
  favoriteChargers: Favorite[] | null
}
export type Action = {
  type: string
  payload: any
}

export type AppContextType = {
  state: AppState
  dispatch: any
}

export interface BaseInputProps extends TextInputProps {
  title: string
  errorText?: string | null
  image?: ImageSourcePropType
  paddingLeft?: number
  required?: boolean
  secure?: boolean
  onSubmit: () => void
  imageStyle?: ImageStyle
}

export interface BaseInputRefProp {
  errorText: (text: string) => void
}

export type BaseInputRefObject = RefObject<TextInputProps | BaseInputRefProp>

export type PhoneCountryCode = {
  id: number
  country_code: string
  phone_code: string
}

export type PhoneCountryCodesData = {
  data: PhoneCountryCode[]
}
export type BasePickerSelectProp = {
  style?: StyleProp<ViewStyle>
  placeholder?: Item
  items: Item[]
  onDone: () => void
  onOpen?: () => void
  onChange: (value: any, index: number) => void
  value?: Item
}

export type LocaleStringObject =
  | {
      en: string
      ka: string
      ru: string
    }
  | undefined

export enum HomeNavigateModes {
  'chargerLocateOnMap',
  'showRoutesToCharger',
  'showAllChargers',
}

type MapImperativeCustomProps = {
  locate: () => void
  showRoute: (lat: number, lng: number, showRoute?: boolean) => void
  animateToCoords: (
    lat: number,
    lng: number,
    zoomLevel?: number,
    duration?: number,
  ) => void
}
export type MapImperativeRefObject = RefObject<
  MapImperativeCustomProps & MapViewProps
>

export type Coords = {
  lng: number
  lat: number
} | null

export type HomeState = {
  PermissionStatus: LocationPermissionStatus | null
  loading: boolean
  locationImageType: ImageSourcePropType
  filteredChargers: Charger[] | null
  LocationRequestFunc: () => void
}

export type HomeContextType = {
  state: HomeState
  dispatch: (val: any) => void
}

export type Favorite = {
  id: number
  old_id: number
  name: LanguageType
  charger_id: number
  code: string
  description: string | null
  user_id: string | null
  location: LanguageType
  public: number
  active: number
  lat: string
  lng: string
  iban: string
  charger_group_id: number | null
  last_update: string | null
  created_at: string
  updated_at: string
  pivot: {
    user_id: number
    charger_id: number
    created_at: string
    updated_at: string
  }
}

export type GoogleGetDirection = {
  routes: GoogleRoutes[]
  status: string
}

type GoogleRoutes = {
  legs: GoogleRouteLegs[]
  overview_polyline: GoogleOverviewPolyline
}
type GoogleRouteLegs = {
  distance: GoogleDistance
  duration: GoogleDuration
  end_address: string
  end_location: Coords
  start_address: string
  start_location: Coords
}
type GoogleDistance = {
  text: string
  value: number
}

type GoogleDuration = {
  text: string
  value: number
}

type GoogleOverviewPolyline = {
  points: string
}

export type LocationViaIP = {
  city: string
}

export type OrderResponseObject = {
  orders: OrderResponse[]
}
export type OrderResponse = {
  id: number
  charger_id: number
  user_id: number
  finished: number
  charge_fee: string | null
  charge_time: string | null
  confirmed: number
  confirm_date: string
  refunded: number
  price: string
  target_price: string
  created_at: string
  updated_at: string
  charger: OrderCharger
  payments: OrderPayment[]
}

type OrderCharger = {
  id: number
  name: LocaleStringObject
  charger_id: number
  code: string
  user_id: null | number
  location: LocaleStringObject
  public: number
  active: number
  lat: string
  lng: string
  charger_group_id: null | number
  created_at: string
  updated_at: string
}

type OrderPayment = {
  id: number
  price: string
  user_card: OrderUserCard
}
type OrderUserCard = {
  masked_pan: string
}
export type ProfileFieldChange = {
  navigation: Navigation
  clicked: boolean
  setClicked: (status: boolean) => void
}

export type Navigation = NavigationScreenProp<NavigationState, NavigationParams>

export type ScreenPropsWithNavigation = {
  navigation: Navigation
}
