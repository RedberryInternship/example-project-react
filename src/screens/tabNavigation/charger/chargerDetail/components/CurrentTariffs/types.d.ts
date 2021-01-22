import { ReactElement } from 'react'
import { ChargerConnectorType } from 'types'

export type CurrentTariffsProps = {
  connector?: ChargerConnectorType
}

export type CurrentTariffsFC = (params: CurrentTariffsProps) => ReactElement
