import React from 'react'
import { View } from 'react-native'
import * as Const from 'utils/const'
import PhoneVerificationView from 'components/PhoneVerificationView'
import { PhoneNumberViewFC } from 'screens/authentication/registration/types'

const PhoneNumberView: PhoneNumberViewFC = ({ hook }) => (
  <View style={{ width: Const.Width, paddingHorizontal: 16 }}>
    <PhoneVerificationView {...hook} formType="registers" />
  </View>
)

export default React.memo(
  PhoneNumberView,
  ({ activePage }, { activePage: nextActivePage }) => nextActivePage !== 0 && activePage !== 0,
)
