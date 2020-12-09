import { ReactElement } from 'react'

type BaseCheckboxProps = {
  active: boolean
}

export type BaseCheckboxFC = (props: BaseCheckboxProps) => ReactElement
