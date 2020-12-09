import AsyncStorage from '@react-native-community/async-storage'
import defaults from 'utils/defaults'
import ajax from './ajax'
import {
  GetAllChargerResponseType,
  StartChargingResponseType,
  ChargingTypes,
  ChargingState,
} from '../../@types/allTypes.d'

// Vobi Todo: you can not have business logic inside service
export const getAllChargersFiltered = async (): Promise<GetAllChargerResponseType> => {
  const date = new Date()
  let storeNew = false
  let chargers = {}
  const storedChargers = await AsyncStorage.getItem('storedChargers')
  if (storedChargers) {
    chargers = JSON.parse(storedChargers)
  }
  const milisec_diff = date.getTime() - chargers?.time
  const minutes_diff = new Date(milisec_diff).getMinutes()
  if (minutes_diff > 2 || !chargers?.time) {
    storeNew = true
  }

  if (storeNew) {
    /**
     * To do params not working
     */
    const response = await ajax.get('/chargers', defaults.location ?? {})
    AsyncStorage.setItem('storedChargers', JSON.stringify({ data: response, time: date.getTime() }))
    return response
  }
  return chargers?.data
}

export const startCharging = (
  charger_connector_type_id: number,
  charging_type: ChargingTypes,
  user_card_id: number,
  price?: number,
): Promise<StartChargingResponseType> => ajax.post('/charging/start', {
  charger_connector_type_id,
  charging_type,
  price,
  user_card_id,
})

export const finishCharging = (order_id: number)
  : Promise<ChargingState> => ajax
    .post(
      '/charging/stop',
      {
        order_id,
      },
    )

export const chargingState = (): Promise<ChargingState[]> => ajax.get('/active-orders')
