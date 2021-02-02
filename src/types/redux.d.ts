import { UserMeResponseType } from 'types/user'
import { ChargingTypes } from 'types/enums'
import { ChargingState } from 'types/chargingProcess'

export type Action = {
  type: string
  payload: any
}

export type SaveUserAndRefreshAction = {
  type: string
  payload: {
    userData: UserMeResponseType
    token: string | null
  }
}

export type FavoriteChargerAction = {
  type: string
  payload: number
}

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

export type AppAction = {
  type: 'READY'
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
