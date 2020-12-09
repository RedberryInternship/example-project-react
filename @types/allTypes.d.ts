import {
  ImageSourcePropType,
} from 'react-native'
import { ReactElement, RefObject, Ref } from 'react'
import { LocationPermissionStatus } from 'react-native-location'
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation'
import { MapViewProps } from 'react-native-maps'
import { ChargingStatus } from 'utils/enums'
import { Dispatch } from 'redux';
import BottomSheetBehavior from 'reanimated-bottom-sheet'
import { CustomModalInterface } from 'components/CustomModal/types'

export type ApplicationState = {
  user: UserState
  chargingProcess: ChargerState
}

type LanguageType = {
  en: string
  ka: string
  ru: string
}

export type GetAllChargerResponseType = {
  data: Charger[]
  current_hour: string
}

export type StartChargingResponseType = {
  already_paid: number
  charger_connector_type_id: number
  charger_id: number
  charging_status: ChargingStatus
  connector_type_id: number
  consumed_money: number
  refund_money: number
  user_card_id: string
}

export type StandardErrorResponseType = {
  status_code: number
  status: string
  message: LocaleStringObject
}

export enum ChargingTypes {
  fullCharge = 'FULL_CHARGE',
  byAmount = 'BY_AMOUNT',
}

export enum ChargerTypes {
  LVL2 = 'LVL2',
  FAST = 'FAST',
}

export interface Charger extends ChargerDetail {
  charger_group_id: number | null
  charger_group: ChargerGroup | null
}

export type ChargersResponseWithTime = {
  data: Charger[]
  time: number
}

type ChargerGroup = {
  id: number
  name: string
  user_id: number
  chargers: ChargerDetail[] | null
}

export type ChargerDetail = {
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
  status: string
  lat: string
  lng: string
  iban: string
  charger_group_id: number
  last_update: string
  created_at: string
  updated_at: string
  tags: string[]
  connector_types: ChargerConnectorType[]
  charger_types: ChargerChargerTypes[]
  is_favorite: boolean | null
  is_free: boolean
  business_services?: BusinessService[]
}

type BusinessService = {
  id: number
  title: LanguageType
  description: LanguageType
  image_path: string
}

type ChargerConnectorType = {
  id: number
  old_id: number
  name: 'Combo 2' | 'Type 2' | 'CHAdeMO'
  pivot: ChargerConnectorTypePivot
  created_at: string
  updated_at: string
  charging_prices?: ChargerChargingPrices[]
  fast_charging_prices?: ChargerFastChargingPrices[]
}

type ChargerConnectorTypePivot = {
  id: number
  charger_id: number
  connector_type_id: number
  min_price: number | null
  max_price: number | null
  status: string | null
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
  min_kwt: string
  max_kwt: string
  start_time: string
  end_time: string
  price: string
}
type ChargerFastChargingPrices = {
  id: number
  start_minutes: string
  end_minutes: string
  price: string
  charger_connector_type_id: number
}

export type UserState = {
  user: UserMeResponseType | null
  loading: boolean
  AllChargers: Charger[] | null
  authStatus: 'failed' | 'success' | null
  favoriteChargers: Favorite[] | null
  userState: any // TODO: don't know object structure
}

export enum SendSmsCodeStatus {
  USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
  USER_DOES_NOT_EXISTS = 'USER_DOES_NOT_EXISTS',
}

export type ChargingState = {
  already_paid: number
  consumed_money: number
  refund_money: number
  charging_status: ChargingStatus
  charger_connector_type_id: number
  charger_id: number
  connector_type_id: number
  charging_type: ChargingTypes
  user_card_id: number
  order_id: number
  start_charging_time: string
  penalty_start_time: string
  penalty_fee: number
  charger_type: ChargerTypes
  is_free: boolean
}

export type Action = {
  type: string
  payload: any
}

export enum ChargingFinishedPopupEnum {
  LVL2FullCharge,
  UsedUpFastProps,
  FinishedCharging,
  Bankrupt,
  PaymentFailed,
}

export type PhoneCountryCode = {
  id: number
  country_code: string
  phone_code: string
}

export type PhoneCountryCodesData = {
  data: PhoneCountryCode[]
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
  animateToCoords: (lat: number, lng: number, zoomLevel?: number, duration?: number) => void
}
export type MapImperativeRefObject = Ref<MapImperativeCustomProps & MapViewProps>

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
  state: HomeState | null
  dispatch: ((val: any) => void) | null
}

export type ChargerState = {
  chargingStarted: any // TODO: don't know object structure
  chargingStartedError: any // TODO: don't know object structure
  chargingFinished: any // TODO: don't know object structure
  chargingFinishedError: any // TODO: don't know object structure
  chargingState: ChargingState[]
  chargingStateError: any // TODO: don't know object structure
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
  confirm_date: string
  confirmed: number
  created_at: string
  id: number
  old_id: null | number
  order_id: number
  price: string
  prrn: string
  trx_id: string
  type: string
  updated_at: string
  user_card_id: number
  user_card: OrderUserCard
}
type OrderUserCard = {
  masked_pan: string
  active: number
  card_holder: string
  created_at: string
  default: number
  id: number
  old_id: null | number
  order_index: number
  transaction_id: string
  updated_at: string
  user_id: number
  user_old_id: null | number
}
export type ProfileFieldChange = {
  value: string | undefined
  inputName: string | undefined
  errors: any
  control: any
  type: UserSettingEnum
  validator?: Record<string, any>
  register: any
  watch: any
  setValue: any
}

export type Navigation = NavigationScreenProp<NavigationState, NavigationParams>

export type ScreenPropsWithNavigation = {
  navigation: Navigation
}

export type FCWithNavigation = (params: ScreenPropsWithNavigation) => ReactElement

type LastUsedChargerResponseObject = {
  data: Charger[]
}
export type LastUsedCharger = Charger

export type ChargerFilters = {
  text?: string
  free?: 0 | 1
  type?: 'fast' | 'level2'
  public?: 0 | 1
}

export type ChargersObject = {
  data: Charger[]
}

export type ChargerMarkerIconRendererType = {
  type: ChargerMarkerType
  status: any
  width?: number
  height?: number
}
export type ChargerMarkerIcon = {
  width?: number
  height?: number
  groupChargerCount?: number
  pinColorType: ChargerMarkerColor
  privateCharger?: boolean
  fastCharger?: boolean
}

export enum ChargerMarkerType {
  fast__public = 'fast__public',
  fast__nonPublic = 'fast__nonPublic',
  lvl2__public = 'lvl2__public',
  lvl2__nonPublic = 'lvl2__nonPublic',
}

export enum ChargerMarkerColor {
  'group',
  'free',
  'busy',
  'notWorking',
  'notPresent',
}

export type CodeRefType = {
  startCodeAnimation: () => void
  activateButton: () => void
  disableActivateButton: () => void
  setDisabledInput: (bool: boolean) => void
}

export type UserMeResponseType = {
  id: number
  old_id: number
  role_id: number
  phone_number: string
  first_name: string
  last_name: string
  email: string | null
  active: number
  verified: number
  email_verified_at: string | null
  temp_password: string | null
  created_at: string
  updated_at: string
  user_cards: UserCard[]
  user_cars: any[]
  car_models: any[]
  avatar: number // TODO:needs correct key
  mapMode: 'settings.mapColorLight' | 'settings.mapColorDark' | 'settings.automatic'
} | null

export type UserCard = {
  active: number
  card_holder: string
  created_at: string
  default: number
  id: number
  masked_pan: string
  old_id: null
  order_index: number
  transaction_id: string
  updated_at: string
  user_id: number
  user_old_id: null | number
}

export type UserFavoriteChargersResponseType = {
  user_favorite_chargers: Favorite[]
}

export type RequestStandardResponseType = {
  status: 200
}

export type EditPasswordResponseType = {
  status_code: 200
}

export type FAQResponseType = {
  faq: FAQ[]
}

export type UserInfoUpdateResponseType = {
  updated: boolean
}

export type FAQ = {
  id: number
  question: LocaleStringObject
  answer: LocaleStringObject
}

export type PartnersResponseType = {
  partners: Partner[]
}

export type Partner = {
  id: number
  name: string
  image: string | null
}

export type TransactionsHistoryResponseType = {
  data: TransactionsHistoryResponseItem[]
}
export type TransactionsHistoryResponseItem = {
  id: number
  charger_name: string
  address: string
  duration: string
  penalty_fee: null | string
  charge_power: null | string
  start_date: string
  charge_price: string
  user_card_pan: string | null
}

export type ChargerConnectorTypeItem = {
  charger: ChargerDetail
  charger_id: number
  connector_type_id: number
  created_at: string
  id: number
  m_connector_type_id: number
  max_price: null | number
  min_price: null | number
  status: string
  updated_at: string
}

export type UserLastChargersResponseType = {
  data: Charger[]
  current_hour: string
}

export type getCoordsByIPResponseType = {
  Latitude: number
  Longitude: number
}

export type SendSMSCodeResponseType = {
  json_status: string
}

export type LoginResponseType = {
  access_token: string
  user: UserMeResponseType
  token_type: 'bearer'
  expires_in: number
}

export type VerifyCodeResponseType = {
  json_status: string
  status: number
  phone_number: string
}

export type PasswordChangedResponseType = {
  json_status: string
}

export type RegisterResponseType = {
  json_status?: string
  user: UserMeResponseType
  token: string
}

export enum UserSettingEnum {
  firstName = 'first_name',
  lastName = 'last_name',
  email = 'email',
  phone = 'phone_number',
  activeCard = 'activeCard',
  password = 'password',
  mapMode = 'mapMode',
  addCar = 'user_cars',
}

type UserSettingsInfoType = {
  first_name: string
  last_name: string
  email: string
  phone_number: string
  activeCard: string
  password: string
  mapMode: string
  user_cars: string
}

export type SettingsListFieldType = {
  image: ImageSourcePropType
  name: string
  type: UserSettingEnum
  editableComponentName: string
  onEmptyText?: string
  color?: string
}

export type CarMarkAndModelResponseType = {
  data: CarMarkAndModelTypes[]
}
export type CarMarkAndModelTypes = {
  id: number
  name: string
  models: CarModelTypes[]
}

export type CarModelTypes = {
  id: number
  mark_id: number
  name: string
}

export type ContactInfoResponseType = {
  id: number
  address: string
  phone: string
  email: string
  fb_page: string
  fb_page_url: string
  web_page: string
  web_page_url: string
}
export type GetCardAddUrl = {
  save_card_url
  success_url
  failed_url
}

export type SaveUserAndRefreshAction = {
  type: string
  payload: SaveUserPayload
}

export type SaveUserPayload = {
  userData: UserMeResponseType
  token: string | null
}
export type FavoriteChargerAction = {
  type: string
  payload: number
}

export type EasyAlert = Partial<{
  title: string
  text: string
  rightText: string
  leftText: string
  onRightClick: () => void
  onLeftClick: () => void
}>

export type StartChargingArg = {
  type: ChargingTypes
  connectorTypeId: number
  amount?: number
  userCardId: number | undefined
}

export type ChargerAction = {
  type: 'CHARGING_STARTED_SUCCESS'
  | 'CHARGING_STARTED_FAILURE'
  | 'CHARGING_FINISHED_SUCCESS'
  | 'CHARGING_FINISHED_FAILURE'
  | 'CHARGING_STATE_SUCCESS'
  | 'CHARGING_STATE_FAILURE'
  payload: any
}

export type ChargingStateAction = {
  type: 'CHARGING_STATE_SUCCESS' | 'CHARGING_STATE_FAILURE'
  payload: any
}

export type FinishChargingAction = {
  type: 'CHARGING_FINISHED_SUCCESS' | 'CHARGING_FINISHED_FAILURE'
  payload: any
}

export type StartChargingAction = {
  type: 'CHARGING_STARTED_SUCCESS' | 'CHARGING_STARTED_FAILURE'
  payload: any
}

export type StartChargingSagaAction = {
  type: string
  payload: {
    config: StartChargingArg
    setLoading: (bool: boolean) => void
  }
}

export type FinishChargingSagaAction = {
  type: string
  payload: number
}

export type UpdateChargingProcessesSagaAction = {
  type: string
  payload: ChargingState[],
  status: boolean,
}

export type References = {
  reduxDispatch: Dispatch<any> | undefined,
}

export type Defaults = {
  dropdown: any
  token: string | null
  FCMToken: string | null
  activeRoute: string | null
  locale: Locale
  location: null | {
    lng: number;
    lat: number
  }
  locationPermission: LocationPermissionStatus
  modal: RefObject<CustomModalInterface>
  bottomSheet: RefObject<BottomSheetBehavior> | null
  userDetail: UserMeResponseType | null
  internetConnected: boolean | null
  isForeground: boolean | null
}

export type Locale = 'en' | 'ka' | 'ru' | '' | null
