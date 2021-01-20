import { ReactElement } from 'react'

type PrivacyPolicyProps = {
  onPress: () => void
  shouldAgree: boolean
}

export type PrivacyPolicyFC = (props: PrivacyPolicyProps) => ReactElement
