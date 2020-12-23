import {
  ChargingStatus,
  ChargingTypes,
  ChargerTypes,
} from 'types/enums'

export type ChargerState = {
  chargingStarted: any
  chargingStartedError: any
  chargingFinished: any
  chargingFinishedError: any
  chargingState: ChargingState[]
  chargingStateError: any
}

export type ChargingState = {
  already_paid: number
  consumed_money: number
  refund_money: number
  consumed_kilowatts: number
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
