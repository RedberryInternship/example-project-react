import { ReactElement } from 'react'

type PasswordConfirmationViewProps = {
  errors: Record<string, any>
  control: any
}

export type PasswordConfirmationViewFC = (props: PasswordConfirmationViewProps) => ReactElement
