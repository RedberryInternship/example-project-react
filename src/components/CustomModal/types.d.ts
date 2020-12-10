import { ChargingStatus } from 'types'

type Data = {
  title?: string
  description?: string
  bottomDescription?: string
  price?: number
}
type Config = {
  type: number
  onCloseClick?: () => void
  subType?: ChargingStatus
  data?: Data & any
}

export type InitialState = {
  visible: boolean
  config: Config
}

export interface CustomModalInterface {
  customUpdate: (visible: boolean, config?: Config) => void
  state: InitialState | any
}
