import { LanguageType } from './general'

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
  hidden: number
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

export type LastUsedCharger = Charger

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
  hidden: number
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
  whitelist: WhitelistMember[]
  is_favorite: boolean | null
  is_free: boolean
  business_services?: BusinessService[]
}

type WhitelistMember = {
  id: number
  charger_id: number
  phone: string
}

type ChargerChargerTypes = {
  id: number
  name: string
  created_at: string
  updated_at: string
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

type ChargerConnectorTypePivot = {
  id: number
  charger_id: number
  connector_type_id: number
  min_price: number | null
  max_price: number | null
  status: string | null
}
