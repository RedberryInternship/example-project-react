import { ReactElement } from 'react'

type PasswordChangeViewProps = {
  errors: Record<string, any>
  watch: (name: string) => string
  control: any
}

export type PasswordChangeViewFC = (props: PasswordChangeViewProps) => ReactElement
