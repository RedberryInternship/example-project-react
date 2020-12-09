import { ReactElement } from 'react'

type PhoneVerificationViewProps = {
  watch: (name: string) => string
  setValue: (name: string, value: string, validate: boolean) => void
  receiveCodeHandler: (formType: string) => any
  phoneRef: any
  codeRef: any
  formType: string
}

export type PhoneVerificationViewFC = (props: PhoneVerificationViewProps) => ReactElement
