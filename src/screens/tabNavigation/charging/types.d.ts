import { ReactElement } from 'react'
import { Navigation, ChargingState } from 'allTypes'

type ChargingViewProps = {
  hook: {
    t: any
    navigation: Navigation
    onFinish: (charger_connector_type_id: number) => void
    setLoading: (loading: boolean) => void
    loading: boolean
  }
  chargingState: ChargingState
  singleCharger?: boolean
}

export type ChargingViewFC = (params: ChargingViewProps) => ReactElement
