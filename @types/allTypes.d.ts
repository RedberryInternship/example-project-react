declare module 'react-native-hooks';



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
  lat: number,
  lng: number,
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