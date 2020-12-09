import { ApplicationState } from 'allTypes'

export const selectUser = ({ user }: ApplicationState) => user

export const selectChargingProcess = ({ chargingProcess }: ApplicationState) => chargingProcess
