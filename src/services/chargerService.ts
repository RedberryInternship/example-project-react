import defaults from 'utils/defaults'
import {
  GetAllChargerResponseType,
  StartChargingResponseType,
  ChargingTypes,
  ChargingState,
} from 'types'
import axios from './axios'

export const getChargers = async (): Promise<GetAllChargerResponseType> => {
  /**
   * To do params not working
   */
  const response = await axios.get('/chargers', defaults.location ?? {})
  return response
}

export const startCharging = (
  charger_connector_type_id: number,
  charging_type: ChargingTypes,
  user_card_id: number,
  price?: number,
): Promise<StartChargingResponseType> => axios.post('/charging/start', {
  charger_connector_type_id,
  charging_type,
  price,
  user_card_id,
})

export const finishCharging = (order_id: number)
  : Promise<ChargingState> => axios
    .post(
      '/charging/stop',
      {
        order_id,
      },
    )

export const chargingState = (): Promise<ChargingState[]> => axios.get('/active-orders')
