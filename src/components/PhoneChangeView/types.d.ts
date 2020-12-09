import { ReactElement } from 'react'

type PhoneChangeViewProps = {
  setValue: (name: string, value: string, validate: boolean) => void
  getValues: () => Record<string, any>
  register: (name: any, options: any) => void
  errors: Record<string, any>
  watch: (name: string) => string
  triggerValidation: (name: string) => Promise<boolean>
}

export type PhoneChangeViewFC = (props: PhoneChangeViewProps) => ReactElement
