import { ReactElement } from 'react'

type CurrentTariffsRowProps = {
  col1: string
  col2: string
  col3: string
  col4: string
}

export type CurrentTariffsRowFC = (params: CurrentTariffsRowProps) => ReactElement
