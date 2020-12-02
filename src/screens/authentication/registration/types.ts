import { ReactElement } from 'react'

type PhoneAndCodeInputs = {
  phone: string
  code: string
}

export type EnterPhoneAndCode = (params: PhoneAndCodeInputs) => Promise<void>

export type GoToNextPage = () => Promise<void>

export type RegisterError = {
  email: Array<string>
  phone_number: Array<string>
}

type RepeatPasswordInput = {
  password: string
  repeatPassword: string
}

export type RepeatPassword = (params: RepeatPasswordInput) => Promise<void>

type UserInfoViewProps = {
  hook: Record<string, any>
  activePage: number
}

export type UserInfoViewFC = (params: UserInfoViewProps) => ReactElement

type PhoneNumberViewProps = {
  hook: Record<string, any>
  activePage: number
}

export type PhoneNumberViewFC = (params: PhoneNumberViewProps) => ReactElement

type PasswordViewProps = {
  hook: Record<string, any>
  activePage: number
}

export type PasswordViewFC = (params: PasswordViewProps) => ReactElement


type CardAddContainerProps = {
  activePage: number
  onSuccess: () => void
}

export type CardAddContainerFC = (params: CardAddContainerProps) => ReactElement