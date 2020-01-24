/* eslint-disable no-unused-vars */
declare module 'react-native-hooks';
import {TextInput,Image, ImageSourcePropType, StyleProp, ImageStyle
} from "react-native"
import {RefObject} from "react"


export type Chargers = {
  id: number,
  old_id: number,
  name: {
      en: string,
      ka: string,
      ru: string
  },
  charger_id: number,
  code: number | string,
  description: string,
  user_id: number,
  location: {
      en: string,
      ka: string,
      ru: string
  },
  public: number,
  active: number,
  lat: number | string,
  lng: number | string,
  iban: string,
  charger_group_id: number,
  last_update: string,
  created_at: string,
  updated_at: string,
  tags: string[],
  connector_types: ChargerConnectorTypes[],
  charger_types: ChargerChargerTypes[],
  charging_prices: ChargerChargingPrices[],
  fast_charging_prices: ChargerFastChargingPrices[]
}

type ChargerConnectorTypes = {
  id: number,
  old_id: number,
  name: string,
  created_at: string,
  updated_at: string,
}
type ChargerChargerTypes = {
  id: number,
  name: string,
  created_at: string,
  updated_at: string,
}

type ChargerChargingPrices = {
  id: number,
  charger_id: number,
  min_kwt: number,
  max_kwt: number,
  start_time: number,
  end_time: number,
  price: number,
  created_at: string,
  updated_at: string,
}
type ChargerFastChargingPrices = {
  id: number,
  charger_id: number,
  min_kwt: number,
  max_kwt: number,
  start_time: number,
  end_time: number,
  price: number,
  created_at: string,
  updated_at: string,
}


export type State = {
  user: Object | null,
  loading : boolean,
  AllChargers : Chargers[] | null,
  authStatus : "failed" | "success" | null
}
export type Action = {
  type : string,
  payload : any,
}

export type AppContextType = {
  state : State,
  dispatch : any
}


export interface BaseInput extends TextInputProps {
  title : string,
  errorText ?: string| null,
  image ?: ImageSourcePropType,
  paddingLeft ?: number,
  required ?: boolean,
  secure ? : boolean,
  onSubmit : () => void,
  imageStyle ?: ImageStyle
}

interface baseInputRefProp {
  errorText : (val  : string) => void
}
export interface BaseInputRefObject extends RefObject<TextInputProps & baseInputRefProp > {

}
  