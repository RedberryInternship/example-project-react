import { ReactElement } from 'react'

type RegistrationPaginationProps = {
  activePage: number
  paginationClickHandler: (index: number) => void
}

export type RegistrationPaginationFC = (props: RegistrationPaginationProps) => ReactElement
