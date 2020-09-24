import React from 'react'
import { View, Alert } from 'react-native'
import { Const } from 'utils'
import { PhoneVerificationView } from 'components'

type PhoneNumberViewProps = {
  hook: Record<string, any>
  activePage: number
}

const PhoneNumberView = ({
  hook,
}: PhoneNumberViewProps): React.ReactElement => {
  return (
    <View style={{ width: Const.Width, paddingHorizontal: 16 }}>
      <PhoneVerificationView {...hook} formType="registers" />
    </View>
  )
}

export default React.memo(
  PhoneNumberView,
  ({ activePage }, { activePage: nextActivePage }) =>
    nextActivePage != 0 && activePage != 0,
)
