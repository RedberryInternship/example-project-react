import { ReactElement } from 'react'

export type PartnersResponseType = {
  name: string
  image: string
}

type PartnerItemProps = {
  image: string
  testID: string
}

export type PartnerItemFC = (params: PartnerItemProps) => ReactElement
