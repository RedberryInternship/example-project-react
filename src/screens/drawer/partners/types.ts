import { ReactElement } from 'react'

export type PartnersResponseType = {
  name: string
  image: string
}

type PartnerItemProps = {
  image: string
}

export type PartnerItemFC = (params: PartnerItemProps) => ReactElement
