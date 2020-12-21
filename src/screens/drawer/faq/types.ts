import { LocaleStringObject } from 'types'
import { ReactElement } from 'react'

export type FAQResponseType = {
  question: LocaleStringObject
  answer: LocaleStringObject
}

type FaqListItemProps = {
  number: number
  question: string
  answer: string
  active: boolean
  toggle: (index: boolean) => void
}

export type FaqListItemFC = (params: FaqListItemProps) => ReactElement

export type FaqListItemHookParams = {
  active: boolean
}
