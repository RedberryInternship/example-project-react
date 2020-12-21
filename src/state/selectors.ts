import { ApplicationState } from 'types'

export const selectUser = ({ user }: ApplicationState) => user

export const selectChargingProcess = ({ chargingProcess }: ApplicationState) => chargingProcess
